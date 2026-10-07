import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./DetailKegiatan.css";

function DetailKegiatan() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [kegiatan, setKegiatan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ========================================
  // AMBIL DETAIL KEGIATAN
  // ========================================

  useEffect(() => {
    const fetchDetailKegiatan = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/postingan/kegiatan/${id}`,
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Data kegiatan tidak ditemukan");
        }

        setKegiatan(result.data);
      } catch (error) {
        console.error("Error mengambil detail kegiatan:", error);

        setError(error.message || "Data kegiatan tidak ditemukan");
      } finally {
        setLoading(false);
      }
    };

    fetchDetailKegiatan();
  }, [id]);

  // ========================================
  // FORMAT TANGGAL KEGIATAN
  // ========================================

  const formatTanggal = (tanggal) => {
    if (!tanggal) return "-";

    const date = new Date(tanggal);

    if (isNaN(date.getTime())) return "-";

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day} / ${month} / ${year}`;
  };

  // ========================================
  // FORMAT TANGGAL DIBUAT
  // ========================================

  const formatTanggalDibuat = (tanggal) => {
    if (!tanggal) return "-";

    const date = new Date(tanggal);

    if (isNaN(date.getTime())) return "-";

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}-${month}-${year}, ${hours}:${minutes} WIB`;
  };

  // ========================================
  // URL MEDIA
  // ========================================

  const getMediaUrl = (media) => {
    if (!media) return "";

    if (media.startsWith("http")) {
      return media;
    }

    return `http://localhost:5000${media}`;
  };

  // ========================================
  // LOADING
  // ========================================

  if (loading) {
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
              <p>Memuat data kegiatan...</p>
            </section>
          </main>
        </div>
      </div>
    );
  }

  // ========================================
  // DATA TIDAK DITEMUKAN
  // ========================================

  if (error || !kegiatan) {
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
                <p>{formatTanggal(kegiatan.tanggal)}</p>
              </div>

              {/* DIBUAT OLEH */}
              <div className="detail-kegiatan-row">
                <span>Dibuat Oleh</span>
                <b>:</b>
                <p>Admin Digi</p>
              </div>

              {/* TANGGAL DIBUAT */}
              <div className="detail-kegiatan-row">
                <span>Tanggal dibuat</span>
                <b>:</b>
                <p>{formatTanggalDibuat(kegiatan.createdAt)}</p>
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
                    <video
                      src={getMediaUrl(kegiatan.media)}
                      controls
                      preload="metadata"
                    >
                      Browser Anda tidak mendukung video.
                    </video>
                  ) : (
                    <img
                      src={getMediaUrl(kegiatan.media)}
                      alt="Foto Kegiatan"
                    />
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
