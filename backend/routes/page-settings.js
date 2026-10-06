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

// ==========================================
// GET PAGE SETTING
// GET /api/page-settings/:page
// ==========================================

router.get("/:page", async (req, res) => {
  try {
    const { page } = req.params;

    const data = await prisma.pageSetting.findUnique({
      where: {
        page,
      },
    });

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Pengaturan halaman tidak ditemukan.",
      });
    }

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("❌ Error mengambil Page Setting:", error);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil pengaturan halaman.",
    });
  }
});

// ==========================================
// PUT PAGE SETTING
// PUT /api/page-settings/:page
// ==========================================

router.put("/:page", async (req, res) => {
  try {
    const { page } = req.params;
    const { title, description } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Judul wajib diisi.",
      });
    }

    if (!description || !description.trim()) {
      return res.status(400).json({
        success: false,
        message: "Deskripsi wajib diisi.",
      });
    }

    const existing = await prisma.pageSetting.findUnique({
      where: {
        page,
      },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Pengaturan halaman tidak ditemukan.",
      });
    }

    const data = await prisma.pageSetting.update({
      where: {
        page,
      },
      data: {
        title: title.trim(),
        description: description.trim(),
      },
    });

    res.json({
      success: true,
      message: "Pengaturan halaman berhasil diperbarui.",
      data,
    });
  } catch (error) {
    console.error("❌ Error memperbarui Page Setting:", error);

    res.status(500).json({
      success: false,
      message: "Gagal memperbarui pengaturan halaman.",
    });
  }
});

export default router;
