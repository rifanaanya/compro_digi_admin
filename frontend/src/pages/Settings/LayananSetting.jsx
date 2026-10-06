import { useEffect, useState } from "react";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./LayananSetting.css";

function LayananSetting() {
  const [slogan, setSlogan] = useState("");
  const [deskripsi, setDeskripsi] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [notification, setNotification] = useState(null);

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

  // =========================
  // GET DATA LAYANAN
  // =========================

  useEffect(() => {
    const fetchLayanan = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/layanan");

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.message || "Gagal mengambil pengaturan layanan.",
          );
        }

        setSlogan(result.data.slogan || "");
        setDeskripsi(result.data.description || "");
      } catch (error) {
        console.error("❌ Error mengambil Layanan:", error);

        showNotification("Gagal mengambil pengaturan layanan.", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchLayanan();
  }, []);

  // =========================
  // SIMPAN DATA
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!slogan.trim()) {
      showNotification("Slogan wajib diisi!", "error");
      return;
    }

    if (!deskripsi.trim()) {
      showNotification("Deskripsi layanan wajib diisi!", "error");
      return;
    }

    try {
      setSaving(true);

      const response = await fetch("http://localhost:5000/api/layanan", {
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
          result.message || "Gagal menyimpan pengaturan layanan.",
        );
      }

      showNotification("Pengaturan layanan berhasil disimpan!", "success");
    } catch (error) {
      console.error("❌ Error menyimpan Layanan:", error);

      showNotification("Gagal menyimpan pengaturan layanan.", "error");
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="layanan-setting-layout">
        <Sidebar />

        <div className="layanan-setting-main">
          <Navbar />

          <main className="layanan-setting-content">
            <section className="layanan-setting-header">
              <h1>Home - Layanan Setting</h1>
            </section>

            <section className="layanan-setting-card">
              <div className="layanan-setting-card-title">
                Home - Layanan Setting
              </div>

              <div className="layanan-setting-card-content">Memuat data...</div>
            </section>
          </main>
        </div>
      </div>
    );
  }

  // =========================
  // HALAMAN
  // =========================

  return (
    <div className="layanan-setting-layout">
      <Sidebar />

      <div className="layanan-setting-main">
        <Navbar />

        <main className="layanan-setting-content">
          <section className="layanan-setting-header">
            <h1>Home - Layanan Setting</h1>
          </section>

          <section className="layanan-setting-card">
            <div className="layanan-setting-card-title">
              Home - Layanan Setting
            </div>

            <div className="layanan-setting-card-content">
              <form onSubmit={handleSubmit}>
                <div className="layanan-setting-form-group">
                  <label htmlFor="slogan">Slogan</label>

                  <input
                    id="slogan"
                    type="text"
                    value={slogan}
                    onChange={(e) => setSlogan(e.target.value)}
                    placeholder="Masukkan Slogan"
                  />
                </div>

                <div className="layanan-setting-form-group">
                  <label htmlFor="deskripsi">Deskripsi Umum Layanan</label>

                  <textarea
                    id="deskripsi"
                    value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)}
                    placeholder="Masukkan Deskripsi Umum Layanan"
                  />
                </div>

                <button
                  type="submit"
                  className="layanan-setting-save-button"
                  disabled={saving}
                >
                  {saving ? "Menyimpan..." : "Simpan"}
                </button>
              </form>
            </div>
          </section>
        </main>
      </div>

      {notification && (
        <div className={`layanan-setting-notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
    </div>
  );
}

export default LayananSetting;
