import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./FAQTambah.css";

function FAQTambah() {
  const navigate = useNavigate();

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

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
  // SIMPAN FAQ
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi
    if (!question.trim() || !answer.trim()) {
      showNotification("error", "Pertanyaan dan jawaban wajib diisi.");
      return;
    }

    try {
      setSaving(true);

      const response = await fetch("http://localhost:5000/api/faq", {
        method: "POST",
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
        throw new Error(data.message || "Gagal menambahkan FAQ");
      }

      // SOUND
      playSuccessSound();

      // NOTIFICATION
      showNotification("success", "FAQ berhasil ditambahkan!");

      // Kembali ke halaman FAQ setelah notification tampil
      setTimeout(() => {
        navigate("/settings/faq");
      }, 3000);
    } catch (error) {
      console.error("❌ Error menambahkan FAQ:", error);

      showNotification("error", "Gagal menambahkan FAQ.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="faq-tambah-layout">
      <Sidebar />

      <div className="faq-tambah-main">
        <Navbar />

        <main className="faq-tambah-content">
          {/* =========================
              NOTIFICATION
          ========================= */}

          {notification.show && (
            <div className={`faq-tambah-notification ${notification.type}`}>
              {notification.message}
            </div>
          )}

          {/* =========================
              HEADER
          ========================= */}

          <section className="faq-tambah-header">
            <h1>Tambah FAQ</h1>
          </section>

          {/* =========================
              FORM CARD
          ========================= */}

          <section className="faq-tambah-card">
            <div className="faq-tambah-card-title">Tambah</div>

            <form className="faq-tambah-form" onSubmit={handleSubmit}>
              {/* =========================
                  PERTANYAAN
              ========================= */}

              <div className="faq-tambah-field">
                <label htmlFor="question">Pertanyaan</label>

                <textarea
                  id="question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Masukkan Pertanyaan"
                  required
                />
              </div>

              {/* =========================
                  JAWABAN
              ========================= */}

              <div className="faq-tambah-field">
                <label htmlFor="answer">Jawaban</label>

                <textarea
                  id="answer"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Masukkan Jawaban"
                  required
                />
              </div>

              {/* =========================
                  SIMPAN
              ========================= */}

              <button
                type="submit"
                className="faq-tambah-save-button"
                disabled={saving}
              >
                {saving ? "Menyimpan..." : "Simpan"}
              </button>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}

export default FAQTambah;
