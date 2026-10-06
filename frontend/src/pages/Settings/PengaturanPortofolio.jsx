import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./PengaturanPortofolio.css";

function PengaturanPortofolio() {
  const navigate = useNavigate();

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
  // AMBIL DATA PORTOFOLIO
  // ==============================
  useEffect(() => {
    const fetchPortofolio = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/page-settings/portofolio",
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.message || "Gagal mengambil pengaturan portofolio.",
          );
        }

        setSlogan(result.data.title || "");
        setDeskripsi(result.data.description || "");
      } catch (error) {
        console.error("❌ Error mengambil Portofolio:", error);

        alert(error.message || "Gagal mengambil pengaturan portofolio.");

        navigate("/settings/portofolio");
      } finally {
        setLoading(false);
      }
    };

    fetchPortofolio();
  }, [navigate]);

  // ==============================
  // SIMPAN
  // ==============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!slogan.trim()) {
      alert("Slogan wajib diisi!");
      return;
    }

    if (!deskripsi.trim()) {
      alert("Deskripsi umum portofolio wajib diisi!");
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(
        "http://localhost:5000/api/page-settings/portofolio",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: slogan,
            description: deskripsi,
          }),
        },
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Gagal menyimpan pengaturan portofolio.",
        );
      }

      showNotification("Pengaturan portofolio berhasil disimpan!", "success");
    } catch (error) {
      console.error("❌ Error menyimpan Portofolio:", error);

      showNotification("Gagal menyimpan pengaturan portofolio.", "error");
    } finally {
      setSaving(false);
    }
  };

  // ==============================
  // LOADING
  // ==============================
  if (loading) {
    return (
      <div className="pengaturan-portofolio-layout">
        <Sidebar />

        <div className="pengaturan-portofolio-main">
          <Navbar />

          <main className="pengaturan-portofolio-content">
            <section className="pengaturan-portofolio-header">
              <h1>Home - Portofolio Setting</h1>
            </section>

            <section className="pengaturan-portofolio-card">
              <div className="pengaturan-portofolio-card-title">
                Home - Portofolio Setting
              </div>

              <div className="pengaturan-portofolio-card-content">
                Memuat data...
              </div>
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
    <div className="pengaturan-portofolio-layout">
      {/* SIDEBAR */}
      <Sidebar />

      <div className="pengaturan-portofolio-main">
        {/* NAVBAR */}
        <Navbar />

        <main className="pengaturan-portofolio-content">
          {/* HEADER */}
          <section className="pengaturan-portofolio-header">
            <h1>Home - Portofolio Setting</h1>
          </section>

          {/* CARD */}
          <section className="pengaturan-portofolio-card">
            <div className="pengaturan-portofolio-card-title">
              Home - Portofolio Setting
            </div>

            <form
              className="pengaturan-portofolio-card-content"
              onSubmit={handleSubmit}
            >
              {/* SLOGAN */}
              <div className="pengaturan-portofolio-form-group">
                <label htmlFor="slogan">Slogan</label>

                <input
                  id="slogan"
                  type="text"
                  value={slogan}
                  onChange={(e) => setSlogan(e.target.value)}
                  placeholder="Masukkan Slogan Perusahaan"
                />
              </div>

              {/* DESKRIPSI */}
              <div className="pengaturan-portofolio-form-group">
                <label htmlFor="deskripsiPortofolio">
                  Deskripsi Umum Portofolio
                </label>

                <textarea
                  id="deskripsiPortofolio"
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  placeholder="Masukkan Deskripsi Umum Portofolio"
                />
              </div>

              {/* SIMPAN */}
              <button
                type="submit"
                className="pengaturan-portofolio-save-button"
                disabled={saving}
              >
                {saving ? "Menyimpan..." : "Simpan"}
              </button>
            </form>
          </section>
        </main>
      </div>

      {/* NOTIFICATION */}
      {notification && (
        <div className={`portofolio-notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
    </div>
  );
}

export default PengaturanPortofolio;
