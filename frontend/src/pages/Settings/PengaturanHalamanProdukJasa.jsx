import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./PengaturanHalamanProdukJasa.css";

function PengaturanProdukJasa() {
  const navigate = useNavigate();

  const [slogan, setSlogan] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [notification, setNotification] = useState({
    show: false,
    type: "",
    message: "",
  });

  // ==========================================
  // NOTIFICATION
  // ==========================================

  const showNotification = (type, message) => {
    setNotification({
      show: true,
      type,
      message,
    });

    setTimeout(() => {
      setNotification({
        show: false,
        type: "",
        message: "",
      });
    }, 3000);
  };

  // ==========================================
  // SOUND NOTIFICATION
  // ==========================================

  const playSuccessSound = () => {
    const audio = new Audio("/sounds/notification.mp3");

    audio.volume = 0.5;
    audio.currentTime = 0;

    audio.play().catch((error) => {
      console.warn("⚠️ Sound notification tidak dapat diputar:", error);
    });
  };

  // ==========================================
  // AMBIL DATA PRODUK & JASA
  // ==========================================

  useEffect(() => {
    const fetchProdukJasa = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/page-settings/produk-jasa",
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Gagal mengambil pengaturan produk & jasa.",
          );
        }

        setSlogan(data.data?.title || "");
        setDeskripsi(data.data?.description || "");
      } catch (error) {
        console.error("❌ Error mengambil Page Setting Produk & Jasa:", error);

        showNotification(
          "error",
          error.message || "Gagal mengambil pengaturan produk & jasa.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProdukJasa();
  }, []);

  // ==========================================
  // SIMPAN PAGE SETTING
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!judul.trim()) {
      showNotification("error", "Judul wajib diisi.");
      return;
    }

    if (!deskripsi.trim()) {
      showNotification("error", "Deskripsi umum produk & jasa wajib diisi.");
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(
        "http://localhost:5000/api/page-settings/produk-jasa",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: judul.trim(),
            description: deskripsi.trim(),
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Gagal menyimpan pengaturan produk & jasa.",
        );
      }

      setJudul(data.data?.title || judul.trim());
      setDeskripsi(data.data?.description || deskripsi.trim());

      playSuccessSound();

      showNotification(
        "success",
        "Pengaturan produk & jasa berhasil disimpan.",
      );
    } catch (error) {
      console.error("❌ Error menyimpan Page Setting Produk & Jasa:", error);

      showNotification(
        "error",
        error.message || "Gagal menyimpan pengaturan produk & jasa.",
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="admin-layout">
        <Sidebar />

        <div className="admin-main">
          <Navbar />

          <main className="pengaturan-produk-jasa-content">
            <div className="pengaturan-produk-jasa-title-card">
              <h1>Home - Produk Digi Setting</h1>
            </div>

            <div className="pengaturan-produk-jasa-card">
              <div className="pengaturan-produk-jasa-card-header">
                <h2>Halaman Setting</h2>
              </div>

              <form className="pengaturan-produk-jasa-form">
                <div className="pengaturan-produk-jasa-form-group">
                  Memuat data...
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // ==========================================
  // HALAMAN UTAMA
  // ==========================================

  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="admin-main">
        <Navbar />

        <main className="pengaturan-produk-jasa-content">
          {/* NOTIFICATION */}
          {notification.show && (
            <div
              className={`pengaturan-produk-jasa-notification ${notification.type}`}
            >
              {notification.message}
            </div>
          )}

          {/* PAGE TITLE */}
          <div className="pengaturan-produk-jasa-title-card">
            <h1>Home - Produk Digi Setting</h1>
          </div>

          {/* FORM CARD */}
          <div className="pengaturan-produk-jasa-card">
            <div className="pengaturan-produk-jasa-card-header">
              <h2>Halaman Setting</h2>
            </div>

            <form
              className="pengaturan-produk-jasa-form"
              onSubmit={handleSubmit}
            >
              {/* JUDUL */}
              <div className="pengaturan-produk-jasa-form-group">
                <label htmlFor="produk-jasa-slogan">Judul</label>

                <input
                  id="produk-jasa-slogan"
                  type="text"
                  placeholder="Masukkan Judul"
                  value={slogan}
                  onChange={(e) => setSlogan(e.target.value)}
                />
              </div>

              {/* DESKRIPSI */}
              <div className="pengaturan-produk-jasa-form-group">
                <label htmlFor="produk-jasa-description">Deskripsi</label>

                <textarea
                  id="produk-jasa-description"
                  placeholder="Masukkan Deskripsi"
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  rows="6"
                />
              </div>

              {/* BUTTON */}
              <div className="pengaturan-produk-jasa-actions">
                <button
                  type="submit"
                  className="pengaturan-produk-jasa-save"
                  disabled={saving}
                >
                  {saving ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default PengaturanProdukJasa;
