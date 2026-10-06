import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import dropdownArrow from "../../assets/icons/dropdown-arrow.svg";

import "./PengaturanPenggunaEdit.css";

function PengaturanPenggunaEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [foto, setFoto] = useState(null);
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telepon, setTelepon] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);

  const [roleOpen, setRoleOpen] = useState(false);

  useEffect(() => {
    const fetchPengguna = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/pengguna/${id}`,
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Gagal mengambil data pengguna");
        }

        setNama(data.pengguna.nama || "");
        setEmail(data.pengguna.email || "");
        setTelepon(data.pengguna.telepon || "");
        setRole(data.pengguna.role || "");

        // Password sengaja kosong
        setPassword("");
      } catch (error) {
        console.error("❌ Error fetch pengguna:", error);
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPengguna();
  }, [id]);

  const handleSimpan = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("nama", nama);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("telepon", telepon);
      formData.append("role", role);

      if (foto) {
        formData.append("foto", foto);
      }

      const response = await fetch(`http://localhost:5000/api/pengguna/${id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal memperbarui pengguna");
      }

      alert("Data pengguna berhasil diperbarui!");

      navigate("/master/pengaturan-pengguna");
    } catch (error) {
      console.error("❌ Error update pengguna:", error);
      alert(error.message);
    }
  };

  const handleRoleSelect = (value) => {
    setRole(value);
    setRoleOpen(false);
  };

  return (
    <div className="pengguna-edit-layout">
      {/* SIDEBAR */}
      <Sidebar />

      <div className="pengguna-edit-main">
        {/* NAVBAR */}
        <Navbar />

        <main className="pengguna-edit-content">
          {/* HEADER */}
          <section className="pengguna-edit-header">
            <h1>Edit Pengguna</h1>
          </section>

          {/* CARD */}
          <section className="pengguna-edit-card">
            <div className="pengguna-edit-card-title">Edit</div>

            <form
              className="pengguna-edit-card-content"
              onSubmit={handleSimpan}
            >
              {/* FOTO PROFIL */}
              <div className="pengguna-edit-form-group">
                <label htmlFor="foto">Foto Profil</label>

                <input
                  id="foto"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFoto(e.target.files[0])}
                />
              </div>

              {/* NAMA */}
              <div className="pengguna-edit-form-group">
                <label htmlFor="nama">Nama</label>

                <input
                  id="nama"
                  type="text"
                  placeholder="Masukkan Nama"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                />
              </div>

              {/* EMAIL */}
              <div className="pengguna-edit-form-group">
                <label htmlFor="email">Email</label>

                <input
                  id="email"
                  type="email"
                  placeholder="Masukkan Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* PASSWORD */}
              <div className="pengguna-edit-form-group">
                <label htmlFor="password">Password</label>

                <input
                  id="password"
                  type="password"
                  placeholder="Masukkan Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* NO TELEPON */}
              <div className="pengguna-edit-form-group">
                <label htmlFor="telepon">No. Telepon</label>

                <input
                  id="telepon"
                  type="text"
                  placeholder="Masukkan No. Telepon"
                  value={telepon}
                  onChange={(e) => setTelepon(e.target.value)}
                />
              </div>

              {/* ROLE */}
              <div className="pengguna-edit-form-group pengguna-edit-role-form-group">
                <label>Role</label>

                <div className="pengguna-edit-role-dropdown">
                  <button
                    type="button"
                    className={`pengguna-edit-role-dropdown-trigger ${
                      roleOpen ? "open" : ""
                    } ${role ? "has-value" : ""}`}
                    onClick={() => setRoleOpen(!roleOpen)}
                  >
                    <span>{role || "Pilih Role"}</span>

                    <img
                      src={dropdownArrow}
                      alt=""
                      className={`pengguna-edit-role-dropdown-arrow ${
                        roleOpen ? "rotate" : ""
                      }`}
                    />
                  </button>

                  {roleOpen && (
                    <div className="pengguna-edit-role-dropdown-menu">
                      <button
                        type="button"
                        className={`pengguna-edit-role-dropdown-option ${
                          role === "" ? "selected" : ""
                        }`}
                        onClick={() => handleRoleSelect("")}
                      >
                        Pilih Role
                      </button>

                      <button
                        type="button"
                        className={`pengguna-edit-role-dropdown-option ${
                          role === "Admin" ? "selected" : ""
                        }`}
                        onClick={() => handleRoleSelect("Admin")}
                      >
                        Admin Digi
                      </button>

                      <button
                        type="button"
                        className={`pengguna-edit-role-dropdown-option ${
                          role === "User" ? "selected" : ""
                        }`}
                        onClick={() => handleRoleSelect("User")}
                      >
                        User
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* SIMPAN */}
              <button type="submit" className="pengguna-edit-save-button">
                Simpan
              </button>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}

export default PengaturanPenggunaEdit;
