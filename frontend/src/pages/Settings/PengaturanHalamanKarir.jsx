import { useEffect, useState } from "react";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./PengaturanHalamanKarir.css";

function PengaturanHalamanKarir() {
  const [pageSetting, setPageSetting] = useState({
    title: "Karir",
    description:
      "PT. Digi Tekno Indonesia menyediakan Software IT (Website SIM (Sistem Informasi Manajemen), Landing Page, Company Profile, ERP), Mekanik & Engineering (Repair & Services), serta Pengadaan Sparepart dan Material Industri untuk mendukung kebutuhan bisnis.",
  });

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
          "http://localhost:5000/api/page-settings/karir",
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Gagal mengambil pengaturan halaman karir.",
          );
        }

        setPageSetting({
          title: data.data?.title || "Karir",
          description: data.data?.description || "",
        });
      } catch (error) {
        console.error("❌ Error mengambil Page Setting Karir:", error);

        showNotification(
          "error",
          error.message || "Gagal mengambil pengaturan halaman karir.",
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
        "http://localhost:5000/api/page-settings/karir",
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
          data.message || "Gagal menyimpan pengaturan halaman karir.",
        );
      }

      playSuccessSound();

      showNotification(
        "success",
        "Pengaturan halaman karir berhasil disimpan.",
      );
    } catch (error) {
      console.error("❌ Error menyimpan Page Setting Karir:", error);

      showNotification(
        "error",
        error.message || "Gagal menyimpan pengaturan halaman karir.",
      );
    }
  };

  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="admin-main">
        <Navbar />

        <main className="pengaturan-karir-content">
          {/* NOTIFICATION */}
          {notification.show && (
            <div
              className={`pengaturan-karir-notification ${notification.type}`}
            >
              {notification.message}
            </div>
          )}

          {/* PAGE TITLE */}
          <div className="pengaturan-karir-title-card">
            <h1>Setting Halaman Karir</h1>
          </div>

          {/* FORM CARD */}
          <div className="pengaturan-karir-card">
            <div className="pengaturan-karir-card-header">
              <h2>Halaman Setting</h2>
            </div>

            <form className="pengaturan-karir-form" onSubmit={handleSubmit}>
              {/* JUDUL */}
              <div className="pengaturan-karir-form-group">
                <label htmlFor="karir-title">Judul</label>

                <input
                  id="karir-title"
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
              <div className="pengaturan-karir-form-group">
                <label htmlFor="karir-description">Deskripsi</label>

                <textarea
                  id="karir-description"
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
              <div className="pengaturan-karir-actions">
                <button type="submit" className="pengaturan-karir-save">
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

export default PengaturanHalamanKarir;
