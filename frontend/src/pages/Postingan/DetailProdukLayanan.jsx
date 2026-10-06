import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./DetailProdukLayanan.css";

function DetailProdukLayanan() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [produk, setProduk] = useState(null);

  useEffect(() => {
    const existingData =
      JSON.parse(localStorage.getItem("produkLayananList")) || [];

    const foundData = existingData.find(
      (item) => String(item.id) === String(id),
    );

    setProduk(foundData || null);
  }, [id]);

  // =========================
  // DATA TIDAK DITEMUKAN
  // =========================
  if (!produk) {
    return (
      <div className="admin-layout">
        <Sidebar />

        <div className="admin-main">
          <Navbar />

          <main className="detail-produk-layanan-content">
            <div className="detail-produk-layanan-title-card">
              <h1>Detail Produk Layanan</h1>
            </div>

            <div className="detail-produk-layanan-card">
              <h2>Data tidak ditemukan</h2>

              <button
                type="button"
                className="btn-kembali-detail"
                onClick={() => navigate("/produk-layanan")}
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

        <main className="detail-produk-layanan-content">
          {/* =========================
              PAGE TITLE
          ========================= */}
          <div className="detail-produk-layanan-title-card">
            <h1>Detail Produk Layanan</h1>
          </div>

          {/* =========================
              DETAIL CARD
          ========================= */}
          <div className="detail-produk-layanan-card">
            <div className="detail-card-header">
              <h2>Detail</h2>
            </div>

            <div className="detail-card-body">
              {/* =========================
                  NAMA PRODUK LAYANAN
              ========================= */}
              <div className="detail-row">
                <div className="detail-label">Nama Produk Layanan</div>

                <div className="detail-separator">:</div>

                <div className="detail-value">{produk.nama || "-"}</div>
              </div>

              {/* =========================
                  DESKRIPSI
              ========================= */}
              <div className="detail-row detail-row-description">
                <div className="detail-label">Deskripsi Produk</div>

                <div className="detail-separator">:</div>

                <div className="detail-value">{produk.deskripsi || "-"}</div>
              </div>

              {/* =========================
                  LAYANAN
              ========================= */}
              <div className="detail-row">
                <div className="detail-label">Layanan</div>

                <div className="detail-separator">:</div>

                <div className="detail-value">{produk.layanan || "-"}</div>
              </div>

              {/* =========================
                  PEMISAH
              ========================= */}
              {produk.tools && produk.tools.length > 0 && (
                <div className="detail-divider"></div>
              )}

              {/* =========================
                  TOOLS / KEGIATAN
              ========================= */}
              {produk.tools &&
                produk.tools.map((tool, index) => (
                  <div className="detail-tool" key={tool.id || index}>
                    {/* NAMA TOOLS */}
                    <div className="detail-row">
                      <div className="detail-label">Nama Tools / Kegiatan</div>

                      <div className="detail-separator">:</div>

                      <div className="detail-value">{tool.nama || "-"}</div>
                    </div>

                    {/* LOKASI */}
                    <div className="detail-row">
                      <div className="detail-label">Lokasi</div>

                      <div className="detail-separator">:</div>

                      <div className="detail-value">{tool.lokasi || "-"}</div>
                    </div>

                    {/* GAMBAR */}
                    <div className="detail-row detail-image-row">
                      <div className="detail-label">Gambar Produk</div>

                      <div className="detail-separator">:</div>

                      <div className="detail-value detail-image-value">
                        {tool.gambar ? (
                          <div className="detail-image-wrapper">
                            <img
                              src={tool.gambar}
                              alt={tool.nama || "Gambar Produk"}
                              className="detail-product-image"
                            />

                            <span className="detail-image-name">
                              {tool.nama || "Gambar Produk"}
                            </span>
                          </div>
                        ) : (
                          <span>-</span>
                        )}
                      </div>
                    </div>

                    {/* PEMISAH ANTAR TOOLS */}
                    {index < produk.tools.length - 1 && (
                      <div className="detail-tool-divider"></div>
                    )}
                  </div>
                ))}

              {/* =========================
                  DIBUAT OLEH
              ========================= */}
              <div className="detail-meta">
                <div className="detail-row">
                  <div className="detail-label">Dibuat Oleh</div>

                  <div className="detail-separator">:</div>

                  <div className="detail-value">
                    {produk.dibuatOleh || "Admin Digi"}
                  </div>
                </div>

                {/* =========================
                    TANGGAL
                ========================= */}
                <div className="detail-row">
                  <div className="detail-label">Tanggal dibuat</div>

                  <div className="detail-separator">:</div>

                  <div className="detail-value">
                    {produk.tanggalDibuat || "10-06-2025, 12:00 WIB"}
                  </div>
                </div>
              </div>

              {/* =========================
                  KEMBALI
              ========================= */}
              <button
                type="button"
                className="btn-kembali-detail"
                onClick={() => navigate("/produk-layanan")}
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

export default DetailProdukLayanan;
