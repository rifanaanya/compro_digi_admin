import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./TambahTipe.css";

function TambahTipe() {
  const navigate = useNavigate();

  const [tipe, setTipe] = useState("");
  const [menu, setMenu] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!tipe.trim()) {
      alert("Tipe wajib diisi.");
      return;
    }

    if (!menu) {
      alert("Silakan pilih menu.");
      return;
    }

    alert("Tipe berhasil disimpan.");

    navigate("/tipe");
  };

  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="admin-main">
        <Navbar />

        <main className="tambah-tipe-content">
          {/* PAGE TITLE */}
          <div className="tambah-tipe-title-card">
            <h1>Tambah Tipe Postingan</h1>
          </div>

          {/* FORM CARD */}
          <div className="tambah-tipe-card">
            <div className="tambah-tipe-card-header">
              <h2>Tambah</h2>
            </div>

            <form className="tambah-tipe-form" onSubmit={handleSubmit}>
              {/* TIPE */}
              <div className="form-group">
                <label htmlFor="tipe">Tipe</label>

                <input
                  id="tipe"
                  type="text"
                  placeholder="Masukkan Tipe"
                  value={tipe}
                  onChange={(e) => setTipe(e.target.value)}
                />
              </div>

              {/* MENU */}
              <div className="form-group">
                <label htmlFor="menu">Menu</label>

                <select
                  id="menu"
                  value={menu}
                  onChange={(e) => setMenu(e.target.value)}
                >
                  <option value="">Pilih Menu</option>

                  <option value="Layanan">Layanan</option>

                  <option value="FAQ">FAQ</option>

                  <option value="Blog">Blog</option>

                  <option value="Visi Misi">Visi Misi</option>

                  <option value="Kegiatan">Kegiatan</option>

                  <option value="Sertifikasi">Sertifikasi</option>

                  <option value="Karir">Karir</option>

                  <option value="Produk">Produk</option>

                  <option value="Produk Layanan">Produk Layanan</option>

                  <option value="Mitra">Mitra</option>
                </select>
              </div>

              {/* BUTTON */}
              <button type="submit" className="btn-simpan-tipe">
                Simpan
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default TambahTipe;
