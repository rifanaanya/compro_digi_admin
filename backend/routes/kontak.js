import express from "express";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.ts";

const router = express.Router();

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

// ==========================================
// GET SEMUA KONTAK
// ==========================================

router.get("/", async (req, res) => {
  try {
    const kontak = await prisma.kontak.findMany({
      orderBy: {
        id: "asc",
      },
    });

    res.json({
      success: true,
      data: kontak,
    });
  } catch (error) {
    console.error("GET /api/kontak:", error);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil data kontak.",
    });
  }
});

// ==========================================
// GET KONTAK BERDASARKAN ID
// ==========================================

router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        success: false,
        message: "ID kontak tidak valid.",
      });
    }

    const kontak = await prisma.kontak.findUnique({
      where: {
        id,
      },
    });

    if (!kontak) {
      return res.status(404).json({
        success: false,
        message: "Data kontak tidak ditemukan.",
      });
    }

    res.json({
      success: true,
      data: kontak,
    });
  } catch (error) {
    console.error("GET /api/kontak/:id:", error);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil data kontak.",
    });
  }
});

// ==========================================
// POST TAMBAH KONTAK
// ==========================================

router.post("/", async (req, res) => {
  try {
    const { namaPengaturan, isiPengaturan } = req.body;

    if (!namaPengaturan?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Nama pengaturan wajib diisi.",
      });
    }

    if (!isiPengaturan?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Isi pengaturan wajib diisi.",
      });
    }

    const kontak = await prisma.kontak.create({
      data: {
        namaPengaturan: namaPengaturan.trim(),
        isiPengaturan: isiPengaturan.trim(),
      },
    });

    res.status(201).json({
      success: true,
      message: "Kontak berhasil ditambahkan.",
      data: kontak,
    });
  } catch (error) {
    console.error("POST /api/kontak:", error);

    res.status(500).json({
      success: false,
      message: "Gagal menambahkan kontak.",
    });
  }
});

// ==========================================
// PUT EDIT KONTAK
// ==========================================

router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        success: false,
        message: "ID kontak tidak valid.",
      });
    }

    const { namaPengaturan, isiPengaturan } = req.body;

    if (!namaPengaturan?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Nama pengaturan wajib diisi.",
      });
    }

    if (!isiPengaturan?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Isi pengaturan wajib diisi.",
      });
    }

    const existing = await prisma.kontak.findUnique({
      where: {
        id,
      },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Data kontak tidak ditemukan.",
      });
    }

    const kontak = await prisma.kontak.update({
      where: {
        id,
      },
      data: {
        namaPengaturan: namaPengaturan.trim(),
        isiPengaturan: isiPengaturan.trim(),
      },
    });

    res.json({
      success: true,
      message: "Kontak berhasil diperbarui.",
      data: kontak,
    });
  } catch (error) {
    console.error("PUT /api/kontak/:id:", error);

    res.status(500).json({
      success: false,
      message: "Gagal memperbarui kontak.",
    });
  }
});

// ==========================================
// DELETE KONTAK
// ==========================================

router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        success: false,
        message: "ID kontak tidak valid.",
      });
    }

    const existing = await prisma.kontak.findUnique({
      where: {
        id,
      },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Data kontak tidak ditemukan.",
      });
    }

    await prisma.kontak.delete({
      where: {
        id,
      },
    });

    res.json({
      success: true,
      message: "Kontak berhasil dihapus.",
    });
  } catch (error) {
    console.error("DELETE /api/kontak/:id:", error);

    res.status(500).json({
      success: false,
      message: "Gagal menghapus kontak.",
    });
  }
});

export default router;
