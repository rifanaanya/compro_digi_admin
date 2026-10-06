import { useLocation, useNavigate, useParams } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./DetailLayanan.css";

function DetailLayanan() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  /*
   * Data dikirim dari halaman Layanan melalui navigate().
   * Kalau halaman direfresh dan state hilang,
   * digunakan data fallback berdasarkan ID.
   */
  const layananData = [
    {
      id: 1,
      judul: "Software Development",
      deskripsi:
        "Mengembangkan aplikasi perangkat lunak dengan teknologi informasi berbasis web dan mobile aplikasi.",
      gambar: "",
      tipe: "Layanan",
      author: "Admin Digi",
      tanggal: "10-06-2025, 12:00 WIB",
    },
    {
      id: 2,
      judul: "Services and Maintenance",
      deskripsi:
        "Memberikan jasa perbaikan dan pemeliharaan baik untuk software, hardware ataupun infrastruktur.",
      gambar: "",
      tipe: "Layanan",
      author: "Admin Digi",
      tanggal: "10-06-2025, 12:00 WIB",
    },
    {
      id: 3,
      judul: "IT Equipment/Hardware & Networking",
      deskripsi:
        "Memasok barang dan suku cadang barang IT untuk bisnis dan produk yang sesuai dengan misi kepuasan pelanggan dan pengiriman cepat.",
      gambar: "",
      tipe: "Layanan",
      author: "Admin Digi",
      tanggal: "10-06-2025, 12:00 WIB",
    },
    {
      id: 4,
      judul: "IT Consultant & Problem Solving",
      deskripsi:
        "Memberikan solusi masukan dan mengevaluasi sistem IT di perusahaan untuk meningkatkan kinerja perusahaan.",
      gambar: "",
      tipe: "Layanan",
      author: "Admin Digi",
      tanggal: "10-06-2025, 12:00 WIB",
    },
    {
      id: 5,
      judul: "Procurement of Goods",
      deskripsi:
        "Kami siap membantu dalam pengadaan barang kebutuhan perusahaan.",
      gambar: "",
      tipe: "Layanan",
      author: "Admin Digi",
      tanggal: "10-06-2025, 12:00 WIB",
    },
  ];

  const layanan = location.state?.layanan
    ? location.state.layanan
    : layananData.find((item) => String(item.id) === String(id));

  if (!layanan) {
    return (
      <div className="admin-layout">
        <Sidebar />

        <div className="admin-main">
          <Navbar />

          <main className="detail-layanan-content">
            <div className="detail-layanan-title-card">
              <h1>Detail Layanan</h1>
            </div>

            <div className="detail-layanan-card">
              <h2>Data layanan tidak ditemukan.</h2>

              <button
                type="button"
                className="detail-kembali-btn"
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

        <main className="detail-layanan-content">
          {/* =========================
              PAGE TITLE
          ========================= */}
          <div className="detail-layanan-title-card">
            <h1>Detail Layanan</h1>
          </div>

          {/* =========================
              DETAIL CARD
          ========================= */}
          <div className="detail-layanan-card">
            <div className="detail-layanan-card-header">
              <h2>Detail</h2>
            </div>

            <div className="detail-layanan-body">
              {/* JUDUL */}
              <div className="detail-row">
                <div className="detail-label">Judul</div>

                <div className="detail-separator">:</div>

                <div className="detail-value">{layanan.judul}</div>
              </div>

              {/* DESKRIPSI */}
              <div className="detail-row detail-row-description">
                <div className="detail-label">Deskripsi</div>

                <div className="detail-separator">:</div>

                <div className="detail-value">{layanan.deskripsi}</div>
              </div>

              {/* GAMBAR */}
              <div className="detail-row detail-image-row">
                <div className="detail-label">Gambar</div>

                <div className="detail-separator">:</div>

                <div className="detail-value">
                  {layanan.gambar ? (
                    <div className="detail-image-wrapper">
                      <img
                        src={layanan.gambar}
                        alt={layanan.judul}
                        className="detail-layanan-image"
                      />
                    </div>
                  ) : (
                    <div className="detail-image-placeholder">
                      Tidak ada gambar
                    </div>
                  )}
                </div>
              </div>

              {/* TIPE */}
              <div className="detail-row">
                <div className="detail-label">Tipe</div>

                <div className="detail-separator">:</div>

                <div className="detail-value">{layanan.tipe}</div>
              </div>

              {/* DIBUAT OLEH */}
              <div className="detail-row">
                <div className="detail-label">Dibuat Oleh</div>

                <div className="detail-separator">:</div>

                <div className="detail-value">
                  {layanan.author || "Admin Digi"}
                </div>
              </div>

              {/* TANGGAL */}
              <div className="detail-row">
                <div className="detail-label">Tanggal dibuat</div>

                <div className="detail-separator">:</div>

                <div className="detail-value">
                  {layanan.tanggal || "10-06-2025, 12:00 WIB"}
                </div>
              </div>

              {/* BUTTON */}
              <div className="detail-layanan-actions">
                <button
                  type="button"
                  className="detail-kembali-btn"
                  onClick={() => navigate("/layanan")}
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

export default DetailLayanan;
