import express from "express";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";
import fs from "fs";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.ts";

const router = express.Router();

const uploadDir = path.join(process.cwd(), "uploads", "profile");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `profile-${Date.now()}${ext}`;

    cb(null, filename);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("File harus berupa gambar"));
    }
  },
});

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

// GET PROFILE
router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const admin = await prisma.admin.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        nama: true,
        email: true,
        telepon: true,
        role: true,
        foto: true,
      },
    });

    if (!admin) {
      return res.status(404).json({
        message: "Data profile tidak ditemukan",
      });
    }

    res.json({
      message: "Data profile berhasil diambil",
      admin,
    });
  } catch (error) {
    console.error("❌ Error get profile:", error);

    res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
});

// UPDATE PROFILE
// UPDATE PROFILE
router.put("/:id", upload.single("foto"), async (req, res) => {
  try {
    const id = Number(req.params.id);

    const { nama, email, telepon, password } = req.body;

    if (!nama || !email || !telepon) {
      return res.status(400).json({
        message: "Nama, email, dan nomor telepon wajib diisi",
      });
    }

    const updateData = {
      nama: nama.trim(),
      email: email.trim(),
      telepon: telepon.trim(),
    };

    // Kalau password diisi, baru password diperbarui
    if (password && password.trim()) {
      updateData.password = await bcrypt.hash(password.trim(), 10);
    }

    // Kalau ada foto baru
    if (req.file) {
      updateData.foto = `profile/${req.file.filename}`;
    }

    const admin = await prisma.admin.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        username: true,
        nama: true,
        email: true,
        telepon: true,
        role: true,
        foto: true,
      },
    });

    res.json({
      message: "Profil berhasil diperbarui",
      admin,
    });
  } catch (error) {
    console.error("❌ Error update profile:", error);

    res.status(500).json({
      message: "Gagal memperbarui profil",
    });
  }
});

export default router;
