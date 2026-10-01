<<<<<<< HEAD
import { useState, useEffect } from "react";
import Icon from "../../components/Icon";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import EmptyState from "../../components/ui/EmptyState";
import Button from "../../components/ui/Button";
=======
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
import "./LiveTrip.css";

function LiveTrip() {
  const navigate = useNavigate();
  const { tripId } = useParams();

  const [locationShared, setLocationShared] = useState(false);
<<<<<<< HEAD
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const res = await api.get(`/transporter/trips/${tripId}`);
        if (res.data) {
          setTrip(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (tripId) fetchTrip();
  }, [tripId]);
=======
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
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e

  const handleShareLocation = () => {
    setLocationShared(!locationShared);
  };

<<<<<<< HEAD
  const advanceStatusTo = async (targetStatus) => {
    if (!trip) return;
    const flow = ["ACCEPTED", "GOING_TO_PICKUP", "PICKED_UP", "IN_TRANSIT", "AT_DELIVERY", "DELIVERED", "COMPLETED"];
    try {
      let current = trip.status;
      const targetIdx = flow.indexOf(targetStatus);
      if (targetIdx === -1) return;
      
      while (flow.indexOf(current) < targetIdx && flow.indexOf(current) !== -1) {
        const nextStatus = flow[flow.indexOf(current) + 1];
        const res = await api.patch(`/transporter/trips/${tripId}/status`, { status: nextStatus });
        current = nextStatus;
        setTrip(res.data);
      }
    } catch (err) {
      console.error(`Failed to advance trip status to ${targetStatus}:`, err);
    }
  };

  const handleDelivery = async () => {
    if (trip) {
      // Safely advance the trip to IN_TRANSIT before navigating to the delivery page
      await advanceStatusTo("IN_TRANSIT");
      navigate(`/trips/${trip.id}/delivery`);
    }
  };

  if (loading) return <div className="trip-page"><p style={{ padding: "20px" }}>Loading live trip...</p></div>;
  if (!trip) return <div className="trip-page"><EmptyState title="Trip not found" description="This trip might not exist." /><div style={{textAlign: "center", padding: "20px"}}><Button variant="secondary" onClick={() => navigate(-1)}>Go Back</Button></div></div>;

  return (
    <div className="trip-page">
      <div className="trip-container">
        
        <button className="trip-back-btn" onClick={() => navigate(-1)}>
          <Icon name="arrowLeft" size={18} /> Back
        </button>
        
        <div className="trip-header">
          <span className="trip-eyebrow">TRIP IN PROGRESS</span>
          <h1>Navigating to Delivery</h1>
          <p>Trip #{trip.trip_code || `TR-${trip.id}`}</p>
        </div>

        <div className="trip-card">
          <div className="route-timeline">
            <div className="route-point">
              <div className="route-dot pickup"></div>
              <div className="route-content">
                <small>Pickup</small>
                <strong>{trip.request?.pickup_city || "Unknown City"}</strong>
                <p>{trip.request?.pickup_location}</p>
              </div>
            </div>
            
            <div className="route-point">
              <div className="route-dot delivery"></div>
              <div className="route-content">
                <small>Delivery</small>
                <strong>{trip.request?.delivery_city || "Unknown City"}</strong>
                <p>{trip.request?.delivery_location}</p>
              </div>
            </div>
          </div>
          
          <div className="trip-distance-row">
            <span>Distance</span>
            <strong>{trip.request?.estimated_distance || "0"} km</strong>
          </div>
        </div>

        <div className="trip-card">
          <div className="trip-info-grid">
            <div className="info-item">
              <small>Load</small>
              <strong>{trip.request?.goods_name || "Not specified"}</strong>
            </div>
            <div className="info-item">
              <small>Weight</small>
              <strong>{trip.request?.weight ? `${trip.request.weight} ${trip.request.weight_unit}` : "Not specified"}</strong>
            </div>
            <div className="info-item">
              <small>Vehicle</small>
              <strong>{trip.request?.truck_type || "Any Suitable"}</strong>
            </div>
            <div className="info-item">
              <small>Status</small>
              <strong>In Transit</strong>
            </div>
          </div>
        </div>

        <div className="trip-action-area">
          <button 
            className="btn-secondary" 
            onClick={handleShareLocation}
          >
            <Icon name="pin" size={18} /> {locationShared ? "Location Shared" : "Share Location"}
          </button>
          <button 
            className="btn-primary" 
            onClick={handleDelivery}
          >
            Confirm Delivery <Icon name="arrow" size={18} />
          </button>
        </div>
        
      </div>
=======
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

>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
    </div>
  );
}

<<<<<<< HEAD
export default LiveTrip;
=======
export default LiveTrip;
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
