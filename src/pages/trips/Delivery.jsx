<<<<<<< HEAD
import Icon from "../../components/Icon";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import EmptyState from "../../components/ui/EmptyState";
import Button from "../../components/ui/Button";
=======
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
import "./Delivery.css";

function Delivery() {
  const navigate = useNavigate();
  const { tripId } = useParams();

<<<<<<< HEAD
  const [deliveryStatus, setDeliveryStatus] = useState("Arriving");
  const [trip, setTrip] = useState(null);
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

  // Helper to safely advance the backend state machine without 400 Bad Request errors
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
        setTrip(res.data); // Keep local state in sync
      }
    } catch (err) {
      console.error(`Failed to advance trip status to ${targetStatus}:`, err);
    }
  };

  const handleArrived = async () => {
    setDeliveryStatus("Arrived");
    await advanceStatusTo("AT_DELIVERY");
  };

  const handleStartUnloading = async () => {
    setDeliveryStatus("Unloading");
    await advanceStatusTo("DELIVERED"); // Delivered implies we reached the location and unloaded
  };

  const handleCompleteDelivery = async () => {
    setDeliveryStatus("Delivered");
    await advanceStatusTo("COMPLETED");
  };

  const handleFinish = () => {
    navigate(`/trips/${tripId}/complete`);
  };

  const handleUploadDocs = () => {
    navigate(`/trips/${tripId}/documents`);
  };

  if (loading) return <div className="trip-page"><p style={{ padding: "20px" }}>Loading...</p></div>;
  if (!trip) return <div className="trip-page"><EmptyState title="Trip not found" description="This delivery does not exist." /><div style={{textAlign: "center", padding: "20px"}}><Button variant="secondary" onClick={() => navigate(-1)}>Go Back</Button></div></div>;

  let displayStatus = "Arriving at Destination";
  if (deliveryStatus === "Arrived") displayStatus = "Arrived at Destination";
  if (deliveryStatus === "Unloading") displayStatus = "Unloading Cargo";
  if (deliveryStatus === "Delivered") displayStatus = "Delivery Completed";

  return (
    <div className="trip-page">
      <div className="trip-container">
        
        <button className="trip-back-btn" onClick={() => navigate(-1)}>
          <Icon name="arrowLeft" size={18} /> Back
        </button>
        
        <div className="trip-header">
          <span className="trip-eyebrow">DELIVERY STATUS</span>
          <h1>{displayStatus}</h1>
          <p>Complete the final delivery steps.</p>
        </div>

        <div className="delivery-summary-card">
          <div className="delivery-info-grid">
            
            <div className="delivery-info-item row-item">
              <small>Delivery Location</small>
              <div>
                <strong>{trip.request?.delivery_city || "Unknown"}</strong>
                {trip.request?.delivery_location && <p>{trip.request.delivery_location}</p>}
              </div>
            </div>
            
            <div className="delivery-divider"></div>
            
            <div className="delivery-info-item row-item">
              <small>Load</small>
              <strong>{trip.request?.goods_name || "Not specified"}</strong>
            </div>
            
            <div className="delivery-info-item row-item">
              <small>Weight</small>
              <strong>{trip.request?.weight ? `${trip.request.weight} ${trip.request.weight_unit}` : "Not specified"}</strong>
            </div>
            
            <div className="delivery-info-item row-item">
              <small>Vehicle</small>
              <strong>{trip.request?.truck_type || "Your Assigned Vehicle"}</strong>
            </div>
            
            <div className="delivery-info-item row-item earnings">
              <small>Earnings</small>
              <strong>{trip.request?.offered_amount ? `₹${Number(trip.request.offered_amount).toLocaleString()}` : "Not available"}</strong>
            </div>
            
          </div>
        </div>
        
        <div className="delivery-action-footer">
          {deliveryStatus === "Arriving" && (
            <button className="btn-delivery-primary" onClick={handleArrived}>
              Confirm Arrival
            </button>
          )}
          {deliveryStatus === "Arrived" && (
            <button className="btn-delivery-primary" onClick={handleStartUnloading}>
              Start Unloading
            </button>
          )}
          {deliveryStatus === "Unloading" && (
            <>
              <button className="btn-delivery-secondary" onClick={handleUploadDocs}>
                <Icon name="upload" size={18} /> Upload Documents
              </button>
              <button className="btn-delivery-primary" onClick={handleCompleteDelivery}>
                Complete Delivery
              </button>
            </>
          )}
          {deliveryStatus === "Delivered" && (
            <button className="btn-delivery-success" onClick={handleFinish}>
              <Icon name="check" size={18} /> Finish Trip
            </button>
          )}
        </div>
        
      </div>
=======
  const [deliveryStatus, setDeliveryStatus] = useState(
    "Arriving"
  );

  const trip = JSON.parse(
    localStorage.getItem("active_trip") || "{}"
  );

  const tripData = {
    tripId: trip.tripId || tripId || "TRIP-LD001",
    delivery: trip.delivery || "Pune, MH",
    deliveryPoint:
      trip.deliveryPoint || "Hadapsar Depot",
    load: trip.weight || "50 Tons Wheat",
    vehicle: trip.vehicle || "20ft Truck",
    earnings: trip.earnings || "₹18,500",
  };

  const handleArrived = () => {
    setDeliveryStatus("Arrived");
  };

  const handleStartUnloading = () => {
    setDeliveryStatus("Unloading");
  };

  const handleCompleteDelivery = () => {
    setDeliveryStatus("Delivered");
  };

  return (
    <div className="delivery-page">

      {/* HEADER */}

      <div className="delivery-header">

        <div>

          <button
            className="delivery-back"
            onClick={() =>
              navigate(`/trips/${tripData.tripId}/live`)
            }
          >
            ← Back to Live Trip
          </button>

          <span className="delivery-label">
            DELIVERY OPERATIONS
          </span>

          <h1>Delivery & Unloading</h1>

          <p>
            Complete the delivery and confirm unloading of goods.
          </p>

        </div>

        <div className="delivery-status">
          <span></span>
          {deliveryStatus}
        </div>

      </div>


      {/* TRIP INFO */}

      <div className="delivery-trip-bar">

        <div>
          <span>TRIP ID</span>
          <strong>{tripData.tripId}</strong>
        </div>

        <div>
          <span>DELIVERY</span>
          <strong>{tripData.delivery}</strong>
        </div>

        <div>
          <span>LOAD</span>
          <strong>{tripData.load}</strong>
        </div>

        <div>
          <span>EARNINGS</span>
          <strong className="delivery-earning">
            {tripData.earnings}
          </strong>
        </div>

      </div>


      <div className="delivery-layout">

        {/* MAIN */}

        <main className="delivery-main">

          {/* DELIVERY LOCATION */}

          <section className="delivery-card">

            <div className="delivery-card-heading">

              <div>
                <span>DELIVERY LOCATION</span>

                <h2>
                  {tripData.delivery}
                </h2>

                <p>
                  {tripData.deliveryPoint}
                </p>
              </div>

              <div className="arrival-box">
                <small>Current Status</small>

                <strong>
                  {deliveryStatus}
                </strong>
              </div>

            </div>


            <div className="location-details">

              <div className="location-detail">

                <span className="location-icon">
                  ⌖
                </span>

                <div>
                  <small>Delivery Address</small>

                  <strong>
                    {tripData.deliveryPoint}
                  </strong>

                  <p>
                    Hadapsar Industrial Area, Pune
                  </p>
                </div>

              </div>


              <div className="location-detail">

                <span className="location-icon">
                  ◷
                </span>

                <div>
                  <small>Estimated Arrival</small>

                  <strong>
                    Today, 19:30 Hrs
                  </strong>

                  <p>
                    Contact consignee on arrival.
                  </p>
                </div>

              </div>

            </div>

          </section>


          {/* DELIVERY STEPS */}

          <section className="delivery-card">

            <div className="delivery-card-title">

              <span>DELIVERY PROCESS</span>

              <h2>Complete Delivery</h2>

            </div>


            <div className="delivery-steps">

              <div
                className={`delivery-step ${
                  deliveryStatus === "Arriving" ||
                  deliveryStatus === "Arrived" ||
                  deliveryStatus === "Unloading" ||
                  deliveryStatus === "Delivered"
                    ? "done"
                    : ""
                }`}
              >

                <div className="step-number">
                  ✓
                </div>

                <div>
                  <strong>Reach Delivery Location</strong>
                  <p>
                    Arrive at the consignee location.
                  </p>
                </div>

              </div>


              <div
                className={`delivery-step ${
                  deliveryStatus === "Unloading" ||
                  deliveryStatus === "Delivered"
                    ? "done"
                    : ""
                }`}
              >

                <div className="step-number">
                  2
                </div>

                <div>
                  <strong>Unload Goods</strong>
                  <p>
                    Coordinate with consignee and unload goods.
                  </p>
                </div>

              </div>


              <div
                className={`delivery-step ${
                  deliveryStatus === "Delivered"
                    ? "done"
                    : ""
                }`}
              >

                <div className="step-number">
                  3
                </div>

                <div>
                  <strong>Confirm Delivery</strong>
                  <p>
                    Confirm that the goods have been delivered.
                  </p>
                </div>

              </div>

            </div>

          </section>


          {/* DOCUMENTS */}

          <section className="delivery-card">
            <button
  className="documents-btn"
  onClick={() =>
    navigate(`/trips/${tripData.tripId}/documents`)
  }
>
  📄 Manage Documents
</button>

            <div className="delivery-card-title">

              <span>DELIVERY DOCUMENTS</span>

              <h2>Proof & Documents</h2>

            </div>


            <div className="document-grid">

              <button
                onClick={() =>
                  alert("Gate photo upload will be connected later.")
                }
              >
                <span>📷</span>

                <div>
                  <strong>Gate Photo</strong>
                  <small>
                    Upload delivery gate photo
                  </small>
                </div>

                <b>+</b>
              </button>


              <button
                onClick={() =>
                  alert("Delivery document upload will be connected later.")
                }
              >
                <span>📄</span>

                <div>
                  <strong>Delivery Document</strong>
                  <small>
                    Upload POD / delivery proof
                  </small>
                </div>

                <b>+</b>
              </button>

            </div>

          </section>


          {/* ACTION */}

          <section className="delivery-action">

            {deliveryStatus === "Arriving" && (
              <>
                <div>
                  <h3>Have you reached the delivery location?</h3>

                  <p>
                    Confirm your arrival before starting unloading.
                  </p>
                </div>

                <button
                  onClick={handleArrived}
                  className="delivery-primary-btn"
                >
                  I Have Arrived →
                </button>
              </>
            )}


            {deliveryStatus === "Arrived" && (
              <>
                <div>
                  <h3>Ready for Unloading</h3>

                  <p>
                    Coordinate with the consignee and start unloading.
                  </p>
                </div>

                <button
                  onClick={handleStartUnloading}
                  className="delivery-primary-btn"
                >
                  Start Unloading →
                </button>
              </>
            )}


            {deliveryStatus === "Unloading" && (
              <>
                <div>
                  <h3>Goods are Being Unloaded</h3>

                  <p>
                    Complete unloading and confirm delivery.
                  </p>
                </div>

                <button
                  onClick={handleCompleteDelivery}
                  className="delivery-primary-btn"
                >
                  Confirm Delivery →
                </button>
              </>
            )}


            {deliveryStatus === "Delivered" && (
              <>
                <div>
                  <h3>Delivery Completed ✓</h3>

                  <p>
                    The goods have been successfully delivered.
                  </p>
                </div>

                <button
                  onClick={() =>
                    navigate(`/trips/${tripData.tripId}/complete`)
                  }
                  className="delivery-primary-btn"
                >
                  Complete Trip →
                </button>
              </>
            )}

          </section>

        </main>


        {/* SIDEBAR */}

        <aside className="delivery-sidebar">

          <div className="consignee-card">

            <div className="consignee-heading">

              <div>
                <span>CONSIGNEE</span>
                <h3>Delivery Contact</h3>
              </div>

              <span className="online">
                ● Online
              </span>

            </div>


            <div className="consignee-profile">

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


            <button
              onClick={() =>
                alert("Consignee call will be connected later.")
              }
              className="call-btn"
            >
              ☎ Call Consignee
            </button>


            <button
              onClick={() =>
                alert("Trip chat will be connected later.")
              }
              className="chat-btn"
            >
              Open Trip Chat
            </button>

          </div>


          <div className="delivery-summary">

            <h3>Delivery Summary</h3>

            <div>
              <span>Load</span>
              <strong>{tripData.load}</strong>
            </div>

            <div>
              <span>Vehicle</span>
              <strong>{tripData.vehicle}</strong>
            </div>

            <div>
              <span>Destination</span>
              <strong>{tripData.delivery}</strong>
            </div>

            <div>
              <span>Trip Earnings</span>
              <strong className="summary-earning">
                {tripData.earnings}
              </strong>
            </div>

          </div>

        </aside>

      </div>

>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
    </div>
  );
}

<<<<<<< HEAD
export default Delivery;
=======
export default Delivery;
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
