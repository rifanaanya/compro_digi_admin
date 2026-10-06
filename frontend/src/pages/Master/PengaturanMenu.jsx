import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./PengaturanMenu.css";

function PengaturanMenu() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState(null);

  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);

  // ===============================
  // GET SEMUA MENU
  // ===============================
  const fetchMenuData = async () => {
    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/pengaturan-menu");

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal mengambil data menu");
      }

      setMenuData(data.data || []);
    } catch (error) {
      console.error("❌ Error fetch menu:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuData();
  }, []);

  // ===============================
  // FILTER SEARCH
  // ===============================
  const filteredData = menuData.filter((item) => {
    const submenuText = (item.subMenus || [])
      .map((sub) => `${sub.nama} ${sub.url}`)
      .join(" ");

    return `${item.nama} ${item.url || ""} ${item.status} ${submenuText}`
      .toLowerCase()
      .includes(search.toLowerCase());
  });

  // ===============================
  // TAMBAH
  // ===============================
  const handleAdd = () => {
    navigate("/master/pengaturan-menu/tambah");
  };

  // ===============================
  // EDIT
  // ===============================
  const handleEdit = (item) => {
    if (item.id === 3) {
      navigate("/master/pengaturan-menu/detail/3");
    } else {
      navigate(`/master/pengaturan-menu/edit/${item.id}`);
    }
  };

  // ===============================
  // DELETE
  // ===============================
  const handleDelete = (id) => {
    setSelectedDeleteId(id);
    setDeleteModal(true);
  };

  const handleCancelDelete = () => {
    setDeleteModal(false);
    setSelectedDeleteId(null);
  };

  const handleConfirmDelete = async () => {
    if (!selectedDeleteId) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/pengaturan-menu/${selectedDeleteId}`,
        {
          method: "DELETE",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal menghapus menu");
      }

      alert("Menu berhasil dihapus!");

      setMenuData((prev) =>
        prev.filter((item) => item.id !== selectedDeleteId),
      );

      setDeleteModal(false);
      setSelectedDeleteId(null);
    } catch (error) {
      console.error("❌ Error delete menu:", error);
      alert(error.message);
    }
  };

  return (
    <div className="pengaturan-menu-layout">
      {/* SIDEBAR */}
      <Sidebar />

      <div className="pengaturan-menu-main">
        {/* NAVBAR */}
        <Navbar />

        <main className="pengaturan-menu-content">
          {/* HEADER */}
          <section className="pengaturan-menu-header">
            <h1>Pengaturan Menu</h1>
          </section>

          {/* CARD */}
          <section className="pengaturan-menu-card">
            <div className="pengaturan-menu-card-title">
              Semua Menu dan Sub Menu
            </div>

            <div className="pengaturan-menu-card-content">
              {/* TOP ACTION */}
              <div className="pengaturan-menu-top-action">
                <button
                  type="button"
                  className="pengaturan-menu-add-button"
                  onClick={handleAdd}
                >
                  Tambah Menu
                </button>

                {/* SEARCH */}
                <div className="pengaturan-menu-search">
                  <input
                    type="text"
                    placeholder="Cari"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />

                  <span className="pengaturan-menu-search-icon">⌕</span>
                </div>
              </div>

              {/* TABLE */}
              <div className="pengaturan-menu-table-wrapper">
                <table className="pengaturan-menu-table">
                  <thead>
                    <tr>
                      <th className="pengaturan-menu-no">No.</th>

                      <th>Nama Menu</th>

                      <th>URL</th>

                      <th className="pengaturan-menu-status">Status</th>

                      <th className="pengaturan-menu-submenu">Sub Menu</th>

                      <th className="pengaturan-menu-action-header">Aksi</th>
                    </tr>
                  </thead>

                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="6" className="pengaturan-menu-empty">
                          Memuat data...
                        </td>
                      </tr>
                    ) : filteredData.length > 0 ? (
                      filteredData.map((item, index) => (
                        <tr key={item.id}>
                          <td className="pengaturan-menu-no">{index + 1}</td>

                          <td>{item.nama}</td>

                          <td>{item.url || "-"}</td>

                          <td className="pengaturan-menu-status">
                            {item.status}
                          </td>

                          <td className="pengaturan-menu-submenu">
                            {item.subMenus && item.subMenus.length > 0 ? (
                              item.subMenus.map((subMenu) => (
                                <div key={subMenu.id}>- {subMenu.nama}</div>
                              ))
                            ) : (
                              <div>-</div>
                            )}
                          </td>

                          <td className="pengaturan-menu-actions">
                            <button
                              type="button"
                              className="pengaturan-menu-edit-button"
                              onClick={() => handleEdit(item)}
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              className="pengaturan-menu-delete-button"
                              onClick={() => handleDelete(item.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="pengaturan-menu-empty">
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
          <div className="pengaturan-menu-delete-overlay">
            <div className="pengaturan-menu-delete-modal">
              <div className="pengaturan-menu-delete-modal-header">
                <h2>Hapus</h2>

                <button
                  type="button"
                  className="pengaturan-menu-delete-close"
                  onClick={handleCancelDelete}
                >
                  ×
                </button>
              </div>

              <div className="pengaturan-menu-delete-modal-content">
                <p className="pengaturan-menu-delete-question">
                  Apakah anda yakin akan menghapus data?
                </p>

                <p className="pengaturan-menu-delete-description">
                  Jika data dihapus, maka akan hilang secara permanen
                </p>

                <div className="pengaturan-menu-delete-modal-actions">
                  <button
                    type="button"
                    className="pengaturan-menu-delete-cancel"
                    onClick={handleCancelDelete}
                  >
                    Kembali
                  </button>

                  <button
                    type="button"
                    className="pengaturan-menu-delete-confirm"
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

export default PengaturanMenu;
