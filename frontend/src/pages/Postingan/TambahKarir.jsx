import { useState } from "react";
import { useNavigate } from "react-router-dom";

import dropdownArrow from "../../assets/icons/dropdown-arrow.svg";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./TambahKarir.css";

function TambahKarir() {
  const navigate = useNavigate();

  const [kategoriOpen, setKategoriOpen] = useState(false);
  const [tipeOpen, setTipeOpen] = useState(false);

  const [formData, setFormData] = useState({
    posisi: "",
    kategori: "",
    lokasi: "",
    tipe: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.posisi.trim()) {
      alert("Posisi wajib diisi.");
      return;
    }

    if (!formData.kategori) {
      alert("Kategori wajib dipilih.");
      return;
    }

    if (!formData.lokasi.trim()) {
      alert("Lokasi wajib diisi.");
      return;
    }

    if (!formData.tipe) {
      alert("Tipe pekerjaan wajib dipilih.");
      return;
    }

    const karirBaru = {
      id: Date.now(),
      posisi: formData.posisi.trim(),
      kategori: formData.kategori,
      lokasi: formData.lokasi.trim(),
      tipe: formData.tipe,
    };

    console.log("Karir baru:", karirBaru);

    alert("Lowongan karir berhasil ditambahkan.");

    navigate("/karir");
  };

  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="admin-main">
        <Navbar />

        <main className="tambah-karir-content">
          {/* PAGE TITLE */}
          <div className="tambah-karir-title-card">
            <h1>Tambah Karir</h1>
          </div>

          {/* FORM CARD */}
          <div className="tambah-karir-card">
            <div className="tambah-karir-card-header">
              <h2>Tambah</h2>
            </div>

            <form className="tambah-karir-form" onSubmit={handleSubmit}>
              {/* POSISI */}
              <div className="tambah-karir-form-group">
                <label htmlFor="posisi">Posisi</label>

                <input
                  id="posisi"
                  name="posisi"
                  type="text"
                  placeholder="Masukkan posisi"
                  value={formData.posisi}
                  onChange={handleChange}
                />
              </div>

              {/* KATEGORI */}
              <div className="tambah-karir-form-group">
                <label>Kategori</label>

                <div className="tambah-karir-dropdown">
                  <button
                    type="button"
                    className={`tambah-karir-dropdown-button ${
                      kategoriOpen ? "open" : ""
                    }`}
                    onClick={() => {
                      setKategoriOpen(!kategoriOpen);
                      setTipeOpen(false);
                    }}
                  >
                    <span className={!formData.kategori ? "placeholder" : ""}>
                      {formData.kategori || "Pilih Kategori"}
                    </span>

                    <img
                      src={dropdownArrow}
                      alt=""
                      className="tambah-karir-dropdown-arrow"
                    />
                  </button>

                  {kategoriOpen && (
                    <div className="tambah-karir-dropdown-menu">
                      <button
                        type="button"
                        className={`tambah-karir-dropdown-option ${
                          !formData.kategori ? "selected" : ""
                        }`}
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            kategori: "",
                          }));
                          setKategoriOpen(false);
                        }}
                      >
                        Pilih Kategori
                      </button>

                      <button
                        type="button"
                        className={`tambah-karir-dropdown-option ${
                          formData.kategori === "IT & Software"
                            ? "selected"
                            : ""
                        }`}
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            kategori: "IT & Software",
                          }));
                          setKategoriOpen(false);
                        }}
                      >
                        IT & Software
                      </button>

                      <button
                        type="button"
                        className={`tambah-karir-dropdown-option ${
                          formData.kategori === "Mekanikal" ? "selected" : ""
                        }`}
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            kategori: "Mekanikal",
                          }));
                          setKategoriOpen(false);
                        }}
                      >
                        Mekanikal
                      </button>

                      <button
                        type="button"
                        className={`tambah-karir-dropdown-option ${
                          formData.kategori === "Engineering" ? "selected" : ""
                        }`}
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            kategori: "Engineering",
                          }));
                          setKategoriOpen(false);
                        }}
                      >
                        Engineering
                      </button>

                      <button
                        type="button"
                        className={`tambah-karir-dropdown-option ${
                          formData.kategori === "Administrasi" ? "selected" : ""
                        }`}
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            kategori: "Administrasi",
                          }));
                          setKategoriOpen(false);
                        }}
                      >
                        Administrasi
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* LOKASI */}
              <div className="tambah-karir-form-group">
                <label htmlFor="lokasi">Lokasi</label>

                <input
                  id="lokasi"
                  name="lokasi"
                  type="text"
                  placeholder="Masukkan Lokasi"
                  value={formData.lokasi}
                  onChange={handleChange}
                />
              </div>

              {/* TIPE PEKERJAAN */}
              <div className="tambah-karir-form-group">
                <label>Tipe Pekerjaan</label>

                <div className="tambah-karir-dropdown">
                  <button
                    type="button"
                    className={`tambah-karir-dropdown-button ${
                      tipeOpen ? "open" : ""
                    }`}
                    onClick={() => {
                      setTipeOpen(!tipeOpen);
                      setKategoriOpen(false);
                    }}
                  >
                    <span className={!formData.tipe ? "placeholder" : ""}>
                      {formData.tipe || "Pilih Tipe Pekerjaan"}
                    </span>

                    <img
                      src={dropdownArrow}
                      alt=""
                      className="tambah-karir-dropdown-arrow"
                    />
                  </button>

                  {tipeOpen && (
                    <div className="tambah-karir-dropdown-menu">
                      <button
                        type="button"
                        className={`tambah-karir-dropdown-option ${
                          !formData.tipe ? "selected" : ""
                        }`}
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            tipe: "",
                          }));
                          setTipeOpen(false);
                        }}
                      >
                        Pilih Tipe Pekerjaan
                      </button>

                      <button
                        type="button"
                        className={`tambah-karir-dropdown-option ${
                          formData.tipe === "Full Time" ? "selected" : ""
                        }`}
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            tipe: "Full Time",
                          }));
                          setTipeOpen(false);
                        }}
                      >
                        Full Time
                      </button>

                      <button
                        type="button"
                        className={`tambah-karir-dropdown-option ${
                          formData.tipe === "Part Time" ? "selected" : ""
                        }`}
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            tipe: "Part Time",
                          }));
                          setTipeOpen(false);
                        }}
                      >
                        Part Time
                      </button>

                      <button
                        type="button"
                        className={`tambah-karir-dropdown-option ${
                          formData.tipe === "Contract" ? "selected" : ""
                        }`}
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            tipe: "Contract",
                          }));
                          setTipeOpen(false);
                        }}
                      >
                        Contract
                      </button>

                      <button
                        type="button"
                        className={`tambah-karir-dropdown-option ${
                          formData.tipe === "Internship" ? "selected" : ""
                        }`}
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            tipe: "Internship",
                          }));
                          setTipeOpen(false);
                        }}
                      >
                        Internship
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* SIMPAN */}
              <div className="tambah-karir-actions">
                <button type="submit" className="tambah-karir-save">
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default TambahKarir;
