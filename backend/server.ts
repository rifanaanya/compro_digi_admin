import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/auth.js";
import homeRoutes from "./routes/home.js";
import faqRoutes from "./routes/faq.js";
import kegiatanRoutes from "./routes/kegiatan.js";
import tentangDigiRoutes from "./routes/tentang-digi.js";
import visiMisiRoutes from "./routes/visi-misi.js";
import pengaturanLainnyaRoutes from "./routes/pengaturan-lainnya.js";
import pageSettingsRoutes from "./routes/page-settings.js";
import kontakRoutes from "./routes/kontak.js";
import kontakMasukRoutes from "./routes/kontak-masuk.js";
import sertifikasiRoutes from "./routes/sertifikasi.js";
import layananRoutes from "./routes/layanan.js";
import profileRoutes from "./routes/profile.js";
import penggunaRoutes from "./routes/pengguna.js";
import footerColumnRoutes from "./routes/footer-column.js";
import footerColumnItemRoutes from "./routes/footer-column-item.js";
import pengaturanMenuRoutes from "./routes/pengaturan-menu.js";
import sosialMediaRoutes from "./routes/sosial-media.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/uploads", express.static("uploads"));

// ==========================================
// API ROUTES
// ==========================================

app.use("/api/auth", authRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/faq", faqRoutes);
app.use("/api/kegiatan", kegiatanRoutes);
app.use("/api/tentang-digi", tentangDigiRoutes);
app.use("/api/visi-misi", visiMisiRoutes);
app.use("/api/pengaturan-lainnya", pengaturanLainnyaRoutes);
app.use("/api/page-settings", pageSettingsRoutes);
app.use("/api/kontak", kontakRoutes);
app.use("/api/kontak-masuk", kontakMasukRoutes);
app.use("/api/sertifikasi", sertifikasiRoutes);
app.use("/api/layanan", layananRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/pengguna", penggunaRoutes);
app.use("/api/footer-column", footerColumnRoutes);
app.use("/api/footer-column-item", footerColumnItemRoutes);
app.use("/api/pengaturan-menu", pengaturanMenuRoutes);
app.use("/api/sosial-media", sosialMediaRoutes);

// ==========================================
// TEST ROUTE KONTAK
// ==========================================

app.get("/api/kontak-test", (req, res) => {
  res.json({
    success: true,
    message: "Route kontak berhasil terbaca bro 🚀",
  });
});

// ==========================================
// ROOT
// ==========================================

app.get("/", (req, res) => {
  res.json({
    message: "Compro Digi Backend berjalan 🚀",
  });
});

// ==========================================
// SERVER
// ==========================================

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`✅ Server Compro Digi berjalan di port ${PORT}`);
});
