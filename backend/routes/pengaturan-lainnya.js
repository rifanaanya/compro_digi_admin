import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { PrismaClient } from "../generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";

const router = express.Router();

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

// ==========================================
// FOLDER UPLOAD
// ==========================================

const uploadDir = path.join(process.cwd(), "uploads", "pengaturan-lainnya");

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

    const filename = Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;

    cb(null, filename);
  },
});

const upload = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp"];

    const ext = path.extname(file.originalname).toLowerCase();

    if (!allowedExtensions.includes(ext)) {
      return cb(new Error("Format gambar harus JPG, JPEG, PNG, atau WEBP."));
    }

    cb(null, true);
  },
});

// ==========================================
// GET SEMUA PENGATURAN
// GET /api/pengaturan-lainnya
// ==========================================

router.get("/", async (req, res) => {
  try {
    const data = await prisma.pengaturanLainnya.findMany({
      orderBy: {
        id: "asc",
      },
    });

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("❌ Error mengambil Pengaturan Lainnya:", error);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil data Pengaturan Lainnya.",
    });
  }
});

// ==========================================
// GET DETAIL
// GET /api/pengaturan-lainnya/:id
// ==========================================

router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "ID tidak valid.",
      });
    }

    const data = await prisma.pengaturanLainnya.findUnique({
      where: {
        id,
      },
    });

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Pengaturan tidak ditemukan.",
      });
    }

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("❌ Error mengambil detail Pengaturan Lainnya:", error);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil detail Pengaturan Lainnya.",
    });
  }
});

// ==========================================
// CREATE
// POST /api/pengaturan-lainnya
// ==========================================

router.post("/", upload.single("gambar"), async (req, res) => {
  try {
    const { nama } = req.body;

    if (!nama || !nama.trim()) {
      return res.status(400).json({
        success: false,
        message: "Nama pengaturan wajib diisi.",
      });
    }

    const gambar = req.file
      ? `/uploads/pengaturan-lainnya/${req.file.filename}`
      : null;

    const data = await prisma.pengaturanLainnya.create({
      data: {
        nama: nama.trim(),
        gambar,
      },
    });

    res.status(201).json({
      success: true,
      message: "Pengaturan berhasil dibuat.",
      data,
    });
  } catch (error) {
    console.error("❌ Error membuat Pengaturan Lainnya:", error);

    res.status(500).json({
      success: false,
      message: "Gagal membuat Pengaturan Lainnya.",
    });
  }
});

// ==========================================
// UPDATE
// PUT /api/pengaturan-lainnya/:id
// ==========================================

router.put("/:id", upload.single("gambar"), async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "ID tidak valid.",
      });
    }

    const existing = await prisma.pengaturanLainnya.findUnique({
      where: {
        id,
      },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Pengaturan tidak ditemukan.",
      });
    }

    const { nama } = req.body;

    if (!nama || !nama.trim()) {
      return res.status(400).json({
        success: false,
        message: "Nama pengaturan wajib diisi.",
      });
    }

    let gambar = existing.gambar;

    // Kalau upload gambar baru
    if (req.file) {
      gambar = `/uploads/pengaturan-lainnya/${req.file.filename}`;

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

    const data = await prisma.pengaturanLainnya.update({
      where: {
        id,
      },

      data: {
        nama: nama.trim(),
        gambar,
      },
    });

    res.json({
      success: true,
      message: "Pengaturan berhasil diperbarui.",
      data,
    });
  } catch (error) {
    console.error("❌ Error memperbarui Pengaturan Lainnya:", error);

    res.status(500).json({
      success: false,
      message: "Gagal memperbarui Pengaturan Lainnya.",
    });
  }
});

export default router;
