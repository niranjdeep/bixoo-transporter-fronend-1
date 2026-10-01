<<<<<<< HEAD
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Icon from "../../components/Icon";
import api from "../../services/api";
import EmptyState from "../../components/ui/EmptyState";
import Button from "../../components/ui/Button";
=======
import { useNavigate, useParams } from "react-router-dom";
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
import "./TripDetails.css";

function TripDetails() {
  const navigate = useNavigate();
  const { tripId } = useParams();

<<<<<<< HEAD
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrip = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/transporter/trips/${tripId}`);
        if (res.data) {
          setTrip(res.data);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    if (tripId) {
      fetchTrip();
    }
  }, [tripId]);
=======
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
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e

  const handleBack = () => {
    navigate("/trips");
  };

<<<<<<< HEAD
  const handleChat = () => {
    if (trip?.id) {
      navigate(`/trips/${trip.id}/chat`);
    }
  };

  const handleStartTrip = () => {
    if (trip?.id) {
      navigate(`/trips/${trip.id}/live`);
    }
  };

  const handleDelivery = () => {
    if (trip?.id) {
      navigate(`/trips/${trip.id}/delivery`);
    }
  };

  if (loading) {
    return <div className="trip-details-page"><p style={{ padding: "20px" }}>Loading trip details...</p></div>;
  }

  if (error || !trip) {
    return (
      <div className="trip-details-page">
        <header className="trip-header">
          <Button variant="ghost" size="lg" icon="arrowLeft" onClick={handleBack} style={{ padding: "8px", width: "42px", height: "42px", borderRadius: "10px" }} />
        </header>
        <EmptyState title="Trip not found" description="The trip you are looking for does not exist or you don't have access to it." />
      </div>
    );
  }

  const { request } = trip;
  const isCompleted = trip.status === "COMPLETED" || trip.status === "DELIVERED";

  return (
    <div className="trip-details-page">
      <header className="trip-header">
        <Button variant="ghost" size="lg" icon="arrowLeft" onClick={handleBack} style={{ padding: "8px", width: "42px", height: "42px", borderRadius: "10px" }} />
        <div className="trip-header-title">
          <span>TRIP CODE</span>
          <h1>#{trip.trip_code}</h1>
        </div>
        <div className="trip-header-status">
          {trip.status}
        </div>
      </header>

      <section className="trip-route-card">
        <div className="trip-route-main">
          <div className="trip-route-location">
            <span className="trip-route-dot pickup-dot"></span>
            <div>
              <small>Pickup</small>
              <strong>{request?.pickup_city || "Unknown"}</strong>
              <p>{request?.pickup_location}</p>
            </div>
          </div>

          <div className="trip-route-arrow">
            <span></span>
            <strong><Icon name="arrow" size={20} /></strong>
            <span></span>
          </div>

          <div className="trip-route-location delivery-location">
            <span className="trip-route-dot delivery-dot"></span>
            <div>
              <small>Delivery</small>
              <strong>{request?.delivery_city || "Unknown"}</strong>
              <p>{request?.delivery_location}</p>
            </div>
          </div>
        </div>

        <div className="trip-route-bottom">
          <div>
            <span>Distance</span>
            <strong>{request?.estimated_distance} KM</strong>
          </div>
          <div>
            <span>Status</span>
            <strong>{trip.status}</strong>
          </div>
        </div>
      </section>

      {!isCompleted && (
        <section className="trip-map-card">
          <div className="trip-map-header">
            <div>
              <span>LIVE ROUTE</span>
              <h2>Trip Tracking</h2>
            </div>
            <span className="gps-live"><i></i>Live</span>
          </div>
          <div className="trip-map" style={{ height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5', borderRadius: '8px', border: '1px solid #eaeaea', position: 'relative' }}>
            <p style={{ color: 'var(--text-muted)' }}>Map visualization active when navigating</p>
          </div>
        </section>
      )}

      <section className="trip-section">
=======
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

>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
        <div className="section-heading">
          <div>
            <span>JOURNEY</span>
            <h2>Trip Timeline</h2>
          </div>
<<<<<<< HEAD
        </div>
        <div className="trip-timeline">
          <div className={`timeline-item ${trip.accepted_at ? 'completed' : 'active'}`}>
            <div className="timeline-marker"><Icon name={trip.accepted_at ? "check" : "truck"} size={20} /></div>
            <div className="timeline-content">
              <strong>Accepted</strong>
              <span>{trip.accepted_at ? new Date(trip.accepted_at).toLocaleString() : "Waiting for pickup"}</span>
            </div>
          </div>
          <div className={`timeline-line ${trip.started_at ? 'active-line' : ''}`}></div>
          <div className={`timeline-item ${trip.started_at ? (trip.completed_at ? 'completed' : 'active') : ''}`}>
            <div className="timeline-marker">{trip.started_at ? <Icon name={trip.completed_at ? "check" : "truck"} size={20} /> : "2"}</div>
            <div className="timeline-content">
              <strong>In Transit</strong>
              <span>{trip.started_at ? `Started ${new Date(trip.started_at).toLocaleString()}` : "Not started yet"}</span>
            </div>
          </div>
          <div className={`timeline-line ${trip.completed_at ? 'active-line' : ''}`}></div>
          <div className={`timeline-item ${trip.completed_at ? 'completed' : ''}`}>
            <div className="timeline-marker">{trip.completed_at ? <Icon name="check" size={20} /> : "3"}</div>
            <div className="timeline-content">
              <strong>Delivered</strong>
              <span>{trip.completed_at ? new Date(trip.completed_at).toLocaleString() : "Pending"}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="load-details-card">
        <div className="load-card-heading">
          <div>
            <span>LOAD INFORMATION</span>
            <h2>{request?.goods_name || "Goods"}</h2>
          </div>
        </div>
        <div className="load-info-grid">
          <div className="load-info-box">
            <span>Quantity</span>
            <strong>{request?.quantity || "-"}</strong>
          </div>
          <div className="load-info-box">
            <span>Weight</span>
            <strong>{request ? `${request.weight} ${request.weight_unit}` : "-"}</strong>
          </div>
          <div className="load-info-box">
            <span>Vehicle</span>
            <strong>Your Vehicle</strong>
          </div>
          <div className="load-info-box">
            <span>Earnings</span>
            <strong className="earning-value">
              {request?.estimated_price ? `₹${Number(request.estimated_price).toLocaleString()}` : "-"}
            </strong>
          </div>
        </div>
      </section>

      {!isCompleted && (
        <section className="trip-actions" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginTop: "24px" }}>
          <Button variant="secondary" size="lg" icon="chat" iconPosition="left" onClick={handleChat}>
            Message
          </Button>
          <Button variant="primary" size="lg" onClick={trip.status === "IN_TRANSIT" ? handleDelivery : handleStartTrip}>
            {trip.status === "IN_TRANSIT" ? "Confirm Delivery" : "Start Navigation"}
          </Button>
        </section>
      )}

      <div className="trip-bottom-summary">
        <div>
          <span>Trip Code</span>
          <strong>#{trip.trip_code}</strong>
        </div>
        <div>
          <span>Estimated Earnings</span>
          <strong>{request?.estimated_price ? `₹${Number(request.estimated_price).toLocaleString()}` : "-"}</strong>
        </div>
      </div>
=======

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

>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
    </div>
  );
}

<<<<<<< HEAD
export default TripDetails;
=======
export default TripDetails;
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
