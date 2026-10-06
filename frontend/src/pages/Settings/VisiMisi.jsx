import { useEffect, useState } from "react";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./VisiMisi.css";

function VisiMisi() {
  const [visi, setVisi] = useState("");

  const [misi, setMisi] = useState(["", "", "", "", ""]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ==========================================
  // NOTIFIKASI
  // ==========================================

  const [notification, setNotification] = useState({
    show: false,
    type: "",
    message: "",
  });

  // ==========================================
  // TAMPILKAN NOTIFIKASI
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
  // GET DATA DARI DATABASE
  // ==========================================

  useEffect(() => {
    const fetchVisiMisi = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/visi-misi");

        const data = await response.json();

        // Belum ada data
        if (response.status === 404) {
          return;
        }

        if (!response.ok) {
          throw new Error(data.message || "Gagal mengambil data Visi & Misi");
        }

        setVisi(data.data?.visi || "");

        setMisi(
          data.data?.misi?.length > 0
            ? data.data.misi.map((item) => item.isi)
            : [""],
        );
      } catch (error) {
        console.error("❌ Error mengambil Visi & Misi:", error);

        showNotification("error", "Gagal mengambil data Visi & Misi");
      } finally {
        setLoading(false);
      }
    };

    fetchVisiMisi();
  }, []);

  // ==========================================
  // TAMBAH MISI
  // ==========================================

  const handleTambahMisi = () => {
    setMisi((prevMisi) => [...prevMisi, ""]);
  };

  // ==========================================
  // UBAH MISI
  // ==========================================

  const handleMisiChange = (index, value) => {
    setMisi((prevMisi) => {
      const updatedMisi = [...prevMisi];

      updatedMisi[index] = value;

      return updatedMisi;
    });
  };

  // ==========================================
  // DELETE MISI
  // ==========================================

  const handleDeleteMisi = (index) => {
    setMisi((prevMisi) => prevMisi.filter((_, i) => i !== index));
  };

  // ==========================================
  // SIMPAN KE DATABASE
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!visi.trim()) {
      showNotification("error", "Visi Perusahaan wajib diisi.");

      return;
    }

    // Buang misi yang kosong
    const misiValid = misi.filter((item) => item.trim() !== "");

    if (misiValid.length === 0) {
      showNotification("error", "Minimal satu misi harus diisi.");

      return;
    }

    try {
      setSaving(true);

      const response = await fetch("http://localhost:5000/api/visi-misi", {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          visi,
          misi: misiValid,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal menyimpan data Visi & Misi");
      }

      // Update data dari response backend
      setVisi(data.data?.visi || "");

      setMisi(data.data?.misi?.map((item) => item.isi) || []);

      showNotification("success", "Data Visi & Misi berhasil disimpan!");
    } catch (error) {
      console.error("❌ Error menyimpan Visi & Misi:", error);

      showNotification(
        "error",
        error.message || "Gagal menyimpan data Visi & Misi.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="visi-misi-layout">
      <Sidebar />

      <div className="visi-misi-main">
        <Navbar />

        <main className="visi-misi-content">
          {/* NOTIFICATION */}
          {notification.show && (
            <div className={`visi-misi-notification ${notification.type}`}>
              {notification.message}
            </div>
          )}

          {/* HEADER */}
          <section className="visi-misi-header">
            <h1>Home - Visi Misi Setting</h1>
          </section>

          {/* CARD */}
          <section className="visi-misi-card">
            <div className="visi-misi-card-title">Home - Visi Misi Setting</div>

            <div className="visi-misi-card-content">
              <form onSubmit={handleSubmit}>
                {/* VISI */}
                <div className="visi-misi-form-group">
                  <label htmlFor="visi">Visi Perusahaan</label>

                  <textarea
                    id="visi"
                    value={visi}
                    onChange={(e) => setVisi(e.target.value)}
                    placeholder="Masukkan Visi Perusahaan"
                    disabled={loading || saving}
                  />
                </div>

                {/* MISI */}
                <div className="visi-misi-form-group misi-section">
                  <label>Misi Perusahaan</label>

                  <button
                    type="button"
                    className="visi-misi-add-button"
                    onClick={handleTambahMisi}
                    disabled={loading || saving}
                  >
                    Tambah Misi
                  </button>

                  <div className="visi-misi-list">
                    {misi.map((item, index) => (
                      <div className="visi-misi-item" key={index}>
                        <input
                          type="text"
                          value={item}
                          onChange={(e) =>
                            handleMisiChange(index, e.target.value)
                          }
                          placeholder="Masukkan Misi"
                          disabled={loading || saving}
                        />

                        <button
                          type="button"
                          className="visi-misi-delete-button"
                          onClick={() => handleDeleteMisi(index)}
                          disabled={loading || saving}
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SIMPAN */}
                <button
                  type="submit"
                  className="visi-misi-save-button"
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

export default VisiMisi;
