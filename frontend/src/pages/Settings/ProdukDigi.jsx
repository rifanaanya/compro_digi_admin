import { useEffect, useState } from "react";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./ProdukDigi.css";

function ProdukDigi() {
  const [slogan, setSlogan] = useState("");
  const [deskripsi, setDeskripsi] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [notification, setNotification] = useState(null);

  // ==============================
  // NOTIFICATION
  // ==============================
  const showNotification = (message, type = "success") => {
    setNotification({
      message,
      type,
    });

    const audio = new Audio("/sounds/notification.mp3");

    audio.volume = 0.5;
    audio.currentTime = 0;

    audio.play().catch((error) => {
      console.warn("⚠️ Sound notification tidak dapat diputar:", error);
    });

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // ==============================
  // AMBIL DATA PRODUK & JASA
  // ==============================
  useEffect(() => {
    const fetchProdukJasa = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/home");

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Gagal mengambil data Beranda.");
        }

        setSlogan(result.data.slogan || "");
        setDeskripsi(result.data.description || "");
      } catch (error) {
        console.error("❌ Error mengambil Produk & Jasa:", error);

        showNotification("Gagal mengambil pengaturan produk & jasa.", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchProdukJasa();
  }, []);

  // ==============================
  // SIMPAN DATA
  // ==============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!slogan.trim()) {
      showNotification("Slogan wajib diisi!", "error");
      return;
    }

    if (!deskripsi.trim()) {
      showNotification("Deskripsi umum produk & jasa wajib diisi!", "error");
      return;
    }

    try {
      setSaving(true);

      const response = await fetch("http://localhost:5000/api/home", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slogan: slogan.trim(),
          description: deskripsi.trim(),
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Gagal menyimpan pengaturan produk & jasa.",
        );
      }

      showNotification(
        "Pengaturan produk & jasa berhasil disimpan!",
        "success",
      );
    } catch (error) {
      console.error("❌ Error menyimpan Produk & Jasa:", error);

      showNotification("Gagal menyimpan pengaturan produk & jasa.", "error");
    } finally {
      setSaving(false);
    }
  };

  // ==============================
  // LOADING
  // ==============================
  if (loading) {
    return (
      <div className="produk-digi-layout">
        <Sidebar />

        <div className="produk-digi-main">
          <Navbar />

          <main className="produk-digi-content">
            <section className="produk-digi-header">
              <h1>Home - Produk Digi Setting</h1>
            </section>

            <section className="produk-digi-card">
              <div className="produk-digi-card-title">
                Home - Produk Digi Setting
              </div>

              <div className="produk-digi-card-content">Memuat data...</div>
            </section>
          </main>
        </div>
      </div>
    );
  }

  // ==============================
  // HALAMAN UTAMA
  // ==============================
  return (
    <div className="produk-digi-layout">
      {/* SIDEBAR */}
      <Sidebar />

      <div className="produk-digi-main">
        {/* NAVBAR */}
        <Navbar />

        <main className="produk-digi-content">
          {/* HEADER */}
          <section className="produk-digi-header">
            <h1>Home - Produk Digi Setting</h1>
          </section>

          {/* FORM CARD */}
          <section className="produk-digi-card">
            {/* CARD TITLE */}
            <div className="produk-digi-card-title">
              Home - Produk Digi Setting
            </div>

            {/* FORM */}
            <div className="produk-digi-card-content">
              <form onSubmit={handleSubmit}>
                {/* SLOGAN */}
                <div className="produk-digi-form-group">
                  <label htmlFor="slogan">Slogan</label>

                  <input
                    id="slogan"
                    type="text"
                    value={slogan}
                    onChange={(e) => setSlogan(e.target.value)}
                    placeholder="Masukkan Slogan"
                  />
                </div>

                {/* DESKRIPSI */}
                <div className="produk-digi-form-group">
                  <label htmlFor="deskripsi">Deskripsi Umum Produk Digi</label>

                  <textarea
                    id="deskripsi"
                    value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)}
                    placeholder="Masukkan Deskripsi Umum Produk Digi"
                  />
                </div>

                {/* SIMPAN */}
                <button
                  type="submit"
                  className="produk-digi-save-button"
                  disabled={saving}
                >
                  {saving ? "Menyimpan..." : "Simpan"}
                </button>
              </form>
            </div>
          </section>
        </main>
      </div>

      {/* NOTIFICATION */}
      {notification && (
        <div className={`produk-digi-notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
    </div>
  );
}

export default ProdukDigi;
