import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./Kontak.css";

function Kontak() {
  const navigate = useNavigate();

  const [contactData, setContactData] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  // =========================
  // GET DATA KONTAK
  // =========================
  const fetchKontak = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/kontak");
      const result = await response.json();

      if (result.success) {
        setContactData(result.data);
      } else {
        console.error(result.message || "Gagal mengambil data kontak.");
      }
    } catch (error) {
      console.error("GET /api/kontak:", error);
    }
  };

  useEffect(() => {
    fetchKontak();
  }, []);

  // =========================
  // EDIT
  // =========================
  const handleEdit = (id) => {
    navigate(`/settings/kontak/edit/${id}`);
  };

  // =========================
  // DELETE
  // =========================
  const handleDeleteClick = (contact) => {
    console.log("HANDLE DELETE JALAN");
    setSelectedContact(contact);
    setDeleteModal(true);
    console.log("MODAL DISET TRUE");
  };

  const handleCloseDelete = () => {
    setDeleteModal(false);
    setSelectedContact(null);
  };

  const handleConfirmDelete = async () => {
    if (!selectedContact) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/kontak/${selectedContact.id}`,
        {
          method: "DELETE",
        },
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        console.error(result.message || "Gagal menghapus data kontak.");
        return;
      }

      // Hapus langsung dari tampilan
      setContactData((prev) =>
        prev.filter((contact) => contact.id !== selectedContact.id),
      );

      handleCloseDelete();
    } catch (error) {
      console.error("DELETE /api/kontak:", error);
    }
  };

  return (
    <div className="kontak-layout">
      {/* SIDEBAR */}
      <Sidebar />

      <div className="kontak-main">
        {/* NAVBAR */}
        <Navbar />

        <main className="kontak-content">
          {/* =========================
              HEADER
          ========================== */}
          <section className="kontak-header">
            <h1>Kontak</h1>
          </section>

          {/* =========================
              CARD
          ========================== */}
          <section className="kontak-card">
            <div className="kontak-card-content">
              {/* BUAT PENGATURAN */}
              <button
                type="button"
                className="kontak-create-button"
                onClick={() => navigate("/settings/kontak/tambah")}
              >
                Buat Pengaturan
              </button>

              {/* =========================
                  TABLE
              ========================== */}
              <div className="kontak-table-wrapper">
                <table className="kontak-table">
                  <thead>
                    <tr>
                      <th className="kontak-no">No.</th>

                      <th>Nama Pengaturan</th>

                      <th>Isi Pengaturan</th>

                      <th className="kontak-action-header">Aksi</th>
                    </tr>
                  </thead>

                  <tbody>
                    {contactData.length > 0 ? (
                      contactData.map((contact, index) => (
                        <tr key={contact.id}>
                          <td className="kontak-no">{index + 1}</td>

                          <td>{contact.namaPengaturan}</td>

                          <td>{contact.isiPengaturan}</td>

                          <td className="kontak-action-cell">
                            <div className="kontak-actions">
                              <button
                                type="button"
                                className="kontak-edit-button"
                                onClick={() => handleEdit(contact.id)}
                              >
                                Edit
                              </button>

                              <button
                                type="button"
                                className="kontak-delete-button"
                                onClick={() => {
                                  console.log("TOMBOL DELETE DIKLIK", contact);
                                  handleDeleteClick(contact);
                                }}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="4"
                          style={{
                            textAlign: "center",
                            padding: "30px",
                          }}
                        >
                          Belum ada data kontak.
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
        ========================== */}
        {deleteModal && (
          <div className="kontak-delete-overlay" onClick={handleCloseDelete}>
            <div
              className="kontak-delete-modal"
              onClick={(e) => e.stopPropagation()}
            >
              {/* MODAL HEADER */}
              <div className="kontak-delete-modal-header">
                <h2>Hapus</h2>

                <button
                  type="button"
                  className="kontak-delete-close"
                  onClick={handleCloseDelete}
                >
                  ×
                </button>
              </div>

              {/* MODAL BODY */}
              <div className="kontak-delete-modal-body">
                <p className="kontak-delete-question">
                  Apakah anda yakin akan menghapus data?
                </p>

                <p className="kontak-delete-description">
                  Jika data dihapus, maka akan hilang secara permanen
                </p>

                <div className="kontak-delete-modal-actions">
                  <button
                    type="button"
                    className="kontak-delete-cancel"
                    onClick={handleCloseDelete}
                  >
                    Kembali
                  </button>

                  <button
                    type="button"
                    className="kontak-delete-confirm"
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

export default Kontak;
