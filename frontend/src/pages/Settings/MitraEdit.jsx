import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./MitraEdit.css";

function MitraEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const mitraData = {
    1: {
      name: "PT. Japa Indotama",
      logo: "/Mitra/JAPA.png",
    },
    2: {
      name: "PT. Dwitama Mulya Persada",
      logo: "/Mitra/DWITAMA.png",
    },
    3: {
      name: "PT. PT Indonesia Chemical Alumina",
      logo: "/Mitra/ICA.png",
    },
    4: {
      name: "PT. Katalis Sinergi Indonesia",
      logo: "/Mitra/KATALIS SINERGI INDONESIA.png",
    },
    5: {
      name: "PT. Taka Turbomachinery Indonesia",
      logo: "/Mitra/TAKA.png",
    },
    6: {
      name: "PT. Tamaris Hydro",
      logo: "/Mitra/TAMARIS HYDR.png",
    },
    7: {
      name: "PT. Solusindo Integrata Praetoria",
      logo: "/Mitra/SOLUSINDO.png",
    },
    8: {
      name: "PT. PLN",
      logo: "/Mitra/PLN.png",
    },
  };

  const selectedMitra = mitraData[id] || mitraData[1];

  const [namaPerusahaan, setNamaPerusahaan] = useState(selectedMitra.name);

  const [logoPreview, setLogoPreview] = useState(selectedMitra.logo);

  const [logoFile, setLogoFile] = useState(null);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setLogoFile(file);

    const previewUrl = URL.createObjectURL(file);
    setLogoPreview(previewUrl);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Edit Mitra:", {
      id,
      namaPerusahaan,
      logoFile,
    });

    // Nanti disambungkan ke database

    navigate("/settings/mitra");
  };

  return (
    <div className="mitra-edit-layout">
      {/* SIDEBAR */}
      <Sidebar />

      <div className="mitra-edit-main">
        {/* NAVBAR */}
        <Navbar />

        <main className="mitra-edit-content">
          {/* HEADER */}
          <section className="mitra-edit-header">
            <h1>Edit Mitra</h1>
          </section>

          {/* CARD */}
          <section className="mitra-edit-card">
            {/* CARD TITLE */}
            <div className="mitra-edit-card-title">Edit</div>

            <form className="mitra-edit-form" onSubmit={handleSubmit}>
              {/* NAMA PERUSAHAAN */}
              <div className="mitra-edit-field">
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
              <div className="mitra-edit-field">
                <label htmlFor="logoMitra">Logo Perusahaan Mitra</label>

                <div className="mitra-edit-upload">
                  <input
                    id="logoMitra"
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    onChange={handleLogoChange}
                  />

                  {logoPreview && (
                    <div className="mitra-edit-preview">
                      <img src={logoPreview} alt="Logo Mitra" />
                    </div>
                  )}
                </div>
              </div>

              {/* SIMPAN */}
              <button type="submit" className="mitra-edit-save-button">
                Simpan
              </button>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}

export default MitraEdit;
