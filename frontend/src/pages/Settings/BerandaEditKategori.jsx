import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./BerandaEditKategori.css";

function BerandaEditKategori() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const kategoriAwal = location.state?.kategori || "";

  const [kategori, setKategori] = useState(kategoriAwal);

  const handleSimpan = () => {
    const kategoriData =
      JSON.parse(localStorage.getItem("beranda_kategori")) || [];

    const updatedKategori = [...kategoriData];

    const index = Number(id);

    if (index >= 0 && index < updatedKategori.length) {
      updatedKategori[index] = kategori;
    }

    localStorage.setItem("beranda_kategori", JSON.stringify(updatedKategori));

    alert("Kategori berhasil diperbarui!");

    navigate("/settings/beranda");
  };

  return (
    <div className="beranda-edit-layout">
      <Sidebar />

      <div className="beranda-edit-main">
        <Navbar />

        <main className="beranda-edit-content">
          {/* HEADER */}
          <section className="beranda-edit-header">
            <h1>Beranda Setting</h1>
          </section>

          {/* CARD */}
          <section className="beranda-edit-card">
            <div className="beranda-edit-card-title">Edit</div>

            <div className="beranda-edit-form">
              <div className="beranda-edit-form-group">
                <label>Kategori Baru</label>

                <input
                  type="text"
                  value={kategori}
                  placeholder="Masukkan Kategori Baru"
                  onChange={(e) => setKategori(e.target.value)}
                />
              </div>

              <button
                type="button"
                className="beranda-edit-save-button"
                onClick={handleSimpan}
              >
                Simpan
              </button>
            </div>
          </section>
        </main>

        {/* FOOTER */}
        <footer className="beranda-edit-footer">
          <span>Copyright © 2025 PT Digi Tekno Indonesia</span>
          <span>Vers</span>
        </footer>
      </div>
    </div>
  );
}

export default BerandaEditKategori;
