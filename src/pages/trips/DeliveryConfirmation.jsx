import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./DeliveryConfirmation.css";

function DeliveryConfirmation() {
  const navigate = useNavigate();
  const { tripId } = useParams();

  const [delivered, setDelivered] = useState(false);

  const handleConfirmDelivery = () => {
    setDelivered(true);
  };

  const handleBackToTrips = () => {
    navigate("/trips");
  };

  return (
    <div className="delivery-page">

      <div className="delivery-header">
        <button
          className="delivery-back-btn"
          onClick={() => navigate(`/trips/${tripId}`)}
        >
          ←
        </button>

        <div>
          <span className="delivery-label">
            TRIP COMPLETION
          </span>

          <h1>Confirm Delivery</h1>

          <p>Trip #{tripId || "TRIP-LD001"}</p>
        </div>
      </div>

      {!delivered ? (
        <>
          <div className="delivery-success-icon">
            ✓
          </div>

          <div className="delivery-card">

            <span className="delivery-section-label">
              DELIVERY CONFIRMATION
            </span>

            <h2>Has the shipment been delivered?</h2>

            <p className="delivery-description">
              Confirm that the goods have been successfully
              delivered to the buyer or consignee.
            </p>

            <div className="delivery-summary">

              <div className="delivery-row">
                <span>Pickup</span>
                <strong>Mumbai, MH</strong>
              </div>

              <div className="delivery-row">
                <span>Delivery</span>
                <strong>Pune, MH</strong>
              </div>

              <div className="delivery-row">
                <span>Load</span>
                <strong>Premium Wheat</strong>
              </div>

              <div className="delivery-row">
                <span>Weight</span>
                <strong>12.5 Tons</strong>
              </div>

              <div className="delivery-row">
                <span>Trip Earnings</span>
                <strong className="delivery-amount">
                  ₹18,500
                </strong>
              </div>

            </div>

            <div className="delivery-warning">
              <span>!</span>

              <p>
                Please verify the shipment before confirming
                delivery. This action marks the trip as completed.
              </p>
            </div>

            <button
              className="confirm-delivery-btn"
              onClick={handleConfirmDelivery}
            >
              ✓ Confirm Delivery
            </button>

            <button
              className="cancel-delivery-btn"
              onClick={() => navigate(`/trips/${tripId}`)}
            >
              Go Back
            </button>

          </div>
        </>
      ) : (
        <div className="delivery-completed-card">

          <div className="completed-icon">
            ✓
          </div>

          <span className="completed-label">
            DELIVERY COMPLETED
          </span>

          <h2>Trip Completed Successfully</h2>

          <p>
            The delivery has been confirmed and this trip is
            now marked as completed.
          </p>

          <div className="completed-earning">
            <small>Trip Earnings</small>
            <strong>₹18,500</strong>
          </div>

          <button
            className="back-trips-btn"
            onClick={handleBackToTrips}
          >
            Go to My Trips →
          </button>

          <button
            className="view-wallet-btn"
            onClick={() => navigate("/wallet")}
          >
            View Wallet
          </button>

        </div>
      )}

    </div>
  );
}

export default DeliveryConfirmation;