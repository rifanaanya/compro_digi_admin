import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./FooterTambah.css";

function FooterTambah() {
  const navigate = useNavigate();

  const [namaPengaturan, setNamaPengaturan] = useState("");
  const [isiPengaturan, setIsiPengaturan] = useState("");
  const [gambar, setGambar] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("nama", namaPengaturan);
      formData.append("isi", isiPengaturan);

      if (gambar) {
        formData.append("gambar", gambar);
      }

      const response = await fetch("http://localhost:5000/api/footer", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Gagal menambahkan footer");
      }

      navigate("/settings/footer");
    } catch (error) {
      console.error("Gagal menambahkan footer:", error);
    }
  };

  return (
    <div className="footer-tambah-layout">
      <Sidebar />

      <div className="footer-tambah-main">
        <Navbar />

        <main className="footer-tambah-content">
          {/* HEADER */}
          <section className="footer-tambah-header">
            <h1>Buat Footer</h1>
          </section>

          {/* FORM CARD */}
          <section className="footer-tambah-card">
            <div className="footer-tambah-card-title">Buat</div>

            <form className="footer-tambah-form" onSubmit={handleSubmit}>
              {/* NAMA PENGATURAN */}
              <div className="footer-tambah-field">
                <label htmlFor="namaPengaturan">Nama Pengaturan</label>

                <input
                  id="namaPengaturan"
                  type="text"
                  value={namaPengaturan}
                  onChange={(e) => setNamaPengaturan(e.target.value)}
                  placeholder="Masukkan Nama Pengaturan"
                  required
                />
              </div>

              {/* ISI PENGATURAN */}
              <div className="footer-tambah-field">
                <label htmlFor="isiPengaturan">Isi Pengaturan</label>

                <input
                  id="isiPengaturan"
                  type="text"
                  value={isiPengaturan}
                  onChange={(e) => setIsiPengaturan(e.target.value)}
                  placeholder="Masukkan Isi Pengaturan"
                  required
                />
              </div>

              {/* UPLOAD GAMBAR */}
              <div className="footer-tambah-field">
                <label>
                  Upload Gambar
                  <span className="footer-optional">*Jika Ada</span>
                </label>

                <input
                  className="footer-file-input"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setGambar(e.target.files[0])}
                />
              </div>

              {/* SIMPAN */}
              <button type="submit" className="footer-tambah-save-button">
                Simpan
              </button>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}

export default FooterTambah;
