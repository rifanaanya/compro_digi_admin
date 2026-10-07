import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./Kegiatan.css";

function Kegiatan() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [kegiatanData, setKegiatanData] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  const getMediaUrl = (media) => {
    if (!media) return "";

    if (media.startsWith("http")) {
      return media;
    }

    return `http://localhost:5000${media}`;
  };

  // ========================================
  // AMBIL DATA KEGIATAN DARI API
  // ========================================

  useEffect(() => {
    const fetchKegiatan = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/postingan/kegiatan",
        );

        const result = await response.json();

        if (result.success) {
          setKegiatanData(result.data);
        } else {
          console.error("Gagal mengambil data kegiatan");
        }
      } catch (error) {
        console.error("Error mengambil data kegiatan:", error);
      }
    };

    fetchKegiatan();
  }, []);

  // ========================================
  // FORMAT TANGGAL
  // ========================================

  const formatTanggal = (tanggal) => {
    if (!tanggal) return "-";

    const date = new Date(tanggal);

    if (isNaN(date.getTime())) return "-";

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day} / ${month} / ${year}`;
  };

  // ========================================
  // SEARCH
  // ========================================

  const filteredData = kegiatanData.filter((item) =>
    `${item.deskripsi} ${item.tipe} ${formatTanggal(item.tanggal)}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  // ========================================
  // TAMBAH
  // ========================================

  const handleTambah = () => {
    navigate("/kegiatan/tambah");
  };

  // ========================================
  // DETAIL
  // ========================================

  const handleDetail = (id) => {
    navigate(`/kegiatan/detail/${id}`);
  };

  // ========================================
  // EDIT
  // ========================================

  const handleEdit = (id) => {
    navigate(`/kegiatan/edit/${id}`);
  };

  // ========================================
  // DELETE
  // ========================================

  const handleDelete = (id) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/postingan/kegiatan/${deleteId}`,
        {
          method: "DELETE",
        },
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Gagal menghapus kegiatan");
      }

      setKegiatanData((prevData) =>
        prevData.filter((item) => item.id !== deleteId),
      );

      setDeleteId(null);
    } catch (error) {
      console.error("Error menghapus kegiatan:", error);
      alert("Gagal menghapus kegiatan");
    }
  };

  const cancelDelete = () => {
    setDeleteId(null);
  };

  return (
    <div className="kegiatan-layout">
      <Sidebar />

      <div className="kegiatan-main">
        <Navbar />

        <main className="kegiatan-content">
          {/* HEADER */}
          <section className="kegiatan-header">
            <h1>List Kegiatan</h1>
          </section>

          {/* CARD */}
          <section className="kegiatan-card">
            <div className="kegiatan-card-title">Semua Kegiatan</div>

            <div className="kegiatan-card-content">
              {/* TOP ACTION */}
              <div className="kegiatan-top-action">
                <button
                  type="button"
                  className="kegiatan-add-button"
                  onClick={handleTambah}
                >
                  Tambah Kegiatan
                </button>

                <div className="kegiatan-search">
                  <input
                    type="text"
                    placeholder="Cari"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              {/* TABLE */}
              <div className="kegiatan-table-wrapper">
                <table className="kegiatan-table">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Deskripsi Kegiatan</th>
                      <th>Tipe</th>
                      <th>Tanggal Kegiatan</th>
                      <th>Foto Kegiatan</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredData.length > 0 ? (
                      filteredData.map((item) => (
                        <tr key={item.id}>
                          <td>{item.id}</td>

                          <td className="kegiatan-description">
                            {item.deskripsi}
                          </td>

                          <td>{item.tipe}</td>

                          <td>{formatTanggal(item.tanggal)}</td>

                          <td>
                            <div className="kegiatan-photo">
                              {item.tipe === "Video" ? (
                                <video
                                  src={getMediaUrl(item.media)}
                                  className="kegiatan-video"
                                  controls
                                  preload="metadata"
                                />
                              ) : (
                                <img
                                  src={getMediaUrl(item.media)}
                                  alt={item.deskripsi}
                                  className="kegiatan-image"
                                />
                              )}
                            </div>
                          </td>

                          <td className="kegiatan-actions">
                            <button
                              type="button"
                              className="kegiatan-detail-button"
                              onClick={() => handleDetail(item.id)}
                            >
                              Detail
                            </button>

                            <button
                              type="button"
                              className="kegiatan-edit-button"
                              onClick={() => handleEdit(item.id)}
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              className="kegiatan-delete-button"
                              onClick={() => handleDelete(item.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="kegiatan-empty">
                          Data tidak ditemukan
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </main>

        {/* =========================
    DELETE MODAL
========================= */}
        {deleteId !== null && (
          <div className="kegiatan-delete-overlay" onClick={cancelDelete}>
            <div
              className="kegiatan-delete-modal"
              onClick={(e) => e.stopPropagation()}
            >
              {/* MODAL HEADER */}
              <div className="kegiatan-delete-modal-header">
                <h2>Hapus</h2>

                <button
                  type="button"
                  className="kegiatan-delete-close"
                  onClick={cancelDelete}
                >
                  ×
                </button>
              </div>

              {/* MODAL BODY */}
              <div className="kegiatan-delete-modal-body">
                <p className="kegiatan-delete-question">
                  Apakah anda yakin akan menghapus data?
                </p>

                <p className="kegiatan-delete-description">
                  Jika data dihapus, maka akan hilang secara permanen
                </p>

                <div className="kegiatan-delete-modal-actions">
                  <button
                    type="button"
                    className="kegiatan-delete-cancel"
                    onClick={cancelDelete}
                  >
                    Kembali
                  </button>

                  <button
                    type="button"
                    className="kegiatan-delete-confirm"
                    onClick={confirmDelete}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Kegiatan;
