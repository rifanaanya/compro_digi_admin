import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import halamanIcon from "../assets/icons/halaman.svg";
import halamanIconActive from "../assets/icons/halaman-active.svg";

import sertifikasiIcon from "../assets/icons/sertifikasi.svg";
import sertifikasiIconActive from "../assets/icons/sertifikasi-active.svg";

import kegiatanIcon from "../assets/icons/kegiatan.svg";
import kegiatanIconActive from "../assets/icons/kegiatan-active.svg";

import kontakMasukIcon from "../assets/icons/kontak-masuk.svg";
import kontakMasukIconActive from "../assets/icons/kontak-masuk-active.svg";

import settingPostinganIcon from "../assets/icons/setting-postingan.svg";
import settingPostinganIconActive from "../assets/icons/setting-postingan-active.svg";

import postinganIcon from "../assets/icons/postingan.svg";
import postinganIconActive from "../assets/icons/postingan-active.svg";

import pengaturanPenggunaIcon from "../assets/icons/pengaturan-pengguna.svg";
import pengaturanPenggunaIconActive from "../assets/icons/pengaturan-pengguna-active.svg";

import masterIcon from "../assets/icons/master.svg";
import masterIconActive from "../assets/icons/master-active.svg";

import pengaturanUmumIcon from "../assets/icons/pengaturan-umum.svg";
import pengaturanUmumIconActive from "../assets/icons/pengaturan-umum-active.svg";
import whatsappIcon from "../assets/icons/whatsapp.svg";

import {
  Home,
  Settings,
  Grid3X3,
  UserCog,
  FileText,
  PenLine,
  CalendarDays,
  Award,
  Mail,
  ChevronDown,
} from "lucide-react";

import "./Sidebar.css";

function Sidebar({ collapsed = false }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [logoSidebar, setLogoSidebar] = useState("");

  useEffect(() => {
    const fetchLogoSidebar = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/pengaturan-lainnya",
        );

        const result = await response.json();

        if (response.ok && result.success) {
          const logo = result.data.find((item) => item.nama === "Logo Sidebar");

          if (logo?.gambar) {
            setLogoSidebar(`http://localhost:5000${logo.gambar}`);
          }
        }
      } catch (error) {
        console.error("❌ Gagal mengambil Logo Sidebar:", error);
      }
    };

    fetchLogoSidebar();
  }, []);

  const user = JSON.parse(localStorage.getItem("admin")) || {};
  const isAdmin = user.role === "Admin";

  // =========================
  // GENERAL
  // =========================
  const [generalOpen, setGeneralOpen] = useState(
    location.pathname.startsWith("/settings") &&
      !location.pathname.startsWith("/settings/halaman"),
  );

  // =========================
  // PENGATURAN HALAMAN
  // =========================

  const [pengaturanHalamanOpen, setPengaturanHalamanOpen] = useState(
    location.pathname.startsWith("/settings/halaman"),
  );

  const [produkJasaOpen, setProdukJasaOpen] = useState(
    location.pathname.startsWith("/settings/halaman/produk-jasa") ||
      location.pathname.startsWith("/settings/halaman/mekanikal") ||
      location.pathname.startsWith("/settings/halaman/sparepart") ||
      location.pathname.startsWith("/settings/halaman/software-it"),
  );

  // =========================
  // MASTER
  // =========================
  const [masterOpen, setMasterOpen] = useState(
    location.pathname.startsWith("/master"),
  );

  // =========================
  // SETTING POSTINGAN
  // =========================
  const [postingOpen, setPostingOpen] = useState(
    location.pathname.startsWith("/settings/postingan") ||
      location.pathname.startsWith("/konfirmasi-postingan") ||
      location.pathname.startsWith("/tipe"),
  );

  // =========================
  // POSTINGAN
  // =========================
  const [postinganMenuOpen, setPostinganMenuOpen] = useState(
    location.pathname.startsWith("/postingan") ||
      location.pathname.startsWith("/artikel") ||
      location.pathname.startsWith("/karir") ||
      location.pathname.startsWith("/layanan") ||
      location.pathname.startsWith("/produk") ||
      location.pathname.startsWith("/produk-layanan"),
  );

  // =========================
  // ACTIVE SETTINGS
  // =========================
  const isBerandaActive = location.pathname === "/settings/beranda";

  const isFaqActive = location.pathname.startsWith("/settings/faq");

  const isProdukDigiActive = location.pathname.startsWith(
    "/settings/produk-digi",
  );

  const isTentangDigiActive = location.pathname.startsWith(
    "/settings/tentang-digi",
  );

  const isPortofolioActive = location.pathname.startsWith(
    "/settings/portofolio",
  );

  const isLayananActive = location.pathname.startsWith("/settings/layanan");

  const isVisiMisiActive = location.pathname.startsWith("/settings/visi-misi");

  // =========================
  // HANDLERS
  // =========================
  const handleGeneralClick = () => {
    setGeneralOpen((prev) => !prev);

    setPengaturanHalamanOpen(false);
    setMasterOpen(false);
    setPostingOpen(false);
    setPostinganMenuOpen(false);
  };

  const handlePengaturanHalamanClick = () => {
    setPengaturanHalamanOpen((prev) => !prev);

    setGeneralOpen(false);
    setMasterOpen(false);
    setPostingOpen(false);
    setPostinganMenuOpen(false);
  };

  const handleMasterClick = () => {
    setMasterOpen((prev) => !prev);

    // Tutup menu utama lain
    setGeneralOpen(false);
    setPostingOpen(false);
    setPostinganMenuOpen(false);
  };

  const handlePostingClick = () => {
    setPostingOpen((prev) => !prev);

    // Tutup menu utama lain
    setGeneralOpen(false);
    setMasterOpen(false);
    setPostinganMenuOpen(false);
  };

  const handlePostinganMenuClick = () => {
    setPostinganMenuOpen((prev) => !prev);

    // Tutup menu utama lain
    setGeneralOpen(false);
    setMasterOpen(false);
    setPostingOpen(false);
  };

  // =========================
  // SETTINGS HANDLERS
  // =========================
  const handleBerandaClick = () => {
    navigate("/settings/beranda");
  };

  const handleFaqClick = () => {
    navigate("/settings/faq");
  };

  const handleProdukDigiClick = () => {
    navigate("/settings/produk-digi");
  };

  const handleTentangDigiClick = () => {
    navigate("/settings/tentang-digi");
  };

  const handlePortofolioClick = () => {
    navigate("/settings/portofolio");
  };

  const handleLayananClick = () => {
    navigate("/settings/layanan");
  };

  const handleVisiMisiClick = () => {
    navigate("/settings/visi-misi");
  };

  const handleProdukJasaClick = () => {
    setProdukJasaOpen((prev) => !prev);
  };

  // =========================
  // MASTER HANDLERS
  // =========================
  const handleFooterColumnClick = () => {
    setMasterOpen(true);
    navigate("/master/footer-column");
  };

  const handlePengaturanPenggunaClick = () => {
    navigate("/master/pengaturan-pengguna");
  };

  // =========================
  // RETURN
  // =========================
  return (
    <aside className={`sidebar ${collapsed ? "sidebar-collapsed" : ""}`}>
      {/* =========================
          LOGO
      ========================= */}
      <div className="sidebar-logo">
        <img src={logoSidebar || "/Logo-Digi.png"} alt="Digi" />
      </div>

      {/* =========================
          DASHBOARD
      ========================= */}
      <div className="sidebar-section">
        <p className="sidebar-title">DASHBOARD</p>

        <div
          className={`sidebar-menu ${
            location.pathname === "/dashboard" ? "active" : ""
          }`}
          onClick={() => navigate("/dashboard")}
        >
          <img
            src={
              location.pathname === "/dashboard"
                ? "/dashboard-active.svg"
                : "/dashboard.svg"
            }
            alt=""
            className="sidebar-menu-icon"
          />

          <span>Dashboard</span>
        </div>
      </div>

      {/* =========================
          SETTINGS
      ========================= */}
      <div className="sidebar-section">
        <p className="sidebar-title">SETTINGS</p>

        {/* =========================
    PENGATURAN UMUM
========================= */}
        <div
          className={`sidebar-menu ${generalOpen ? "active" : ""}`}
          onClick={handleGeneralClick}
        >
          <img
            src={generalOpen ? pengaturanUmumIconActive : pengaturanUmumIcon}
            alt=""
            className="sidebar-menu-icon"
          />

          <span>Pengaturan Umum</span>

          <ChevronDown
            size={16}
            className={`menu-arrow ${generalOpen ? "arrow-open" : ""}`}
          />
        </div>

        {/* =========================
            SUBMENU PENGATURAN UMUM
        ========================= */}
        {generalOpen && !collapsed && (
          <div className="sidebar-submenu">
            {/* BERANDA */}
            <div
              className={`sidebar-submenu-item ${
                isBerandaActive ? "active" : ""
              }`}
              onClick={handleBerandaClick}
            >
              Beranda
            </div>

            {/* FAQ */}
            <div
              className={`sidebar-submenu-item ${isFaqActive ? "active" : ""}`}
              onClick={handleFaqClick}
            >
              FAQ
            </div>

            {/* FOOTER */}
            <div
              className={`sidebar-submenu-item ${
                location.pathname === "/settings/footer" ? "active" : ""
              }`}
              onClick={() => navigate("/settings/footer")}
            >
              Footer
            </div>

            {/* HOME - KONTAK */}
            <div
              className={`sidebar-submenu-item ${
                location.pathname === "/settings/kontak" ? "active" : ""
              }`}
              onClick={() => navigate("/settings/kontak")}
            >
              Home - Kontak
            </div>

            {/* HOME - KEGIATAN */}
            <div
              className={`sidebar-submenu-item ${
                location.pathname === "/settings/kegiatan" ? "active" : ""
              }`}
              onClick={() => navigate("/settings/kegiatan")}
            >
              Home - Kegiatan
            </div>

            {/* HOME - MITRA */}
            <div
              className={`sidebar-submenu-item ${
                location.pathname === "/settings/mitra" ? "active" : ""
              }`}
              onClick={() => navigate("/settings/mitra")}
            >
              Home - Mitra
            </div>

            {/* HOME - PRODUK DIGI */}
            <div
              className={`sidebar-submenu-item ${
                isProdukDigiActive ? "active" : ""
              }`}
              onClick={handleProdukDigiClick}
            >
              Home - Produk Digi
            </div>

            {/* HOME - PORTOFOLIO */}
            <div
              className={`sidebar-submenu-item ${
                isPortofolioActive ? "active" : ""
              }`}
              onClick={handlePortofolioClick}
            >
              Home - Portofolio
            </div>

            {/* HOME - LAYANAN */}
            <div
              className={`sidebar-submenu-item ${
                isLayananActive ? "active" : ""
              }`}
              onClick={handleLayananClick}
            >
              Home - Layanan
            </div>

            {/* HOME - TENTANG Kami */}
            <div
              className={`sidebar-submenu-item ${
                isTentangDigiActive ? "active" : ""
              }`}
              onClick={handleTentangDigiClick}
            >
              Home - Tentang Kami
            </div>

            {/* HOME - VISI MISI */}
            <div
              className={`sidebar-submenu-item ${
                isVisiMisiActive ? "active" : ""
              }`}
              onClick={handleVisiMisiClick}
            >
              Home - Visi Misi
            </div>

            {/* PENGATURAN LAINNYA */}
            <div
              className={`sidebar-submenu-item ${
                location.pathname.startsWith("/settings/pengaturan-lainnya")
                  ? "active"
                  : ""
              }`}
              onClick={() => navigate("/settings/pengaturan-lainnya")}
            >
              Pengaturan Lainnya
            </div>
          </div>
        )}

        {/* =========================
    PENGATURAN HALAMAN
========================= */}

        <div
          className={`sidebar-menu ${pengaturanHalamanOpen ? "active" : ""}`}
          onClick={handlePengaturanHalamanClick}
        >
          <img
            src={
              pengaturanHalamanOpen
                ? pengaturanUmumIconActive
                : pengaturanUmumIcon
            }
            alt=""
            className="sidebar-menu-icon"
          />

          <span>Pengaturan Halaman</span>

          <ChevronDown
            size={16}
            className={`menu-arrow ${
              pengaturanHalamanOpen ? "arrow-open" : ""
            }`}
          />
        </div>

        {/* =========================
    SUBMENU PENGATURAN HALAMAN
========================= */}

        {pengaturanHalamanOpen && !collapsed && (
          <div className="sidebar-submenu">
            {/* ARTIKEL */}
            <div
              className={`sidebar-submenu-item ${
                location.pathname === "/settings/halaman/artikel"
                  ? "active"
                  : ""
              }`}
              onClick={() => navigate("/settings/halaman/artikel")}
            >
              Artikel
            </div>

            {/* KEGIATAN */}
            <div
              className={`sidebar-submenu-item ${
                location.pathname === "/settings/halaman/kegiatan"
                  ? "active"
                  : ""
              }`}
              onClick={() => navigate("/settings/halaman/kegiatan")}
            >
              Kegiatan
            </div>

            {/* KARIR */}
            <div
              className={`sidebar-submenu-item ${
                location.pathname === "/settings/halaman/karir" ? "active" : ""
              }`}
              onClick={() => navigate("/settings/halaman/karir")}
            >
              Karir
            </div>

            {/* FAQ */}
            <div
              className={`sidebar-submenu-item ${
                location.pathname === "/settings/halaman/faq" ? "active" : ""
              }`}
              onClick={() => navigate("/settings/halaman/faq")}
            >
              FAQ
            </div>

            {/* SERTIFIKASI */}
            <div
              className={`sidebar-submenu-item ${
                location.pathname === "/settings/halaman/sertifikasi"
                  ? "active"
                  : ""
              }`}
              onClick={() => navigate("/settings/halaman/sertifikasi")}
            >
              Sertifikasi
            </div>

            {/* PRODUK & JASA */}
            <div
              className={`sidebar-submenu-item ${
                location.pathname.startsWith("/settings/halaman/produk-jasa") ||
                location.pathname.startsWith("/settings/halaman/mekanikal") ||
                location.pathname.startsWith("/settings/halaman/sparepart") ||
                location.pathname.startsWith("/settings/halaman/software-it")
                  ? "active"
                  : ""
              }`}
            >
              <span onClick={() => navigate("/settings/halaman/produk-jasa")}>
                Produk & Jasa
              </span>

              <ChevronDown
                size={16}
                className={`menu-arrow ${produkJasaOpen ? "arrow-open" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setProdukJasaOpen((prev) => !prev);
                }}
              />
            </div>

            {/* SUBMENU PRODUK & JASA */}
            {produkJasaOpen && (
              <>
                {/* MEKANIKAL */}
                <div
                  className={`sidebar-submenu-item ${
                    location.pathname === "/settings/halaman/mekanikal"
                      ? "active"
                      : ""
                  }`}
                  onClick={() => navigate("/settings/halaman/mekanikal")}
                >
                  Mekanikal
                </div>

                {/* SPAREPART */}
                <div
                  className={`sidebar-submenu-item ${
                    location.pathname === "/settings/halaman/sparepart"
                      ? "active"
                      : ""
                  }`}
                  onClick={() => navigate("/settings/halaman/sparepart")}
                >
                  Sparepart
                </div>

                {/* SOFTWARE IT */}
                <div
                  className={`sidebar-submenu-item ${
                    location.pathname === "/settings/halaman/software-it"
                      ? "active"
                      : ""
                  }`}
                  onClick={() => navigate("/settings/halaman/software-it")}
                >
                  Software IT
                </div>
              </>
            )}
          </div>
        )}

        {/* =========================
            MASTER
        ========================= */}
        <div
          className={`sidebar-menu ${
            location.pathname === "/master" ||
            location.pathname.startsWith("/master/footer-column") ||
            location.pathname.startsWith("/master/pengaturan-menu") ||
            location.pathname.startsWith("/master/sosial-media")
              ? "active"
              : ""
          }`}
          onClick={handleMasterClick}
        >
          <img
            src={
              location.pathname === "/master" ||
              location.pathname.startsWith("/master/footer-column") ||
              location.pathname.startsWith("/master/pengaturan-menu") ||
              location.pathname.startsWith("/master/sosial-media")
                ? masterIconActive
                : masterIcon
            }
            alt=""
            className="sidebar-menu-icon"
          />

          <span>Master</span>

          <ChevronDown
            size={16}
            className={`menu-arrow ${masterOpen ? "arrow-open" : ""}`}
          />
        </div>

        {/* =========================
            SUBMENU MASTER
        ========================= */}
        {masterOpen && !collapsed && (
          <div className="sidebar-submenu">
            {/* FOOTER COLUMN */}
            <div
              className={`sidebar-submenu-item ${
                location.pathname.startsWith("/master/footer-column")
                  ? "active"
                  : ""
              }`}
              onClick={handleFooterColumnClick}
            >
              Footer Column
            </div>

            {/* PENGATURAN MENU */}
            <div
              className={`sidebar-submenu-item ${
                location.pathname.startsWith("/master/pengaturan-menu")
                  ? "active"
                  : ""
              }`}
              onClick={() => navigate("/master/pengaturan-menu")}
            >
              Pengaturan Menu
            </div>

            {/* SOSIAL MEDIA */}
            <div
              className={`sidebar-submenu-item ${
                location.pathname.startsWith("/master/sosial-media")
                  ? "active"
                  : ""
              }`}
              onClick={() => navigate("/master/sosial-media")}
            >
              Sosial Media
            </div>
          </div>
        )}

        {/* =========================
    PENGATURAN PENGGUNA
========================= */}
        {isAdmin && (
          <div
            className={`sidebar-menu ${
              location.pathname.startsWith("/master/pengaturan-pengguna")
                ? "active"
                : ""
            }`}
            onClick={() => navigate("/master/pengaturan-pengguna")}
          >
            <img
              src={
                location.pathname.startsWith("/master/pengaturan-pengguna")
                  ? pengaturanPenggunaIconActive
                  : pengaturanPenggunaIcon
              }
              alt=""
              className="sidebar-menu-icon"
            />

            <span>Pengaturan Pengguna</span>
          </div>
        )}

        {/* =========================
            HALAMAN
        ========================= */}
        <div
          className={`sidebar-menu ${
            location.pathname.startsWith("/master/halaman") ? "active" : ""
          }`}
          onClick={() => navigate("/master/halaman")}
        >
          <img
            src={
              location.pathname.startsWith("/master/halaman")
                ? halamanIconActive
                : halamanIcon
            }
            alt=""
            className="sidebar-menu-icon"
          />

          <span>Halaman</span>
        </div>

        {/* =========================
            POSTINGAN
        ========================= */}
        <p className="sidebar-title posting-section-title">POSTINGAN</p>

        {/* =========================
            SETTING POSTINGAN
        ========================= */}
        <div
          className={`sidebar-menu ${postingOpen ? "active" : ""}`}
          onClick={handlePostingClick}
        >
          <img
            src={
              postingOpen ? settingPostinganIconActive : settingPostinganIcon
            }
            alt=""
            className="sidebar-menu-icon"
          />

          <span>Setting Postingan</span>

          <ChevronDown
            size={16}
            className={`menu-arrow ${postingOpen ? "arrow-open" : ""}`}
          />
        </div>

        {/* =========================
            SUBMENU SETTING POSTINGAN
        ========================= */}
        {postingOpen && !collapsed && (
          <div className="sidebar-submenu">
            {/* KONFIRMASI POSTINGAN */}
            <div
              className={`sidebar-submenu-item ${
                location.pathname === "/konfirmasi-postingan" ? "active" : ""
              }`}
              onClick={() => navigate("/konfirmasi-postingan")}
            >
              Konfirmasi Postingan
            </div>

            {/* TIPE */}
            <div
              className={`sidebar-submenu-item ${
                location.pathname === "/tipe" ? "active" : ""
              }`}
              onClick={() => navigate("/tipe")}
            >
              Tipe
            </div>
          </div>
        )}

        {/* =========================
            POSTINGAN
        ========================= */}
        <div
          className={`sidebar-menu ${
            postinganMenuOpen || location.pathname.startsWith("/postingan")
              ? "active"
              : ""
          }`}
          onClick={handlePostinganMenuClick}
        >
          <img
            src={
              postinganMenuOpen || location.pathname.startsWith("/postingan")
                ? postinganIconActive
                : postinganIcon
            }
            alt=""
            className="sidebar-menu-icon"
          />

          <span>Postingan</span>

          <ChevronDown
            size={16}
            className={`menu-arrow ${postinganMenuOpen ? "arrow-open" : ""}`}
          />
        </div>

        {/* =========================
            SUBMENU POSTINGAN
        ========================= */}
        {postinganMenuOpen && !collapsed && (
          <div className="sidebar-submenu">
            {/* SEMUA POSTINGAN */}
            <div
              className={`sidebar-submenu-item ${
                location.pathname === "/postingan" ? "active" : ""
              }`}
              onClick={() => navigate("/postingan")}
            >
              Semua Postingan
            </div>

            {/* ARTIKEL */}
            <div
              className={`sidebar-submenu-item ${
                location.pathname === "/artikel" ? "active" : ""
              }`}
              onClick={() => navigate("/artikel")}
            >
              Artikel
            </div>

            {/* KARIR */}
            <div
              className={`sidebar-submenu-item ${
                location.pathname === "/karir" ? "active" : ""
              }`}
              onClick={() => navigate("/karir")}
            >
              Karir
            </div>

            {/* LAYANAN */}
            <div
              className={`sidebar-submenu-item ${
                location.pathname === "/layanan" ? "active" : ""
              }`}
              onClick={() => navigate("/layanan")}
            >
              Layanan
            </div>

            {/* PORTOFOLIO */}
            <div
              className={`sidebar-submenu-item ${
                location.pathname === "/portofolio" ? "active" : ""
              }`}
              onClick={() => navigate("/portofolio")}
            >
              Portofolio
            </div>

            {/* PRODUK & JASA */}
            <div
              className={`sidebar-submenu-item ${
                location.pathname === "/produk" ? "active" : ""
              }`}
              onClick={() => navigate("/produk")}
            >
              Produk & Jasa
            </div>
          </div>
        )}

        {/* =========================
            KEGIATAN
        ========================= */}
        <div
          className={`sidebar-menu ${
            location.pathname.startsWith("/kegiatan") ? "active" : ""
          }`}
          onClick={() => navigate("/kegiatan")}
        >
          <img
            src={
              location.pathname.startsWith("/kegiatan")
                ? kegiatanIconActive
                : kegiatanIcon
            }
            alt=""
            className="sidebar-menu-icon"
          />

          <span>Kegiatan</span>
        </div>

        {/* =========================
            SERTIFIKASI
        ========================= */}
        <div
          className={`sidebar-menu ${
            location.pathname.startsWith("/sertifikasi") ? "active" : ""
          }`}
          onClick={() => navigate("/sertifikasi")}
        >
          <img
            src={
              location.pathname.startsWith("/sertifikasi")
                ? sertifikasiIconActive
                : sertifikasiIcon
            }
            alt=""
            className="sidebar-menu-icon"
          />

          <span>Sertifikasi</span>
        </div>
      </div>

      {/* =========================
          CONTACT
      ========================= */}
      <div className="sidebar-section">
        <p className="sidebar-title">CONTACT</p>

        <div
          className={`sidebar-menu ${
            location.pathname.startsWith("/kontak-masuk") ? "active" : ""
          }`}
          onClick={() => navigate("/kontak-masuk")}
        >
          <img
            src={
              location.pathname.startsWith("/kontak-masuk")
                ? kontakMasukIconActive
                : kontakMasukIcon
            }
            alt=""
            className="sidebar-menu-icon"
          />

          <span>Kontak Masuk</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
