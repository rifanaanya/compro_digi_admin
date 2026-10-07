import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./DetailArtikel.css";

function DetailArtikel() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [artikel, setArtikel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtikel = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/artikel/${id}`);

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Gagal mengambil detail artikel");
        }

        setArtikel(result.data);
      } catch (error) {
        console.error("❌ Gagal mengambil detail artikel:", error);
        setArtikel(null);
      } finally {
        setLoading(false);
      }
    };

    fetchArtikel();
  }, [id]);

  if (loading) {
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
                Memuat data artikel...
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

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
                    src={
                      artikel.gambar
                        ? `http://localhost:5000${artikel.gambar}`
                        : ""
                    }
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

                <div className="detail-artikel-value">
                  {artikel.createdAt
                    ? new Date(artikel.createdAt).toLocaleString("id-ID", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "-"}
                </div>
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
