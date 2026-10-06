import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./MitraDetail.css";

function MitraDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const mitraData = {
    1: {
      name: "PT. Japa Indotama",
      logo: "/Mitra/JAPA.png",
    },
    2: {
      name: "PT. Dwitama Mulya Persada",
      logo: "/Mitra/DWITAMA.png",
    },
    3: {
      name: "PT. PT Indonesia Chemical Alumina",
      logo: "/Mitra/ICA.png",
    },
    4: {
      name: "PT. Katalis Sinergi Indonesia",
      logo: "/Mitra/KATALIS SINERGI INDONESIA.png",
    },
    5: {
      name: "PT. Taka Turbomachinery Indonesia",
      logo: "/Mitra/TAKA.png",
    },
    6: {
      name: "PT. Tamaris Hydro",
      logo: "/Mitra/TAMARIS HYDR.png",
    },
    7: {
      name: "PT. Solusindo Integrata Praetoria",
      logo: "/Mitra/SOLUSINDO.png",
    },
    8: {
      name: "PT. PLN",
      logo: "/Mitra/PLN.png",
    },
  };

  const mitra = mitraData[id] || mitraData[1];

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

                <span className="mitra-detail-value">{mitra.name}</span>
              </div>

              {/* LOGO */}
              <div className="mitra-detail-row mitra-detail-logo-row">
                <span className="mitra-detail-label">
                  Logo Perusahaan Mitra
                </span>

                <span className="mitra-detail-colon">:</span>

                <span className="mitra-detail-value">
                  <div className="mitra-detail-logo-box">
                    <img src={mitra.logo} alt={mitra.name} />
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
                  10-06-2025, 12:00 WIB
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
