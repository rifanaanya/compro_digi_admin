import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./EditKegiatan.css";

function EditKegiatan() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [kegiatan, setKegiatan] = useState(null);

  const [deskripsi, setDeskripsi] = useState("");
  const [tipe, setTipe] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [foto, setFoto] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // ========================================
  // URL MEDIA
  // ========================================

  const getMediaUrl = (media) => {
    if (!media) return "";

    if (media.startsWith("http")) {
      return media;
    }

    return `http://localhost:5000${media}`;
  };

  // ========================================
  // AMBIL DATA KEGIATAN
  // ========================================

  useEffect(() => {
    const fetchKegiatan = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/postingan/kegiatan/${id}`,
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Data kegiatan tidak ditemukan");
        }

        const data = result.data;

        setKegiatan(data);
        setDeskripsi(data.deskripsi || "");
        setTipe(data.tipe || "");

        if (data.tanggal) {
          const date = new Date(data.tanggal);

          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");

          setTanggal(`${year}-${month}-${day}`);
        }
      } catch (error) {
        console.error("Error mengambil data kegiatan:", error);

        setError(error.message || "Data kegiatan tidak ditemukan");
      } finally {
        setLoading(false);
      }
    };

    fetchKegiatan();
  }, [id]);

  // ========================================
  // SIMPAN PERUBAHAN
  // ========================================

  const handleSimpan = async (e) => {
    e.preventDefault();

    if (!deskripsi || !tipe || !tanggal) {
      alert("Deskripsi, tipe, dan tanggal wajib diisi");
      return;
    }

    try {
      setSaving(true);

      const formData = new FormData();

      formData.append("deskripsi", deskripsi);
      formData.append("tipe", tipe);
      formData.append("tanggal", tanggal);

      if (foto) {
        formData.append("media", foto);
      }

      const response = await fetch(
        `http://localhost:5000/api/postingan/kegiatan/${id}`,
        {
          method: "PUT",
          body: formData,
        },
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Gagal memperbarui kegiatan");
      }

      alert("Kegiatan berhasil diperbarui");

      navigate("/kegiatan");
    } catch (error) {
      console.error("Error memperbarui kegiatan:", error);

      alert(error.message || "Gagal memperbarui kegiatan");
    } finally {
      setSaving(false);
    }
  };

  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return (
      <div className="edit-kegiatan-layout">
        <Sidebar />

        <div className="edit-kegiatan-main">
          <Navbar />

          <main className="edit-kegiatan-content">
            <section className="edit-kegiatan-header">
              <h1>Edit Kegiatan</h1>
            </section>

            <section className="edit-kegiatan-card">
              <p>Memuat data kegiatan...</p>
            </section>
          </main>
        </div>
      </div>
    );
  }

  // ========================================
  // DATA TIDAK DITEMUKAN
  // ========================================

  if (error || !kegiatan) {
    return (
      <div className="edit-kegiatan-layout">
        <Sidebar />

        <div className="edit-kegiatan-main">
          <Navbar />

          <main className="edit-kegiatan-content">
            <section className="edit-kegiatan-header">
              <h1>Edit Kegiatan</h1>
            </section>

            <section className="edit-kegiatan-card">
              <p>Data kegiatan tidak ditemukan.</p>

              <button
                type="button"
                onClick={() => navigate("/kegiatan")}
                className="edit-kegiatan-save-button"
              >
                Kembali
              </button>
            </section>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-kegiatan-layout">
      <Sidebar />

      <div className="edit-kegiatan-main">
        <Navbar />

        <main className="edit-kegiatan-content">
          {/* HEADER */}
          <section className="edit-kegiatan-header">
            <h1>Edit Kegiatan</h1>
          </section>

          {/* CARD */}
          <section className="edit-kegiatan-card">
            <div className="edit-kegiatan-card-title">Edit</div>

            <form className="edit-kegiatan-form" onSubmit={handleSimpan}>
              {/* DESKRIPSI */}
              <div className="edit-kegiatan-form-group">
                <label htmlFor="deskripsi">Deskripsi Kegiatan</label>

                <input
                  id="deskripsi"
                  type="text"
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  required
                />
              </div>

              {/* TIPE */}
              <div className="edit-kegiatan-form-group">
                <label htmlFor="tipe">Tipe</label>

                <select
                  id="tipe"
                  value={tipe}
                  onChange={(e) => {
                    setTipe(e.target.value);
                    setFoto(null);
                  }}
                  required
                >
                  <option value="">Pilih Tipe</option>
                  <option value="Gambar">Gambar</option>
                  <option value="Video">Video</option>
                </select>
              </div>

              {/* TANGGAL */}
              <div className="edit-kegiatan-form-group">
                <label htmlFor="tanggal">Tanggal Kegiatan</label>

                <input
                  id="tanggal"
                  type="date"
                  value={tanggal}
                  onChange={(e) => setTanggal(e.target.value)}
                  required
                />
              </div>

              {/* MEDIA */}
              <div className="edit-kegiatan-form-group">
                <label htmlFor="foto">Foto Kegiatan</label>

                <div className="edit-kegiatan-file-box">
                  <input
                    id="foto"
                    type="file"
                    accept={
                      tipe === "Video"
                        ? "video/*"
                        : tipe === "Gambar"
                          ? "image/*"
                          : "image/*,video/*"
                    }
                    onChange={(e) => setFoto(e.target.files[0])}
                  />

                  {/* MEDIA LAMA */}
                  {kegiatan.media && !foto && (
                    <div>
                      {kegiatan.tipe === "Video" ? (
                        <video
                          src={getMediaUrl(kegiatan.media)}
                          controls
                          preload="metadata"
                          className="edit-kegiatan-preview"
                        />
                      ) : (
                        <img
                          src={getMediaUrl(kegiatan.media)}
                          alt="Foto kegiatan"
                          className="edit-kegiatan-preview"
                        />
                      )}
                    </div>
                  )}

                  {/* MEDIA BARU */}
                  {foto && (
                    <div>
                      {tipe === "Video" ? (
                        <video
                          src={URL.createObjectURL(foto)}
                          controls
                          preload="metadata"
                          className="edit-kegiatan-preview"
                        />
                      ) : (
                        <img
                          src={URL.createObjectURL(foto)}
                          alt="Preview"
                          className="edit-kegiatan-preview"
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* SIMPAN */}
              <button
                type="submit"
                className="edit-kegiatan-save-button"
                disabled={saving}
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

export default EditKegiatan;
