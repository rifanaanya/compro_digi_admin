import { useEffect, useState } from "react";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./PengaturanHalamanSoftwareIt.css";

function PengaturanHalamanSoftwareIt() {
  const [pageSetting, setPageSetting] = useState({
    title: "Software IT",
    description: "",
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

  useEffect(() => {
    const fetchPageSetting = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/page-settings/software-it",
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Gagal mengambil pengaturan halaman Software IT.",
          );
        }

        setPageSetting({
          title: data.data?.title || "Software IT",
          description: data.data?.description || "",
        });
      } catch (error) {
        console.error("❌ Error mengambil Page Setting Software IT:", error);

        showNotification(
          "error",
          error.message || "Gagal mengambil pengaturan halaman Software IT.",
        );
      }
    };

    fetchPageSetting();
  }, []);

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
        "http://localhost:5000/api/page-settings/software-it",
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
          data.message || "Gagal menyimpan pengaturan halaman Software IT.",
        );
      }

      setPageSetting({
        title: data.data?.title || pageSetting.title.trim(),
        description: data.data?.description || pageSetting.description.trim(),
      });

      playSuccessSound();

      showNotification(
        "success",
        "Pengaturan halaman Software IT berhasil disimpan.",
      );
    } catch (error) {
      console.error("❌ Error menyimpan Page Setting Software IT:", error);

      showNotification(
        "error",
        error.message || "Gagal menyimpan pengaturan halaman Software IT.",
      );
    }
  };

  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="admin-main">
        <Navbar />

        <main className="pengaturan-software-it-content">
          {notification.show && (
            <div
              className={`pengaturan-software-it-notification ${notification.type}`}
            >
              {notification.message}
            </div>
          )}

          <div className="pengaturan-software-it-title-card">
            <h1>Setting Halaman Software IT</h1>
          </div>

          <div className="pengaturan-software-it-card">
            <div className="pengaturan-software-it-card-header">
              <h2>Halaman Setting</h2>
            </div>

            <form
              className="pengaturan-software-it-form"
              onSubmit={handleSubmit}
            >
              <div className="pengaturan-software-it-form-group">
                <label htmlFor="software-it-title">Judul</label>

                <input
                  id="software-it-title"
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

              <div className="pengaturan-software-it-form-group">
                <label htmlFor="software-it-description">Deskripsi</label>

                <textarea
                  id="software-it-description"
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

              <div className="pengaturan-software-it-actions">
                <button type="submit" className="pengaturan-software-it-save">
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

export default PengaturanHalamanSoftwareIt;
