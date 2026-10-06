import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./DetailKonfirmasiPostingan.css";

function DetailKonfirmasiPostingan() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Data sementara
  const postinganData = [
    {
      id: 1,
      judul: "Apa itu Bearing?",
      konten:
        "Bearing, yang juga dikenal sebagai laher atau bantalan, adalah komponen mesin yang dirancang untuk mengurangi gesekan antara dua bagian yang bergerak.",
      kontenPendek:
        "Bearing, yang juga dikenal sebagai laher atau bantalan, adalah komponen mesin yang dirancang untuk mengurangi gesekan antara dua bagian yang bergerak.",
      gambar: "/bearing.jpg",
      halaman: "Blog",
      tipe: "blog",
      judulSeo: "Apa itu Bearing?",
      deskripsiSeo:
        "Bearing, yang juga dikenal sebagai laher atau bantalan, adalah komponen mesin yang dirancang untuk mengurangi gesekan antara dua bagian yang bergerak.",
      dibuatOleh: "Admin Digi",
      tanggalDibuat: "10 / 06 / 2025",
      status: "Publish",
    },
    {
      id: 2,
      judul: "Bagaimana Cara Kerja Turbin?",
      konten:
        "Turbin merupakan mesin yang mengubah energi fluida menjadi energi mekanik melalui gerakan putar.",
      kontenPendek:
        "Turbin bekerja dengan memanfaatkan energi fluida untuk menghasilkan gerakan putar.",
      gambar: "/turbin.jpg",
      halaman: "Blog",
      tipe: "blog",
      judulSeo: "Bagaimana Cara Kerja Turbin?",
      deskripsiSeo:
        "Penjelasan mengenai cara kerja turbin dan proses perubahan energi.",
      dibuatOleh: "Admin Digi",
      tanggalDibuat: "10 / 06 / 2025",
      status: "Pending",
    },
  ];

  const postingan = postinganData.find((item) => item.id === Number(id));

  if (!postingan) {
    return (
      <div className="detail-konfirmasi-layout">
        <Sidebar />

        <div className="detail-konfirmasi-main">
          <Navbar />

          <main className="detail-konfirmasi-content">
            <section className="detail-konfirmasi-header">
              <h1>Detail Postingan</h1>
            </section>

            <section className="detail-konfirmasi-card">
              <p>Data postingan tidak ditemukan.</p>

              <button
                type="button"
                className="detail-konfirmasi-back-button"
                onClick={() => navigate("/konfirmasi-postingan")}
              >
                Kembali
              </button>
            </section>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="detail-konfirmasi-layout">
      <Sidebar />

      <div className="detail-konfirmasi-main">
        <Navbar />

        <main className="detail-konfirmasi-content">
          {/* HEADER */}
          <section className="detail-konfirmasi-header">
            <h1>Detail Postingan</h1>
          </section>

          {/* CARD */}
          <section className="detail-konfirmasi-card">
            <div className="detail-konfirmasi-card-title">Detail</div>

            <div className="detail-konfirmasi-card-content">
              {/* JUDUL */}
              <div className="detail-konfirmasi-row">
                <span>Judul</span>
                <b>:</b>
                <p>{postingan.judul}</p>
              </div>

              {/* KONTEN */}
              <div className="detail-konfirmasi-row detail-konfirmasi-content-row">
                <span>Konten</span>
                <b>:</b>
                <p>{postingan.konten}</p>
              </div>

              {/* KONTEN PENDEK */}
              <div className="detail-konfirmasi-row detail-konfirmasi-content-row">
                <span>Konten Pendek</span>
                <b>:</b>
                <p>{postingan.kontenPendek}</p>
              </div>

              {/* GAMBAR */}
              <div className="detail-konfirmasi-row detail-konfirmasi-photo-row">
                <span>Gambar</span>
                <b>:</b>

                <div className="detail-konfirmasi-photo-wrapper">
                  <img src={postingan.gambar} alt={postingan.judul} />

                  <span>{postingan.judul}.png</span>
                </div>
              </div>

              {/* HALAMAN */}
              <div className="detail-konfirmasi-row">
                <span>Halaman</span>
                <b>:</b>
                <p>{postingan.halaman}</p>
              </div>

              {/* TIPE */}
              <div className="detail-konfirmasi-row">
                <span>Tipe</span>
                <b>:</b>
                <p>{postingan.tipe}</p>
              </div>

              {/* JUDUL SEO */}
              <div className="detail-konfirmasi-row">
                <span>Judul SEO</span>
                <b>:</b>
                <p>{postingan.judulSeo}</p>
              </div>

              {/* DESKRIPSI SEO */}
              <div className="detail-konfirmasi-row detail-konfirmasi-content-row">
                <span>Deskripsi SEO</span>
                <b>:</b>
                <p>{postingan.deskripsiSeo}</p>
              </div>

              {/* DIBUAT OLEH */}
              <div className="detail-konfirmasi-row">
                <span>Dibuat Oleh</span>
                <b>:</b>
                <p>{postingan.dibuatOleh}</p>
              </div>

              {/* TANGGAL */}
              <div className="detail-konfirmasi-row">
                <span>Tanggal Dibuat</span>
                <b>:</b>
                <p>{postingan.tanggalDibuat}</p>
              </div>

              {/* STATUS */}
              <div className="detail-konfirmasi-row">
                <span>Status</span>
                <b>:</b>
                <p>{postingan.status}</p>
              </div>

              {/* BUTTON */}
              <div className="detail-konfirmasi-buttons">
                <button
                  type="button"
                  className="detail-konfirmasi-back-button"
                  onClick={() => navigate("/konfirmasi-postingan")}
                >
                  Kembali
                </button>

                <button
                  type="button"
                  className="detail-konfirmasi-preview-button"
                >
                  Pratinjau
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default DetailKonfirmasiPostingan;
