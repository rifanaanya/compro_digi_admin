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

const uploadDir = path.join(process.cwd(), "uploads", "mitra");

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
// GET SEMUA MITRA
// GET /api/mitra
// ==========================================

router.get("/", async (req, res) => {
  try {
    const data = await prisma.mitra.findMany({
      orderBy: {
        id: "asc",
      },
    });

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("❌ Error mengambil data Mitra:", error);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil data Mitra.",
    });
  }
});

// ==========================================
// GET DETAIL MITRA
// GET /api/mitra/:id
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

    const data = await prisma.mitra.findUnique({
      where: {
        id,
      },
    });

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Mitra tidak ditemukan.",
      });
    }

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("❌ Error mengambil detail Mitra:", error);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil detail Mitra.",
    });
  }
});

// ==========================================
// CREATE MITRA
// POST /api/mitra
// ==========================================

router.post("/", upload.single("logo"), async (req, res) => {
  try {
    const { nama } = req.body;

    if (!nama || !nama.trim()) {
      return res.status(400).json({
        success: false,
        message: "Nama Mitra wajib diisi.",
      });
    }

    const logo = req.file ? `/uploads/mitra/${req.file.filename}` : null;

    const data = await prisma.mitra.create({
      data: {
        nama: nama.trim(),
        logo,
      },
    });

    res.status(201).json({
      success: true,
      message: "Mitra berhasil dibuat.",
      data,
    });
  } catch (error) {
    console.error("❌ Error membuat Mitra:", error);

    res.status(500).json({
      success: false,
      message: "Gagal membuat Mitra.",
    });
  }
});

// ==========================================
// UPDATE MITRA
// PUT /api/mitra/:id
// ==========================================

router.put("/:id", upload.single("logo"), async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "ID tidak valid.",
      });
    }

    const existing = await prisma.mitra.findUnique({
      where: {
        id,
      },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Mitra tidak ditemukan.",
      });
    }

    const { nama } = req.body;

    if (!nama || !nama.trim()) {
      return res.status(400).json({
        success: false,
        message: "Nama Mitra wajib diisi.",
      });
    }

    let logo = existing.logo;

    // Kalau upload logo baru
    if (req.file) {
      logo = `/uploads/mitra/${req.file.filename}`;

      // Hapus logo lama
      if (existing.logo) {
        const oldPath = path.join(
          process.cwd(),
          existing.logo.replace(/^\/+/, ""),
        );

        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
    }

    const data = await prisma.mitra.update({
      where: {
        id,
      },

      data: {
        nama: nama.trim(),
        logo,
      },
    });

    res.json({
      success: true,
      message: "Mitra berhasil diperbarui.",
      data,
    });
  } catch (error) {
    console.error("❌ Error memperbarui Mitra:", error);

    res.status(500).json({
      success: false,
      message: "Gagal memperbarui Mitra.",
    });
  }
});

// ==========================================
// DELETE MITRA
// DELETE /api/mitra/:id
// ==========================================

router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "ID tidak valid.",
      });
    }

    const existing = await prisma.mitra.findUnique({
      where: {
        id,
      },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Mitra tidak ditemukan.",
      });
    }

    // Hapus file logo
    if (existing.logo) {
      const filePath = path.join(
        process.cwd(),
        existing.logo.replace(/^\/+/, ""),
      );

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await prisma.mitra.delete({
      where: {
        id,
      },
    });

    res.json({
      success: true,
      message: "Mitra berhasil dihapus.",
    });
  } catch (error) {
    console.error("❌ Error menghapus Mitra:", error);

    res.status(500).json({
      success: false,
      message: "Gagal menghapus Mitra.",
    });
  }
});

export default router;
