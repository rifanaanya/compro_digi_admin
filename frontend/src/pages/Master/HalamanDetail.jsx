import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./HalamanDetail.css";

function HalamanDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Sementara data dummy
  const halamanData = {
    1: {
      judul: "Blog",
      menu: "/Blog",
      isi: "-",
      gambar: "-",
      tampilkan: "Ya",
      tipe: "List",
      dibuatOleh: "Admin Digi",
      tanggal: "10-06-2025, 12:00 WIB",
    },
    2: {
      judul: "FAQ",
      menu: "/FAQ",
      isi: "-",
      gambar: "-",
      tampilkan: "Ya",
      tipe: "Post Grid",
      dibuatOleh: "Admin Digi",
      tanggal: "10-06-2025, 12:00 WIB",
    },
    3: {
      judul: "Home - Tentang Digi",
      menu: "/Tentang-Digi",
      isi: "-",
      gambar: "-",
      tampilkan: "Ya",
      tipe: "Default",
      dibuatOleh: "Admin Digi",
      tanggal: "10-06-2025, 12:00 WIB",
    },
    7: {
      judul: "Mitra",
      menu: "/Mitra",
      isi: "-",
      gambar: "-",
      tampilkan: "Ya",
      tipe: "Post Grid",
      dibuatOleh: "Admin Digi",
      tanggal: "10-06-2025, 12:00 WIB",
    },
  };

  const data = halamanData[id] || halamanData[7];

  return (
    <div className="halaman-detail-layout">
      <Sidebar />

      <div className="halaman-detail-main">
        <Navbar />

        <main className="halaman-detail-content">
          {/* HEADER */}
          <section className="halaman-detail-header">
            <h1>Detail Halaman</h1>
          </section>

          {/* CARD */}
          <section className="halaman-detail-card">
            <div className="halaman-detail-card-title">Detail</div>

            <div className="halaman-detail-card-content">
              <div className="halaman-detail-row">
                <span>Judul Halaman</span>
                <b>:</b>
                <p>{data.judul}</p>
              </div>

              <div className="halaman-detail-row">
                <span>Menu</span>
                <b>:</b>
                <p>{data.menu}</p>
              </div>

              <div className="halaman-detail-row">
                <span>Isi Halaman</span>
                <b>:</b>
                <p>{data.isi}</p>
              </div>

              <div className="halaman-detail-row">
                <span>Upload Gambar</span>
                <b>:</b>
                <p>{data.gambar}</p>
              </div>

              <div className="halaman-detail-row">
                <span>Tampilkan Halaman?</span>
                <b>:</b>
                <p>{data.tampilkan}</p>
              </div>

              <div className="halaman-detail-row">
                <span>Tipe</span>
                <b>:</b>
                <p>{data.tipe}</p>
              </div>

              <div className="halaman-detail-row">
                <span>Dibuat Oleh</span>
                <b>:</b>
                <p>{data.dibuatOleh}</p>
              </div>

              <div className="halaman-detail-row">
                <span>Tanggal dibuat</span>
                <b>:</b>
                <p>{data.tanggal}</p>
              </div>

              <button
                type="button"
                className="halaman-detail-back-button"
                onClick={() => navigate("/master/halaman")}
              >
                Kembali
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default HalamanDetail;
