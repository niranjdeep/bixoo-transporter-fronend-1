import { useNavigate } from "react-router-dom";
import "./AvailableLoads.css";

function AvailableLoads() {
  const navigate = useNavigate();

  const loads = [
    {
      id: "LD001",
      status: "NEW LOAD",
      distance: "12 km away",
      pickup: "Riyadh",
      delivery: "Dammam",
      weight: "25 Tons",
      type: "Construction Materials",
      start: "10:00 AM",
    },
    {
      id: "LD002",
      status: "SCHEDULED",
      distance: "15 km away",
      pickup: "Jeddah",
      delivery: "Medina",
      weight: "18 Tons",
      type: "Food Items",
      start: "11:30 AM",
    },
  ];

  return (
    <div className="available-loads-page">

      {/* HEADER */}
      <div className="available-loads-header">
        <div>
          <span className="available-label">
            TRANSPORTER
          </span>

          <h1>Available Loads</h1>

          <p>
            Find loads that match your vehicle and availability.
          </p>
        </div>

        <div className="available-online">
          <span></span>
          Online
        </div>
      </div>

      {/* SEARCH */}
      <div className="available-search">
        <span className="search-icon">⌕</span>

        <input
          type="text"
          placeholder="Search for loads, locations..."
        />

        <button type="button" className="search-filter">
          ☰
        </button>
      </div>

      {/* SECTION HEADER */}
      <div className="available-section-title">
        <h2>Available Loads</h2>

        <button
          type="button"
          onClick={() => navigate("/loads")}
        >
          View All
        </button>
      </div>

      {/* LOAD CARDS */}
      <div className="available-load-list">

        {loads.map((load) => (
          <div
            className="available-load-card"
            key={load.id}
            onClick={() => navigate(`/loads/${load.id}`)}
          >

            {/* CARD HEADER */}
            <div className="available-card-header">

              <span
                className={`load-status ${
                  load.status === "NEW LOAD"
                    ? "new-load"
                    : "scheduled-load"
                }`}
              >
                {load.status}
              </span>

              <span className="load-distance">
                {load.distance}
              </span>

            </div>

            {/* ROUTE */}
            <div className="available-route">

              <div className="route-place">
                <span className="route-marker pickup-marker">
                  ◉
                </span>

                <strong>{load.pickup}</strong>
              </div>

              <div className="route-place">
                <span className="route-marker delivery-marker">
                  ♧
                </span>

                <strong>{load.delivery}</strong>
              </div>

            </div>

            {/* DIVIDER */}
            <div className="load-divider"></div>

            {/* DETAILS */}
            <div className="load-bottom">

              <div className="load-description">
                {load.weight} • {load.type}
              </div>

              <div className="load-start">
                Starts at {load.start}
              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default AvailableLoads;