import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./TambahProduk.css";

function TambahProduk() {
  const navigate = useNavigate();

  const [namaProduk, setNamaProduk] = useState("");
  const [deskripsiProduk, setDeskripsiProduk] = useState("");
  const [kelebihanProduk, setKelebihanProduk] = useState("");
  const [kekuranganProduk, setKekuranganProduk] = useState("");
  const [gambarProduk, setGambarProduk] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      setGambarProduk(null);
      return;
    }

    setGambarProduk(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!namaProduk.trim()) {
      alert("Nama Produk wajib diisi.");
      return;
    }

    if (!deskripsiProduk.trim()) {
      alert("Deskripsi Produk wajib diisi.");
      return;
    }

    if (!kelebihanProduk.trim()) {
      alert("Kelebihan Produk wajib diisi.");
      return;
    }

    if (!kekuranganProduk.trim()) {
      alert("Kekurangan Produk wajib diisi.");
      return;
    }

    const dataProduk = {
      namaProduk,
      deskripsiProduk,
      kelebihanProduk,
      kekuranganProduk,
      gambarProduk,
    };

    console.log("Data Produk:", dataProduk);

    alert("Produk berhasil ditambahkan.");

    navigate("/produk");
  };

  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="admin-main">
        <Navbar />

        <main className="tambah-produk-content">
          {/* PAGE TITLE */}
          <div className="tambah-produk-title-card">
            <h1>Tambah Produk</h1>
          </div>

          {/* FORM CARD */}
          <div className="tambah-produk-card">
            {/* CARD HEADER */}
            <div className="tambah-produk-card-header">
              <h2>Tambah</h2>
            </div>

            <form className="tambah-produk-form" onSubmit={handleSubmit}>
              {/* NAMA PRODUK */}
              <div className="produk-form-group">
                <label htmlFor="namaProduk">Nama Produk</label>

                <input
                  id="namaProduk"
                  type="text"
                  placeholder="Masukkan Nama Produk"
                  value={namaProduk}
                  onChange={(e) => setNamaProduk(e.target.value)}
                />
              </div>

              {/* DESKRIPSI PRODUK */}
              <div className="produk-form-group">
                <label htmlFor="deskripsiProduk">Deskripsi Produk</label>

                <textarea
                  id="deskripsiProduk"
                  placeholder="Masukkan Deskripsi Produk"
                  value={deskripsiProduk}
                  onChange={(e) => setDeskripsiProduk(e.target.value)}
                />
              </div>

              {/* KELEBIHAN PRODUK */}
              <div className="produk-form-group">
                <label htmlFor="kelebihanProduk">Kelebihan Produk</label>

                <textarea
                  id="kelebihanProduk"
                  placeholder="Masukkan Kelebihan Produk"
                  value={kelebihanProduk}
                  onChange={(e) => setKelebihanProduk(e.target.value)}
                />
              </div>

              {/* KEKURANGAN PRODUK */}
              <div className="produk-form-group">
                <label htmlFor="kekuranganProduk">Kekurangan Produk</label>

                <textarea
                  id="kekuranganProduk"
                  placeholder="Masukkan Kekurangan Produk"
                  value={kekuranganProduk}
                  onChange={(e) => setKekuranganProduk(e.target.value)}
                />
              </div>

              {/* GAMBAR PRODUK */}
              <div className="produk-form-group">
                <label htmlFor="gambarProduk">Gambar Produk</label>

                <div className="produk-upload-wrapper">
                  <input
                    id="gambarProduk"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
              </div>

              {/* SIMPAN */}
              <button type="submit" className="produk-simpan-btn">
                Simpan
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default TambahProduk;
