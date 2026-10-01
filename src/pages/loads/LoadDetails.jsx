<<<<<<< HEAD
import Icon from "../../components/Icon";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import EmptyState from "../../components/ui/EmptyState";
import Button from "../../components/ui/Button";
=======
import { useNavigate, useParams } from "react-router-dom";
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
import "./LoadDetails.css";

function LoadDetails() {
  const navigate = useNavigate();
  const { loadId } = useParams();

<<<<<<< HEAD
  const [load, setLoad] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAccepting, setIsAccepting] = useState(false);

  useEffect(() => {
    const fetchLoad = async () => {
      try {
        const res = await api.get(`/transporter/loads/${loadId}`);
        if (res.data) setLoad(res.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    if (loadId) fetchLoad();
  }, [loadId]);

  const handleAccept = async () => {
    try {
      setIsAccepting(true);
      await api.post(`/transporter/loads/${loadId}/accept`);
      navigate("/trips");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.detail || "Failed to accept load");
    } finally {
      setIsAccepting(false);
    }
  };

  const handleDecline = () => {
    navigate(-1);
  };

  if (loading) return <div className="load-details-page"><p style={{ padding: "20px" }}>Loading details...</p></div>;
  if (error || !load) return <div className="load-details-page"><EmptyState title="Load not found" description="This load might have expired or you don't have access to it." /><div style={{textAlign: "center", padding: "20px"}}><Button variant="secondary" onClick={() => navigate(-1)}>Go Back to Available Loads</Button></div></div>;

  const req = load.request;

  return (
    <div className="load-details-page">
      <div className="load-details-container">
        
        <div className="load-details-header">
          <div className="load-details-icon">
            <Icon name="bell" size={24} />
          </div>
          <h1>New Load Available</h1>
          <p>Please review the details and respond</p>
        </div>

        <div className="load-card">
          <div className="load-summary-row">
            <div className="direct-match-badge">
              <span className="dot"></span>
              Direct Match &middot; {load.distance_from_pickup} km away
            </div>
            
            <div className="payout-info">
              <strong>{req?.offered_amount ? `₹${Number(req.offered_amount).toLocaleString()}` : "Payout unavailable"}</strong>
              <small>Est. Payout</small>
            </div>
          </div>

          <div className="route-section">
            <div className="route-line"></div>
            
            <div className="route-point">
              <div className="route-dot pickup"></div>
              <div className="route-content">
                <small>Pickup</small>
                <strong>{req?.pickup_city}</strong>
                <p>{req?.pickup_location}</p>
              </div>
            </div>
            
            <div className="route-point">
              <div className="route-dot delivery"></div>
              <div className="route-content">
                <small>Delivery</small>
                <strong>{req?.delivery_city}</strong>
                <p>{req?.delivery_location}</p>
              </div>
            </div>
          </div>

          <div className="load-divider"></div>

          <div className="load-info-grid">
            <div className="info-item">
              <span className="info-icon"><Icon name="truck" size={20} /></span>
              <div className="info-content">
                <small>Goods</small>
                <strong>{req?.goods_name}</strong>
              </div>
            </div>
            
            <div className="info-item">
              <span className="info-icon"><Icon name="document" size={20} /></span>
              <div className="info-content">
                <small>Weight</small>
                <strong>{req?.weight} {req?.weight_unit}</strong>
              </div>
            </div>
            
            <div className="info-item">
              <span className="info-icon"><Icon name="truck" size={20} /></span>
              <div className="info-content">
                <small>Vehicle Type</small>
                <strong>{req?.truck_type || "Any Suitable"}</strong>
              </div>
            </div>
            
            <div className="info-item">
              <span className="info-icon"><Icon name="clock" size={20} /></span>
              <div className="info-content">
                <small>Start Time</small>
                <strong>{req?.start_time || "Flexible"}</strong>
              </div>
            </div>
          </div>

          <div className="load-divider"></div>

          <div className="load-actions">
            <button 
              className="btn-decline" 
              onClick={handleDecline} 
              disabled={isAccepting}
            >
              <Icon name="close" size={18} /> Decline
            </button>
            <button 
              className="btn-accept" 
              onClick={handleAccept} 
              disabled={isAccepting}
            >
              <Icon name="check" size={18} /> {isAccepting ? "Accepting..." : "Accept Load"}
            </button>
          </div>
          
        </div>
      </div>
=======
  const load = {
    id: loadId || "LD001",
    distance: "160 KM",
    earnings: "₹18,500",

    pickup: "Mumbai, MH",
    pickupPoint: "APMC Market",

    delivery: "Pune, MH",
    deliveryPoint: "Hadapsar Depot",

    load: "50 Tons Wheat",
    vehicle: "20ft Truck (Open)",

    pickupDate: "Today, 24 Oct",
    pickupTime: "14:00 Hrs",
  };

  const handleAccept = () => {
    const activeTrip = {
      tripId: `TR-${load.id}`,
      loadId: load.id,

      pickup: load.pickup,
      pickupPoint: load.pickupPoint,

      delivery: load.delivery,
      deliveryPoint: load.deliveryPoint,

      weight: load.load,
      loadType: "Wheat",

      vehicle: load.vehicle,

      distance: load.distance,
      earnings: load.earnings,

      pickupDate: load.pickupDate,
      pickupTime: load.pickupTime,

      status: "Accepted",
    };

    localStorage.setItem(
      "active_trip",
      JSON.stringify(activeTrip)
    );

    navigate("/trips");
  };

  const handleDecline = () => {
    navigate("/loads");
  };

  return (
    <div className="load-details-page">

      {/* =================================
          NEW ORDER CARD
      ================================= */}

      <div className="new-order-card">

        {/* TOP PURPLE LINE */}
        <div className="new-order-top-line"></div>


        {/* =================================
            BELL
        ================================= */}

        <div className="new-order-bell">

          <svg
            viewBox="0 0 64 64"
            className="bell-icon"
            aria-hidden="true"
          >
            <path
              d="M18 28C18 19.7 24.3 13 32 13s14 6.7 14 15v7c0 3.4 1.3 6.7 3.7 9.2L52 47H12l2.3-2.8C16.7 41.7 18 38.4 18 35v-7Z"
              fill="currentColor"
            />

            <path
              d="M26 52c1.4 3.2 3.4 4.8 6 4.8s4.6-1.6 6-4.8"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
            />

            <path
              d="M11 25c0-5.4 2.1-10 6-13.3"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
            />

            <path
              d="M53 25c0-5.4-2.1-10-6-13.3"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>

        </div>


        {/* =================================
            HEADING
        ================================= */}

        <div className="new-order-heading">

          <h1>
            NEW ORDER AVAILABLE
          </h1>

          <p>
            Tap accept to secure this load
            <br />
            immediately.
          </p>

        </div>


        {/* =================================
            ORDER DETAILS
        ================================= */}

        <div className="order-details-card">

          {/* MATCH + EARNINGS */}

          <div className="order-detail-header">

            <div className="direct-match">

              <span className="match-dot"></span>

              <span>
                DIRECT MATCH
              </span>

              <span>
                •
              </span>

              <span>
                {load.distance}
              </span>

            </div>


            <div className="estimated-earning">

              <small>
                Est. Earnings
              </small>

              <strong>
                {load.earnings}
              </strong>

            </div>

          </div>


          <div className="details-divider"></div>


          {/* =================================
              PICKUP
          ================================= */}

          <div className="order-location">

            <div className="location-marker pickup-marker">
              <span></span>
            </div>

            <div className="location-content">

              <small>
                Pickup
              </small>

              <strong>
                {load.pickup}
                <em>
                  {" "}({load.pickupPoint})
                </em>
              </strong>

            </div>

          </div>


          {/* ROUTE LINE */}

          <div className="order-location-line"></div>


          {/* =================================
              DELIVERY
          ================================= */}

          <div className="order-location">

            <div className="location-marker delivery-marker">
              <span></span>
            </div>

            <div className="location-content">

              <small>
                Delivery
              </small>

              <strong>
                {load.delivery}
                <em>
                  {" "}({load.deliveryPoint})
                </em>
              </strong>

            </div>

          </div>


          <div className="details-divider"></div>


          {/* =================================
              LOAD + VEHICLE
          ================================= */}

          <div className="order-info-grid">

            <div className="order-info-item">

              <div className="info-icon">

                <svg viewBox="0 0 24 24">
                  <path
                    d="M12 3v18M7 8l5-5 5 5M7 16l5 5 5-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

              </div>

              <div>

                <small>
                  Load
                </small>

                <strong>
                  {load.load}
                </strong>

              </div>

            </div>


            <div className="order-info-item">

              <div className="info-icon">

                <svg viewBox="0 0 24 24">

                  <path
                    d="M3 7h12v10H3z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />

                  <path
                    d="M15 10h3l3 3v4h-6z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />

                  <circle
                    cx="7"
                    cy="18"
                    r="2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />

                  <circle
                    cx="18"
                    cy="18"
                    r="2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />

                </svg>

              </div>

              <div>

                <small>
                  Vehicle
                </small>

                <strong>
                  {load.vehicle}
                </strong>

              </div>

            </div>

          </div>


          {/* =================================
              DATE + TIME
          ================================= */}

          <div className="order-info-grid">

            <div className="order-info-item">

              <div className="info-icon">

                <svg viewBox="0 0 24 24">

                  <rect
                    x="4"
                    y="5"
                    width="16"
                    height="15"
                    rx="2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />

                  <path
                    d="M8 3v4M16 3v4M4 9h16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />

                </svg>

              </div>

              <div>

                <small>
                  Pickup Date
                </small>

                <strong>
                  {load.pickupDate}
                </strong>

              </div>

            </div>


            <div className="order-info-item">

              <div className="info-icon">

                <svg viewBox="0 0 24 24">

                  <circle
                    cx="12"
                    cy="12"
                    r="8.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />

                  <path
                    d="M12 7v5l3 2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />

                </svg>

              </div>

              <div>

                <small>
                  Time
                </small>

                <strong className="purple-text">
                  {load.pickupTime}
                </strong>

              </div>

            </div>

          </div>

        </div>


        {/* =================================
            RESPONSE
        ================================= */}

        <div className="response-area">

          <div className="respond-label">

            <span>
              ‹‹
            </span>

            <strong>
              SWIPE TO
              <br />
              RESPOND
            </strong>

            <span>
              ››
            </span>

          </div>


          <div className="respond-subtitle">
            Reject
            <span>&lt;&gt;</span>
            Accept
          </div>


          {/* =================================
              ACTION BAR
          ================================= */}

          <div className="order-actions">

            {/* DECLINE */}

            <button
              type="button"
              className="decline-button"
              onClick={handleDecline}
            >

              <span className="action-circle">

                <svg viewBox="0 0 32 32">

                  <path
                    d="M8 18c2-6 14-6 16 0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  <path
                    d="M8 18v5M24 18v5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  <path
                    d="M6 19l3-1M26 19l-3-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                </svg>

              </span>

            </button>


            {/* CENTER */}

            <div className="swipe-center">

              <span className="swipe-arrows">
                ‹‹
              </span>

              <div className="swipe-text">
                SWIPE TO
                <br />
                RESPOND
              </div>

              <span className="swipe-arrows">
                ››
              </span>

            </div>


            {/* ACCEPT */}

            <button
              type="button"
              className="accept-button"
              onClick={handleAccept}
            >

              <span className="action-circle">

                <svg viewBox="0 0 32 32">

                  <path
                    d="M8 18c2-6 14-6 16 0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  <path
                    d="M8 18v5M24 18v5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  <path
                    d="M6 19l3-1M26 19l-3-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                </svg>

              </span>

            </button>

          </div>


          <div className="action-labels">

            <span>
              DECLINE
            </span>

            <span>
              ACCEPT
            </span>

          </div>

        </div>

      </div>

>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
    </div>
  );
}

<<<<<<< HEAD
export default LoadDetails;
=======
export default LoadDetails;
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
