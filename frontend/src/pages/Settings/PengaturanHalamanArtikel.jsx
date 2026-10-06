import { useEffect, useState } from "react";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./PengaturanHalamanArtikel.css";

function PengaturanHalamanArtikel() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

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
  // SOUND
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
  // GET DATA ARTIKEL
  // ==========================================

  useEffect(() => {
    const fetchPageSetting = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          "http://localhost:5000/api/page-settings/artikel",
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Gagal mengambil pengaturan halaman artikel.",
          );
        }

        setTitle(data.data?.title || "");
        setDescription(data.data?.description || "");
      } catch (error) {
        console.error("❌ Error mengambil Page Setting Artikel:", error);

        showNotification(
          "error",
          error.message || "Gagal mengambil pengaturan halaman artikel.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPageSetting();
  }, []);

  // ==========================================
  // SIMPAN
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      showNotification("error", "Judul wajib diisi.");
      return;
    }

    if (!description.trim()) {
      showNotification("error", "Deskripsi wajib diisi.");
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(
        "http://localhost:5000/api/page-settings/artikel",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title.trim(),
            description: description.trim(),
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Gagal menyimpan pengaturan halaman artikel.",
        );
      }

      setTitle(data.data?.title || title);
      setDescription(data.data?.description || description);

      playSuccessSound();

      showNotification(
        "success",
        "Pengaturan halaman artikel berhasil disimpan!",
      );
    } catch (error) {
      console.error("❌ Error menyimpan Page Setting Artikel:", error);

      showNotification(
        "error",
        error.message || "Gagal menyimpan pengaturan halaman artikel.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="admin-main">
        <Navbar />

        <main className="pengaturan-artikel-content">
          {/* NOTIFICATION */}
          {notification.show && (
            <div
              className={`pengaturan-artikel-notification ${notification.type}`}
            >
              {notification.message}
            </div>
          )}

          {/* PAGE TITLE */}
          <div className="pengaturan-artikel-title-card">
            <h1>Setting Halaman Artikel</h1>
          </div>

          {/* FORM CARD */}
          <div className="pengaturan-artikel-card">
            <div className="pengaturan-artikel-card-header">
              <h2>Halaman Setting</h2>
            </div>

            {loading ? (
              <div className="pengaturan-artikel-loading">Memuat data...</div>
            ) : (
              <form className="pengaturan-artikel-form" onSubmit={handleSubmit}>
                {/* JUDUL */}
                <div className="pengaturan-artikel-form-group">
                  <label htmlFor="artikel-title">Judul</label>

                  <input
                    id="artikel-title"
                    type="text"
                    placeholder="Masukkan Judul Halaman"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={saving}
                  />
                </div>

                {/* DESKRIPSI */}
                <div className="pengaturan-artikel-form-group">
                  <label htmlFor="artikel-description">Deskripsi</label>

                  <textarea
                    id="artikel-description"
                    placeholder="Masukkan Deskripsi Halaman"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="6"
                    disabled={saving}
                  />
                </div>

                {/* BUTTON */}
                <div className="pengaturan-artikel-actions">
                  <button
                    type="submit"
                    className="pengaturan-artikel-save"
                    disabled={saving}
                  >
                    {saving ? "Menyimpan..." : "Simpan"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default PengaturanHalamanArtikel;
