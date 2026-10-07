import { useState } from "react";
import { useNavigate } from "react-router-dom";
import dropdownArrow from "../../assets/icons/dropdown-arrow.svg";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./TambahLayanan.css";

function TambahLayanan() {
  const navigate = useNavigate();

  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [gambar, setGambar] = useState(null);
  const [preview, setPreview] = useState("");
  const [tipe, setTipe] = useState("");
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      setGambar(null);
      setPreview("");
      return;
    }

    setGambar(file);

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!judul.trim()) {
      alert("Judul Layanan wajib diisi.");
      return;
    }

    if (!deskripsi.trim()) {
      alert("Deskripsi Layanan wajib diisi.");
      return;
    }

    if (!tipe) {
      alert("Tipe Layanan wajib dipilih.");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("judul", judul.trim());
      formData.append("deskripsi", deskripsi.trim());
      formData.append("tipe", tipe);

      if (gambar) {
        formData.append("gambar", gambar);
      }

      const response = await fetch("http://localhost:5000/api/layanan-data", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Gagal menambahkan layanan");
      }

      alert("Layanan berhasil ditambahkan.");

      navigate("/layanan");
    } catch (error) {
      console.error("❌ Gagal menambahkan layanan:", error);

      alert(error.message || "Gagal menambahkan layanan.");
    }
  };

  const handleCancel = () => {
    navigate("/layanan");
  };

  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="admin-main">
        <Navbar />

        <main className="tambah-layanan-content">
          {/* =========================
              PAGE TITLE
          ========================= */}
          <div className="tambah-layanan-title-card">
            <h1>Tambah Layanan</h1>
          </div>

          {/* =========================
              FORM CARD
          ========================= */}
          <div className="tambah-layanan-card">
            <div className="tambah-layanan-card-header">
              <h2>Tambah</h2>
            </div>

            <form className="tambah-layanan-form" onSubmit={handleSubmit}>
              {/* =========================
                  JUDUL LAYANAN
              ========================= */}
              <div className="form-group">
                <label htmlFor="judul-layanan">Judul Layanan</label>

                <input
                  id="judul-layanan"
                  type="text"
                  placeholder="Masukkan Nama Layanan"
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                />
              </div>

              {/* =========================
                  DESKRIPSI LAYANAN
              ========================= */}
              <div className="form-group">
                <label htmlFor="deskripsi-layanan">Deskripsi Layanan</label>

                <textarea
                  id="deskripsi-layanan"
                  placeholder="Masukkan Deskripsi Layanan"
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  rows="7"
                />
              </div>

              {/* =========================
                  UPLOAD GAMBAR
              ========================= */}
              <div className="form-group">
                <label htmlFor="gambar-layanan">Upload Gambar</label>

                <div className="upload-wrapper">
                  <input
                    id="gambar-layanan"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>

                {preview && (
                  <div className="image-preview">
                    <img src={preview} alt="Preview layanan" />

                    <button
                      type="button"
                      className="remove-image-btn"
                      onClick={() => {
                        setGambar(null);
                        setPreview("");
                      }}
                    >
                      Hapus Gambar
                    </button>
                  </div>
                )}
              </div>

              {/* =========================
                  TIPE LAYANAN
              ========================= */}
              <div className="form-group">
                <label htmlFor="tipe-layanan">Tipe Layanan</label>

                <div className="layanan-type-dropdown">
                  <button
                    type="button"
                    className="layanan-type-dropdown-button"
                    onClick={() => setTypeDropdownOpen((prev) => !prev)}
                  >
                    <span className={!tipe ? "placeholder" : ""}>
                      {tipe || "Pilih Tipe Layanan"}
                    </span>

                    <img
                      src={dropdownArrow}
                      alt=""
                      className={`layanan-type-dropdown-arrow ${
                        typeDropdownOpen ? "open" : ""
                      }`}
                    />
                  </button>

                  {typeDropdownOpen && (
                    <div className="layanan-type-dropdown-menu">
                      <button
                        type="button"
                        className={`layanan-type-dropdown-option ${
                          !tipe ? "selected" : ""
                        }`}
                        onClick={() => {
                          setTipe("");
                          setTypeDropdownOpen(false);
                        }}
                      >
                        Pilih Tipe Layanan
                      </button>

                      <button
                        type="button"
                        className={`layanan-type-dropdown-option ${
                          tipe === "Layanan" ? "selected" : ""
                        }`}
                        onClick={() => {
                          setTipe("Layanan");
                          setTypeDropdownOpen(false);
                        }}
                      >
                        Layanan
                      </button>

                      <button
                        type="button"
                        className={`layanan-type-dropdown-option ${
                          tipe === "Produk Layanan" ? "selected" : ""
                        }`}
                        onClick={() => {
                          setTipe("Produk Layanan");
                          setTypeDropdownOpen(false);
                        }}
                      >
                        Produk Layanan
                      </button>

                      <button
                        type="button"
                        className={`layanan-type-dropdown-option ${
                          tipe === "Default" ? "selected" : ""
                        }`}
                        onClick={() => {
                          setTipe("Default");
                          setTypeDropdownOpen(false);
                        }}
                      >
                        Default
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* =========================
                  BUTTON
              ========================= */}
              <div className="form-actions">
                <button
                  type="button"
                  className="btn-batal-layanan"
                  onClick={handleCancel}
                >
                  Batal
                </button>

                <button type="submit" className="btn-simpan-layanan">
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default TambahLayanan;
