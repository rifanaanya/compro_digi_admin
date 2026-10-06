import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./KonfirmasiPostingan.css";

function KonfirmasiPostingan() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("postingan");

  const [postingan] = useState([
    {
      id: 1,
      judul: "Apa itu Bearing?",
      tipe: "List",
      tampilkan: "Ya",
      author: "Admin Digi",
      tanggal: "10/06/2025 10:00:00",
      status: "Publish",
    },
    {
      id: 2,
      judul: "Bagaimana Cara Kerja Turbin?",
      tipe: "List",
      tampilkan: "Ya",
      author: "Admin Digi",
      tanggal: "10/06/2025 10:00:00",
      status: "Pending",
    },
  ]);

  const [halaman] = useState([
    {
      id: 1,
      judul: "Artikel",
      tipe: "List",
      tampilkan: "Ya",
      author: "Admin Digi",
      tanggal: "10/06/2025 10:00:00",
      status: "Publish",
    },
    {
      id: 2,
      judul: "FAQ",
      tipe: "Post Grid",
      tampilkan: "Ya",
      author: "Admin Digi",
      tanggal: "10/06/2025 10:00:00",
      status: "Publish",
    },
    {
      id: 3,
      judul: "Home - Tentang Digi",
      tipe: "Default",
      tampilkan: "Ya",
      author: "Admin Digi",
      tanggal: "10/06/2025 10:00:00",
      status: "Pending",
    },
    {
      id: 4,
      judul: "Karir",
      tipe: "Default",
      tampilkan: "Ya",
      author: "Admin Digi",
      tanggal: "10/06/2025 10:00:00",
      status: "Pending",
    },
    {
      id: 5,
      judul: "Kegiatan",
      tipe: "Pict",
      tampilkan: "Ya",
      author: "Admin Digi",
      tanggal: "10/06/2025 10:00:00",
      status: "Publish",
    },
    {
      id: 6,
      judul: "Layanan",
      tipe: "Post Grid",
      tampilkan: "Ya",
      author: "Admin Digi",
      tanggal: "10/06/2025 10:00:00",
      status: "Publish",
    },
    {
      id: 7,
      judul: "Mitra",
      tipe: "Post Grid",
      tampilkan: "Ya",
      author: "Admin Digi",
      tanggal: "10/06/2025 10:00:00",
      status: "Pending",
    },
    {
      id: 8,
      judul: "Produk",
      tipe: "List",
      tampilkan: "Ya",
      author: "Admin Digi",
      tanggal: "10/06/2025 10:00:00",
      status: "Publish",
    },
    {
      id: 9,
      judul: "Sertifikasi",
      tipe: "Pict",
      tampilkan: "Ya",
      author: "Admin Digi",
      tanggal: "10/06/2025 10:00:00",
      status: "Pending",
    },
    {
      id: 10,
      judul: "Visi Misi",
      tipe: "Default",
      tampilkan: "Ya",
      author: "Admin Digi",
      tanggal: "10/06/2025 10:00:00",
      status: "Publish",
    },
  ]);

  const data = activeTab === "postingan" ? postingan : halaman;

  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="admin-main">
        <Navbar />

        <main className="konfirmasi-postingan-content">
          {/* TITLE */}
          <div className="konfirmasi-title-card">
            <h1>Konfirmasi Postingan</h1>
          </div>

          {/* INFO */}
          <div className="konfirmasi-info-card">
            <h2>{activeTab === "postingan" ? "Postingan" : "Halaman"}</h2>

            <p>
              Anda dapat mengelola semua postingan, seperti mengedit, menghapus,
              dan lainnya.
            </p>

            {/* TAB BUTTON */}
            <div className="konfirmasi-tabs">
              <button
                className={
                  activeTab === "postingan" ? "tab-btn active" : "tab-btn"
                }
                onClick={() => setActiveTab("postingan")}
              >
                Postingan
              </button>

              <button
                className={
                  activeTab === "halaman" ? "tab-btn active" : "tab-btn"
                }
                onClick={() => setActiveTab("halaman")}
              >
                Halaman
              </button>
            </div>
          </div>

          {/* TABLE */}
          <div className="konfirmasi-table-card">
            <h2>
              {activeTab === "postingan" ? "Semua Postingan" : "Semua Halaman"}
            </h2>

            <select className="status-select">
              <option>Pilih Status</option>
              <option>Publish</option>
              <option>Pending</option>
              <option>Delete</option>
            </select>

            <div className="konfirmasi-table-wrapper">
              <table className="konfirmasi-table">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Judul</th>
                    <th>Tipe</th>
                    <th>Tampilkan</th>
                    <th>Author</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>

                <tbody>
                  {data.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>

                      <td>{item.judul}</td>

                      <td>{item.tipe}</td>

                      <td>{item.tampilkan}</td>

                      <td>
                        <div>{item.author}</div>
                        <small>{item.tanggal}</small>
                      </td>

                      <td>
                        <span
                          className={`status-badge ${item.status.toLowerCase()}`}
                        >
                          {item.status}
                        </span>
                      </td>

                      {/* AKSI */}
                      <td>
                        <div className="konfirmasi-actions">
                          <button
                            className="detail-btn"
                            onClick={() =>
                              navigate(
                                `/konfirmasi-postingan/detail/${item.id}`,
                              )
                            }
                          >
                            Detail
                          </button>

                          {item.status === "Publish" ? (
                            <button className="pending-btn">Pending</button>
                          ) : (
                            <button className="publish-btn">Publish</button>
                          )}

                          <button className="delete-btn">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default KonfirmasiPostingan;
