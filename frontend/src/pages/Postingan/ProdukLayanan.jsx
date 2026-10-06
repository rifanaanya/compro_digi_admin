import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./ProdukLayanan.css";

function ProdukLayanan() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [produkLayananList, setProdukLayananList] = useState([
    {
      id: 1,
      nama: "Procurement of Engine and Turbine Components and Spare Parts",
      deskripsi:
        "Kami siap membantu dalam pengadaan komponen industri baik berupa komponen yang sudah jadi ataupun masih berupa bahan baku atau masih berupa material. Adapun bahan material dapat berupa bahan dari dalam negeri dan luar negeri.",
      layanan: "Procurement of Engine and Turbine Components and Spare Parts",
      tools: [
        "Overhaul BFP",
        "Pemasangan Sealstrip Turbin 15 MW",
        "Rewinding Motor 180kW High Volt",
      ],
    },
    {
      id: 2,
      nama: "Mechanical Electrical",
      deskripsi:
        "Layanan Mechanical Electrical dari PT. Digi Tekno Indonesia mencakup instalasi, perawatan, hingga troubleshooting sistem mekanikal dan elektrikal pada berbagai fasilitas industri dan bangunan komersial.",
      layanan: "Mechanical Electrical",
      tools: [
        "Instalasi Tower",
        "Overhaul BFP",
        "Pemasangan Sealstrip Turbin 15 MW",
        "Rewinding Motor 180kW High Volt",
        "Tools & Alat Ukur",
      ],
    },
    {
      id: 3,
      nama: "Repair Sparepart",
      deskripsi:
        "Layanan ini berfokus pada perbaikan dan penyediaan sparepart untuk kebutuhan industri.",
      layanan: "Repair Sparepart",
      tools: ["Fabrikasi Chain", "Repair Component", "Maintenance"],
    },
  ]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduk, setSelectedProduk] = useState(null);

  const filteredProduk = produkLayananList.filter(
    (item) =>
      item.nama.toLowerCase().includes(search.toLowerCase()) ||
      item.deskripsi.toLowerCase().includes(search.toLowerCase()) ||
      item.layanan.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDelete = (id) => {
    const produk = produkLayananList.find((item) => item.id === id);

    setSelectedProduk(produk);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (!selectedProduk) return;

    setProdukLayananList((prev) =>
      prev.filter((item) => item.id !== selectedProduk.id),
    );

    setSelectedProduk(null);
    setShowDeleteModal(false);
  };

  const cancelDelete = () => {
    setSelectedProduk(null);
    setShowDeleteModal(false);
  };

  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="admin-main">
        <Navbar />

        <main className="produk-layanan-content">
          {/* TITLE */}
          <div className="produk-layanan-title-card">
            <h1>List Produk Layanan</h1>
          </div>

          {/* CONTENT */}
          <div className="produk-layanan-card">
            <h2>Semua Produk Layanan</h2>

            {/* TOOLBAR */}
            <div className="produk-layanan-toolbar">
              <button
                type="button"
                className="btn-tambah-produk-layanan"
                onClick={() => navigate("/produk-layanan/tambah")}
              >
                Tambah Produk
              </button>

              <div className="produk-layanan-search">
                <input
                  type="text"
                  placeholder="Cari"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                <span>⌕</span>
              </div>
            </div>

            {/* TABLE */}
            <div className="produk-layanan-table-wrapper">
              <table className="produk-layanan-table">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Nama Produk Layanan</th>
                    <th>Deskripsi Produk</th>
                    <th>Layanan</th>
                    <th>Nama Tools/Kegiatan</th>
                    <th>Aksi</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredProduk.length > 0 ? (
                    filteredProduk.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>

                        <td className="produk-layanan-name">{item.nama}</td>

                        <td className="produk-layanan-description">
                          {item.deskripsi}
                        </td>

                        <td>{item.layanan}</td>

                        <td>
                          <ul className="produk-layanan-tools">
                            {item.tools.map((tool, toolIndex) => (
                              <li key={toolIndex}>{tool}</li>
                            ))}
                          </ul>
                        </td>

                        <td>
                          <div className="produk-layanan-actions">
                            <button
                              type="button"
                              className="btn-detail"
                              onClick={() =>
                                navigate(`/produk-layanan/detail/${item.id}`)
                              }
                            >
                              Detail
                            </button>

                            <button
                              type="button"
                              className="produk-layanan-edit-btn"
                              onClick={() =>
                                navigate(`/produk-layanan/edit/${item.id}`)
                              }
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              className="produk-layanan-delete-btn"
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
                      <td colSpan="6" className="produk-layanan-empty">
                        Tidak ada produk layanan ditemukan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* DELETE MODAL */}
      {showDeleteModal && (
        <div className="produk-layanan-delete-overlay">
          <div className="produk-layanan-delete-modal">
            <div className="produk-layanan-delete-header">
              <h2>Hapus</h2>

              <button
                type="button"
                className="produk-layanan-delete-close"
                onClick={cancelDelete}
              >
                ×
              </button>
            </div>

            <div className="produk-layanan-delete-body">
              <h3>Apakah anda yakin akan menghapus data?</h3>

              <p>Jika data dihapus, maka akan hilang secara permanen</p>

              <div className="produk-layanan-delete-actions">
                <button
                  type="button"
                  className="produk-layanan-delete-cancel"
                  onClick={cancelDelete}
                >
                  Kembali
                </button>

                <button
                  type="button"
                  className="produk-layanan-delete-confirm"
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
  );
}

export default ProdukLayanan;
