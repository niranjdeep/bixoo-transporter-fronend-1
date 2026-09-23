import { useState } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";

import "./TransporterLayout.css";

function TransporterLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [isOnline, setIsOnline] = useState(
    localStorage.getItem("transporter_status") === "online"
  );

  const savedProfile = localStorage.getItem("transporter_profile");

  const profile = savedProfile
    ? JSON.parse(savedProfile)
    : {};

  const transporterName = profile.name || "Transporter";

  const menuItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: "⌂",
    },
    {
      label: "Available Loads",
      path: "/loads",
      icon: "▣",
    },
    {
      label: "My Trips",
      path: "/trips",
      icon: "🚚",
    },
    {
      label: "Wallet",
      path: "/wallet",
      icon: "₹",
    },
    {
      label: "Notifications",
      path: "/notifications",
      icon: "🔔",
    },
    {
      label: "Profile",
      path: "/profile",
      icon: "◯",
    },
  ];

  const isActive = (path) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }

    return location.pathname.startsWith(path);
  };

  const toggleAvailability = () => {
    const newStatus = !isOnline;

    setIsOnline(newStatus);

    localStorage.setItem(
      "transporter_status",
      newStatus ? "online" : "offline"
    );
  };

  const handleNavigation = (path) => {
    navigate(path);
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("transporter_mobile");
    localStorage.removeItem("transporter_status");

    navigate("/login");
  };

  return (
    <div className="transporter-layout">

      {/* Mobile Overlay */}

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}

      <aside
        className={`transporter-sidebar ${
          sidebarOpen ? "open" : ""
        }`}
      >

        {/* Logo */}

        <div className="sidebar-logo">
          <div className="logo-text">
            BIX<span>O</span>O
          </div>

          <small>TRANSPORTER</small>
        </div>

        {/* Navigation */}

        <nav className="sidebar-nav">

          <p className="nav-heading">
            MAIN MENU
          </p>

          {menuItems.map((item) => (
            <button
              key={item.path}
              className={`nav-item ${
                isActive(item.path) ? "active" : ""
              }`}
              onClick={() =>
                handleNavigation(item.path)
              }
            >
              <span className="nav-icon">
                {item.icon}
              </span>

              <span>{item.label}</span>
            </button>
          ))}

        </nav>

        {/* Availability */}

        <div className="sidebar-bottom">

          <div className="availability-box">

            <div className="availability-top">
              <span className="availability-title">
                Availability
              </span>

              <span
                className={`availability-status ${
                  isOnline ? "online" : "offline"
                }`}
              >
                {isOnline ? "ONLINE" : "OFFLINE"}
              </span>
            </div>

            <button
              className={`availability-toggle ${
                isOnline ? "active" : ""
              }`}
              onClick={toggleAvailability}
            >
              <span></span>
            </button>

            <p>
              {isOnline
                ? "Receiving load opportunities"
                : "You are currently unavailable"}
            </p>

          </div>

          <button
            className="sidebar-logout"
            onClick={handleLogout}
          >
            ↪
            <span>Logout</span>
          </button>

        </div>

      </aside>

      {/* Main Area */}

      <div className="layout-main">

        {/* Header */}

        <header className="transporter-header">

          <button
            className="mobile-menu-btn"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>

          <div className="header-search">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Search loads, trips..."
            />
          </div>

          <div className="header-right">

            <button
              className="header-notification"
              onClick={() =>
                navigate("/notifications")
              }
            >
              🔔
              <span></span>
            </button>

            <button
              className={`header-status ${
                isOnline ? "online" : "offline"
              }`}
              onClick={toggleAvailability}
            >
              <i></i>
              {isOnline ? "Online" : "Offline"}
            </button>

            <button
              className="header-profile"
              onClick={() => navigate("/profile")}
            >
              <div className="header-avatar">
                {transporterName
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div className="header-user">
                <strong>{transporterName}</strong>
                <small>Transporter</small>
              </div>

              <span className="profile-arrow">
                ▾
              </span>
            </button>

          </div>

        </header>

        {/* Page Content */}

        <main className="layout-content">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default TransporterLayout;