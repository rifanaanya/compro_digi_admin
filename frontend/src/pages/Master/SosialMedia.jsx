import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import whatsappIcon from "../../assets/icons/whatsapp.svg";
import instagramIcon from "../../assets/icons/instagram.svg";
import gmailIcon from "../../assets/icons/gmail.svg";
import linkedinIcon from "../../assets/icons/linkedin.svg";
import youtubeIcon from "../../assets/icons/youtube.svg";
import facebookIcon from "../../assets/icons/facebook.svg";

import "./SosialMedia.css";

function SosialMedia() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState(null);
  const [sosialMediaData, setSosialMediaData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/sosial-media")
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setSosialMediaData(result.data);
        }
      })
      .catch((error) => {
        console.error("❌ Error mengambil sosial media:", error);
      });
  }, []);

  const filteredData = sosialMediaData.filter((item) =>
    `${item.nama} ${item.url} ${item.icon}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const handleEdit = (id) => {
    navigate(`/master/sosial-media/edit/${id}`);
  };

  const handleDelete = (id) => {
    setSelectedDeleteId(id);
    setDeleteModal(true);
  };

  const handleCancelDelete = () => {
    setDeleteModal(false);
    setSelectedDeleteId(null);
  };

  const handleConfirmDelete = async () => {
    if (!selectedDeleteId) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/sosial-media/${selectedDeleteId}`,
        {
          method: "DELETE",
        },
      );

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Gagal menghapus sosial media");
        return;
      }

      alert("Sosial media berhasil dihapus");

      setSosialMediaData((prevData) =>
        prevData.filter((item) => item.id !== selectedDeleteId),
      );

      setDeleteModal(false);
      setSelectedDeleteId(null);
    } catch (error) {
      console.error("❌ Error delete sosial media:", error);
      alert("Terjadi kesalahan saat menghapus sosial media");
    }
  };

  const renderIcon = (icon) => {
    if (icon === "whatsapp") {
      return (
        <img
          src={whatsappIcon}
          alt="WhatsApp"
          className="sosial-media-custom-icon whatsapp-icon"
        />
      );
    }

    if (icon === "instagram") {
      return (
        <img
          src={instagramIcon}
          alt="Instagram"
          className="sosial-media-custom-icon instagram-icon"
        />
      );
    }

    if (icon === "gmail") {
      return (
        <img
          src={gmailIcon}
          alt="Gmail"
          className="sosial-media-custom-icon gmail-icon"
        />
      );
    }

    if (icon === "linkedin") {
      return (
        <img
          src={linkedinIcon}
          alt="LinkedIn"
          className="sosial-media-custom-icon linkedin-icon"
        />
      );
    }

    if (icon === "youtube") {
      return (
        <img
          src={youtubeIcon}
          alt="YouTube"
          className="sosial-media-custom-icon youtube-icon"
        />
      );
    }

    if (icon === "facebook") {
      return (
        <img
          src={facebookIcon}
          alt="Facebook"
          className="sosial-media-custom-icon facebook-icon"
        />
      );
    }

    return null;
  };

  return (
    <div className="sosial-media-layout">
      {/* SIDEBAR */}
      <Sidebar />

      <div className="sosial-media-main">
        {/* NAVBAR */}
        <Navbar />

        <main className="sosial-media-content">
          {/* HEADER */}
          <section className="sosial-media-header">
            <h1>List Sosial Media</h1>
          </section>

          {/* CARD */}
          <section className="sosial-media-card">
            <div className="sosial-media-card-title">Semua Sosial Media</div>

            <div className="sosial-media-card-content">
              {/* TOP ACTION */}
              <div className="sosial-media-top-action">
                <button
                  className="social-media-add-button"
                  onClick={() => navigate("/master/sosial-media/tambah")}
                >
                  Tambah Sosial Media
                </button>

                {/* SEARCH */}
                <div className="sosial-media-search">
                  <input
                    type="text"
                    placeholder="Cari"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />

                  <Search size={15} className="sosial-media-search-icon" />
                </div>
              </div>

              {/* TABLE */}
              <div className="sosial-media-table-wrapper">
                <table className="sosial-media-table">
                  <thead>
                    <tr>
                      <th className="sosial-media-no">No.</th>

                      <th>Nama Sosial Media</th>

                      <th>URL</th>

                      <th className="sosial-media-icon-header">Icon</th>

                      <th className="sosial-media-order-header">Order</th>

                      <th className="sosial-media-action-header">Aksi</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredData.length > 0 ? (
                      filteredData.map((item) => (
                        <tr key={item.id}>
                          <td className="sosial-media-no">{item.id}</td>

                          <td>{item.nama}</td>

                          <td>
                            <span className="sosial-media-url">{item.url}</span>
                          </td>

                          <td className="sosial-media-icon-cell">
                            <div className="sosial-media-icon">
                              {renderIcon(item.icon)}
                            </div>
                          </td>

                          <td className="sosial-media-order">-</td>

                          <td className="sosial-media-actions">
                            <button
                              type="button"
                              className="sosial-media-edit-button"
                              onClick={() => handleEdit(item.id)}
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              className="sosial-media-delete-button"
                              onClick={() => handleDelete(item.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="sosial-media-empty">
                          Data tidak ditemukan
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </main>

        {deleteModal && (
          <div className="sosial-media-delete-overlay">
            <div className="sosial-media-delete-modal">
              <div className="sosial-media-delete-modal-header">
                <h2>Hapus</h2>

                <button
                  type="button"
                  className="sosial-media-delete-close"
                  onClick={() => {
                    setDeleteModal(false);
                    setSelectedDeleteId(null);
                  }}
                >
                  ×
                </button>
              </div>

              <div className="sosial-media-delete-modal-content">
                <p className="sosial-media-delete-question">
                  Apakah anda yakin akan menghapus data?
                </p>

                <p className="sosial-media-delete-description">
                  Jika data dihapus, maka akan hilang secara permanen
                </p>

                <div className="sosial-media-delete-modal-actions">
                  <button
                    type="button"
                    className="sosial-media-delete-cancel"
                    onClick={() => {
                      setDeleteModal(false);
                      setSelectedDeleteId(null);
                    }}
                  >
                    Kembali
                  </button>

                  <button
                    type="button"
                    className="sosial-media-delete-confirm"
                    onClick={handleConfirmDelete}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SosialMedia;
