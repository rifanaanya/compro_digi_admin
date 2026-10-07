import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./Artikel.css";

function Artikel() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [artikelData, setArtikelData] = useState([]);

  useEffect(() => {
    fetchArtikel();
  }, []);

  const fetchArtikel = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/artikel");

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Gagal mengambil data artikel");
      }

      console.log("📦 Data artikel dari API:", result.data);

      setArtikelData(result.data);
    } catch (error) {
      console.error("❌ Gagal mengambil data artikel:", error);
    }
  };

  const filteredData = artikelData.filter((item) =>
    item.judul.toLowerCase().includes(search.toLowerCase()),
  );

  const itemsPerPage = 3;

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleDelete = (id) => {
    setSelectedDeleteId(id);
    setDeleteModal(true);
  };

  const handleCancelDelete = () => {
    setDeleteModal(false);
    setSelectedDeleteId(null);
  };

  const handleConfirmDelete = () => {
    setArtikelData((prev) =>
      prev.filter((item) => item.id !== selectedDeleteId),
    );

    setDeleteModal(false);
    setSelectedDeleteId(null);
  };

  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="admin-main">
        <Navbar />

        <main className="artikel-content">
          {/* =================================
              PAGE TITLE
          ================================= */}

          <div className="artikel-title-card">
            <h1>Artikel</h1>
          </div>

          {/* =================================
              ARTICLE CARD
          ================================= */}

          <div className="artikel-card">
            <div className="artikel-card-header">
              <h2>Daftar Artikel</h2>
            </div>

            {/* TOOLBAR */}

            <div className="artikel-toolbar">
              <button
                type="button"
                className="artikel-add-button"
                onClick={() => navigate("/artikel/tambah")}
              >
                Tambah Artikel
              </button>

              <div className="artikel-search">
                <input
                  type="text"
                  placeholder="Cari"
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                />

                <Search size={13} />
              </div>
            </div>

            {/* =================================
                TABLE
            ================================= */}

            <div className="artikel-table-wrapper">
              <table className="artikel-table">
                <thead>
                  <tr>
                    <th className="artikel-no-column">No.</th>

                    <th className="artikel-title-column">Judul Artikel</th>

                    <th className="artikel-author-column">Penulis</th>

                    <th className="artikel-date-column">Tanggal</th>

                    <th className="artikel-image-column">Gambar</th>

                    <th className="artikel-action-column">Aksi</th>
                  </tr>
                </thead>

                <tbody>
                  {currentData.length > 0 ? (
                    currentData.map((item, index) => (
                      <tr key={item.id}>
                        <td className="artikel-no">{startIndex + index + 1}</td>

                        <td className="artikel-title">{item.judul}</td>

                        <td className="artikel-author">{item.penulis}</td>

                        <td className="artikel-date">
                          {item.createdAt
                            ? new Date(item.createdAt).toLocaleDateString(
                                "id-ID",
                              )
                            : "-"}
                        </td>

                        <td className="artikel-image">
                          <img
                            src={
                              item.gambar
                                ? `http://localhost:5000${item.gambar}`
                                : ""
                            }
                            alt={item.judul}
                          />
                        </td>

                        <td className="artikel-actions">
                          <button
                            type="button"
                            className="artikel-detail-btn"
                            onClick={() =>
                              navigate(`/artikel/detail/${item.id}`)
                            }
                          >
                            Detail
                          </button>
                          <button
                            type="button"
                            className="artikel-edit-button"
                            onClick={() => navigate(`/artikel/edit/${item.id}`)}
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            className="artikel-delete-button"
                            onClick={() => handleDelete(item.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="artikel-empty">
                        Data artikel tidak ditemukan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* =================================
                PAGINATION
            ================================= */}

            <div className="artikel-pagination">
              <button
                type="button"
                className="artikel-pagination-arrow"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                ‹
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <button
                    type="button"
                    key={page}
                    className={`artikel-pagination-number ${
                      currentPage === page ? "active" : ""
                    }`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ),
              )}

              <button
                type="button"
                className="artikel-pagination-arrow"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
              >
                ›
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* =================================
          DELETE MODAL
      ================================= */}

      {deleteModal && (
        <div className="artikel-delete-overlay">
          <div className="artikel-delete-modal">
            <div className="artikel-delete-modal-header">
              <h2>Hapus</h2>

              <button
                type="button"
                className="artikel-delete-close"
                onClick={handleCancelDelete}
              >
                ×
              </button>
            </div>

            <div className="artikel-delete-modal-content">
              <p className="artikel-delete-question">
                Apakah anda yakin akan menghapus data?
              </p>

              <p className="artikel-delete-description">
                Jika data dihapus, maka akan hilang secara permanen
              </p>

              <div className="artikel-delete-modal-actions">
                <button
                  type="button"
                  className="artikel-delete-cancel"
                  onClick={handleCancelDelete}
                >
                  Kembali
                </button>

                <button
                  type="button"
                  className="artikel-delete-confirm"
                  onClick={handleConfirmDelete}
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Artikel;
