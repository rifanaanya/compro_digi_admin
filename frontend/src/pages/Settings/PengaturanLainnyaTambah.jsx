import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import "./PengaturanLainnyaTambah.css";

function PengaturanLainnyaTambah() {
  const navigate = useNavigate();

  const [namaPengaturan, setNamaPengaturan] = useState("");
  const [gambar, setGambar] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!namaPengaturan.trim()) {
      alert("Nama Pengaturan wajib diisi.");
      return;
    }

    if (!gambar) {
      alert("Gambar wajib diupload.");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("nama", namaPengaturan.trim());
      formData.append("gambar", gambar);

      const response = await fetch(
        "http://localhost:5000/api/pengaturan-lainnya",
        {
          method: "POST",
          body: formData,
        },
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Gagal membuat Pengaturan Lainnya.");
      }

      console.log("✅ Pengaturan berhasil dibuat:", result.data);

      navigate("/settings/pengaturan-lainnya");
    } catch (error) {
      console.error("❌ Gagal membuat Pengaturan Lainnya:", error);
      alert(error.message || "Gagal membuat Pengaturan Lainnya.");
    }
  };

  return (
    <div className="pengaturan-lainnya-tambah-layout">
      {/* SIDEBAR */}
      <Sidebar />

      <div className="pengaturan-lainnya-tambah-main">
        {/* NAVBAR */}
        <Navbar />

        <main className="pengaturan-lainnya-tambah-content">
          {/* HEADER */}
          <section className="pengaturan-lainnya-tambah-header">
            <h1>Buat Pengaturan Lainnya</h1>
          </section>

          {/* CARD */}
          <section className="pengaturan-lainnya-tambah-card">
            <div className="pengaturan-lainnya-tambah-card-title">Buat</div>

            <div className="pengaturan-lainnya-tambah-card-content">
              <form onSubmit={handleSubmit}>
                {/* NAMA PENGATURAN */}
                <div className="pengaturan-lainnya-tambah-form-group">
                  <label htmlFor="namaPengaturan">Nama Pengaturan</label>

                  <input
                    id="namaPengaturan"
                    type="text"
                    value={namaPengaturan}
                    onChange={(e) => setNamaPengaturan(e.target.value)}
                    placeholder="Masukkan Nama Pengaturan"
                  />
                </div>

                {/* UPLOAD GAMBAR */}
                <div className="pengaturan-lainnya-tambah-form-group">
                  <label htmlFor="gambar">Upload Gambar Isi Pengaturan</label>

                  <input
                    id="gambar"
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    onChange={(e) => setGambar(e.target.files[0] || null)}
                  />
                </div>

                {/* SIMPAN */}
                <button
                  type="submit"
                  className="pengaturan-lainnya-tambah-save-button"
                >
                  Simpan
                </button>
              </form>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default PengaturanLainnyaTambah;
