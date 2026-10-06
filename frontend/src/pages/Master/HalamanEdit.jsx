import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import dropdownArrow from "../../assets/icons/dropdown-arrow.svg";

import "./HalamanEdit.css";

function HalamanEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Data sementara berdasarkan ID
  const halamanData = {
    1: {
      judul: "Blog",
      menu: "Blog",
      isi: "",
      tampilkan: "Ya",
      tipe: "List",
    },
    2: {
      judul: "FAQ",
      menu: "FAQ",
      isi: "",
      tampilkan: "Ya",
      tipe: "Post Grid",
    },
    3: {
      judul: "Home - Tentang Digi",
      menu: "Tentang Digi",
      isi: "",
      tampilkan: "Ya",
      tipe: "Default",
    },
    7: {
      judul: "Mitra",
      menu: "Mitra",
      isi: "",
      tampilkan: "Ya",
      tipe: "Post Grid",
    },
  };

  const data = halamanData[id] || halamanData[7];

  const [judul, setJudul] = useState(data.judul);
  const [menu, setMenu] = useState(data.menu);
  const [isi, setIsi] = useState(data.isi);
  const [gambar, setGambar] = useState(null);
  const [tampilkan, setTampilkan] = useState(data.tampilkan);
  const [tipe, setTipe] = useState(data.tipe);

  const [menuOpen, setMenuOpen] = useState(false);
  const [tampilkanOpen, setTampilkanOpen] = useState(false);
  const [tipeOpen, setTipeOpen] = useState(false);

  const handleSimpan = (e) => {
    e.preventDefault();

    console.log({
      id,
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
    <div className="halaman-edit-layout">
      <Sidebar />

      <div className="halaman-edit-main">
        <Navbar />

        <main className="halaman-edit-content">
          {/* HEADER */}
          <section className="halaman-edit-header">
            <h1>Edit Halaman</h1>
          </section>

          {/* CARD */}
          <section className="halaman-edit-card">
            <div className="halaman-edit-card-title">Edit</div>

            <form className="halaman-edit-card-content" onSubmit={handleSimpan}>
              {/* JUDUL */}
              <div className="halaman-edit-form-group">
                <label htmlFor="judul">Judul Halaman</label>

                <input
                  id="judul"
                  type="text"
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                />
              </div>

              {/* MENU */}
              <div className="halaman-edit-form-group">
                <label>Menu</label>

                <div
                  className={`halaman-edit-custom-dropdown ${
                    menuOpen ? "dropdown-open" : ""
                  }`}
                >
                  <button
                    type="button"
                    className={`halaman-edit-dropdown-trigger ${
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
                      className={`halaman-edit-dropdown-arrow ${
                        menuOpen ? "rotate" : ""
                      }`}
                    />
                  </button>

                  {menuOpen && (
                    <div className="halaman-edit-dropdown-menu">
                      <button
                        type="button"
                        className={`halaman-edit-dropdown-option ${
                          menu === "" ? "selected" : ""
                        }`}
                        onClick={() => handleMenuSelect("")}
                      >
                        Pilih Menu
                      </button>

                      <button
                        type="button"
                        className={`halaman-edit-dropdown-option ${
                          menu === "Blog" ? "selected" : ""
                        }`}
                        onClick={() => handleMenuSelect("Blog")}
                      >
                        Blog
                      </button>

                      <button
                        type="button"
                        className={`halaman-edit-dropdown-option ${
                          menu === "FAQ" ? "selected" : ""
                        }`}
                        onClick={() => handleMenuSelect("FAQ")}
                      >
                        FAQ
                      </button>

                      <button
                        type="button"
                        className={`halaman-edit-dropdown-option ${
                          menu === "Tentang Digi" ? "selected" : ""
                        }`}
                        onClick={() => handleMenuSelect("Tentang Digi")}
                      >
                        Tentang Digi
                      </button>

                      <button
                        type="button"
                        className={`halaman-edit-dropdown-option ${
                          menu === "Mitra" ? "selected" : ""
                        }`}
                        onClick={() => handleMenuSelect("Mitra")}
                      >
                        Mitra
                      </button>

                      <button
                        type="button"
                        className={`halaman-edit-dropdown-option ${
                          menu === "Produk" ? "selected" : ""
                        }`}
                        onClick={() => handleMenuSelect("Produk")}
                      >
                        Produk
                      </button>

                      <button
                        type="button"
                        className={`halaman-edit-dropdown-option ${
                          menu === "Visi Misi" ? "selected" : ""
                        }`}
                        onClick={() => handleMenuSelect("Visi Misi")}
                      >
                        Visi Misi
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* ISI */}
              <div className="halaman-edit-form-group">
                <label htmlFor="isi">Isi Halaman</label>

                <textarea
                  id="isi"
                  value={isi}
                  onChange={(e) => setIsi(e.target.value)}
                />
              </div>

              {/* GAMBAR */}
              <div className="halaman-edit-form-group">
                <label htmlFor="gambar">Upload Gambar</label>

                <input
                  id="gambar"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setGambar(e.target.files[0])}
                />
              </div>

              {/* TAMPILKAN */}
              <div className="halaman-edit-form-group">
                <label>Tampilkan Halaman?</label>

                <div
                  className={`halaman-edit-custom-dropdown ${
                    tampilkanOpen ? "dropdown-open" : ""
                  }`}
                >
                  <button
                    type="button"
                    className={`halaman-edit-dropdown-trigger ${
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
                      className={`halaman-edit-dropdown-arrow ${
                        tampilkanOpen ? "rotate" : ""
                      }`}
                    />
                  </button>

                  {tampilkanOpen && (
                    <div className="halaman-edit-dropdown-menu">
                      <button
                        type="button"
                        className={`halaman-edit-dropdown-option ${
                          tampilkan === "" ? "selected" : ""
                        }`}
                        onClick={() => handleTampilkanSelect("")}
                      >
                        Tampilkan Halaman?
                      </button>

                      <button
                        type="button"
                        className={`halaman-edit-dropdown-option ${
                          tampilkan === "Ya" ? "selected" : ""
                        }`}
                        onClick={() => handleTampilkanSelect("Ya")}
                      >
                        Ya
                      </button>

                      <button
                        type="button"
                        className={`halaman-edit-dropdown-option ${
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
              <div className="halaman-edit-form-group">
                <label>Tipe</label>

                <div
                  className={`halaman-edit-custom-dropdown ${
                    tipeOpen ? "dropdown-open" : ""
                  }`}
                >
                  <button
                    type="button"
                    className={`halaman-edit-dropdown-trigger ${
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
                      className={`halaman-edit-dropdown-arrow ${
                        tipeOpen ? "rotate" : ""
                      }`}
                    />
                  </button>

                  {tipeOpen && (
                    <div className="halaman-edit-dropdown-menu">
                      <button
                        type="button"
                        className={`halaman-edit-dropdown-option ${
                          tipe === "" ? "selected" : ""
                        }`}
                        onClick={() => handleTipeSelect("")}
                      >
                        Pilih Tipe Halaman
                      </button>

                      <button
                        type="button"
                        className={`halaman-edit-dropdown-option ${
                          tipe === "Default" ? "selected" : ""
                        }`}
                        onClick={() => handleTipeSelect("Default")}
                      >
                        Default
                      </button>

                      <button
                        type="button"
                        className={`halaman-edit-dropdown-option ${
                          tipe === "List" ? "selected" : ""
                        }`}
                        onClick={() => handleTipeSelect("List")}
                      >
                        List
                      </button>

                      <button
                        type="button"
                        className={`halaman-edit-dropdown-option ${
                          tipe === "Post Grid" ? "selected" : ""
                        }`}
                        onClick={() => handleTipeSelect("Post Grid")}
                      >
                        Post Grid
                      </button>

                      <button
                        type="button"
                        className={`halaman-edit-dropdown-option ${
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
              <button type="submit" className="halaman-edit-save-button">
                Simpan
              </button>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}

export default HalamanEdit;
