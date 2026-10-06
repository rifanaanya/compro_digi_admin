import express from "express";
import { PrismaClient } from "../generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";

const router = express.Router();

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

// GET semua pesan masuk
router.get("/", async (req, res) => {
  try {
    const data = await prisma.kontakMasuk.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("❌ Error mengambil Kontak Masuk:", error);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil pesan masuk.",
    });
  }
});

// GET detail pesan
router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "ID pesan tidak valid.",
      });
    }

    const data = await prisma.kontakMasuk.findUnique({
      where: {
        id,
      },
    });

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Pesan tidak ditemukan.",
      });
    }

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("❌ Error mengambil detail Kontak Masuk:", error);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil detail pesan.",
    });
  }
});

// POST pesan dari website publik
router.post("/", async (req, res) => {
  try {
    const { nama, email, pesan } = req.body;

    if (!nama || !nama.trim()) {
      return res.status(400).json({
        success: false,
        message: "Nama wajib diisi.",
      });
    }

    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: "Email wajib diisi.",
      });
    }

    if (!pesan || !pesan.trim()) {
      return res.status(400).json({
        success: false,
        message: "Pesan wajib diisi.",
      });
    }

    const data = await prisma.kontakMasuk.create({
      data: {
        nama: nama.trim(),
        email: email.trim(),
        pesan: pesan.trim(),
      },
    });

    res.status(201).json({
      success: true,
      message: "Pesan berhasil dikirim.",
      data,
    });
  } catch (error) {
    console.error("❌ Error menyimpan Kontak Masuk:", error);

    res.status(500).json({
      success: false,
      message: "Gagal mengirim pesan.",
    });
  }
});

// DELETE pesan
router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "ID pesan tidak valid.",
      });
    }

    const existing = await prisma.kontakMasuk.findUnique({
      where: {
        id,
      },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Pesan tidak ditemukan.",
      });
    }

    await prisma.kontakMasuk.delete({
      where: {
        id,
      },
    });

    res.json({
      success: true,
      message: "Pesan berhasil dihapus.",
    });
  } catch (error) {
    console.error("❌ Error menghapus Kontak Masuk:", error);

    res.status(500).json({
      success: false,
      message: "Gagal menghapus pesan.",
    });
  }
});

export default router;
