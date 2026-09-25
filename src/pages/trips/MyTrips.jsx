import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyTrips.css";

function MyTrips() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("active");

  const savedTrip = JSON.parse(
    localStorage.getItem("active_trip") || "null"
  );

  const trips = [
    {
      id: savedTrip?.tripId || "TR-LD001",
      loadId: savedTrip?.loadId || "LD001",
      pickup: savedTrip?.pickup || "Mumbai",
      pickupPoint: savedTrip?.pickupPoint || "APMC Market",
      delivery: savedTrip?.delivery || "Pune",
      deliveryPoint: savedTrip?.deliveryPoint || "Hadapsar Depot",
      weight: savedTrip?.weight || "50 Tons",
      load: savedTrip?.loadType || "Wheat",
      vehicle: savedTrip?.vehicle || "20ft Truck",
      distance: savedTrip?.distance || "160 KM",
      payout: savedTrip?.earnings || "₹18,500",
      status: savedTrip ? "In Transit" : "Accepted",
      type: "active",
    },
    {
      id: "TR-1002",
      loadId: "LD008",
      pickup: "Chennai",
      pickupPoint: "Guindy Industrial Area",
      delivery: "Bengaluru",
      deliveryPoint: "Peenya Depot",
      weight: "20 Tons",
      load: "Rice",
      vehicle: "Container",
      distance: "350 KM",
      payout: "₹28,500",
      status: "Delivered",
      type: "completed",
    },
    {
      id: "TR-1001",
      loadId: "LD005",
      pickup: "Coimbatore",
      pickupPoint: "Industrial Estate",
      delivery: "Madurai",
      deliveryPoint: "Warehouse",
      weight: "10 Tons",
      load: "Machinery",
      vehicle: "Truck",
      distance: "215 KM",
      payout: "₹16,500",
      status: "Delivered",
      type: "completed",
    },
  ];

  const filteredTrips = trips.filter(
    (trip) => trip.type === activeTab
  );

  const openTrip = (trip) => {
    navigate(`/trips/${trip.id}`);
  };

  const navigateLive = (trip) => {
    navigate(`/trips/${trip.id}/live`);
  };

  return (
    <div className="my-trips-page">

      {/* HEADER */}
      <div className="my-trips-header">

        <div>
          <span className="my-trips-label">
            TRANSPORTER
          </span>

          <h1>My Accepted Loads</h1>

          <p>
            Track your active and completed transporter trips.
          </p>
        </div>

        <div className="my-trips-count">
          {trips.length}
        </div>

      </div>


      {/* TABS */}
      <div className="my-trips-tabs">

        <button
          type="button"
          className={
            activeTab === "active"
              ? "trip-tab active"
              : "trip-tab"
          }
          onClick={() => setActiveTab("active")}
        >
          In Progress

          <span>
            {trips.filter((trip) => trip.type === "active").length}
          </span>
        </button>


        <button
          type="button"
          className={
            activeTab === "completed"
              ? "trip-tab active"
              : "trip-tab"
          }
          onClick={() => setActiveTab("completed")}
        >
          Completed

          <span>
            {
              trips.filter(
                (trip) => trip.type === "completed"
              ).length
            }
          </span>
        </button>

      </div>


      {/* TRIPS */}
      <div className="my-trips-list">

        {filteredTrips.length === 0 ? (
          <div className="empty-trips">

            <div className="empty-trips-icon">
              🚚
            </div>

            <h2>No Trips Found</h2>

            <p>
              Your completed or active trips will appear here.
            </p>

          </div>
        ) : (
          filteredTrips.map((trip) => (

            <div
              className="my-trip-card"
              key={trip.id}
            >

              {/* CARD HEADER */}
              <div className="my-trip-card-header">

                <div>
                  <span className="trip-order-label">
                    ORDER ID
                  </span>

                  <strong>
                    #{trip.id}
                  </strong>
                </div>

                <div className="trip-payout">
                  <small>Payout</small>

                  <strong>
                    {trip.payout}
                  </strong>
                </div>

              </div>


              {/* STATUS */}
              <div className="my-trip-status-row">

                <span
                  className={
                    trip.type === "completed"
                      ? "trip-status completed"
                      : "trip-status progress"
                  }
                >
                  <i></i>
                  {trip.status}
                </span>

                <span className="trip-load-id">
                  {trip.loadId}
                </span>

              </div>


              {/* ROUTE */}
              <div className="my-trip-route">

                <div className="trip-route-point">

                  <span className="route-dot pickup"></span>

                  <div>
                    <small>Pickup</small>

                    <strong>
                      {trip.pickup}
                    </strong>

                    <p>
                      {trip.pickupPoint}
                    </p>
                  </div>

                </div>


                <div className="trip-route-connector">
                  <span></span>
                </div>


                <div className="trip-route-point">

                  <span className="route-dot delivery"></span>

                  <div>
                    <small>Delivery</small>

                    <strong>
                      {trip.delivery}
                    </strong>

                    <p>
                      {trip.deliveryPoint}
                    </p>
                  </div>

                </div>

              </div>


              {/* TRIP INFO */}
              <div className="my-trip-info">

                <div>
                  <span>Load</span>
                  <strong>{trip.load}</strong>
                </div>

                <div>
                  <span>Weight</span>
                  <strong>{trip.weight}</strong>
                </div>

                <div>
                  <span>Vehicle</span>
                  <strong>{trip.vehicle}</strong>
                </div>

                <div>
                  <span>Distance</span>
                  <strong>{trip.distance}</strong>
                </div>

              </div>


              {/* ACTIONS */}
              <div className="my-trip-actions">

                <button
                  type="button"
                  className="trip-details-btn"
                  onClick={() => openTrip(trip)}
                >
                  Trip Details
                  <span>→</span>
                </button>


                {trip.type === "active" ? (
                  <button
                    type="button"
                    className="trip-navigate-btn"
                    onClick={() => navigateLive(trip)}
                  >
                    <span>⌖</span>
                    Navigate
                  </button>
                ) : (
                  <button
                    type="button"
                    className="trip-view-btn"
                    onClick={() => openTrip(trip)}
                  >
                    View Trip
                  </button>
                )}

              </div>

            </div>

          ))
        )}

      </div>

    </div>
  );
}

export default MyTrips;