import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./TambahSertifikasi.css";

function TambahSertifikasi() {
  const navigate = useNavigate();

  const [namaSertifikat, setNamaSertifikat] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [gambar, setGambar] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!namaSertifikat.trim()) {
      alert("Nama sertifikat wajib diisi!");
      return;
    }

    if (!deskripsi.trim()) {
      alert("Deskripsi wajib diisi!");
      return;
    }

    if (!gambar) {
      alert("Gambar sertifikat wajib diupload!");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("nama", namaSertifikat);
      formData.append("deskripsi", deskripsi);
      formData.append("gambar", gambar);

      const response = await fetch("http://localhost:5000/api/sertifikasi", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Gagal menambahkan sertifikasi.");
      }

      alert("Sertifikat berhasil ditambahkan!");

      navigate("/sertifikasi");
    } catch (error) {
      console.error("❌ Error menambahkan Sertifikasi:", error);

      alert(error.message || "Gagal menambahkan sertifikasi.");
    }
  };

  return (
    <div className="tambah-sertifikat-layout">
      {/* SIDEBAR */}
      <Sidebar />

      <div className="tambah-sertifikat-main">
        {/* NAVBAR */}
        <Navbar />

        <main className="tambah-sertifikat-content">
          {/* HEADER */}
          <section className="tambah-sertifikat-header">
            <h1>Tambah Sertifikat</h1>
          </section>

          {/* CARD */}
          <section className="tambah-sertifikat-card">
            <div className="tambah-sertifikat-card-title">Tambah</div>

            <form
              className="tambah-sertifikat-card-content"
              onSubmit={handleSubmit}
            >
              {/* NAMA SERTIFIKAT */}
              <div className="tambah-sertifikat-form-group">
                <label htmlFor="namaSertifikat">Nama Sertifikat</label>

                <input
                  id="namaSertifikat"
                  type="text"
                  placeholder="Masukkan Nama Sertifikat"
                  value={namaSertifikat}
                  onChange={(e) => setNamaSertifikat(e.target.value)}
                />
              </div>

              {/* DESKRIPSI */}
              <div className="tambah-sertifikat-form-group">
                <label htmlFor="deskripsi">Deskripsi</label>

                <textarea
                  id="deskripsi"
                  placeholder="Masukkan Deskripsi"
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                />
              </div>

              {/* UPLOAD GAMBAR */}
              <div className="tambah-sertifikat-form-group">
                <label htmlFor="gambarSertifikat">
                  Upload Gambar Sertifikat
                </label>

                <input
                  id="gambarSertifikat"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setGambar(e.target.files[0])}
                />
              </div>

              {/* SIMPAN */}
              <button type="submit" className="tambah-sertifikat-save-button">
                Simpan
              </button>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}

export default TambahSertifikasi;
