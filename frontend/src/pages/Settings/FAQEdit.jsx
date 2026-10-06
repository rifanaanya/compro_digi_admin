import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./FAQEdit.css";

function FAQEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [notification, setNotification] = useState({
    show: false,
    type: "",
    message: "",
  });

  // =========================
  // NOTIFICATION
  // =========================

  const showNotification = (type, message) => {
    setNotification({
      show: true,
      type,
      message,
    });

    setTimeout(() => {
      setNotification({
        show: false,
        type: "",
        message: "",
      });
    }, 3000);
  };

  // =========================
  // SOUND TING
  // =========================

  const playSuccessSound = () => {
    const audio = new Audio("/sounds/notification.mp3");

    audio.volume = 0.5;
    audio.currentTime = 0;

    audio.play().catch((error) => {
      console.warn("⚠️ Sound notification tidak dapat diputar:", error);
    });
  };

  // =========================
  // GET DETAIL FAQ
  // =========================

  useEffect(() => {
    const fetchFaqDetail = async () => {
      try {
        setLoading(true);

        const response = await fetch(`http://localhost:5000/api/faq/${id}`);

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Gagal mengambil data FAQ");
        }

        setQuestion(data.data.question || "");
        setAnswer(data.data.answer || "");
      } catch (error) {
        console.error("❌ Error mengambil detail FAQ:", error);

        showNotification("error", "Gagal mengambil data FAQ.");

        setTimeout(() => {
          navigate("/settings/faq");
        }, 3000);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqDetail();
  }, [id, navigate]);

  // =========================
  // SIMPAN PERUBAHAN
  // =========================

  const handleSave = async () => {
    // Validasi
    if (!question.trim() || !answer.trim()) {
      showNotification("error", "Pertanyaan dan jawaban wajib diisi.");

      return;
    }

    try {
      setSaving(true);

      const response = await fetch(`http://localhost:5000/api/faq/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question.trim(),
          answer: answer.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal memperbarui FAQ");
      }

      // SOUND
      playSuccessSound();

      // NOTIFICATION
      showNotification("success", "FAQ berhasil diperbarui!");

      // Kembali ke halaman FAQ setelah notification tampil
      setTimeout(() => {
        navigate("/settings/faq");
      }, 3000);
    } catch (error) {
      console.error("❌ Error update FAQ:", error);

      showNotification("error", "Gagal memperbarui FAQ.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="faq-edit-layout">
      <Sidebar />

      <div className="faq-edit-main">
        <Navbar />

        <main className="faq-edit-content">
          {/* =========================
              NOTIFICATION
          ========================= */}

          {notification.show && (
            <div className={`faq-edit-notification ${notification.type}`}>
              {notification.message}
            </div>
          )}

          {/* =========================
              HEADER
          ========================= */}

          <section className="faq-edit-header">
            <h1>Edit FAQ</h1>
          </section>

          {/* =========================
              EDIT CARD
          ========================= */}

          <section className="faq-edit-card">
            <div className="faq-edit-card-title">Edit</div>

            <div className="faq-edit-form">
              {loading ? (
                <p>Memuat data FAQ...</p>
              ) : (
                <>
                  {/* =========================
                      PERTANYAAN
                  ========================= */}

                  <div className="faq-edit-form-group">
                    <label>Pertanyaan</label>

                    <textarea
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      rows="5"
                    />
                  </div>

                  {/* =========================
                      JAWABAN
                  ========================= */}

                  <div className="faq-edit-form-group">
                    <label>Jawaban</label>

                    <textarea
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      rows="5"
                    />
                  </div>

                  {/* =========================
                      SIMPAN
                  ========================= */}

                  <button
                    type="button"
                    className="faq-edit-save-button"
                    onClick={handleSave}
                    disabled={saving}
                  >
                    {saving ? "Menyimpan..." : "Simpan"}
                  </button>
                </>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default FAQEdit;
