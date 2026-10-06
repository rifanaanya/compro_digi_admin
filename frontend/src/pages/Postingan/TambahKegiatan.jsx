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

  const handleSimpan = (e) => {
    e.preventDefault();

    console.log({
      deskripsi,
      tipe,
      tanggal,
      foto,
    });

    navigate("/kegiatan");
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
                  onChange={(e) => setTipe(e.target.value)}
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

              {/* FOTO */}
              <div className="tambah-kegiatan-form-group">
                <label htmlFor="foto">Foto Kegiatan</label>

                <input
                  id="foto"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFoto(e.target.files[0])}
                />
              </div>

              {/* SIMPAN */}
              <button type="submit" className="tambah-kegiatan-save-button">
                Simpan
              </button>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}

export default TambahKegiatan;
