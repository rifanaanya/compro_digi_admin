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

const prisma = new PrismaClient({
  adapter,
});

// ==========================================
// KONFIGURASI UPLOAD GAMBAR
// ==========================================

const uploadDir = path.join(process.cwd(), "uploads", "tentang-digi");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, {
    recursive: true,
  });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);

    const filename = `tentang-${Date.now()}${ext}`;

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
      return cb(new Error("Format gambar harus JPG, JPEG, PNG, atau WEBP"));
    }

    cb(null, true);
  },
});

// ==========================================
// GET DATA TENTANG DIGI
// ==========================================

router.get("/", async (req, res) => {
  try {
    const tentangDigi = await prisma.tentangDigi.findFirst();

    if (!tentangDigi) {
      return res.status(404).json({
        success: false,
        message: "Data Tentang Digi belum tersedia",
      });
    }

    res.json({
      success: true,
      data: tentangDigi,
    });
  } catch (error) {
    console.error("❌ Error GET Tentang Digi:", error);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil data Tentang Digi",
    });
  }
});

// ==========================================
// UPDATE DATA + UPLOAD GAMBAR
// ==========================================

router.put("/", upload.single("gambar"), async (req, res) => {
  try {
    console.log("📦 BODY:", req.body);
    console.log("🖼️ FILE:", req.file);

    const { deskripsi } = req.body;

    if (!deskripsi) {
      return res.status(400).json({
        success: false,
        message: "Deskripsi wajib diisi",
      });
    }

    let tentangDigi = await prisma.tentangDigi.findFirst();

    // Pertahankan gambar lama
    let gambarBaru = tentangDigi?.gambar || null;

    // Kalau upload gambar baru
    if (req.file) {
      gambarBaru = `/uploads/tentang-digi/${req.file.filename}`;
    }

    console.log("💾 GAMBAR YANG DISIMPAN:", gambarBaru);

    // Kalau belum ada data → CREATE
    if (!tentangDigi) {
      tentangDigi = await prisma.tentangDigi.create({
        data: {
          deskripsi,
          gambar: gambarBaru,
        },
      });
    }

    // Kalau sudah ada → UPDATE
    else {
      tentangDigi = await prisma.tentangDigi.update({
        where: {
          id: tentangDigi.id,
        },
        data: {
          deskripsi,
          gambar: gambarBaru,
        },
      });
    }

    res.json({
      success: true,
      message: "Data Tentang Digi berhasil disimpan",
      data: tentangDigi,
    });
  } catch (error) {
    console.error("❌ ERROR UPDATE TENTANG DIGI:", error);
    console.error("❌ MESSAGE:", error.message);
    console.error("❌ STACK:", error.stack);

    res.status(500).json({
      success: false,
      message: "Gagal menyimpan data Tentang Digi",
      error: error.message,
    });
  }
});

export default router;
