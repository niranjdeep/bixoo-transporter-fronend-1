import { useNavigate } from "react-router-dom";

import "./MyTrips.css";

function MyTrips() {
  const navigate = useNavigate();

  const activeTrip = JSON.parse(
    localStorage.getItem("active_trip") || "null"
  );

  const trips = [
    {
      id: activeTrip?.tripId || "TRIP-LD001",
      loadId: activeTrip?.loadId || "LD001",
      pickup: activeTrip?.pickup || "Mumbai, MH",
      pickupPoint: activeTrip?.pickupPoint || "APMC Market",
      delivery: activeTrip?.delivery || "Pune, MH",
      deliveryPoint:
        activeTrip?.deliveryPoint || "Hadapsar Depot",
      load: activeTrip?.weight || "50 Tons Wheat",
      vehicle: activeTrip?.vehicle || "20ft Truck",
      distance: activeTrip?.distance || "160 KM",
      earnings: activeTrip?.earnings || "₹18,500",
      status: activeTrip ? "In Transit" : "Trip Created",
      type: "active",
    },
    {
      id: "TRIP-1002",
      loadId: "LD008",
      pickup: "Chennai, TN",
      pickupPoint: "Guindy Industrial Area",
      delivery: "Bengaluru, KA",
      deliveryPoint: "Peenya Depot",
      load: "20 Tons Rice",
      vehicle: "Container",
      distance: "350 KM",
      earnings: "₹28,500",
      status: "Delivered",
      type: "completed",
    },
    {
      id: "TRIP-1001",
      loadId: "LD005",
      pickup: "Coimbatore, TN",
      pickupPoint: "Industrial Estate",
      delivery: "Madurai, TN",
      deliveryPoint: "Warehouse",
      load: "10 Tons Machinery",
      vehicle: "Truck",
      distance: "215 KM",
      earnings: "₹16,500",
      status: "Delivered",
      type: "completed",
    },
  ];

  const activeTrips = trips.filter(
    (trip) => trip.type === "active"
  );

  const completedTrips = trips.filter(
    (trip) => trip.type === "completed"
  );

  return (
    <div className="my-trips-page">

      {/* HEADER */}
      <div className="my-trips-header">

        <div>
          <span className="trips-page-label">
            TRANSPORT OPERATIONS
          </span>

          <h1>My Trips</h1>

          <p>
            Manage your active and completed transportation trips.
          </p>
        </div>

        <button
          className="find-loads-btn"
          onClick={() => navigate("/loads")}
        >
          + Find New Loads
        </button>

      </div>


      {/* SUMMARY */}
      <div className="trip-summary-grid">

        <div className="trip-stat-card">
          <span className="trip-stat-icon active-icon">
            ◉
          </span>

          <div>
            <small>Active Trips</small>
            <strong>{activeTrips.length}</strong>
          </div>
        </div>

        <div className="trip-stat-card">
          <span className="trip-stat-icon completed-icon">
            ✓
          </span>

          <div>
            <small>Completed Trips</small>
            <strong>{completedTrips.length}</strong>
          </div>
        </div>

        <div className="trip-stat-card">
          <span className="trip-stat-icon distance-icon">
            ↗
          </span>

          <div>
            <small>Total Distance</small>
            <strong>725 KM</strong>
          </div>
        </div>

        <div className="trip-stat-card">
          <span className="trip-stat-icon earning-icon">
            ₹
          </span>

          <div>
            <small>Total Earnings</small>
            <strong>₹63,500</strong>
          </div>
        </div>

      </div>


      {/* ACTIVE TRIPS */}
      <section className="trips-section">

        <div className="trips-section-heading">

          <div>
            <span>ACTIVE</span>
            <h2>Current Trips</h2>
          </div>

          <strong>
            {activeTrips.length} Active
          </strong>

        </div>


        {activeTrips.length > 0 ? (
          <div className="trips-list">

            {activeTrips.map((trip) => (

              <div
                className="trip-list-card active-trip"
                key={trip.id}
              >

                <div className="trip-list-top">

                  <div>
                    <span className="trip-status active">
                      ● {trip.status}
                    </span>

                    <span className="trip-number">
                      {trip.id}
                    </span>
                  </div>

                  <span className="trip-distance">
                    {trip.distance}
                  </span>

                </div>


                <div className="trip-route-row">

                  <div className="trip-route-location">

                    <span className="route-marker pickup-marker">
                      P
                    </span>

                    <div>
                      <small>Pickup</small>
                      <strong>{trip.pickup}</strong>
                      <span>{trip.pickupPoint}</span>
                    </div>

                  </div>


                  <div className="route-arrow">
                    →
                  </div>


                  <div className="trip-route-location">

                    <span className="route-marker delivery-marker">
                      D
                    </span>

                    <div>
                      <small>Delivery</small>
                      <strong>{trip.delivery}</strong>
                      <span>{trip.deliveryPoint}</span>
                    </div>

                  </div>

                </div>


                <div className="trip-card-details">

                  <div>
                    <small>Load</small>
                    <strong>{trip.load}</strong>
                  </div>

                  <div>
                    <small>Vehicle</small>
                    <strong>{trip.vehicle}</strong>
                  </div>

                  <div>
                    <small>Estimated Earnings</small>
                    <strong className="trip-earnings">
                      {trip.earnings}
                    </strong>
                  </div>

                </div>


                <div className="trip-card-footer">

                  <span>
                    Load ID: {trip.loadId}
                  </span>

                  <button
                    onClick={() =>
                      navigate(`/trips/${trip.id}`)
                    }
                  >
                    Manage Trip →
                  </button>

                </div>

              </div>

            ))}

          </div>
        ) : (
          <div className="empty-trips">
            <div>▣</div>

            <h3>No Active Trips</h3>

            <p>
              Find a suitable load and start your next trip.
            </p>

            <button
              onClick={() => navigate("/loads")}
            >
              Find Loads
            </button>
          </div>
        )}

      </section>


      {/* COMPLETED */}
      <section className="trips-section completed-section">

        <div className="trips-section-heading">

          <div>
            <span>HISTORY</span>
            <h2>Completed Trips</h2>
          </div>

          <strong>
            {completedTrips.length} Completed
          </strong>

        </div>


        <div className="completed-list">

          {completedTrips.map((trip) => (

            <div
              className="completed-trip-card"
              key={trip.id}
            >

              <div className="completed-main">

                <div className="completed-icon">
                  ✓
                </div>

                <div>

                  <div className="completed-title">

                    <strong>{trip.id}</strong>

                    <span>
                      Delivered
                    </span>

                  </div>

                  <p>
                    {trip.pickup} → {trip.delivery}
                  </p>

                  <small>
                    {trip.load} · {trip.distance}
                  </small>

                </div>

              </div>


              <div className="completed-earning">

                <small>Earnings</small>

                <strong>
                  {trip.earnings}
                </strong>

              </div>


              <button
                onClick={() =>
                  navigate(`/trips/${trip.id}`)
                }
              >
                View
              </button>

            </div>

          ))}

        </div>

      </section>

    </div>
  );
}

export default MyTrips;