import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import "./PengaturanLainnyaDetail.css";

function PengaturanLainnyaDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Sementara data dummy
  const settingData = {
    id: id,
    name: "Logo Sidebar",
    image: "/Logo-Digi.png",
    imagePath: "uploads/settings/logo_sidebar.png",
  };

  return (
    <div className="pengaturan-lainnya-detail-layout">
      {/* SIDEBAR */}
      <Sidebar />

      <div className="pengaturan-lainnya-detail-main">
        {/* NAVBAR */}
        <Navbar />

        <main className="pengaturan-lainnya-detail-content">
          {/* HEADER */}
          <section className="pengaturan-lainnya-detail-header">
            <h1>Detail Pengaturan Lainnya</h1>
          </section>

          {/* CARD */}
          <section className="pengaturan-lainnya-detail-card">
            <div className="pengaturan-lainnya-detail-card-title">Detail</div>

            <div className="pengaturan-lainnya-detail-card-content">
              {/* NAMA PENGATURAN */}
              <div className="pengaturan-lainnya-detail-row">
                <div className="pengaturan-lainnya-detail-label">
                  Nama Pengaturan
                </div>

                <div className="pengaturan-lainnya-detail-separator">:</div>

                <div className="pengaturan-lainnya-detail-value">
                  {settingData.name}
                </div>
              </div>

              {/* GAMBAR */}
              <div className="pengaturan-lainnya-detail-row image-row">
                <div className="pengaturan-lainnya-detail-label">
                  Gambar Isi Pengaturan
                </div>

                <div className="pengaturan-lainnya-detail-separator">:</div>

                <div className="pengaturan-lainnya-detail-value image-value">
                  <img src={settingData.image} alt={settingData.name} />

                  <span>{settingData.imagePath}</span>
                </div>
              </div>

              {/* KEMBALI */}
              <button
                type="button"
                className="pengaturan-lainnya-detail-back-button"
                onClick={() => navigate("/settings/pengaturan-lainnya")}
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

export default PengaturanLainnyaDetail;
