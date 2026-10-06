import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./EditLayanan.css";

function EditLayanan() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const layananData = [
    {
      id: 1,
      judul: "Software Development",
      deskripsi:
        "Mengembangkan aplikasi perangkat lunak dengan teknologi informasi berbasis web dan mobile aplikasi.",
      gambar: "",
      tipe: "Layanan",
    },
    {
      id: 2,
      judul: "Services and Maintenance",
      deskripsi:
        "Memberikan jasa perbaikan dan pemeliharaan baik untuk software, hardware ataupun infrastruktur.",
      gambar: "",
      tipe: "Layanan",
    },
    {
      id: 3,
      judul: "IT Equipment/Hardware & Networking",
      deskripsi:
        "Memasok barang dan suku cadang barang IT untuk bisnis dan produk yang sesuai dengan misi kepuasan pelanggan dan pengiriman cepat.",
      gambar: "",
      tipe: "Layanan",
    },
    {
      id: 4,
      judul: "IT Consultant & Problem Solving",
      deskripsi:
        "Memberikan solusi masukan dan mengevaluasi sistem IT di perusahaan untuk meningkatkan kinerja perusahaan.",
      gambar: "",
      tipe: "Layanan",
    },
    {
      id: 5,
      judul: "Procurement of Goods",
      deskripsi:
        "Kami siap membantu dalam pengadaan barang kebutuhan perusahaan.",
      gambar: "",
      tipe: "Layanan",
    },
  ];

  const dataAwal =
    location.state?.layanan ||
    layananData.find((item) => String(item.id) === String(id));

  const [judul, setJudul] = useState(dataAwal?.judul || "");
  const [deskripsi, setDeskripsi] = useState(dataAwal?.deskripsi || "");
  const [gambar, setGambar] = useState(dataAwal?.gambar || "");
  const [tipe, setTipe] = useState(dataAwal?.tipe || "Layanan");

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setGambar(imageUrl);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!judul.trim()) {
      alert("Judul Layanan wajib diisi.");
      return;
    }

    if (!deskripsi.trim()) {
      alert("Deskripsi Layanan wajib diisi.");
      return;
    }

    const layananUpdate = {
      id: Number(id),
      judul,
      deskripsi,
      gambar,
      tipe,
    };

    console.log("Data layanan berhasil diedit:", layananUpdate);

    alert("Data layanan berhasil disimpan.");

    navigate("/layanan");
  };

  if (!dataAwal) {
    return (
      <div className="admin-layout">
        <Sidebar />

        <div className="admin-main">
          <Navbar />

          <main className="edit-layanan-content">
            <div className="edit-layanan-title-card">
              <h1>Edit Layanan</h1>
            </div>

            <div className="edit-layanan-card">
              <h2>Data layanan tidak ditemukan.</h2>

              <button
                type="button"
                className="edit-kembali-btn"
                onClick={() => navigate("/layanan")}
              >
                Kembali
              </button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="admin-main">
        <Navbar />

        <main className="edit-layanan-content">
          {/* TITLE */}
          <div className="edit-layanan-title-card">
            <h1>Edit Layanan</h1>
          </div>

          {/* FORM */}
          <div className="edit-layanan-card">
            <div className="edit-layanan-card-header">
              <h2>Edit</h2>
            </div>

            <form className="edit-layanan-form" onSubmit={handleSubmit}>
              {/* JUDUL */}
              <div className="edit-form-group">
                <label htmlFor="judul">Judul Layanan</label>

                <input
                  id="judul"
                  type="text"
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                  placeholder="Masukkan Nama Layanan"
                />
              </div>

              {/* DESKRIPSI */}
              <div className="edit-form-group">
                <label htmlFor="deskripsi">Deskripsi Layanan</label>

                <textarea
                  id="deskripsi"
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  placeholder="Masukkan Deskripsi Layanan"
                />
              </div>

              {/* GAMBAR */}
              <div className="edit-form-group">
                <label htmlFor="gambar">Upload Gambar</label>

                <div className="edit-upload-wrapper">
                  <input
                    id="gambar"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />

                  {gambar && (
                    <div className="edit-image-preview">
                      <img src={gambar} alt={judul} />
                    </div>
                  )}
                </div>
              </div>

              {/* TIPE */}
              <div className="edit-form-group">
                <label htmlFor="tipe">Tipe Layanan</label>

                <select
                  id="tipe"
                  value={tipe}
                  onChange={(e) => setTipe(e.target.value)}
                >
                  <option value="Layanan">Layanan</option>
                </select>
              </div>

              {/* SIMPAN */}
              <button type="submit" className="edit-simpan-btn">
                Simpan
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default EditLayanan;
