import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import "./FooterColumn.css";

function FooterColumn() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [deleteId, setDeleteId] = useState(null);

  const [footerColumnData, setFooterColumnData] = useState([]);
  const [loading, setLoading] = useState(true);

  const filteredData = footerColumnData.filter((item) =>
    `${item.nama} Footer Column ${item.posisi}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const handleEdit = (id) => {
    navigate(`/master/footer-column/edit/${id}`);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
  };

  const handleCancelDelete = () => {
    setDeleteId(null);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/footer-column/${deleteId}`,
        {
          method: "DELETE",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal menghapus footer column");
      }

      setFooterColumnData((prevData) =>
        prevData.filter((item) => item.id !== deleteId),
      );

      setDeleteId(null);

      alert("Footer column berhasil dihapus!");
    } catch (error) {
      console.error("❌ Error delete footer column:", error);
      alert(error.message);
    }
  };

  useEffect(() => {
    const fetchFooterColumn = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/footer-column");

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Gagal mengambil data footer column");
        }

        setFooterColumnData(data.data);
      } catch (error) {
        console.error("❌ Error fetch footer column:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFooterColumn();
  }, []);
  return (
    <div className="footer-column-layout">
      {/* SIDEBAR */}
      <Sidebar />

      <div className="footer-column-main">
        {/* NAVBAR */}
        <Navbar />

        <main className="footer-column-content">
          {/* HEADER */}
          <section className="footer-column-header">
            <h1>List Footer Column</h1>
          </section>

          {/* CARD */}
          <section className="footer-column-card">
            <div className="footer-column-card-title">Semua Footer Column</div>

            <div className="footer-column-card-content">
              {/* TOP ACTION */}
              <div className="footer-column-top-action">
                <button
                  type="button"
                  className="footer-column-add-button"
                  onClick={() => navigate("/master/footer-column/tambah")}
                >
                  Tambah Footer Column
                </button>

                {/* SEARCH */}
                <div className="footer-column-search">
                  <input
                    type="text"
                    placeholder="Cari"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />

                  <span className="footer-column-search-icon">⌕</span>
                </div>
              </div>

              {/* TABLE */}
              <div className="footer-column-table-wrapper">
                <table className="footer-column-table">
                  <thead>
                    <tr>
                      <th className="footer-column-no">No.</th>
                      <th>Nama Footer Column</th>
                      <th>Column</th>
                      <th className="footer-column-action-header">Aksi</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredData.length > 0 ? (
                      filteredData.map((item) => (
                        <tr key={item.id}>
                          <td className="footer-column-no">{item.id}</td>

                          <td>{item.nama}</td>

                          <td>{`Footer Column ${item.posisi}`}</td>

                          <td className="footer-column-actions">
                            <button
                              type="button"
                              className="footer-column-edit-button"
                              onClick={() => handleEdit(item.id)}
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              className="footer-column-delete-button"
                              onClick={() => handleDelete(item.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="footer-column-empty">
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
              <div className="delete-modal-header">
                <h2>Hapus</h2>

                <button
                  type="button"
                  className="delete-modal-close"
                  onClick={handleCancelDelete}
                >
                  ×
                </button>
              </div>

              <div className="delete-modal-body">
                <p className="delete-modal-question">
                  Apakah anda yakin akan menghapus data?
                </p>

                <p className="delete-modal-description">
                  Jika data dihapus, maka akan hilang secara permanen
                </p>

                <div className="delete-modal-actions">
                  <button
                    type="button"
                    className="delete-modal-back"
                    onClick={handleCancelDelete}
                  >
                    Kembali
                  </button>

                  <button
                    type="button"
                    className="delete-modal-confirm"
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

export default FooterColumn;
