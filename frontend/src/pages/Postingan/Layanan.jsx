import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./Layanan.css";

function Layanan() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [layananList, setLayananList] = useState([
    {
      id: 1,
      judul: "Services and Maintenance",
      deskripsi:
        "Memberikan jasa perbaikan dan pemeliharaan baik untuk software, hardware ataupun infrastruktur.",
      gambar: "/Layanan/Services and Maintanance.png",
      tipe: "Layanan",
    },
    {
      id: 2,
      judul: "Procurement of Engine and Turbine Components and Spare Parts",
      deskripsi:
        "Kami siap membantu dalam pengadaan komponen industri baik berupa komponen yang sudah jadi ataupun masih berupa bahan baku atau masih berupa material.",
      gambar: "/Layanan/Procurement of Engine.png",
      tipe: "Layanan",
    },
    {
      id: 3,
      judul: "Instalasi Peralatan Listrik dan Otomasi",
      deskripsi:
        "Mengembangkan aplikasi perangkat lunak dengan teknologi informasi berbasis web dan mobile aplikasi.",
      gambar: "/Layanan/Installlation Electrical.png",
      tipe: "Layanan",
    },
    {
      id: 4,
      judul: "IT Equipment/Hardware & Networking",
      deskripsi:
        "Memasok barang dan suku cadang barang IT untuk bisnis dan produk yang sesuai dengan misi kepuasan pelanggan dan pengiriman cepat.",
      gambar: "/Layanan/IT EquipmentHardware & Networking.png",
      tipe: "Layanan",
    },
    {
      id: 5,
      judul: "Software Development",
      deskripsi:
        "Mengembangkan aplikasi perangkat lunak dengan teknologi informasi berbasis web dan mobile aplikasi.",
      gambar: "/Layanan/Software Development.png",
      tipe: "Layanan",
    },
    {
      id: 6,
      judul: "IT Consultant & Problem Solving",
      deskripsi:
        "Memberikan solusi masukan dan mengevaluasi sistem IT di perusahaan untuk meningkatkan kinerja perusahaan.",
      gambar: "/Layanan/IT Consultant & Problem Solving.png",
      tipe: "Layanan",
    },
  ]);

  const filteredLayanan = layananList.filter(
    (item) =>
      item.judul.toLowerCase().includes(search.toLowerCase()) ||
      item.deskripsi.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDelete = (id) => {
    const layanan = layananList.find((item) => item.id === id);

    setSelectedLayanan(layanan);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (!selectedLayanan) return;

    setLayananList((prev) =>
      prev.filter((item) => item.id !== selectedLayanan.id),
    );

    setSelectedLayanan(null);
    setShowDeleteModal(false);
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedLayanan, setSelectedLayanan] = useState(null);

  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="admin-main">
        <Navbar />

        <main className="layanan-content">
          {/* =========================
              PAGE TITLE
          ========================= */}

          <div className="layanan-title-card">
            <h1>List Layanan</h1>
          </div>

          {/* =========================
              CONTENT
          ========================= */}

          <div className="layanan-card">
            <h2>Semua Layanan</h2>

            {/* =========================
                TOOLBAR
            ========================= */}

            <div className="layanan-toolbar">
              <button
                type="button"
                className="btn-tambah-layanan"
                onClick={() => navigate("/layanan/tambah")}
              >
                Tambah Layanan
              </button>

              <div className="layanan-search">
                <input
                  type="text"
                  placeholder="Cari"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                <span>⌕</span>
              </div>
            </div>

            {/* =========================
                TABLE
            ========================= */}

            <div className="layanan-table-wrapper">
              <table className="layanan-table">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Judul</th>
                    <th>Deskripsi</th>
                    <th>Gambar</th>
                    <th>Tipe</th>
                    <th>Aksi</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredLayanan.length > 0 ? (
                    filteredLayanan.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>

                        <td>{item.judul}</td>

                        <td className="layanan-deskripsi">{item.deskripsi}</td>

                        <td>
                          <img
                            src={item.gambar}
                            alt={item.judul}
                            className="layanan-image"
                          />
                        </td>

                        <td>{item.tipe}</td>

                        <td>
                          <div className="layanan-actions">
                            <button
                              type="button"
                              className="layanan-detail-btn"
                              onClick={() =>
                                navigate(`/layanan/detail/${item.id}`, {
                                  state: {
                                    layanan: item,
                                  },
                                })
                              }
                            >
                              Detail
                            </button>

                            <button
                              type="button"
                              className="layanan-edit-btn"
                              onClick={() =>
                                navigate(`/layanan/edit/${item.id}`, {
                                  state: {
                                    layanan: item,
                                  },
                                })
                              }
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              className="layanan-delete-btn"
                              onClick={() => handleDelete(item.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="layanan-empty-message">
                        Tidak ada layanan ditemukan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {showDeleteModal && (
            <div className="delete-modal-overlay">
              <div className="delete-modal">
                <div className="delete-modal-header">
                  <h2>Hapus</h2>

                  <button
                    type="button"
                    className="delete-modal-close"
                    onClick={() => {
                      setShowDeleteModal(false);
                      setSelectedLayanan(null);
                    }}
                  >
                    ×
                  </button>
                </div>

                <div className="delete-modal-body">
                  <h3>Apakah anda yakin akan menghapus data?</h3>

                  <p>Jika data dihapus, maka akan hilang secara permanen</p>

                  <div className="delete-modal-actions">
                    <button
                      type="button"
                      className="delete-back-btn"
                      onClick={() => {
                        setShowDeleteModal(false);
                        setSelectedLayanan(null);
                      }}
                    >
                      Kembali
                    </button>

                    <button
                      type="button"
                      className="delete-confirm-btn"
                      onClick={confirmDelete}
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Layanan;
