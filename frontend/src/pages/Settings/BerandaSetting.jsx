import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import "./BerandaSetting.css";

function BerandaSetting() {
  const [slogan, setSlogan] = useState("");
  const [description, setDescription] = useState("");
  const [kategori, setKategori] = useState([]);

  const [deleteKategoriIndex, setDeleteKategoriIndex] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [notification, setNotification] = useState({
    show: false,
    type: "",
    message: "",
  });

  // ================================
  // GET DATA BERANDA
  // ================================

  useEffect(() => {
    const fetchBeranda = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/home");

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Gagal mengambil data Beranda");
        }

        setSlogan(data.data.slogan || "");
        setDescription(data.data.description || "");
        setKategori(data.data.categories?.map((item) => item.name) || []);
      } catch (error) {
        console.error("❌ Error mengambil data Beranda:", error);

        showNotification("error", "Gagal mengambil data Beranda.");
      } finally {
        setLoading(false);
      }
    };

    fetchBeranda();
  }, []);

  // ================================
  // KATEGORI
  // ================================

  const handleKategoriChange = (index, value) => {
    const updatedKategori = [...kategori];

    updatedKategori[index] = value;

    setKategori(updatedKategori);
  };

  const tambahKategori = () => {
    if (kategori.length < 6) {
      setKategori([...kategori, ""]);
    }
  };

  // ================================
  // DELETE KATEGORI
  // ================================

  const handleOpenDelete = (index) => {
    setDeleteKategoriIndex(index);
    setDeleteModalOpen(true);
  };

  const handleCloseDelete = () => {
    setDeleteKategoriIndex(null);
    setDeleteModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (deleteKategoriIndex === null) return;

    const updatedKategori = kategori.filter(
      (_, index) => index !== deleteKategoriIndex,
    );

    setKategori(updatedKategori);
    setDeleteKategoriIndex(null);
    setDeleteModalOpen(false);
  };

  // ================================
  // SIMPAN
  // ================================

  const handleSimpan = async () => {
    try {
      setSaving(true);

      const response = await fetch("http://localhost:5000/api/home", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slogan: slogan.trim(),
          description: description.trim(),
          categories: kategori
            .map((item) => item.trim())
            .filter((item) => item !== "")
            .map((name) => ({
              name,
            })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal menyimpan data Beranda");
      }

      // Sinkronkan kembali dengan response backend
      setSlogan(data.data.slogan || "");

      setDescription(data.data.description || "");

      setKategori(data.data.categories?.map((item) => item.name) || []);

      // SOUND NOTIFICATION
      playSuccessSound();

      // NOTIFICATION
      showNotification("success", "Data Beranda berhasil disimpan!");
    } catch (error) {
      console.error("❌ Error menyimpan data Beranda:", error);

      showNotification("error", "Gagal menyimpan data Beranda.");
    } finally {
      setSaving(false);
    }
  };

  // ================================
  // NOTIFICATION
  // ================================

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

  // ================================
  // SOUND TING
  // ================================

  const playSuccessSound = () => {
    const audio = new Audio("/sounds/notification.mp3");

    audio.volume = 0.5;

    audio.currentTime = 0;

    audio.play().catch((error) => {
      console.warn("⚠️ Sound notification tidak dapat diputar:", error);
    });
  };

  // ================================
  // LOADING
  // ================================

  if (loading) {
    return (
      <div className="beranda-setting-layout">
        <Sidebar />

        <div className="beranda-setting-main">
          <Navbar />

          <main className="beranda-setting-content">
            <section className="beranda-setting-header">
              <h1>Beranda Setting</h1>
            </section>

            <section className="beranda-setting-card">
              <div className="beranda-setting-card-title">Beranda Setting</div>

              <div className="beranda-setting-form">
                <p>Memuat data Beranda...</p>
              </div>
            </section>
          </main>
        </div>
      </div>
    );
  }

  // ================================
  // MAIN
  // ================================

  return (
    <div className="beranda-setting-layout">
      {/* SIDEBAR */}
      <Sidebar />

      <div className="beranda-setting-main">
        {/* NAVBAR */}
        <Navbar />

        <main className="beranda-setting-content">
          {/* NOTIFICATION */}
          {notification.show && (
            <div className={`beranda-notification ${notification.type}`}>
              {notification.message}
            </div>
          )}

          {/* HEADER */}
          <section className="beranda-setting-header">
            <h1>Beranda Setting</h1>
          </section>

          {/* CARD */}
          <section className="beranda-setting-card">
            {/* CARD TITLE */}
            <div className="beranda-setting-card-title">Beranda Setting</div>

            {/* FORM */}
            <div className="beranda-setting-form">
              {/* ================================
                  SLOGAN
              ================================ */}

              <div className="beranda-form-group">
                <label>Slogan Perusahaan</label>

                <textarea
                  placeholder="Masukkan Slogan Perusahaan"
                  value={slogan}
                  onChange={(e) => setSlogan(e.target.value)}
                  rows={3}
                />
              </div>

              {/* ================================
                  DESKRIPSI
              ================================ */}

              <div className="beranda-form-group">
                <label>Deskripsi Singkat Perusahaan</label>

                <textarea
                  placeholder="Masukkan Deskripsi Singkat Perusahaan"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* ================================
                  KATEGORI
              ================================ */}

              <div className="beranda-form-group kategori-group">
                <label>Kategori</label>

                {/* TOMBOL TAMBAH KATEGORI */}
                <button
                  type="button"
                  className="tambah-kategori-button"
                  onClick={tambahKategori}
                  disabled={kategori.length >= 6}
                >
                  Tambah Kategori
                </button>

                {/* LIST KATEGORI */}
                <div className="kategori-list">
                  {kategori.map((item, index) => (
                    <div className="kategori-row" key={index}>
                      <input
                        type="text"
                        value={item}
                        placeholder="Masukkan Kategori"
                        onChange={(e) =>
                          handleKategoriChange(index, e.target.value)
                        }
                      />

                      <button
                        type="button"
                        className="kategori-delete-button"
                        onClick={() => handleOpenDelete(index)}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* ================================
                  SIMPAN
              ================================ */}

              <button
                type="button"
                className="beranda-save-button"
                onClick={handleSimpan}
                disabled={saving}
              >
                {saving ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </section>
        </main>

        {/* DELETE MODAL */}
        {deleteModalOpen && (
          <div className="delete-modal-overlay">
            <div className="delete-modal">
              <div className="delete-modal-header">
                <h2>Hapus</h2>

                <button
                  type="button"
                  className="delete-modal-close"
                  onClick={handleCloseDelete}
                >
                  ×
                </button>
              </div>

              <div className="delete-modal-body">
                <h3>Apakah anda yakin akan menghapus data?</h3>

                <p>Jika data dihapus, maka akan hilang secara permanen</p>

                <div className="delete-modal-actions">
                  <button
                    type="button"
                    className="delete-modal-back"
                    onClick={handleCloseDelete}
                  >
                    Kembali
                  </button>

                  <button
                    type="button"
                    className="delete-modal-confirm"
                    onClick={handleConfirmDelete}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FOOTER */}
        <footer className="beranda-setting-footer">
          <span>Copyright © 2025 PT Digi Tekno Indonesia</span>

          <span>Vers</span>
        </footer>
      </div>
    </div>
  );
}

export default BerandaSetting;
