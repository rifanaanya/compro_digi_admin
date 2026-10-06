import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./Tipe.css";

function Tipe() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [tipeList, setTipeList] = useState([
    {
      id: 1,
      tipe: "List",
      menu: "Layanan, FAQ",
    },
    {
      id: 2,
      tipe: "Grid",
      menu: "Blog",
    },
    {
      id: 3,
      tipe: "Default",
      menu: "Visi Misi",
    },
    {
      id: 4,
      tipe: "Album",
      menu: "Kegiatan, Sertifikat",
    },
    {
      id: 5,
      tipe: "Karir",
      menu: "Karir",
    },
    {
      id: 6,
      tipe: "Produk",
      menu: "Produk",
    },
    {
      id: 7,
      tipe: "Produk Layanan",
      menu: "Produk Layanan",
    },
    {
      id: 8,
      tipe: "Mitra",
      menu: "Mitra",
    },
  ]);

  // =========================
  // DELETE MODAL
  // =========================

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTipe, setSelectedTipe] = useState(null);

  // =========================
  // SEARCH
  // =========================

  const filteredTipe = tipeList.filter(
    (item) =>
      item.tipe.toLowerCase().includes(search.toLowerCase()) ||
      item.menu.toLowerCase().includes(search.toLowerCase()),
  );

  // =========================
  // BUKA MODAL DELETE
  // =========================

  const handleDeleteClick = (item) => {
    setSelectedTipe(item);
    setShowDeleteModal(true);
  };

  // =========================
  // TUTUP MODAL
  // =========================

  const handleCloseDelete = () => {
    setShowDeleteModal(false);
    setSelectedTipe(null);
  };

  // =========================
  // KONFIRMASI DELETE
  // =========================

  const handleDelete = () => {
    if (!selectedTipe) return;

    setTipeList((prev) => prev.filter((item) => item.id !== selectedTipe.id));

    setShowDeleteModal(false);
    setSelectedTipe(null);
  };

  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="admin-main">
        <Navbar />

        <main className="tipe-postingan-content">
          {/* =========================
              PAGE TITLE
          ========================= */}

          <div className="tipe-title-card">
            <h1>Tipe Postingan</h1>
          </div>

          {/* =========================
              CONTENT
          ========================= */}

          <div className="tipe-card">
            <h2>Semua Tipe</h2>

            {/* =========================
                TOOLBAR
            ========================= */}

            <div className="tipe-toolbar">
              <button
                type="button"
                className="btn-tambah-tipe"
                onClick={() => navigate("/tipe/tambah")}
              >
                Tambah Tipe
              </button>

              <div className="tipe-search">
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

            <div className="tipe-table-wrapper">
              <table className="tipe-table">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Tipe</th>
                    <th>Menu</th>
                    <th>Aksi</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredTipe.length > 0 ? (
                    filteredTipe.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>

                        <td>{item.tipe}</td>

                        <td>{item.menu}</td>

                        <td>
                          <div className="tipe-actions">
                            {/* EDIT */}

                            <button
                              type="button"
                              className="tipe-edit-btn"
                              onClick={() => navigate(`/tipe/edit/${item.id}`)}
                            >
                              Edit
                            </button>

                            {/* DELETE */}

                            <button
                              type="button"
                              className="tipe-delete-btn"
                              onClick={() => handleDeleteClick(item)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="tipe-empty-message">
                        Tidak ada tipe ditemukan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        {/* =========================
            DELETE MODAL
        ========================= */}

        {showDeleteModal && (
          <div className="delete-modal-overlay">
            <div className="delete-modal">
              {/* HEADER */}

              <div className="delete-modal-header">
                <h2>Hapus</h2>

                <button
                  type="button"
                  className="delete-modal-close"
                  onClick={handleCloseDelete}
                >
                  ×
                </button>
              </div>

              {/* BODY */}

              <div className="delete-modal-body">
                <h3>Apakah anda yakin akan menghapus data?</h3>

                <p>Jika data dihapus, maka akan hilang secara permanen</p>

                {/* ACTION */}

                <div className="delete-modal-actions">
                  <button
                    type="button"
                    className="delete-cancel-btn"
                    onClick={handleCloseDelete}
                  >
                    Kembali
                  </button>

                  <button
                    type="button"
                    className="delete-confirm-btn"
                    onClick={handleDelete}
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

export default Tipe;
