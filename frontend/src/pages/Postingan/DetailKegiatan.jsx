import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./DetailKegiatan.css";

function DetailKegiatan() {
  const navigate = useNavigate();
  const { id } = useParams();

  const kegiatanData = [
    {
      id: 1,
      deskripsi: "Buka Bersama PT. Digi Tekno Indonesia",
      tipe: "Gambar",
      tanggal: "16 / 05 / 2026",
      dibuatOleh: "Admin Digi",
      tanggalDibuat: "10-06-2025, 12:00 WIB",
      media: "/Kegiatan/kegiatan1.jpg",
    },
    {
      id: 2,
      deskripsi: "Rafting Citumang",
      tipe: "Gambar",
      tanggal: "16 / 05 / 2026",
      dibuatOleh: "Admin Digi",
      tanggalDibuat: "10-06-2025, 12:00 WIB",
      media: "/Kegiatan/kegiatan2.jpg",
    },
    {
      id: 3,
      deskripsi: "Rafting Citumang",
      tipe: "Gambar",
      tanggal: "16 / 05 / 2026",
      dibuatOleh: "Admin Digi",
      tanggalDibuat: "10-06-2025, 12:00 WIB",
      media: "/Kegiatan/kegiatan3.jpg",
    },
    {
      id: 4,
      deskripsi: "Rafting Citumang",
      tipe: "Gambar",
      tanggal: "16 / 05 / 2026",
      dibuatOleh: "Admin Digi",
      tanggalDibuat: "10-06-2025, 12:00 WIB",
      media: "/Kegiatan/kegiatan4.jpg",
    },
    {
      id: 5,
      deskripsi: "Arung Jeram",
      tipe: "Gambar",
      tanggal: "16 / 05 / 2026",
      dibuatOleh: "Admin Digi",
      tanggalDibuat: "10-06-2025, 12:00 WIB",
      media: "/Kegiatan/kegiatan5.jpg",
    },
    {
      id: 6,
      deskripsi: "Gathering PT. Digi Tekno Indonesia",
      tipe: "Gambar",
      tanggal: "16 / 05 / 2026",
      dibuatOleh: "Admin Digi",
      tanggalDibuat: "10-06-2025, 12:00 WIB",
      media: "/Kegiatan/kegiatan6.jpg",
    },
    {
      id: 7,
      deskripsi: "Rafting Citumang",
      tipe: "Video",
      tanggal: "16 / 05 / 2026",
      dibuatOleh: "Admin Digi",
      tanggalDibuat: "10-06-2025, 12:00 WIB",
      media: "/Kegiatan/kegiatan7.mp4",
    },
    {
      id: 8,
      deskripsi: "Rafting Citumang",
      tipe: "Video",
      tanggal: "16 / 05 / 2026",
      dibuatOleh: "Admin Digi",
      tanggalDibuat: "10-06-2025, 12:00 WIB",
      media: "/Kegiatan/kegiatan8.mp4",
    },
  ];

  const kegiatan = kegiatanData.find((item) => item.id === Number(id));

  if (!kegiatan) {
    return (
      <div className="detail-kegiatan-layout">
        <Sidebar />

        <div className="detail-kegiatan-main">
          <Navbar />

          <main className="detail-kegiatan-content">
            <section className="detail-kegiatan-header">
              <h1>Detail Kegiatan</h1>
            </section>

            <section className="detail-kegiatan-card">
              <p>Data kegiatan tidak ditemukan.</p>

              <button
                type="button"
                onClick={() => navigate("/kegiatan")}
                className="detail-kegiatan-back-button"
              >
                Kembali
              </button>
            </section>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="detail-kegiatan-layout">
      <Sidebar />

      <div className="detail-kegiatan-main">
        <Navbar />

        <main className="detail-kegiatan-content">
          {/* HEADER */}
          <section className="detail-kegiatan-header">
            <h1>Detail Kegiatan</h1>
          </section>

          {/* CARD */}
          <section className="detail-kegiatan-card">
            <div className="detail-kegiatan-card-title">Detail</div>

            <div className="detail-kegiatan-card-content">
              {/* DESKRIPSI */}
              <div className="detail-kegiatan-row">
                <span>Deskripsi Kegiatan</span>
                <b>:</b>
                <p>{kegiatan.deskripsi}</p>
              </div>

              {/* TIPE */}
              <div className="detail-kegiatan-row">
                <span>Tipe</span>
                <b>:</b>
                <p>{kegiatan.tipe}</p>
              </div>

              {/* TANGGAL */}
              <div className="detail-kegiatan-row">
                <span>Tanggal Kegiatan</span>
                <b>:</b>
                <p>{kegiatan.tanggal}</p>
              </div>

              {/* DIBUAT OLEH */}
              <div className="detail-kegiatan-row">
                <span>Dibuat Oleh</span>
                <b>:</b>
                <p>{kegiatan.dibuatOleh}</p>
              </div>

              {/* TANGGAL DIBUAT */}
              <div className="detail-kegiatan-row">
                <span>Tanggal dibuat</span>
                <b>:</b>
                <p>{kegiatan.tanggalDibuat}</p>
              </div>

              {/* MEDIA */}
              <div className="detail-kegiatan-row detail-kegiatan-photo-row">
                <span>
                  {kegiatan.tipe === "Video"
                    ? "Video Kegiatan"
                    : "Foto Kegiatan"}
                </span>

                <b>:</b>

                <div className="detail-kegiatan-photo">
                  {kegiatan.tipe === "Video" ? (
                    <video src={kegiatan.media} controls preload="metadata">
                      Browser Anda tidak mendukung video.
                    </video>
                  ) : (
                    <img src={kegiatan.media} alt="Foto Kegiatan" />
                  )}
                </div>
              </div>

              {/* KEMBALI */}
              <button
                type="button"
                className="detail-kegiatan-back-button"
                onClick={() => navigate("/kegiatan")}
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

export default DetailKegiatan;
