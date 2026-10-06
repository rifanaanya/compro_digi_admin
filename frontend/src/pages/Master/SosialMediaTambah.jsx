import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import dropdownArrow from "../../assets/icons/dropdown-arrow.svg";

import "./SosialMediaTambah.css";

function SosialMediaTambah() {
  const navigate = useNavigate();

  const [nama, setNama] = useState("");
  const [url, setUrl] = useState("");
  const [icon, setIcon] = useState("");
  const [iconOpen, setIconOpen] = useState(false);

  const handleIconSelect = (value) => {
    setIcon(value);
    setIconOpen(false);
  };

  const handleSimpan = async (e) => {
    e.preventDefault();

    if (!nama.trim() || !url.trim() || !icon) {
      alert("Nama, URL, dan Icon wajib diisi");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/sosial-media", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nama: nama.trim(),
          url: url.trim(),
          icon,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Gagal menambahkan sosial media");
        return;
      }

      alert("Sosial media berhasil ditambahkan");

      navigate("/master/sosial-media");
    } catch (error) {
      console.error("❌ Error tambah sosial media:", error);
      alert("Terjadi kesalahan saat menambahkan sosial media");
    }
  };

  return (
    <div className="sosial-media-tambah-layout">
      <Sidebar />

      <div className="sosial-media-tambah-main">
        <Navbar />

        <main className="sosial-media-tambah-content">
          <section className="sosial-media-tambah-header">
            <h1>Tambah Sosial Media</h1>
          </section>

          <section className="sosial-media-tambah-card">
            <div className="sosial-media-tambah-card-title">Tambah</div>

            <form
              className="sosial-media-tambah-card-content"
              onSubmit={handleSimpan}
            >
              {/* NAMA */}
              <div className="sosial-media-tambah-form-group">
                <label htmlFor="nama">Nama Sosial Media</label>

                <input
                  id="nama"
                  type="text"
                  placeholder="Masukkan Nama Pengaturan"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                />
              </div>

              {/* URL */}
              <div className="sosial-media-tambah-form-group">
                <label htmlFor="url">URL</label>

                <input
                  id="url"
                  type="text"
                  placeholder="Masukkan Isi Pengaturan"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>

              {/* ICON */}
              <div className="sosial-media-tambah-form-group">
                <label>Icon</label>

                <div className="sosial-media-icon-dropdown">
                  <button
                    type="button"
                    className={`sosial-media-icon-dropdown-trigger ${
                      iconOpen ? "open" : ""
                    } ${icon ? "has-value" : ""}`}
                    onClick={() => setIconOpen(!iconOpen)}
                  >
                    <span>{icon || "Pilih Icon"}</span>

                    <img
                      src={dropdownArrow}
                      alt=""
                      className={`sosial-media-icon-dropdown-arrow ${
                        iconOpen ? "rotate" : ""
                      }`}
                    />
                  </button>

                  {iconOpen && (
                    <div className="sosial-media-icon-dropdown-list">
                      <button
                        type="button"
                        className="sosial-media-icon-dropdown-option"
                        onClick={() => handleIconSelect("")}
                      >
                        Pilih Icon
                      </button>

                      <button
                        type="button"
                        className="sosial-media-icon-dropdown-option"
                        onClick={() => handleIconSelect("whatsapp")}
                      >
                        WhatsApp
                      </button>

                      <button
                        type="button"
                        className="sosial-media-icon-dropdown-option"
                        onClick={() => handleIconSelect("instagram")}
                      >
                        Instagram
                      </button>

                      <button
                        type="button"
                        className="sosial-media-icon-dropdown-option"
                        onClick={() => handleIconSelect("gmail")}
                      >
                        Gmail
                      </button>

                      <button
                        type="button"
                        className="sosial-media-icon-dropdown-option"
                        onClick={() => handleIconSelect("linkedin")}
                      >
                        LinkedIn
                      </button>

                      <button
                        type="button"
                        className="sosial-media-icon-dropdown-option"
                        onClick={() => handleIconSelect("facebook")}
                      >
                        Facebook
                      </button>

                      <button
                        type="button"
                        className="sosial-media-icon-dropdown-option"
                        onClick={() => handleIconSelect("youtube")}
                      >
                        YouTube
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* SIMPAN */}
              <button type="submit" className="sosial-media-tambah-save-button">
                Simpan
              </button>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}

export default SosialMediaTambah;
