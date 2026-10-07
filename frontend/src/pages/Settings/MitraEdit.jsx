import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./MitraEdit.css";

function MitraEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [namaPerusahaan, setNamaPerusahaan] = useState("");
  const [logoPreview, setLogoPreview] = useState("");
  const [logoFile, setLogoFile] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchMitra = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/mitra/${id}`);

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Gagal mengambil data Mitra.");
        }

        const data = result.data;

        setNamaPerusahaan(data.nama || "");

        if (data.logo) {
          if (data.logo.startsWith("http")) {
            setLogoPreview(data.logo);
          } else {
            setLogoPreview(
              `http://localhost:5000${
                data.logo.startsWith("/") ? "" : "/"
              }${data.logo}`,
            );
          }
        }
      } catch (error) {
        console.error("❌ Gagal mengambil data Mitra:", error);
        alert(error.message || "Gagal mengambil data Mitra.");
        navigate("/settings/mitra");
      } finally {
        setLoading(false);
      }
    };

    fetchMitra();
  }, [id, navigate]);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setLogoFile(file);

    const previewUrl = URL.createObjectURL(file);
    setLogoPreview(previewUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!namaPerusahaan.trim()) {
      alert("Nama perusahaan wajib diisi.");
      return;
    }

    try {
      setSaving(true);

      const formData = new FormData();

      formData.append("nama", namaPerusahaan.trim());

      // Logo hanya dikirim kalau user memilih logo baru
      if (logoFile) {
        formData.append("logo", logoFile);
      }

      const response = await fetch(`http://localhost:5000/api/mitra/${id}`, {
        method: "PUT",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Gagal mengubah Mitra.");
      }

      alert("Mitra berhasil diubah.");

      navigate("/settings/mitra");
    } catch (error) {
      console.error("❌ Gagal mengubah Mitra:", error);
      alert(error.message || "Gagal mengubah Mitra.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mitra-edit-layout">
      {/* SIDEBAR */}
      <Sidebar />

      <div className="mitra-edit-main">
        {/* NAVBAR */}
        <Navbar />

        <main className="mitra-edit-content">
          {/* HEADER */}
          <section className="mitra-edit-header">
            <h1>Edit Mitra</h1>
          </section>

          {/* CARD */}
          <section className="mitra-edit-card">
            {/* CARD TITLE */}
            <div className="mitra-edit-card-title">Edit</div>

            <form className="mitra-edit-form" onSubmit={handleSubmit}>
              {/* NAMA PERUSAHAAN */}
              <div className="mitra-edit-field">
                <label htmlFor="namaPerusahaan">Nama Perusahaan Mitra</label>

                <input
                  id="namaPerusahaan"
                  type="text"
                  value={namaPerusahaan}
                  onChange={(e) => setNamaPerusahaan(e.target.value)}
                  placeholder="Masukkan Nama Perusahaan Mitra"
                  required
                  disabled={loading}
                />
              </div>

              {/* LOGO */}
              <div className="mitra-edit-field">
                <label htmlFor="logoMitra">Logo Perusahaan Mitra</label>

                <div className="mitra-edit-upload">
                  <input
                    id="logoMitra"
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    onChange={handleLogoChange}
                    disabled={loading}
                  />

                  {logoPreview && (
                    <div className="mitra-edit-preview">
                      <img src={logoPreview} alt="Logo Mitra" />
                    </div>
                  )}
                </div>
              </div>

              {/* SIMPAN */}
              <button
                type="submit"
                className="mitra-edit-save-button"
                disabled={loading || saving}
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

export default MitraEdit;
