import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.ts";
import bcrypt from "bcrypt";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  // ==========================================
  // ADMIN
  // ==========================================

  const passwordHash = await bcrypt.hash("admin123", 10);

  const admin = await prisma.admin.upsert({
    where: {
      username: "admindigi",
    },
    update: {},
    create: {
      username: "admindigi",
      password: passwordHash,
    },
  });

  console.log("✅ Admin berhasil dibuat:", admin.username);

  const userPasswordHash = await bcrypt.hash("user123", 10);

  const user = await prisma.admin.upsert({
    where: {
      username: "userdigi",
    },
    update: {},
    create: {
      username: "userdigi",
      password: userPasswordHash,
      email: "user@gmail.com",
      telepon: "0822-2517-5889",
      role: "User",
    },
  });

  console.log("✅ User berhasil dibuat:", user.username);

  // ==========================================
  // PAGE SETTING ARTIKEL
  // ==========================================

  const artikel = await prisma.pageSetting.upsert({
    where: {
      page: "artikel",
    },
    update: {},
    create: {
      page: "artikel",
      title: "Artikel",
      description:
        "PT. Digi Tekno Indonesia menyediakan Software IT (Website SIM (Sistem Informasi Manajemen), Landing Page, Company Profile, ERP), Mekanik & Engineering (Repair & Services), serta Pengadaan Sparepart dan Material Industri untuk mendukung kebutuhan bisnis.",
    },
  });

  console.log("✅ Page Setting berhasil dibuat:", artikel.page);

  // ==========================================
  // PAGE SETTING KEGIATAN
  // ==========================================

  const kegiatan = await prisma.pageSetting.upsert({
    where: {
      page: "kegiatan",
    },
    update: {},
    create: {
      page: "kegiatan",
      title: "Kegiatan",
      description:
        "PT. Digi Tekno Indonesia menyediakan Software IT (Website SIM (Sistem Informasi Manajemen), Landing Page, Company Profile, ERP), Mekanik & Engineering (Repair & Services), serta Pengadaan Sparepart dan Material Industri untuk mendukung kebutuhan bisnis.",
    },
  });

  console.log("✅ Page Setting berhasil dibuat:", kegiatan.page);

  // ==========================================
  // PAGE SETTING KARIR
  // ==========================================

  const karir = await prisma.pageSetting.upsert({
    where: {
      page: "karir",
    },
    update: {},
    create: {
      page: "karir",
      title: "Karir",
      description:
        "PT. Digi Tekno Indonesia menyediakan Software IT (Website SIM (Sistem Informasi Manajemen), Landing Page, Company Profile, ERP), Mekanik & Engineering (Repair & Services), serta Pengadaan Sparepart dan Material Industri untuk mendukung kebutuhan bisnis.",
    },
  });

  console.log("✅ Page Setting berhasil dibuat:", karir.page);

  // ==========================================
  // PAGE SETTING FAQ
  // ==========================================

  const faq = await prisma.pageSetting.upsert({
    where: {
      page: "faq",
    },
    update: {},
    create: {
      page: "faq",
      title: "FAQ",
      description:
        "PT. Digi Tekno Indonesia menyediakan Software IT (Website SIM (Sistem Informasi Manajemen), Landing Page, Company Profile, ERP), Mekanik & Engineering (Repair & Services), serta Pengadaan Sparepart dan Material Industri untuk mendukung kebutuhan bisnis.",
    },
  });

  console.log("✅ Page Setting berhasil dibuat:", faq.page);

  // ==========================================
  // PAGE SETTING PRODUK & JASA
  // ==========================================

  const produkJasa = await prisma.pageSetting.upsert({
    where: {
      page: "produk-jasa",
    },
    update: {},
    create: {
      page: "produk-jasa",
      title: "Produk & Jasa",
      description:
        "PT. Digi Tekno Indonesia menyediakan Mekanik & Engineering (Repair & Services), Pengadaan Sparepart dan Material Industri, Software IT (Website SIM (Sistem Informasi Manajemen), Landing Page, Company Profile, ERP) untuk mendukung kebutuhan bisnis.",
    },
  });

  console.log("✅ Page Setting berhasil dibuat:", produkJasa.page);

  // ==========================================
  // PAGE SETTING SERTIFIKASI
  // ==========================================

  const sertifikasi = await prisma.pageSetting.upsert({
    where: {
      page: "sertifikasi",
    },
    update: {},
    create: {
      page: "sertifikasi",
      title: "Sertifikasi",
      description:
        "PT. Digi Tekno Indonesia menyediakan Software IT (Website SIM (Sistem Informasi Manajemen), Landing Page, Company Profile, ERP), Mekanik & Engineering (Repair & Services), serta Pengadaan Sparepart dan Material Industri untuk mendukung kebutuhan bisnis.",
    },
  });

  console.log("✅ Page Setting berhasil dibuat:", sertifikasi.page);

  // ==========================================
  // KONTAK
  // ==========================================

  const jumlahKontak = await prisma.kontak.count();

  if (jumlahKontak === 0) {
    const kontakData = [
      {
        namaPengaturan: "Alamat",
        isiPengaturan: "Summarecon Magna Commercial Blok MD-18, Summarecon",
      },
      {
        namaPengaturan: "Email",
        isiPengaturan: "digiteknoindo@gmail.com",
      },
      {
        namaPengaturan: "No HP",
        isiPengaturan: "0859-2410-1807",
      },
      {
        namaPengaturan: "Instagram",
        isiPengaturan: "digiteknoindonesia",
      },
    ];

    for (const item of kontakData) {
      await prisma.kontak.create({
        data: item,
      });
    }

    console.log("✅ Data awal Kontak berhasil dibuat");
  } else {
    console.log("ℹ️ Data Kontak sudah ada, seed dilewati");
  }

  // ==========================================
  // PAGE SETTING MEKANIKAL
  // ==========================================

  const mekanikal = await prisma.pageSetting.upsert({
    where: {
      page: "mekanikal",
    },
    update: {},
    create: {
      page: "mekanikal",
      title: "Mekanikal",
      description:
        "PT. Digi Tekno Indonesia menyediakan layanan Mekanik & Engineering (Repair & Services) untuk mendukung kebutuhan bisnis.",
    },
  });

  console.log("✅ Page Setting berhasil dibuat:", mekanikal.page);

  // ==========================================
  // PAGE SETTING SPAREPART
  // ==========================================

  const sparepart = await prisma.pageSetting.upsert({
    where: {
      page: "sparepart",
    },
    update: {},
    create: {
      page: "sparepart",
      title: "Sparepart",
      description:
        "PT. Digi Tekno Indonesia menyediakan Pengadaan Sparepart dan Material Industri untuk mendukung kebutuhan bisnis.",
    },
  });

  console.log("✅ Page Setting berhasil dibuat:", sparepart.page);

  // ==========================================
  // PAGE SETTING SOFTWARE IT
  // ==========================================

  const softwareIt = await prisma.pageSetting.upsert({
    where: {
      page: "software-it",
    },
    update: {},
    create: {
      page: "software-it",
      title: "Software IT",
      description:
        "PT. Digi Tekno Indonesia menyediakan Software IT seperti Website SIM (Sistem Informasi Manajemen), Landing Page, Company Profile, dan ERP untuk mendukung kebutuhan bisnis.",
    },
  });

  console.log("✅ Page Setting berhasil dibuat:", softwareIt.page);

  // ==========================================
  // SERTIFIKASI
  // ==========================================

  const jumlahSertifikasi = await prisma.sertifikasi.count();

  if (jumlahSertifikasi === 0) {
    const sertifikasiData = [
      {
        nama: "ISO 9001:2015",
        deskripsi: "Sertifikasi Quality Management System",
        gambar: "/uploads/sertifikasi/sertifikat1.jpg",
      },
      {
        nama: "ISO 14001:2015",
        deskripsi: "Sertifikasi Environmental Management System",
        gambar: "/uploads/sertifikasi/sertifikat2.jpg",
      },
      {
        nama: "ISO 45001:2018",
        deskripsi:
          "Sertifikasi Occupational Health and Safety Management System",
        gambar: "/uploads/sertifikasi/sertifikat3.jpg",
      },
      {
        nama: "ISO 9001:2015",
        deskripsi: "Sertifikasi Quality Management System",
        gambar: "/uploads/sertifikasi/sertifikat4.jpg",
      },
      {
        nama: "ISO 14001:2015",
        deskripsi: "Sertifikasi Environmental Management System",
        gambar: "/uploads/sertifikasi/sertifikat5.jpg",
      },
      {
        nama: "ISO 45001:2018",
        deskripsi:
          "Sertifikasi Occupational Health and Safety Management System",
        gambar: "/uploads/sertifikasi/sertifikat6.jpg",
      },
    ];

    for (const item of sertifikasiData) {
      await prisma.sertifikasi.create({
        data: item,
      });
    }

    console.log("✅ Data awal Sertifikasi berhasil dibuat");
  } else {
    console.log("ℹ️ Data Sertifikasi sudah ada, seed dilewati");
  }

  // ==========================================
  // PAGE SETTING PORTOFOLIO
  // ==========================================

  const portofolio = await prisma.pageSetting.upsert({
    where: {
      page: "portofolio",
    },
    update: {},
    create: {
      page: "portofolio",
      title: "PORTOFOLIO",
      description:
        "PT Digi Tekno Indonesia menyediakan Mekanik & Engineering (Repair & Services), Pengadaan Sparepart dan Material Industri, Software IT (Website SIM (Sistem Informasi Manajemen), Landing Page, Company Profile, ERP) untuk mendukung kebutuhan bisnis.",
    },
  });

  console.log("✅ Page Setting berhasil dibuat:", portofolio.page);

  // ==========================================
  // LAYANAN
  // ==========================================

  const layanan = await prisma.layananSetting.upsert({
    where: {
      id: 1,
    },
    update: {},
    create: {
      slogan: "LAYANAN",
      description:
        "PT Digi Tekno Indonesia menyediakan Mekanik & Engineering (Repair & Services), Pengadaan Sparepart dan Material Industri, Software IT (Website SIM (Sistem Informasi Manajemen), Landing Page, Company Profile, ERP) untuk mendukung kebutuhan bisnis.",
    },
  });

  console.log("✅ Layanan Setting berhasil dibuat:", layanan.slogan);
}

// ==========================================
// JALANKAN SEED
// ==========================================

main()
  .catch((error) => {
    console.error("❌ Gagal menjalankan seed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
