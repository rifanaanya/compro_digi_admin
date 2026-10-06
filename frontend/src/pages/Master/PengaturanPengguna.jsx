import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

import profileUser from "../../assets/icons/profile-user.svg";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./PengaturanPengguna.css";

function PengaturanPengguna() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState(null);
  const [penggunaData, setPenggunaData] = useState([]);

  const filteredData = penggunaData.filter((item) =>
    `${item.nama} ${item.email} ${item.telepon} ${item.role}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const handleTambah = () => {
    navigate("/master/pengaturan-pengguna/tambah");
  };

  const handleDetail = (id) => {
    navigate(`/master/pengaturan-pengguna/detail/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/master/pengaturan-pengguna/edit/${id}`);
  };

  const handleDelete = (id) => {
    setSelectedDeleteId(id);
    setDeleteModal(true);
  };

  const handleCancelDelete = () => {
    setDeleteModal(false);
    setSelectedDeleteId(null);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/pengguna/${selectedDeleteId}`,
        {
          method: "DELETE",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal menghapus pengguna");
      }

      // Hapus langsung dari tampilan
      setPenggunaData((prevData) =>
        prevData.filter((item) => item.id !== selectedDeleteId),
      );

      setDeleteModal(false);
      setSelectedDeleteId(null);

      alert("Pengguna berhasil dihapus!");
    } catch (error) {
      console.error("❌ Error delete pengguna:", error);
      alert(error.message);
    }
  };

  useEffect(() => {
    const fetchPengguna = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/pengguna");

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Gagal mengambil data pengguna");
        }

        setPenggunaData(data.pengguna);
      } catch (error) {
        console.error("❌ Error fetch pengguna:", error);
      }
    };

    fetchPengguna();
  }, []);

  return (
    <div className="pengaturan-pengguna-layout">
      <Sidebar />

      <div className="pengaturan-pengguna-main">
        <Navbar />

        <main className="pengaturan-pengguna-content">
          {/* HEADER */}
          <section className="pengaturan-pengguna-header">
            <h1>Pengaturan Pengguna</h1>
          </section>

          {/* CARD */}
          <section className="pengaturan-pengguna-card">
            <div className="pengaturan-pengguna-card-title">Semua Pengguna</div>

            <div className="pengaturan-pengguna-card-content">
              {/* TOP ACTION */}
              <div className="pengaturan-pengguna-top-action">
                <button
                  type="button"
                  className="pengaturan-pengguna-add-button"
                  onClick={() => navigate("/master/pengaturan-pengguna/tambah")}
                >
                  Tambah Pengguna
                </button>

                <div className="pengaturan-pengguna-search">
                  <input
                    type="text"
                    placeholder="Cari"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />

                  <Search
                    size={15}
                    className="pengaturan-pengguna-search-icon"
                  />
                </div>
              </div>

              {/* TABLE */}
              <div className="pengaturan-pengguna-table-wrapper">
                <table className="pengaturan-pengguna-table">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Foto Profil</th>
                      <th>Nama Pengguna</th>
                      <th>Email</th>
                      <th>No. Telepon</th>
                      <th>Role</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredData.length > 0 ? (
                      filteredData.map((item) => (
                        <tr key={item.id}>
                          <td>{item.id}</td>

                          <td>
                            <div className="pengaturan-pengguna-profile">
                              <img
                                src={
                                  item.foto
                                    ? `http://localhost:5000/uploads/${item.foto}`
                                    : profileUser
                                }
                                alt="Profile"
                                className="pengaturan-pengguna-profile-icon"
                              />
                            </div>
                          </td>

                          <td>{item.nama}</td>

                          <td>{item.email}</td>

                          <td>{item.telepon}</td>

                          <td>{item.role}</td>

                          <td className="pengaturan-pengguna-actions">
                            <button
                              type="button"
                              className="pengaturan-pengguna-detail-button"
                              onClick={() => handleDetail(item.id)}
                            >
                              Detail
                            </button>

                            <button
                              type="button"
                              className="pengaturan-pengguna-edit-button"
                              onClick={() => handleEdit(item.id)}
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              className="pengaturan-pengguna-delete-button"
                              onClick={() => handleDelete(item.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="pengaturan-pengguna-empty">
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

        {deleteModal && (
          <div className="pengaturan-pengguna-delete-overlay">
            <div className="pengaturan-pengguna-delete-modal">
              <div className="pengaturan-pengguna-delete-modal-header">
                <h2>Hapus</h2>

                <button
                  type="button"
                  className="pengaturan-pengguna-delete-close"
                  onClick={handleCancelDelete}
                >
                  ×
                </button>
              </div>

              <div className="pengaturan-pengguna-delete-modal-content">
                <p className="pengaturan-pengguna-delete-question">
                  Apakah anda yakin akan menghapus data?
                </p>

                <p className="pengaturan-pengguna-delete-description">
                  Jika data dihapus, maka akan hilang secara permanen
                </p>

                <div className="pengaturan-pengguna-delete-modal-actions">
                  <button
                    type="button"
                    className="pengaturan-pengguna-delete-cancel"
                    onClick={handleCancelDelete}
                  >
                    Kembali
                  </button>

                  <button
                    type="button"
                    className="pengaturan-pengguna-delete-confirm"
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

export default PengaturanPengguna;
