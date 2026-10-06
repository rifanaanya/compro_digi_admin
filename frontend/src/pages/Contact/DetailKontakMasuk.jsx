import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import "./DetailKontakMasuk.css";

function DetailKontakMasuk() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/kontak-masuk/${id}`,
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Gagal mengambil detail pesan.");
        }

        setMessage(result.data);
      } catch (error) {
        console.error("❌ Error mengambil detail Kontak Masuk:", error);
        setMessage(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMessage();
  }, [id]);

  if (loading) {
    return (
      <div className="admin-layout">
        <Sidebar />

        <div className="admin-main">
          <Navbar />

          <main className="detail-kontak-content">
            <div className="page-title-card">
              <h1>Detail Pesan Masuk</h1>
            </div>

            <div className="detail-kontak-card">
              <h2>Detail</h2>
              <p>Memuat data pesan...</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (!message) {
    return (
      <div className="admin-layout">
        <Sidebar />

        <div className="admin-main">
          <Navbar />

          <main className="detail-kontak-content">
            <div className="page-title-card">
              <h1>Detail Pesan Masuk</h1>
            </div>

            <div className="detail-kontak-card">
              <h2>Detail</h2>

              <p>Pesan tidak ditemukan.</p>

              <button
                className="btn-kembali"
                onClick={() => navigate("/kontak-masuk")}
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

        <main className="detail-kontak-content">
          <div className="page-title-card">
            <h1>Detail Pesan Masuk</h1>
          </div>

          <div className="detail-kontak-card">
            <h2>Detail</h2>

            <div className="detail-body">
              <div className="detail-row">
                <span className="detail-label">Nama Pengirim</span>
                <span className="detail-separator">:</span>
                <span>{message.nama}</span>
              </div>

              <div className="detail-row">
                <span className="detail-label">Email</span>
                <span className="detail-separator">:</span>
                <span>{message.email}</span>
              </div>

              <div className="detail-row">
                <span className="detail-label">Pesan</span>
                <span className="detail-separator">:</span>
                <span>{message.pesan}</span>
              </div>

              <div className="detail-row">
                <span className="detail-label">Tanggal Kirim</span>
                <span className="detail-separator">:</span>
                <span>
                  {new Date(message.createdAt).toLocaleString("id-ID")}
                </span>
              </div>
            </div>

            <div className="detail-actions">
              <button
                className="btn-kembali"
                onClick={() => navigate("/kontak-masuk")}
              >
                Kembali
              </button>

              <button
                className="btn-email"
                onClick={() => {
                  const gmailUrl =
                    `https://mail.google.com/mail/?view=cm&fs=1` +
                    `&to=${encodeURIComponent(message.email)}` +
                    `&su=${encodeURIComponent("Re: Pesan dari Digi Tekno Indonesia")}`;

                  window.open(gmailUrl, "_blank");
                }}
              >
                Kirim Email
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DetailKontakMasuk;
