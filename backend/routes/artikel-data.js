import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.ts";

const router = express.Router();

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

// ==========================================
// UPLOAD DIRECTORY
// ==========================================

const uploadDir = path.join(process.cwd(), "uploads", "artikel");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ==========================================
// MULTER
// ==========================================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);

    const name = path
      .basename(file.originalname, ext)
      .replace(/[^a-zA-Z0-9-_]/g, "-");

    cb(null, `${Date.now()}-${name}${ext}`);
  },
});

const upload = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Format gambar harus JPG, JPEG, PNG, atau WEBP"));
    }
  },
});

// ==========================================
// GET SEMUA ARTIKEL
// ==========================================

router.get("/", async (req, res) => {
  try {
    const artikel = await prisma.artikel.findMany({
      orderBy: {
        id: "asc",
      },
    });

    res.json({
      success: true,
      data: artikel,
    });
  } catch (error) {
    console.error("❌ Gagal mengambil data artikel:", error);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil data artikel",
    });
  }
});

// ==========================================
// GET DETAIL ARTIKEL
// ==========================================

router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const artikel = await prisma.artikel.findUnique({
      where: {
        id,
      },
    });

    if (!artikel) {
      return res.status(404).json({
        success: false,
        message: "Artikel tidak ditemukan",
      });
    }

    res.json({
      success: true,
      data: artikel,
    });
  } catch (error) {
    console.error("❌ Gagal mengambil detail artikel:", error);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil detail artikel",
    });
  }
});

// ==========================================
// TAMBAH ARTIKEL
// ==========================================

router.post("/", upload.single("gambar"), async (req, res) => {
  try {
    const { judul, ringkasan, isi } = req.body;

    if (!judul?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Judul artikel wajib diisi",
      });
    }

    if (!ringkasan?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Ringkasan artikel wajib diisi",
      });
    }

    if (!isi?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Isi artikel wajib diisi",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Gambar artikel wajib diupload",
      });
    }

    const gambar = `/uploads/artikel/${req.file.filename}`;

    const artikel = await prisma.artikel.create({
      data: {
        judul: judul.trim(),
        ringkasan: ringkasan.trim(),
        isi: isi.trim(),
        gambar,
        penulis: "Admin DIGI",
      },
    });

    res.status(201).json({
      success: true,
      message: "Artikel berhasil ditambahkan",
      data: artikel,
    });
  } catch (error) {
    console.error("❌ Gagal menambahkan artikel:", error);

    res.status(500).json({
      success: false,
      message: "Gagal menambahkan artikel",
    });
  }
});

// ==========================================
// EDIT ARTIKEL
// ==========================================

router.put("/:id", upload.single("gambar"), async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { judul, ringkasan, isi } = req.body;

    const artikelLama = await prisma.artikel.findUnique({
      where: {
        id,
      },
    });

    if (!artikelLama) {
      return res.status(404).json({
        success: false,
        message: "Artikel tidak ditemukan",
      });
    }

    if (!judul?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Judul artikel wajib diisi",
      });
    }

    if (!ringkasan?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Ringkasan artikel wajib diisi",
      });
    }

    if (!isi?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Isi artikel wajib diisi",
      });
    }

    let gambar = artikelLama.gambar;

    // Kalau upload gambar baru
    if (req.file) {
      gambar = `/uploads/artikel/${req.file.filename}`;

      // Hapus gambar lama
      if (artikelLama.gambar) {
        const oldPath = path.join(
          process.cwd(),
          artikelLama.gambar.replace(/^\/uploads\//, "uploads/"),
        );

        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
    }

    const artikel = await prisma.artikel.update({
      where: {
        id,
      },

      data: {
        judul: judul.trim(),
        ringkasan: ringkasan.trim(),
        isi: isi.trim(),
        gambar,
      },
    });

    res.json({
      success: true,
      message: "Artikel berhasil diperbarui",
      data: artikel,
    });
  } catch (error) {
    console.error("❌ Gagal mengedit artikel:", error);

    res.status(500).json({
      success: false,
      message: "Gagal mengedit artikel",
    });
  }
});

// ==========================================
// HAPUS ARTIKEL
// ==========================================

router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const artikel = await prisma.artikel.findUnique({
      where: {
        id,
      },
    });

    if (!artikel) {
      return res.status(404).json({
        success: false,
        message: "Artikel tidak ditemukan",
      });
    }

    // Hapus file gambar
    if (artikel.gambar) {
      const imagePath = path.join(
        process.cwd(),
        artikel.gambar.replace(/^\/uploads\//, "uploads/"),
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await prisma.artikel.delete({
      where: {
        id,
      },
    });

    res.json({
      success: true,
      message: "Artikel berhasil dihapus",
    });
  } catch (error) {
    console.error("❌ Gagal menghapus artikel:", error);

    res.status(500).json({
      success: false,
      message: "Gagal menghapus artikel",
    });
  }
});

export default router;
