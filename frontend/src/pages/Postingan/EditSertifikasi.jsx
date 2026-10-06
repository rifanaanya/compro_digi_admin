import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./EditSertifikasi.css";

function EditSertifikasi() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [namaSertifikat, setNamaSertifikat] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [gambar, setGambar] = useState(null);

  const [previewGambar, setPreviewGambar] = useState("");
  const [namaFile, setNamaFile] = useState("");
  const [loading, setLoading] = useState(true);

  // ==============================
  // AMBIL DATA SERTIFIKAT
  // ==============================
  useEffect(() => {
    const fetchSertifikat = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/sertifikasi/${id}`,
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.message || "Gagal mengambil data sertifikasi.",
          );
        }

        const data = result.data;

        setNamaSertifikat(data.nama);
        setDeskripsi(data.deskripsi);

        setPreviewGambar(`http://localhost:5000${data.gambar}`);

        setNamaFile(data.gambar.split("/").pop() || "Gambar sertifikat");
      } catch (error) {
        console.error("❌ Error mengambil Sertifikasi:", error);

        alert(error.message || "Gagal mengambil data sertifikasi.");

        navigate("/sertifikasi");
      } finally {
        setLoading(false);
      }
    };

    fetchSertifikat();
  }, [id, navigate]);

  // ==============================
  // UPLOAD GAMBAR BARU
  // ==============================
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setGambar(file);
    setNamaFile(file.name);

    const imageUrl = URL.createObjectURL(file);
    setPreviewGambar(imageUrl);
  };

  // ==============================
  // SIMPAN PERUBAHAN
  // ==============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!namaSertifikat.trim()) {
      alert("Nama sertifikat wajib diisi!");
      return;
    }

    if (!deskripsi.trim()) {
      alert("Deskripsi sertifikat wajib diisi!");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("nama", namaSertifikat);
      formData.append("deskripsi", deskripsi);

      // Kalau user memilih gambar baru
      if (gambar) {
        formData.append("gambar", gambar);
      }

      const response = await fetch(
        `http://localhost:5000/api/sertifikasi/${id}`,
        {
          method: "PUT",
          body: formData,
        },
      );

      const result = await response.json();

      console.log("STATUS:", response.status);
      console.log("HASIL UPDATE:", result);

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Gagal memperbarui sertifikasi.");
      }

      alert("Sertifikat berhasil diperbarui!");

      navigate("/sertifikasi");
    } catch (error) {
      console.error("❌ Error memperbarui Sertifikasi:", error);

      alert(error.message || "Gagal memperbarui sertifikasi.");
    }
  };

  // ==============================
  // LOADING
  // ==============================
  if (loading) {
    return (
      <div className="edit-sertifikat-layout">
        <Sidebar />

        <div className="edit-sertifikat-main">
          <Navbar />

          <main className="edit-sertifikat-content">
            <section className="edit-sertifikat-header">
              <h1>Edit Sertifikat</h1>
            </section>

            <section className="edit-sertifikat-card">
              <div className="edit-sertifikat-card-title">Edit</div>

              <div className="edit-sertifikat-card-content">
                Memuat data sertifikat...
              </div>
            </section>
          </main>
        </div>
      </div>
    );
  }

  // ==============================
  // HALAMAN EDIT
  // ==============================
  return (
    <div className="edit-sertifikat-layout">
      {/* SIDEBAR */}
      <Sidebar />

      <div className="edit-sertifikat-main">
        {/* NAVBAR */}
        <Navbar />

        <main className="edit-sertifikat-content">
          {/* HEADER */}
          <section className="edit-sertifikat-header">
            <h1>Edit Sertifikat</h1>
          </section>

          {/* CARD */}
          <section className="edit-sertifikat-card">
            <div className="edit-sertifikat-card-title">Edit</div>

            <form
              className="edit-sertifikat-card-content"
              onSubmit={handleSubmit}
            >
              {/* NAMA SERTIFIKAT */}
              <div className="edit-sertifikat-form-group">
                <label htmlFor="namaSertifikat">Nama Sertifikat</label>

                <input
                  id="namaSertifikat"
                  type="text"
                  value={namaSertifikat}
                  onChange={(e) => setNamaSertifikat(e.target.value)}
                />
              </div>

              {/* DESKRIPSI */}
              <div className="edit-sertifikat-form-group">
                <label htmlFor="deskripsiSertifikat">
                  Deskripsi Sertifikat
                </label>

                <textarea
                  id="deskripsiSertifikat"
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                />
              </div>

              {/* UPLOAD GAMBAR */}
              <div className="edit-sertifikat-form-group">
                <label htmlFor="gambarSertifikat">Gambar Sertifikat</label>

                <div className="edit-sertifikat-file-box">
                  {/* INPUT FILE */}
                  <input
                    id="gambarSertifikat"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />

                  {/* PREVIEW GAMBAR */}
                  <div className="edit-sertifikat-preview">
                    {previewGambar && (
                      <img src={previewGambar} alt="Sertifikat" />
                    )}

                    <span>{namaFile}</span>
                  </div>
                </div>
              </div>

              {/* SIMPAN */}
              <button type="submit" className="edit-sertifikat-save-button">
                Simpan
              </button>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}

export default EditSertifikasi;
