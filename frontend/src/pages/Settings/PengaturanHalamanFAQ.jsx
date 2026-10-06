import { useEffect, useState } from "react";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./PengaturanHalamanFAQ.css";

function PengaturanHalamanFAQ() {
  const [title, setTitle] = useState("FAQ");

  const [description, setDescription] = useState(
    "PT. Digi Tekno Indonesia menyediakan Software IT (Website SIM (Sistem Informasi Manajemen), Landing Page, Company Profile, ERP), Mekanik & Engineering (Repair & Services), serta Pengadaan Sparepart dan Material Industri untuk mendukung kebutuhan bisnis.",
  );

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
  // AMBIL DATA PAGE SETTING FAQ
  // ==========================================

  useEffect(() => {
    const fetchPageSetting = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/page-settings/faq",
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Gagal mengambil pengaturan halaman FAQ.",
          );
        }

        setTitle(data.data.title);
        setDescription(data.data.description);
      } catch (error) {
        console.error("❌ Error mengambil Page Setting FAQ:", error);

        showNotification(
          "error",
          error.message || "Gagal mengambil pengaturan halaman FAQ.",
        );
      }
    };

    fetchPageSetting();
  }, []);

  // ==========================================
  // SIMPAN PAGE SETTING FAQ
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
      const response = await fetch(
        "http://localhost:5000/api/page-settings/faq",
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
          data.message || "Gagal memperbarui pengaturan halaman FAQ.",
        );
      }

      setTitle(data.data.title);
      setDescription(data.data.description);

      // SOUND
      playSuccessSound();

      // NOTIFICATION SUCCESS
      showNotification("success", "Pengaturan halaman FAQ berhasil disimpan.");
    } catch (error) {
      console.error("❌ Error menyimpan Page Setting FAQ:", error);

      showNotification(
        "error",
        error.message || "Gagal menyimpan pengaturan halaman FAQ.",
      );
    }
  };

  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="admin-main">
        <Navbar />

        <main className="pengaturan-faq-content">
          {/* NOTIFICATION */}
          {notification.show && (
            <div className={`pengaturan-faq-notification ${notification.type}`}>
              {notification.message}
            </div>
          )}

          {/* PAGE TITLE */}
          <div className="pengaturan-faq-title-card">
            <h1>Setting Halaman FAQ</h1>
          </div>

          {/* FORM CARD */}
          <div className="pengaturan-faq-card">
            <div className="pengaturan-faq-card-header">
              <h2>Halaman Setting</h2>
            </div>

            <form className="pengaturan-faq-form" onSubmit={handleSubmit}>
              {/* JUDUL */}
              <div className="pengaturan-faq-form-group">
                <label htmlFor="faq-title">Judul</label>

                <input
                  id="faq-title"
                  type="text"
                  placeholder="Masukkan Judul Halaman"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* DESKRIPSI */}
              <div className="pengaturan-faq-form-group">
                <label htmlFor="faq-description">Deskripsi</label>

                <textarea
                  id="faq-description"
                  placeholder="Masukkan Deskripsi Halaman"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="6"
                />
              </div>

              {/* BUTTON */}
              <div className="pengaturan-faq-actions">
                <button type="submit" className="pengaturan-faq-save">
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

export default PengaturanHalamanFAQ;
