import { useState } from "react";

import { FileText, Handshake, FileSearch, X } from "lucide-react";

import UserIcon from "../assets/icons/user.svg";
import LayananIcon from "../assets/icons/layanan.svg";
import MitraIcon from "../assets/icons/mitra.svg";
import KunjunganIcon from "../assets/icons/kunjungan.svg";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import "./Dashboard.css";

const visitorData = [
  { day: "Minggu", visitors: 0 },
  { day: "Senin", visitors: 35 },
  { day: "Selasa", visitors: 23 },
  { day: "Rabu", visitors: 30 },
  { day: "Kamis", visitors: 2 },
  { day: "Jumat", visitors: 0 },
  { day: "Sabtu", visitors: 0 },
];

const popularPages = [
  { name: "Search", value: 828 },
  { name: "Search", value: 828 },
  { name: "Search", value: 828 },
  { name: "Search", value: 828 },
  { name: "Search", value: 828 },
  { name: "Search", value: 828 },
  { name: "Search", value: 828 },
  { name: "Search", value: 828 },
  { name: "Search", value: 828 },
  { name: "Search", value: 828 },
];

const popularPlatforms = [
  { name: "Search", value: 828 },
  { name: "Search", value: 828 },
  { name: "Search", value: 828 },
  { name: "Search", value: 828 },
  { name: "Search", value: 828 },
  { name: "Search", value: 828 },
  { name: "Search", value: 828 },
];

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [logoutOpen, setLogoutOpen] = useState(false);

  return (
    <div className="dashboard-layout">
      {/* SIDEBAR */}
      <Sidebar collapsed={!sidebarOpen} />

      {/* MAIN */}
      <div className="dashboard-main">
        {/* NAVBAR */}
        <Navbar
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          onLogout={() => setLogoutOpen(true)}
        />

        {/* CONTENT */}
        <main className="dashboard-content">
          {/* =================================
              DASHBOARD TOP CARD
          ================================= */}
          <section className="dashboard-top-card">
            {/* TITLE */}
            <div className="dashboard-header">
              <h1>Dashboard</h1>
            </div>

            {/* STAT CARDS */}
            <section className="stat-cards">
              {/* TOTAL PRODUK */}
              <div className="stat-card">
                <div className="stat-icon blue">
                  <img src={UserIcon} alt="" />
                </div>

                <div className="stat-info">
                  <span>Total Produk</span>
                  <strong>10</strong>
                </div>
              </div>

              {/* TOTAL LAYANAN */}
              <div className="stat-card">
                <div className="stat-icon light-blue">
                  <img src={LayananIcon} alt="" />
                </div>

                <div className="stat-info">
                  <span>Total Layanan</span>
                  <strong>10</strong>
                </div>
              </div>

              {/* TOTAL MITRA */}
              <div className="stat-card">
                <div className="stat-icon red">
                  <img src={MitraIcon} alt="" />
                </div>

                <div className="stat-info">
                  <span>Total Mitra</span>
                  <strong>10</strong>
                </div>
              </div>

              {/* KUNJUNGAN HARI INI */}
              <div className="stat-card">
                <div className="stat-icon pink">
                  <img src={KunjunganIcon} alt="" />
                </div>

                <div className="stat-info">
                  <span>Kunjungan Hari Ini</span>
                  <strong>10</strong>
                </div>
              </div>
            </section>
          </section>

          {/* =================================
              CHART
          ================================= */}
          <section className="dashboard-panel chart-panel">
            <div className="panel-title">Statistik Kunjungan per Minggu</div>

            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height={250}>
                <LineChart
                  data={visitorData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="0" vertical={false} />

                  <XAxis
                    dataKey="day"
                    tick={{
                      fontSize: 12,
                    }}
                  />

                  <YAxis
                    domain={[0, 75]}
                    ticks={[0, 25, 50, 75]}
                    tick={{
                      fontSize: 12,
                    }}
                  />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="visitors"
                    stroke="#203f68"
                    strokeWidth={3}
                    dot={{
                      r: 5,
                      fill: "#203f68",
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* VISITOR SUMMARY */}
            <div className="visitor-summary">
              <div>
                <strong>1</strong>
                <span>Kunjungan Hari Ini</span>
              </div>

              <div>
                <strong>1</strong>
                <span>Kunjungan Minggu Ini</span>
              </div>

              <div>
                <strong>1</strong>
                <span>Kunjungan Bulan Ini</span>
              </div>

              <div>
                <strong>1</strong>
                <span>Kunjungan Tahun Ini</span>
              </div>
            </div>
          </section>

          {/* =================================
              POPULAR SECTION
          ================================= */}
          <section className="popular-grid">
            {/* POPULAR PAGES */}
            <div className="dashboard-panel popular-panel">
              <div className="panel-title">Halaman yang Sering dikunjungi</div>

              <div className="popular-list">
                {popularPages.map((item, index) => (
                  <div className="popular-item" key={index}>
                    <span>{item.name}</span>

                    <strong>{item.value}</strong>

                    <div className="progress-line">
                      <div className="progress-fill"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* POPULAR PLATFORMS */}
            <div className="dashboard-panel popular-panel">
              <div className="panel-title">Platform Populer</div>

              <div className="popular-list">
                {popularPlatforms.map((item, index) => (
                  <div className="popular-item" key={index}>
                    <span>{item.name}</span>

                    <strong>{item.value}</strong>

                    <div className="progress-line">
                      <div className="progress-fill"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =================================
              FOOTER
          ================================= */}
          <footer className="dashboard-footer">
            <span>Copyright © 2025 PT Digi Tekno Indonesia</span>

            <span>Vers</span>
          </footer>
        </main>
      </div>

      {/* =================================
          LOGOUT MODAL
      ================================= */}
      {logoutOpen && (
        <div className="logout-overlay">
          <div className="logout-modal">
            {/* MODAL HEADER */}
            <div className="logout-header">
              <h2>Logout</h2>

              <button
                className="logout-close"
                onClick={() => setLogoutOpen(false)}
                aria-label="Close"
              >
                <X size={27} />
              </button>
            </div>

            {/* MODAL BODY */}
            <div className="logout-body">
              <p>Apakah anda yakin akan Logout?</p>

              <div className="logout-actions">
                <button
                  className="logout-yes"
                  onClick={() => {
                    setLogoutOpen(false);

                    // Proses logout akan kita sambungkan
                    // ke halaman Login nanti.
                  }}
                >
                  Ya
                </button>

                <button
                  className="logout-no"
                  onClick={() => setLogoutOpen(false)}
                >
                  Tidak
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
