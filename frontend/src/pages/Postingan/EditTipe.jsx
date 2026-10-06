import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./EditTipe.css";

function EditTipe() {
  const navigate = useNavigate();
  const { id } = useParams();

  const tipeData = [
    {
      id: 1,
      tipe: "List",
      menu: "Layanan, FAQ",
    },
    {
      id: 2,
      tipe: "Grid",
      menu: "Blog",
    },
    {
      id: 3,
      tipe: "Default",
      menu: "Visi Misi",
    },
    {
      id: 4,
      tipe: "Album",
      menu: "Kegiatan, Sertifikat",
    },
    {
      id: 5,
      tipe: "Karir",
      menu: "Karir",
    },
    {
      id: 6,
      tipe: "Produk",
      menu: "Produk",
    },
    {
      id: 7,
      tipe: "Produk Layanan",
      menu: "Produk Layanan",
    },
    {
      id: 8,
      tipe: "Mitra",
      menu: "Mitra",
    },
  ];

  const selectedTipe = tipeData.find((item) => item.id === Number(id));

  const [tipe, setTipe] = useState(selectedTipe?.tipe || "");

  const [menu, setMenu] = useState(selectedTipe?.menu || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!tipe.trim()) {
      alert("Tipe wajib diisi.");
      return;
    }

    if (!menu) {
      alert("Silakan pilih menu.");
      return;
    }

    alert("Tipe berhasil diperbarui.");

    navigate("/tipe");
  };

  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="admin-main">
        <Navbar />

        <main className="edit-tipe-content">
          {/* PAGE TITLE */}
          <div className="edit-tipe-title-card">
            <h1>Edit Tipe Postingan</h1>
          </div>

          {/* FORM CARD */}
          <div className="edit-tipe-card">
            <div className="edit-tipe-card-header">
              <h2>Edit</h2>
            </div>

            <form className="edit-tipe-form" onSubmit={handleSubmit}>
              {/* TIPE */}
              <div className="edit-form-group">
                <label htmlFor="edit-tipe">Tipe</label>

                <input
                  id="edit-tipe"
                  type="text"
                  value={tipe}
                  onChange={(e) => setTipe(e.target.value)}
                />
              </div>

              {/* MENU */}
              <div className="edit-form-group">
                <label htmlFor="edit-menu">Menu</label>

                <select
                  id="edit-menu"
                  value={menu}
                  onChange={(e) => setMenu(e.target.value)}
                >
                  <option value="">Pilih Menu</option>

                  <option value="Layanan, FAQ">Layanan, FAQ</option>

                  <option value="Blog">Blog</option>

                  <option value="Visi Misi">Visi Misi</option>

                  <option value="Kegiatan, Sertifikat">
                    Kegiatan, Sertifikat
                  </option>

                  <option value="Karir">Karir</option>

                  <option value="Produk">Produk</option>

                  <option value="Produk Layanan">Produk Layanan</option>

                  <option value="Mitra">Mitra</option>
                </select>
              </div>

              {/* SIMPAN */}
              <button type="submit" className="btn-simpan-edit-tipe">
                Simpan
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default EditTipe;
