import express from "express";
import fs from "fs";
import path from "path";
import multer from "multer";

import { PrismaClient } from "../generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";

const router = express.Router();

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

// =========================
// UPLOAD DIRECTORY
// =========================

const uploadDir = path.join(process.cwd(), "uploads", "footer");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// =========================
// MULTER
// =========================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = path
      .basename(file.originalname, ext)
      .replace(/\s+/g, "-")
      .toLowerCase();

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
      cb(new Error("Format gambar tidak didukung"));
    }
  },
});

// =========================
// GET SEMUA FOOTER
// =========================

router.get("/", async (req, res) => {
  try {
    const data = await prisma.footerSetting.findMany({
      orderBy: {
        id: "asc",
      },
    });

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("GET Footer Error:", error);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil data footer",
    });
  }
});

// =========================
// GET FOOTER BY ID
// =========================

router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const data = await prisma.footerSetting.findUnique({
      where: {
        id,
      },
    });

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Data footer tidak ditemukan",
      });
    }

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("GET Footer By ID Error:", error);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil data footer",
    });
  }
});

// =========================
// TAMBAH FOOTER
// =========================

router.post("/", upload.single("gambar"), async (req, res) => {
  try {
    const { nama, isi } = req.body;

    if (!nama) {
      return res.status(400).json({
        success: false,
        message: "Nama pengaturan wajib diisi",
      });
    }

    const gambar = req.file ? `/uploads/footer/${req.file.filename}` : null;

    const data = await prisma.footerSetting.create({
      data: {
        nama,
        isi: isi || null,
        gambar,
      },
    });

    res.status(201).json({
      success: true,
      message: "Footer berhasil ditambahkan",
      data,
    });
  } catch (error) {
    console.error("POST Footer Error:", error);

    res.status(500).json({
      success: false,
      message: "Gagal menambahkan footer",
    });
  }
});

// =========================
// EDIT FOOTER
// =========================

router.put("/:id", upload.single("gambar"), async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { nama, isi } = req.body;

    const existing = await prisma.footerSetting.findUnique({
      where: {
        id,
      },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Data footer tidak ditemukan",
      });
    }

    let gambar = existing.gambar;

    // Kalau upload gambar baru
    if (req.file) {
      gambar = `/uploads/footer/${req.file.filename}`;

      // Hapus gambar lama
      if (existing.gambar) {
        const oldPath = path.join(
          process.cwd(),
          existing.gambar.replace(/^\/+/, ""),
        );

        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
    }

    const data = await prisma.footerSetting.update({
      where: {
        id,
      },
      data: {
        nama,
        isi: isi || null,
        gambar,
      },
    });

    res.json({
      success: true,
      message: "Footer berhasil diperbarui",
      data,
    });
  } catch (error) {
    console.error("PUT Footer Error:", error);

    res.status(500).json({
      success: false,
      message: "Gagal memperbarui footer",
    });
  }
});

// =========================
// DELETE FOOTER
// =========================

router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const existing = await prisma.footerSetting.findUnique({
      where: {
        id,
      },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Data footer tidak ditemukan",
      });
    }

    // Hapus file gambar jika ada
    if (existing.gambar) {
      const imagePath = path.join(
        process.cwd(),
        existing.gambar.replace(/^\/+/, ""),
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await prisma.footerSetting.delete({
      where: {
        id,
      },
    });

    res.json({
      success: true,
      message: "Footer berhasil dihapus",
    });
  } catch (error) {
    console.error("DELETE Footer Error:", error);

    res.status(500).json({
      success: false,
      message: "Gagal menghapus footer",
    });
  }
});

export default router;
