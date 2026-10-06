import { useState } from "react";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

import "./AdminLayout.css";

function AdminLayout({ children, onLogout }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleMenuClick = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  return (
    <div className="admin-layout">
      <Sidebar collapsed={sidebarCollapsed} />

      <div className="admin-main">
        <Navbar onMenuClick={handleMenuClick} onLogout={onLogout} />

        {children}
      </div>
    </div>
  );
}

export default AdminLayout;
