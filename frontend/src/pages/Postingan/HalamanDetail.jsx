import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./HalamanDetail.css";

function HalamanDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const dataHalaman = {
    1: {
      judul: "Blog",
      halaman: "Blog",
      tipe: "List",
      menu: "blog",
      judulSeo: "Blog",
      deskripsiSeo: "Blog",
      dibuatOleh: "Admin Digi",
      tanggalDibuat: "10/06/2025",
      status: "Publish",
    },
    2: {
      judul: "FAQ",
      halaman: "FAQ",
      tipe: "Post Grid",
      menu: "faq",
      judulSeo: "FAQ",
      deskripsiSeo: "FAQ",
      dibuatOleh: "Admin Digi",
      tanggalDibuat: "10/06/2025",
      status: "Publish",
    },
    3: {
      judul: "Home - Tentang Digi",
      halaman: "Home - Tentang Digi",
      tipe: "Default",
      menu: "tentang-digi",
      judulSeo: "Home - Tentang Digi",
      deskripsiSeo: "Home - Tentang Digi",
      dibuatOleh: "Admin Digi",
      tanggalDibuat: "10/06/2025",
      status: "Pending",
    },
    4: {
      judul: "Karir",
      halaman: "Karir",
      tipe: "Default",
      menu: "karir",
      judulSeo: "Karir",
      deskripsiSeo: "Karir",
      dibuatOleh: "Admin Digi",
      tanggalDibuat: "10/06/2025",
      status: "Pending",
    },
    5: {
      judul: "Kegiatan",
      halaman: "Kegiatan",
      tipe: "Pict",
      menu: "kegiatan",
      judulSeo: "Kegiatan",
      deskripsiSeo: "Kegiatan",
      dibuatOleh: "Admin Digi",
      tanggalDibuat: "10/06/2025",
      status: "Publish",
    },
    6: {
      judul: "Layanan",
      halaman: "Layanan",
      tipe: "Post Grid",
      menu: "layanan",
      judulSeo: "Layanan",
      deskripsiSeo: "Layanan",
      dibuatOleh: "Admin Digi",
      tanggalDibuat: "10/06/2025",
      status: "Publish",
    },
    7: {
      judul: "Mitra",
      halaman: "Mitra",
      tipe: "Post Grid",
      menu: "mitra",
      judulSeo: "Mitra",
      deskripsiSeo: "Mitra",
      dibuatOleh: "Admin Digi",
      tanggalDibuat: "10/06/2025",
      status: "Pending",
    },
    8: {
      judul: "Produk",
      halaman: "Produk",
      tipe: "List",
      menu: "produk",
      judulSeo: "Produk",
      deskripsiSeo: "Produk",
      dibuatOleh: "Admin Digi",
      tanggalDibuat: "10/06/2025",
      status: "Publish",
    },
    9: {
      judul: "Sertifikasi",
      halaman: "Sertifikasi",
      tipe: "Pict",
      menu: "sertifikasi",
      judulSeo: "Sertifikasi",
      deskripsiSeo: "Sertifikasi",
      dibuatOleh: "Admin Digi",
      tanggalDibuat: "10/06/2025",
      status: "Pending",
    },
    10: {
      judul: "Visi Misi",
      halaman: "Visi Misi",
      tipe: "Default",
      menu: "visi-misi",
      judulSeo: "Visi Misi",
      deskripsiSeo: "Visi Misi",
      dibuatOleh: "Admin Digi",
      tanggalDibuat: "10/06/2025",
      status: "Publish",
    },
  };

  const data = dataHalaman[id];

  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="admin-main">
        <Navbar />

        <main className="halaman-detail-content">
          {/* TITLE */}
          <div className="halaman-detail-title-card">
            <h1>Detail Postingan</h1>
          </div>

          {/* DETAIL */}
          <div className="halaman-detail-card">
            <div className="halaman-detail-header">
              <h2>Detail</h2>
            </div>

            {data ? (
              <div className="halaman-detail-body">
                <div className="detail-row">
                  <span className="detail-label">Judul</span>
                  <span className="detail-separator">:</span>
                  <span className="detail-value">{data.judul}</span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Halaman</span>
                  <span className="detail-separator">:</span>
                  <span className="detail-value">{data.halaman}</span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Tipe</span>
                  <span className="detail-separator">:</span>
                  <span className="detail-value">{data.tipe}</span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Menu</span>
                  <span className="detail-separator">:</span>
                  <span className="detail-value">{data.menu}</span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Judul SEO</span>
                  <span className="detail-separator">:</span>
                  <span className="detail-value">{data.judulSeo}</span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Deskripsi SEO</span>
                  <span className="detail-separator">:</span>
                  <span className="detail-value">{data.deskripsiSeo}</span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Dibuat Oleh</span>
                  <span className="detail-separator">:</span>
                  <span className="detail-value">{data.dibuatOleh}</span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Tanggal Dibuat</span>
                  <span className="detail-separator">:</span>
                  <span className="detail-value">{data.tanggalDibuat}</span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Status</span>
                  <span className="detail-separator">:</span>
                  <span className="detail-value">{data.status}</span>
                </div>

                <button
                  className="halaman-detail-kembali"
                  onClick={() => navigate("/konfirmasi-postingan")}
                >
                  Kembali
                </button>
              </div>
            ) : (
              <div className="halaman-detail-body">
                <p>Data halaman tidak ditemukan.</p>

                <button
                  className="halaman-detail-kembali"
                  onClick={() => navigate("/konfirmasi-postingan")}
                >
                  Kembali
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default HalamanDetail;
