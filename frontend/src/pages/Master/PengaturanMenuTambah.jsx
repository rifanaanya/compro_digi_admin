import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import dropdownArrow from "../../assets/icons/dropdown-arrow.svg";

import "./PengaturanMenuTambah.css";

function PengaturanMenuTambah() {
  const navigate = useNavigate();

  const [namaMenu, setNamaMenu] = useState("");
  const [url, setUrl] = useState("");
  const [statusMenu, setStatusMenu] = useState("");
  const [statusOpen, setStatusOpen] = useState(false);
  const [subMenus, setSubMenus] = useState([]);
  const [loading, setLoading] = useState(false);

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
  const handleSubMenuChange = (id, field, value) => {
    setSubMenus(
      subMenus.map((item) =>
        item.id === id
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
  const handleHapusSubMenu = (id) => {
    setSubMenus(subMenus.filter((item) => item.id !== id));
  };

  // ===============================
  // SIMPAN MENU
  // ===============================
  const handleSimpan = async (e) => {
    e.preventDefault();

    // Validasi nama menu
    if (!namaMenu.trim()) {
      alert("Nama Menu wajib diisi!");
      return;
    }

    // Validasi status
    if (!statusMenu) {
      alert("Status Menu wajib dipilih!");
      return;
    }

    // Validasi submenu
    const subMenuTidakLengkap = subMenus.some(
      (item) => !item.nama.trim() || !item.url.trim(),
    );

    if (subMenuTidakLengkap) {
      alert("Nama dan URL setiap Sub Menu wajib diisi!");
      return;
    }

    try {
      setLoading(true);

      // ===============================
      // AMBIL DATA MENU TERAKHIR
      // ===============================
      const menuResponse = await fetch(
        "http://localhost:5000/api/pengaturan-menu",
      );

      const menuData = await menuResponse.json();

      if (!menuResponse.ok) {
        throw new Error(menuData.message || "Gagal mengambil data menu");
      }

      const menus = menuData.data || [];

      // Cari posisi terbesar
      const posisiTerakhir = menus.reduce(
        (max, menu) => Math.max(max, Number(menu.posisi) || 0),
        0,
      );

      const posisiBaru = posisiTerakhir + 1;

      // ===============================
      // DATA YANG DIKIRIM
      // ===============================
      const dataMenu = {
        nama: namaMenu.trim(),
        url: url.trim() || null,
        status: statusMenu,
        posisi: posisiBaru,

        subMenus: subMenus.map((item, index) => ({
          nama: item.nama.trim(),
          url: item.url.trim(),
          posisi: index + 1,
        })),
      };

      console.log("📤 Data tambah menu:", dataMenu);

      // ===============================
      // POST KE API
      // ===============================
      const response = await fetch(
        "http://localhost:5000/api/pengaturan-menu",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataMenu),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal menambahkan menu");
      }

      alert("Menu berhasil ditambahkan!");

      navigate("/master/pengaturan-menu");
    } catch (error) {
      console.error("❌ Error tambah menu:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tambah-menu-layout">
      {/* SIDEBAR */}
      <Sidebar />

      <div className="tambah-menu-main">
        {/* NAVBAR */}
        <Navbar />

        <main className="tambah-menu-content">
          {/* HEADER */}
          <section className="tambah-menu-header">
            <h1>Tambah Menu</h1>
          </section>

          {/* CARD */}
          <section className="tambah-menu-card">
            <div className="tambah-menu-card-title">Tambah</div>

            <form className="tambah-menu-card-content" onSubmit={handleSimpan}>
              {/* NAMA MENU */}
              <div className="tambah-menu-form-group">
                <label htmlFor="namaMenu">Nama Menu</label>

                <input
                  id="namaMenu"
                  type="text"
                  placeholder="Masukkan Nama Menu"
                  value={namaMenu}
                  onChange={(e) => setNamaMenu(e.target.value)}
                />
              </div>

              {/* URL */}
              <div className="tambah-menu-form-group">
                <label htmlFor="url">
                  URL{" "}
                  <span className="tambah-menu-note">
                    *Isi jika menu mengarah ke website lain
                  </span>
                </label>

                <input
                  id="url"
                  type="text"
                  placeholder="Masukkan URL"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>

              {/* STATUS MENU */}
              <div className="tambah-menu-form-group">
                <label htmlFor="statusMenu">Status Menu</label>

                <div className="status-menu-dropdown">
                  <button
                    type="button"
                    className={`status-menu-dropdown-trigger ${
                      statusOpen ? "open" : ""
                    } ${statusMenu ? "has-value" : ""}`}
                    onClick={() => setStatusOpen(!statusOpen)}
                  >
                    <span>{statusMenu || "Status Menu"}</span>

                    <img
                      src={dropdownArrow}
                      alt=""
                      className={`status-menu-dropdown-arrow ${
                        statusOpen ? "rotate" : ""
                      }`}
                    />
                  </button>

                  {statusOpen && (
                    <div className="status-menu-dropdown-list">
                      <button
                        type="button"
                        className="status-menu-dropdown-option"
                        onClick={() => handleStatusSelect("")}
                      >
                        Status Menu
                      </button>

                      <button
                        type="button"
                        className="status-menu-dropdown-option"
                        onClick={() => handleStatusSelect("Aktif")}
                      >
                        Aktif
                      </button>

                      <button
                        type="button"
                        className="status-menu-dropdown-option"
                        onClick={() => handleStatusSelect("Tidak Aktif")}
                      >
                        Tidak Aktif
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* SUB MENU */}
              <div className="tambah-menu-submenu-section">
                <h3>Sub Menu</h3>

                <div className="tambah-menu-divider"></div>

                <button
                  type="button"
                  className="tambah-menu-submenu-button"
                  onClick={handleTambahSubMenu}
                >
                  Tambah Sub Menu
                </button>

                {/* LIST SUB MENU */}
                {subMenus.length > 0 && (
                  <div className="tambah-menu-submenu-list">
                    {subMenus.map((item, index) => (
                      <div className="tambah-menu-submenu-item" key={item.id}>
                        <div className="tambah-menu-submenu-number">
                          {index + 1}
                        </div>

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
                          className="tambah-menu-submenu-delete"
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
                className="tambah-menu-save-button"
                disabled={loading}
              >
                {loading ? "Menyimpan..." : "Simpan"}
              </button>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}

export default PengaturanMenuTambah;
