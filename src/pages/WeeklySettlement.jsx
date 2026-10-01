<<<<<<< HEAD
import Icon from "../components/Icon";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
=======
import { useNavigate } from "react-router-dom";
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
import "./WeeklySettlement.css";

function WeeklySettlement() {
  const navigate = useNavigate();
<<<<<<< HEAD
  const [settlements, setSettlements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettlements = async () => {
      try {
        const res = await api.get("/transporter/settlements");
        if (res.data) setSettlements(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettlements();
  }, []);

  const totalAmount = settlements.reduce((sum, s) => sum + Number(s.net_amount || 0), 0);
  const tripEarnings = settlements.reduce((sum, s) => sum + Number(s.trip_amount || 0), 0);
  const platformFee = settlements.reduce((sum, s) => sum + Number(s.platform_fee || 0), 0);
  const taxAmount = settlements.reduce((sum, s) => sum + Number(s.tax_amount || 0), 0);

  return (
    <div className="weekly-settlement-page">
      <div className="weekly-settlement-container">
        
        <div className="weekly-header">
          <button className="back-btn" onClick={() => navigate("/wallet")}>
            <Icon name="arrowLeft" size={18} /> Back
          </button>
          <span className="weekly-eyebrow">SETTLEMENT PLAN</span>
          <h1 className="weekly-title">Weekly Settlement</h1>
          <p className="weekly-subtitle">Next payout on Monday</p>
        </div>

        <div className="settlement-summary-card">
          <div className="summary-value">
            <small>Pending Total</small>
            <strong>₹{totalAmount.toLocaleString()}</strong>
          </div>
          <div className="summary-meta">
            <small>Next Payout</small>
            <span>Monday</span>
          </div>
        </div>

        <div className="bank-account-card">
          <div className="bank-info">
            <div className="bank-icon">
              <Icon name="creditCard" size={20} />
            </div>
            <div className="bank-details">
              <strong>HDFC Bank</strong>
              <span>•••• 4521</span>
            </div>
          </div>
          <div className="bank-verified">
            <Icon name="check" size={12} /> Verified
          </div>
        </div>

        <div className="included-trips-section">
          <h2 className="section-title">Included Trips</h2>
          
          {loading ? (
            <div style={{ padding: "20px", textAlign: "center" }}>Loading...</div>
          ) : settlements.length > 0 ? (
            <div className="trip-list">
              {settlements.map((trip) => (
                <div className="trip-card" key={trip.id}>
                  <div className="trip-card-left">
                    <strong>Trip #{trip.trip_code || `TR-${trip.trip_id}`}</strong>
                    <span>{new Date(trip.created_at).toLocaleDateString("en-US", { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                  <div className="trip-card-right">
                    <strong>₹{Number(trip.net_amount).toLocaleString()}</strong>
                    <span className="status-badge-pending">PENDING</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state-card">
              <div className="icon-circle">
                <Icon name="wallet" size={24} />
              </div>
              <h3>No pending trips for settlement.</h3>
              <p>Completed eligible trips will appear here.</p>
            </div>
          )}
        </div>

        <div className="breakdown-card">
          <h2 className="section-title">Settlement Breakdown</h2>
          
          <div className="breakdown-row">
            <span>Trip Earnings</span>
            <strong>₹{tripEarnings.toLocaleString()}</strong>
          </div>
          
          <div className="breakdown-row deduction">
            <span>Platform Fee (2%)</span>
            <strong>-₹{platformFee.toLocaleString()}</strong>
          </div>
          
          <div className="breakdown-row deduction">
            <span>TDS (1%)</span>
            <strong>-₹{taxAmount.toLocaleString()}</strong>
          </div>
          
          <div className="breakdown-divider"></div>
          
          <div className="breakdown-row breakdown-total">
            <span>Net Payable</span>
            <strong>₹{totalAmount.toLocaleString()}</strong>
          </div>
        </div>

        <div className="page-actions">
          <button className="btn-primary-action" onClick={() => navigate("/wallet")}>
            Back to Wallet
          </button>
          <button className="btn-secondary-action" onClick={() => navigate("/dashboard")}>
            Return to Dashboard
          </button>
        </div>

      </div>
=======

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

>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
    </div>
  );
}

<<<<<<< HEAD
export default WeeklySettlement;
=======
export default WeeklySettlement;
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
