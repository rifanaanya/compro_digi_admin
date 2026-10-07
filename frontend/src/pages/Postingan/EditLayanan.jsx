import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import dropdownArrow from "../../assets/icons/dropdown-arrow.svg";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./EditLayanan.css";
import "./TambahLayanan.css";

function EditLayanan() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const [dataAwal, setDataAwal] = useState(location.state?.layanan || null);

  const [judul, setJudul] = useState(location.state?.layanan?.judul || "");

  const [deskripsi, setDeskripsi] = useState(
    location.state?.layanan?.deskripsi || "",
  );

  const [gambar, setGambar] = useState(location.state?.layanan?.gambar || "");

  const [gambarFile, setGambarFile] = useState(null);

  const [tipe, setTipe] = useState(location.state?.layanan?.tipe || "Layanan");

  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);

  const [loading, setLoading] = useState(!location.state?.layanan);

  useEffect(() => {
    const fetchLayanan = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/layanan-data/${id}`,
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Gagal mengambil data layanan");
        }

        const data = result.data;

        setDataAwal(data);
        setJudul(data.judul || "");
        setDeskripsi(data.deskripsi || "");
        setGambar(data.gambar || "");
        setTipe(data.tipe || "Layanan");
      } catch (error) {
        console.error("❌ Gagal mengambil detail layanan:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLayanan();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setGambarFile(file);

    const imageUrl = URL.createObjectURL(file);
    setGambar(imageUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!judul.trim()) {
      alert("Judul Layanan wajib diisi.");
      return;
    }

    if (!deskripsi.trim()) {
      alert("Deskripsi Layanan wajib diisi.");
      return;
    }

    if (!tipe) {
      alert("Tipe Layanan wajib dipilih.");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("judul", judul.trim());
      formData.append("deskripsi", deskripsi.trim());
      formData.append("tipe", tipe);

      if (gambarFile) {
        formData.append("gambar", gambarFile);
      }

      const response = await fetch(
        `http://localhost:5000/api/layanan-data/${id}`,
        {
          method: "PUT",
          body: formData,
        },
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Gagal mengedit layanan");
      }

      alert("Data layanan berhasil disimpan.");

      navigate("/layanan");
    } catch (error) {
      console.error("❌ Gagal mengedit layanan:", error);

      alert(error.message || "Gagal menyimpan data layanan.");
    }
  };

  if (loading) {
    return (
      <div className="admin-layout">
        <Sidebar />

        <div className="admin-main">
          <Navbar />

          <main className="edit-layanan-content">
            <div className="edit-layanan-title-card">
              <h1>Edit Layanan</h1>
            </div>

            <div className="edit-layanan-card">
              <h2>Memuat data layanan...</h2>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="admin-main">
        <Navbar />

        <main className="edit-layanan-content">
          {/* TITLE */}
          <div className="edit-layanan-title-card">
            <h1>Edit Layanan</h1>
          </div>

          {/* FORM */}
          <div className="edit-layanan-card">
            <div className="edit-layanan-card-header">
              <h2>Edit</h2>
            </div>

            <form className="edit-layanan-form" onSubmit={handleSubmit}>
              {/* JUDUL */}
              <div className="edit-form-group">
                <label htmlFor="judul">Judul Layanan</label>

                <input
                  id="judul"
                  type="text"
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                  placeholder="Masukkan Nama Layanan"
                />
              </div>

              {/* DESKRIPSI */}
              <div className="edit-form-group">
                <label htmlFor="deskripsi">Deskripsi Layanan</label>

                <textarea
                  id="deskripsi"
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  placeholder="Masukkan Deskripsi Layanan"
                />
              </div>

              {/* GAMBAR */}
              <div className="edit-form-group">
                <label htmlFor="gambar">Upload Gambar</label>

                <div className="edit-upload-wrapper">
                  <input
                    id="gambar"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />

                  {gambar && (
                    <div className="edit-image-preview">
                      <img
                        src={
                          gambar
                            ? gambar.startsWith("blob:")
                              ? gambar
                              : `http://localhost:5000${gambar}`
                            : ""
                        }
                        alt={judul}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* TIPE */}
              {/* TIPE LAYANAN */}
              <div className="edit-form-group">
                <label htmlFor="tipe">Tipe Layanan</label>

                <div className="layanan-type-dropdown">
                  <button
                    id="tipe"
                    type="button"
                    className="layanan-type-dropdown-button"
                    onClick={() => setTypeDropdownOpen((prev) => !prev)}
                  >
                    <span className={!tipe ? "placeholder" : ""}>
                      {tipe || "Pilih Tipe Layanan"}
                    </span>

                    <img
                      src={dropdownArrow}
                      alt=""
                      className={`layanan-type-dropdown-arrow ${
                        typeDropdownOpen ? "open" : ""
                      }`}
                    />
                  </button>

                  {typeDropdownOpen && (
                    <div className="layanan-type-dropdown-menu">
                      <button
                        type="button"
                        className={`layanan-type-dropdown-option ${
                          !tipe ? "selected" : ""
                        }`}
                        onClick={() => {
                          setTipe("");
                          setTypeDropdownOpen(false);
                        }}
                      >
                        Pilih Tipe Layanan
                      </button>

                      <button
                        type="button"
                        className={`layanan-type-dropdown-option ${
                          tipe === "Layanan" ? "selected" : ""
                        }`}
                        onClick={() => {
                          setTipe("Layanan");
                          setTypeDropdownOpen(false);
                        }}
                      >
                        Layanan
                      </button>

                      <button
                        type="button"
                        className={`layanan-type-dropdown-option ${
                          tipe === "Produk Layanan" ? "selected" : ""
                        }`}
                        onClick={() => {
                          setTipe("Produk Layanan");
                          setTypeDropdownOpen(false);
                        }}
                      >
                        Produk Layanan
                      </button>

                      <button
                        type="button"
                        className={`layanan-type-dropdown-option ${
                          tipe === "Default" ? "selected" : ""
                        }`}
                        onClick={() => {
                          setTipe("Default");
                          setTypeDropdownOpen(false);
                        }}
                      >
                        Default
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* SIMPAN */}
              <button type="submit" className="edit-simpan-btn">
                Simpan
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default EditLayanan;
