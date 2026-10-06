import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./DetailArtikel.css";

function DetailArtikel() {
  const navigate = useNavigate();
  const { id } = useParams();

  const artikelData = [
    {
      id: 1,
      judul:
        "Engineering Service untuk Solusi Teknis Mesin dan Peralatan Industri",
      ringkasan:
        "Setiap kebutuhan industri memiliki kondisi dan permasalahan teknis yang berbeda. PT. Digi Tekno Indonesia menyediakan engineering service untuk membantu pelanggan menemukan solusi yang sesuai dengan kebutuhan mesin, komponen, dan proses kerja di lapangan.",
      isi: `Setiap kebutuhan industri memiliki kondisi dan permasalahan teknis yang berbeda. PT. Digi Tekno Indonesia menyediakan engineering service untuk membantu pelanggan menemukan solusi yang sesuai dengan kebutuhan mesin, komponen, dan proses kerja di lapangan.

Layanan engineering mencakup analisis kebutuhan teknis, perencanaan pekerjaan, pengembangan solusi, hingga dukungan dalam proses pengerjaan komponen dan peralatan. Pendekatan dilakukan dengan mempertimbangkan kondisi aktual dan kebutuhan operasional pelanggan.

Kami berkomitmen memberikan solusi engineering yang efektif dan tepat guna untuk mendukung performa serta keandalan peralatan industri.`,
      gambar: "/Artikel/artikel1.png",
      penulis: "Admin Digi",
      tanggal: "10-06-2025, 12:00 WIB",
    },

    {
      id: 2,
      judul:
        "Jasa Mekanikal & Engineering untuk Mendukung Performa Mesin Industri",
      ringkasan:
        "PT. Digi Tekno Indonesia menyediakan jasa mekanikal dan engineering untuk membantu menjaga performa mesin dan peralatan industri.",
      isi: "Kami menyediakan layanan mekanikal dan engineering yang disesuaikan dengan kebutuhan industri.",
      gambar: "/Artikel/artikel2.png",
      penulis: "Admin Digi",
      tanggal: "10-06-2025, 12:00 WIB",
    },

    {
      id: 3,
      judul: "Jasa Machining Presisi untuk Komponen Mesin Industri",
      ringkasan:
        "Layanan machining presisi untuk kebutuhan komponen mesin industri.",
      isi: "Kami menyediakan layanan machining presisi untuk menghasilkan komponen sesuai kebutuhan dan spesifikasi pelanggan.",
      gambar: "/Artikel/artikel3.png",
      penulis: "Admin Digi",
      tanggal: "10-06-2025, 12:00 WIB",
    },

    {
      id: 4,
      judul:
        "Repair & Maintenance Mesin Industri untuk Menjaga Kelancaran Operasional",
      ringkasan:
        "Layanan repair dan maintenance untuk menjaga kondisi mesin industri.",
      isi: "PT. Digi Tekno Indonesia menyediakan layanan perbaikan dan pemeliharaan mesin industri.",
      gambar: "/Artikel/artikel4.png",
      penulis: "Admin Digi",
      tanggal: "10-06-2025, 12:00 WIB",
    },

    {
      id: 5,
      judul: "Jasa Pengadaan Sparepart dan Komponen Mesin Industri",
      ringkasan:
        "Menyediakan kebutuhan sparepart dan komponen untuk mendukung operasional industri.",
      isi: "Kami membantu pelanggan dalam pengadaan sparepart dan komponen mesin industri sesuai kebutuhan.",
      gambar: "/Artikel/artikel5.png",
      penulis: "Admin Digi",
      tanggal: "10-06-2025, 12:00 WIB",
    },
  ];

  const artikel = artikelData.find((item) => item.id === Number(id));

  if (!artikel) {
    return (
      <div className="admin-layout">
        <Sidebar />

        <div className="admin-main">
          <Navbar />

          <main className="detail-artikel-content">
            <div className="detail-artikel-title-card">
              <h1>Detail Artikel</h1>
            </div>

            <div className="detail-artikel-card">
              <div className="detail-artikel-card-header">
                <h2>Detail</h2>
              </div>

              <div className="detail-artikel-not-found">
                Artikel tidak ditemukan.
              </div>

              <button
                type="button"
                className="detail-artikel-back"
                onClick={() => navigate("/artikel")}
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

        <main className="detail-artikel-content">
          {/* PAGE TITLE */}
          <div className="detail-artikel-title-card">
            <h1>Detail Artikel</h1>
          </div>

          {/* DETAIL CARD */}
          <div className="detail-artikel-card">
            {/* HEADER */}
            <div className="detail-artikel-card-header">
              <h2>Detail</h2>
            </div>

            {/* CONTENT */}
            <div className="detail-artikel-body">
              {/* JUDUL */}
              <div className="detail-artikel-row">
                <div className="detail-artikel-label">Judul Artikel</div>

                <div className="detail-artikel-colon">:</div>

                <div className="detail-artikel-value">{artikel.judul}</div>
              </div>

              {/* RINGKASAN */}
              <div className="detail-artikel-row">
                <div className="detail-artikel-label">Ringkasan</div>

                <div className="detail-artikel-colon">:</div>

                <div className="detail-artikel-value">{artikel.ringkasan}</div>
              </div>

              {/* ISI */}
              <div className="detail-artikel-row">
                <div className="detail-artikel-label">Isi Artikel</div>

                <div className="detail-artikel-colon">:</div>

                <div className="detail-artikel-value detail-artikel-isi">
                  {artikel.isi.split("\n\n").map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* GAMBAR */}
              <div className="detail-artikel-row detail-artikel-image-row">
                <div className="detail-artikel-label">Gambar</div>

                <div className="detail-artikel-colon">:</div>

                <div className="detail-artikel-value">
                  <img
                    src={artikel.gambar}
                    alt={artikel.judul}
                    className="detail-artikel-image"
                  />
                </div>
              </div>

              {/* DIBUAT OLEH */}
              <div className="detail-artikel-row detail-artikel-meta-row">
                <div className="detail-artikel-label">Dibuat Oleh</div>

                <div className="detail-artikel-colon">:</div>

                <div className="detail-artikel-value">{artikel.penulis}</div>
              </div>

              {/* TANGGAL */}
              <div className="detail-artikel-row">
                <div className="detail-artikel-label">Tanggal dibuat</div>

                <div className="detail-artikel-colon">:</div>

                <div className="detail-artikel-value">{artikel.tanggal}</div>
              </div>

              {/* BUTTON */}
              <div className="detail-artikel-actions">
                <button
                  type="button"
                  className="detail-artikel-back"
                  onClick={() => navigate("/artikel")}
                >
                  Kembali
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DetailArtikel;
