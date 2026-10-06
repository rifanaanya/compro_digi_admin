import express from "express";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.ts";

const router = express.Router();

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

// ==========================================
// GET SEMUA ITEM BERDASARKAN COLUMN
// ==========================================
router.get("/column/:columnId", async (req, res) => {
  try {
    const columnId = Number(req.params.columnId);

    const items = await prisma.footerColumnItem.findMany({
      where: {
        footerColumnId: columnId,
      },
      orderBy: {
        posisi: "asc",
      },
    });

    res.json({
      success: true,
      data: items,
    });
  } catch (error) {
    console.error("❌ Error get footer column items:", error);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil item footer column",
    });
  }
});

// ==========================================
// TAMBAH ITEM
// ==========================================
router.post("/column/:columnId", async (req, res) => {
  try {
    const columnId = Number(req.params.columnId);
    const { isi, posisi } = req.body;

    if (!isi || posisi === undefined) {
      return res.status(400).json({
        success: false,
        message: "Isi dan posisi wajib diisi",
      });
    }

    // Cek column
    const footerColumn = await prisma.footerColumn.findUnique({
      where: {
        id: columnId,
      },
    });

    if (!footerColumn) {
      return res.status(404).json({
        success: false,
        message: "Footer column tidak ditemukan",
      });
    }

    const posisiNumber = Number(posisi);

    if (posisiNumber < 1) {
      return res.status(400).json({
        success: false,
        message: "Posisi item harus dimulai dari 1",
      });
    }

    // Cek posisi item dalam column yang sama
    const existingItem = await prisma.footerColumnItem.findFirst({
      where: {
        footerColumnId: columnId,
        posisi: posisiNumber,
      },
    });

    if (existingItem) {
      return res.status(400).json({
        success: false,
        message: `Posisi item ${posisiNumber} sudah digunakan pada column ini`,
      });
    }

    const item = await prisma.footerColumnItem.create({
      data: {
        footerColumnId: columnId,
        isi: isi.trim(),
        posisi: posisiNumber,
      },
    });

    res.status(201).json({
      success: true,
      message: "Item footer berhasil ditambahkan",
      data: item,
    });
  } catch (error) {
    console.error("❌ Error tambah footer item:", error);

    res.status(500).json({
      success: false,
      message: "Gagal menambahkan item footer",
    });
  }
});

// ==========================================
// EDIT ITEM
// ==========================================
router.put("/:itemId", async (req, res) => {
  try {
    const itemId = Number(req.params.itemId);
    const { isi, posisi } = req.body;

    if (!isi || posisi === undefined) {
      return res.status(400).json({
        success: false,
        message: "Isi dan posisi wajib diisi",
      });
    }

    const posisiNumber = Number(posisi);

    if (posisiNumber < 1) {
      return res.status(400).json({
        success: false,
        message: "Posisi item harus dimulai dari 1",
      });
    }

    const existingItem = await prisma.footerColumnItem.findUnique({
      where: {
        id: itemId,
      },
    });

    if (!existingItem) {
      return res.status(404).json({
        success: false,
        message: "Item footer tidak ditemukan",
      });
    }

    const duplicateItem = await prisma.footerColumnItem.findFirst({
      where: {
        footerColumnId: existingItem.footerColumnId,
        posisi: posisiNumber,
        NOT: {
          id: itemId,
        },
      },
    });

    if (duplicateItem) {
      return res.status(400).json({
        success: false,
        message: `Posisi item ${posisiNumber} sudah digunakan pada column ini`,
      });
    }

    const item = await prisma.footerColumnItem.update({
      where: {
        id: itemId,
      },
      data: {
        isi: isi.trim(),
        posisi: posisiNumber,
      },
    });

    res.json({
      success: true,
      message: "Item footer berhasil diperbarui",
      data: item,
    });
  } catch (error) {
    console.error("❌ Error edit footer item:", error);

    res.status(500).json({
      success: false,
      message: "Gagal memperbarui item footer",
    });
  }
});

// ==========================================
// DELETE ITEM
// ==========================================
router.delete("/:itemId", async (req, res) => {
  try {
    const itemId = Number(req.params.itemId);

    const item = await prisma.footerColumnItem.findUnique({
      where: {
        id: itemId,
      },
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item footer tidak ditemukan",
      });
    }

    await prisma.footerColumnItem.delete({
      where: {
        id: itemId,
      },
    });

    res.json({
      success: true,
      message: "Item footer berhasil dihapus",
    });
  } catch (error) {
    console.error("❌ Error delete footer item:", error);

    res.status(500).json({
      success: false,
      message: "Gagal menghapus item footer",
    });
  }
});

export default router;
