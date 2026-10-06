import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import dropdownArrow from "../../assets/icons/dropdown-arrow.svg";

import "./PengaturanMenuEdit.css";

function PengaturanMenuEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [namaMenu, setNamaMenu] = useState("");
  const [url, setUrl] = useState("");
  const [statusMenu, setStatusMenu] = useState("");
  const [statusOpen, setStatusOpen] = useState(false);

  const [subMenus, setSubMenus] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [posisi, setPosisi] = useState(null);

  // ===============================
  // GET MENU BY ID
  // ===============================
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `http://localhost:5000/api/pengaturan-menu/${id}`,
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Gagal mengambil data menu");
        }

        const menu = data.data;

        setNamaMenu(menu.nama || "");
        setUrl(menu.url || "");
        setStatusMenu(menu.status || "");
        setPosisi(menu.posisi);

        setSubMenus(
          (menu.subMenus || []).map((item) => ({
            id: item.id,
            nama: item.nama,
            url: item.url,
          })),
        );
      } catch (error) {
        console.error("❌ Error fetch menu:", error);
        alert(error.message);
        navigate("/master/pengaturan-menu");
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [id, navigate]);

  // ===============================
  // STATUS
  // ===============================
  const handleStatusSelect = (value) => {
    setStatusMenu(value);
    setStatusOpen(false);
  };

  // ===============================
  // TAMBAH SUB MENU
  // ===============================
  const handleTambahSubMenu = () => {
    setSubMenus([
      ...subMenus,
      {
        id: Date.now(),
        nama: "",
        url: "",
      },
    ]);
  };

  // ===============================
  // UBAH SUB MENU
  // ===============================
  const handleSubMenuChange = (subId, field, value) => {
    setSubMenus(
      subMenus.map((item) =>
        item.id === subId
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    );
  };

  // ===============================
  // HAPUS SUB MENU
  // ===============================
  const handleHapusSubMenu = (subId) => {
    setSubMenus(subMenus.filter((item) => item.id !== subId));
  };

  // ===============================
  // SIMPAN PERUBAHAN
  // ===============================
  const handleSimpan = async (e) => {
    e.preventDefault();

    if (!namaMenu.trim()) {
      alert("Nama Menu wajib diisi!");
      return;
    }

    if (!statusMenu) {
      alert("Status Menu wajib dipilih!");
      return;
    }

    const subMenuTidakLengkap = subMenus.some(
      (item) => !item.nama.trim() || !item.url.trim(),
    );

    if (subMenuTidakLengkap) {
      alert("Nama dan URL setiap Sub Menu wajib diisi!");
      return;
    }

    try {
      setSaving(true);

      const dataMenu = {
        nama: namaMenu.trim(),
        url: url.trim() || null,
        status: statusMenu,
        posisi: posisi,
        subMenus: subMenus.map((item, index) => ({
          id: item.id,
          nama: item.nama.trim(),
          url: item.url.trim(),
          posisi: index + 1,
        })),
      };

      console.log("📤 Data edit menu:", dataMenu);

      const response = await fetch(
        `http://localhost:5000/api/pengaturan-menu/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataMenu),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal memperbarui menu");
      }

      alert("Menu berhasil diperbarui!");

      navigate("/master/pengaturan-menu");
    } catch (error) {
      console.error("❌ Error edit menu:", error);
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  // ===============================
  // LOADING
  // ===============================
  if (loading) {
    return (
      <div className="pengaturan-menu-edit-layout">
        <Sidebar />

        <div className="pengaturan-menu-edit-main">
          <Navbar />

          <main className="pengaturan-menu-edit-content">
            <section className="pengaturan-menu-edit-header">
              <h1>Edit Menu</h1>
            </section>

            <section className="pengaturan-menu-edit-card">
              <div className="pengaturan-menu-edit-card-title">Edit</div>

              <div className="pengaturan-menu-edit-card-content">
                <p>Memuat data...</p>
              </div>
            </section>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="pengaturan-menu-edit-layout">
      <Sidebar />

      <div className="pengaturan-menu-edit-main">
        <Navbar />

        <main className="pengaturan-menu-edit-content">
          {/* HEADER */}
          <section className="pengaturan-menu-edit-header">
            <h1>Edit Menu</h1>
          </section>

          {/* CARD */}
          <section className="pengaturan-menu-edit-card">
            <div className="pengaturan-menu-edit-card-title">Edit</div>

            <form
              className="pengaturan-menu-edit-card-content"
              onSubmit={handleSimpan}
            >
              {/* NAMA MENU */}
              <div className="pengaturan-menu-edit-form-group">
                <label htmlFor="namaMenu">Nama Menu</label>

                <input
                  id="namaMenu"
                  type="text"
                  value={namaMenu}
                  onChange={(e) => setNamaMenu(e.target.value)}
                />
              </div>

              {/* URL */}
              <div className="pengaturan-menu-edit-form-group">
                <label htmlFor="url">
                  URL{" "}
                  <span className="pengaturan-menu-edit-note">
                    *Isi jika menu mengarah ke website lain
                  </span>
                </label>

                <input
                  id="url"
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>

              {/* STATUS */}
              <div className="pengaturan-menu-edit-form-group">
                <label htmlFor="statusMenu">Status Menu</label>

                <div className="pengaturan-menu-edit-form-group">
                  <div className="status-menu-edit-dropdown">
                    <button
                      type="button"
                      className={`status-menu-edit-dropdown-trigger ${
                        statusOpen ? "open" : ""
                      } ${statusMenu ? "has-value" : ""}`}
                      onClick={() => setStatusOpen(!statusOpen)}
                    >
                      <span>{statusMenu || "Status Menu"}</span>

                      <img
                        src={dropdownArrow}
                        alt=""
                        className={`status-menu-edit-dropdown-arrow ${
                          statusOpen ? "rotate" : ""
                        }`}
                      />
                    </button>

                    {statusOpen && (
                      <div className="status-menu-edit-dropdown-list">
                        <button
                          type="button"
                          className="status-menu-edit-dropdown-option"
                          onClick={() => handleStatusSelect("Aktif")}
                        >
                          Aktif
                        </button>

                        <button
                          type="button"
                          className="status-menu-edit-dropdown-option"
                          onClick={() => handleStatusSelect("Tidak Aktif")}
                        >
                          Tidak Aktif
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* SUB MENU */}
              <div className="pengaturan-menu-edit-submenu-section">
                <h3>Sub Menu</h3>

                <div className="pengaturan-menu-edit-divider"></div>

                <button
                  type="button"
                  className="pengaturan-menu-edit-submenu-button"
                  onClick={handleTambahSubMenu}
                >
                  Tambah Sub Menu
                </button>

                {subMenus.length > 0 && (
                  <div className="pengaturan-menu-edit-submenu-list">
                    {subMenus.map((item, index) => (
                      <div
                        className="pengaturan-menu-edit-submenu-item"
                        key={item.id}
                      >
                        <span className="pengaturan-menu-edit-submenu-number">
                          {index + 1}
                        </span>

                        <input
                          type="text"
                          placeholder="Nama Sub Menu"
                          value={item.nama}
                          onChange={(e) =>
                            handleSubMenuChange(item.id, "nama", e.target.value)
                          }
                        />

                        <input
                          type="text"
                          placeholder="URL Sub Menu"
                          value={item.url}
                          onChange={(e) =>
                            handleSubMenuChange(item.id, "url", e.target.value)
                          }
                        />

                        <button
                          type="button"
                          className="pengaturan-menu-edit-submenu-delete"
                          onClick={() => handleHapusSubMenu(item.id)}
                        >
                          Hapus
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* SIMPAN */}
              <button
                type="submit"
                className="pengaturan-menu-edit-save-button"
                disabled={saving}
              >
                {saving ? "Menyimpan..." : "Simpan"}
              </button>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}

export default PengaturanMenuEdit;
