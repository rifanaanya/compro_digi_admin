import express from "express";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.ts";

const router = express.Router();

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

// ===============================
// GET SEMUA SOSIAL MEDIA
// ===============================
router.get("/", async (req, res) => {
  try {
    const data = await prisma.sosialMedia.findMany({
      orderBy: {
        id: "asc",
      },
    });

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("❌ Error get sosial media:", error);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil data sosial media",
    });
  }
});

// ===============================
// GET SOSIAL MEDIA BY ID
// ===============================
router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const data = await prisma.sosialMedia.findUnique({
      where: {
        id,
      },
    });

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Data sosial media tidak ditemukan",
      });
    }

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("❌ Error get sosial media:", error);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil sosial media",
    });
  }
});

// ===============================
// TAMBAH SOSIAL MEDIA
// ===============================
router.post("/", async (req, res) => {
  try {
    const { nama, url, icon } = req.body;

    if (!nama || !url || !icon) {
      return res.status(400).json({
        success: false,
        message: "Nama, URL, dan icon wajib diisi",
      });
    }

    const data = await prisma.sosialMedia.create({
      data: {
        nama: nama.trim(),
        url: url.trim(),
        icon: icon.trim(),
      },
    });

    res.status(201).json({
      success: true,
      message: "Sosial media berhasil ditambahkan",
      data,
    });
  } catch (error) {
    console.error("❌ Error tambah sosial media:", error);

    res.status(500).json({
      success: false,
      message: "Gagal menambahkan sosial media",
    });
  }
});

// ===============================
// EDIT SOSIAL MEDIA
// ===============================
router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { nama, url, icon } = req.body;

    if (!nama || !url || !icon) {
      return res.status(400).json({
        success: false,
        message: "Nama, URL, dan icon wajib diisi",
      });
    }

    const existingData = await prisma.sosialMedia.findUnique({
      where: {
        id,
      },
    });

    if (!existingData) {
      return res.status(404).json({
        success: false,
        message: "Data sosial media tidak ditemukan",
      });
    }

    const data = await prisma.sosialMedia.update({
      where: {
        id,
      },
      data: {
        nama: nama.trim(),
        url: url.trim(),
        icon: icon.trim(),
      },
    });

    res.json({
      success: true,
      message: "Sosial media berhasil diperbarui",
      data,
    });
  } catch (error) {
    console.error("❌ Error edit sosial media:", error);

    res.status(500).json({
      success: false,
      message: "Gagal memperbarui sosial media",
    });
  }
});

// ===============================
// DELETE SOSIAL MEDIA
// ===============================
router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const existingData = await prisma.sosialMedia.findUnique({
      where: {
        id,
      },
    });

    if (!existingData) {
      return res.status(404).json({
        success: false,
        message: "Data sosial media tidak ditemukan",
      });
    }

    await prisma.sosialMedia.delete({
      where: {
        id,
      },
    });

    res.json({
      success: true,
      message: "Sosial media berhasil dihapus",
    });
  } catch (error) {
    console.error("❌ Error delete sosial media:", error);

    res.status(500).json({
      success: false,
      message: "Gagal menghapus sosial media",
    });
  }
});

export default router;
