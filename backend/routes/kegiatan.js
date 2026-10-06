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

const uploadDir = path.join(process.cwd(), "uploads", "kegiatan");

// Pastikan folder upload tersedia
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
    const ext = path.extname(file.originalname).toLowerCase();

    const filename = `kegiatan-${Date.now()}${ext}`;

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
// GET DATA KEGIATAN
// ==========================================

router.get("/", async (req, res) => {
  try {
    const kegiatan = await prisma.kegiatan.findFirst();

    if (!kegiatan) {
      return res.status(404).json({
        success: false,
        message: "Data Kegiatan belum tersedia",
      });
    }

    res.json({
      success: true,
      data: kegiatan,
    });
  } catch (error) {
    console.error("❌ ERROR GET KEGIATAN:", error);
    console.error("❌ MESSAGE:", error.message);
    console.error("❌ STACK:", error.stack);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil data Kegiatan",
      error: error.message,
    });
  }
});

// ==========================================
// UPDATE DATA KEGIATAN + UPLOAD GAMBAR
// ==========================================

router.put("/", upload.single("gambar"), async (req, res) => {
  try {
    console.log("=================================");
    console.log("📥 UPDATE KEGIATAN");
    console.log("📦 BODY:", req.body);
    console.log("🖼️ FILE:", req.file);
    console.log("=================================");

    const { deskripsi, caption } = req.body;

    // Validasi text
    if (!deskripsi || !caption) {
      return res.status(400).json({
        success: false,
        message: "Deskripsi dan caption wajib diisi",
      });
    }

    // Ambil data Kegiatan yang sudah ada
    let kegiatan = await prisma.kegiatan.findFirst();

    // Gunakan gambar lama jika tidak ada gambar baru
    let gambarBaru = kegiatan?.gambar || null;

    // Jika user upload gambar baru
    if (req.file) {
      gambarBaru = `/uploads/kegiatan/${req.file.filename}`;

      console.log("🖼️ FILE BARU:", req.file.filename);

      console.log("🔗 URL GAMBAR:", gambarBaru);
    }

    console.log("💾 GAMBAR YANG DISIMPAN:", gambarBaru);

    // ==========================================
    // CREATE
    // ==========================================

    if (!kegiatan) {
      kegiatan = await prisma.kegiatan.create({
        data: {
          deskripsi,
          caption,
          gambar: gambarBaru,
        },
      });

      console.log("✅ Data Kegiatan baru berhasil dibuat");
    }

    // ==========================================
    // UPDATE
    // ==========================================
    else {
      kegiatan = await prisma.kegiatan.update({
        where: {
          id: kegiatan.id,
        },

        data: {
          deskripsi,
          caption,
          gambar: gambarBaru,
        },
      });

      console.log("✅ Data Kegiatan berhasil diperbarui");
    }

    // ==========================================
    // RESPONSE
    // ==========================================

    res.json({
      success: true,
      message: "Data Kegiatan berhasil disimpan",
      data: kegiatan,
    });
  } catch (error) {
    console.error("❌ ERROR UPDATE KEGIATAN:", error);

    console.error("❌ MESSAGE:", error.message);

    console.error("❌ STACK:", error.stack);

    res.status(500).json({
      success: false,
      message: "Gagal menyimpan data Kegiatan",
      error: error.message,
    });
  }
});

export default router;
