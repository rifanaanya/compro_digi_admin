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

// GET semua FAQ
router.get("/", async (req, res) => {
  try {
    const faqs = await prisma.faq.findMany({
      orderBy: {
        id: "asc",
      },
    });

    res.json({
      success: true,
      data: faqs,
    });
  } catch (error) {
    console.error("❌ Error GET FAQ:", error);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil data FAQ",
    });
  }
});

// GET FAQ berdasarkan ID
router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const faq = await prisma.faq.findUnique({
      where: {
        id,
      },
    });

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: "FAQ tidak ditemukan",
      });
    }

    res.json({
      success: true,
      data: faq,
    });
  } catch (error) {
    console.error("❌ Error GET FAQ detail:", error);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil detail FAQ",
    });
  }
});

// TAMBAH FAQ
router.post("/", async (req, res) => {
  try {
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).json({
        success: false,
        message: "Pertanyaan dan jawaban wajib diisi",
      });
    }

    const faq = await prisma.faq.create({
      data: {
        question,
        answer,
      },
    });

    res.status(201).json({
      success: true,
      message: "FAQ berhasil ditambahkan",
      data: faq,
    });
  } catch (error) {
    console.error("❌ Error POST FAQ:", error);

    res.status(500).json({
      success: false,
      message: "Gagal menambahkan FAQ",
    });
  }
});

// UPDATE FAQ
router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).json({
        success: false,
        message: "Pertanyaan dan jawaban wajib diisi",
      });
    }

    const existingFaq = await prisma.faq.findUnique({
      where: {
        id,
      },
    });

    if (!existingFaq) {
      return res.status(404).json({
        success: false,
        message: "FAQ tidak ditemukan",
      });
    }

    const faq = await prisma.faq.update({
      where: {
        id,
      },
      data: {
        question,
        answer,
      },
    });

    res.json({
      success: true,
      message: "FAQ berhasil diperbarui",
      data: faq,
    });
  } catch (error) {
    console.error("❌ Error PUT FAQ:", error);

    res.status(500).json({
      success: false,
      message: "Gagal memperbarui FAQ",
    });
  }
});

// DELETE FAQ
router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const existingFaq = await prisma.faq.findUnique({
      where: {
        id,
      },
    });

    if (!existingFaq) {
      return res.status(404).json({
        success: false,
        message: "FAQ tidak ditemukan",
      });
    }

    await prisma.faq.delete({
      where: {
        id,
      },
    });

    res.json({
      success: true,
      message: "FAQ berhasil dihapus",
    });
  } catch (error) {
    console.error("❌ Error DELETE FAQ:", error);

    res.status(500).json({
      success: false,
      message: "Gagal menghapus FAQ",
    });
  }
});

export default router;
