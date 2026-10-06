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

// GET semua setting Beranda
router.get("/", async (req, res) => {
  try {
    const homeSetting = await prisma.homeSetting.findFirst({
      include: {
        categories: {
          orderBy: {
            sortOrder: "asc",
          },
        },
      },
    });

    if (!homeSetting) {
      return res.status(404).json({
        success: false,
        message: "Data Beranda belum tersedia",
      });
    }

    res.json({
      success: true,
      data: homeSetting,
    });
  } catch (error) {
    console.error("❌ Error GET home:", error);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil data Beranda",
    });
  }
});

// UPDATE setting Beranda
router.put("/", async (req, res) => {
  try {
    const { slogan, description, categories } = req.body;

    if (!slogan || !description || !Array.isArray(categories)) {
      return res.status(400).json({
        success: false,
        message: "Slogan, description, dan categories wajib diisi",
      });
    }

    const result = await prisma.$transaction(async (tx) => {
      let homeSetting = await tx.homeSetting.findFirst();

      if (!homeSetting) {
        homeSetting = await tx.homeSetting.create({
          data: {
            slogan,
            description,
          },
        });
      } else {
        homeSetting = await tx.homeSetting.update({
          where: {
            id: homeSetting.id,
          },
          data: {
            slogan,
            description,
          },
        });
      }

      await tx.homeCategory.deleteMany({
        where: {
          homeSettingId: homeSetting.id,
        },
      });

      if (categories.length > 0) {
        await tx.homeCategory.createMany({
          data: categories.map((category, index) => ({
            name: category.name,
            sortOrder: index,
            homeSettingId: homeSetting.id,
          })),
        });
      }

      return tx.homeSetting.findUnique({
        where: {
          id: homeSetting.id,
        },
        include: {
          categories: {
            orderBy: {
              sortOrder: "asc",
            },
          },
        },
      });
    });

    res.json({
      success: true,
      message: "Data Beranda berhasil disimpan",
      data: result,
    });
  } catch (error) {
    console.error("❌ Error UPDATE home:", error);

    res.status(500).json({
      success: false,
      message: "Gagal menyimpan data Beranda",
    });
  }
});

export default router;
