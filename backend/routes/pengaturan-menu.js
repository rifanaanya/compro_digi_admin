import express from "express";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.ts";

const router = express.Router();

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

// ===============================
// GET SEMUA MENU
// ===============================
router.get("/", async (req, res) => {
  try {
    const menus = await prisma.menu.findMany({
      include: {
        subMenus: {
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
      data: menus,
    });
  } catch (error) {
    console.error("❌ Error get menu:", error);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil data menu",
    });
  }
});

// ===============================
// GET MENU BY ID
// ===============================
router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const menu = await prisma.menu.findUnique({
      where: {
        id,
      },
      include: {
        subMenus: {
          orderBy: {
            posisi: "asc",
          },
        },
      },
    });

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Menu tidak ditemukan",
      });
    }

    res.json({
      success: true,
      data: menu,
    });
  } catch (error) {
    console.error("❌ Error get menu:", error);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil menu",
    });
  }
});

// ===============================
// TAMBAH MENU
// ===============================
router.post("/", async (req, res) => {
  try {
    const { nama, url, status, posisi, subMenus = [] } = req.body;

    if (!nama || posisi === undefined) {
      return res.status(400).json({
        success: false,
        message: "Nama dan posisi wajib diisi",
      });
    }

    const posisiNumber = Number(posisi);

    if (!Number.isInteger(posisiNumber) || posisiNumber < 1) {
      return res.status(400).json({
        success: false,
        message: "Posisi menu tidak valid",
      });
    }

    const existingMenu = await prisma.menu.findUnique({
      where: {
        posisi: posisiNumber,
      },
    });

    if (existingMenu) {
      return res.status(400).json({
        success: false,
        message: `Posisi menu ${posisiNumber} sudah digunakan`,
      });
    }

    const menu = await prisma.menu.create({
      data: {
        nama: nama.trim(),
        url: url?.trim() || null,
        status: status || "Aktif",
        posisi: posisiNumber,

        subMenus: {
          create: subMenus.map((item, index) => ({
            nama: item.nama.trim(),
            url: item.url.trim(),
            posisi: item.posisi !== undefined ? Number(item.posisi) : index + 1,
          })),
        },
      },
      include: {
        subMenus: {
          orderBy: {
            posisi: "asc",
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      message: "Menu berhasil ditambahkan",
      data: menu,
    });
  } catch (error) {
    console.error("❌ Error tambah menu:", error);

    res.status(500).json({
      success: false,
      message: "Gagal menambahkan menu",
    });
  }
});

// ===============================
// EDIT MENU
// ===============================
router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { nama, url, status, posisi, subMenus = [] } = req.body;

    if (!nama || posisi === undefined) {
      return res.status(400).json({
        success: false,
        message: "Nama dan posisi wajib diisi",
      });
    }

    const posisiNumber = Number(posisi);

    if (!Number.isInteger(posisiNumber) || posisiNumber < 1) {
      return res.status(400).json({
        success: false,
        message: "Posisi menu tidak valid",
      });
    }

    const existingMenu = await prisma.menu.findFirst({
      where: {
        posisi: posisiNumber,
        NOT: {
          id,
        },
      },
    });

    if (existingMenu) {
      return res.status(400).json({
        success: false,
        message: `Posisi menu ${posisiNumber} sudah digunakan`,
      });
    }

    const menu = await prisma.$transaction(async (tx) => {
      // Update menu utama
      await tx.menu.update({
        where: {
          id,
        },
        data: {
          nama: nama.trim(),
          url: url?.trim() || null,
          status: status || "Aktif",
          posisi: posisiNumber,
        },
      });

      // Hapus submenu lama
      await tx.subMenu.deleteMany({
        where: {
          menuId: id,
        },
      });

      // Buat ulang submenu
      if (subMenus.length > 0) {
        await tx.subMenu.createMany({
          data: subMenus.map((item, index) => ({
            menuId: id,
            nama: item.nama.trim(),
            url: item.url.trim(),
            posisi: item.posisi !== undefined ? Number(item.posisi) : index + 1,
          })),
        });
      }

      return tx.menu.findUnique({
        where: {
          id,
        },
        include: {
          subMenus: {
            orderBy: {
              posisi: "asc",
            },
          },
        },
      });
    });

    res.json({
      success: true,
      message: "Menu berhasil diperbarui",
      data: menu,
    });
  } catch (error) {
    console.error("❌ Error edit menu:", error);

    res.status(500).json({
      success: false,
      message: "Gagal memperbarui menu",
    });
  }
});

// ===============================
// DELETE MENU
// ===============================
router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const menu = await prisma.menu.findUnique({
      where: {
        id,
      },
    });

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Menu tidak ditemukan",
      });
    }

    await prisma.menu.delete({
      where: {
        id,
      },
    });

    res.json({
      success: true,
      message: "Menu berhasil dihapus",
    });
  } catch (error) {
    console.error("❌ Error delete menu:", error);

    res.status(500).json({
      success: false,
      message: "Gagal menghapus menu",
    });
  }
});

export default router;
