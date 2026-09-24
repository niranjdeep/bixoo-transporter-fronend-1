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
      status: "In Transit",
    };

    localStorage.setItem(
      "active_trip",
      JSON.stringify(activeTrip)
    );

    navigate("/trips");
  };

  return (
    <div className="new-order-page">

      <div className="new-order-card">

        {/* Purple Top Border */}
        <div className="new-order-top-line"></div>

        {/* Bell */}
        <div className="new-order-bell">
          <span>♟</span>
        </div>

        {/* Heading */}
        <h1>NEW ORDER AVAILABLE</h1>

        <p className="new-order-subtitle">
          Tap accept to secure this load
          <br />
          immediately.
        </p>

        {/* Order Information */}
        <div className="order-details-card">

          {/* Match + Earnings */}
          <div className="order-detail-header">

            <span className="direct-match">
              <span className="match-dot"></span>
              DIRECT MATCH • 160 KM
            </span>

            <div className="estimated-earning">
              <small>Est. Earnings</small>
              <strong>₹18,500</strong>
            </div>

          </div>

          <div className="details-divider"></div>

          {/* Pickup */}
          <div className="order-location">

            <span className="order-dot pickup"></span>

            <div>
              <small>Pickup</small>

              <strong>
                Mumbai, MH
                <em> (APMC Market)</em>
              </strong>
            </div>

          </div>

          {/* Vertical Line */}
          <div className="order-location-line"></div>

          {/* Delivery */}
          <div className="order-location">

            <span className="order-dot delivery"></span>

            <div>
              <small>Delivery</small>

              <strong>
                Pune, MH
                <em> (Hadapsar Depot)</em>
              </strong>
            </div>

          </div>

          <div className="details-divider"></div>

          {/* Load / Vehicle */}
          <div className="order-info-grid">

            <div>
              <span className="info-icon">◈</span>

              <div>
                <small>Load</small>
                <strong>50 Tons Wheat</strong>
              </div>
            </div>

            <div>
              <span className="info-icon">▣</span>

              <div>
                <small>Vehicle</small>
                <strong>20ft Truck (Open)</strong>
              </div>
            </div>

          </div>

          {/* Date / Time */}
          <div className="order-info-grid">

            <div>
              <span className="info-icon">▣</span>

              <div>
                <small>Pickup Date</small>
                <strong>Today, 24 Oct</strong>
              </div>
            </div>

            <div>
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

        {/* Swipe Label */}
        <div className="respond-label">
          <span>‹‹</span>
          SWIPE TO RESPOND
          <span>››</span>
        </div>

        <div className="respond-subtitle">
          Reject &lt;&gt; Accept
        </div>

        {/* Bottom Action */}
        <div className="order-actions">

          {/* Decline */}
          <button
            className="decline-button"
            onClick={handleDecline}
          >
            <span>☎</span>
            <small>DECLINE</small>
          </button>

          {/* Swipe Track */}
          <div className="swipe-track">
            <span></span>
          </div>

          {/* Accept */}
          <button
            className="accept-button"
            onClick={handleAccept}
          >
            <span>☎</span>
            <small>ACCEPT</small>
          </button>

        </div>

      </div>

    </div>
  );
}

export default NewOrderAvailable;