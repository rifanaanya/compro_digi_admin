import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./Kegiatan.css";

function Kegiatan() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [kegiatanData, setKegiatanData] = useState([
    {
      id: 1,
      deskripsi: "Buka Bersama PT. Digi Tekno Indonesia",
      tipe: "Gambar",
      tanggal: "16 / 05 / 2026",
      foto: "/Kegiatan/kegiatan1.jpg",
    },
    {
      id: 2,
      deskripsi: "Rafting Citumang",
      tipe: "Gambar",
      tanggal: "16 / 05 / 2026",
      foto: "/Kegiatan/kegiatan2.jpg",
    },
    {
      id: 3,
      deskripsi: "Rafting Citumang",
      tipe: "Gambar",
      tanggal: "16 / 05 / 2026",
      foto: "/Kegiatan/kegiatan3.jpg",
    },
    {
      id: 4,
      deskripsi: "Rafting Citumang",
      tipe: "Gambar",
      tanggal: "16 / 05 / 2026",
      foto: "/Kegiatan/kegiatan4.jpg",
    },
    {
      id: 5,
      deskripsi: "Arung Jeram",
      tipe: "Gambar",
      tanggal: "16 / 05 / 2026",
      foto: "/Kegiatan/kegiatan5.jpg",
    },
    {
      id: 6,
      deskripsi: "Gathering PT. Digi Tekno Indonesia",
      tipe: "Gambar",
      tanggal: "16 / 05 / 2026",
      foto: "/Kegiatan/kegiatan6.jpg",
    },

    // VIDEO
    {
      id: 7,
      deskripsi: "Rafting Citumang",
      tipe: "Video",
      tanggal: "16 / 05 / 2026",
      foto: "/Kegiatan/kegiatan7.mp4",
    },
    {
      id: 8,
      deskripsi: "Rafting Citumang",
      tipe: "Video",
      tanggal: "16 / 05 / 2026",
      foto: "/Kegiatan/kegiatan8.mp4",
    },
  ]);

  const filteredData = kegiatanData.filter((item) =>
    `${item.deskripsi} ${item.tipe} ${item.tanggal}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const handleTambah = () => {
    navigate("/kegiatan/tambah");
  };

  const handleDetail = (id) => {
    navigate(`/kegiatan/detail/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/kegiatan/edit/${id}`);
  };

  const [deleteId, setDeleteId] = useState(null);

  const handleDelete = (id) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    setKegiatanData((prevData) =>
      prevData.filter((item) => item.id !== deleteId),
    );

    setDeleteId(null);
  };

  const cancelDelete = () => {
    setDeleteId(null);
  };

  return (
    <div className="kegiatan-layout">
      <Sidebar />

      <div className="kegiatan-main">
        <Navbar />

        <main className="kegiatan-content">
          {/* HEADER */}
          <section className="kegiatan-header">
            <h1>List Kegiatan</h1>
          </section>

          {/* CARD */}
          <section className="kegiatan-card">
            <div className="kegiatan-card-title">Semua Kegiatan</div>

            <div className="kegiatan-card-content">
              {/* TOP ACTION */}
              <div className="kegiatan-top-action">
                <button
                  type="button"
                  className="kegiatan-add-button"
                  onClick={handleTambah}
                >
                  Tambah Kegiatan
                </button>

                <div className="kegiatan-search">
                  <input
                    type="text"
                    placeholder="Cari"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              {/* TABLE */}
              <div className="kegiatan-table-wrapper">
                <table className="kegiatan-table">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Deskripsi Kegiatan</th>
                      <th>Tipe</th>
                      <th>Tanggal Kegiatan</th>
                      <th>Foto Kegiatan</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredData.length > 0 ? (
                      filteredData.map((item) => (
                        <tr key={item.id}>
                          <td>{item.id}</td>

                          <td className="kegiatan-description">
                            {item.deskripsi}
                          </td>

                          <td>{item.tipe}</td>

                          <td>{item.tanggal}</td>

                          <td>
                            <div className="kegiatan-photo">
                              {item.tipe === "Video" ? (
                                <video
                                  src={item.foto}
                                  className="kegiatan-video"
                                  controls
                                  preload="metadata"
                                />
                              ) : (
                                <img
                                  src={item.foto}
                                  alt={item.deskripsi}
                                  className="kegiatan-image"
                                />
                              )}
                            </div>
                          </td>

                          <td className="kegiatan-actions">
                            <button
                              type="button"
                              className="kegiatan-detail-button"
                              onClick={() => handleDetail(item.id)}
                            >
                              Detail
                            </button>

                            <button
                              type="button"
                              className="kegiatan-edit-button"
                              onClick={() => handleEdit(item.id)}
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              className="kegiatan-delete-button"
                              onClick={() => handleDelete(item.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="kegiatan-empty">
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

        {deleteId !== null && (
          <div className="delete-modal-overlay">
            <div className="delete-modal">
              <div className="delete-modal-title">Konfirmasi Hapus</div>

              <div className="delete-modal-content">
                Apakah Anda yakin ingin menghapus kegiatan ini?
              </div>

              <div className="delete-modal-actions">
                <button
                  type="button"
                  className="delete-modal-cancel"
                  onClick={cancelDelete}
                >
                  Batal
                </button>

                <button
                  type="button"
                  className="delete-modal-confirm"
                  onClick={confirmDelete}
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Kegiatan;
