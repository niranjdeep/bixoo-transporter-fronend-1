<<<<<<< HEAD
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import Icon from "../Icon";
import { useAuth } from "../../context/AuthContext";

import "./TransporterLayout.css";
import "./TransporterUI.css";
=======
import { useState } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";

import "./TransporterLayout.css";
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e

function TransporterLayout() {
  const navigate = useNavigate();
  const location = useLocation();
<<<<<<< HEAD
  const { user, logout } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const sidebarRef = useRef(null);
  const menuRef = useRef(null);
  const [compact, setCompact] = useState(() => window.matchMedia("(max-width: 1000px)").matches);
  const drawerOpen = compact && sidebarOpen;

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1000px)");
    const update = () => setCompact(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!drawerOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const menuButton = menuRef.current;
    sidebarRef.current.querySelector("button")?.focus();
    const onKeyDown = (event) => {
      if (event.key === "Escape") { event.preventDefault(); setSidebarOpen(false); }
      if (event.key !== "Tab") return;
      const controls = [...sidebarRef.current.querySelectorAll("button, a, input")].filter(el => !el.disabled);
      const first = controls[0], last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      menuButton?.focus();
    };
  }, [drawerOpen]);
=======

  const [sidebarOpen, setSidebarOpen] = useState(false);
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e

  const [isOnline, setIsOnline] = useState(
    localStorage.getItem("transporter_status") === "online"
  );

<<<<<<< HEAD
  const transporterName = user.name;
=======
  const savedProfile = localStorage.getItem("transporter_profile");

  const profile = savedProfile
    ? JSON.parse(savedProfile)
    : {};

  const transporterName = profile.name || "Transporter";
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e

  const menuItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
<<<<<<< HEAD
      icon: "dashboard",
=======
      icon: "⌂",
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
    },
    {
      label: "Available Loads",
      path: "/loads",
<<<<<<< HEAD
      icon: "loads",
=======
      icon: "▣",
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
    },
    {
      label: "My Trips",
      path: "/trips",
<<<<<<< HEAD
      icon: "truck",
=======
      icon: "🚚",
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
    },
    {
      label: "Wallet",
      path: "/wallet",
<<<<<<< HEAD
      icon: "wallet",
=======
      icon: "₹",
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
    },
    {
      label: "Notifications",
      path: "/notifications",
<<<<<<< HEAD
      icon: "bell",
=======
      icon: "🔔",
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
    },
    {
      label: "Profile",
      path: "/profile",
<<<<<<< HEAD
      icon: "user",
=======
      icon: "◯",
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
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

<<<<<<< HEAD
  const handleLogout = async () => {
    const notice = await logout();
    navigate("/login", { replace: true, state: { notice } });
=======
  const handleLogout = () => {
    localStorage.removeItem("transporter_mobile");
    localStorage.removeItem("transporter_status");

    navigate("/login");
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
  };

  return (
    <div className="transporter-layout">

      {/* Mobile Overlay */}

<<<<<<< HEAD
      {drawerOpen && (
=======
      {sidebarOpen && (
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}

      <aside
<<<<<<< HEAD
        ref={sidebarRef}
        inert={compact && !drawerOpen}
        role={drawerOpen ? "dialog" : undefined}
        aria-modal={drawerOpen ? true : undefined}
        aria-label="Transporter navigation"
        className={`transporter-sidebar ${
          drawerOpen ? "open" : ""
        }`}
        id="transporter-navigation"
        onKeyDown={(event) => {
          if (event.key === "Escape") setSidebarOpen(false);
        }}
=======
        className={`transporter-sidebar ${
          sidebarOpen ? "open" : ""
        }`}
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
      >

        {/* Logo */}

        <div className="sidebar-logo">
          <div className="logo-text">
            BIX<span>O</span>O
          </div>

          <small>TRANSPORTER</small>
<<<<<<< HEAD
          {compact && <button className="sidebar-close" aria-label="Close navigation" onClick={() => setSidebarOpen(false)}><Icon name="close" /></button>}
=======
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
        </div>

        {/* Navigation */}

<<<<<<< HEAD
        <nav className="sidebar-nav" aria-label="Main navigation">
=======
        <nav className="sidebar-nav">
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e

          <p className="nav-heading">
            MAIN MENU
          </p>

          {menuItems.map((item) => (
            <button
              key={item.path}
<<<<<<< HEAD
              aria-current={isActive(item.path) ? "page" : undefined}
=======
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
              className={`nav-item ${
                isActive(item.path) ? "active" : ""
              }`}
              onClick={() =>
                handleNavigation(item.path)
              }
            >
              <span className="nav-icon">
<<<<<<< HEAD
                <Icon name={item.icon} />
=======
                {item.icon}
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
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
<<<<<<< HEAD
              role="switch"
              aria-checked={isOnline}
              aria-label="Availability"
=======
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
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
<<<<<<< HEAD
            <Icon name="logout" size={18} />
=======
            ↪
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
            <span>Logout</span>
          </button>

        </div>

      </aside>

      {/* Main Area */}

<<<<<<< HEAD
      <div className="layout-main" inert={drawerOpen}>
        <a className="skip-link" href="#main-content">Skip to content</a>
=======
      <div className="layout-main">
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e

        {/* Header */}

        <header className="transporter-header">

          <button
<<<<<<< HEAD
            ref={menuRef}
            className="mobile-menu-btn"
            aria-label={sidebarOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={sidebarOpen}
            aria-controls="transporter-navigation"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Icon name="menu" />
          </button>

          <form className="header-search" role="search" onSubmit={(event) => {
            event.preventDefault();
            navigate(`/loads${search.trim() ? `?q=${encodeURIComponent(search.trim())}` : ""}`);
          }}>
            <Icon name="search" size={18} />

            <input
              type="search"
              aria-label="Search loads"
              placeholder="Search loads or locations..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </form>
=======
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
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e

          <div className="header-right">

            <button
              className="header-notification"
<<<<<<< HEAD
              aria-label="Notifications"
=======
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
              onClick={() =>
                navigate("/notifications")
              }
            >
<<<<<<< HEAD
              <Icon name="bell" />
=======
              🔔
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
              <span></span>
            </button>

            <button
              className={`header-status ${
                isOnline ? "online" : "offline"
              }`}
<<<<<<< HEAD
              aria-label={isOnline ? "Go offline" : "Go online"}
              aria-pressed={isOnline}
=======
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
              onClick={toggleAvailability}
            >
              <i></i>
              {isOnline ? "Online" : "Offline"}
            </button>

            <button
              className="header-profile"
<<<<<<< HEAD
              aria-label="Open transporter profile"
=======
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
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
<<<<<<< HEAD
=======

              <span className="profile-arrow">
                ▾
              </span>
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
            </button>

          </div>

        </header>

        {/* Page Content */}

<<<<<<< HEAD
        <main className="layout-content" id="main-content" tabIndex={-1}>
=======
        <main className="layout-content">
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
          <Outlet />
        </main>

      </div>

    </div>
  );
}

<<<<<<< HEAD
export default TransporterLayout;
=======
export default TransporterLayout;
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
