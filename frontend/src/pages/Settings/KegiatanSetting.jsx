import { useEffect, useState } from "react";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./KegiatanSetting.css";

function KegiatanSetting() {
  const [deskripsi, setDeskripsi] = useState("");
  const [caption, setCaption] = useState("");
  const [gambar, setGambar] = useState(null);

  const [gambarLama, setGambarLama] = useState(null);

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
  // AMBIL DATA KEGIATAN
  // ==========================================

  useEffect(() => {
    const fetchKegiatan = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/kegiatan");

        const data = await response.json();

        // Data belum tersedia
        if (response.status === 404) {
          return;
        }

        if (!response.ok) {
          throw new Error(data.message || "Gagal mengambil data Kegiatan");
        }

        setDeskripsi(data.data?.deskripsi || "");
        setCaption(data.data?.caption || "");
        setGambarLama(data.data?.gambar || null);
      } catch (error) {
        console.error("❌ Error mengambil data Kegiatan:", error);

        alert("Gagal mengambil data Kegiatan.");
      } finally {
        setLoading(false);
      }
    };

    fetchKegiatan();
  }, []);

  // ==========================================
  // PILIH GAMBAR
  // ==========================================

  const handleGambarChange = (e) => {
    const file = e.target.files?.[0] || null;

    setGambar(file);
  };

  // ==========================================
  // SIMPAN DATA KEGIATAN
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!deskripsi.trim()) {
      showNotification("error", "Deskripsi Kegiatan wajib diisi.");
      return;
    }

    if (!caption.trim()) {
      showNotification("error", "Caption Foto Kegiatan wajib diisi.");
      return;
    }

    try {
      setSaving(true);

      // Gunakan FormData karena kita mengirim file
      const formData = new FormData();

      formData.append("deskripsi", deskripsi);
      formData.append("caption", caption);

      // Hanya kirim gambar kalau user memilih gambar baru
      if (gambar) {
        formData.append("gambar", gambar);
      }

      const response = await fetch("http://localhost:5000/api/kegiatan", {
        method: "PUT",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || data.message || "Gagal menyimpan data Kegiatan",
        );
      }

      // Simpan URL gambar terbaru dari response
      setGambarLama(data.data?.gambar || null);

      // Reset pilihan file
      setGambar(null);

      // Reset input file
      e.target.reset();

      // 🔊 PLAY SOUND
      playSuccessSound();

      // ✅ NOTIFICATION
      showNotification("success", "Pengaturan kegiatan berhasil disimpan!");
    } catch (error) {
      console.error("❌ Error menyimpan Kegiatan:", error);

      showNotification(
        "error",
        error.message || "Gagal menyimpan data Kegiatan.",
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // URL GAMBAR
  // ==========================================

  const gambarUrl = gambarLama ? `http://localhost:5000${gambarLama}` : null;

  // ==========================================
  // RETURN
  // ==========================================

  return (
    <div className="kegiatan-setting-layout">
      <Sidebar />

      <div className="kegiatan-setting-main">
        <Navbar />

        <main className="kegiatan-setting-content">
          {/* NOTIFICATION */}
          {notification.show && (
            <div
              className={`kegiatan-setting-notification ${notification.type}`}
            >
              {notification.message}
            </div>
          )}

          {/* HEADER */}
          <section className="kegiatan-setting-header">
            <h1>Home - Kegiatan Setting</h1>
          </section>

          {/* FORM CARD */}
          <section className="kegiatan-setting-card">
            <div className="kegiatan-setting-card-title">
              Home - Kegiatan Setting
            </div>

            <form className="kegiatan-setting-form" onSubmit={handleSubmit}>
              {/* DESKRIPSI */}
              <div className="kegiatan-setting-form-group">
                <label htmlFor="deskripsi">Deskripsi Kegiatan Perusahaan</label>

                <textarea
                  id="deskripsi"
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  placeholder="Masukkan Deskripsi Kegiatan Perusahaan"
                  rows="5"
                  disabled={loading || saving}
                />
              </div>

              {/* CAPTION */}
              <div className="kegiatan-setting-form-group">
                <label htmlFor="caption">Caption Foto Kegiatan</label>

                <textarea
                  id="caption"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Masukkan Caption Foto Kegiatan"
                  rows="4"
                  disabled={loading || saving}
                />
              </div>

              {/* UPLOAD GAMBAR */}
              <div className="kegiatan-setting-form-group">
                <label htmlFor="gambar">Upload Gambar Kegiatan</label>

                <input
                  id="gambar"
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={handleGambarChange}
                  disabled={loading || saving}
                />
              </div>

              {/* PREVIEW GAMBAR */}
              {gambar && (
                <div className="kegiatan-setting-form-group">
                  <label>Preview Gambar Baru</label>

                  <img
                    src={URL.createObjectURL(gambar)}
                    alt="Preview kegiatan"
                    style={{
                      width: "300px",
                      maxHeight: "200px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                    }}
                  />
                </div>
              )}

              {/* GAMBAR YANG TERSIMPAN */}
              {!gambar && gambarUrl && (
                <div className="kegiatan-setting-form-group">
                  <label>Gambar Saat Ini</label>

                  <img
                    src={gambarUrl}
                    alt="Gambar kegiatan saat ini"
                    style={{
                      width: "300px",
                      maxHeight: "200px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                    }}
                  />
                </div>
              )}

              {/* SIMPAN */}
              <button
                type="submit"
                className="kegiatan-setting-save-button"
                disabled={loading || saving}
              >
                {saving ? "Menyimpan..." : "Simpan"}
              </button>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}

export default KegiatanSetting;
