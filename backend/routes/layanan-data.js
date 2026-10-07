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

const uploadDir = path.join(process.cwd(), "uploads", "layanan");

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
// GET SEMUA LAYANAN
// ==========================================

router.get("/", async (req, res) => {
  try {
    const layanan = await prisma.layanan.findMany({
      orderBy: {
        id: "asc",
      },
    });

    res.json({
      success: true,
      data: layanan,
    });
  } catch (error) {
    console.error("❌ Gagal mengambil data layanan:", error);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil data layanan",
    });
  }
});

// ==========================================
// GET DETAIL LAYANAN
// ==========================================

router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const layanan = await prisma.layanan.findUnique({
      where: {
        id,
      },
    });

    if (!layanan) {
      return res.status(404).json({
        success: false,
        message: "Layanan tidak ditemukan",
      });
    }

    res.json({
      success: true,
      data: layanan,
    });
  } catch (error) {
    console.error("❌ Gagal mengambil detail layanan:", error);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil detail layanan",
    });
  }
});

// ==========================================
// TAMBAH LAYANAN
// ==========================================

router.post("/", upload.single("gambar"), async (req, res) => {
  try {
    const { judul, deskripsi, tipe } = req.body;

    if (!judul?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Judul layanan wajib diisi",
      });
    }

    if (!deskripsi?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Deskripsi layanan wajib diisi",
      });
    }

    if (!tipe?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Tipe layanan wajib diisi",
      });
    }

    const gambar = req.file ? `/uploads/layanan/${req.file.filename}` : null;

    const layanan = await prisma.layanan.create({
      data: {
        judul: judul.trim(),
        deskripsi: deskripsi.trim(),
        gambar,
        tipe: tipe.trim(),
      },
    });

    res.status(201).json({
      success: true,
      message: "Layanan berhasil ditambahkan",
      data: layanan,
    });
  } catch (error) {
    console.error("❌ Gagal menambahkan layanan:", error);

    res.status(500).json({
      success: false,
      message: "Gagal menambahkan layanan",
    });
  }
});

// ==========================================
// EDIT LAYANAN
// ==========================================

router.put("/:id", upload.single("gambar"), async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { judul, deskripsi, tipe } = req.body;

    const layananLama = await prisma.layanan.findUnique({
      where: {
        id,
      },
    });

    if (!layananLama) {
      return res.status(404).json({
        success: false,
        message: "Layanan tidak ditemukan",
      });
    }

    if (!judul?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Judul layanan wajib diisi",
      });
    }

    if (!deskripsi?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Deskripsi layanan wajib diisi",
      });
    }

    if (!tipe?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Tipe layanan wajib diisi",
      });
    }

    let gambar = layananLama.gambar;

    // Kalau upload gambar baru
    if (req.file) {
      gambar = `/uploads/layanan/${req.file.filename}`;

      // Hapus gambar lama
      if (layananLama.gambar) {
        const oldPath = path.join(
          process.cwd(),
          layananLama.gambar.replace(/^\/uploads\//, "uploads/"),
        );

        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
    }

    const layanan = await prisma.layanan.update({
      where: {
        id,
      },

      data: {
        judul: judul.trim(),
        deskripsi: deskripsi.trim(),
        tipe: tipe.trim(),
        gambar,
      },
    });

    res.json({
      success: true,
      message: "Layanan berhasil diperbarui",
      data: layanan,
    });
  } catch (error) {
    console.error("❌ Gagal mengedit layanan:", error);

    res.status(500).json({
      success: false,
      message: "Gagal mengedit layanan",
    });
  }
});

// ==========================================
// HAPUS LAYANAN
// ==========================================

router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const layanan = await prisma.layanan.findUnique({
      where: {
        id,
      },
    });

    if (!layanan) {
      return res.status(404).json({
        success: false,
        message: "Layanan tidak ditemukan",
      });
    }

    // Hapus file gambar
    if (layanan.gambar) {
      const imagePath = path.join(
        process.cwd(),
        layanan.gambar.replace(/^\/uploads\//, "uploads/"),
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await prisma.layanan.delete({
      where: {
        id,
      },
    });

    res.json({
      success: true,
      message: "Layanan berhasil dihapus",
    });
  } catch (error) {
    console.error("❌ Gagal menghapus layanan:", error);

    res.status(500).json({
      success: false,
      message: "Gagal menghapus layanan",
    });
  }
});

export default router;
