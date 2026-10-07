import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./MitraDetail.css";

function MitraDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [mitra, setMitra] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMitraDetail = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/mitra/${id}`);

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Gagal mengambil detail Mitra.");
        }

        setMitra(result.data);
      } catch (error) {
        console.error("❌ Gagal mengambil detail Mitra:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMitraDetail();
  }, [id]);

  const getMitraLogoUrl = (logo) => {
    if (!logo) return "";

    if (logo.startsWith("http")) {
      return logo;
    }

    return `http://localhost:5000${logo.startsWith("/") ? "" : "/"}${logo}`;
  };

  const formatTanggal = (tanggal) => {
    if (!tanggal) return "-";

    const date = new Date(tanggal);

    const hari = String(date.getDate()).padStart(2, "0");
    const bulan = String(date.getMonth() + 1).padStart(2, "0");
    const tahun = date.getFullYear();

    const jam = String(date.getHours()).padStart(2, "0");
    const menit = String(date.getMinutes()).padStart(2, "0");

    return `${hari}-${bulan}-${tahun}, ${jam}:${menit} WIB`;
  };

  return (
    <div className="mitra-detail-layout">
      {/* SIDEBAR */}
      <Sidebar />

      <div className="mitra-detail-main">
        {/* NAVBAR */}
        <Navbar />

        <main className="mitra-detail-content">
          {/* HEADER */}
          <section className="mitra-detail-header">
            <h1>Detail Mitra</h1>
          </section>

          {/* DETAIL CARD */}
          <section className="mitra-detail-card">
            <div className="mitra-detail-card-title">Detail</div>

            <div className="mitra-detail-info">
              {/* NAMA */}
              <div className="mitra-detail-row">
                <span className="mitra-detail-label">
                  Nama Perusahaan Mitra
                </span>

                <span className="mitra-detail-colon">:</span>

                <span className="mitra-detail-value">
                  {loading ? "Memuat..." : mitra?.nama || "-"}
                </span>
              </div>

              {/* LOGO */}
              <div className="mitra-detail-row mitra-detail-logo-row">
                <span className="mitra-detail-label">
                  Logo Perusahaan Mitra
                </span>

                <span className="mitra-detail-colon">:</span>

                <span className="mitra-detail-value">
                  <div className="mitra-detail-logo-box">
                    {mitra?.logo && (
                      <img src={getMitraLogoUrl(mitra.logo)} alt={mitra.nama} />
                    )}
                  </div>
                </span>
              </div>

              {/* DIBUAT OLEH */}
              <div className="mitra-detail-row">
                <span className="mitra-detail-label">Dibuat Oleh</span>

                <span className="mitra-detail-colon">:</span>

                <span className="mitra-detail-value">Admin Digi</span>
              </div>

              {/* TANGGAL */}
              <div className="mitra-detail-row">
                <span className="mitra-detail-label">Tanggal dibuat</span>

                <span className="mitra-detail-colon">:</span>

                <span className="mitra-detail-value">
                  {loading ? "Memuat..." : formatTanggal(mitra?.createdAt)}
                </span>
              </div>

              {/* KEMBALI */}
              <button
                type="button"
                className="mitra-detail-back-button"
                onClick={() => navigate("/settings/mitra")}
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

export default MitraDetail;
