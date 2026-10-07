import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./TambahArtikel.css";

function TambahArtikel() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    judul: "",
    ringkasan: "",
    isi: "",
    gambar: null,
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      setFormData((prev) => ({
        ...prev,
        gambar: null,
      }));

      setPreview(null);
      return;
    }

    setFormData((prev) => ({
      ...prev,
      gambar: file,
    }));

    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.judul.trim()) {
      alert("Judul artikel wajib diisi.");
      return;
    }

    if (!formData.ringkasan.trim()) {
      alert("Ringkasan artikel wajib diisi.");
      return;
    }

    if (!formData.isi.trim()) {
      alert("Isi artikel wajib diisi.");
      return;
    }

    if (!formData.gambar) {
      alert("Gambar artikel wajib diupload.");
      return;
    }

    try {
      const data = new FormData();

      data.append("judul", formData.judul.trim());
      data.append("ringkasan", formData.ringkasan.trim());
      data.append("isi", formData.isi.trim());
      data.append("gambar", formData.gambar);

      const response = await fetch("http://localhost:5000/api/artikel", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Gagal menambahkan artikel");
      }

      alert("Artikel berhasil ditambahkan.");

      navigate("/artikel");
    } catch (error) {
      console.error("❌ Gagal menambahkan artikel:", error);

      alert(error.message || "Gagal menambahkan artikel.");
    }
  };

  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="admin-main">
        <Navbar />

        <main className="tambah-artikel-content">
          {/* PAGE TITLE */}
          <div className="tambah-artikel-title-card">
            <h1>Tambah Artikel</h1>
          </div>

          {/* FORM CARD */}
          <div className="tambah-artikel-card">
            <div className="tambah-artikel-card-header">
              <h2>Tambah</h2>
            </div>

            <form className="tambah-artikel-form" onSubmit={handleSubmit}>
              {/* JUDUL */}
              <div className="tambah-artikel-form-group">
                <label htmlFor="judul">Judul Artikel</label>

                <input
                  id="judul"
                  name="judul"
                  type="text"
                  placeholder="Masukkan Judul Artikel"
                  value={formData.judul}
                  onChange={handleChange}
                />
              </div>

              {/* RINGKASAN */}
              <div className="tambah-artikel-form-group">
                <label htmlFor="ringkasan">Ringkasan</label>

                <textarea
                  id="ringkasan"
                  name="ringkasan"
                  placeholder="Masukkan Ringkasan"
                  value={formData.ringkasan}
                  onChange={handleChange}
                  rows="3"
                />
              </div>

              {/* ISI ARTIKEL */}
              <div className="tambah-artikel-form-group">
                <label htmlFor="isi">Isi Artikel</label>

                <textarea
                  id="isi"
                  name="isi"
                  placeholder="Masukkan Isi Artikel"
                  value={formData.isi}
                  onChange={handleChange}
                  rows="6"
                />
              </div>

              {/* UPLOAD GAMBAR */}
              <div className="tambah-artikel-form-group">
                <label htmlFor="gambar">Upload Gambar</label>

                <input
                  id="gambar"
                  name="gambar"
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  onChange={handleImageChange}
                />

                {preview && (
                  <div className="tambah-artikel-preview">
                    <img src={preview} alt="Preview artikel" />
                  </div>
                )}
              </div>

              {/* BUTTON */}
              <div className="tambah-artikel-actions">
                <button type="submit" className="tambah-artikel-save">
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

export default TambahArtikel;
