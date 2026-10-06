import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./TambahProdukLayanan.css";

function TambahProdukLayanan() {
  const navigate = useNavigate();

  // =========================
  // DATA PRODUK LAYANAN
  // =========================
  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [layanan, setLayanan] = useState("");

  // Awalnya KOSONG
  // Jadi field tools belum muncul
  const [tools, setTools] = useState([]);

  // =========================
  // TAMBAH TOOLS
  // =========================
  const handleAddTool = () => {
    setTools((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        nama: "",
        lokasi: "",
        gambar: null,
        gambarPreview: "",
      },
    ]);
  };

  // =========================
  // UBAH DATA TOOLS
  // =========================
  const handleToolChange = (id, field, value) => {
    setTools((prev) =>
      prev.map((tool) =>
        tool.id === id
          ? {
              ...tool,
              [field]: value,
            }
          : tool,
      ),
    );
  };

  // =========================
  // UPLOAD GAMBAR
  // =========================
  const handleToolImageChange = (id, file) => {
    if (!file) return;

    // Validasi gambar
    if (!file.type.startsWith("image/")) {
      alert("File yang dipilih harus berupa gambar.");
      return;
    }

    // Preview gambar
    const reader = new FileReader();

    reader.onloadend = () => {
      setTools((prev) =>
        prev.map((tool) =>
          tool.id === id
            ? {
                ...tool,
                gambar: file,
                gambarPreview: reader.result,
              }
            : tool,
        ),
      );
    };

    reader.readAsDataURL(file);
  };

  // =========================
  // HAPUS TOOLS
  // =========================
  const handleRemoveTool = (id) => {
    setTools((prev) => prev.filter((tool) => tool.id !== id));
  };

  // =========================
  // SIMPAN
  // =========================
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi nama
    if (!nama.trim()) {
      alert("Nama Produk Layanan wajib diisi.");
      return;
    }

    // Validasi deskripsi
    if (!deskripsi.trim()) {
      alert("Deskripsi Produk wajib diisi.");
      return;
    }

    // Validasi layanan
    if (!layanan.trim()) {
      alert("Layanan wajib dipilih.");
      return;
    }

    // Validasi tools
    if (tools.length === 0) {
      alert("Minimal tambahkan satu Tools / Kegiatan.");
      return;
    }

    // Validasi setiap tools
    for (let i = 0; i < tools.length; i++) {
      const tool = tools[i];

      if (!tool.nama.trim()) {
        alert(`Nama Tools / Kegiatan ke-${i + 1} wajib diisi.`);
        return;
      }

      if (!tool.lokasi.trim()) {
        alert(`Lokasi Tools / Kegiatan ke-${i + 1} wajib diisi.`);
        return;
      }
    }

    // Data yang disimpan
    const newProdukLayanan = {
      id: Date.now(),
      nama: nama.trim(),
      deskripsi: deskripsi.trim(),
      layanan,

      tools: tools.map((tool) => ({
        id: tool.id,
        nama: tool.nama.trim(),
        lokasi: tool.lokasi.trim(),
        gambar: tool.gambarPreview || "",
      })),
    };

    // Ambil data lama
    const existingData =
      JSON.parse(localStorage.getItem("produkLayananList")) || [];

    // Simpan data baru
    localStorage.setItem(
      "produkLayananList",
      JSON.stringify([...existingData, newProdukLayanan]),
    );

    alert("Produk Layanan berhasil ditambahkan.");

    navigate("/produk-layanan");
  };

  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="admin-main">
        <Navbar />

        <main className="tambah-produk-layanan-content">
          {/* =========================
              PAGE TITLE
          ========================= */}
          <div className="tambah-produk-layanan-title-card">
            <h1>Tambah List Produk Layanan</h1>
          </div>

          {/* =========================
              FORM CARD
          ========================= */}
          <div className="tambah-produk-layanan-card">
            <h2>Tambah</h2>

            <form onSubmit={handleSubmit}>
              {/* =========================
                  NAMA PRODUK LAYANAN
              ========================= */}
              <div className="form-group">
                <label>Nama Produk Layanan</label>

                <input
                  type="text"
                  placeholder="Masukkan Nama Produk Layanan"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                />
              </div>

              {/* =========================
                  DESKRIPSI
              ========================= */}
              <div className="form-group">
                <label>Deskripsi Produk</label>

                <textarea
                  placeholder="Masukkan Deskripsi Produk"
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                />
              </div>

              {/* =========================
                  LAYANAN
              ========================= */}
              <div className="form-group">
                <label>Layanan</label>

                <select
                  value={layanan}
                  onChange={(e) => setLayanan(e.target.value)}
                >
                  <option value="">Pilih Layanan</option>

                  <option value="Procurement of Engine and Turbine Components and Spare Parts">
                    Procurement of Engine and Turbine Components and Spare Parts
                  </option>

                  <option value="Mechanical Electrical">
                    Mechanical Electrical
                  </option>

                  <option value="Repair Sparepart">Repair Sparepart</option>

                  <option value="Software Development">
                    Software Development
                  </option>
                </select>
              </div>

              {/* =========================
                  GARIS PEMISAH
              ========================= */}
              <div className="form-divider"></div>

              {/* =========================
                  TOOLS / KEGIATAN
              ========================= */}
              <div className="tools-section">
                {tools.map((tool, index) => (
                  <div className="tool-item" key={tool.id}>
                    {/* HEADER TOOL */}
                    <div className="tool-item-header">
                      <span>Tools / Kegiatan {index + 1}</span>

                      <button
                        type="button"
                        className="remove-tool-btn"
                        onClick={() => handleRemoveTool(tool.id)}
                      >
                        ×
                      </button>
                    </div>

                    {/* =========================
                        NAMA TOOLS
                    ========================= */}
                    <div className="form-group">
                      <label>Nama Tools / Kegiatan</label>

                      <input
                        type="text"
                        placeholder="Masukkan Nama Tools / Kegiatan"
                        value={tool.nama}
                        onChange={(e) =>
                          handleToolChange(tool.id, "nama", e.target.value)
                        }
                      />
                    </div>

                    {/* =========================
                        LOKASI
                    ========================= */}
                    <div className="form-group">
                      <label>Lokasi</label>

                      <input
                        type="text"
                        placeholder="Masukkan Lokasi"
                        value={tool.lokasi}
                        onChange={(e) =>
                          handleToolChange(tool.id, "lokasi", e.target.value)
                        }
                      />
                    </div>

                    {/* =========================
                        GAMBAR
                    ========================= */}
                    <div className="form-group">
                      <label>Gambar Produk</label>

                      <div className="tool-image-upload">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleToolImageChange(tool.id, e.target.files[0])
                          }
                        />

                        {/* PREVIEW */}
                        {tool.gambarPreview && (
                          <div className="tool-image-preview">
                            <img
                              src={tool.gambarPreview}
                              alt={`Preview ${tool.nama || "Tools"}`}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {/* =========================
                    TAMBAH TOOLS
                ========================= */}
                <button
                  type="button"
                  className="btn-tambah-tools"
                  onClick={handleAddTool}
                >
                  Tambah Tools / Kegiatan
                </button>
              </div>

              {/* =========================
                  SIMPAN
              ========================= */}
              <button type="submit" className="btn-simpan-produk-layanan">
                Simpan
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default TambahProdukLayanan;
