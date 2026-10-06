import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./FAQ.css";

function FAQ() {
  const navigate = useNavigate();

  // =========================
  // STATE
  // =========================

  const [faqData, setFaqData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState(null);

  // =========================
  // GET SEMUA FAQ
  // =========================

  const fetchFaq = async () => {
    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/faq");

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal mengambil data FAQ");
      }

      setFaqData(data.data || []);
    } catch (error) {
      console.error("❌ Error mengambil FAQ:", error);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // JALANKAN SAAT HALAMAN DIBUKA
  // =========================

  useEffect(() => {
    fetchFaq();
  }, []);

  // =========================
  // DETAIL
  // =========================

  const handleDetail = (id) => {
    navigate(`/settings/faq/detail/${id}`);
  };

  // =========================
  // EDIT
  // =========================

  const handleEdit = (id) => {
    navigate(`/settings/faq/edit/${id}`);
  };

  // =========================
  // BUKA MODAL DELETE
  // =========================

  const handleDeleteClick = (faq) => {
    setSelectedFaq(faq);
    setDeleteModal(true);
  };

  // =========================
  // TUTUP MODAL DELETE
  // =========================

  const handleCloseDelete = () => {
    setDeleteModal(false);
    setSelectedFaq(null);
  };

  // =========================
  // DELETE FAQ
  // =========================

  const handleConfirmDelete = async () => {
    if (!selectedFaq) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/faq/${selectedFaq.id}`,
        {
          method: "DELETE",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal menghapus FAQ");
      }

      // Hapus langsung dari tabel tanpa refresh
      setFaqData((prevFaq) =>
        prevFaq.filter((faq) => faq.id !== selectedFaq.id),
      );

      // Tutup modal
      handleCloseDelete();

      console.log("✅ FAQ berhasil dihapus");
    } catch (error) {
      console.error("❌ Error menghapus FAQ:", error);

      alert(error.message || "Gagal menghapus FAQ");
    }
  };

  // =========================
  // RETURN
  // =========================

  return (
    <div className="faq-layout">
      {/* SIDEBAR */}
      <Sidebar />

      <div className="faq-main">
        {/* NAVBAR */}
        <Navbar />

        <main className="faq-content">
          {/* =========================
              HEADER
          ========================= */}

          <section className="faq-header">
            <h1>FAQ</h1>
          </section>

          {/* =========================
              FAQ CARD
          ========================= */}

          <section className="faq-card">
            <div className="faq-card-content">
              {/* =========================
                  TAMBAH FAQ
              ========================= */}

              <button
                type="button"
                className="faq-add-button"
                onClick={() => navigate("/settings/faq/tambah")}
              >
                Tambah FAQ
              </button>

              {/* =========================
                  TABLE
              ========================= */}

              <div className="faq-table-wrapper">
                <table className="faq-table">
                  <thead>
                    <tr>
                      <th className="faq-no">No.</th>

                      <th>Pertanyaan</th>

                      <th>Jawaban</th>

                      <th className="faq-action-header">Aksi</th>
                    </tr>
                  </thead>

                  <tbody>
                    {/* LOADING */}
                    {loading ? (
                      <tr>
                        <td
                          colSpan="4"
                          style={{
                            textAlign: "center",
                          }}
                        >
                          Memuat data FAQ...
                        </td>
                      </tr>
                    ) : faqData.length === 0 ? (
                      /* DATA KOSONG */
                      <tr>
                        <td
                          colSpan="4"
                          style={{
                            textAlign: "center",
                          }}
                        >
                          Belum ada data FAQ.
                        </td>
                      </tr>
                    ) : (
                      /* DATA FAQ */
                      faqData.map((faq, index) => (
                        <tr key={faq.id}>
                          {/* NO */}
                          <td className="faq-no">{index + 1}</td>

                          {/* PERTANYAAN */}
                          <td>{faq.question}</td>

                          {/* JAWABAN */}
                          <td>{faq.answer}</td>

                          {/* ACTION */}
                          <td className="faq-action-cell">
                            <div className="faq-actions">
                              {/* DETAIL */}
                              <button
                                type="button"
                                className="faq-detail-button"
                                onClick={() => handleDetail(faq.id)}
                              >
                                Detail
                              </button>

                              {/* EDIT */}
                              <button
                                type="button"
                                className="faq-edit-button"
                                onClick={() => handleEdit(faq.id)}
                              >
                                Edit
                              </button>

                              {/* DELETE */}
                              <button
                                type="button"
                                className="faq-delete-button"
                                onClick={() => handleDeleteClick(faq)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </main>

        {/* =========================
            MODAL DELETE
        ========================= */}

        {deleteModal && (
          <div className="faq-delete-overlay" onClick={handleCloseDelete}>
            <div
              className="faq-delete-modal"
              onClick={(e) => e.stopPropagation()}
            >
              {/* MODAL HEADER */}
              <div className="faq-delete-modal-header">
                <h2>Hapus</h2>

                <button
                  type="button"
                  className="faq-delete-close"
                  onClick={handleCloseDelete}
                >
                  ×
                </button>
              </div>

              {/* MODAL BODY */}
              <div className="faq-delete-modal-body">
                <p className="faq-delete-question">
                  Apakah anda yakin akan menghapus data?
                </p>

                <p className="faq-delete-description">
                  Jika data dihapus, maka akan hilang secara permanen
                </p>

                {/* MODAL BUTTON */}
                <div className="faq-delete-modal-actions">
                  {/* KEMBALI */}
                  <button
                    type="button"
                    className="faq-delete-cancel"
                    onClick={handleCloseDelete}
                  >
                    Kembali
                  </button>

                  {/* HAPUS */}
                  <button
                    type="button"
                    className="faq-delete-confirm"
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

export default FAQ;
