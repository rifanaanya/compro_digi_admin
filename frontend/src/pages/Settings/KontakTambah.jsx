import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./KontakTambah.css";

function KontakTambah() {
  const navigate = useNavigate();

  const [namaPengaturan, setNamaPengaturan] = useState("");
  const [isiPengaturan, setIsiPengaturan] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =========================
  // SIMPAN KONTAK
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/kontak", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          namaPengaturan,
          isiPengaturan,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setError(result.message || "Gagal menambahkan data kontak.");
        return;
      }

      // Berhasil → kembali ke halaman Kontak
      navigate("/settings/kontak");
    } catch (error) {
      console.error("POST /api/kontak:", error);

      setError("Tidak dapat terhubung ke server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="kontak-tambah-layout">
      <Sidebar />

      <div className="kontak-tambah-main">
        <Navbar />

        <main className="kontak-tambah-content">
          {/* HEADER */}
          <section className="kontak-tambah-header">
            <h1>Buat Kontak</h1>
          </section>

          {/* CARD */}
          <section className="kontak-tambah-card">
            <div className="kontak-tambah-card-title">Buat</div>

            {/* ERROR */}
            {error && (
              <div
                style={{
                  marginBottom: "20px",
                  padding: "12px 16px",
                  borderRadius: "5px",
                  background: "#ffebee",
                  color: "#c62828",
                  borderLeft: "4px solid #e53935",
                  fontSize: "13px",
                  fontWeight: "600",
                }}
              >
                {error}
              </div>
            )}

            <form className="kontak-tambah-form" onSubmit={handleSubmit}>
              {/* NAMA PENGATURAN */}
              <div className="kontak-tambah-field">
                <label htmlFor="namaPengaturan">Nama Pengaturan</label>

                <input
                  id="namaPengaturan"
                  type="text"
                  value={namaPengaturan}
                  onChange={(e) => setNamaPengaturan(e.target.value)}
                  placeholder="Masukkan Nama Pengaturan"
                  required
                />
              </div>

              {/* ISI PENGATURAN */}
              <div className="kontak-tambah-field">
                <label htmlFor="isiPengaturan">Isi Pengaturan</label>

                <input
                  id="isiPengaturan"
                  type="text"
                  value={isiPengaturan}
                  onChange={(e) => setIsiPengaturan(e.target.value)}
                  placeholder="Masukkan Isi Pengaturan"
                  required
                />
              </div>

              {/* SIMPAN */}
              <button
                type="submit"
                className="kontak-tambah-save-button"
                disabled={loading}
              >
                {loading ? "Menyimpan..." : "Simpan"}
              </button>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}

export default KontakTambah;
