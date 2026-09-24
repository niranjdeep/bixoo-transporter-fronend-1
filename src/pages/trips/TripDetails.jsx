import { useNavigate, useParams } from "react-router-dom";
import "./TripDetails.css";

function TripDetails() {
  const navigate = useNavigate();
  const { tripId } = useParams();

  const trip = {
    id: tripId || "TR-8924",
    status: "In Transit",
    pickup: "Mumbai",
    delivery: "Pune",
    eta: "2h 45m",
    product: "Premium Wheat (Grade A)",
    quantity: "250 Bags",
    weight: "12.5 Tons",
    seller: "Rajesh Traders",
    buyer: "Metro Mills",
    earnings: "₹18,500",
  };

  return (
    <div className="trip-details-page">

      {/* HEADER */}
      <div className="trip-header">
        <button
          className="trip-back-btn"
          onClick={() => navigate("/trips")}
        >
          ←
        </button>

        <div className="trip-header-content">
          <span className="trip-page-label">
            TRIP DETAILS
          </span>

          <h1>Trip #{trip.id}</h1>

          <p>
            {trip.pickup} → {trip.delivery}
          </p>
        </div>

        <span className="trip-status-badge">
          <span></span>
          {trip.status}
        </span>
      </div>


      {/* TRIP SUMMARY BAR */}
      <div className="trip-id-bar">

        <div>
          <small>TRIP</small>
          <strong>#{trip.id}</strong>
        </div>

        <div>
          <small>ROUTE</small>
          <strong>
            {trip.pickup} → {trip.delivery}
          </strong>
        </div>

        <div>
          <small>ETA</small>
          <strong>{trip.eta}</strong>
        </div>

      </div>


      {/* MAIN LAYOUT */}
      <div className="trip-layout">

        <main className="trip-main">

          {/* ROUTE CARD */}
          <section className="trip-card">

            <div className="trip-card-header">
              <div>
                <span className="trip-section-label">
                  LIVE ROUTE
                </span>

                <h2>
                  {trip.pickup} → {trip.delivery}
                </h2>
              </div>

              <span className="route-live-badge">
                LIVE
              </span>
            </div>


            {/* MAP */}
            <div className="trip-map-placeholder">

              <div className="map-road road-one"></div>
              <div className="map-road road-two"></div>
              <div className="map-road road-three"></div>

              <div className="map-route-line"></div>

              <div className="map-point pickup-point">
                <span></span>
                <small>Pickup</small>
              </div>

              <div className="map-point delivery-point">
                <span></span>
                <small>Delivery</small>
              </div>

              <div className="map-truck">
                🚚
              </div>

            </div>


            {/* ROUTE INFO */}
            <div className="route-info">

              <div className="trip-location">
                <span className="location-marker pickup">
                  ●
                </span>

                <div>
                  <small>Pickup</small>
                  <strong>Mumbai, MH</strong>
                  <span>APMC Market</span>
                </div>

                <time>08:30 AM</time>
              </div>


              <div className="trip-route-line"></div>


              <div className="trip-location">
                <span className="location-marker delivery">
                  ●
                </span>

                <div>
                  <small>Delivery</small>
                  <strong>Pune, MH</strong>
                  <span>Hadapsar Depot</span>
                </div>

                <time>02:00 PM</time>
              </div>

            </div>

          </section>


          {/* TIMELINE */}
          <section className="trip-card">

            <div className="trip-card-header">
              <div>
                <span className="trip-section-label">
                  TRIP TIMELINE
                </span>

                <h2>Trip Progress</h2>
              </div>
            </div>


            <div className="trip-timeline">

              <div className="timeline-step completed">

                <div className="timeline-circle">
                  ✓
                </div>

                <div>
                  <strong>Pickup Confirmed</strong>
                  <span>Today, 08:30 AM</span>
                </div>

              </div>


              <div className="timeline-line active"></div>


              <div className="timeline-step current">

                <div className="timeline-circle">
                  ●
                </div>

                <div>
                  <strong>In Transit</strong>
                  <span>Last updated 10 mins ago</span>
                </div>

              </div>


              <div className="timeline-line"></div>


              <div className="timeline-step">

                <div className="timeline-circle">
                  3
                </div>

                <div>
                  <strong>Delivery</strong>
                  <span>Estimated Today, 02:00 PM</span>
                </div>

              </div>

            </div>

          </section>


          {/* GOODS */}
          <section className="trip-card">

            <span className="trip-section-label">
              LOAD DETAILS
            </span>

            <div className="goods-card">

              <div className="goods-icon">
                ◈
              </div>

              <div className="goods-content">
                <h3>{trip.product}</h3>

                <p>
                  {trip.quantity} • {trip.weight}
                </p>
              </div>

              <span className="goods-status">
                Confirmed
              </span>

            </div>


            <div className="trip-note-card">
              <span>Note</span>

              <p>
                Keep the cargo dry and secure during
                transportation. Handle the wheat bags
                carefully during loading and unloading.
              </p>
            </div>

          </section>


          {/* CONTACTS */}
          <section className="contacts-card">

            <div className="trip-card-header">
              <div>
                <span className="trip-section-label">
                  CONTACTS
                </span>

                <h2>Trip Contacts</h2>
              </div>
            </div>


            {/* SELLER */}
            <div className="contact-item">

              <div className="contact-avatar seller">
                RT
              </div>

              <div className="contact-info">
                <small>SELLER</small>
                <strong>{trip.seller}</strong>
              </div>

              <div className="contact-actions">
                <button
                  onClick={() =>
                    navigate(`/trips/${trip.id}/chat`)
                  }
                >
                  💬
                </button>

                <button>
                  ☎
                </button>
              </div>

            </div>


            {/* BUYER */}
            <div className="contact-item">

              <div className="contact-avatar buyer">
                MM
              </div>

              <div className="contact-info">
                <small>BUYER</small>
                <strong>{trip.buyer}</strong>
              </div>

              <div className="contact-actions">
                <button
                  onClick={() =>
                    navigate(`/trips/${trip.id}/chat`)
                  }
                >
                  💬
                </button>

                <button>
                  ☎
                </button>
              </div>

            </div>

          </section>


          {/* CONFIRM DELIVERY */}
          <section className="confirm-delivery-card">

            <div>
              <span className="confirm-icon">
                ✓
              </span>

              <div>
                <strong>Ready to confirm delivery?</strong>

                <p>
                  Confirm only after the cargo has
                  been successfully delivered.
                </p>
              </div>
            </div>

            <button
              className="primary-trip-btn"
              onClick={() =>
                navigate(`/trips/${trip.id}/delivery`)
              }
            >
              Confirm Delivery
              <span>→</span>
            </button>

          </section>

        </main>


        {/* SIDEBAR */}
        <aside className="trip-sidebar">

          <div className="trip-summary-card">

            <span className="trip-section-label">
              TRIP SUMMARY
            </span>

            <div className="summary-item">
              <small>Trip ID</small>
              <strong>#{trip.id}</strong>
            </div>

            <div className="summary-item">
              <small>Distance</small>
              <strong>160 KM</strong>
            </div>

            <div className="summary-item">
              <small>Vehicle</small>
              <strong>20ft Truck</strong>
            </div>

            <div className="summary-item">
              <small>Load</small>
              <strong>50 Tons Wheat</strong>
            </div>

            <div className="summary-item">
              <small>Status</small>
              <strong className="summary-status">
                In Transit
              </strong>
            </div>

            <div className="summary-earning">
              <small>Estimated Earnings</small>
              <strong>{trip.earnings}</strong>
            </div>

          </div>


          <div className="trip-help-card">

            <div className="help-icon">
              ?
            </div>

            <div>
              <strong>Need Help?</strong>

              <p>
                Contact BIXOO support for
                assistance with this trip.
              </p>

              <button>
                Contact Support →
              </button>
            </div>

          </div>

        </aside>

      </div>

    </div>
  );
}

export default TripDetails;