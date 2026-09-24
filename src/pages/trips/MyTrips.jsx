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
    if (trip.type === "active") {
      navigate(`/trips/${trip.id}`);
    } else {
      navigate(`/trips/${trip.id}`);
    }
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
            Manage your accepted and completed trips.
          </p>
        </div>

        <div className="trips-online">
          <span></span>
          Online
        </div>
      </div>


      {/* TABS */}
      <div className="trips-tabs">

        <button
          className={
            activeTab === "active"
              ? "trip-tab active"
              : "trip-tab"
          }
          onClick={() => setActiveTab("active")}
        >
          In Progress
        </button>

        <button
          className={
            activeTab === "completed"
              ? "trip-tab active"
              : "trip-tab"
          }
          onClick={() => setActiveTab("completed")}
        >
          Completed
        </button>

      </div>


      {/* TRIPS */}
      <div className="my-trips-list">

        {filteredTrips.length === 0 ? (
          <div className="empty-trips">
            <div>◎</div>
            <strong>No trips found</strong>
            <p>
              Your {activeTab === "active" ? "active" : "completed"}{" "}
              trips will appear here.
            </p>
          </div>
        ) : (
          filteredTrips.map((trip) => (

            <div
              className="my-trip-card"
              key={trip.id}
            >

              {/* CARD TOP */}
              <div className="my-trip-top">

                <div>
                  <span className="trip-card-id">
                    #{trip.id}
                  </span>

                  <span
                    className={
                      trip.type === "active"
                        ? "trip-status active-status"
                        : "trip-status completed-status"
                    }
                  >
                    {trip.status}
                  </span>
                </div>

                <div className="trip-payout">
                  <small>Payout</small>
                  <strong>{trip.payout}</strong>
                </div>

              </div>


              {/* ROUTE */}
              <div className="my-trip-route">

                <div className="my-route-place">

                  <span className="my-route-dot pickup"></span>

                  <div>
                    <small>Pickup</small>
                    <strong>{trip.pickup}</strong>
                    <span>{trip.pickupPoint}</span>
                  </div>

                </div>


                <div className="my-route-line"></div>


                <div className="my-route-place">

                  <span className="my-route-dot delivery"></span>

                  <div>
                    <small>Delivery</small>
                    <strong>{trip.delivery}</strong>
                    <span>{trip.deliveryPoint}</span>
                  </div>

                </div>

              </div>


              {/* INFO */}
              <div className="my-trip-info">

                <div>
                  <small>Vehicle</small>
                  <strong>{trip.vehicle}</strong>
                </div>

                <div>
                  <small>Load</small>
                  <strong>
                    {trip.weight} {trip.load}
                  </strong>
                </div>

                <div>
                  <small>Distance</small>
                  <strong>{trip.distance}</strong>
                </div>

              </div>


              {/* ACTIONS */}
              <div className="my-trip-actions">

                <button
                  className="trip-details-btn"
                  onClick={() => openTrip(trip)}
                >
                  Trip Details
                  <span>→</span>
                </button>

                {trip.type === "active" ? (
                  <button
                    className="trip-navigate-btn"
                    onClick={() =>
                      navigate(`/trips/${trip.id}/live`)
                    }
                  >
                    Navigate
                    <span>↗</span>
                  </button>
                ) : (
                  <button
                    className="trip-view-btn"
                    onClick={() => openTrip(trip)}
                  >
                    View Trip
                    <span>→</span>
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