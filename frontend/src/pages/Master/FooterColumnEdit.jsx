import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import dropdownArrow from "../../assets/icons/dropdown-arrow.svg";

import "./FooterColumnEdit.css";

function FooterColumnEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [column, setColumn] = useState("");
  const [columnOpen, setColumnOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFooterColumn = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/footer-column/${id}`,
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Gagal mengambil data footer column");
        }

        setName(data.data.nama);
        setColumn(`Footer Column ${data.data.posisi}`);
      } catch (error) {
        console.error("❌ Error fetch footer column:", error);
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFooterColumn();
  }, [id]);

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

      const response = await fetch(
        `http://localhost:5000/api/footer-column/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nama: name.trim(),
            posisi,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal mengubah footer column");
      }

      alert("Footer column berhasil diubah!");
      navigate("/master/footer-column");
    } catch (error) {
      console.error("❌ Error edit footer column:", error);
      alert(error.message);
    }
  };

  const handleColumnSelect = (value) => {
    setColumn(value);
    setColumnOpen(false);
  };

  return (
    <div className="footer-column-edit-layout">
      {/* SIDEBAR */}
      <Sidebar />

      <div className="footer-column-edit-main">
        {/* NAVBAR */}
        <Navbar />

        <main className="footer-column-edit-content">
          {/* HEADER */}
          <section className="footer-column-edit-header">
            <h1>Edit Footer Column</h1>
          </section>

          {/* CARD */}
          <section className="footer-column-edit-card">
            <div className="footer-column-edit-card-title">Edit</div>

            <div className="footer-column-edit-card-content">
              <form onSubmit={handleSubmit}>
                {/* NAMA FOOTER COLUMN */}
                <div className="footer-column-edit-form-group">
                  <label htmlFor="name">Nama Footer Column</label>

                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                {/* COLUMN */}
                <div className="footer-column-edit-form-group">
                  <label>Column</label>

                  <div className="footer-column-edit-custom-dropdown">
                    <button
                      type="button"
                      className={`footer-column-edit-dropdown-trigger ${
                        columnOpen ? "open" : ""
                      } ${column ? "has-value" : ""}`}
                      onClick={() => setColumnOpen(!columnOpen)}
                    >
                      <span>{column || "Pilih Column"}</span>

                      <img
                        src={dropdownArrow}
                        alt=""
                        className={`footer-column-edit-dropdown-arrow ${
                          columnOpen ? "rotate" : ""
                        }`}
                      />
                    </button>

                    {columnOpen && (
                      <div className="footer-column-edit-dropdown-menu">
                        <button
                          type="button"
                          className={`footer-column-edit-dropdown-option ${
                            column === "" ? "selected" : ""
                          }`}
                          onClick={() => handleColumnSelect("")}
                        >
                          Pilih Column
                        </button>

                        <button
                          type="button"
                          className={`footer-column-edit-dropdown-option ${
                            column === "Footer Column 1" ? "selected" : ""
                          }`}
                          onClick={() => handleColumnSelect("Footer Column 1")}
                        >
                          Footer Column 1
                        </button>

                        <button
                          type="button"
                          className={`footer-column-edit-dropdown-option ${
                            column === "Footer Column 2" ? "selected" : ""
                          }`}
                          onClick={() => handleColumnSelect("Footer Column 2")}
                        >
                          Footer Column 2
                        </button>

                        <button
                          type="button"
                          className={`footer-column-edit-dropdown-option ${
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

                {/* SIMPAN */}
                <div className="footer-column-edit-button-wrapper">
                  <button
                    type="submit"
                    className="footer-column-edit-save-button"
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

export default FooterColumnEdit;
