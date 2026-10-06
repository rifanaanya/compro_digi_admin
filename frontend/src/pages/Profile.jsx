import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import profileUser from "../assets/icons/profile-user.svg";
import Copyright from "../components/Copyright";

import "./Profile.css";

function Profile() {
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("admin")) || {},
  );

  // =================================
  // AMBIL DATA PROFILE TERBARU
  // =================================
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const loginUser = JSON.parse(localStorage.getItem("admin"));

        if (!loginUser?.id) {
          console.error("❌ ID user tidak ditemukan");
          return;
        }

        const response = await fetch(
          `http://localhost:5000/api/profile/${loginUser.id}`,
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Gagal mengambil data profile");
        }

        // Simpan data terbaru ke state
        setUser(data.admin);

        // Sinkronkan localStorage
        localStorage.setItem("admin", JSON.stringify(data.admin));
      } catch (error) {
        console.error("❌ Error fetch profile:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="profile-layout">
      {/* SIDEBAR */}
      <Sidebar />

      <div className="profile-main">
        {/* NAVBAR */}
        <Navbar />

        <main className="profile-content">
          {/* HEADER */}
          <section className="profile-header">
            <h1 className="profile-title">Profil</h1>
          </section>

          {/* PROFILE CARD */}
          <section className="profile-card">
            <div className="profile-card-content">
              {/* LEFT */}
              <div className="profile-left">
                <h2>Hai, {user.nama || "User"}!</h2>

                <div className="profile-avatar">
                  <img
                    src={
                      user.foto
                        ? `http://localhost:5000/uploads/${user.foto}`
                        : profileUser
                    }
                    alt="Profile"
                    className="profile-avatar-icon"
                  />
                </div>
              </div>

              {/* RIGHT */}
              <div className="profile-info">
                <div className="profile-row">
                  <strong>{user.role || "User"}</strong>
                  <span>/</span>
                  <span>{user.role || "User"}</span>
                </div>

                <div className="profile-row">
                  <strong>No. Telepon</strong>
                  <span>:</span>
                  <span>{user.telepon || "-"}</span>
                </div>

                <div className="profile-row">
                  <strong>Email</strong>
                  <span>:</span>
                  <span>{user.email || "-"}</span>
                </div>

                {/* ACTION BUTTON */}
                <div className="profile-actions">
                  <button
                    type="button"
                    className="edit-profile"
                    onClick={() => (window.location.href = "/profile/edit")}
                  >
                    Edit Profil
                  </button>

                  <button
                    type="button"
                    className="reset-password"
                    onClick={() => setResetPasswordOpen(true)}
                  >
                    Reset Password
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* =================================
          RESET PASSWORD MODAL
      ================================= */}
      {resetPasswordOpen && (
        <div className="reset-modal-overlay">
          <div className="reset-password-modal">
            {/* MODAL HEADER */}
            <div className="reset-modal-header">
              <h2>Reset Password</h2>

              <button
                type="button"
                className="reset-modal-close"
                onClick={() => setResetPasswordOpen(false)}
              >
                ×
              </button>
            </div>

            {/* MODAL BODY */}
            <div className="reset-modal-body">
              <h3>Silahkan Masukkan Data untuk Reset Password</h3>

              {/* PASSWORD BARU */}
              <div className="reset-form-group">
                <label>Password Baru</label>

                <input type="password" placeholder="Masukkan Password Baru" />
              </div>

              {/* ULANGI PASSWORD */}
              <div className="reset-form-group">
                <label>Ulangi Password Baru</label>

                <input type="password" placeholder="Ulangi Password Baru" />
              </div>

              {/* BUTTON */}
              <div className="reset-modal-actions">
                <button
                  type="button"
                  className="reset-save-button"
                  onClick={() => {
                    alert("Password berhasil disimpan!");
                    setResetPasswordOpen(false);
                  }}
                >
                  Simpan
                </button>

                <button
                  type="button"
                  className="reset-cancel-button"
                  onClick={() => setResetPasswordOpen(false)}
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
