import express from "express";
import { PrismaClient } from "../generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";
import multer from "multer";
import path from "path";
import fs from "fs";

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

const uploadDir = path.join(process.cwd(), "uploads", "sertifikasi");

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

    const filename = `sertifikasi-${Date.now()}${ext}`;

    cb(null, filename);
  },
});

const upload = multer({
  storage,
});

// ==========================================
// GET SEMUA SERTIFIKASI
// ==========================================

router.get("/", async (req, res) => {
  try {
    const data = await prisma.sertifikasi.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("❌ Error mengambil Sertifikasi:", error);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil data sertifikasi.",
    });
  }
});

// ==========================================
// GET DETAIL SERTIFIKASI
// ==========================================

router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "ID sertifikasi tidak valid.",
      });
    }

    const data = await prisma.sertifikasi.findUnique({
      where: {
        id,
      },
    });

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Sertifikasi tidak ditemukan.",
      });
    }

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("❌ Error mengambil detail Sertifikasi:", error);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil detail sertifikasi.",
    });
  }
});

// ==========================================
// TAMBAH SERTIFIKASI
// ==========================================

router.post("/", upload.single("gambar"), async (req, res) => {
  try {
    const { nama, deskripsi } = req.body;

    if (!nama || !nama.trim()) {
      return res.status(400).json({
        success: false,
        message: "Nama sertifikat wajib diisi.",
      });
    }

    if (!deskripsi || !deskripsi.trim()) {
      return res.status(400).json({
        success: false,
        message: "Deskripsi sertifikat wajib diisi.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Gambar sertifikat wajib diupload.",
      });
    }

    const gambar = `/uploads/sertifikasi/${req.file.filename}`;

    const data = await prisma.sertifikasi.create({
      data: {
        nama: nama.trim(),
        deskripsi: deskripsi.trim(),
        gambar,
      },
    });

    res.status(201).json({
      success: true,
      message: "Sertifikasi berhasil ditambahkan.",
      data,
    });
  } catch (error) {
    console.error("❌ Error menambahkan Sertifikasi:", error);

    res.status(500).json({
      success: false,
      message: "Gagal menambahkan sertifikasi.",
    });
  }
});

// ==========================================
// EDIT SERTIFIKASI
// ==========================================

router.put("/:id", upload.single("gambar"), async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      // Hapus file baru jika ada
      if (req.file) {
        const newFilePath = path.join(uploadDir, req.file.filename);

        if (fs.existsSync(newFilePath)) {
          fs.unlinkSync(newFilePath);
        }
      }

      return res.status(400).json({
        success: false,
        message: "ID sertifikasi tidak valid.",
      });
    }

    const existing = await prisma.sertifikasi.findUnique({
      where: {
        id,
      },
    });

    if (!existing) {
      // Hapus file baru jika data tidak ditemukan
      if (req.file) {
        const newFilePath = path.join(uploadDir, req.file.filename);

        if (fs.existsSync(newFilePath)) {
          fs.unlinkSync(newFilePath);
        }
      }

      return res.status(404).json({
        success: false,
        message: "Sertifikasi tidak ditemukan.",
      });
    }

    const { nama, deskripsi } = req.body;

    if (!nama || !nama.trim()) {
      // Hapus file baru jika validasi gagal
      if (req.file) {
        const newFilePath = path.join(uploadDir, req.file.filename);

        if (fs.existsSync(newFilePath)) {
          fs.unlinkSync(newFilePath);
        }
      }

      return res.status(400).json({
        success: false,
        message: "Nama sertifikat wajib diisi.",
      });
    }

    if (!deskripsi || !deskripsi.trim()) {
      // Hapus file baru jika validasi gagal
      if (req.file) {
        const newFilePath = path.join(uploadDir, req.file.filename);

        if (fs.existsSync(newFilePath)) {
          fs.unlinkSync(newFilePath);
        }
      }

      return res.status(400).json({
        success: false,
        message: "Deskripsi sertifikat wajib diisi.",
      });
    }

    // Simpan path gambar lama
    const gambarLama = existing.gambar;

    // Default tetap menggunakan gambar lama
    let gambar = gambarLama;

    // Kalau user upload gambar baru
    if (req.file) {
      gambar = `/uploads/sertifikasi/${req.file.filename}`;
    }

    // ==========================================
    // UPDATE DATABASE TERLEBIH DAHULU
    // ==========================================

    const data = await prisma.sertifikasi.update({
      where: {
        id,
      },
      data: {
        nama: nama.trim(),
        deskripsi: deskripsi.trim(),
        gambar,
      },
    });

    // ==========================================
    // HAPUS GAMBAR LAMA SETELAH DATABASE BERHASIL
    // ==========================================

    if (req.file && gambarLama) {
      const oldPath = path.join(
        process.cwd(),
        gambarLama.replace(/^\/uploads\//, "uploads/"),
      );

      if (fs.existsSync(oldPath)) {
        try {
          fs.unlinkSync(oldPath);
          console.log("✅ Gambar lama berhasil dihapus:", oldPath);
        } catch (fileError) {
          console.error("⚠️ Gagal menghapus gambar lama:", fileError);
        }
      }
    }

    res.json({
      success: true,
      message: "Sertifikasi berhasil diperbarui.",
      data,
    });
  } catch (error) {
    console.error("❌ Error memperbarui Sertifikasi:", error);

    // Kalau database gagal di-update,
    // hapus file baru agar tidak menjadi file sampah.
    if (req.file) {
      const newFilePath = path.join(uploadDir, req.file.filename);

      if (fs.existsSync(newFilePath)) {
        try {
          fs.unlinkSync(newFilePath);
          console.log("🧹 File gambar baru dibersihkan:", newFilePath);
        } catch (fileError) {
          console.error("⚠️ Gagal membersihkan file baru:", fileError);
        }
      }
    }

    res.status(500).json({
      success: false,
      message: "Gagal memperbarui sertifikasi.",
    });
  }
});

// ==========================================
// DELETE SERTIFIKASI
// ==========================================

router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "ID sertifikasi tidak valid.",
      });
    }

    const existing = await prisma.sertifikasi.findUnique({
      where: {
        id,
      },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Sertifikasi tidak ditemukan.",
      });
    }

    await prisma.sertifikasi.delete({
      where: {
        id,
      },
    });

    // Hapus file gambar
    if (existing.gambar) {
      const imagePath = path.join(
        process.cwd(),
        existing.gambar.replace(/^\/uploads\//, "uploads/"),
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.json({
      success: true,
      message: "Sertifikasi berhasil dihapus.",
    });
  } catch (error) {
    console.error("❌ Error menghapus Sertifikasi:", error);

    res.status(500).json({
      success: false,
      message: "Gagal menghapus sertifikasi.",
    });
  }
});

export default router;
