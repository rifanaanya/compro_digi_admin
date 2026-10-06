import express from "express";

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
// GET DATA VISI & MISI
// ==========================================

router.get("/", async (req, res) => {
  try {
    const visiMisi = await prisma.visiMisi.findFirst({
      include: {
        misi: {
          orderBy: {
            sortOrder: "asc",
          },
        },
      },
    });

    if (!visiMisi) {
      return res.status(404).json({
        success: false,
        message: "Data Visi & Misi belum tersedia",
      });
    }

    res.json({
      success: true,
      data: visiMisi,
    });
  } catch (error) {
    console.error("❌ Error GET Visi & Misi:", error);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil data Visi & Misi",
    });
  }
});

// ==========================================
// UPDATE / SIMPAN VISI & MISI
// ==========================================

router.put("/", async (req, res) => {
  try {
    const { visi, misi } = req.body;

    // Validasi
    if (!visi || !Array.isArray(misi)) {
      return res.status(400).json({
        success: false,
        message: "Visi dan misi wajib diisi",
      });
    }

    const result = await prisma.$transaction(async (tx) => {
      // Cari data utama
      let visiMisi = await tx.visiMisi.findFirst();

      // Kalau belum ada → CREATE
      if (!visiMisi) {
        visiMisi = await tx.visiMisi.create({
          data: {
            visi,
          },
        });
      }

      // Kalau sudah ada → UPDATE
      else {
        visiMisi = await tx.visiMisi.update({
          where: {
            id: visiMisi.id,
          },
          data: {
            visi,
          },
        });
      }

      // Hapus semua misi lama
      await tx.misi.deleteMany({
        where: {
          visiMisiId: visiMisi.id,
        },
      });

      // Buat ulang misi
      if (misi.length > 0) {
        await tx.misi.createMany({
          data: misi
            .filter((item) => item.trim() !== "")
            .map((item, index) => ({
              isi: item,
              sortOrder: index,
              visiMisiId: visiMisi.id,
            })),
        });
      }

      // Ambil data terbaru
      return tx.visiMisi.findUnique({
        where: {
          id: visiMisi.id,
        },
        include: {
          misi: {
            orderBy: {
              sortOrder: "asc",
            },
          },
        },
      });
    });

    res.json({
      success: true,
      message: "Data Visi & Misi berhasil disimpan",
      data: result,
    });
  } catch (error) {
    console.error("❌ Error UPDATE Visi & Misi:", error);

    res.status(500).json({
      success: false,
      message: "Gagal menyimpan data Visi & Misi",
      error: error.message,
    });
  }
});

export default router;
