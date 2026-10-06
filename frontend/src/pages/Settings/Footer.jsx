import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./Footer.css";

function Footer() {
  const navigate = useNavigate();

  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedFooter, setSelectedFooter] = useState(null);

  const footerData = [
    {
      id: 1,
      name: "Footer Copyright",
      content: "PT. Digi Tekno Indonesia",
    },
    {
      id: 2,
      name: "Logo Footer",
      content: "uploads/settings/logofooter.png",
    },
    {
      id: 3,
      name: "Footer Column 1",
      content: "Layanan Kami",
    },
    {
      id: 4,
      name: "Footer Column 2",
      content: "Kontak Kami",
    },
  ];

  // EDIT
  const handleEdit = (id) => {
    navigate(`/settings/footer/edit/${id}`);
  };

  // DELETE
  const handleDeleteClick = (footer) => {
    setSelectedFooter(footer);
    setDeleteModal(true);
  };

  // TUTUP MODAL
  const handleCloseDelete = () => {
    setDeleteModal(false);
    setSelectedFooter(null);
  };

  // KONFIRMASI DELETE
  const handleConfirmDelete = () => {
    console.log("Delete Footer:", selectedFooter?.id);

    // Nanti disambungkan ke database
    handleCloseDelete();
  };

  return (
    <div className="footer-setting-layout">
      {/* SIDEBAR */}
      <Sidebar />

      <div className="footer-setting-main">
        {/* NAVBAR */}
        <Navbar />

        <main className="footer-setting-content">
          {/* =========================
              HEADER
          ========================= */}
          <section className="footer-setting-header">
            <h1>Footer</h1>
          </section>

          {/* =========================
              FOOTER CARD
          ========================= */}
          <section className="footer-setting-card">
            <div className="footer-setting-card-content">
              {/* BUAT PENGATURAN */}
              <button
                type="button"
                className="footer-create-button"
                onClick={() => navigate("/settings/footer/tambah")}
              >
                Buat Pengaturan
              </button>

              {/* =========================
                  TABLE
              ========================= */}
              <div className="footer-table-wrapper">
                <table className="footer-table">
                  <thead>
                    <tr>
                      <th className="footer-no">No.</th>

                      <th>Nama Pengaturan</th>

                      <th>Isi Pengaturan</th>

                      <th className="footer-action-header">Aksi</th>
                    </tr>
                  </thead>

                  <tbody>
                    {footerData.map((item) => (
                      <tr key={item.id}>
                        <td className="footer-no">{item.id}</td>

                        <td>{item.name}</td>

                        <td>{item.content}</td>

                        <td className="footer-actions">
                          {/* EDIT */}
                          <button
                            type="button"
                            className="footer-edit-button"
                            onClick={() => handleEdit(item.id)}
                          >
                            Edit
                          </button>
                          
                          {/* DELETE */}
                          <button
                            type="button"
                            className="footer-delete-button"
                            onClick={() => handleDeleteClick(item)}
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
          <div className="footer-delete-overlay" onClick={handleCloseDelete}>
            <div
              className="footer-delete-modal"
              onClick={(e) => e.stopPropagation()}
            >
              {/* HEADER */}
              <div className="footer-delete-modal-header">
                <h2>Hapus</h2>

                <button
                  type="button"
                  className="footer-delete-close"
                  onClick={handleCloseDelete}
                >
                  ×
                </button>
              </div>

              {/* BODY */}
              <div className="footer-delete-modal-body">
                <p className="footer-delete-question">
                  Apakah anda yakin akan menghapus data?
                </p>

                <p className="footer-delete-description">
                  Jika data dihapus, maka akan hilang secara permanen
                </p>

                {/* ACTION */}
                <div className="footer-delete-modal-actions">
                  <button
                    type="button"
                    className="footer-delete-cancel"
                    onClick={handleCloseDelete}
                  >
                    Kembali
                  </button>

                  <button
                    type="button"
                    className="footer-delete-confirm"
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

export default Footer;
