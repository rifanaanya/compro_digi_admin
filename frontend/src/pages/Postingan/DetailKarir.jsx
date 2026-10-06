import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./DetailKarir.css";

function DetailKarir() {
  const navigate = useNavigate();
  const { id } = useParams();

  const karirData = [
    {
      id: 1,
      posisi: "UI/UX Designer",
      kategori: "IT & Software",
      lokasi: "Bandung, Jawa Barat",
      tipe: "Full Time",
      dibuatOleh: "Admin Digi",
      tanggalDibuat: "10-06-2025, 12:00 WIB",
    },
    {
      id: 2,
      posisi: "Frontend Dev",
      kategori: "IT & Software",
      lokasi: "Bandung, Jawa Barat",
      tipe: "Full Time",
      dibuatOleh: "Admin Digi",
      tanggalDibuat: "10-06-2025, 12:00 WIB",
    },
    {
      id: 3,
      posisi: "Mechanical Engineer",
      kategori: "Engineering",
      lokasi: "Bandung, Jawa Barat",
      tipe: "Full Time",
      dibuatOleh: "Admin Digi",
      tanggalDibuat: "10-06-2025, 12:00 WIB",
    },
    {
      id: 4,
      posisi: "Admin Project",
      kategori: "Administrasi",
      lokasi: "Bandung, Jawa Barat",
      tipe: "Full Time",
      dibuatOleh: "Admin Digi",
      tanggalDibuat: "10-06-2025, 12:00 WIB",
    },
  ];

  const data = karirData.find((item) => item.id === Number(id));

  if (!data) {
    return (
      <div className="admin-layout">
        <Sidebar />

        <div className="admin-main">
          <Navbar />

          <main className="detail-karir-content">
            <div className="detail-karir-title-card">
              <h1>Detail Karir</h1>
            </div>

            <div className="detail-karir-card">
              <div className="detail-karir-card-header">
                <h2>Detail</h2>
              </div>

              <div className="detail-karir-body">
                <p className="detail-karir-not-found">
                  Data karir tidak ditemukan.
                </p>

                <button
                  type="button"
                  className="detail-karir-back-button"
                  onClick={() => navigate("/karir")}
                >
                  Kembali
                </button>
              </div>
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

        <main className="detail-karir-content">
          {/* PAGE TITLE */}
          <div className="detail-karir-title-card">
            <h1>Detail Karir</h1>
          </div>

          {/* DETAIL CARD */}
          <div className="detail-karir-card">
            <div className="detail-karir-card-header">
              <h2>Detail</h2>
            </div>

            <div className="detail-karir-body">
              {/* POSISI */}
              <div className="detail-karir-row">
                <div className="detail-karir-label">Posisi</div>

                <div className="detail-karir-separator">:</div>

                <div className="detail-karir-value">{data.posisi}</div>
              </div>

              {/* KATEGORI */}
              <div className="detail-karir-row">
                <div className="detail-karir-label">Kategori</div>

                <div className="detail-karir-separator">:</div>

                <div className="detail-karir-value">{data.kategori}</div>
              </div>

              {/* LOKASI */}
              <div className="detail-karir-row">
                <div className="detail-karir-label">Lokasi</div>

                <div className="detail-karir-separator">:</div>

                <div className="detail-karir-value">{data.lokasi}</div>
              </div>

              {/* TIPE PEKERJAAN */}
              <div className="detail-karir-row">
                <div className="detail-karir-label">Tipe Pekerjaan</div>

                <div className="detail-karir-separator">:</div>

                <div className="detail-karir-value">{data.tipe}</div>
              </div>

              {/* DIBUAT OLEH */}
              <div className="detail-karir-row">
                <div className="detail-karir-label">Dibuat Oleh</div>

                <div className="detail-karir-separator">:</div>

                <div className="detail-karir-value">{data.dibuatOleh}</div>
              </div>

              {/* TANGGAL */}
              <div className="detail-karir-row">
                <div className="detail-karir-label">Tanggal dibuat</div>

                <div className="detail-karir-separator">:</div>

                <div className="detail-karir-value">{data.tanggalDibuat}</div>
              </div>

              {/* BUTTON */}
              <div className="detail-karir-actions">
                <button
                  type="button"
                  className="detail-karir-back-button"
                  onClick={() => navigate("/karir")}
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

export default DetailKarir;
