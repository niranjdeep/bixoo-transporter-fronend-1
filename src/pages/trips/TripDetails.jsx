import { useNavigate, useParams } from "react-router-dom";
import "./TripDetails.css";

function TripDetails() {
  const navigate = useNavigate();
  const { tripId } = useParams();

  const savedTrip = JSON.parse(
    localStorage.getItem("active_trip") || "null"
  );

  const trip = {
    tripId: tripId || savedTrip?.tripId || "TR-8924",

    pickup: savedTrip?.pickup || "Mumbai, MH",
    pickupPoint: savedTrip?.pickupPoint || "APMC Market",

    delivery: savedTrip?.delivery || "Pune, MH",
    deliveryPoint: savedTrip?.deliveryPoint || "Hadapsar Depot",

    status: savedTrip?.status || "In Transit",

    distance: savedTrip?.distance || "160 KM",
    eta: "2h 45m",

    loadType: "Premium Wheat",
    bags: "250 Bags",
    weight: "12.5 Tons",

    vehicle: savedTrip?.vehicle || "20ft Truck (Open)",
    earnings: savedTrip?.earnings || "₹18,500",

    seller: "Rajesh Traders",
    buyer: "Metro Mills",
  };

  const handleBack = () => {
    navigate("/trips");
  };

  const handleStartTrip = () => {
    const updatedTrip = {
      ...savedTrip,
      tripId: trip.tripId,
      pickup: trip.pickup,
      pickupPoint: trip.pickupPoint,
      delivery: trip.delivery,
      deliveryPoint: trip.deliveryPoint,
      distance: trip.distance,
      earnings: trip.earnings,
      status: "In Transit",
    };

    localStorage.setItem(
      "active_trip",
      JSON.stringify(updatedTrip)
    );

    navigate(`/trips/${trip.tripId}/live`);
  };

  const handleChat = () => {
    navigate(`/trips/${trip.tripId}/chat`);
  };

  const handleDelivery = () => {
    navigate(`/trips/${trip.tripId}/delivery`);
  };

  return (
    <div className="trip-details-page">

      {/* ================= HEADER ================= */}

      <header className="trip-details-header">

        <button
          type="button"
          className="trip-back-button"
          onClick={handleBack}
        >
          ←
        </button>

        <div className="trip-header-title">
          <span>TRIP DETAILS</span>
          <h1>Trip #{trip.tripId.replace("TRIP-", "")}</h1>
        </div>

        <div className="trip-header-status">
          {trip.status}
        </div>

      </header>


      {/* ================= ROUTE HEADER ================= */}

      <section className="trip-route-card">

        <div className="trip-route-main">

          <div className="trip-route-location">
            <span className="trip-route-dot pickup-dot"></span>

            <div>
              <small>Pickup</small>
              <strong>{trip.pickup}</strong>
              <p>{trip.pickupPoint}</p>
            </div>
          </div>


          <div className="trip-route-arrow">
            <span></span>
            <strong>→</strong>
            <span></span>
          </div>


          <div className="trip-route-location delivery-location">

            <span className="trip-route-dot delivery-dot"></span>

            <div>
              <small>Delivery</small>
              <strong>{trip.delivery}</strong>
              <p>{trip.deliveryPoint}</p>
            </div>

          </div>

        </div>

        <div className="trip-route-bottom">

          <div>
            <span>Distance</span>
            <strong>{trip.distance}</strong>
          </div>

          <div>
            <span>ETA</span>
            <strong>{trip.eta}</strong>
          </div>

        </div>

      </section>


      {/* ================= MAP ================= */}

      <section className="trip-map-card">

        <div className="trip-map-header">
          <div>
            <span>LIVE ROUTE</span>
            <h2>Trip Tracking</h2>
          </div>

          <span className="gps-live">
            <i></i>
            Live
          </span>
        </div>


        <div className="trip-map">

          <div className="map-grid-lines"></div>

          <div className="map-road road-one"></div>
          <div className="map-road road-two"></div>
          <div className="map-road road-three"></div>

          <div className="map-route-path"></div>

          <div className="map-point map-pickup">
            <span></span>
            <small>Mumbai</small>
          </div>

          <div className="map-truck-marker">
            🚚
          </div>

          <div className="map-point map-delivery">
            <span></span>
            <small>Pune</small>
          </div>

          <div className="map-distance-badge">
            {trip.distance}
          </div>

        </div>

      </section>


      {/* ================= TIMELINE ================= */}

      <section className="trip-section">

        <div className="section-heading">
          <div>
            <span>JOURNEY</span>
            <h2>Trip Timeline</h2>
          </div>

          <span className="timeline-progress">
            2 / 3
          </span>
        </div>


        <div className="trip-timeline">

          <div className="timeline-item completed">

            <div className="timeline-marker">
              ✓
            </div>

            <div className="timeline-content">
              <strong>Pickup Confirmed</strong>
              <span>APMC Market, Mumbai</span>
            </div>

          </div>


          <div className="timeline-line active-line"></div>


          <div className="timeline-item active">

            <div className="timeline-marker">
              🚚
            </div>

            <div className="timeline-content">
              <strong>In Transit</strong>
              <span>Currently travelling to Pune</span>
            </div>

          </div>


          <div className="timeline-line"></div>


          <div className="timeline-item">

            <div className="timeline-marker">
              3
            </div>

            <div className="timeline-content">
              <strong>Delivery</strong>
              <span>Hadapsar Depot, Pune</span>
            </div>

          </div>

        </div>

      </section>


      {/* ================= LOAD DETAILS ================= */}

      <section className="load-details-card">

        <div className="load-card-heading">

          <div>
            <span>LOAD INFORMATION</span>
            <h2>{trip.loadType}</h2>
          </div>

          <span className="load-status">
            Grade A
          </span>

        </div>


        <div className="load-info-grid">

          <div className="load-info-box">
            <span>Load</span>
            <strong>{trip.bags}</strong>
          </div>

          <div className="load-info-box">
            <span>Weight</span>
            <strong>{trip.weight}</strong>
          </div>

          <div className="load-info-box">
            <span>Vehicle</span>
            <strong>{trip.vehicle}</strong>
          </div>

          <div className="load-info-box">
            <span>Earnings</span>
            <strong className="earning-value">
              {trip.earnings}
            </strong>
          </div>

        </div>


        <div className="load-note">
          <span>ⓘ</span>

          <p>
            Please verify the load quantity and condition
            before leaving the pickup location.
          </p>
        </div>

      </section>


      {/* ================= CONTACTS ================= */}

      <section className="trip-section contacts-section">

        <div className="section-heading">
          <div>
            <span>CONTACTS</span>
            <h2>Trip Contacts</h2>
          </div>
        </div>


        <div className="contact-list">

          <div className="contact-card">

            <div className="contact-avatar">
              RT
            </div>

            <div className="contact-info">
              <span>Seller</span>
              <strong>{trip.seller}</strong>
              <small>Pickup Contact</small>
            </div>

            <button
              type="button"
              className="contact-call"
            >
              ☎
            </button>

          </div>


          <div className="contact-card">

            <div className="contact-avatar buyer-avatar">
              MM
            </div>

            <div className="contact-info">
              <span>Buyer</span>
              <strong>{trip.buyer}</strong>
              <small>Delivery Contact</small>
            </div>

            <button
              type="button"
              className="contact-call"
            >
              ☎
            </button>

          </div>

        </div>

      </section>


      {/* ================= ACTIONS ================= */}

      <section className="trip-actions">

        <button
          type="button"
          className="trip-chat-button"
          onClick={handleChat}
        >
          <span>💬</span>
          Message
        </button>


        <button
          type="button"
          className="trip-primary-button"
          onClick={
            trip.status === "In Transit"
              ? handleDelivery
              : handleStartTrip
          }
        >
          {trip.status === "In Transit"
            ? "Confirm Delivery"
            : "Start Trip"}
        </button>

      </section>


      {/* ================= BOTTOM SUMMARY ================= */}

      <div className="trip-bottom-summary">

        <div>
          <span>Trip ID</span>
          <strong>#{trip.tripId}</strong>
        </div>

        <div>
          <span>Estimated Earnings</span>
          <strong>{trip.earnings}</strong>
        </div>

      </div>

    </div>
  );
}

export default TripDetails;