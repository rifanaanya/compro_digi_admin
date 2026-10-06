import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./PengaturanMenuDetail.css";

function PengaturanMenuDetail() {
  const navigate = useNavigate();

  return (
    <div className="pengaturan-menu-detail-layout">
      <Sidebar />

      <div className="pengaturan-menu-detail-main">
        <Navbar />

        <main className="pengaturan-menu-detail-content">
          {/* HEADER */}
          <section className="pengaturan-menu-detail-header">
            <h1>Detail Menu</h1>
          </section>

          {/* CARD */}
          <section className="pengaturan-menu-detail-card">
            <div className="pengaturan-menu-detail-card-title">Detail</div>

            <div className="pengaturan-menu-detail-card-content">
              <div className="pengaturan-menu-detail-row">
                <span className="pengaturan-menu-detail-label">Nama Menu</span>

                <span className="pengaturan-menu-detail-colon">:</span>

                <span className="pengaturan-menu-detail-value">Produk</span>
              </div>

              <div className="pengaturan-menu-detail-row">
                <span className="pengaturan-menu-detail-label">URL</span>

                <span className="pengaturan-menu-detail-colon">:</span>

                <span className="pengaturan-menu-detail-value">/produk</span>
              </div>

              <div className="pengaturan-menu-detail-row">
                <span className="pengaturan-menu-detail-label">Status</span>

                <span className="pengaturan-menu-detail-colon">:</span>

                <span className="pengaturan-menu-detail-value">Aktif</span>
              </div>

              <div className="pengaturan-menu-detail-row">
                <span className="pengaturan-menu-detail-label">Sub Menu</span>

                <span className="pengaturan-menu-detail-colon">:</span>

                <span className="pengaturan-menu-detail-value">-</span>
              </div>

              <div className="pengaturan-menu-detail-row">
                <span className="pengaturan-menu-detail-label">
                  Dibuat Oleh
                </span>

                <span className="pengaturan-menu-detail-colon">:</span>

                <span className="pengaturan-menu-detail-value">Admin Digi</span>
              </div>

              <div className="pengaturan-menu-detail-row">
                <span className="pengaturan-menu-detail-label">
                  Tanggal dibuat
                </span>

                <span className="pengaturan-menu-detail-colon">:</span>

                <span className="pengaturan-menu-detail-value">
                  10-06-2025, 12:00 WIB
                </span>
              </div>

              {/* KEMBALI */}
              <button
                type="button"
                className="pengaturan-menu-detail-back-button"
                onClick={() => navigate("/master/pengaturan-menu")}
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

export default PengaturanMenuDetail;
