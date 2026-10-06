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

// TAMBAH PENGGUNA
router.post("/", async (req, res) => {
  try {
    const { nama, email, password, telepon, role } = req.body;

    if (!nama || !email || !password || !telepon || !role) {
      return res.status(400).json({
        message: "Nama, email, password, nomor telepon, dan role wajib diisi",
      });
    }

    // Membuat username otomatis dari nama
    let username = nama.trim().toLowerCase().replace(/\s+/g, "");

    // Cek username apakah sudah digunakan
    let usernameFinal = username;
    let nomor = 2;

    while (
      await prisma.admin.findUnique({
        where: {
          username: usernameFinal,
        },
      })
    ) {
      usernameFinal = `${username}${nomor}`;
      nomor++;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password.trim(), 10);

    const pengguna = await prisma.admin.create({
      data: {
        username: usernameFinal,
        nama: nama.trim(),
        email: email.trim(),
        password: hashedPassword,
        telepon: telepon.trim(),
        role: role.trim(),
      },
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

    res.status(201).json({
      message: "Pengguna berhasil ditambahkan",
      pengguna,
    });
  } catch (error) {
    console.error("❌ Error tambah pengguna:", error);

    res.status(500).json({
      message: "Gagal menambahkan pengguna",
    });
  }
});

// GET SEMUA PENGGUNA
router.get("/", async (req, res) => {
  try {
    const pengguna = await prisma.admin.findMany({
      select: {
        id: true,
        username: true,
        nama: true,
        email: true,
        telepon: true,
        role: true,
        foto: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        id: "asc",
      },
    });

    res.json({
      message: "Data pengguna berhasil diambil",
      pengguna,
    });
  } catch (error) {
    console.error("❌ Error get pengguna:", error);

    res.status(500).json({
      message: "Gagal mengambil data pengguna",
    });
  }
});

// GET PENGGUNA BERDASARKAN ID
router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const pengguna = await prisma.admin.findUnique({
      where: {
        id,
      },
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

    if (!pengguna) {
      return res.status(404).json({
        message: "Data pengguna tidak ditemukan",
      });
    }

    res.json({
      message: "Data pengguna berhasil diambil",
      pengguna,
    });
  } catch (error) {
    console.error("❌ Error get detail pengguna:", error);

    res.status(500).json({
      message: "Gagal mengambil detail pengguna",
    });
  }
});

// UPDATE PENGGUNA
// UPDATE PENGGUNA
router.put("/:id", upload.single("foto"), async (req, res) => {
  try {
    const id = Number(req.params.id);

    const { nama, email, password, telepon, role } = req.body;

    if (!nama || !email || !telepon || !role) {
      return res.status(400).json({
        message: "Nama, email, nomor telepon, dan role wajib diisi",
      });
    }

    const updateData = {
      nama: nama.trim(),
      email: email.trim(),
      telepon: telepon.trim(),
      role: role.trim(),

      ...(req.file
        ? {
            foto: `profile/${req.file.filename}`,
          }
        : {}),

      ...(password && password.trim()
        ? {
            password: await bcrypt.hash(password.trim(), 10),
          }
        : {}),
    };

    const pengguna = await prisma.admin.update({
      where: {
        id,
      },

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
      message: "Data pengguna berhasil diperbarui",
      pengguna,
    });
  } catch (error) {
    console.error("❌ Error update pengguna:", error);

    res.status(500).json({
      message: "Gagal memperbarui data pengguna",
    });
  }
});

// DELETE PENGGUNA
router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const pengguna = await prisma.admin.findUnique({
      where: {
        id,
      },
    });

    if (!pengguna) {
      return res.status(404).json({
        message: "Data pengguna tidak ditemukan",
      });
    }

    await prisma.admin.delete({
      where: {
        id,
      },
    });

    res.json({
      message: "Pengguna berhasil dihapus",
    });
  } catch (error) {
    console.error("❌ Error delete pengguna:", error);

    res.status(500).json({
      message: "Gagal menghapus pengguna",
    });
  }
});

export default router;
