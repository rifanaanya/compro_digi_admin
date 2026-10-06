import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import dropdownArrow from "../../assets/icons/dropdown-arrow.svg";

import "./HalamanTambah.css";

function HalamanTambah() {
  const navigate = useNavigate();

  const [judul, setJudul] = useState("");
  const [menu, setMenu] = useState("");
  const [isi, setIsi] = useState("");
  const [gambar, setGambar] = useState(null);
  const [tampilkan, setTampilkan] = useState("");
  const [tipe, setTipe] = useState("");

  const [menuOpen, setMenuOpen] = useState(false);
  const [tampilkanOpen, setTampilkanOpen] = useState(false);
  const [tipeOpen, setTipeOpen] = useState(false);

  const handleSimpan = (e) => {
    e.preventDefault();

    console.log({
      judul,
      menu,
      isi,
      gambar,
      tampilkan,
      tipe,
    });

    navigate("/master/halaman");
  };

  const handleMenuSelect = (value) => {
    setMenu(value);
    setMenuOpen(false);
  };

  const handleTampilkanSelect = (value) => {
    setTampilkan(value);
    setTampilkanOpen(false);
  };

  const handleTipeSelect = (value) => {
    setTipe(value);
    setTipeOpen(false);
  };

  return (
    <div className="halaman-tambah-layout">
      <Sidebar />

      <div className="halaman-tambah-main">
        <Navbar />

        <main className="halaman-tambah-content">
          {/* HEADER */}
          <section className="halaman-tambah-header">
            <h1>Tambah Halaman</h1>
          </section>

          {/* CARD */}
          <section className="halaman-tambah-card">
            <div className="halaman-tambah-card-title">Tambah</div>

            <form
              className="halaman-tambah-card-content"
              onSubmit={handleSimpan}
            >
              {/* JUDUL */}
              <div className="halaman-tambah-form-group">
                <label htmlFor="judul">Judul Halaman</label>

                <input
                  id="judul"
                  type="text"
                  placeholder="Masukkan Nama"
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                />
              </div>

              {/* MENU */}
              <div className="halaman-tambah-form-group">
                <label>Menu</label>

                <div
                  className={`halaman-tambah-custom-dropdown ${
                    menuOpen ? "dropdown-open" : ""
                  }`}
                >
                  <button
                    type="button"
                    className={`halaman-tambah-dropdown-trigger ${
                      menuOpen ? "open" : ""
                    } ${menu ? "has-value" : ""}`}
                    onClick={() => {
                      setMenuOpen(!menuOpen);
                      setTampilkanOpen(false);
                      setTipeOpen(false);
                    }}
                  >
                    <span>{menu || "Pilih Menu"}</span>

                    <img
                      src={dropdownArrow}
                      alt=""
                      className={`halaman-tambah-dropdown-arrow ${
                        menuOpen ? "rotate" : ""
                      }`}
                    />
                  </button>

                  {menuOpen && (
                    <div className="halaman-tambah-dropdown-menu">
                      <button
                        type="button"
                        className={`halaman-tambah-dropdown-option ${
                          menu === "" ? "selected" : ""
                        }`}
                        onClick={() => handleMenuSelect("")}
                      >
                        Pilih Menu
                      </button>

                      <button
                        type="button"
                        className={`halaman-tambah-dropdown-option ${
                          menu === "Beranda" ? "selected" : ""
                        }`}
                        onClick={() => handleMenuSelect("Beranda")}
                      >
                        Beranda
                      </button>

                      <button
                        type="button"
                        className={`halaman-tambah-dropdown-option ${
                          menu === "Tentang Digi" ? "selected" : ""
                        }`}
                        onClick={() => handleMenuSelect("Tentang Digi")}
                      >
                        Tentang Digi
                      </button>

                      <button
                        type="button"
                        className={`halaman-tambah-dropdown-option ${
                          menu === "Produk" ? "selected" : ""
                        }`}
                        onClick={() => handleMenuSelect("Produk")}
                      >
                        Produk
                      </button>

                      <button
                        type="button"
                        className={`halaman-tambah-dropdown-option ${
                          menu === "Layanan" ? "selected" : ""
                        }`}
                        onClick={() => handleMenuSelect("Layanan")}
                      >
                        Layanan
                      </button>

                      <button
                        type="button"
                        className={`halaman-tambah-dropdown-option ${
                          menu === "Mitra" ? "selected" : ""
                        }`}
                        onClick={() => handleMenuSelect("Mitra")}
                      >
                        Mitra
                      </button>

                      <button
                        type="button"
                        className={`halaman-tambah-dropdown-option ${
                          menu === "Kegiatan" ? "selected" : ""
                        }`}
                        onClick={() => handleMenuSelect("Kegiatan")}
                      >
                        Kegiatan
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* ISI HALAMAN */}
              <div className="halaman-tambah-form-group">
                <label htmlFor="isi">Isi Halaman</label>

                <textarea
                  id="isi"
                  placeholder="Masukkan Isi Halaman"
                  value={isi}
                  onChange={(e) => setIsi(e.target.value)}
                />
              </div>

              {/* UPLOAD GAMBAR */}
              <div className="halaman-tambah-form-group">
                <label htmlFor="gambar">Upload Gambar</label>

                <input
                  id="gambar"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setGambar(e.target.files[0])}
                />
              </div>

              {/* TAMPILKAN */}
              <div className="halaman-tambah-form-group">
                <label>Tampilkan Halaman?</label>

                <div
                  className={`halaman-tambah-custom-dropdown ${
                    tampilkanOpen ? "dropdown-open" : ""
                  }`}
                >
                  <button
                    type="button"
                    className={`halaman-tambah-dropdown-trigger ${
                      tampilkanOpen ? "open" : ""
                    } ${tampilkan ? "has-value" : ""}`}
                    onClick={() => {
                      setTampilkanOpen(!tampilkanOpen);
                      setMenuOpen(false);
                      setTipeOpen(false);
                    }}
                  >
                    <span>{tampilkan || "Tampilkan Halaman?"}</span>

                    <img
                      src={dropdownArrow}
                      alt=""
                      className={`halaman-tambah-dropdown-arrow ${
                        tampilkanOpen ? "rotate" : ""
                      }`}
                    />
                  </button>

                  {tampilkanOpen && (
                    <div className="halaman-tambah-dropdown-menu">
                      <button
                        type="button"
                        className={`halaman-tambah-dropdown-option ${
                          tampilkan === "" ? "selected" : ""
                        }`}
                        onClick={() => handleTampilkanSelect("")}
                      >
                        Tampilkan Halaman?
                      </button>

                      <button
                        type="button"
                        className={`halaman-tambah-dropdown-option ${
                          tampilkan === "Ya" ? "selected" : ""
                        }`}
                        onClick={() => handleTampilkanSelect("Ya")}
                      >
                        Ya
                      </button>

                      <button
                        type="button"
                        className={`halaman-tambah-dropdown-option ${
                          tampilkan === "Tidak" ? "selected" : ""
                        }`}
                        onClick={() => handleTampilkanSelect("Tidak")}
                      >
                        Tidak
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* TIPE */}
              <div className="halaman-tambah-form-group">
                <label>Tipe</label>

                <div
                  className={`halaman-tambah-custom-dropdown ${
                    tipeOpen ? "dropdown-open" : ""
                  }`}
                >
                  <button
                    type="button"
                    className={`halaman-tambah-dropdown-trigger ${
                      tipeOpen ? "open" : ""
                    } ${tipe ? "has-value" : ""}`}
                    onClick={() => {
                      setTipeOpen(!tipeOpen);
                      setMenuOpen(false);
                      setTampilkanOpen(false);
                    }}
                  >
                    <span>{tipe || "Pilih Tipe Halaman"}</span>

                    <img
                      src={dropdownArrow}
                      alt=""
                      className={`halaman-tambah-dropdown-arrow ${
                        tipeOpen ? "rotate" : ""
                      }`}
                    />
                  </button>

                  {tipeOpen && (
                    <div className="halaman-tambah-dropdown-menu">
                      <button
                        type="button"
                        className={`halaman-tambah-dropdown-option ${
                          tipe === "" ? "selected" : ""
                        }`}
                        onClick={() => handleTipeSelect("")}
                      >
                        Pilih Tipe Halaman
                      </button>

                      <button
                        type="button"
                        className={`halaman-tambah-dropdown-option ${
                          tipe === "Default" ? "selected" : ""
                        }`}
                        onClick={() => handleTipeSelect("Default")}
                      >
                        Default
                      </button>

                      <button
                        type="button"
                        className={`halaman-tambah-dropdown-option ${
                          tipe === "List" ? "selected" : ""
                        }`}
                        onClick={() => handleTipeSelect("List")}
                      >
                        List
                      </button>

                      <button
                        type="button"
                        className={`halaman-tambah-dropdown-option ${
                          tipe === "Post Grid" ? "selected" : ""
                        }`}
                        onClick={() => handleTipeSelect("Post Grid")}
                      >
                        Post Grid
                      </button>

                      <button
                        type="button"
                        className={`halaman-tambah-dropdown-option ${
                          tipe === "Pict" ? "selected" : ""
                        }`}
                        onClick={() => handleTipeSelect("Pict")}
                      >
                        Pict
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* SIMPAN */}
              <button type="submit" className="halaman-tambah-save-button">
                Simpan
              </button>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}

export default HalamanTambah;
