import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./TripDetails.css";

function TripDetails() {
  const navigate = useNavigate();
  const { tripId } = useParams();

  const [tripStatus, setTripStatus] = useState("Trip Created");

  const trip = JSON.parse(
    localStorage.getItem("active_trip") || "{}"
  );

  const tripData = {
    tripId: trip.tripId || tripId || "TRIP-LD001",
    loadId: trip.loadId || "LD001",
    pickup: trip.pickup || "Mumbai, MH",
    pickupPoint: trip.pickupPoint || "APMC Market",
    delivery: trip.delivery || "Pune, MH",
    deliveryPoint: trip.deliveryPoint || "Hadapsar Depot",
    distance: trip.distance || "160 KM",
    loadType: trip.loadType || "Wheat",
    weight: trip.weight || "50 Tons",
    vehicle: trip.vehicle || "20ft Truck",
    earnings: trip.earnings || "₹18,500",
    pickupDate: trip.pickupDate || "Today",
    pickupTime: trip.pickupTime || "14:00 Hrs",
  };

  const handlePickup = () => {
    setTripStatus("Pickup");
  };

  const handleLoadGoods = () => {
    setTripStatus("Goods Loaded");
  };

  const handleStartTrip = () => {
  setTripStatus("In Transit");

  navigate(`/trips/${tripData.tripId}/live`);
};

  const getStepClass = (step) => {
    const steps = [
      "Trip Created",
      "Pickup",
      "Goods Loaded",
      "In Transit",
    ];

    const currentIndex = steps.indexOf(tripStatus);
    const stepIndex = steps.indexOf(step);

    if (stepIndex < currentIndex) {
      return "completed";
    }

    if (stepIndex === currentIndex) {
      return "active";
    }

    return "";
  };

  return (
    <div className="trip-details-page">

      {/* HEADER */}
      <div className="trip-header">

        <div>
          <button
            className="trip-back-btn"
            onClick={() => navigate("/trips")}
          >
            ← Back to Trips
          </button>

          <span className="trip-page-label">
            TRIP MANAGEMENT
          </span>

          <h1>Trip Details</h1>

          <p>
            Manage your accepted load from pickup to delivery.
          </p>
        </div>

        <div className="trip-status-badge">
          <span></span>
          {tripStatus}
        </div>

      </div>


      {/* TRIP ID */}
      <div className="trip-id-bar">

        <div>
          <span>TRIP ID</span>
          <strong>{tripData.tripId}</strong>
        </div>

        <div>
          <span>LOAD ID</span>
          <strong>{tripData.loadId}</strong>
        </div>

        <div>
          <span>EST. EARNINGS</span>
          <strong className="trip-earning">
            {tripData.earnings}
          </strong>
        </div>

      </div>


      <div className="trip-layout">

        {/* MAIN */}
        <div className="trip-main">

          {/* PROGRESS */}
          <section className="trip-card">

            <div className="trip-card-header">

              <div>
                <span className="trip-section-label">
                  TRIP PROGRESS
                </span>

                <h2>Current Journey</h2>
              </div>

              <strong>{tripStatus}</strong>

            </div>


            <div className="trip-timeline">

              <div className={`timeline-step ${getStepClass("Trip Created")}`}>
                <div className="timeline-circle">✓</div>

                <div>
                  <strong>Trip Created</strong>
                  <span>Load accepted successfully</span>
                </div>
              </div>


              <div className="timeline-line"></div>


              <div className={`timeline-step ${getStepClass("Pickup")}`}>
                <div className="timeline-circle">2</div>

                <div>
                  <strong>Pickup</strong>
                  <span>Reach pickup location</span>
                </div>
              </div>


              <div className="timeline-line"></div>


              <div className={`timeline-step ${getStepClass("Goods Loaded")}`}>
                <div className="timeline-circle">3</div>

                <div>
                  <strong>Load Goods</strong>
                  <span>Load and verify goods</span>
                </div>
              </div>


              <div className="timeline-line"></div>


              <div className={`timeline-step ${getStepClass("In Transit")}`}>
                <div className="timeline-circle">4</div>

                <div>
                  <strong>Start Trip</strong>
                  <span>Begin transportation</span>
                </div>
              </div>

            </div>

          </section>


          {/* ROUTE */}
          <section className="trip-card">

            <div className="trip-card-header">

              <div>
                <span className="trip-section-label">
                  ROUTE
                </span>

                <h2>Pickup & Delivery</h2>
              </div>

              <span className="trip-distance">
                {tripData.distance}
              </span>

            </div>


            <div className="trip-route">

              <div className="trip-location">

                <div className="location-marker pickup">
                  P
                </div>

                <div>
                  <small>Pickup</small>

                  <h3>{tripData.pickup}</h3>

                  <p>{tripData.pickupPoint}</p>

                  <span className="pickup-time">
                    📅 {tripData.pickupDate} · 🕐 {tripData.pickupTime}
                  </span>
                </div>

              </div>


              <div className="trip-route-line"></div>


              <div className="trip-location">

                <div className="location-marker delivery">
                  D
                </div>

                <div>
                  <small>Delivery</small>

                  <h3>{tripData.delivery}</h3>

                  <p>{tripData.deliveryPoint}</p>

                </div>

              </div>

            </div>

          </section>


          {/* LOAD DETAILS */}
          <section className="trip-card">

            <div className="trip-card-header">

              <div>
                <span className="trip-section-label">
                  LOAD DETAILS
                </span>

                <h2>Goods Information</h2>
              </div>

            </div>


            <div className="goods-grid">

              <div>
                <span>Load Type</span>
                <strong>{tripData.loadType}</strong>
              </div>

              <div>
                <span>Weight</span>
                <strong>{tripData.weight}</strong>
              </div>

              <div>
                <span>Vehicle</span>
                <strong>{tripData.vehicle}</strong>
              </div>

              <div>
                <span>Distance</span>
                <strong>{tripData.distance}</strong>
              </div>

            </div>

          </section>


          {/* ACTION */}
          <section className="trip-action-card">

            {tripStatus === "Trip Created" && (
              <>
                <div>
                  <h3>Ready for Pickup?</h3>

                  <p>
                    Proceed to the pickup location and update your trip.
                  </p>
                </div>

                <button
                  onClick={handlePickup}
                  className="primary-trip-btn"
                >
                  Start Pickup →
                </button>
              </>
            )}


            {tripStatus === "Pickup" && (
              <>
                <div>
                  <h3>At Pickup Location</h3>

                  <p>
                    Confirm the goods and proceed with loading.
                  </p>
                </div>

                <button
                  onClick={handleLoadGoods}
                  className="primary-trip-btn"
                >
                  Load Goods →
                </button>
              </>
            )}


            {tripStatus === "Goods Loaded" && (
              <>
                <div>
                  <h3>Goods Loaded</h3>

                  <p>
                    Verify the load and start your trip.
                  </p>
                </div>

                <button
                  onClick={handleStartTrip}
                  className="primary-trip-btn"
                >
                  Start Trip →
                </button>
              </>
            )}


            {tripStatus === "In Transit" && (
              <>
                <div>
                  <h3>Trip Started</h3>

                  <p>
                    Your trip is now in transit.
                  </p>
                </div>

                <button
                  onClick={() => navigate("/trips")}
                  className="primary-trip-btn"
                >
                  Manage Trip →
                </button>
              </>
            )}

          </section>

        </div>


        {/* SIDEBAR */}
        <aside className="trip-sidebar">

          <div className="trip-summary-card">

            <h3>Trip Summary</h3>

            <div className="summary-item">
              <span>Trip ID</span>
              <strong>{tripData.tripId}</strong>
            </div>

            <div className="summary-item">
              <span>Load</span>
              <strong>{tripData.weight}</strong>
            </div>

            <div className="summary-item">
              <span>Vehicle</span>
              <strong>{tripData.vehicle}</strong>
            </div>

            <div className="summary-item">
              <span>Distance</span>
              <strong>{tripData.distance}</strong>
            </div>

            <div className="summary-item">
              <span>Expected Earnings</span>
              <strong className="summary-earning">
                {tripData.earnings}
              </strong>
            </div>

          </div>


          <div className="trip-help-card">

            <div className="help-icon">
              ?
            </div>

            <h3>Need Help?</h3>

            <p>
              Contact the buyer or consignee for pickup and delivery coordination.
            </p>

            <button>
              Open Trip Chat →
            </button>

          </div>

        </aside>

      </div>

    </div>
  );
}

export default TripDetails;