import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./FAQDetail.css";

function FAQDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [faq, setFaq] = useState(null);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // AMBIL DETAIL FAQ DARI DATABASE
  // ==========================================

  useEffect(() => {
    const fetchFaqDetail = async () => {
      try {
        setLoading(true);

        const response = await fetch(`http://localhost:5000/api/faq/${id}`);

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Gagal mengambil detail FAQ");
        }

        setFaq(data.data);
      } catch (error) {
        console.error("❌ Error mengambil detail FAQ:", error);

        alert(error.message || "Gagal mengambil detail FAQ.");

        navigate("/settings/faq");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchFaqDetail();
    }
  }, [id, navigate]);

  // ==========================================
  // FORMAT TANGGAL
  // ==========================================

  const formatTanggal = (tanggal) => {
    if (!tanggal) {
      return "-";
    }

    const date = new Date(tanggal);

    return (
      new Intl.DateTimeFormat("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(date) + " WIB"
    );
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="faq-detail-layout">
        <Sidebar />

        <div className="faq-detail-main">
          <Navbar />

          <main className="faq-detail-content">
            <section className="faq-detail-header">
              <h1>Detail FAQ</h1>
            </section>

            <section className="faq-detail-card">
              <div className="faq-detail-card-title">Detail</div>

              <div className="faq-detail-info">
                <p>Memuat data FAQ...</p>
              </div>
            </section>
          </main>
        </div>
      </div>
    );
  }

  // ==========================================
  // JIKA DATA TIDAK ADA
  // ==========================================

  if (!faq) {
    return null;
  }

  // ==========================================
  // RETURN
  // ==========================================

  return (
    <div className="faq-detail-layout">
      <Sidebar />

      <div className="faq-detail-main">
        <Navbar />

        <main className="faq-detail-content">
          {/* HEADER */}

          <section className="faq-detail-header">
            <h1>Detail FAQ</h1>
          </section>

          {/* DETAIL CARD */}

          <section className="faq-detail-card">
            <div className="faq-detail-card-title">Detail</div>

            <div className="faq-detail-info">
              {/* PERTANYAAN */}

              <div className="faq-detail-row">
                <span className="faq-detail-label">Pertanyaan</span>

                <span className="faq-detail-colon">:</span>

                <span className="faq-detail-value">{faq.question}</span>
              </div>

              {/* JAWABAN */}

              <div className="faq-detail-row">
                <span className="faq-detail-label">Jawaban</span>

                <span className="faq-detail-colon">:</span>

                <span className="faq-detail-value">{faq.answer}</span>
              </div>

              {/* DIBUAT OLEH */}

              <div className="faq-detail-row">
                <span className="faq-detail-label">Dibuat Oleh</span>

                <span className="faq-detail-colon">:</span>

                <span className="faq-detail-value">Admin Digi</span>
              </div>

              {/* TERAKHIR DIPERBARUI */}

              <div className="faq-detail-row">
                <span className="faq-detail-label">Terakhir diperbarui</span>

                <span className="faq-detail-colon">:</span>

                <span className="faq-detail-value">
                  {formatTanggal(faq.updatedAt)}
                </span>
              </div>

              {/* KEMBALI */}

              <button
                type="button"
                className="faq-back-button"
                onClick={() => navigate("/settings/faq")}
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

export default FAQDetail;
