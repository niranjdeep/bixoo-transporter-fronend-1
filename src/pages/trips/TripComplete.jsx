import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./TripComplete.css";

function TripComplete() {
  const { tripId } = useParams();
  const navigate = useNavigate();

  const [trip, setTrip] = useState(null);

  useEffect(() => {
    const savedTrip = localStorage.getItem("active_trip");

    if (savedTrip) {
      try {
        setTrip(JSON.parse(savedTrip));
      } catch (error) {
        setTrip(null);
      }
    }
  }, []);

  const handleWallet = () => {
    localStorage.removeItem("active_trip");
    navigate("/wallet");
  };

  if (!trip) {
    return (
      <div className="trip-complete-page">
        <div className="trip-complete-empty">
          <h2>Trip not found</h2>

          <button onClick={() => navigate("/trips")}>
            Back to My Trips
          </button>
        </div>
      </div>
    );
  }

  const currentTripId = trip.tripId || tripId || "TRIP-LD001";

  const pickup =
    trip.pickupLocation ||
    trip.pickup ||
    "Mumbai, MH";

  const delivery =
    trip.deliveryLocation ||
    trip.delivery ||
    "Pune, MH";

  const load =
    trip.loadType ||
    trip.load ||
    "Wheat";

  const earnings =
    trip.earnings ||
    "18,500";

  return (
    <div className="trip-complete-page">

      <div className="trip-complete-card">

        {/* Success */}

        <div className="trip-complete-icon">
          ✓
        </div>

        <p className="trip-complete-label">
          TRIP COMPLETED
        </p>

        <h1>
          Trip Completed Successfully
        </h1>

        <p className="trip-complete-subtitle">
          Your delivery has been completed successfully.
        </p>

        {/* Trip Summary */}

        <div className="complete-summary">

          <div className="complete-summary-row">
            <span>Trip ID</span>
            <strong>
              {currentTripId}
            </strong>
          </div>

          <div className="complete-summary-row">
            <span>Route</span>
            <strong>
              {pickup} → {delivery}
            </strong>
          </div>

          <div className="complete-summary-row">
            <span>Load</span>
            <strong>
              {load}
            </strong>
          </div>

          <div className="complete-summary-row">
            <span>Vehicle</span>
            <strong>
              {trip.vehicle || "20ft Truck"}
            </strong>
          </div>

        </div>

        {/* Earnings */}

        <div className="complete-earning">

          <small>
            Trip Earnings
          </small>

          <strong>
            ₹{String(earnings).replace("₹", "")}
          </strong>

        </div>

        {/* Settlement */}

        <div className="settlement-card">

          <strong>
            Settlement Status
          </strong>

          <p>
            Your trip earnings have been added
            to the settlement process.
          </p>

          <p className="settlement-status">
            Pending Settlement
          </p>

        </div>

        {/* Actions */}

        <div className="complete-actions">

          <button
            className="complete-trips-btn"
            onClick={() => navigate("/trips")}
          >
            My Trips
          </button>

          <button
            className="complete-wallet-btn"
            onClick={handleWallet}
          >
            View Wallet →
          </button>

        </div>

      </div>

    </div>
  );
}

export default TripComplete;