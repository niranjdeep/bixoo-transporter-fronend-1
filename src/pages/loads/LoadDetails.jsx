import { useNavigate, useParams } from "react-router-dom";

import "./LoadDetails.css";

function LoadDetails() {
  const navigate = useNavigate();
  const { loadId } = useParams();

  const load = {
    id: loadId || "LD001",
    match: "Direct Match",
    distance: "160 KM",
    earnings: "₹18,500",

    pickup: "Mumbai, MH",
    pickupPoint: "APMC Market",

    delivery: "Pune, MH",
    deliveryPoint: "Hadapsar Depot",

    loadType: "Wheat",
    weight: "50 Tons",

    vehicle: "20ft Truck",
    vehicleType: "Open Truck",

    pickupDate: "Today",
    pickupTime: "14:00 Hrs",

    deliveryDate: "Today",
    estimatedDelivery: "19:30 Hrs",
  };

  const handleAccept = () => {
    const trip = {
      tripId: `TRIP-${load.id}`,
      loadId: load.id,
      status: "Trip Created",
      ...load,
    };

    localStorage.setItem(
      "active_trip",
      JSON.stringify(trip)
    );

    navigate(`/trips/${trip.tripId}`);
  };

  const handleReject = () => {
    navigate("/loads");
  };

  return (
    <div className="load-details-page">

      {/* HEADER */}
      <div className="details-header">

        <div>
          <button
            className="back-btn"
            onClick={() => navigate("/loads")}
          >
            ← Back to Loads
          </button>

          <div className="header-title-row">

            <div>
              <span className="page-label">
                LOAD DETAILS
              </span>

              <h1>New Order Available</h1>

              <p>
                Review the load details before accepting this trip.
              </p>
            </div>

            <div className="direct-match-badge">
              <span>✓</span>
              Direct Match
            </div>

          </div>
        </div>

      </div>


      {/* MAIN CONTENT */}
      <div className="details-layout">

        {/* LEFT */}
        <div className="details-main">

          {/* ROUTE CARD */}
          <section className="details-card">

            <div className="card-top">

              <div>
                <span className="section-label">
                  TRANSPORT ROUTE
                </span>

                <h2>
                  {load.pickup} → {load.delivery}
                </h2>
              </div>

              <div className="distance-box">
                <strong>{load.distance}</strong>
                <span>Total Distance</span>
              </div>

            </div>


            <div className="route-details">

              <div className="route-location">

                <div className="route-icon pickup">
                  P
                </div>

                <div>
                  <small>Pickup Location</small>

                  <h3>{load.pickup}</h3>

                  <p>{load.pickupPoint}</p>

                  <div className="time-info">
                    <span>📅 {load.pickupDate}</span>
                    <span>🕐 {load.pickupTime}</span>
                  </div>
                </div>

              </div>


              <div className="route-connector">
                <span></span>
              </div>


              <div className="route-location">

                <div className="route-icon delivery">
                  D
                </div>

                <div>
                  <small>Delivery Location</small>

                  <h3>{load.delivery}</h3>

                  <p>{load.deliveryPoint}</p>

                  <div className="time-info">
                    <span>📅 {load.deliveryDate}</span>
                    <span>
                      🕐 Est. {load.estimatedDelivery}
                    </span>
                  </div>
                </div>

              </div>

            </div>

          </section>


          {/* LOAD INFORMATION */}
          <section className="details-card">

            <div className="section-heading">

              <div>
                <span className="section-label">
                  LOAD INFORMATION
                </span>

                <h2>Load Requirements</h2>
              </div>

            </div>


            <div className="information-grid">

              <div className="info-item">
                <span>Load Type</span>
                <strong>{load.loadType}</strong>
              </div>

              <div className="info-item">
                <span>Total Weight</span>
                <strong>{load.weight}</strong>
              </div>

              <div className="info-item">
                <span>Vehicle Required</span>
                <strong>{load.vehicle}</strong>
              </div>

              <div className="info-item">
                <span>Vehicle Type</span>
                <strong>{load.vehicleType}</strong>
              </div>

            </div>

          </section>


          {/* OPERATIONAL INFORMATION */}
          <section className="details-card">

            <div className="section-heading">

              <div>
                <span className="section-label">
                  TRIP INFORMATION
                </span>

                <h2>Before You Accept</h2>
              </div>

            </div>

            <div className="check-list">

              <div>
                <span>✓</span>
                <p>
                  Check vehicle suitability for the required load.
                </p>
              </div>

              <div>
                <span>✓</span>
                <p>
                  Confirm pickup date and time before accepting.
                </p>
              </div>

              <div>
                <span>✓</span>
                <p>
                  Ensure the vehicle is available for the complete trip.
                </p>
              </div>

              <div>
                <span>✓</span>
                <p>
                  Coordinate with the buyer or consignee for delivery.
                </p>
              </div>

            </div>

          </section>

        </div>


        {/* RIGHT SIDEBAR */}
        <aside className="details-sidebar">

          <div className="earnings-card">

            <span>ESTIMATED EARNINGS</span>

            <strong>{load.earnings}</strong>

            <p>
              Estimated trip earnings
            </p>

          </div>


          <div className="summary-card">

            <div className="summary-header">
              <h3>Load Summary</h3>

              <span>{load.id}</span>
            </div>


            <div className="summary-row">
              <span>Distance</span>
              <strong>{load.distance}</strong>
            </div>

            <div className="summary-row">
              <span>Load</span>
              <strong>{load.weight}</strong>
            </div>

            <div className="summary-row">
              <span>Vehicle</span>
              <strong>{load.vehicle}</strong>
            </div>

            <div className="summary-row">
              <span>Pickup</span>
              <strong>{load.pickupTime}</strong>
            </div>

            <div className="summary-row">
              <span>Status</span>

              <strong className="available-status">
                Available
              </strong>
            </div>

          </div>


          <div className="action-card">

            <button
              className="accept-load-btn"
              onClick={handleAccept}
            >
              <span>✓</span>
              Accept Load
            </button>

            <button
              className="reject-load-btn"
              onClick={handleReject}
            >
              Reject / Go Back
            </button>

            <small>
              By accepting, this load will be added to your active trips.
            </small>

          </div>

        </aside>

      </div>

    </div>
  );
}

export default LoadDetails;