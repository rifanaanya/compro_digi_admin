import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./ProdukEdit.css";

function ProdukEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [namaProduk, setNamaProduk] = useState(
    "MIS Digi (Manajemen Information System)",
  );

  const [deskripsiProduk, setDeskripsiProduk] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tincidunt tempus leo non porta.",
  );

  const [kelebihanProduk, setKelebihanProduk] = useState(
    "Lorem ipsum dolor sit amet\nConsectetur adipiscing elit\nDuis tincidunt tempus leo non porta.",
  );

  const [kekuranganProduk, setKekuranganProduk] = useState("");

  const [gambarProduk, setGambarProduk] = useState(null);

  const [gambarPreview, setGambarPreview] = useState("/images/mis-digi.png");

  const handleGambarChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setGambarProduk(file);

    const previewUrl = URL.createObjectURL(file);
    setGambarPreview(previewUrl);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Data produk diperbarui:", {
      id,
      namaProduk,
      deskripsiProduk,
      kelebihanProduk,
      kekuranganProduk,
      gambarProduk,
    });

    alert("Produk berhasil diperbarui!");

    navigate("/produk");
  };

  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="admin-main">
        <Navbar />

        <main className="produk-edit-content">
          {/* TITLE */}
          <div className="produk-edit-title-card">
            <h1>Edit Produk</h1>
          </div>

          {/* FORM CARD */}
          <div className="produk-edit-card">
            <h2>Edit</h2>

            <form onSubmit={handleSubmit}>
              {/* NAMA PRODUK */}
              <div className="produk-edit-form-group">
                <label>Nama Produk</label>

                <input
                  type="text"
                  value={namaProduk}
                  onChange={(e) => setNamaProduk(e.target.value)}
                  placeholder="Masukkan Nama Produk"
                />
              </div>

              {/* DESKRIPSI */}
              <div className="produk-edit-form-group">
                <label>Deskripsi Produk</label>

                <textarea
                  value={deskripsiProduk}
                  onChange={(e) => setDeskripsiProduk(e.target.value)}
                  placeholder="Masukkan Deskripsi Produk"
                />
              </div>

              {/* KELEBIHAN */}
              <div className="produk-edit-form-group">
                <label>Kelebihan Produk</label>

                <textarea
                  value={kelebihanProduk}
                  onChange={(e) => setKelebihanProduk(e.target.value)}
                  placeholder="Masukkan Kelebihan Produk"
                />
              </div>

              {/* KEKURANGAN */}
              <div className="produk-edit-form-group">
                <label>Kekurangan Produk</label>

                <textarea
                  value={kekuranganProduk}
                  onChange={(e) => setKekuranganProduk(e.target.value)}
                  placeholder="Masukkan Kekurangan Produk"
                />
              </div>

              {/* GAMBAR */}
              <div className="produk-edit-form-group">
                <label>Gambar Produk</label>

                <div className="produk-edit-image-box">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleGambarChange}
                  />

                  {gambarPreview && (
                    <div className="produk-edit-preview">
                      <img src={gambarPreview} alt="Preview Produk" />

                      <small>
                        {gambarProduk ? gambarProduk.name : "Layanan1.png"}
                      </small>
                    </div>
                  )}
                </div>
              </div>

              {/* SIMPAN */}
              <button type="submit" className="produk-edit-save-btn">
                Simpan
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ProdukEdit;
