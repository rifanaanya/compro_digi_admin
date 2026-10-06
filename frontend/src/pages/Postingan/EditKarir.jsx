import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import dropdownArrow from "../../assets/icons/dropdown-arrow.svg";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./EditKarir.css";

function EditKarir() {
  const navigate = useNavigate();
  const { id } = useParams();

  const karirData = [
    {
      id: 1,
      posisi: "UI/UX Designer",
      kategori: "IT & Software",
      lokasi: "Bandung, Jawa Barat",
      tipe: "Full Time",
    },
    {
      id: 2,
      posisi: "Frontend Dev",
      kategori: "IT & Software",
      lokasi: "Bandung, Jawa Barat",
      tipe: "Full Time",
    },
    {
      id: 3,
      posisi: "Mechanical Engineer",
      kategori: "Engineering",
      lokasi: "Bandung, Jawa Barat",
      tipe: "Full Time",
    },
    {
      id: 4,
      posisi: "Admin Project",
      kategori: "Administrasi",
      lokasi: "Bandung, Jawa Barat",
      tipe: "Full Time",
    },
  ];

  const dataEdit =
    karirData.find((item) => item.id === Number(id)) || karirData[0];

  const [kategoriOpen, setKategoriOpen] = useState(false);
  const [tipeOpen, setTipeOpen] = useState(false);

  const [formData, setFormData] = useState({
    posisi: dataEdit.posisi,
    kategori: dataEdit.kategori,
    lokasi: dataEdit.lokasi,
    tipe: dataEdit.tipe,
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

    const karirUpdate = {
      id: Number(id),
      posisi: formData.posisi.trim(),
      kategori: formData.kategori,
      lokasi: formData.lokasi.trim(),
      tipe: formData.tipe,
    };

    console.log("Karir diperbarui:", karirUpdate);

    alert("Data karir berhasil diperbarui.");

    navigate("/karir");
  };

  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="admin-main">
        <Navbar />

        <main className="edit-karir-content">
          {/* PAGE TITLE */}
          <div className="edit-karir-title-card">
            <h1>Edit Karir</h1>
          </div>

          {/* CONTENT CARD */}
          <div className="edit-karir-card">
            {/* HEADER */}
            <div className="edit-karir-card-header">
              <h2>Edit</h2>
            </div>

            {/* FORM */}
            <form className="edit-karir-form" onSubmit={handleSubmit}>
              {/* POSISI */}
              <div className="edit-karir-form-group">
                <label htmlFor="edit-posisi">Posisi</label>

                <input
                  id="edit-posisi"
                  name="posisi"
                  type="text"
                  value={formData.posisi}
                  onChange={handleChange}
                  placeholder="Masukkan posisi"
                />
              </div>

              {/* KATEGORI */}
              <div className="edit-karir-form-group">
                <label>Kategori</label>

                <div className="edit-karir-dropdown">
                  <button
                    type="button"
                    className={`edit-karir-dropdown-button ${
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
                      className="edit-karir-dropdown-arrow"
                    />
                  </button>

                  {kategoriOpen && (
                    <div className="edit-karir-dropdown-menu">
                      {[
                        "IT & Software",
                        "Mekanikal",
                        "Engineering",
                        "Administrasi",
                      ].map((option) => (
                        <button
                          key={option}
                          type="button"
                          className={`edit-karir-dropdown-option ${
                            formData.kategori === option ? "selected" : ""
                          }`}
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              kategori: option,
                            }));

                            setKategoriOpen(false);
                          }}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* LOKASI */}
              <div className="edit-karir-form-group">
                <label htmlFor="edit-lokasi">Lokasi</label>

                <input
                  id="edit-lokasi"
                  name="lokasi"
                  type="text"
                  value={formData.lokasi}
                  onChange={handleChange}
                  placeholder="Masukkan Lokasi"
                />
              </div>

              {/* TIPE PEKERJAAN */}
              <div className="edit-karir-form-group">
                <label>Tipe Pekerjaan</label>

                <div className="edit-karir-dropdown">
                  <button
                    type="button"
                    className={`edit-karir-dropdown-button ${
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
                      className="edit-karir-dropdown-arrow"
                    />
                  </button>

                  {tipeOpen && (
                    <div className="edit-karir-dropdown-menu">
                      {["Full Time", "Part Time", "Contract", "Internship"].map(
                        (option) => (
                          <button
                            key={option}
                            type="button"
                            className={`edit-karir-dropdown-option ${
                              formData.tipe === option ? "selected" : ""
                            }`}
                            onClick={() => {
                              setFormData((prev) => ({
                                ...prev,
                                tipe: option,
                              }));

                              setTipeOpen(false);
                            }}
                          >
                            {option}
                          </button>
                        ),
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* BUTTON */}
              <div className="edit-karir-actions">
                <button type="submit" className="edit-karir-save">
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

export default EditKarir;
