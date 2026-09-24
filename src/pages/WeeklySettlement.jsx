import { useNavigate } from "react-router-dom";
import "./WeeklySettlement.css";

function WeeklySettlement() {
  const navigate = useNavigate();

  const trips = [
    {
      id: "TR-LD001",
      route: "Mumbai → Pune",
      date: "22 Sep 2026",
      amount: "₹18,500",
    },
    {
      id: "TR-1002",
      route: "Chennai → Bengaluru",
      date: "20 Sep 2026",
      amount: "₹28,500",
    },
    {
      id: "TR-1001",
      route: "Coimbatore → Madurai",
      date: "18 Sep 2026",
      amount: "₹10,000",
    },
  ];

  return (
    <div className="weekly-settlement-page">

      {/* Header */}
      <div className="weekly-header">
        <button
          className="weekly-back"
          onClick={() => navigate("/wallet")}
        >
          ←
        </button>

        <div>
          <span>SETTLEMENT</span>
          <h1>Weekly Settlement</h1>
          <p>Review your weekly settlement details.</p>
        </div>
      </div>

      {/* Date */}
      <div className="settlement-date-card">
        <div>
          <small>Settlement Period</small>
          <strong>16 Sep – 22 Sep 2026</strong>
        </div>

        <span className="calendar-icon">▣</span>
      </div>

      {/* Summary */}
      <div className="settlement-summary">

        <div className="summary-box">
          <small>Total Commission</small>
          <strong>₹2,850</strong>
        </div>

        <div className="summary-box">
          <small>Total Trips</small>
          <strong>14</strong>
        </div>

        <div className="summary-box full">
          <small>Gross Value</small>
          <strong>₹57,000</strong>
        </div>

      </div>

      {/* Trip Breakdown */}
      <div className="trip-breakdown">

        <div className="breakdown-heading">
          <div>
            <span>TRIP DETAILS</span>
            <h2>Trip Breakdown</h2>
          </div>

          <span className="trip-count">14 Trips</span>
        </div>

        <div className="trip-list">
          {trips.map((trip) => (
            <div className="settlement-trip" key={trip.id}>

              <div className="trip-icon">
                ↗
              </div>

              <div className="settlement-trip-info">
                <strong>{trip.id}</strong>
                <span>{trip.route}</span>
                <small>{trip.date}</small>
              </div>

              <div className="settlement-trip-amount">
                {trip.amount}
              </div>

            </div>
          ))}
        </div>

        <div className="more-trips">
          + 11 more completed trips
        </div>

      </div>

      {/* Balance */}
      <div className="settlement-balance-card">
        <div>
          <small>Amount Available for Settlement</small>
          <strong>₹24,500</strong>
        </div>

        <span>Pending</span>
      </div>

      {/* Action */}
      <button
        className="pay-settle-button"
        onClick={() => navigate("/wallet/payment")}
      >
        Pay & Settle Balance
        <span>→</span>
      </button>

      <button
        className="settlement-cancel"
        onClick={() => navigate("/wallet")}
      >
        Back to Wallet
      </button>

    </div>
  );
}

export default WeeklySettlement;