import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import "./PengaturanLainnya.css";

function PengaturanLainnya() {
  const navigate = useNavigate();

  const [pengaturanData, setPengaturanData] = useState([]);

  // ==========================================
  // GET SEMUA PENGATURAN
  // ==========================================

  useEffect(() => {
    const fetchPengaturan = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/pengaturan-lainnya",
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.message || "Gagal mengambil data Pengaturan Lainnya.",
          );
        }

        setPengaturanData(result.data);
      } catch (error) {
        console.error("❌ Gagal mengambil Pengaturan Lainnya:", error);
      }
    };

    fetchPengaturan();
  }, []);

  // ==========================================
  // DETAIL
  // ==========================================

  const handleDetail = (id) => {
    navigate(`/settings/pengaturan-lainnya/detail/${id}`);
  };

  // ==========================================
  // EDIT
  // ==========================================

  const handleEdit = (id) => {
    navigate(`/settings/pengaturan-lainnya/edit/${id}`);
  };

  return (
    <div className="pengaturan-lainnya-layout">
      {/* SIDEBAR */}
      <Sidebar />

      <div className="pengaturan-lainnya-main">
        {/* NAVBAR */}
        <Navbar />

        <main className="pengaturan-lainnya-content">
          {/* HEADER */}
          <section className="pengaturan-lainnya-header">
            <h1>List Pengaturan Lainnya</h1>
          </section>

          {/* CARD */}
          <section className="pengaturan-lainnya-card">
            <div className="pengaturan-lainnya-card-content">
              {/* BUAT PENGATURAN */}
              <button
                type="button"
                className="pengaturan-lainnya-add-button"
                onClick={() => navigate("/settings/pengaturan-lainnya/tambah")}
              >
                Buat Pengaturan
              </button>

              {/* TABLE */}
              <div className="pengaturan-lainnya-table-wrapper">
                <table className="pengaturan-lainnya-table">
                  <colgroup>
                    <col className="pengaturan-lainnya-col-no" />
                    <col className="pengaturan-lainnya-col-name" />
                    <col className="pengaturan-lainnya-col-image" />
                    <col className="pengaturan-lainnya-col-action" />
                  </colgroup>

                  <thead>
                    <tr>
                      <th className="pengaturan-lainnya-no">No.</th>

                      <th>Nama Pengaturan</th>

                      <th className="pengaturan-lainnya-image-header">
                        Isi Pengaturan
                      </th>

                      <th className="pengaturan-lainnya-action-header">Aksi</th>
                    </tr>
                  </thead>

                  <tbody>
                    {pengaturanData.map((item, index) => (
                      <tr key={item.id}>
                        {/* NOMOR URUT */}
                        <td className="pengaturan-lainnya-no">{index + 1}</td>

                        {/* NAMA PENGATURAN */}
                        <td className="pengaturan-lainnya-name">{item.nama}</td>

                        {/* GAMBAR */}
                        <td className="pengaturan-lainnya-image-cell">
                          <div className="pengaturan-lainnya-image-box">
                            {item.gambar && (
                              <img
                                src={`http://localhost:5000${item.gambar}`}
                                alt={item.nama}
                              />
                            )}
                          </div>
                        </td>

                        {/* AKSI */}
                        <td className="pengaturan-lainnya-actions">
                          <button
                            type="button"
                            className="pengaturan-lainnya-detail-button"
                            onClick={() => handleDetail(item.id)}
                          >
                            Detail
                          </button>

                          <button
                            type="button"
                            className="pengaturan-lainnya-edit-button"
                            onClick={() => handleEdit(item.id)}
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default PengaturanLainnya;
