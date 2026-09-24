import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

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

    </div>
  );
}

export default Dashboard;