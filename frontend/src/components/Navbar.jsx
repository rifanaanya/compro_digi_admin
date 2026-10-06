import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, ChevronDown, UserRound, Clock3, LogOut, X } from "lucide-react";
import "./Navbar.css";

function Navbar({ onMenuClick }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const navigate = useNavigate();

  // Ambil data user yang sedang login
  const user = JSON.parse(localStorage.getItem("admin")) || {};

  // Klik Hi, Admin / Hi, User
  const handleAdminClick = () => {
    if (profileOpen) {
      // Dropdown terbuka → klik lagi kembali ke Dashboard
      setProfileOpen(false);
      navigate("/dashboard");
    } else {
      // Dropdown belum terbuka → buka dropdown
      setProfileOpen(true);
    }
  };

  // Klik Profil
  const handleProfile = () => {
    setProfileOpen(false);
    navigate("/profile");
  };

  // Klik Aktivitas
  const handleActivity = () => {
    setProfileOpen(false);
    navigate("/activity");
  };

  // Klik Logout dari dropdown
  const handleLogout = () => {
    setProfileOpen(false);
    setLogoutOpen(true);
  };

  // Tutup modal
  const handleCloseLogout = () => {
    setLogoutOpen(false);
  };

  // Konfirmasi Logout
  const handleConfirmLogout = () => {
    // Tutup modal
    setLogoutOpen(false);

    // Hapus data user yang sedang login
    localStorage.removeItem("admin");

    // Kembali ke halaman login
    navigate("/login");
  };

  return (
    <>
      <header className="navbar">
        {/* MENU */}
        <button type="button" className="menu-button" onClick={onMenuClick}>
          <Menu size={24} />
        </button>

        <div className="navbar-right">
          {/* WEBSITE DIGI */}
          <button type="button" className="website-button">
            Website DIGI
          </button>

          {/* PROFILE */}
          <div className="profile-dropdown">
            {/* HI ADMIN / USER */}
            <button
              type="button"
              className={`admin-profile ${profileOpen ? "profile-open" : ""}`}
              onClick={handleAdminClick}
            >
              <span className="admin-profile-icon">
                <img
                  src="/admin-profile.svg"
                  alt=""
                  className="admin-profile-icon-normal"
                />

                <img
                  src="/admin-profile-hover.svg"
                  alt=""
                  className="admin-profile-icon-hover"
                />
              </span>

              <span>Hi, {user.role || "Admin"}</span>

              <ChevronDown
                size={15}
                className={profileOpen ? "arrow-up" : ""}
              />
            </button>

            {/* DROPDOWN */}
            {profileOpen && (
              <div className="profile-menu">
                {/* PROFIL */}
                <button type="button" onClick={handleProfile}>
                  <UserRound size={16} />
                  <span>Profil</span>
                </button>

                {/* AKTIVITAS */}
                <button type="button" onClick={handleActivity}>
                  <Clock3 size={16} />
                  <span>Aktivitas</span>
                </button>

                {/* LOGOUT */}
                <button type="button" onClick={handleLogout}>
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* =================================
          LOGOUT MODAL
      ================================= */}
      {logoutOpen && (
        <div className="logout-overlay">
          <div className="logout-modal">
            {/* HEADER */}
            <div className="logout-modal-header">
              <h2>Logout</h2>

              <button
                type="button"
                className="logout-close"
                onClick={handleCloseLogout}
              >
                <X size={24} />
              </button>
            </div>

            {/* BODY */}
            <div className="logout-modal-body">
              <p>Apakah anda yakin akan Logout?</p>

              <div className="logout-actions">
                <button
                  type="button"
                  className="logout-yes"
                  onClick={handleConfirmLogout}
                >
                  Ya
                </button>

                <button
                  type="button"
                  className="logout-no"
                  onClick={handleCloseLogout}
                >
                  Tidak
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
