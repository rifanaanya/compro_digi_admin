import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import "./Produk.css";

function Produk() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const [produkList] = useState([
    {
      id: 1,
      nama: "MIS DIGI (Management Information System Digi)",
      deskripsi:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Duis tincidunt tempus leo non porta.",
      kelebihan:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Duis tincidunt tempus leo non porta.",
      kekurangan:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Duis tincidunt tempus leo non porta.",
      gambar: "/produk/mis-digi.png",
      tipe: "Produk",
    },
  ]);

  const filteredProduk = produkList.filter((item) =>
    item.nama.toLowerCase().includes(search.toLowerCase()),
  );

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduk, setSelectedProduk] = useState(null);

  const handleDelete = (id) => {
    const produk = produkList.find((item) => item.id === id);

    setSelectedProduk(produk);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (!selectedProduk) return;

    setProdukList((prev) =>
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

        <main className="produk-content">
          {/* PAGE TITLE */}
          <div className="produk-title-card">
            <h1>List Produk</h1>
          </div>

          {/* CONTENT */}
          <div className="produk-card">
            <h2>Semua Produk</h2>

            {/* TOOLBAR */}
            <div className="produk-toolbar">
              <button
                type="button"
                className="produk-tambah-btn"
                onClick={() => navigate("/produk/tambah")}
              >
                Tambah Produk
              </button>

              <div className="produk-search">
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
            <div className="produk-table-wrapper">
              <table className="produk-table">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Nama Produk</th>
                    <th>Deskripsi Produk</th>
                    <th>Kelebihan &amp; Kekurangan</th>
                    <th>Gambar Produk</th>
                    <th>Aksi</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredProduk.length > 0 ? (
                    filteredProduk.map((item, index) => (
                      <tr key={item.id}>
                        {/* NO */}
                        <td>{index + 1}</td>

                        {/* NAMA PRODUK */}
                        <td className="produk-name">{item.nama}</td>

                        {/* DESKRIPSI */}
                        <td className="produk-description">{item.deskripsi}</td>

                        {/* KELEBIHAN & KEKURANGAN */}
                        <td className="produk-kelebihan">
                          <ul>
                            <li>{item.kelebihan}</li>
                            <li>{item.kekurangan}</li>
                          </ul>
                        </td>

                        {/* GAMBAR */}
                        <td>
                          <div className="produk-image-wrapper">
                            <img
                              src={item.gambar}
                              alt={item.nama}
                              className="produk-image"
                            />
                          </div>
                        </td>

                        {/* AKSI */}
                        <td>
                          <div className="produk-actions">
                            <button
                              type="button"
                              className="produk-detail-btn"
                              onClick={() =>
                                navigate(`/produk/detail/${item.id}`)
                              }
                            >
                              Detail
                            </button>

                            <button
                              type="button"
                              className="produk-edit-btn"
                              onClick={() =>
                                navigate(`/produk/edit/${item.id}`)
                              }
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              className="produk-delete-btn"
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
                      <td colSpan="6" className="produk-empty-message">
                        Tidak ada produk ditemukan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {showDeleteModal && (
            <div className="produk-delete-overlay">
              <div className="produk-delete-modal">
                <div className="produk-delete-header">
                  <h2>Hapus</h2>

                  <button
                    type="button"
                    className="produk-delete-close"
                    onClick={cancelDelete}
                  >
                    ×
                  </button>
                </div>

                <div className="produk-delete-body">
                  <h3>Apakah anda yakin akan menghapus data?</h3>

                  <p>Jika data dihapus, maka akan hilang secara permanen</p>

                  <div className="produk-delete-actions">
                    <button
                      type="button"
                      className="produk-delete-cancel"
                      onClick={cancelDelete}
                    >
                      Kembali
                    </button>

                    <button
                      type="button"
                      className="produk-delete-confirm"
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

export default Produk;
