import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import "./ProdukDetail.css";

function ProdukDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Sementara data dummy
  // Nanti bisa kita ganti dengan data dari backend
  const produkList = [
    {
      id: 1,
      nama: "MIS Digi (Manajemen Information System)",
      deskripsi:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tincidunt tempus leo non porta.",
      kelebihan: [
        "Lorem ipsum dolor sit amet",
        "Consectetur adipiscing elit",
        "Duis tincidunt tempus leo non porta.",
      ],
      kekurangan: "-",
      gambar: "/images/mis-digi.png",
      dibuatOleh: "Admin Digi",
      tanggal: "10-06-2025, 12:00 WIB",
    },
  ];

  const produk = produkList.find((item) => item.id === Number(id));

  if (!produk) {
    return (
      <div className="admin-layout">
        <Sidebar />

        <div className="admin-main">
          <Navbar />

          <main className="produk-detail-content">
            <div className="produk-detail-title-card">
              <h1>Detail Produk</h1>
            </div>

            <div className="produk-detail-card">
              <h2>Detail</h2>

              <div className="produk-not-found">Produk tidak ditemukan.</div>

              <button
                type="button"
                className="produk-kembali-btn"
                onClick={() => navigate("/produk")}
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

        <main className="produk-detail-content">
          {/* TITLE */}
          <div className="produk-detail-title-card">
            <h1>Detail Produk</h1>
          </div>

          {/* DETAIL */}
          <div className="produk-detail-card">
            <h2>Detail</h2>

            <div className="produk-detail-body">
              <div className="produk-detail-row">
                <div className="produk-detail-label">Nama Produk</div>

                <div className="produk-detail-colon">:</div>

                <div className="produk-detail-value">{produk.nama}</div>
              </div>

              <div className="produk-detail-row">
                <div className="produk-detail-label">Deskripsi Produk</div>

                <div className="produk-detail-colon">:</div>

                <div className="produk-detail-value">{produk.deskripsi}</div>
              </div>

              <div className="produk-detail-row">
                <div className="produk-detail-label">Kelebihan Produk</div>

                <div className="produk-detail-colon">:</div>

                <div className="produk-detail-value">
                  <ul>
                    {produk.kelebihan.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="produk-detail-row">
                <div className="produk-detail-label">Kekurangan Produk</div>

                <div className="produk-detail-colon">:</div>

                <div className="produk-detail-value">{produk.kekurangan}</div>
              </div>

              <div className="produk-detail-row">
                <div className="produk-detail-label">Gambar Produk</div>

                <div className="produk-detail-colon">:</div>

                <div className="produk-detail-value">
                  <div className="produk-detail-image-wrapper">
                    <img
                      src={produk.gambar}
                      alt={produk.nama}
                      className="produk-detail-image"
                    />

                    <small>mis-digi.png</small>
                  </div>
                </div>
              </div>

              <div className="produk-detail-row">
                <div className="produk-detail-label">Dibuat Oleh</div>

                <div className="produk-detail-colon">:</div>

                <div className="produk-detail-value">{produk.dibuatOleh}</div>
              </div>

              <div className="produk-detail-row">
                <div className="produk-detail-label">Tanggal dibuat</div>

                <div className="produk-detail-colon">:</div>

                <div className="produk-detail-value">{produk.tanggal}</div>
              </div>
            </div>

            {/* KEMBALI */}
            <button
              type="button"
              className="produk-kembali-btn"
              onClick={() => navigate("/produk")}
            >
              Kembali
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ProdukDetail;
