import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import profileUser from "../assets/icons/profile-user.svg";

import "./ProfileEdit.css";

function ProfileEdit() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [profileImage, setProfileImage] = useState(profileUser);
  const [profileFile, setProfileFile] = useState(null);

  const [formData, setFormData] = useState({
    nama: "",
    telepon: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setProfileFile(file);

      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = JSON.parse(localStorage.getItem("admin"));

      if (!user?.id) {
        alert("Data user tidak ditemukan. Silakan login kembali.");
        return;
      }

      const formDataUpload = new FormData();

      formDataUpload.append("nama", formData.nama);
      formDataUpload.append("telepon", formData.telepon);
      formDataUpload.append("email", formData.email);
      formDataUpload.append("password", formData.password);

      if (profileFile) {
        formDataUpload.append("foto", profileFile);
      }

      const response = await fetch(
        `http://localhost:5000/api/profile/${user.id}`,
        {
          method: "PUT",
          body: formDataUpload,
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal menyimpan profil");
      }

      // Update data login di localStorage
      localStorage.setItem("admin", JSON.stringify(data.admin));

      alert("Profil berhasil disimpan!");

      // Kembali ke halaman profile
      window.location.href = "/profile";
    } catch (error) {
      console.error("❌ Error simpan profile:", error);
      alert(error.message);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("admin"));

        if (!user?.id) {
          alert("Data user tidak ditemukan. Silakan login kembali.");
          return;
        }

        const response = await fetch(
          `http://localhost:5000/api/profile/${user.id}`,
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Gagal mengambil data profile");
        }

        setFormData({
          nama: data.admin.nama || "",
          telepon: data.admin.telepon || "",
          email: data.admin.email || "",
          password: "",
        });

        if (data.admin.foto) {
          setProfileImage(`http://localhost:5000/uploads/${data.admin.foto}`);
        }
      } catch (error) {
        console.error("❌ Error fetch profile:", error);
        alert(error.message);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="dashboard-layout">
      {/* SIDEBAR */}
      {sidebarOpen && <Sidebar />}

      <div className="dashboard-main">
        {/* NAVBAR */}
        <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="dashboard-content profile-edit-content">
          {/* TITLE */}
          <section className="profile-edit-header ">
            <h1>Profil</h1>
          </section>

          {/* FORM */}
          <section className="profile-edit-panel">
            <div className="profile-edit-title">Edit</div>

            <form onSubmit={handleSubmit}>
              {/* FOTO PROFIL */}
              <div className="form-group">
                <label>Foto Profil</label>

                <div className="profile-upload-box">
                  <input
                    id="profile-file"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="profile-file-input"
                  />

                  <div className="profile-preview">
                    <img src={profileImage} alt="Profil" />
                    <span>Profil.png</span>
                  </div>
                </div>
              </div>

              {/* NAMA */}
              <div className="form-group">
                <label htmlFor="nama">Nama</label>

                <input
                  id="nama"
                  name="nama"
                  type="text"
                  value={formData.nama}
                  onChange={handleChange}
                />
              </div>

              {/* TELEPON */}
              <div className="form-group">
                <label htmlFor="telepon">No. Telepon</label>

                <input
                  id="telepon"
                  name="telepon"
                  type="text"
                  value={formData.telepon}
                  onChange={handleChange}
                />
              </div>

              {/* EMAIL */}
              <div className="form-group">
                <label htmlFor="email">Email</label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              {/* PASSWORD */}
              <div className="form-group">
                <label htmlFor="password">Password</label>

                <input
                  id="password"
                  name="password"
                  type="text"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              {/* SIMPAN */}
              <button type="submit" className="save-profile-button">
                Simpan
              </button>
            </form>
          </section>

          {/* FOOTER */}
          <footer className="dashboard-footer">
            <span>Copyright © 2025 PT Digi Tekno Indonesia</span>

            <span>Vers</span>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default ProfileEdit;
