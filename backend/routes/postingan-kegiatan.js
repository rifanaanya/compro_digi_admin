import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.ts";

const router = express.Router();

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

// ========================================
// UPLOAD DIRECTORY
// ========================================

const uploadDir = path.join(process.cwd(), "uploads", "postingan-kegiatan");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ========================================
// MULTER
// ========================================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();

    const filename = `postingan-kegiatan-${Date.now()}${ext}`;

    cb(null, filename);
  },
});

const upload = multer({
  storage,

  limits: {
    fileSize: 50 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    const allowedExtensions = [
      ".jpg",
      ".jpeg",
      ".png",
      ".webp",
      ".mp4",
      ".webm",
    ];

    const ext = path.extname(file.originalname).toLowerCase();

    if (!allowedExtensions.includes(ext)) {
      return cb(
        new Error("Format media harus JPG, JPEG, PNG, WEBP, MP4, atau WEBM"),
      );
    }

    cb(null, true);
  },
});

// ========================================
// GET SEMUA POSTINGAN KEGIATAN
// ========================================

router.get("/", async (req, res) => {
  try {
    const kegiatan = await prisma.postinganKegiatan.findMany({
      orderBy: {
        tanggal: "desc",
      },
    });

    res.json({
      success: true,
      data: kegiatan,
    });
  } catch (error) {
    console.error("GET POSTINGAN KEGIATAN ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil data kegiatan",
    });
  }
});

// ========================================
// GET POSTINGAN KEGIATAN BY ID
// ========================================

router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const kegiatan = await prisma.postinganKegiatan.findUnique({
      where: {
        id,
      },
    });

    if (!kegiatan) {
      return res.status(404).json({
        success: false,
        message: "Data kegiatan tidak ditemukan",
      });
    }

    res.json({
      success: true,
      data: kegiatan,
    });
  } catch (error) {
    console.error("GET DETAIL KEGIATAN ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil detail kegiatan",
    });
  }
});

// ========================================
// TAMBAH POSTINGAN KEGIATAN
// ========================================

router.post("/", upload.single("media"), async (req, res) => {
  try {
    const { deskripsi, tipe, tanggal } = req.body;

    if (!deskripsi || !tipe || !tanggal) {
      return res.status(400).json({
        success: false,
        message: "Deskripsi, tipe, dan tanggal wajib diisi",
      });
    }

    const tanggalKegiatan = new Date(tanggal);

    if (isNaN(tanggalKegiatan.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Format tanggal tidak valid",
      });
    }

    let media = null;

    if (req.file) {
      media = `/uploads/postingan-kegiatan/${req.file.filename}`;
    }

    const kegiatan = await prisma.postinganKegiatan.create({
      data: {
        deskripsi,
        tipe,
        tanggal: tanggalKegiatan,
        media,
      },
    });

    res.status(201).json({
      success: true,
      message: "Postingan kegiatan berhasil ditambahkan",
      data: kegiatan,
    });
  } catch (error) {
    console.error("POST KEGIATAN ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Gagal menambahkan postingan kegiatan",
    });
  }
});

// ========================================
// EDIT POSTINGAN KEGIATAN
// ========================================

router.put("/:id", upload.single("media"), async (req, res) => {
  try {
    const id = Number(req.params.id);

    const existingKegiatan = await prisma.postinganKegiatan.findUnique({
      where: {
        id,
      },
    });

    if (!existingKegiatan) {
      return res.status(404).json({
        success: false,
        message: "Data kegiatan tidak ditemukan",
      });
    }

    const { deskripsi, tipe, tanggal } = req.body;

    if (!deskripsi || !tipe || !tanggal) {
      return res.status(400).json({
        success: false,
        message: "Deskripsi, tipe, dan tanggal wajib diisi",
      });
    }

    const tanggalKegiatan = new Date(tanggal);

    if (isNaN(tanggalKegiatan.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Format tanggal tidak valid",
      });
    }

    let media = existingKegiatan.media;

    if (req.file) {
      media = `/uploads/postingan-kegiatan/${req.file.filename}`;

      // Hapus media lama jika ada
      if (existingKegiatan.media) {
        const oldFilePath = path.join(
          process.cwd(),
          existingKegiatan.media.replace(/^\/uploads\//, "uploads/"),
        );

        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }
    }

    const kegiatan = await prisma.postinganKegiatan.update({
      where: {
        id,
      },

      data: {
        deskripsi,
        tipe,
        tanggal: tanggalKegiatan,
        media,
      },
    });

    res.json({
      success: true,
      message: "Postingan kegiatan berhasil diperbarui",
      data: kegiatan,
    });
  } catch (error) {
    console.error("PUT KEGIATAN ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Gagal memperbarui postingan kegiatan",
    });
  }
});

// ========================================
// HAPUS POSTINGAN KEGIATAN
// ========================================

router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const kegiatan = await prisma.postinganKegiatan.findUnique({
      where: {
        id,
      },
    });

    if (!kegiatan) {
      return res.status(404).json({
        success: false,
        message: "Data kegiatan tidak ditemukan",
      });
    }

    // Hapus file media
    if (kegiatan.media) {
      const filePath = path.join(
        process.cwd(),
        kegiatan.media.replace(/^\/uploads\//, "uploads/"),
      );

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await prisma.postinganKegiatan.delete({
      where: {
        id,
      },
    });

    res.json({
      success: true,
      message: "Postingan kegiatan berhasil dihapus",
    });
  } catch (error) {
    console.error("DELETE KEGIATAN ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Gagal menghapus postingan kegiatan",
    });
  }
});

export default router;
