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

// GET setting Layanan
router.get("/", async (req, res) => {
  try {
    const layananSetting = await prisma.layananSetting.findFirst();

    if (!layananSetting) {
      return res.status(404).json({
        success: false,
        message: "Data Layanan belum tersedia.",
      });
    }

    res.json({
      success: true,
      data: layananSetting,
    });
  } catch (error) {
    console.error("❌ Error GET Layanan:", error);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil data Layanan.",
    });
  }
});

// UPDATE setting Layanan
router.put("/", async (req, res) => {
  try {
    const { slogan, description } = req.body;

    if (!slogan || !slogan.trim()) {
      return res.status(400).json({
        success: false,
        message: "Slogan wajib diisi.",
      });
    }

    if (!description || !description.trim()) {
      return res.status(400).json({
        success: false,
        message: "Deskripsi wajib diisi.",
      });
    }

    let layananSetting = await prisma.layananSetting.findFirst();

    if (!layananSetting) {
      layananSetting = await prisma.layananSetting.create({
        data: {
          slogan: slogan.trim(),
          description: description.trim(),
        },
      });
    } else {
      layananSetting = await prisma.layananSetting.update({
        where: {
          id: layananSetting.id,
        },
        data: {
          slogan: slogan.trim(),
          description: description.trim(),
        },
      });
    }

    res.json({
      success: true,
      message: "Pengaturan Layanan berhasil disimpan.",
      data: layananSetting,
    });
  } catch (error) {
    console.error("❌ Error UPDATE Layanan:", error);

    res.status(500).json({
      success: false,
      message: "Gagal menyimpan pengaturan Layanan.",
    });
  }
});

export default router;
