import { useState } from "react";
import { useNavigate } from "react-router-dom";
import dropdownArrow from "../../assets/icons/dropdown-arrow.svg";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./FooterColumnTambah.css";

function FooterColumnTambah() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [column, setColumn] = useState("");
  const [columnOpen, setColumnOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Nama footer column wajib diisi!");
      return;
    }

    if (!column) {
      alert("Column wajib dipilih!");
      return;
    }

    try {
      const posisi = Number(column.replace("Footer Column ", ""));

      const response = await fetch("http://localhost:5000/api/footer-column", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nama: name.trim(),
          posisi,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal menambahkan footer column");
      }

      alert("Footer column berhasil ditambahkan!");

      navigate("/master/footer-column");
    } catch (error) {
      console.error("❌ Error tambah footer column:", error);
      alert(error.message);
    }
  };

  const handleColumnSelect = (value) => {
    setColumn(value);
    setColumnOpen(false);
  };

  return (
    <div className="footer-column-tambah-layout">
      {/* SIDEBAR */}
      <Sidebar />

      <div className="footer-column-tambah-main">
        {/* NAVBAR */}
        <Navbar />

        <main className="footer-column-tambah-content">
          {/* HEADER */}
          <section className="footer-column-tambah-header">
            <h1>Tambah Footer Column</h1>
          </section>

          {/* CARD */}
          <section className="footer-column-tambah-card">
            <div className="footer-column-tambah-card-title">Tambah</div>

            <div className="footer-column-tambah-card-content">
              <form onSubmit={handleSubmit}>
                {/* NAMA FOOTER COLUMN */}
                <div className="footer-column-tambah-form-group">
                  <label htmlFor="name">Nama Footer Column</label>

                  <input
                    id="name"
                    type="text"
                    placeholder="Masukkan Nama Footer Column"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                {/* COLUMN */}
                <div className="footer-column-tambah-form-group">
                  <label>Column</label>

                  <div className="footer-column-custom-dropdown">
                    <button
                      type="button"
                      className={`footer-column-dropdown-trigger ${
                        columnOpen ? "open" : ""
                      } ${column ? "has-value" : ""}`}
                      onClick={() => setColumnOpen(!columnOpen)}
                    >
                      <span>{column || "Pilih Column"}</span>

                      <img
                        src={dropdownArrow}
                        alt=""
                        className={`footer-column-dropdown-arrow ${
                          columnOpen ? "rotate" : ""
                        }`}
                      />
                    </button>

                    {columnOpen && (
                      <div className="footer-column-dropdown-menu">
                        {/* PILIH COLUMN */}
                        <button
                          type="button"
                          className={`footer-column-dropdown-option ${
                            column === "" ? "selected" : ""
                          }`}
                          onClick={() => handleColumnSelect("")}
                        >
                          Pilih Column
                        </button>

                        {/* COLUMN 1 */}
                        <button
                          type="button"
                          className={`footer-column-dropdown-option ${
                            column === "Footer Column 1" ? "selected" : ""
                          }`}
                          onClick={() => handleColumnSelect("Footer Column 1")}
                        >
                          Footer Column 1
                        </button>

                        {/* COLUMN 2 */}
                        <button
                          type="button"
                          className={`footer-column-dropdown-option ${
                            column === "Footer Column 2" ? "selected" : ""
                          }`}
                          onClick={() => handleColumnSelect("Footer Column 2")}
                        >
                          Footer Column 2
                        </button>

                        {/* COLUMN 3 */}
                        <button
                          type="button"
                          className={`footer-column-dropdown-option ${
                            column === "Footer Column 3" ? "selected" : ""
                          }`}
                          onClick={() => handleColumnSelect("Footer Column 3")}
                        >
                          Footer Column 3
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* BUTTON */}
                <div className="footer-column-tambah-button-wrapper">
                  <button
                    type="submit"
                    className="footer-column-tambah-save-button"
                  >
                    Simpan
                  </button>
                </div>
              </form>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default FooterColumnTambah;
