import { useEffect, useState } from "react";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./PengaturanHalamanSparepart.css";

function PengaturanHalamanSparepart() {
  const [pageSetting, setPageSetting] = useState({
    title: "Sparepart",
    description: "",
  });

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
  // AMBIL DATA PAGE SETTING
  // ==========================================

  useEffect(() => {
    const fetchPageSetting = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/page-settings/sparepart",
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Gagal mengambil pengaturan halaman Sparepart.",
          );
        }

        setPageSetting({
          title: data.data?.title || "Sparepart",
          description: data.data?.description || "",
        });
      } catch (error) {
        console.error("❌ Error mengambil Page Setting Sparepart:", error);

        showNotification(
          "error",
          error.message || "Gagal mengambil pengaturan halaman Sparepart.",
        );
      }
    };

    fetchPageSetting();
  }, []);

  // ==========================================
  // SIMPAN PAGE SETTING
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pageSetting.title.trim()) {
      showNotification("error", "Judul wajib diisi.");
      return;
    }

    if (!pageSetting.description.trim()) {
      showNotification("error", "Deskripsi wajib diisi.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/page-settings/sparepart",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: pageSetting.title.trim(),
            description: pageSetting.description.trim(),
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Gagal menyimpan pengaturan halaman Sparepart.",
        );
      }

      setPageSetting({
        title: data.data?.title || pageSetting.title.trim(),
        description: data.data?.description || pageSetting.description.trim(),
      });

      playSuccessSound();

      showNotification(
        "success",
        "Pengaturan halaman Sparepart berhasil disimpan.",
      );
    } catch (error) {
      console.error("❌ Error menyimpan Page Setting Sparepart:", error);

      showNotification(
        "error",
        error.message || "Gagal menyimpan pengaturan halaman Sparepart.",
      );
    }
  };

  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="admin-main">
        <Navbar />

        <main className="pengaturan-sparepart-content">
          {/* NOTIFICATION */}
          {notification.show && (
            <div
              className={`pengaturan-sparepart-notification ${notification.type}`}
            >
              {notification.message}
            </div>
          )}

          {/* PAGE TITLE */}
          <div className="pengaturan-sparepart-title-card">
            <h1>Setting Halaman Sparepart</h1>
          </div>

          {/* FORM CARD */}
          <div className="pengaturan-sparepart-card">
            <div className="pengaturan-sparepart-card-header">
              <h2>Halaman Setting</h2>
            </div>

            <form className="pengaturan-sparepart-form" onSubmit={handleSubmit}>
              {/* JUDUL */}
              <div className="pengaturan-sparepart-form-group">
                <label htmlFor="sparepart-title">Judul</label>

                <input
                  id="sparepart-title"
                  type="text"
                  placeholder="Masukkan Judul Halaman"
                  value={pageSetting.title}
                  onChange={(e) =>
                    setPageSetting({
                      ...pageSetting,
                      title: e.target.value,
                    })
                  }
                />
              </div>

              {/* DESKRIPSI */}
              <div className="pengaturan-sparepart-form-group">
                <label htmlFor="sparepart-description">Deskripsi</label>

                <textarea
                  id="sparepart-description"
                  placeholder="Masukkan Deskripsi Halaman"
                  value={pageSetting.description}
                  onChange={(e) =>
                    setPageSetting({
                      ...pageSetting,
                      description: e.target.value,
                    })
                  }
                  rows="6"
                />
              </div>

              {/* BUTTON */}
              <div className="pengaturan-sparepart-actions">
                <button type="submit" className="pengaturan-sparepart-save">
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default PengaturanHalamanSparepart;
