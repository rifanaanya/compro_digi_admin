import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./MitraTambah.css";

function MitraTambah() {
  const navigate = useNavigate();

  const [namaPerusahaan, setNamaPerusahaan] = useState("");
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");

  const handleLogoChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Tambah Mitra:", {
      namaPerusahaan,
      logoFile,
    });

    // Nanti disambungkan ke database

    navigate("/settings/mitra");
  };

  return (
    <div className="mitra-tambah-layout">
      <Sidebar />

      <div className="mitra-tambah-main">
        <Navbar />

        <main className="mitra-tambah-content">
          {/* HEADER */}
          <section className="mitra-tambah-header">
            <h1>Tambah Mitra</h1>
          </section>

          {/* CARD */}
          <section className="mitra-tambah-card">
            <div className="mitra-tambah-card-title">Tambah</div>

            <form className="mitra-tambah-form" onSubmit={handleSubmit}>
              {/* NAMA PERUSAHAAN */}
              <div className="mitra-tambah-field">
                <label htmlFor="namaPerusahaan">Nama Perusahaan Mitra</label>

                <input
                  id="namaPerusahaan"
                  type="text"
                  value={namaPerusahaan}
                  onChange={(e) => setNamaPerusahaan(e.target.value)}
                  placeholder="Masukkan Nama Perusahaan Mitra"
                  required
                />
              </div>

              {/* LOGO */}
              <div className="mitra-tambah-field">
                <label htmlFor="logoMitra">Logo Perusahaan Mitra</label>

                <div className="mitra-tambah-upload">
                  <input
                    id="logoMitra"
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    onChange={handleLogoChange}
                    required
                  />

                  {logoPreview && (
                    <div className="mitra-tambah-preview">
                      <img src={logoPreview} alt="Preview Logo Mitra" />
                    </div>
                  )}
                </div>
              </div>

              {/* SIMPAN */}
              <button type="submit" className="mitra-tambah-save-button">
                Simpan
              </button>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}

export default MitraTambah;
