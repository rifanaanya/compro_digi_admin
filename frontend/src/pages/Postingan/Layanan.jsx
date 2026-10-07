import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./Layanan.css";

function Layanan() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [layananList, setLayananList] = useState([]);

  useEffect(() => {
    fetchLayanan();
  }, []);

  const fetchLayanan = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/layanan-data");
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Gagal mengambil data layanan");
      }

      setLayananList(result.data);
    } catch (error) {
      console.error("❌ Gagal mengambil data layanan:", error);
    }
  };

  const filteredLayanan = layananList.filter(
    (item) =>
      item.judul.toLowerCase().includes(search.toLowerCase()) ||
      item.deskripsi.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDelete = (id) => {
    const layanan = layananList.find((item) => item.id === id);

    setSelectedLayanan(layanan);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedLayanan) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/layanan-data/${selectedLayanan.id}`,
        {
          method: "DELETE",
        },
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Gagal menghapus layanan");
      }

      setLayananList((prev) =>
        prev.filter((item) => item.id !== selectedLayanan.id),
      );

      setSelectedLayanan(null);
      setShowDeleteModal(false);

      alert("Layanan berhasil dihapus.");
    } catch (error) {
      console.error("❌ Gagal menghapus layanan:", error);
      alert(error.message || "Gagal menghapus layanan.");
    }
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedLayanan, setSelectedLayanan] = useState(null);

  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="admin-main">
        <Navbar />

        <main className="layanan-content">
          {/* =========================
              PAGE TITLE
          ========================= */}

          <div className="layanan-title-card">
            <h1>List Layanan</h1>
          </div>

          {/* =========================
              CONTENT
          ========================= */}

          <div className="layanan-card">
            <h2>Semua Layanan</h2>

            {/* =========================
                TOOLBAR
            ========================= */}

            <div className="layanan-toolbar">
              <button
                type="button"
                className="btn-tambah-layanan"
                onClick={() => navigate("/layanan/tambah")}
              >
                Tambah Layanan
              </button>

              <div className="layanan-search">
                <input
                  type="text"
                  placeholder="Cari"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                <span>⌕</span>
              </div>
            </div>

            {/* =========================
                TABLE
            ========================= */}

            <div className="layanan-table-wrapper">
              <table className="layanan-table">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Judul</th>
                    <th>Deskripsi</th>
                    <th>Gambar</th>
                    <th>Tipe</th>
                    <th>Aksi</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredLayanan.length > 0 ? (
                    filteredLayanan.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>

                        <td>{item.judul}</td>

                        <td className="layanan-deskripsi">{item.deskripsi}</td>

                        <td>
                          <img
                            src={
                              item.gambar
                                ? `http://localhost:5000${item.gambar}`
                                : ""
                            }
                            alt={item.judul}
                            className="layanan-image"
                          />
                        </td>

                        <td>{item.tipe}</td>

                        <td>
                          <div className="layanan-actions">
                            <button
                              type="button"
                              className="layanan-detail-btn"
                              onClick={() =>
                                navigate(`/layanan/detail/${item.id}`, {
                                  state: {
                                    layanan: item,
                                  },
                                })
                              }
                            >
                              Detail
                            </button>

                            <button
                              type="button"
                              className="layanan-edit-btn"
                              onClick={() =>
                                navigate(`/layanan/edit/${item.id}`, {
                                  state: {
                                    layanan: item,
                                  },
                                })
                              }
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              className="layanan-delete-btn"
                              onClick={() => handleDelete(item.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="layanan-empty-message">
                        Tidak ada layanan ditemukan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {showDeleteModal && (
            <div className="delete-modal-overlay">
              <div className="delete-modal">
                <div className="delete-modal-header">
                  <h2>Hapus</h2>

                  <button
                    type="button"
                    className="delete-modal-close"
                    onClick={() => {
                      setShowDeleteModal(false);
                      setSelectedLayanan(null);
                    }}
                  >
                    ×
                  </button>
                </div>

                <div className="delete-modal-body">
                  <h3>Apakah anda yakin akan menghapus data?</h3>

                  <p>Jika data dihapus, maka akan hilang secara permanen</p>

                  <div className="delete-modal-actions">
                    <button
                      type="button"
                      className="delete-back-btn"
                      onClick={() => {
                        setShowDeleteModal(false);
                        setSelectedLayanan(null);
                      }}
                    >
                      Kembali
                    </button>

                    <button
                      type="button"
                      className="delete-confirm-btn"
                      onClick={confirmDelete}
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Layanan;
