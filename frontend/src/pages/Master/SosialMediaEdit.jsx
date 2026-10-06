import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import dropdownArrow from "../../assets/icons/dropdown-arrow.svg";
import whatsappIcon from "../../assets/icons/whatsapp.svg";
import instagramIcon from "../../assets/icons/instagram.svg";
import gmailIcon from "../../assets/icons/gmail.svg";
import linkedinIcon from "../../assets/icons/linkedin.svg";
import youtubeIcon from "../../assets/icons/youtube.svg";
import facebookIcon from "../../assets/icons/facebook.svg";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./SosialMediaEdit.css";

function SosialMediaEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [nama, setNama] = useState("");
  const [url, setUrl] = useState("");
  const [icon, setIcon] = useState("");
  const [iconOpen, setIconOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/sosial-media/${id}`,
        );

        const result = await response.json();

        if (!response.ok) {
          alert(result.message || "Gagal mengambil data sosial media");
          navigate("/master/sosial-media");
          return;
        }

        setNama(result.data.nama);
        setUrl(result.data.url);
        setIcon(result.data.icon);
      } catch (error) {
        console.error("❌ Error mengambil data sosial media:", error);
        alert("Terjadi kesalahan saat mengambil data");
        navigate("/master/sosial-media");
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleIconSelect = (value) => {
    setIcon(value);
    setIconOpen(false);
  };

  const getSocialIcon = (value) => {
    if (value === "whatsapp") {
      return whatsappIcon;
    }

    if (value === "instagram") {
      return instagramIcon;
    }

    if (value === "gmail") {
      return gmailIcon;
    }

    if (value === "linkedin") {
      return linkedinIcon;
    }

    if (value === "facebook") {
      return facebookIcon;
    }

    if (value === "youtube") {
      return youtubeIcon;
    }

    return null;
  };

  const getSocialIconName = (value) => {
    if (value === "whatsapp") {
      return "WhatsApp";
    }

    if (value === "instagram") {
      return "Instagram";
    }

    if (value === "gmail") {
      return "Gmail";
    }

    if (value === "linkedin") {
      return "LinkedIn";
    }

    if (value === "youtube") {
      return "YouTube";
    }

    if (value === "facebook") {
      return "Facebook";
    }

    return "Pilih Icon";
  };

  const handleSimpan = async (e) => {
    e.preventDefault();

    if (!nama.trim() || !url.trim() || !icon) {
      alert("Nama, URL, dan Icon wajib diisi");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/sosial-media/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nama: nama.trim(),
            url: url.trim(),
            icon,
          }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Gagal memperbarui sosial media");
        return;
      }

      alert("Sosial media berhasil diperbarui");

      navigate("/master/sosial-media");
    } catch (error) {
      console.error("❌ Error edit sosial media:", error);
      alert("Terjadi kesalahan saat memperbarui sosial media");
    }
  };

  return (
    <div className="sosial-media-edit-layout">
      <Sidebar />

      <div className="sosial-media-edit-main">
        <Navbar />

        <main className="sosial-media-edit-content">
          {/* HEADER */}
          <section className="sosial-media-edit-header">
            <h1>Edit Sosial Media</h1>
          </section>

          {/* CARD */}
          <section className="sosial-media-edit-card">
            <div className="sosial-media-edit-card-title">Edit</div>

            <form
              className="sosial-media-edit-card-content"
              onSubmit={handleSimpan}
            >
              {/* NAMA */}
              <div className="sosial-media-edit-form-group">
                <label htmlFor="nama">Nama Sosial Media</label>

                <input
                  id="nama"
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                />
              </div>

              {/* URL */}
              <div className="sosial-media-edit-form-group">
                <label htmlFor="url">URL</label>

                <input
                  id="url"
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>

              {/* ICON */}
              <div className="sosial-media-edit-form-group">
                <label>Icon</label>

                <div className="sosial-media-edit-icon-dropdown">
                  <button
                    type="button"
                    className={`sosial-media-edit-icon-dropdown-trigger ${
                      iconOpen ? "open" : ""
                    } ${icon ? "has-value" : ""}`}
                    onClick={() => setIconOpen(!iconOpen)}
                  >
                    <div className="sosial-media-edit-selected-icon">
                      {icon && (
                        <img
                          src={getSocialIcon(icon)}
                          alt=""
                          className={`sosial-media-edit-selected-icon-image ${
                            icon === "gmail" ? "gmail" : ""
                          }`}
                        />
                      )}

                      <span>{getSocialIconName(icon)}</span>
                    </div>

                    <img
                      src={dropdownArrow}
                      alt=""
                      className={`sosial-media-edit-icon-dropdown-arrow ${
                        iconOpen ? "rotate" : ""
                      }`}
                    />
                  </button>

                  {iconOpen && (
                    <div className="sosial-media-edit-icon-dropdown-list">
                      <button
                        type="button"
                        className="sosial-media-edit-icon-dropdown-option"
                        onClick={() => handleIconSelect("whatsapp")}
                      >
                        <img
                          src={whatsappIcon}
                          alt=""
                          className="sosial-media-edit-option-icon whatsapp"
                        />
                        <span>WhatsApp</span>
                      </button>

                      <button
                        type="button"
                        className="sosial-media-edit-icon-dropdown-option"
                        onClick={() => handleIconSelect("instagram")}
                      >
                        <img
                          src={instagramIcon}
                          alt=""
                          className="sosial-media-edit-option-icon instagram"
                        />
                        <span>Instagram</span>
                      </button>

                      <button
                        type="button"
                        className="sosial-media-edit-icon-dropdown-option"
                        onClick={() => handleIconSelect("gmail")}
                      >
                        <img
                          src={gmailIcon}
                          alt=""
                          className="sosial-media-edit-option-icon gmail"
                        />
                        <span>Gmail</span>
                      </button>

                      <button
                        type="button"
                        className="sosial-media-edit-icon-dropdown-option"
                        onClick={() => handleIconSelect("linkedin")}
                      >
                        <img
                          src={linkedinIcon}
                          alt=""
                          className="sosial-media-edit-option-icon linkedin"
                        />
                        <span>LinkedIn</span>
                      </button>

                      <button
                        type="button"
                        className="sosial-media-edit-icon-dropdown-option"
                        onClick={() => handleIconSelect("youtube")}
                      >
                        <img
                          src={youtubeIcon}
                          alt=""
                          className="sosial-media-edit-option-icon youtube"
                        />
                        <span>YouTube</span>
                      </button>

                      <button
                        type="button"
                        className="sosial-media-edit-icon-dropdown-option"
                        onClick={() => handleIconSelect("facebook")}
                      >
                        <img
                          src={facebookIcon}
                          alt=""
                          className="sosial-media-edit-option-icon facebook"
                        />
                        <span>Facebook</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* SIMPAN */}
              <button type="submit" className="sosial-media-edit-save-button">
                Simpan
              </button>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}

export default SosialMediaEdit;
