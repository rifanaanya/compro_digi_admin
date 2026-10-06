import { useEffect, useState } from "react";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./TentangDigi.css";

function TentangDigi() {
  const [deskripsi, setDeskripsi] = useState("");
  const [gambar, setGambar] = useState(null);
  const [gambarLama, setGambarLama] = useState(null);
  const [previewGambar, setPreviewGambar] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ==========================================
  // NOTIFICATION
  // ==========================================

  const [notification, setNotification] = useState({
    show: false,
    type: "",
    message: "",
  });

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
  // AMBIL DATA TENTANG DIGI
  // ==========================================

  useEffect(() => {
    const fetchTentangDigi = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/tentang-digi");

        const data = await response.json();

        // Data belum tersedia
        if (response.status === 404) {
          return;
        }

        if (!response.ok) {
          throw new Error(data.message || "Gagal mengambil data Tentang Digi");
        }

        setDeskripsi(data.data?.deskripsi || "");
        setGambarLama(data.data?.gambar || null);
      } catch (error) {
        console.error("❌ Error mengambil Tentang Digi:", error);

        showNotification("error", "Gagal mengambil data Tentang Digi.");
      } finally {
        setLoading(false);
      }
    };

    fetchTentangDigi();
  }, []);

  // ==========================================
  // PILIH GAMBAR
  // ==========================================

  const handleGambarChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setGambar(file);

    const previewUrl = URL.createObjectURL(file);

    setPreviewGambar(previewUrl);
  };

  // ==========================================
  // SIMPAN DATA
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!deskripsi.trim()) {
      showNotification("error", "Deskripsi wajib diisi.");
      return;
    }

    try {
      setSaving(true);

      const formData = new FormData();

      formData.append("deskripsi", deskripsi);

      if (gambar) {
        formData.append("gambar", gambar);
      }

      const response = await fetch("http://localhost:5000/api/tentang-digi", {
        method: "PUT",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal menyimpan data Tentang Digi");
      }

      setGambarLama(data.data?.gambar || null);
      setGambar(null);

      if (previewGambar) {
        URL.revokeObjectURL(previewGambar);
      }

      setPreviewGambar(null);

      // 🔊 SOUND
      playSuccessSound();

      // ✅ NOTIFICATION
      showNotification("success", "Pengaturan Tentang Kami berhasil disimpan!");
    } catch (error) {
      console.error("❌ Error menyimpan Tentang Digi:", error);

      showNotification(
        "error",
        error.message || "Gagal menyimpan data Tentang Digi.",
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // URL GAMBAR DATABASE
  // ==========================================

  const gambarDatabase = gambarLama
    ? `http://localhost:5000${gambarLama}`
    : null;

  return (
    <div className="tentang-digi-layout">
      <Sidebar />

      <div className="tentang-digi-main">
        <Navbar />

        <main className="tentang-digi-content">
          {/* NOTIFICATION */}
          {notification.show && (
            <div className={`tentang-digi-notification ${notification.type}`}>
              {notification.message}
            </div>
          )}

          {/* HEADER */}
          <section className="tentang-digi-header">
            <h1>Home - Tentang Kami Setting</h1>
          </section>

          {/* CARD */}
          <section className="tentang-digi-card">
            <div className="tentang-digi-card-title">
              Home - Tentang Kami Setting
            </div>

            <div className="tentang-digi-card-content">
              <form onSubmit={handleSubmit}>
                {/* DESKRIPSI */}
                <div className="tentang-digi-form-group">
                  <label htmlFor="deskripsi">Deskripsi</label>

                  <textarea
                    id="deskripsi"
                    value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)}
                    placeholder="Masukkan Deskripsi"
                    rows="5"
                    disabled={loading || saving}
                  />
                </div>

                {/* GAMBAR */}
                <div className="tentang-digi-form-group">
                  <label htmlFor="gambar">Upload Gambar</label>

                  <div className="tentang-digi-upload-box">
                    {/* CHOOSE FILE */}
                    <div className="tentang-digi-file-wrapper">
                      <input
                        id="gambar"
                        type="file"
                        accept="image/*"
                        onChange={handleGambarChange}
                        disabled={loading || saving}
                      />
                    </div>

                    {/* PREVIEW GAMBAR */}
                    {(previewGambar || gambarDatabase) && (
                      <div className="tentang-digi-image-preview">
                        <img
                          src={previewGambar || gambarDatabase}
                          alt="Preview Tentang Kami"
                        />

                        <p>
                          {gambar?.name ||
                            gambarLama?.split("/").pop() ||
                            "Gambar saat ini"}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* SIMPAN */}
                <button
                  type="submit"
                  className="tentang-digi-save-button"
                  disabled={loading || saving}
                >
                  {saving ? "Menyimpan..." : "Simpan"}
                </button>
              </form>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default TentangDigi;
