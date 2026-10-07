import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./Mitra.css";

function Mitra() {
  const navigate = useNavigate();

  // =========================
  // DATA MITRA
  // =========================
  const [mitraData, setMitraData] = useState([]);

  // =========================
  // DELETE MODAL
  // =========================
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedMitra, setSelectedMitra] = useState(null);

  // =========================
  // GET DATA MITRA
  // =========================
  useEffect(() => {
    const fetchMitra = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/mitra");

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Gagal mengambil data Mitra.");
        }

        setMitraData(result.data);
      } catch (error) {
        console.error("❌ Gagal mengambil data Mitra:", error);
      }
    };

    fetchMitra();
  }, []);

  // =========================
  // URL LOGO MITRA
  // =========================
  const getMitraLogoUrl = (logo) => {
    if (!logo) return "";

    if (logo.startsWith("http")) {
      return logo;
    }

    return `http://localhost:5000${logo.startsWith("/") ? "" : "/"}${logo}`;
  };

  // =========================
  // DETAIL
  // =========================
  const handleDetail = (id) => {
    navigate(`/settings/mitra/detail/${id}`);
  };

  // =========================
  // EDIT
  // =========================
  const handleEdit = (id) => {
    navigate(`/settings/mitra/edit/${id}`);
  };

  // =========================
  // DELETE - BUKA MODAL
  // =========================
  const handleDeleteClick = (mitra) => {
    setSelectedMitra(mitra);
    setDeleteModal(true);
  };

  // =========================
  // TUTUP MODAL
  // =========================
  const handleCloseDelete = () => {
    setDeleteModal(false);
    setSelectedMitra(null);
  };

  // =========================
  // KONFIRMASI DELETE
  // =========================
  const handleConfirmDelete = async () => {
    if (!selectedMitra) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/mitra/${selectedMitra.id}`,
        {
          method: "DELETE",
        },
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Gagal menghapus Mitra.");
      }

      // Hapus dari tampilan setelah berhasil di database
      setMitraData((prev) =>
        prev.filter((item) => item.id !== selectedMitra.id),
      );

      handleCloseDelete();
    } catch (error) {
      console.error("❌ Gagal menghapus Mitra:", error);

      alert(error.message || "Gagal menghapus Mitra.");
    }
  };

  return (
    <div className="mitra-layout">
      {/* =========================
          SIDEBAR
      ========================= */}
      <Sidebar />

      <div className="mitra-main">
        {/* =========================
            NAVBAR
        ========================= */}
        <Navbar />

        <main className="mitra-content">
          {/* =========================
              HEADER
          ========================= */}
          <section className="mitra-header">
            <h1>List Mitra</h1>
          </section>

          {/* =========================
              MITRA CARD
          ========================= */}
          <section className="mitra-card">
            <div className="mitra-card-title">Semua Mitra</div>

            <div className="mitra-card-content">
              {/* =========================
                  TAMBAH MITRA
              ========================= */}
              <button
                type="button"
                className="mitra-add-button"
                onClick={() => navigate("/settings/mitra/tambah")}
              >
                Tambah Mitra
              </button>

              {/* =========================
                  TABLE
              ========================= */}
              <div className="mitra-table-wrapper">
                <table className="mitra-table">
                  <thead>
                    <tr>
                      <th className="mitra-no">No.</th>
                      <th>Nama Mitra</th>
                      <th className="mitra-logo-column">Logo</th>
                      <th className="mitra-action-column">Aksi</th>
                    </tr>
                  </thead>

                  <tbody>
                    {mitraData.map((mitra, index) => (
                      <tr key={mitra.id}>
                        {/* NO */}
                        <td className="mitra-no">{index + 1}</td>

                        {/* NAMA */}
                        <td className="mitra-name">{mitra.nama}</td>

                        {/* LOGO */}
                        <td className="mitra-logo-cell">
                          <div className="mitra-logo-box">
                            {mitra.logo && (
                              <img
                                src={getMitraLogoUrl(mitra.logo)}
                                alt={mitra.nama}
                                onError={(e) => {
                                  e.currentTarget.style.display = "none";
                                }}
                              />
                            )}
                          </div>
                        </td>

                        {/* AKSI */}
                        <td className="mitra-actions">
                          {/* DETAIL */}
                          <button
                            type="button"
                            className="mitra-detail-button"
                            onClick={() => handleDetail(mitra.id)}
                          >
                            Detail
                          </button>

                          {/* EDIT */}
                          <button
                            type="button"
                            className="mitra-edit-button"
                            onClick={() => handleEdit(mitra.id)}
                          >
                            Edit
                          </button>

                          {/* DELETE */}
                          <button
                            type="button"
                            className="mitra-delete-button"
                            onClick={() => handleDeleteClick(mitra)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </main>

        {/* =========================
            DELETE MODAL
        ========================= */}
        {deleteModal && (
          <div className="mitra-delete-overlay" onClick={handleCloseDelete}>
            <div
              className="mitra-delete-modal"
              onClick={(e) => e.stopPropagation()}
            >
              {/* =========================
                  MODAL HEADER
              ========================= */}
              <div className="mitra-delete-modal-header">
                <h2>Hapus</h2>

                <button
                  type="button"
                  className="mitra-delete-close"
                  onClick={handleCloseDelete}
                >
                  ×
                </button>
              </div>

              {/* =========================
                  MODAL BODY
              ========================= */}
              <div className="mitra-delete-modal-body">
                <p className="mitra-delete-question">
                  Apakah anda yakin akan menghapus data?
                </p>

                <p className="mitra-delete-description">
                  Jika data dihapus, maka akan hilang secara permanen
                </p>

                {/* =========================
                    ACTION BUTTON
                ========================= */}
                <div className="mitra-delete-modal-actions">
                  {/* KEMBALI */}
                  <button
                    type="button"
                    className="mitra-delete-cancel"
                    onClick={handleCloseDelete}
                  >
                    Kembali
                  </button>

                  {/* HAPUS */}
                  <button
                    type="button"
                    className="mitra-delete-confirm"
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
    </div>
  );
}

export default Mitra;
