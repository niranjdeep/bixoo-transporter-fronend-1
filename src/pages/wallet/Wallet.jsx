import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Wallet.css";

function Wallet() {
  const navigate = useNavigate();
  const [plan, setPlan] = useState("weekly");

  const handleContinue = () => {
    if (plan === "weekly") {
      navigate("/wallet/weekly-settlement");
    } else {
      navigate("/wallet/payment");
    }
  };

  return (
    <div className="wallet-page">

      {/* Header */}
      <div className="wallet-header">
        <div>
          <span className="wallet-label">TRANSPORTER WALLET</span>
          <h1>Wallet & Settlement</h1>
          <p>Manage your earnings and settlements.</p>
        </div>

        <div className="wallet-balance-icon">₹</div>
      </div>

      {/* Balance */}
      <div className="wallet-balance-card">
        <div>
          <span>Current Pending Balance</span>
          <strong>₹24,500</strong>
        </div>

        <div className="wallet-balance-status">
          Pending
        </div>
      </div>

      {/* Stats */}
      <div className="wallet-stats">

        <div className="wallet-stat-card">
          <span className="wallet-stat-icon">✓</span>
          <div>
            <strong>12</strong>
            <small>Trips Completed Today</small>
          </div>
        </div>

        <div className="wallet-stat-card">
          <span className="wallet-stat-icon">↗</span>
          <div>
            <strong>148</strong>
            <small>Total Accepted Trips</small>
          </div>
        </div>

      </div>

      {/* Settlement Plan */}
      <div className="wallet-section">

        <div className="wallet-section-heading">
          <div>
            <span>SETTLEMENT</span>
            <h2>Choose Settlement Plan</h2>
          </div>
        </div>

        {/* Weekly */}
        <button
          className={`settlement-option ${
            plan === "weekly" ? "selected" : ""
          }`}
          onClick={() => setPlan("weekly")}
        >
          <div className="settlement-radio">
            {plan === "weekly" && <span></span>}
          </div>

          <div className="settlement-content">
            <strong>Weekly Settlement</strong>
            <p>
              Settle your completed trips every week.
            </p>
          </div>

          <span className="settlement-arrow">→</span>
        </button>

        {/* Monthly */}
        <button
          className={`settlement-option ${
            plan === "monthly" ? "selected" : ""
          }`}
          onClick={() => setPlan("monthly")}
        >
          <div className="settlement-radio">
            {plan === "monthly" && <span></span>}
          </div>

          <div className="settlement-content">
            <strong>Monthly Subscription</strong>
            <p>
              Pay a fixed monthly subscription for settlement.
            </p>
          </div>

          <span className="settlement-price">
            ₹2,499
          </span>
        </button>

      </div>

      {/* Continue */}
      <button
        className="wallet-continue"
        onClick={handleContinue}
      >
        Continue to Payment
        <span>→</span>
      </button>

      {/* Security */}
      <div className="wallet-security">
        <span>🔒</span>
        <p>
          Your payment and settlement information
          is securely protected.
        </p>
      </div>

    </div>
  );
}

export default Wallet;