import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./Karir.css";

function Karir() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState(null);

  const handleDeleteClick = (id) => {
    setSelectedDeleteId(id);
    setDeleteModal(true);
  };

  const handleCancelDelete = () => {
    setSelectedDeleteId(null);
    setDeleteModal(false);
  };

  const handleConfirmDelete = () => {
    console.log("Data yang dihapus:", selectedDeleteId);

    setSelectedDeleteId(null);
    setDeleteModal(false);
  };

  const karirData = [
    {
      id: 1,
      posisi: "UI/UX Designer",
      kategori: "IT & Software",
      lokasi: "Bandung, Jawa Barat",
      tipe: "Full Time",
    },
    {
      id: 2,
      posisi: "Frontend Dev",
      kategori: "IT & Software",
      lokasi: "Bandung, Jawa Barat",
      tipe: "Full Time",
    },
    {
      id: 3,
      posisi: "Mechanical Engineer",
      kategori: "Engineering",
      lokasi: "Bandung, Jawa Barat",
      tipe: "Full Time",
    },
    {
      id: 4,
      posisi: "Admin Project",
      kategori: "Administrasi",
      lokasi: "Bandung, Jawa Barat",
      tipe: "Full Time",
    },
  ];

  const filteredData = karirData.filter((item) =>
    item.posisi.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="admin-main">
        <Navbar />

        <main className="karir-content">
          {/* =========================
              PAGE TITLE
          ========================= */}

          <div className="karir-title-card">
            <h1>Karir</h1>
          </div>

          {/* =========================
              CONTENT CARD
          ========================= */}

          <div className="karir-card">
            <div className="karir-card-header">
              <h2>Daftar Lowongan Kerja</h2>
            </div>

            {/* =========================
                TOOLBAR
            ========================= */}

            <div className="karir-toolbar">
              <button
                type="button"
                className="karir-add-button"
                onClick={() => navigate("/karir/tambah")}
              >
                Tambah Karir
              </button>

              <div className="karir-search">
                <input
                  type="text"
                  placeholder="Cari"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                <Search size={13} />
              </div>
            </div>

            {/* =========================
                TABLE
            ========================= */}

            <div className="karir-table-wrapper">
              <table className="karir-table">
                <thead>
                  <tr>
                    <th className="karir-no-column">No.</th>
                    <th>Posisi</th>
                    <th>Kategori</th>
                    <th>Lokasi</th>
                    <th>Tipe Pekerjaan</th>
                    <th className="karir-action-column">Aksi</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((item, index) => (
                      <tr key={item.id}>
                        <td className="karir-no">{index + 1}</td>

                        <td className="karir-posisi">{item.posisi}</td>

                        <td>{item.kategori}</td>

                        <td>{item.lokasi}</td>

                        <td>{item.tipe}</td>

                        <td>
                          <div className="karir-actions">
                            <button
                              type="button"
                              className="karir-detail-button"
                              onClick={() =>
                                navigate(`/karir/detail/${item.id}`)
                              }
                            >
                              Detail
                            </button>

                            <button
                              type="button"
                              className="karir-edit-button"
                              onClick={() => navigate(`/karir/edit/${item.id}`)}
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              className="karir-delete-button"
                              onClick={() => handleDeleteClick(item.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="karir-empty">
                        Data lowongan kerja tidak ditemukan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        {deleteModal && (
          <div className="karir-delete-overlay">
            <div className="karir-delete-modal">
              <div className="karir-delete-modal-header">
                <h2>Hapus</h2>

                <button
                  type="button"
                  className="karir-delete-close"
                  onClick={handleCancelDelete}
                >
                  ×
                </button>
              </div>

              <div className="karir-delete-modal-body">
                <p className="karir-delete-question">
                  Apakah anda yakin akan menghapus data?
                </p>

                <p className="karir-delete-description">
                  Jika data dihapus, maka akan hilang secara permanen
                </p>

                <div className="karir-delete-modal-actions">
                  <button
                    type="button"
                    className="karir-delete-cancel"
                    onClick={handleCancelDelete}
                  >
                    Kembali
                  </button>

                  <button
                    type="button"
                    className="karir-delete-confirm"
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

export default Karir;
