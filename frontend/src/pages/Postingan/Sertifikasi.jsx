import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./Sertifikasi.css";

function Sertifikasi() {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);

  const [deleteId, setDeleteId] = useState(null);

  const [sertifikasiData, setSertifikasiData] = useState([]);

  useEffect(() => {
    const fetchSertifikasi = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/sertifikasi");

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.message || "Gagal mengambil data sertifikasi.",
          );
        }

        setSertifikasiData(result.data);
      } catch (error) {
        console.error("❌ Error mengambil Sertifikasi:", error);
      }
    };

    fetchSertifikasi();
  }, []);

  const itemsPerPage = 2;

  const totalPages = Math.ceil(sertifikasiData.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentData = sertifikasiData.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  // TAMBAH
  const handleTambah = () => {
    navigate("/sertifikasi/tambah");
  };

  // EDIT
  const handleEdit = (id) => {
    navigate(`/sertifikasi/edit/${id}`);
  };

  // DELETE
  const handleDelete = (id) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    if (deleteId === null) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/sertifikasi/${deleteId}`,
        {
          method: "DELETE",
        },
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Gagal menghapus sertifikasi.");
      }

      // Hapus dari tampilan setelah database berhasil dihapus
      const remainingData = sertifikasiData.filter(
        (item) => item.id !== deleteId,
      );

      setSertifikasiData(remainingData);

      // Cek pagination setelah data dihapus
      const newTotalPages = Math.ceil(remainingData.length / itemsPerPage);

      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }

      setDeleteId(null);

      console.log("✅ Sertifikasi berhasil dihapus:", result);
    } catch (error) {
      console.error("❌ Error menghapus Sertifikasi:", error);

      alert(error.message || "Gagal menghapus sertifikasi.");
    }
  };
  const cancelDelete = () => {
    setDeleteId(null);
  };

  // PAGINATION
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);
  };

  return (
    <div className="sertifikasi-layout">
      <Sidebar />

      <div className="sertifikasi-main">
        <Navbar />

        <main className="sertifikasi-content">
          {/* HEADER */}
          <section className="sertifikasi-header">
            <h1>List Sertifikat</h1>
          </section>

          {/* CARD */}
          <section className="sertifikasi-card">
            <div className="sertifikasi-card-title">Semua Sertifikat</div>

            <div className="sertifikasi-card-content">
              {/* TAMBAH */}
              <div className="sertifikasi-top-action">
                <button
                  type="button"
                  className="sertifikasi-add-button"
                  onClick={handleTambah}
                >
                  Tambah Sertifikasi
                </button>
              </div>

              {/* TABLE */}
              <div className="sertifikasi-table-wrapper">
                <table className="sertifikasi-table">
                  <thead>
                    <tr>
                      <th className="sertifikasi-no">No.</th>

                      <th className="sertifikasi-name-column">
                        Nama Sertifikasi
                      </th>

                      <th className="sertifikasi-description-column">
                        Deskripsi
                      </th>

                      <th className="sertifikasi-image-column">Gambar</th>

                      <th className="sertifikasi-action-column">Aksi</th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentData.length > 0 ? (
                      currentData.map((item, index) => (
                        <tr key={item.id}>
                          {/* NO */}
                          <td className="sertifikasi-no">
                            {startIndex + index + 1}
                          </td>

                          {/* NAMA */}
                          <td className="sertifikasi-name">{item.nama}</td>

                          {/* DESKRIPSI */}
                          <td className="sertifikasi-description">
                            {item.deskripsi}
                          </td>

                          {/* GAMBAR */}
                          <td className="sertifikasi-image-cell">
                            <div className="sertifikasi-image-wrapper">
                              <img
                                src={`http://localhost:5000${item.gambar}`}
                                alt={item.nama}
                                className="sertifikasi-image"
                              />
                            </div>
                          </td>

                          {/* AKSI */}
                          <td className="sertifikasi-actions">
                            <button
                              type="button"
                              className="sertifikasi-edit-button"
                              onClick={() => handleEdit(item.id)}
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              className="sertifikasi-delete-button"
                              onClick={() => handleDelete(item.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="sertifikasi-empty">
                          Data tidak ditemukan
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* PAGINATION */}
              {totalPages > 1 && (
                <div className="sertifikasi-pagination">
                  <button
                    type="button"
                    className="sertifikasi-page-button"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    ‹
                  </button>

                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1,
                  ).map((page) => (
                    <button
                      key={page}
                      type="button"
                      className={`sertifikasi-page-button ${
                        currentPage === page ? "active" : ""
                      }`}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    type="button"
                    className="sertifikasi-page-button"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    ›
                  </button>
                </div>
              )}
            </div>
          </section>
        </main>

        {deleteId !== null && (
          <div className="sertifikasi-delete-overlay" onClick={cancelDelete}>
            <div
              className="sertifikasi-delete-modal"
              onClick={(e) => e.stopPropagation()}
            >
              {/* HEADER MODAL */}
              <div className="sertifikasi-delete-modal-header">
                <h3>Hapus</h3>

                <button
                  type="button"
                  className="sertifikasi-delete-close"
                  onClick={cancelDelete}
                >
                  ×
                </button>
              </div>

              {/* BODY MODAL */}
              <div className="sertifikasi-delete-modal-body">
                <h4>Apakah anda yakin akan menghapus data?</h4>

                <p>Jika data dihapus, maka akan hilang secara permanen</p>

                {/* BUTTON */}
                <div className="sertifikasi-delete-modal-actions">
                  <button
                    type="button"
                    className="sertifikasi-delete-cancel"
                    onClick={cancelDelete}
                  >
                    Kembali
                  </button>

                  <button
                    type="button"
                    className="sertifikasi-delete-confirm"
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

export default Sertifikasi;
