import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./TambahKegiatan.css";

function TambahKegiatan() {
  const navigate = useNavigate();

  const [deskripsi, setDeskripsi] = useState("");
  const [tipe, setTipe] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [foto, setFoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSimpan = async (e) => {
    e.preventDefault();

    if (!deskripsi || !tipe || !tanggal || !foto) {
      alert("Semua data kegiatan wajib diisi");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("deskripsi", deskripsi);
      formData.append("tipe", tipe);
      formData.append("tanggal", tanggal);
      formData.append("media", foto);

      const response = await fetch(
        "http://localhost:5000/api/postingan/kegiatan",
        {
          method: "POST",
          body: formData,
        },
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Gagal menambahkan kegiatan");
      }

      alert("Kegiatan berhasil ditambahkan");

      navigate("/kegiatan");
    } catch (error) {
      console.error("Error menambahkan kegiatan:", error);

      alert(error.message || "Gagal menambahkan kegiatan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tambah-kegiatan-layout">
      <Sidebar />

      <div className="tambah-kegiatan-main">
        <Navbar />

        <main className="tambah-kegiatan-content">
          {/* HEADER */}
          <section className="tambah-kegiatan-header">
            <h1>Tambah Kegiatan</h1>
          </section>

          {/* CARD */}
          <section className="tambah-kegiatan-card">
            <div className="tambah-kegiatan-card-title">Tambah</div>

            <form
              className="tambah-kegiatan-card-content"
              onSubmit={handleSimpan}
            >
              {/* DESKRIPSI */}
              <div className="tambah-kegiatan-form-group">
                <label htmlFor="deskripsi">Deskripsi Kegiatan</label>

                <input
                  id="deskripsi"
                  type="text"
                  placeholder="Masukkan Nama Perusahaan Mitra"
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  required
                />
              </div>

              {/* TIPE */}
              <div className="tambah-kegiatan-form-group">
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
              <div className="tambah-kegiatan-form-group">
                <label htmlFor="tanggal">Tanggal Kegiatan</label>

                <input
                  id="tanggal"
                  type="date"
                  value={tanggal}
                  onChange={(e) => setTanggal(e.target.value)}
                  required
                />
              </div>

              {/* FOTO / MEDIA */}
              <div className="tambah-kegiatan-form-group">
                <label htmlFor="foto">Foto Kegiatan</label>

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
                  required
                />
              </div>

              {/* SIMPAN */}
              <button
                type="submit"
                className="tambah-kegiatan-save-button"
                disabled={loading}
              >
                {loading ? "Menyimpan..." : "Simpan"}
              </button>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}

export default TambahKegiatan;
