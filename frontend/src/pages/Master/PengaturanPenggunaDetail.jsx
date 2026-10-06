import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import profileUser from "../../assets/icons/profile-user.svg";

import "./PengaturanPenggunaDetail.css";

function PengaturanPenggunaDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [pengguna, setPengguna] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPengguna = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/pengguna/${id}`,
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Gagal mengambil detail pengguna");
        }

        setPengguna(data.pengguna);
      } catch (error) {
        console.error("❌ Error fetch detail pengguna:", error);
        setPengguna(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPengguna();
  }, [id]);

  return (
    <div className="pengguna-detail-layout">
      <Sidebar />

      <div className="pengguna-detail-main">
        <Navbar />

        <main className="pengguna-detail-content">
          {/* HEADER */}
          <section className="pengguna-detail-header">
            <h1>Detail Pengguna</h1>
          </section>

          {/* CARD */}
          <section className="pengguna-detail-card">
            <div className="pengguna-detail-card-title">Detail</div>

            <div className="pengguna-detail-card-content">
              {loading ? (
                <div className="pengguna-detail-not-found">
                  Memuat data pengguna...
                </div>
              ) : pengguna ? (
                <>
                  {/* FOTO */}
                  <div className="pengguna-detail-photo">
                    <img
                      src={profileUser}
                      alt="Profile"
                      className="pengguna-detail-profile-icon"
                    />
                  </div>

                  {/* DATA */}
                  <div className="pengguna-detail-info">
                    <div className="pengguna-detail-row">
                      <span>Nama</span>
                      <b>:</b>
                      <p>{pengguna.nama}</p>
                    </div>

                    <div className="pengguna-detail-row">
                      <span>Email</span>
                      <b>:</b>
                      <p>{pengguna.email}</p>
                    </div>

                    <div className="pengguna-detail-row">
                      <span>No. Telepon</span>
                      <b>:</b>
                      <p>{pengguna.telepon}</p>
                    </div>

                    <div className="pengguna-detail-row">
                      <span>Role</span>
                      <b>:</b>
                      <p>{pengguna.role}</p>
                    </div>
                  </div>

                  {/* KEMBALI */}
                  <button
                    type="button"
                    className="pengguna-detail-back-button"
                    onClick={() => navigate("/master/pengaturan-pengguna")}
                  >
                    Kembali
                  </button>
                </>
              ) : (
                <div className="pengguna-detail-not-found">
                  Data pengguna tidak ditemukan
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default PengaturanPenggunaDetail;
