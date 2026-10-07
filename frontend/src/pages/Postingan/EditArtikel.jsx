import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./EditArtikel.css";

function EditArtikel() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    judul: "",
    ringkasan: "",
    isi: "",
    gambar: null,
  });

  const [preview, setPreview] = useState(null);
  const [namaGambar, setNamaGambar] = useState("");

  // ==========================================
  // GET DETAIL ARTIKEL
  // ==========================================

  useEffect(() => {
    const fetchArtikel = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/artikel/${id}`);

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Gagal mengambil data artikel");
        }

        const artikel = result.data;

        setFormData({
          judul: artikel.judul || "",
          ringkasan: artikel.ringkasan || "",
          isi: artikel.isi || "",
          gambar: null,
        });

        if (artikel.gambar) {
          setPreview(`http://localhost:5000${artikel.gambar}`);

          const namaFile = artikel.gambar.split("/").pop();
          setNamaGambar(namaFile || "");
        }
      } catch (error) {
        console.error("❌ Gagal mengambil data artikel:", error);

        alert(error.message || "Gagal mengambil data artikel.");

        navigate("/artikel");
      } finally {
        setLoading(false);
      }
    };

    fetchArtikel();
  }, [id, navigate]);

  // ==========================================
  // HANDLE CHANGE
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // HANDLE IMAGE
  // ==========================================

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      gambar: file,
    }));

    setNamaGambar(file.name);

    const imageUrl = URL.createObjectURL(file);

    setPreview(imageUrl);
  };

  // ==========================================
  // SUBMIT EDIT
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.judul.trim()) {
      alert("Judul artikel wajib diisi.");
      return;
    }

    if (!formData.ringkasan.trim()) {
      alert("Ringkasan artikel wajib diisi.");
      return;
    }

    if (!formData.isi.trim()) {
      alert("Isi artikel wajib diisi.");
      return;
    }

    try {
      const data = new FormData();

      data.append("judul", formData.judul.trim());
      data.append("ringkasan", formData.ringkasan.trim());
      data.append("isi", formData.isi.trim());

      // Hanya kirim gambar kalau user memilih gambar baru
      if (formData.gambar) {
        data.append("gambar", formData.gambar);
      }

      const response = await fetch(`http://localhost:5000/api/artikel/${id}`, {
        method: "PUT",
        body: data,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Gagal memperbarui artikel");
      }

      alert("Artikel berhasil diperbarui.");

      navigate("/artikel");
    } catch (error) {
      console.error("❌ Gagal mengedit artikel:", error);

      alert(error.message || "Gagal memperbarui artikel.");
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="admin-layout">
        <Sidebar />

        <div className="admin-main">
          <Navbar />

          <main className="edit-artikel-content">
            <div className="edit-artikel-title-card">
              <h1>Edit Artikel</h1>
            </div>

            <div className="edit-artikel-card">
              <div className="edit-artikel-card-header">
                <h2>Edit</h2>
              </div>

              <div className="edit-artikel-form">Memuat data artikel...</div>
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

        <main className="edit-artikel-content">
          {/* PAGE TITLE */}

          <div className="edit-artikel-title-card">
            <h1>Edit Artikel</h1>
          </div>

          {/* FORM CARD */}

          <div className="edit-artikel-card">
            <div className="edit-artikel-card-header">
              <h2>Edit</h2>
            </div>

            <form className="edit-artikel-form" onSubmit={handleSubmit}>
              {/* JUDUL */}

              <div className="edit-artikel-form-group">
                <label htmlFor="edit-judul">Judul Artikel</label>

                <input
                  id="edit-judul"
                  name="judul"
                  type="text"
                  value={formData.judul}
                  onChange={handleChange}
                />
              </div>

              {/* RINGKASAN */}

              <div className="edit-artikel-form-group">
                <label htmlFor="edit-ringkasan">Ringkasan</label>

                <textarea
                  id="edit-ringkasan"
                  name="ringkasan"
                  value={formData.ringkasan}
                  onChange={handleChange}
                />
              </div>

              {/* ISI ARTIKEL */}

              <div className="edit-artikel-form-group">
                <label htmlFor="edit-isi">Isi Artikel</label>

                <textarea
                  id="edit-isi"
                  name="isi"
                  value={formData.isi}
                  onChange={handleChange}
                />
              </div>

              {/* UPLOAD GAMBAR */}

              <div className="edit-artikel-form-group">
                <label htmlFor="edit-gambar">Upload Gambar</label>

                <div className="edit-artikel-upload-box">
                  <input
                    id="edit-gambar"
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    onChange={handleImageChange}
                    className="edit-artikel-file-input"
                  />

                  <label
                    htmlFor="edit-gambar"
                    className="edit-artikel-choose-file"
                  >
                    Choose File
                  </label>

                  {preview && (
                    <div className="edit-artikel-preview">
                      <img src={preview} alt="Preview artikel" />

                      <span>{formData.gambar?.name || namaGambar}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* BUTTON */}

              <div className="edit-artikel-actions">
                <button type="submit" className="edit-artikel-save">
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

export default EditArtikel;
