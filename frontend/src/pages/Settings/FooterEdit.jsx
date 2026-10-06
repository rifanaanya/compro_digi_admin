import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./FooterEdit.css";

function FooterEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const footerData = {
    1: {
      name: "Footer Copyright",
      content: "PT. Digi Tekno Indonesia",
      image: "",
    },
    2: {
      name: "Logo Footer",
      content: "",
      image: "uploads/settings/logofooter.png",
    },
    3: {
      name: "Footer Column 1",
      content: "Layanan Kami",
      image: "",
    },
    4: {
      name: "Footer Column 2",
      content: "Kontak Kami",
      image: "",
    },
  };

  const selectedFooter = footerData[id] || footerData[1];

  const [name, setName] = useState(selectedFooter.name);
  const [content, setContent] = useState(selectedFooter.content);
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      id,
      name,
      content,
      image,
    });

    // Nanti disambungkan ke backend/database
    navigate("/settings/footer");
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
                {selectedFooter.image && !image && (
                  <small className="footer-current-image">
                    {selectedFooter.image}
                  </small>
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
