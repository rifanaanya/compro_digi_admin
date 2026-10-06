import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Activity from "./pages/Activity";
import ProfileEdit from "./pages/ProfileEdit";

import BerandaSetting from "./pages/Settings/BerandaSetting";
import FAQ from "./pages/Settings/FAQ";
import FAQDetail from "./pages/Settings/FAQDetail";
import FAQEdit from "./pages/Settings/FAQEdit";
import Footer from "./pages/Settings/Footer";
import FooterEdit from "./pages/Settings/FooterEdit";
import Kontak from "./pages/Settings/Kontak";
import EditKontak from "./pages/Settings/EditKontak";
import KegiatanSetting from "./pages/Settings/KegiatanSetting";
import Mitra from "./pages/Settings/Mitra";
import MitraDetail from "./pages/Settings/MitraDetail";
import FAQTambah from "./pages/Settings/FAQTambah";
import FooterTambah from "./pages/Settings/FooterTambah";
import KontakTambah from "./pages/Settings/KontakTambah";
import MitraEdit from "./pages/Settings/MitraEdit";
import MitraTambah from "./pages/Settings/MitraTambah";
import ProdukDigi from "./pages/Settings/ProdukDigi";
import TentangDigi from "./pages/Settings/TentangDigi";
import VisiMisi from "./pages/Settings/VisiMisi";
import PengaturanLainnya from "./pages/Settings/PengaturanLainnya";
import PengaturanLainnyaTambah from "./pages/Settings/PengaturanLainnyaTambah";
import PengaturanLainnyaEdit from "./pages/Settings/PengaturanLainnyaEdit";
import PengaturanLainnyaDetail from "./pages/Settings/PengaturanLainnyaDetail";

import FooterColumn from "./pages/Master/FooterColumn";
import FooterColumnTambah from "./pages/Master/FooterColumnTambah";
import FooterColumnEdit from "./pages/Master/FooterColumnEdit";
import PengaturanMenu from "./pages/Master/PengaturanMenu";
import PengaturanMenuTambah from "./pages/Master/PengaturanMenuTambah";
import PengaturanMenuEdit from "./pages/Master/PengaturanMenuEdit";
import PengaturanMenuDetail from "./pages/Master/PengaturanMenuDetail";
import SosialMedia from "./pages/Master/SosialMedia";
import SosialMediaTambah from "./pages/Master/SosialMediaTambah";
import SosialMediaEdit from "./pages/Master/SosialMediaEdit";
import PengaturanPengguna from "./pages/Master/PengaturanPengguna";
import PengaturanPenggunaTambah from "./pages/Master/PengaturanPenggunaTambah";
import PengaturanPenggunaDetail from "./pages/Master/PengaturanPenggunaDetail";
import PengaturanPenggunaEdit from "./pages/Master/PengaturanPenggunaEdit";

import Halaman from "./pages/Master/Halaman";
import HalamanTambah from "./pages/Master/HalamanTambah";
import HalamanDetailMaster from "./pages/Master/HalamanDetail";
import HalamanEdit from "./pages/Master/HalamanEdit";

import Kegiatan from "./pages/Postingan/Kegiatan";
import TambahKegiatan from "./pages/Postingan/TambahKegiatan";
import DetailKegiatan from "./pages/Postingan/DetailKegiatan";
import EditKegiatan from "./pages/Postingan/EditKegiatan";

import Sertifikasi from "./pages/Postingan/Sertifikasi";
import TambahSertifikasi from "./pages/Postingan/TambahSertifikasi";
import EditSertifikasi from "./pages/Postingan/EditSertifikasi";

import KonfirmasiPostingan from "./pages/Postingan/KonfirmasiPostingan";
import HalamanDetailPostingan from "./pages/Postingan/HalamanDetail";

import KontakMasuk from "./pages/Contact/KontakMasuk";
import DetailKontakMasuk from "./pages/Contact/DetailKontakMasuk";
import Tipe from "./pages/Postingan/Tipe";
import TambahTipe from "./pages/Postingan/TambahTipe";
import EditTipe from "./pages/Postingan/EditTipe";
import Layanan from "./pages/Postingan/Layanan";
import TambahLayanan from "./pages/Postingan/TambahLayanan";
import Produk from "./pages/Postingan/Produk";
import DetailLayanan from "./pages/Postingan/DetailLayanan";
import EditLayanan from "./pages/Postingan/EditLayanan";
import TambahProduk from "./pages/Postingan/TambahProduk";
import ProdukDetail from "./pages/Postingan/ProdukDetail";
import ProdukEdit from "./pages/Postingan/ProdukEdit";
import ProdukLayanan from "./pages/Postingan/ProdukLayanan";
import TambahProdukLayanan from "./pages/Postingan/TambahProdukLayanan";
import DetailProdukLayanan from "./pages/Postingan/DetailProdukLayanan";
import Login from "./pages/Login/Login";
import BerandaEditKategori from "./pages/Settings/BerandaEditKategori";
import DetailKonfirmasiPostingan from "./pages/Postingan/DetailKonfirmasiPostingan";
import PengaturanHalamanArtikel from "./pages/Settings/PengaturanHalamanArtikel";
import PengaturanHalamanKegiatan from "./pages/Settings/PengaturanHalamanKegiatan";
import PengaturanHalamanKarir from "./pages/Settings/PengaturanHalamanKarir";
import PengaturanHalamanFAQ from "./pages/Settings/PengaturanHalamanFAQ";
import PengaturanHalamanProdukJasa from "./pages/Settings/PengaturanHalamanProdukJasa";
import PengaturanHalamanSertifikasi from "./pages/Settings/PengaturanHalamanSertifikasi";
import Artikel from "./pages/Postingan/Artikel";
import TambahArtikel from "./pages/Postingan/TambahArtikel";
import EditArtikel from "./pages/Postingan/EditArtikel";
import DetailArtikel from "./pages/Postingan/DetailArtikel";
import Karir from "./pages/Postingan/Karir";
import TambahKarir from "./pages/Postingan/TambahKarir";
import EditKarir from "./pages/Postingan/EditKarir";
import DetailKarir from "./pages/Postingan/DetailKarir";
import PengaturanHalamanMekanikal from "./pages/Settings/PengaturanHalamanMekanikal";
import PengaturanHalamanSparepart from "./pages/Settings/PengaturanHalamanSparepart";
import PengaturanHalamanSoftwareIt from "./pages/Settings/PengaturanHalamanSoftwareIt";
import PengaturanPortofolio from "./pages/Settings/PengaturanPortofolio";
import LayananSetting from "./pages/Settings/LayananSetting";

function AdminOnly({ children }) {
  const user = JSON.parse(localStorage.getItem("admin")) || {};

  if (user.role !== "Admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* =========================
    LOGIN
========================= */}
        <Route path="/" element={<Login />} />

        {/* =========================
    DASHBOARD
========================= */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* =========================
            PROFILE
        ========================= */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<ProfileEdit />} />

        {/* =========================
            ACTIVITY
        ========================= */}
        <Route path="/activity" element={<Activity />} />

        {/* =========================
            SETTINGS - BERANDA
        ========================= */}
        <Route path="/settings/beranda" element={<BerandaSetting />} />

        {/* =========================
            SETTINGS - FAQ
        ========================= */}
        <Route path="/settings/faq" element={<FAQ />} />

        <Route path="/settings/faq/detail/:id" element={<FAQDetail />} />

        <Route path="/settings/faq/edit/:id" element={<FAQEdit />} />

        <Route path="/settings/faq/tambah" element={<FAQTambah />} />

        {/* =========================
            SETTINGS - FOOTER
        ========================= */}
        <Route path="/settings/footer" element={<Footer />} />

        <Route path="/settings/footer/edit/:id" element={<FooterEdit />} />

        <Route path="/settings/footer/tambah" element={<FooterTambah />} />

        {/* =========================
            SETTINGS - KONTAK
        ========================= */}
        <Route path="/settings/kontak" element={<Kontak />} />

        <Route path="/settings/kontak/edit/:id" element={<EditKontak />} />

        <Route path="/settings/kontak/tambah" element={<KontakTambah />} />

        {/* =========================
            SETTINGS - KEGIATAN
        ========================= */}
        <Route path="/settings/kegiatan" element={<KegiatanSetting />} />

        {/* =========================
            SETTINGS - MITRA
        ========================= */}
        <Route path="/settings/mitra" element={<Mitra />} />

        <Route path="/settings/mitra/detail/:id" element={<MitraDetail />} />

        <Route path="/settings/mitra/edit/:id" element={<MitraEdit />} />

        <Route path="/settings/mitra/tambah" element={<MitraTambah />} />

        {/* =========================
            SETTINGS - PRODUK DIGI
        ========================= */}
        <Route path="/settings/produk-digi" element={<ProdukDigi />} />

        {/* =========================
            SETTINGS - TENTANG DIGI
        ========================= */}
        <Route path="/settings/tentang-digi" element={<TentangDigi />} />

        {/* =========================
            SETTINGS - VISI MISI
        ========================= */}
        <Route path="/settings/visi-misi" element={<VisiMisi />} />

        {/* =========================
            SETTINGS - PENGATURAN LAINNYA
        ========================= */}
        <Route
          path="/settings/pengaturan-lainnya"
          element={<PengaturanLainnya />}
        />

        <Route
          path="/settings/pengaturan-lainnya/tambah"
          element={<PengaturanLainnyaTambah />}
        />

        <Route
          path="/settings/pengaturan-lainnya/detail/:id"
          element={<PengaturanLainnyaDetail />}
        />

        <Route
          path="/settings/pengaturan-lainnya/edit/:id"
          element={<PengaturanLainnyaEdit />}
        />

        {/* =========================
    SETTINGS - PENGATURAN HALAMAN
========================= */}

        <Route
          path="/settings/halaman/artikel"
          element={<PengaturanHalamanArtikel />}
        />

        {/* =========================
            MASTER - FOOTER COLUMN
        ========================= */}
        <Route path="/master/footer-column" element={<FooterColumn />} />

        <Route
          path="/master/footer-column/tambah"
          element={<FooterColumnTambah />}
        />

        <Route
          path="/master/footer-column/edit/:id"
          element={<FooterColumnEdit />}
        />

        {/* =========================
            MASTER - PENGATURAN MENU
        ========================= */}
        <Route path="/master/pengaturan-menu" element={<PengaturanMenu />} />

        <Route
          path="/master/pengaturan-menu/tambah"
          element={<PengaturanMenuTambah />}
        />

        <Route
          path="/master/pengaturan-menu/edit/:id"
          element={<PengaturanMenuEdit />}
        />

        <Route
          path="/master/pengaturan-menu/detail/3"
          element={<PengaturanMenuDetail />}
        />

        {/* =========================
            MASTER - SOSIAL MEDIA
        ========================= */}
        <Route path="/master/sosial-media" element={<SosialMedia />} />

        <Route
          path="/master/sosial-media/tambah"
          element={<SosialMediaTambah />}
        />

        <Route
          path="/master/sosial-media/edit/:id"
          element={<SosialMediaEdit />}
        />

        {/* =========================
            MASTER - PENGATURAN PENGGUNA
        ========================= */}
        <Route
          path="/master/pengaturan-pengguna"
          element={
            <AdminOnly>
              <PengaturanPengguna />
            </AdminOnly>
          }
        />

        <Route
          path="/master/pengaturan-pengguna/tambah"
          element={
            <AdminOnly>
              <PengaturanPenggunaTambah />
            </AdminOnly>
          }
        />

        <Route
          path="/master/pengaturan-pengguna/detail/:id"
          element={
            <AdminOnly>
              <PengaturanPenggunaDetail />
            </AdminOnly>
          }
        />

        <Route
          path="/master/pengaturan-pengguna/edit/:id"
          element={
            <AdminOnly>
              <PengaturanPenggunaEdit />
            </AdminOnly>
          }
        />

        {/* =========================
            MASTER - HALAMAN
        ========================= */}
        <Route path="/master/halaman" element={<Halaman />} />

        <Route path="/master/halaman/tambah" element={<HalamanTambah />} />

        {/* DETAIL HALAMAN MASTER */}
        <Route
          path="/master/halaman/detail/:id"
          element={<HalamanDetailMaster />}
        />

        <Route path="/master/halaman/edit/:id" element={<HalamanEdit />} />

        {/* =========================
            POSTINGAN - KEGIATAN
        ========================= */}
        <Route path="/kegiatan" element={<Kegiatan />} />

        <Route path="/kegiatan/tambah" element={<TambahKegiatan />} />

        <Route path="/kegiatan/detail/:id" element={<DetailKegiatan />} />

        <Route path="/kegiatan/edit/:id" element={<EditKegiatan />} />

        {/* =========================
            POSTINGAN - SERTIFIKASI
        ========================= */}
        <Route path="/sertifikasi" element={<Sertifikasi />} />

        <Route path="/sertifikasi/tambah" element={<TambahSertifikasi />} />

        <Route path="/sertifikasi/edit/:id" element={<EditSertifikasi />} />

        {/* =========================
            POSTINGAN - KONFIRMASI
        ========================= */}
        <Route path="/konfirmasi-postingan" element={<KonfirmasiPostingan />} />

        {/* DETAIL HALAMAN DARI POSTINGAN */}
        <Route
          path="/postingan/halaman/detail/:id"
          element={<HalamanDetailPostingan />}
        />

        {/* =========================
            CONTACT - KONTAK MASUK
        ========================= */}
        <Route path="/kontak-masuk" element={<KontakMasuk />} />

        <Route
          path="/kontak-masuk/detail/:id"
          element={<DetailKontakMasuk />}
        />

        <Route path="/tipe" element={<Tipe />} />
        <Route path="/tipe/tambah" element={<TambahTipe />} />
        <Route path="/tipe/edit/:id" element={<EditTipe />} />
        <Route path="/layanan" element={<Layanan />} />
        <Route path="/produk" element={<Produk />} />
        <Route path="/layanan/tambah" element={<TambahLayanan />} />
        <Route path="/layanan/detail/:id" element={<DetailLayanan />} />
        <Route path="/layanan/edit/:id" element={<EditLayanan />} />
        <Route path="/produk/tambah" element={<TambahProduk />} />
        <Route path="/produk/detail/:id" element={<ProdukDetail />} />
        <Route path="/produk/edit/:id" element={<ProdukEdit />} />
        <Route path="/produk-layanan" element={<ProdukLayanan />} />
        <Route
          path="/produk-layanan/detail/:id"
          element={<DetailProdukLayanan />}
        />
        <Route
          path="/produk-layanan/tambah"
          element={<TambahProdukLayanan />}
        />

        <Route path="/login" element={<Login />} />
        <Route
          path="/settings/beranda/edit/:id"
          element={<BerandaEditKategori />}
        />

        <Route
          path="/konfirmasi-postingan/detail/:id"
          element={<DetailKonfirmasiPostingan />}
        />

        <Route
          path="/settings/halaman/kegiatan"
          element={<PengaturanHalamanKegiatan />}
        />

        <Route
          path="/settings/halaman/karir"
          element={<PengaturanHalamanKarir />}
        />

        <Route
          path="/settings/halaman/faq"
          element={<PengaturanHalamanFAQ />}
        />

        <Route
          path="/settings/halaman/produk-jasa"
          element={<PengaturanHalamanProdukJasa />}
        />

        <Route
          path="/settings/halaman/sertifikasi"
          element={<PengaturanHalamanSertifikasi />}
        />

        <Route path="/artikel" element={<Artikel />} />
        <Route path="/artikel/tambah" element={<TambahArtikel />} />
        <Route path="/artikel/edit/:id" element={<EditArtikel />} />
        <Route path="/artikel/detail/:id" element={<DetailArtikel />} />
        <Route path="/karir" element={<Karir />} />
        <Route path="/karir/tambah" element={<TambahKarir />} />
        <Route path="/karir/edit/:id" element={<EditKarir />} />
        <Route path="/karir/detail/:id" element={<DetailKarir />} />
        <Route
          path="/settings/halaman/mekanikal"
          element={<PengaturanHalamanMekanikal />}
        />

        <Route
          path="/settings/halaman/sparepart"
          element={<PengaturanHalamanSparepart />}
        />

        <Route
          path="/settings/halaman/software-it"
          element={<PengaturanHalamanSoftwareIt />}
        />

        <Route path="/settings/portofolio" element={<PengaturanPortofolio />} />
        <Route path="/settings/layanan" element={<LayananSetting />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
