import { useNavigate } from "react-router-dom";
import "./NewOrderAvailable.css";

function NewOrderAvailable() {
  const navigate = useNavigate();

  const handleDecline = () => {
    navigate("/loads");
  };

  const handleAccept = () => {
    const activeTrip = {
      tripId: "TR-LD001",
      loadId: "LD001",

      pickup: "Mumbai, MH",
      pickupPoint: "APMC Market",

      delivery: "Pune, MH",
      deliveryPoint: "Hadapsar Depot",

      weight: "50 Tons Wheat",
      loadType: "Wheat",

      vehicle: "20ft Truck (Open)",

      distance: "160 KM",
      earnings: "₹18,500",

      pickupDate: "Today, 24 Oct",
      pickupTime: "14:00 Hrs",

      status: "Accepted",
    };

    localStorage.setItem("active_trip", JSON.stringify(activeTrip));

    navigate("/trips");
  };

  return (
    <div className="new-order-page">
      <div className="new-order-card">

        {/* Purple Top Border */}
        <div className="new-order-top-line"></div>

        {/* Notification Icon */}
        <div className="new-order-bell">
          <span>🔔</span>
        </div>

        {/* Heading */}
        <div className="new-order-heading">
          <h1>NEW ORDER AVAILABLE</h1>

          <p>
            Tap accept to secure this load
            <br />
            immediately.
          </p>
        </div>

        {/* Order Details */}
        <div className="order-details-card">

          {/* Match + Earnings */}
          <div className="order-detail-header">
            <div className="direct-match">
              <span className="match-dot"></span>
              <span>DIRECT MATCH</span>
              <span className="match-separator">•</span>
              <span>160 KM</span>
            </div>

            <div className="estimated-earning">
              <small>Est. Earnings</small>
              <strong>₹18,500</strong>
            </div>
          </div>

          <div className="details-divider"></div>

          {/* Pickup */}
          <div className="order-location">
            <span className="order-dot pickup"></span>

            <div className="location-content">
              <small>Pickup</small>

              <strong>
                Mumbai, MH
                <em> (APMC Market)</em>
              </strong>
            </div>
          </div>

          {/* Route Line */}
          <div className="order-location-line"></div>

          {/* Delivery */}
          <div className="order-location">
            <span className="order-dot delivery"></span>

            <div className="location-content">
              <small>Delivery</small>

              <strong>
                Pune, MH
                <em> (Hadapsar Depot)</em>
              </strong>
            </div>
          </div>

          <div className="details-divider"></div>

          {/* Load + Vehicle */}
          <div className="order-info-grid">

            <div className="order-info-item">
              <span className="info-icon">◈</span>

              <div>
                <small>Load</small>
                <strong>50 Tons Wheat</strong>
              </div>
            </div>

            <div className="order-info-item">
              <span className="info-icon">▣</span>

              <div>
                <small>Vehicle</small>
                <strong>20ft Truck (Open)</strong>
              </div>
            </div>

          </div>

          {/* Date + Time */}
          <div className="order-info-grid">

            <div className="order-info-item">
              <span className="info-icon">▣</span>

              <div>
                <small>Pickup Date</small>
                <strong>Today, 24 Oct</strong>
              </div>
            </div>

            <div className="order-info-item">
              <span className="info-icon">◷</span>

              <div>
                <small>Time</small>
                <strong className="purple-text">
                  14:00 Hrs
                </strong>
              </div>
            </div>

          </div>
        </div>

        {/* Swipe Instruction */}
        <div className="respond-label">
          <span className="respond-arrow left">‹‹</span>

          <span>SWIPE TO RESPOND</span>

          <span className="respond-arrow right">››</span>
        </div>

        <div className="respond-subtitle">
          Reject <span>•</span> Accept
        </div>

        {/* Bottom Actions */}
        <div className="order-actions">

          {/* Decline */}
          <button
            type="button"
            className="decline-button"
            onClick={handleDecline}
          >
            <span className="action-icon">×</span>

            <small>DECLINE</small>
          </button>

          {/* Swipe Track */}
          <div className="swipe-track">
            <div className="swipe-track-line"></div>

            <span className="swipe-dot"></span>

            <span className="swipe-arrow">→</span>
          </div>

          {/* Accept */}
          <button
            type="button"
            className="accept-button"
            onClick={handleAccept}
          >
            <span className="action-icon">✓</span>

            <small>ACCEPT</small>
          </button>

        </div>

      </div>
    </div>
  );
}

export default NewOrderAvailable;