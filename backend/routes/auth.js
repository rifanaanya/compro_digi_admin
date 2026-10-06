import express from "express";
import bcrypt from "bcrypt";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.ts";

const router = express.Router();

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

// LOGIN ADMIN
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Cek input kosong
    if (!username || !password) {
      return res.status(400).json({
        message: "Username dan password wajib diisi",
      });
    }

    // Cari admin berdasarkan username
    const admin = await prisma.admin.findUnique({
      where: {
        username,
      },
    });

    // Username tidak ditemukan
    if (!admin) {
      return res.status(401).json({
        message: "Username atau password salah",
      });
    }

    // Cek password
    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Username atau password salah",
      });
    }

    // Login berhasil
    res.json({
      message: "Login berhasil",
      admin: {
        id: admin.id,
        username: admin.username,
        nama: admin.nama,
        email: admin.email,
        telepon: admin.telepon,
        role: admin.role,
        foto: admin.foto,
      },
    });
  } catch (error) {
    console.error("❌ Error login:", error);

    res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
});

export default router;
