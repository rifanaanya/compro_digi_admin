import express from "express";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.ts";

const router = express.Router();

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

// ===============================
// GET SEMUA FOOTER COLUMN
// ===============================
router.get("/", async (req, res) => {
  try {
    const footerColumns = await prisma.footerColumn.findMany({
      include: {
        items: {
          orderBy: {
            posisi: "asc",
          },
        },
      },
      orderBy: {
        posisi: "asc",
      },
    });

    res.json({
      success: true,
      data: footerColumns,
    });
  } catch (error) {
    console.error("❌ Error get footer column:", error);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil data footer column",
    });
  }
});

// ===============================
// GET FOOTER COLUMN BY ID
// ===============================
router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const footerColumn = await prisma.footerColumn.findUnique({
      where: {
        id,
      },
    });

    if (!footerColumn) {
      return res.status(404).json({
        success: false,
        message: "Footer column tidak ditemukan",
      });
    }

    res.json({
      success: true,
      data: footerColumn,
    });
  } catch (error) {
    console.error("❌ Error get footer column:", error);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil footer column",
    });
  }
});

// ===============================
// TAMBAH FOOTER COLUMN
// ===============================
router.post("/", async (req, res) => {
  try {
    const { nama, posisi } = req.body;

    if (!nama || posisi === undefined) {
      return res.status(400).json({
        success: false,
        message: "Nama dan posisi wajib diisi",
      });
    }

    const posisiNumber = Number(posisi);

    // Maksimal 3 column
    if (![1, 2, 3].includes(posisiNumber)) {
      return res.status(400).json({
        success: false,
        message: "Footer column hanya boleh posisi 1 sampai 3",
      });
    }

    // Cek posisi sudah digunakan
    const existingColumn = await prisma.footerColumn.findUnique({
      where: {
        posisi: posisiNumber,
      },
    });

    if (existingColumn) {
      return res.status(400).json({
        success: false,
        message: `Footer Column ${posisiNumber} sudah digunakan`,
      });
    }

    const footerColumn = await prisma.footerColumn.create({
      data: {
        nama: nama.trim(),
        posisi: posisiNumber,
      },
    });

    res.status(201).json({
      success: true,
      message: "Footer column berhasil ditambahkan",
      data: footerColumn,
    });
  } catch (error) {
    console.error("❌ Error tambah footer column:", error);

    res.status(500).json({
      success: false,
      message: "Gagal menambahkan footer column",
    });
  }
});

// ===============================
// EDIT FOOTER COLUMN
// ===============================
router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { nama, posisi } = req.body;

    if (!nama || posisi === undefined) {
      return res.status(400).json({
        success: false,
        message: "Nama dan posisi wajib diisi",
      });
    }

    const posisiNumber = Number(posisi);

    if (![1, 2, 3].includes(posisiNumber)) {
      return res.status(400).json({
        success: false,
        message: "Footer column hanya boleh posisi 1 sampai 3",
      });
    }

    const existingColumn = await prisma.footerColumn.findFirst({
      where: {
        posisi: posisiNumber,
        NOT: {
          id,
        },
      },
    });

    if (existingColumn) {
      return res.status(400).json({
        success: false,
        message: `Footer Column ${posisiNumber} sudah digunakan`,
      });
    }

    const footerColumn = await prisma.footerColumn.update({
      where: {
        id,
      },
      data: {
        nama: nama.trim(),
        posisi: posisiNumber,
      },
    });

    res.json({
      success: true,
      message: "Footer column berhasil diperbarui",
      data: footerColumn,
    });
  } catch (error) {
    console.error("❌ Error edit footer column:", error);

    res.status(500).json({
      success: false,
      message: "Gagal memperbarui footer column",
    });
  }
});

// ===============================
// DELETE FOOTER COLUMN
// ===============================
router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const footerColumn = await prisma.footerColumn.findUnique({
      where: {
        id,
      },
    });

    if (!footerColumn) {
      return res.status(404).json({
        success: false,
        message: "Footer column tidak ditemukan",
      });
    }

    // Hapus item yang terkait terlebih dahulu
    await prisma.footerColumnItem.deleteMany({
      where: {
        footerColumnId: id,
      },
    });

    await prisma.footerColumn.delete({
      where: {
        id,
      },
    });

    res.json({
      success: true,
      message: "Footer column berhasil dihapus",
    });
  } catch (error) {
    console.error("❌ Error delete footer column:", error);

    res.status(500).json({
      success: false,
      message: "Gagal menghapus footer column",
    });
  }
});

export default router;
