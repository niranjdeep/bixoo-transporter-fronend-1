import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./Delivery.css";

function Delivery() {
  const navigate = useNavigate();
  const { tripId } = useParams();

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

    </div>
  );
}

export default Delivery;