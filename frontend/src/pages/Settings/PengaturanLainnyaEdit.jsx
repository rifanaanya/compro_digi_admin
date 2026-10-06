import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import "./PengaturanLainnyaEdit.css";

function PengaturanLainnyaEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [namaPengaturan, setNamaPengaturan] = useState("");
  const [gambar, setGambar] = useState(null);
  const [gambarLama, setGambarLama] = useState(null);
  const [previewGambar, setPreviewGambar] = useState(null);

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
  // SOUND SUCCESS
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
  // GET DETAIL PENGATURAN
  // ==========================================

  useEffect(() => {
    const fetchPengaturan = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `http://localhost:5000/api/pengaturan-lainnya/${id}`,
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Gagal mengambil data pengaturan.");
        }

        setNamaPengaturan(data.data?.nama || "");
        setGambarLama(data.data?.gambar || null);
      } catch (error) {
        console.error("❌ Error mengambil Pengaturan Lainnya:", error);

        showNotification(
          "error",
          error.message || "Gagal mengambil data pengaturan.",
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPengaturan();
    }
  }, [id]);

  // ==========================================
  // HANDLE PILIH GAMBAR
  // ==========================================

  const handleGambarChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    setGambar(file);

    const previewUrl = URL.createObjectURL(file);

    setPreviewGambar(previewUrl);
  };

  // ==========================================
  // SUBMIT UPDATE
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!namaPengaturan.trim()) {
      showNotification("error", "Nama Pengaturan wajib diisi.");
      return;
    }

    try {
      setSaving(true);

      const formData = new FormData();

      formData.append("nama", namaPengaturan);

      // Hanya kirim gambar kalau user memilih gambar baru
      if (gambar) {
        formData.append("gambar", gambar);
      }

      const response = await fetch(
        `http://localhost:5000/api/pengaturan-lainnya/${id}`,
        {
          method: "PUT",
          body: formData,
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal memperbarui pengaturan.");
      }

      // Update gambar lama dari response API
      setGambarLama(data.data?.gambar || null);

      // Reset file baru
      setGambar(null);

      if (previewGambar) {
        URL.revokeObjectURL(previewGambar);
      }

      setPreviewGambar(null);

      // Notification + sound
      playSuccessSound();

      showNotification("success", "Pengaturan berhasil diperbarui!");

      // Kembali ke list setelah notification tampil
      setTimeout(() => {
        navigate("/settings/pengaturan-lainnya");
      }, 3000);
    } catch (error) {
      console.error("❌ Error memperbarui Pengaturan Lainnya:", error);

      showNotification(
        "error",
        error.message || "Gagal memperbarui pengaturan.",
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

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="pengaturan-lainnya-edit-layout">
        <Sidebar />

        <div className="pengaturan-lainnya-edit-main">
          <Navbar />

          <main className="pengaturan-lainnya-edit-content">
            <section className="pengaturan-lainnya-edit-header">
              <h1>Edit Pengaturan Lainnya</h1>
            </section>

            <section className="pengaturan-lainnya-edit-card">
              <div className="pengaturan-lainnya-edit-card-title">Edit</div>

              <div className="pengaturan-lainnya-edit-card-content">
                Memuat data...
              </div>
            </section>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="pengaturan-lainnya-edit-layout">
      <Sidebar />

      <div className="pengaturan-lainnya-edit-main">
        <Navbar />

        <main className="pengaturan-lainnya-edit-content">
          {/* NOTIFICATION */}
          {notification.show && (
            <div
              className={`pengaturan-lainnya-edit-notification ${notification.type}`}
            >
              {notification.message}
            </div>
          )}

          {/* HEADER */}
          <section className="pengaturan-lainnya-edit-header">
            <h1>Edit Pengaturan Lainnya</h1>
          </section>

          {/* CARD */}
          <section className="pengaturan-lainnya-edit-card">
            <div className="pengaturan-lainnya-edit-card-title">Edit</div>

            <div className="pengaturan-lainnya-edit-card-content">
              <form onSubmit={handleSubmit}>
                {/* NAMA PENGATURAN */}
                <div className="pengaturan-lainnya-edit-form-group">
                  <label htmlFor="namaPengaturan">Nama Pengaturan</label>

                  <input
                    id="namaPengaturan"
                    type="text"
                    value={namaPengaturan}
                    onChange={(e) => setNamaPengaturan(e.target.value)}
                    placeholder="Masukkan Nama Pengaturan"
                    disabled={saving}
                  />
                </div>

                {/* UPLOAD GAMBAR */}
                <div className="pengaturan-lainnya-edit-form-group">
                  <label htmlFor="gambar">Upload Gambar Isi Pengaturan</label>

                  <div className="pengaturan-lainnya-edit-file-wrapper">
                    <input
                      id="gambar"
                      type="file"
                      accept="image/png,image/jpeg,image/jpg,image/webp"
                      onChange={handleGambarChange}
                      disabled={saving}
                    />

                    {/* PREVIEW */}
                    {(previewGambar || gambarDatabase) && (
                      <div className="pengaturan-lainnya-edit-preview">
                        <img
                          src={previewGambar || gambarDatabase}
                          alt={namaPengaturan}
                        />

                        <span>
                          {gambar?.name ||
                            gambarLama?.split("/").pop() ||
                            "Gambar saat ini"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* SIMPAN */}
                <button
                  type="submit"
                  className="pengaturan-lainnya-edit-save-button"
                  disabled={saving}
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

export default PengaturanLainnyaEdit;
