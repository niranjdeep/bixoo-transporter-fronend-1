import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./LiveTrip.css";

function LiveTrip() {
  const navigate = useNavigate();
  const { tripId } = useParams();

  const [locationShared, setLocationShared] = useState(false);
  const [message, setMessage] = useState("");

  const trip = JSON.parse(
    localStorage.getItem("active_trip") || "{}"
  );

  const tripData = {
    tripId: trip.tripId || tripId || "TRIP-LD001",
    pickup: trip.pickup || "Mumbai, MH",
    pickupPoint: trip.pickupPoint || "APMC Market",
    delivery: trip.delivery || "Pune, MH",
    deliveryPoint:
      trip.deliveryPoint || "Hadapsar Depot",
    distance: trip.distance || "160 KM",
    load: trip.weight || "50 Tons Wheat",
    vehicle: trip.vehicle || "20ft Truck",
    earnings: trip.earnings || "₹18,500",
  };

  const handleShareLocation = () => {
    setLocationShared(!locationShared);
  };

  const handleSendMessage = () => {
    if (!message.trim()) {
      return;
    }

    alert(`Message sent: ${message}`);

    setMessage("");
  };

  const handleDelivery = () => {
  navigate(`/trips/${tripData.tripId}/delivery`);
};

  return (
    <div className="live-trip-page">

      {/* HEADER */}
      <div className="live-trip-header">

        <div>
          <button
            className="live-back-btn"
            onClick={() => navigate("/trips")}
          >
            ← Back to Trips
          </button>

          <span className="live-page-label">
            LIVE TRIP
          </span>

          <h1>In Transit</h1>

          <p>
            Track your journey and coordinate with the consignee.
          </p>
        </div>

        <div className="live-status">
          <span></span>
          Live Trip
        </div>

      </div>


      {/* TRIP BAR */}
      <div className="live-trip-bar">

        <div>
          <span>TRIP ID</span>
          <strong>{tripData.tripId}</strong>
        </div>

        <div>
          <span>ROUTE</span>
          <strong>
            {tripData.pickup} → {tripData.delivery}
          </strong>
        </div>

        <div>
          <span>LOAD</span>
          <strong>{tripData.load}</strong>
        </div>

        <div>
          <span>EARNINGS</span>
          <strong className="live-earning">
            {tripData.earnings}
          </strong>
        </div>

      </div>


      <div className="live-trip-layout">

        {/* LEFT */}
        <div className="live-main">

          {/* MAP */}
          <section className="map-card">

            <div className="map-header">

              <div>
                <span>LIVE LOCATION</span>
                <h2>Trip Tracking</h2>
              </div>

              <div className="gps-status">
                <span></span>
                GPS Active
              </div>

            </div>


            <div className="fake-map">

              <div className="map-grid"></div>

              <div className="map-route-line"></div>

              <div className="map-pickup">
                <span>P</span>
                <small>Pickup</small>
              </div>

              <div className="map-truck">
                🚚
              </div>

              <div className="map-delivery">
                <span>D</span>
                <small>Delivery</small>
              </div>

              <div className="map-location-label">
                Current Location
                <strong>
                  Near Pune Highway
                </strong>
              </div>

            </div>


            <div className="map-controls">

              <div>
                <small>Current Location</small>
                <strong>
                  Near Pune Highway
                </strong>
              </div>

              <div>
                <small>ETA</small>
                <strong>1 hr 45 min</strong>
              </div>

              <div>
                <small>Remaining</small>
                <strong>68 KM</strong>
              </div>

            </div>

          </section>


          {/* LOCATION SHARING */}
          <section className="live-card">

            <div className="live-card-content">

              <div className="live-icon">
                ⌖
              </div>

              <div>
                <h3>Share Live Location</h3>

                <p>
                  Allow the buyer and consignee to track your
                  current location and estimated arrival time.
                </p>
                <button
  className="chat-consignee-btn"
  onClick={() => navigate(`/trips/${tripData.tripId}/chat`)}
>
  Open Direct Chat →
</button>
              </div>

            </div>

            <button
              className={
                locationShared
                  ? "location-btn shared"
                  : "location-btn"
              }
              onClick={handleShareLocation}
            >
              {locationShared
                ? "✓ Location Shared"
                : "Share Location"}
            </button>

          </section>


          {/* DELIVERY DETAILS */}
          <section className="delivery-card">

            <div className="delivery-heading">

              <div>
                <span>DELIVERY</span>

                <h2>
                  {tripData.delivery}
                </h2>

                <p>
                  {tripData.deliveryPoint}
                </p>
              </div>

              <div className="delivery-eta">
                <small>Estimated Arrival</small>
                <strong>Today, 19:30 Hrs</strong>
              </div>

            </div>


            <div className="delivery-info-grid">

              <div>
                <span>Vehicle</span>
                <strong>{tripData.vehicle}</strong>
              </div>

              <div>
                <span>Load</span>
                <strong>{tripData.load}</strong>
              </div>

              <div>
                <span>Remaining</span>
                <strong>68 KM</strong>
              </div>

            </div>


            <div className="delivery-actions">

              <button
                className="secondary-action"
                onClick={() =>
                  alert("Gate photo upload will be connected later.")
                }
              >
                📷 Gate Photo
              </button>

              <button
                className="secondary-action"
                onClick={() =>
                  alert("E-Way Bill upload will be connected later.")
                }
              >
                📄 E-Way Bill
              </button>

              <button
                className="complete-delivery-btn"
                onClick={handleDelivery}
              >
                Delivery →
              </button>

            </div>

          </section>

        </div>


        {/* RIGHT SIDEBAR */}
        <aside className="live-sidebar">

          {/* PROGRESS */}
          <div className="progress-card">

            <div className="progress-card-header">

              <div>
                <span>TRIP PROGRESS</span>
                <h3>Journey</h3>
              </div>

              <strong>68%</strong>

            </div>

            <div className="progress-track">
              <div className="progress-value"></div>
            </div>

            <div className="progress-route">
              <span>{tripData.pickup}</span>
              <span>{tripData.delivery}</span>
            </div>

          </div>


          {/* COORDINATION */}
          <div className="coordination-card">

            <div className="coordination-header">

              <div>
                <span>COORDINATION</span>
                <h3>Consignee</h3>
              </div>

              <span className="online-dot">
                Online
              </span>

            </div>


            <div className="consignee">

              <div className="consignee-avatar">
                C
              </div>

              <div>
                <strong>Consignee Team</strong>
                <small>
                  Hadapsar Depot
                </small>
              </div>

            </div>


            <div className="quick-messages">

              <button
                onClick={() =>
                  setMessage("I am 30 minutes away.")
                }
              >
                30 min away
              </button>

              <button
                onClick={() =>
                  setMessage("Please keep the unloading bay ready.")
                }
              >
                Prepare unloading bay
              </button>

              <button
                onClick={() =>
                  setMessage("Please share gate entry instructions.")
                }
              >
                Gate instructions
              </button>

            </div>


            <div className="message-box">

              <textarea
                placeholder="Type a message..."
                value={message}
                onChange={(event) =>
                  setMessage(event.target.value)
                }
              />

              <button onClick={handleSendMessage}>
                Send →
              </button>

            </div>

          </div>


          {/* TRIP INFO */}
          <div className="trip-info-card">

            <h3>Trip Information</h3>

            <div>
              <span>Distance</span>
              <strong>{tripData.distance}</strong>
            </div>

            <div>
              <span>Vehicle</span>
              <strong>{tripData.vehicle}</strong>
            </div>

            <div>
              <span>Load</span>
              <strong>{tripData.load}</strong>
            </div>

          </div>

        </aside>

      </div>

    </div>
  );
}

export default LiveTrip;