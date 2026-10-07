import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./DetailLayanan.css";
function DetailLayanan() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const [layanan, setLayanan] = useState(location.state?.layanan || null);

  const [loading, setLoading] = useState(!location.state?.layanan);

  useEffect(() => {
    const fetchLayanan = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/layanan-data/${id}`,
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Gagal mengambil detail layanan");
        }

        setLayanan(result.data);
      } catch (error) {
        console.error("❌ Gagal mengambil detail layanan:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLayanan();
  }, [id]);

  if (loading) {
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
              <h2>Memuat data layanan...</h2>
            </div>
          </main>
        </div>
      </div>
    );
  }

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
                        src={`http://localhost:5000${layanan.gambar}`}
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
                  {layanan.createdAt
                    ? new Date(layanan.createdAt).toLocaleString("id-ID")
                    : "-"}
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
