import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const transporterName =
    JSON.parse(localStorage.getItem("transporter_profile") || "{}")
      .name || "Transporter";

  const [activeTrip] = useState(() => {
    return JSON.parse(localStorage.getItem("active_trip") || "null");
  });

  const stats = [
    {
      title: "Available Loads",
      value: "12",
      icon: "▣",
      action: () => navigate("/loads"),
    },
    {
      title: "Today's Available",
      value: "08",
      icon: "◷",
      action: () => navigate("/loads"),
    },
    {
      title: "Today's Completed",
      value: "05",
      icon: "✓",
      action: () => navigate("/trips"),
    },
    {
      title: "Pending Settlements",
      value: "₹24,500",
      icon: "₹",
      action: () => navigate("/wallet"),
    },
  ];

  return (
    <div className="dashboard-page">

      {/* HEADER */}

      <div className="dashboard-header">

        <div>
          <p className="dashboard-label">
            TRANSPORTER DASHBOARD
          </p>

          <h1>
            Good Evening, {transporterName} 👋
          </h1>

          <p className="dashboard-subtitle">
            Find loads, manage your trips and grow your business.
          </p>
        </div>

        <div className="online-status">
          <span className="status-dot"></span>
          <span>Online</span>
        </div>

      </div>


      {/* STATS */}

      <div className="stats-grid">

        {stats.map((stat) => (
          <button
            key={stat.title}
            className="stat-card"
            onClick={stat.action}
          >
            <div className="stat-icon">
              {stat.icon}
            </div>

            <div className="stat-info">
              <span>{stat.title}</span>
              <strong>{stat.value}</strong>
            </div>

            <span className="stat-arrow">
              →
            </span>
          </button>
        ))}

      </div>


      {/* MAIN CONTENT */}

      <div className="dashboard-grid">

        {/* DIRECT MATCH */}

        <section className="dashboard-card direct-match">

          <div className="card-heading">

            <div>
              <span className="match-label">
                DIRECT MATCH
              </span>

              <h2>New Load Available</h2>
            </div>

            <span className="match-distance">
              160 KM
            </span>

          </div>

          <div className="load-route">

            <div className="route-point">
              <span className="route-dot pickup"></span>

              <div>
                <small>Pickup</small>
                <strong>Mumbai, MH</strong>
                <span>APMC Market</span>
              </div>
            </div>

            <div className="route-line"></div>

            <div className="route-point">
              <span className="route-dot delivery"></span>

              <div>
                <small>Delivery</small>
                <strong>Pune, MH</strong>
                <span>Hadapsar Depot</span>
              </div>
            </div>

          </div>

          <div className="load-details">

            <div>
              <small>Load</small>
              <strong>50 Tons Wheat</strong>
            </div>

            <div>
              <small>Vehicle</small>
              <strong>20ft Truck</strong>
            </div>

            <div>
              <small>Est. Earnings</small>
              <strong className="earning">
                ₹18,500
              </strong>
            </div>

          </div>

          <button
            className="view-load-btn"
            onClick={() => navigate("/loads")}
          >
            View Load →
          </button>

        </section>


        {/* ACTIVE TRIP */}

        <section className="dashboard-card">

          <div className="card-heading">

            <div>
              <span className="section-label">
                ACTIVE TRIP
              </span>

              <h2>
                {activeTrip ? "Current Trip" : "No Active Trip"}
              </h2>
            </div>

            {activeTrip && (
              <span className="trip-status">
                {activeTrip.status || "Trip Created"}
              </span>
            )}

          </div>

          {activeTrip ? (
            <>
              <div className="active-route">

                <strong>
                  {activeTrip.pickup || "Mumbai"}
                </strong>

                <span>→</span>

                <strong>
                  {activeTrip.delivery || "Pune"}
                </strong>

              </div>


              <div className="trip-progress">

                <div className="progress-header">
                  <span>Trip Progress</span>
                  <strong>68%</strong>
                </div>

                <div className="progress-track">
                  <div className="progress-fill"></div>
                </div>

              </div>


              <div className="trip-info">

                <div>
                  <small>Load</small>
                  <strong>
                    {activeTrip.load || "50 Tons Wheat"}
                  </strong>
                </div>

                <div>
                  <small>Distance</small>
                  <strong>
                    {activeTrip.distance || "160 KM"}
                  </strong>
                </div>

                <div>
                  <small>Vehicle</small>
                  <strong>
                    {activeTrip.vehicle || "20ft Truck"}
                  </strong>
                </div>

              </div>


              <button
                className="outline-btn"
                onClick={() =>
                  navigate(`/trips/${activeTrip.tripId}`)
                }
              >
                View Trip →
              </button>

            </>
          ) : (

            <div className="no-active-trip">

              <p>
                You don't have an active trip right now.
              </p>

              <button
                className="outline-btn"
                onClick={() => navigate("/loads")}
              >
                Find Available Loads →
              </button>

            </div>

          )}

        </section>

      </div>


      {/* QUICK ACTIONS */}

      <section className="quick-section">

        <div className="section-title">
          <h2>Quick Actions</h2>
          <p>
            Manage your transportation activities
          </p>
        </div>

        <div className="quick-grid">

          <button onClick={() => navigate("/loads")}>
            <span>▣</span>

            <div>
              <strong>Find Loads</strong>
              <small>Browse available loads</small>
            </div>

            <b>→</b>
          </button>


          <button onClick={() => navigate("/trips")}>
            <span>⌖</span>

            <div>
              <strong>My Trips</strong>
              <small>Manage your trips</small>
            </div>

            <b>→</b>
          </button>


          <button onClick={() => navigate("/wallet")}>
            <span>₹</span>

            <div>
              <strong>Wallet</strong>
              <small>View earnings</small>
            </div>

            <b>→</b>
          </button>


          <button onClick={() => navigate("/profile")}>
            <span>♙</span>

            <div>
              <strong>Profile</strong>
              <small>Manage your profile</small>
            </div>

            <b>→</b>
          </button>

        </div>

      </section>

    </div>
  );
}

export default Dashboard;