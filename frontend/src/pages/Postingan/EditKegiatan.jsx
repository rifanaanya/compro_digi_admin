import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./EditKegiatan.css";

function EditKegiatan() {
  const navigate = useNavigate();
  const { id } = useParams();

  const kegiatanData = [
    {
      id: 1,
      deskripsi: "Buka Bersama PT. Digi Tekno Indonesia",
      tipe: "Gambar",
      tanggal: "2025-03-24",
      foto: "/kegiatan-1.jpg",
    },
    {
      id: 2,
      deskripsi: "Buka Bersama PT. Digi Tekno Indonesia",
      tipe: "Gambar",
      tanggal: "2025-03-24",
      foto: "/kegiatan-2.jpg",
    },
    {
      id: 3,
      deskripsi: "Buka Bersama PT. Digi Tekno Indonesia",
      tipe: "Gambar",
      tanggal: "2025-03-24",
      foto: "/kegiatan-3.jpg",
    },
  ];

  const kegiatan = kegiatanData.find((item) => item.id === Number(id));

  const [deskripsi, setDeskripsi] = useState(kegiatan?.deskripsi || "");

  const [tipe, setTipe] = useState(kegiatan?.tipe || "");

  const [tanggal, setTanggal] = useState(kegiatan?.tanggal || "");

  const [foto, setFoto] = useState(null);

  const handleSimpan = (e) => {
    e.preventDefault();

    console.log({
      id,
      deskripsi,
      tipe,
      tanggal,
      foto,
    });

    navigate("/kegiatan");
  };

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
                />
              </div>

              {/* TIPE */}
              <div className="edit-kegiatan-form-group">
                <label htmlFor="tipe">Tipe</label>

                <select
                  id="tipe"
                  value={tipe}
                  onChange={(e) => setTipe(e.target.value)}
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
                />
              </div>

              {/* FOTO */}
              <div className="edit-kegiatan-form-group">
                <label htmlFor="foto">Foto Kegiatan</label>

                <div className="edit-kegiatan-file-box">
                  <input
                    id="foto"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFoto(e.target.files[0])}
                  />

                  {kegiatan?.foto && !foto && (
                    <img
                      src={kegiatan.foto}
                      alt="Foto kegiatan"
                      className="edit-kegiatan-preview"
                    />
                  )}

                  {foto && (
                    <img
                      src={URL.createObjectURL(foto)}
                      alt="Preview"
                      className="edit-kegiatan-preview"
                    />
                  )}
                </div>
              </div>

              {/* SIMPAN */}
              <button type="submit" className="edit-kegiatan-save-button">
                Simpan
              </button>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}

export default EditKegiatan;
