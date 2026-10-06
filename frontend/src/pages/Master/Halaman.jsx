import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./Halaman.css";

function Halaman() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const halamanData = [
    {
      id: 1,
      judul: "Artikel",
      tipe: "List",
      tampilkan: "Ya",
      author: "Admin Digi",
      tanggal: "10/06/2025 10:00:00",
      status: "Publish",
    },
    {
      id: 2,
      judul: "FAQ",
      tipe: "Post Grid",
      tampilkan: "Ya",
      author: "Admin Digi",
      tanggal: "10/06/2025 10:00:00",
      status: "Publish",
    },
    {
      id: 3,
      judul: "Home - Tentang Digi",
      tipe: "Default",
      tampilkan: "Ya",
      author: "Admin Digi",
      tanggal: "10/06/2025 10:00:00",
      status: "Publish",
    },
    {
      id: 4,
      judul: "Karir",
      tipe: "Default",
      tampilkan: "Ya",
      author: "Admin Digi",
      tanggal: "10/06/2025 10:00:00",
      status: "Publish",
    },
    {
      id: 5,
      judul: "Kegiatan",
      tipe: "Pict",
      tampilkan: "Ya",
      author: "Admin Digi",
      tanggal: "10/06/2025 10:00:00",
      status: "Publish",
    },
    {
      id: 6,
      judul: "Layanan",
      tipe: "Post Grid",
      tampilkan: "Ya",
      author: "Admin Digi",
      tanggal: "10/06/2025 10:00:00",
      status: "Publish",
    },
    {
      id: 7,
      judul: "Mitra",
      tipe: "Post Grid",
      tampilkan: "Ya",
      author: "Admin Digi",
      tanggal: "10/06/2025 10:00:00",
      status: "Publish",
    },
    {
      id: 8,
      judul: "Produk",
      tipe: "List",
      tampilkan: "Ya",
      author: "Admin Digi",
      tanggal: "10/06/2025 10:00:00",
      status: "Publish",
    },
    {
      id: 9,
      judul: "Sertifikasi",
      tipe: "Pict",
      tampilkan: "Ya",
      author: "Admin Digi",
      tanggal: "10/06/2025 10:00:00",
      status: "Publish",
    },
    {
      id: 10,
      judul: "Visi Misi",
      tipe: "Default",
      tampilkan: "Ya",
      author: "Admin Digi",
      tanggal: "10/06/2025 10:00:00",
      status: "Publish",
    },
  ];

  const filteredData = halamanData.filter((item) =>
    `${item.judul} ${item.tipe} ${item.tampilkan} ${item.author} ${item.status}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const handleTambah = () => {
    navigate("/master/halaman/tambah");
  };

  const handleDetail = (id) => {
    navigate(`/master/halaman/detail/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/master/halaman/edit/${id}`);
  };

  const handleDelete = (id) => {
    setSelectedId(id);
    setDeleteModal(true);
  };

  const handleCancelDelete = () => {
    setDeleteModal(false);
    setSelectedId(null);
  };

  const handleConfirmDelete = () => {
    console.log("Delete Halaman:", selectedId);

    setDeleteModal(false);
    setSelectedId(null);
  };

  return (
    <div className="halaman-layout">
      <Sidebar />

      <div className="halaman-main">
        <Navbar />

        <main className="halaman-content">
          {/* HEADER */}
          <section className="halaman-header">
            <h1>List Halaman</h1>
          </section>

          {/* CARD */}
          <section className="halaman-card">
            <div className="halaman-card-title">Semua Halaman</div>

            <div className="halaman-card-content">
              {/* TOP ACTION */}
              <div className="halaman-top-action">
                <button
                  type="button"
                  className="halaman-add-button"
                  onClick={handleTambah}
                >
                  Tambah Halaman
                </button>

                <div className="halaman-search">
                  <input
                    type="text"
                    placeholder="Cari"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />

                  <Search size={15} className="halaman-search-icon" />
                </div>
              </div>

              {/* TABLE */}
              <div className="halaman-table-wrapper">
                <table className="halaman-table">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Judul</th>
                      <th>Tipe</th>
                      <th>Tampilkan</th>
                      <th>Author</th>
                      <th>Status</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredData.length > 0 ? (
                      filteredData.map((item) => (
                        <tr key={item.id}>
                          <td>{item.id}</td>

                          <td>{item.judul}</td>

                          <td>{item.tipe}</td>

                          <td>{item.tampilkan}</td>

                          <td>
                            <div className="halaman-author">
                              <span>{item.author}</span>
                              <small>{item.tanggal}</small>
                            </div>
                          </td>

                          <td>{item.status}</td>

                          <td className="halaman-actions">
                            <button
                              type="button"
                              className="halaman-detail-button"
                              onClick={() => handleDetail(item.id)}
                            >
                              Detail
                            </button>

                            <button
                              type="button"
                              className="halaman-edit-button"
                              onClick={() => handleEdit(item.id)}
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              className="halaman-delete-button"
                              onClick={() => handleDelete(item.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="halaman-empty">
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
          <div className="halaman-delete-overlay">
            <div className="halaman-delete-modal">
              <div className="halaman-delete-modal-header">
                <h2>Hapus</h2>

                <button
                  type="button"
                  className="halaman-delete-close"
                  onClick={handleCancelDelete}
                >
                  ×
                </button>
              </div>

              <div className="halaman-delete-modal-content">
                <p className="halaman-delete-question">
                  Apakah anda yakin akan menghapus data?
                </p>

                <p className="halaman-delete-description">
                  Jika data dihapus, maka akan hilang secara permanen
                </p>

                <div className="halaman-delete-modal-actions">
                  <button
                    type="button"
                    className="halaman-delete-cancel"
                    onClick={handleCancelDelete}
                  >
                    Kembali
                  </button>

                  <button
                    type="button"
                    className="halaman-delete-confirm"
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

export default Halaman;
