<<<<<<< HEAD
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Icon from "../../components/Icon";
import LoadCard from "../../components/LoadCard";
import PageHeader from "../../components/ui/PageHeader";
import StatCard from "../../components/ui/StatCard";
import Button from "../../components/ui/Button";
import StatusBadge from "../../components/ui/StatusBadge";
import api from "../../services/api";
=======
import { useNavigate } from "react-router-dom";
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
<<<<<<< HEAD
  const { user } = useAuth();
  const profile = { name: user?.name };
  const [stats, setStats] = useState({
    available_loads: 0,
    today_available: 0,
    today_completed: 0,
    total_completed: 0,
    pending_settlement: 0,
    total_earnings: 0,
  });
  const [activeTrip, setActiveTrip] = useState(null);
  const [recentLoads, setRecentLoads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const dashboardRes = await api.get("/transporter/dashboard");
        if (dashboardRes.data) {
          setStats(dashboardRes.data.stats);
          setActiveTrip(dashboardRes.data.active_trip);
        }
        
        // Fetch a few available loads for the dashboard
        const loadsRes = await api.get("/transporter/loads?limit=2");
        if (loadsRes.data) {
          const mappedLoads = loadsRes.data.map(item => ({
            id: item.match_id,
            status: item.match_status === "PENDING" ? "NEW LOAD" : item.match_status,
            distance: `${item.distance_from_pickup || 0} km away`,
            pickup: item.request.pickup_city,
            delivery: item.request.delivery_city,
            weight: `${item.request.weight} ${item.request.weight_unit}`,
            type: item.request.goods_name,
            start: item.request.pickup_time || "Flexible"
          }));
          setRecentLoads(mappedLoads);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const summary = [
    [stats.available_loads.toString(), "Available Loads"],
    [stats.today_available.toString(), "Today's Available"],
    [stats.today_completed.toString(), "Today's Completed"],
    // Formatting currency for pending settlement
    [`₹${stats.pending_settlement.toLocaleString()}`, "Pending Settlements"],
  ];

  return (
    <div className="bixoo-dashboard ui-page">
      <PageHeader eyebrow="TRANSPORTER OVERVIEW" title="Dashboard" description="Your loads, trips and operations, all in one place."
        action={<Button variant="primary" onClick={() => navigate("/loads")}><Icon name="loads" size={18} />Find Loads</Button>} />
      <section className="dashboard-welcome">
        <div><span className="ui-eyebrow">WELCOME BACK</span><h2>{profile.name || "Transporter"}</h2><p>Keep your business moving. Review your operations and plan your next trip.</p></div>
        <div className="dashboard-welcome-actions">
          <Button variant="secondary" onClick={() => navigate("/trips")}><Icon name="truck" size={18} />My Trips</Button>
          <Button variant="outline" onClick={() => navigate("/wallet")}><Icon name="wallet" size={18} />Wallet</Button>
        </div>
      </section>
      
      <section className="ui-stats-grid dashboard-stats" aria-label="Operational statistics">
        <StatCard icon="loads" label="Available Loads" value={stats.available_loads.toString()} detail="Freight opportunities" />
        <StatCard icon="truck" label="Active Trips" value={activeTrip ? "1" : "0"} detail="Your current journey" />
        <StatCard icon="check" label="Today's Completed" value={stats.today_completed.toString()} detail="Completed deliveries" />
        <StatCard icon="wallet" label="Pending Settlement" value={`₹${stats.pending_settlement.toLocaleString()}`} detail="Current pending balance" />
      </section>

      <section className="dashboard-section">
        <div className="ui-section-header">
          <h2>Available Loads</h2>
          <Button variant="link" icon="arrow" iconPosition="right" onClick={() => navigate("/loads")}>View all loads</Button>
        </div>
        <div className="available-loads">
          {loading ? (
            <p>Loading available loads...</p>
          ) : recentLoads.length > 0 ? (
            recentLoads.map((load) => (
              <LoadCard key={load.id} load={load} onClick={() => navigate(`/loads/${load.id}`)} />
            ))
          ) : (
            <p>No available loads at the moment.</p>
          )}
        </div>
      </section>

      <div className="dashboard-lower">
        <section className="dashboard-section">
          <div className="ui-section-header">
            <h2>My Trips</h2>
            <Button variant="link" icon="arrow" iconPosition="right" onClick={() => navigate("/trips")}>View all trips</Button>
          </div>
          {activeTrip ? (
            <div className="dashboard-trip-card" onClick={() => navigate(`/trips/${activeTrip.internal_id}`)} style={{ cursor: 'pointer' }} role="button" tabIndex={0} onKeyDown={(e) => { if(e.key === 'Enter') navigate(`/trips/${activeTrip.internal_id}`) }}>
              <span className="dashboard-trip-top"><span className="shortcut-icon"><Icon name="truck" /></span><StatusBadge status={activeTrip.status} dot /></span>
              <span className="dashboard-trip-route"><strong>{activeTrip.pickup || "Pickup"}</strong><Icon name="arrow" /><strong>{activeTrip.delivery || "Delivery"}</strong></span>
              <span className="dashboard-trip-meta"><span><small>Load details</small><strong>{activeTrip.load}</strong></span><span><small>Distance</small><strong>{activeTrip.distance}</strong></span></span>
              <span className="dashboard-trip-footer">View trip details <Icon name="arrow" size={18} /></span>
            </div>
          ) : (
            <div className="dashboard-trip-card" style={{ cursor: "default", justifyContent: "center", alignItems: "center" }}>
              <p style={{ color: "var(--text-muted)" }}>No active trips</p>
            </div>
          )}
        </section>
        <section className="dashboard-section">
          <div className="ui-section-header"><h2>Operational Summary</h2><span className="ui-badge neutral">Overview</span></div>
          <div className="dashboard-summary-list">
            {summary.map(([value, label]) => <div className="dashboard-summary-row" key={label}><strong>{value}</strong><span>{label}</span></div>)}
          </div>
        </section>
      </div>
      <div className="dashboard-quick-links" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '24px' }}>
        <Button variant="outline" icon="wallet" onClick={() => navigate("/wallet")}>Wallet</Button>
        <Button variant="outline" icon="user" onClick={() => navigate("/profile")}>Profile</Button>
      </div>
=======

  const transporterProfile = JSON.parse(
    localStorage.getItem("transporter_profile") || "{}"
  );

  const availableLoads = [
    {
      type: "NEW LOAD",
      distance: "12 km away",
      pickup: "Riyadh",
      delivery: "Dammam",
      tons: "25 Tons",
      category: "Construction Materials",
      start: "Starts at 10:00 AM",
    },
    {
      type: "SCHEDULED",
      distance: "15 km away",
      pickup: "Jeddah",
      delivery: "Medina",
      tons: "18 Tons",
      category: "Food Items",
      start: "Starts at 11:30 AM",
    },
  ];

  return (
    <div className="bixoo-dashboard">

      {/* TOP HEADER */}
      <header className="dashboard-top">

        <div className="bixoo-logo">
          bix<span>oo</span>
        </div>

        <button
          className="top-shortcut"
          onClick={() => navigate("/trips")}
        >
          <div className="shortcut-icon">↕</div>
          <div>
            <strong>My Trips</strong>
            <small>Active & history</small>
          </div>
        </button>

        <button
          className="top-shortcut loads-shortcut"
          onClick={() => navigate("/loads")}
        >
          <div className="shortcut-icon">▣</div>
          <div>
            <strong>Loads</strong>
            <small>Available freight</small>
          </div>
          <span className="load-count">12</span>
        </button>

      </header>


      {/* SEARCH */}
      <div className="dashboard-search-row">

        <div className="dashboard-search">
          <span className="search-icon">⌕</span>

          <input
            type="text"
            placeholder="Search for loads, locations..."
          />
        </div>

        <button className="round-action">
          ♧
        </button>

        <button className="round-action">
          ▱
        </button>

      </div>


      {/* AVAILABLE LOADS */}
      <section className="dashboard-section">

        <div className="section-header">
          <h2>Available Loads</h2>

          <button onClick={() => navigate("/loads")}>
            View All
          </button>
        </div>


        <div className="available-loads">

          {availableLoads.map((load, index) => (
            <button
              className="load-card"
              key={index}
              onClick={() => navigate("/loads")}
            >

              <div className="load-card-top">

                <span
                  className={`load-badge ${
                    load.type === "SCHEDULED"
                      ? "scheduled"
                      : "new"
                  }`}
                >
                  {load.type}
                </span>

                <span className="load-distance">
                  {load.distance}
                </span>

              </div>


              <div className="route-container">

                <div className="route-row">

                  <span className="route-marker pickup-marker">
                    ○
                  </span>

                  <strong>{load.pickup}</strong>

                </div>


                <div className="route-row">

                  <span className="route-marker delivery-marker">
                    ♧
                  </span>

                  <strong>{load.delivery}</strong>

                </div>

              </div>


              <div className="load-card-divider"></div>


              <div className="load-card-bottom">

                <span>
                  {load.tons} • {load.category}
                </span>

                <span>
                  {load.start}
                </span>

              </div>

            </button>
          ))}

        </div>

      </section>


      {/* MY TRIPS */}
      <section className="dashboard-section trips-section">

        <div className="section-header">
          <h2>My Trips</h2>

          <button onClick={() => navigate("/trips")}>
            View All
          </button>
        </div>


        <button
          className="my-trip-card"
          onClick={() => navigate("/trips")}
        >

          <div className="trip-image-area">

            <div className="trip-image-placeholder">
              <div className="truck-illustration">
                🚚
              </div>
            </div>


            <div className="trip-overlay">

              <strong>Dammam → Riyadh</strong>

              <span className="transit-badge">
                In Transit
              </span>

            </div>

          </div>


          <div className="trip-card-footer">

            <div>
              <strong>20 Tons</strong>

              <span>
                ◉ Total: 340 km
              </span>
            </div>

            <span className="navigation-button">
              ◢
            </span>

          </div>

        </button>

      </section>


      {/* OPERATIONAL SUMMARY */}
      <section className="dashboard-section summary-section">

        <div className="section-header">
          <h2>Operational Summary</h2>
        </div>


        <div className="summary-grid">

          <div className="summary-card">
            <strong>12</strong>
            <span>Available Loads</span>
          </div>

          <div className="summary-card">
            <strong>45</strong>
            <span>Today's Available</span>
          </div>

          <div className="summary-card">
            <strong>8</strong>
            <span>Today's Completed</span>
          </div>

          <div className="summary-card">
            <strong>1</strong>
            <span>Pending Settlements</span>
          </div>

        </div>

      </section>


      {/* BOTTOM ACTIONS */}
      <div className="dashboard-bottom">

        <div className="bottom-pill">

          <button
            onClick={() => navigate("/wallet")}
          >
            <span>▣</span>
            <strong>Wallet</strong>
          </button>


          <div className="bottom-divider"></div>


          <button
            onClick={() => navigate("/profile")}
          >
            <span>♙</span>
            <strong>Profile</strong>
          </button>

        </div>


        <button className="online-button">

          <span className="power-icon">
            ◉
          </span>

          <strong>ONLINE</strong>

          <span className="online-dot"></span>

        </button>

      </div>

>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
    </div>
  );
}

<<<<<<< HEAD
export default Dashboard;
=======
export default Dashboard;
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
