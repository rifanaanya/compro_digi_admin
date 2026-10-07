import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./FooterEdit.css";

function FooterEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/footer/${id}`);

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Gagal mengambil data footer");
        }

        setName(result.data.nama || "");
        setContent(result.data.isi || "");
        setCurrentImage(result.data.gambar || "");
      } catch (error) {
        console.error("Gagal mengambil data footer:", error);
      }
    };

    fetchFooter();
  }, [id]);

  useEffect(() => {
    const fetchFooterSettings = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/footer");

        const result = await response.json();

        if (response.ok && result.success) {
          setFooterSettings(result.data);
        }
      } catch (error) {
        console.error("❌ Error fetch footer settings:", error);
      }
    };

    fetchFooterSettings();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("nama", name);
      formData.append("isi", content);

      if (image) {
        formData.append("gambar", image);
      }

      const response = await fetch(`http://localhost:5000/api/footer/${id}`, {
        method: "PUT",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Gagal memperbarui footer");
      }

      navigate("/settings/footer");
    } catch (error) {
      console.error("Gagal memperbarui footer:", error);
    }
  };

  return (
    <div className="footer-edit-layout">
      {/* SIDEBAR */}
      <Sidebar />

      <div className="footer-edit-main">
        {/* NAVBAR */}
        <Navbar />

        <main className="footer-edit-content">
          {/* =========================
              HEADER
          ========================= */}
          <section className="footer-edit-header">
            <h1>Edit Footer</h1>
          </section>

          {/* =========================
              EDIT CARD
          ========================= */}
          <section className="footer-edit-card">
            <div className="footer-edit-card-title">Edit</div>

            <form className="footer-edit-form" onSubmit={handleSubmit}>
              {/* NAMA PENGATURAN */}
              <div className="footer-edit-form-group">
                <label htmlFor="footer-name">Nama Pengaturan</label>

                <input
                  id="footer-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan Nama Pengaturan"
                />
              </div>

              {/* ISI PENGATURAN */}
              <div className="footer-edit-form-group">
                <label htmlFor="footer-content">Isi Pengaturan</label>

                <input
                  id="footer-content"
                  type="text"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Masukkan Isi Pengaturan"
                />
              </div>

              {/* UPLOAD GAMBAR */}
              <div className="footer-edit-form-group">
                <div className="footer-upload-label">
                  <label htmlFor="footer-image">Upload Gambar</label>

                  <span>*Jika Ada</span>
                </div>

                <div className="footer-upload-wrapper">
                  <input
                    id="footer-image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>

                {/* GAMBAR LAMA */}
                {currentImage && !image && (
                  <small className="footer-current-image">{currentImage}</small>
                )}

                {/* GAMBAR BARU */}
                {image && (
                  <small className="footer-selected-image">{image.name}</small>
                )}
              </div>

              {/* SIMPAN */}
              <button type="submit" className="footer-edit-save-button">
                Simpan
              </button>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}

export default FooterEdit;
