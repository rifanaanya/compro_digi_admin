import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./KontakMasuk.css";

function KontakMasuk() {
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/kontak-masuk");

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Gagal mengambil pesan masuk.");
        }

        setMessages(result.data);
      } catch (error) {
        console.error("❌ Error mengambil Kontak Masuk:", error);
      }
    };

    fetchMessages();
  }, []);

  const handleDelete = (id) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    if (deleteId === null) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/kontak-masuk/${deleteId}`,
        {
          method: "DELETE",
        },
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Gagal menghapus pesan.");
      }

      setMessages((prev) => prev.filter((item) => item.id !== deleteId));

      setDeleteId(null);
    } catch (error) {
      console.error("❌ Error menghapus Kontak Masuk:", error);

      alert(error.message || "Gagal menghapus pesan.");
    }
  };

  const cancelDelete = () => {
    setDeleteId(null);
  };

  const filteredMessages = messages.filter(
    (item) =>
      item.nama.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase()) ||
      item.pesan.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="admin-main">
        <Navbar />

        <main className="kontak-masuk-content">
          {/* PAGE TITLE */}
          <div className="page-title-card">
            <h1>Kontak Masuk</h1>
          </div>

          {/* CONTENT CARD */}
          <div className="kontak-card">
            <h2>Semua Pesan Masuk</h2>

            {/* SEARCH */}
            <div className="kontak-search">
              <input
                type="text"
                placeholder="Cari"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <span>⌕</span>
            </div>

            {/* TABLE */}
            <div className="kontak-table-wrapper">
              <table className="kontak-table">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Nama Pengirim</th>
                    <th>Email</th>
                    <th>Pesan</th>
                    <th>Tanggal Kirim</th>
                    <th>Aksi</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredMessages.length > 0 ? (
                    filteredMessages.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>

                        <td>{item.nama}</td>

                        <td>{item.email}</td>

                        <td>{item.pesan}</td>

                        <td>
                          {new Date(item.createdAt).toLocaleString("id-ID")}
                        </td>

                        <td>
                          <div className="kontak-actions">
                            <button
                              className="btn-lihat"
                              onClick={() =>
                                navigate(`/kontak-masuk/detail/${item.id}`)
                              }
                            >
                              Lihat
                            </button>

                            <button
                              className="btn-delete"
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
                      <td colSpan="6" className="empty-message">
                        Tidak ada pesan ditemukan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        {deleteId !== null && (
          <div className="delete-modal-overlay">
            <div className="delete-modal">
              <div className="delete-modal-header">
                <h3>Hapus</h3>

                <button className="delete-modal-close" onClick={cancelDelete}>
                  ×
                </button>
              </div>

              <div className="delete-modal-body">
                <h4>Apakah anda yakin akan menghapus data?</h4>

                <p>Jika data dihapus, maka akan hilang secara permanen</p>

                <div className="delete-modal-actions">
                  <button className="delete-cancel-btn" onClick={cancelDelete}>
                    Kembali
                  </button>

                  <button
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
      </div>
    </div>
  );
}

export default KontakMasuk;
