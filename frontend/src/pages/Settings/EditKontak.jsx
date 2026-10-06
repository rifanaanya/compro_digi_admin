import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./EditKontak.css";

function EditKontak() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [notification, setNotification] = useState({
    show: false,
    type: "",
    message: "",
  });

  // =========================
  // NOTIFICATION
  // =========================
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

  // =========================
  // GET DATA KONTAK
  // =========================
  useEffect(() => {
    const fetchKontak = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/kontak/${id}`);

        const result = await response.json();

        if (!response.ok || !result.success) {
          showNotification(
            "error",
            result.message || "Gagal mengambil data kontak.",
          );
          return;
        }

        setName(result.data.namaPengaturan);
        setContent(result.data.isiPengaturan);
      } catch (error) {
        console.error("GET /api/kontak/:id:", error);

        showNotification("error", "Tidak dapat terhubung ke server.");
      } finally {
        setLoading(false);
      }
    };

    fetchKontak();
  }, [id]);

  // =========================
  // SIMPAN PERUBAHAN
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);

    try {
      const response = await fetch(`http://localhost:5000/api/kontak/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          namaPengaturan: name,
          isiPengaturan: content,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        showNotification(
          "error",
          result.message || "Gagal memperbarui data kontak.",
        );
        return;
      }

      showNotification("success", "Kontak berhasil diperbarui.");

      setTimeout(() => {
        navigate("/settings/kontak");
      }, 1000);
    } catch (error) {
      console.error("PUT /api/kontak/:id:", error);

      showNotification("error", "Tidak dapat terhubung ke server.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="edit-kontak-layout">
      {/* SIDEBAR */}
      <Sidebar />

      <div className="edit-kontak-main">
        {/* NAVBAR */}
        <Navbar />

        <main className="edit-kontak-content">
          {/* HEADER */}
          <section className="edit-kontak-header">
            <h1>Edit Kontak</h1>
          </section>

          {/* EDIT CARD */}
          <section className="edit-kontak-card">
            <div className="edit-kontak-card-title">Edit</div>

            {/* NOTIFICATION */}
            {notification.show && (
              <div className={`edit-kontak-notification ${notification.type}`}>
                {notification.message}
              </div>
            )}

            {loading ? (
              <div style={{ padding: "30px" }}>Memuat data...</div>
            ) : (
              <form className="edit-kontak-form" onSubmit={handleSubmit}>
                {/* NAMA PENGATURAN */}
                <div className="edit-kontak-form-group">
                  <label htmlFor="contact-name">Nama Pengaturan</label>

                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Masukkan Nama Pengaturan"
                    required
                  />
                </div>

                {/* ISI PENGATURAN */}
                <div className="edit-kontak-form-group">
                  <label htmlFor="contact-content">Isi Pengaturan</label>

                  <input
                    id="contact-content"
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Masukkan Isi Pengaturan"
                    required
                  />
                </div>

                {/* SIMPAN */}
                <button
                  type="submit"
                  className="edit-kontak-save-button"
                  disabled={saving}
                >
                  {saving ? "Menyimpan..." : "Simpan"}
                </button>
              </form>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

export default EditKontak;
