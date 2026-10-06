import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import dropdownArrow from "../../assets/icons/dropdown-arrow.svg";

import "./PengaturanPenggunaTambah.css";

function PengaturanPenggunaTambah() {
  const navigate = useNavigate();

  const [foto, setFoto] = useState(null);
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telepon, setTelepon] = useState("");

  const [role, setRole] = useState("");
  const [roleOpen, setRoleOpen] = useState(false);

  const handleSimpan = async (e) => {
    e.preventDefault();

    if (
      !nama.trim() ||
      !email.trim() ||
      !password.trim() ||
      !telepon.trim() ||
      !role
    ) {
      alert("Semua data wajib diisi");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/pengguna", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nama: nama.trim(),
          email: email.trim(),
          password: password.trim(),
          telepon: telepon.trim(),
          role: role === "admin" ? "Admin" : "User",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal menambahkan pengguna");
      }

      alert("Pengguna berhasil ditambahkan!");

      navigate("/master/pengaturan-pengguna");
    } catch (error) {
      console.error("❌ Error tambah pengguna:", error);
      alert(error.message);
    }
  };

  const handleRoleSelect = (value) => {
    setRole(value);
    setRoleOpen(false);
  };

  const getRoleName = () => {
    if (role === "admin") {
      return "Admin Digi";
    }

    if (role === "user") {
      return "User";
    }

    return "Pilih Role";
  };

  return (
    <div className="pengguna-tambah-layout">
      {/* SIDEBAR */}
      <Sidebar />

      <div className="pengguna-tambah-main">
        {/* NAVBAR */}
        <Navbar />

        <main className="pengguna-tambah-content">
          {/* HEADER */}
          <section className="pengguna-tambah-header">
            <h1>Tambah Pengguna</h1>
          </section>

          {/* CARD */}
          <section className="pengguna-tambah-card">
            <div className="pengguna-tambah-card-title">Tambah</div>

            <form
              className="pengguna-tambah-card-content"
              onSubmit={handleSimpan}
            >
              {/* FOTO PROFIL */}
              <div className="pengguna-tambah-form-group">
                <label htmlFor="foto">Foto Profil</label>

                <input
                  id="foto"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFoto(e.target.files[0])}
                />
              </div>

              {/* NAMA */}
              <div className="pengguna-tambah-form-group">
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
              <div className="pengguna-tambah-form-group">
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
              <div className="pengguna-tambah-form-group">
                <label htmlFor="password">Password</label>

                <input
                  id="password"
                  type="password"
                  placeholder="Masukkan Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* NO. TELEPON */}
              <div className="pengguna-tambah-form-group">
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
              <div className="pengguna-tambah-form-group pengguna-role-form-group">
                <label>Role</label>

                <div className="pengguna-role-dropdown">
                  <button
                    type="button"
                    className={`pengguna-role-dropdown-trigger ${
                      roleOpen ? "open" : ""
                    } ${role ? "has-value" : ""}`}
                    onClick={() => setRoleOpen(!roleOpen)}
                  >
                    <span>{getRoleName()}</span>

                    <img
                      src={dropdownArrow}
                      alt=""
                      className={`pengguna-role-dropdown-arrow ${
                        roleOpen ? "rotate" : ""
                      }`}
                    />
                  </button>

                  {roleOpen && (
                    <div className="pengguna-role-dropdown-menu">
                      {/* PILIH ROLE */}
                      <button
                        type="button"
                        className={`pengguna-role-dropdown-option ${
                          role === "" ? "selected" : ""
                        }`}
                        onClick={() => handleRoleSelect("")}
                      >
                        Pilih Role
                      </button>

                      {/* ADMIN DIGI */}
                      <button
                        type="button"
                        className={`pengguna-role-dropdown-option ${
                          role === "admin" ? "selected" : ""
                        }`}
                        onClick={() => handleRoleSelect("admin")}
                      >
                        Admin Digi
                      </button>

                      {/* USER */}
                      <button
                        type="button"
                        className={`pengguna-role-dropdown-option ${
                          role === "user" ? "selected" : ""
                        }`}
                        onClick={() => handleRoleSelect("user")}
                      >
                        User
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* SIMPAN */}
              <button type="submit" className="pengguna-tambah-save-button">
                Simpan
              </button>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}

export default PengaturanPenggunaTambah;
