import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import "./PengaturanLainnya.css";

function PengaturanLainnya() {
  const navigate = useNavigate();

  const pengaturanData = [
    {
      id: 1,
      name: "Logo Sidebar",
      image: "/Logo-Digi.png",
    },
    {
      id: 2,
      name: "Logo Header",
      image: "/Logo-Digi.png",
    },
  ];

  const handleDetail = (id) => {
    navigate(`/settings/pengaturan-lainnya/detail/${id}`);
  };

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
                    {pengaturanData.map((item) => (
                      <tr key={item.id}>
                        <td className="pengaturan-lainnya-no">{item.id}</td>

                        <td className="pengaturan-lainnya-name">{item.name}</td>

                        <td className="pengaturan-lainnya-image-cell">
                          <div className="pengaturan-lainnya-image-box">
                            <img src={item.image} alt={item.name} />
                          </div>
                        </td>

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
