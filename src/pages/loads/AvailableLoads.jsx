import { useNavigate } from "react-router-dom";
import "./AvailableLoads.css";

function AvailableLoads() {
  const navigate = useNavigate();

  const loads = [
    {
      id: "LD001",
      pickup: "Mumbai, MH",
      pickupPoint: "APMC Market",
      delivery: "Pune, MH",
      deliveryPoint: "Hadapsar Depot",
      distance: "160 KM",
      load: "50 Tons Wheat",
      vehicle: "20ft Truck",
      date: "Today, 14:00 Hrs",
      earnings: "₹18,500",
      match: "Direct Match",
    },
    {
      id: "LD002",
      pickup: "Chennai, TN",
      pickupPoint: "Koyambedu",
      delivery: "Bengaluru, KA",
      deliveryPoint: "Yeshwanthpur",
      distance: "350 KM",
      load: "15 Tons Rice",
      vehicle: "Open Truck",
      date: "Tomorrow, 08:00 Hrs",
      earnings: "₹24,000",
      match: "Suitable",
    },
    {
      id: "LD003",
      pickup: "Coimbatore, TN",
      pickupPoint: "Industrial Area",
      delivery: "Madurai, TN",
      deliveryPoint: "Warehouse",
      distance: "215 KM",
      load: "10 Tons Machinery",
      vehicle: "Container",
      date: "Tomorrow, 11:30 Hrs",
      earnings: "₹16,500",
      match: "Suitable",
    },
  ];

  return (
    <div className="loads-page">

      <div className="loads-header">
        <div>
          <span className="page-label">TRANSPORT MARKETPLACE</span>

          <h1>Available Loads</h1>

          <p>
            Find suitable loads and choose your next trip.
          </p>
        </div>

        <div className="online-badge">
          <span></span>
          Online
        </div>
      </div>


      {/* FILTERS */}

      <div className="loads-filters">

        <div className="search-box">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search pickup or delivery location"
          />
        </div>

        <select>
          <option>All Load Types</option>
          <option>Agriculture</option>
          <option>Machinery</option>
          <option>Raw Materials</option>
        </select>

        <select>
          <option>All Vehicles</option>
          <option>Mini Truck</option>
          <option>Truck</option>
          <option>Container</option>
          <option>Trailer</option>
        </select>

        <button className="filter-btn">
          Filters
        </button>

      </div>


      {/* SUMMARY */}

      <div className="loads-summary">

        <div>
          <strong>12</strong>
          <span>Available Loads</span>
        </div>

        <div>
          <strong>04</strong>
          <span>Direct Matches</span>
        </div>

        <div>
          <strong>08</strong>
          <span>Today's Loads</span>
        </div>

      </div>


      {/* LOAD LIST */}

      <div className="loads-section">

        <div className="section-heading">
          <div>
            <h2>Loads Near You</h2>
            <p>Based on your vehicle and availability.</p>
          </div>

          <span>12 Loads</span>
        </div>


        <div className="loads-list">

          {loads.map((load) => (

            <div
              className="load-card"
              key={load.id}
            >

              <div className="load-card-top">

                <div>
                  <span
                    className={
                      load.match === "Direct Match"
                        ? "match-badge direct"
                        : "match-badge"
                    }
                  >
                    {load.match}
                  </span>

                  <span className="load-id">
                    {load.id}
                  </span>
                </div>

                <div className="distance">
                  {load.distance}
                </div>

              </div>


              {/* ROUTE */}

              <div className="load-route">

                <div className="location">

                  <span className="location-dot pickup-dot"></span>

                  <div>
                    <small>Pickup</small>

                    <strong>{load.pickup}</strong>

                    <span>{load.pickupPoint}</span>
                  </div>

                </div>

                <div className="route-line"></div>

                <div className="location">

                  <span className="location-dot delivery-dot"></span>

                  <div>
                    <small>Delivery</small>

                    <strong>{load.delivery}</strong>

                    <span>{load.deliveryPoint}</span>
                  </div>

                </div>

              </div>


              {/* DETAILS */}

              <div className="load-info">

                <div>
                  <small>Load</small>
                  <strong>{load.load}</strong>
                </div>

                <div>
                  <small>Vehicle</small>
                  <strong>{load.vehicle}</strong>
                </div>

                <div>
                  <small>Pickup</small>
                  <strong>{load.date}</strong>
                </div>

                <div>
                  <small>Est. Earnings</small>
                  <strong className="load-earning">
                    {load.earnings}
                  </strong>
                </div>

              </div>


              {/* ACTION */}

              <div className="load-actions">

                <button
                  className="details-btn"
                  onClick={() =>
                    navigate(`/loads/${load.id}`)
                  }
                >
                  View Details
                </button>

                <button
                  className="accept-btn"
                  onClick={() =>
                    navigate(`/loads/${load.id}`)
                  }
                >
                  View & Accept →
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default AvailableLoads;