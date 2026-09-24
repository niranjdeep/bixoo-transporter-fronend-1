import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./WalletPayment.css";

function WalletPayment() {
  const navigate = useNavigate();
  const [method, setMethod] = useState("upi");

  const handleContinue = () => {
    navigate("/wallet/secure-payment");
  };

  return (
    <div className="wallet-payment-page">

      {/* Header */}
      <div className="wallet-payment-header">
        <button
          className="payment-back"
          onClick={() => navigate("/wallet/weekly-settlement")}
        >
          ←
        </button>

        <div>
          <span>SETTLEMENT</span>
          <h1>Select Payment Method</h1>
          <p>Choose how you want to settle your balance.</p>
        </div>
      </div>

      {/* Amount */}
      <div className="payment-amount-card">
        <small>Amount to Settle</small>
        <strong>₹24,500</strong>
        <span>Weekly Settlement</span>
      </div>

      {/* Payment Methods */}
      <div className="payment-method-section">
        <span className="payment-section-label">
          PAYMENT OPTIONS
        </span>

        <h2>Choose Payment Method</h2>

        {/* UPI */}
        <label
          className={`payment-method-card ${
            method === "upi" ? "active" : ""
          }`}
        >
          <input
            type="radio"
            name="payment"
            value="upi"
            checked={method === "upi"}
            onChange={() => setMethod("upi")}
          />

          <div className="payment-method-icon">
            UPI
          </div>

          <div className="payment-method-content">
            <strong>UPI</strong>
            <span>Google Pay, PhonePe, Paytm</span>
          </div>

          <span className="payment-check">
            {method === "upi" ? "✓" : ""}
          </span>
        </label>

        {/* Card */}
        <label
          className={`payment-method-card ${
            method === "card" ? "active" : ""
          }`}
        >
          <input
            type="radio"
            name="payment"
            value="card"
            checked={method === "card"}
            onChange={() => setMethod("card")}
          />

          <div className="payment-method-icon card-icon">
            ▭
          </div>

          <div className="payment-method-content">
            <strong>Credit / Debit Card</strong>
            <span>Visa, Mastercard, RuPay</span>
          </div>

          <span className="payment-check">
            {method === "card" ? "✓" : ""}
          </span>
        </label>

        {/* Net Banking */}
        <label
          className={`payment-method-card ${
            method === "netbanking" ? "active" : ""
          }`}
        >
          <input
            type="radio"
            name="payment"
            value="netbanking"
            checked={method === "netbanking"}
            onChange={() => setMethod("netbanking")}
          />

          <div className="payment-method-icon">
            ▤
          </div>

          <div className="payment-method-content">
            <strong>Net Banking</strong>
            <span>All major banks supported</span>
          </div>

          <span className="payment-check">
            {method === "netbanking" ? "✓" : ""}
          </span>
        </label>
      </div>

      {/* Continue */}
      <button
        className="payment-continue"
        onClick={handleContinue}
      >
        Continue
        <span>→</span>
      </button>

      <button
        className="payment-back-wallet"
        onClick={() => navigate("/wallet")}
      >
        Back to Wallet
      </button>

      <div className="payment-secure-note">
        🔒 Secure payment powered by BIXOO
      </div>

    </div>
  );
}

export default WalletPayment;