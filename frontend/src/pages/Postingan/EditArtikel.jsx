import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./EditArtikel.css";

function EditArtikel() {
  const navigate = useNavigate();
  const { id } = useParams();

  const artikelData = {
    1: {
      judul:
        "Engineering Service untuk Solusi Teknis Mesin dan Peralatan Industri",
      ringkasan:
        "Setiap kebutuhan industri memiliki kondisi dan permasalahan teknis yang berbeda. PT. Digi Tekno Indonesia menyediakan engineering service untuk membantu pelanggan menemukan solusi yang sesuai dengan kebutuhan mesin, komponen, dan proses kerja di lapangan.",
      isi: "",
      gambar: "/Artikel/artikel1.png",
      namaGambar: "artikel1.png",
    },

    2: {
      judul:
        "Jasa Mekanikal & Engineering untuk Mendukung Performa Mesin Industri",
      ringkasan:
        "Memberikan layanan mekanikal dan engineering untuk mendukung kebutuhan industri.",
      isi: "",
      gambar: "/Artikel/artikel4.png",
      namaGambar: "artikel2.png",
    },

    3: {
      judul: "Jasa Machining Presisi untuk Komponen Mesin Industri",
      ringkasan:
        "Menyediakan jasa machining presisi untuk kebutuhan komponen mesin industri.",
      isi: "",
      gambar: "/Artikel/artikel3.png",
      namaGambar: "artikel3.png",
    },

    4: {
      judul:
        "Repair & Maintenance Mesin Industri untuk Menjaga Kelancaran Operasional",
      ringkasan:
        "Memberikan layanan repair dan maintenance untuk menjaga performa serta kelancaran operasional mesin industri.",
      isi: "",
      gambar: "/Artikel/artikel2.png",
      namaGambar: "artikel4.png",
    },

    5: {
      judul: "Jasa Pengadaan Sparepart dan Komponen Mesin Industri",
      ringkasan:
        "Membantu kebutuhan pengadaan sparepart dan komponen untuk mendukung kebutuhan industri.",
      isi: "",
      gambar: "/Artikel/artikel5.png",
      namaGambar: "artikel5.png",
    },
  };

  const dataAwal = artikelData[id] || artikelData[1];

  const [formData, setFormData] = useState({
    judul: dataAwal.judul,
    ringkasan: dataAwal.ringkasan,
    isi: dataAwal.isi,
    gambar: null,
  });

  const [preview, setPreview] = useState(dataAwal.gambar);

  const [namaGambar, setNamaGambar] = useState(dataAwal.namaGambar);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      gambar: file,
    }));

    setNamaGambar(file.name);

    const imageUrl = URL.createObjectURL(file);

    setPreview(imageUrl);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.judul.trim()) {
      alert("Judul artikel wajib diisi.");
      return;
    }

    if (!formData.ringkasan.trim()) {
      alert("Ringkasan artikel wajib diisi.");
      return;
    }

    if (!formData.isi.trim()) {
      alert("Isi artikel wajib diisi.");
      return;
    }

    const artikelUpdated = {
      id: Number(id),

      judul: formData.judul.trim(),

      ringkasan: formData.ringkasan.trim(),

      isi: formData.isi.trim(),

      gambar: formData.gambar ? preview : dataAwal.gambar,

      namaGambar: namaGambar,

      penulis: "Admin DIGI",

      tanggal: "25 September 2026",
    };

    console.log("Artikel berhasil diubah:", artikelUpdated);

    alert("Artikel berhasil diperbarui.");

    navigate("/artikel");
  };

  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="admin-main">
        <Navbar />

        <main className="edit-artikel-content">
          {/* PAGE TITLE */}

          <div className="edit-artikel-title-card">
            <h1>Edit Artikel</h1>
          </div>

          {/* FORM CARD */}

          <div className="edit-artikel-card">
            <div className="edit-artikel-card-header">
              <h2>Edit</h2>
            </div>

            <form className="edit-artikel-form" onSubmit={handleSubmit}>
              {/* JUDUL */}

              <div className="edit-artikel-form-group">
                <label htmlFor="edit-judul">Judul Artikel</label>

                <input
                  id="edit-judul"
                  name="judul"
                  type="text"
                  value={formData.judul}
                  onChange={handleChange}
                />
              </div>

              {/* RINGKASAN */}

              <div className="edit-artikel-form-group">
                <label htmlFor="edit-ringkasan">Ringkasan</label>

                <textarea
                  id="edit-ringkasan"
                  name="ringkasan"
                  value={formData.ringkasan}
                  onChange={handleChange}
                />
              </div>

              {/* ISI ARTIKEL */}

              <div className="edit-artikel-form-group">
                <label htmlFor="edit-isi">Isi Artikel</label>

                <textarea
                  id="edit-isi"
                  name="isi"
                  value={formData.isi}
                  onChange={handleChange}
                />
              </div>

              {/* UPLOAD GAMBAR */}

              {/* UPLOAD GAMBAR */}
              <div className="edit-artikel-form-group">
                <label htmlFor="edit-gambar">Upload Gambar</label>

                <div className="edit-artikel-upload-box">
                  <input
                    id="edit-gambar"
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    onChange={handleImageChange}
                    className="edit-artikel-file-input"
                  />

                  <label
                    htmlFor="edit-gambar"
                    className="edit-artikel-choose-file"
                  >
                    Choose File
                  </label>

                  {preview && (
                    <div className="edit-artikel-preview">
                      <img src={preview} alt="Preview artikel" />

                      <span>{formData.gambar?.name || "artikel1.png"}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* BUTTON */}

              <div className="edit-artikel-actions">
                <button type="submit" className="edit-artikel-save">
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

export default EditArtikel;
