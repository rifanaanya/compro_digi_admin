import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client.ts";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🚀 Mulai memasukkan data menu...");

  const jumlahMenu = await prisma.menu.count();

  if (jumlahMenu > 0) {
    console.log("⚠️ Data menu sudah ada. Seed dibatalkan agar tidak duplikat.");
    return;
  }

  await prisma.menu.create({
    data: {
      nama: "Beranda",
      url: "/",
      status: "Aktif",
      posisi: 1,
    },
  });

  await prisma.menu.create({
    data: {
      nama: "Tentang Digi",
      url: null,
      status: "Aktif",
      posisi: 2,

      subMenus: {
        create: [
          {
            nama: "Sertifikasi",
            url: "/sertifikasi",
            posisi: 1,
          },
          {
            nama: "Visi Misi",
            url: "/visimisi",
            posisi: 2,
          },
        ],
      },
    },
  });

  await prisma.menu.create({
    data: {
      nama: "Produk",
      url: "/produklain",
      status: "Aktif",
      posisi: 3,
    },
  });

  await prisma.menu.create({
    data: {
      nama: "Layanan",
      url: "/layanan",
      status: "Aktif",
      posisi: 4,
    },
  });

  await prisma.menu.create({
    data: {
      nama: "Mitra",
      url: "/#mitra",
      status: "Aktif",
      posisi: 5,
    },
  });

  await prisma.menu.create({
    data: {
      nama: "Kegiatan",
      url: "/kegiatanDetail",
      status: "Aktif",
      posisi: 6,
    },
  });

  await prisma.menu.create({
    data: {
      nama: "Info",
      url: null,
      status: "Aktif",
      posisi: 7,

      subMenus: {
        create: [
          {
            nama: "Karir",
            url: "/karir",
            posisi: 1,
          },
          {
            nama: "FAQ",
            url: "/faq",
            posisi: 2,
          },
          {
            nama: "Artikel",
            url: "/artikel",
            posisi: 3,
          },
        ],
      },
    },
  });

  console.log("✅ Data menu berhasil dimasukkan!");
}

main()
  .catch((error) => {
    console.error("❌ Error seed menu:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
