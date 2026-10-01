<<<<<<< HEAD
import Icon from "../../components/Icon";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import EmptyState from "../../components/ui/EmptyState";
import Button from "../../components/ui/Button";
=======
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
import "./TripComplete.css";

function TripComplete() {
  const { tripId } = useParams();
  const navigate = useNavigate();

  const [trip, setTrip] = useState(null);
<<<<<<< HEAD
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const res = await api.get(`/transporter/trips/${tripId}`);
        if (res.data) setTrip(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (tripId) fetchTrip();
  }, [tripId]);

  const handleWallet = () => {
    navigate("/wallet");
  };

  const handleHome = () => {
    navigate("/dashboard");
  };

  if (loading) return <div className="trip-complete-page"><p style={{ padding: "20px" }}>Loading...</p></div>;
  if (!trip) return (
    <div className="trip-complete-page">
      <EmptyState title="Unable to load completed trip." description="This trip does not exist." />
      <div style={{textAlign: "center", padding: "20px"}}>
        <Button variant="outline" onClick={() => navigate("/trips")}>Back to My Trips</Button>
      </div>
    </div>
  );

  // Format completed date safely and fix UTC timezone bug
  const formattedDate = trip.completed_at 
    ? new Date(trip.completed_at.endsWith('Z') || trip.completed_at.includes('+') ? trip.completed_at : trip.completed_at + 'Z').toLocaleString("en-US", {
        day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
      })
    : "Pending";

  return (
    <div className="trip-complete-page">
      <div className="trip-complete-container">
        
        <div className="success-circle">
          <Icon name="check" size={36} />
        </div>

        <h1 className="trip-complete-title">Trip Completed!</h1>
        <p className="trip-complete-subtitle">
          Your load was delivered successfully.<br />
          The trip is now marked as completed.
        </p>

        <div className="completion-card">
          <div className="completion-route">
            <div className="route-side">
              <small>Pickup</small>
              <strong>{trip.request?.pickup_city || "Unknown"}</strong>
            </div>
            <div className="route-arrow">
              <Icon name="arrow" size={24} />
            </div>
            <div className="route-side right">
              <small>Delivery</small>
              <strong>{trip.request?.delivery_city || "Unknown"}</strong>
            </div>
          </div>

          <div className="completion-grid">
            <div className="completion-item">
              <small>Trip ID</small>
              <strong>{trip.trip_code || `#TR-${trip.id}`}</strong>
            </div>
            <div className="completion-item">
              <small>Status</small>
              <span className={`status-badge-completed ${trip.status === "COMPLETED" ? "" : "pending-status"}`} style={trip.status !== "COMPLETED" ? { background: '#fff3cd', color: '#856404', borderColor: '#ffeeba' } : {}}>
                <Icon name={trip.status === "COMPLETED" ? "check" : "clock"} size={14} /> {trip.status.replace(/_/g, ' ')}
              </span>
            </div>
            <div className="completion-item">
              <small>Completed At</small>
              <strong>{formattedDate}</strong>
            </div>
            <div className="completion-item">
              <small>Vehicle</small>
              <strong>{trip.request?.truck_type || "Your Assigned Vehicle"}</strong>
            </div>
          </div>
        </div>

        {trip.status !== "COMPLETED" && (
          <div style={{ marginBottom: "24px" }}>
            <Button 
              variant="primary" 
              style={{ width: "100%", justifyContent: "center" }}
              onClick={async () => {
                try {
                  await api.patch(`/transporter/trips/${tripId}/status`, { status: "COMPLETED" });
                  window.location.reload();
                } catch (e) {
                  alert("Failed to complete trip. Please try again.");
                }
              }}
            >
              Verify & Complete Trip Now
            </Button>
          </div>
        )}

        <div className="earnings-card">
          <small>Earnings Added</small>
          {trip.request?.offered_amount ? (
            <>
              <h2>₹{Number(trip.request.offered_amount).toLocaleString()}</h2>
              <p>Added to your transporter wallet</p>
            </>
          ) : (
            <>
              <h2>Settlement amount pending</h2>
              <p>Wallet will be updated shortly</p>
            </>
          )}
        </div>

        <div className="trip-complete-actions">
          <button className="btn-wallet" onClick={handleWallet}>
            <Icon name="wallet" size={20} /> View Wallet
          </button>
          <button className="btn-dashboard" onClick={handleHome}>
            Back to Dashboard
          </button>
        </div>

      </div>
=======

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

>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
    </div>
  );
}

<<<<<<< HEAD
export default TripComplete;

=======
export default TripComplete;
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
