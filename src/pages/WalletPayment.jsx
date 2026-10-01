<<<<<<< HEAD
import Icon from "../components/Icon";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Button from "../components/ui/Button";
=======
import { useState } from "react";
import { useNavigate } from "react-router-dom";
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
import "./WalletPayment.css";

function WalletPayment() {
  const navigate = useNavigate();
  const [method, setMethod] = useState("upi");
<<<<<<< HEAD
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const res = await api.get("/transporter/wallet");
        if (res.data) setWallet(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchWallet();
  }, []);
=======
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e

  const handleContinue = () => {
    navigate("/wallet/secure-payment");
  };

  return (
<<<<<<< HEAD
    <div className="wallet-payment-page workflow-page">
      <div className="wallet-payment-header">
        <Button variant="ghost" size="lg" icon="arrowLeft" aria-label="Back to weekly settlement" onClick={() => navigate(-1)} style={{ padding: "8px", width: "42px", height: "42px", borderRadius: "10px", background: "white", color: "var(--ui-purple)" }} />
=======
    <div className="wallet-payment-page">

      {/* Header */}
      <div className="wallet-payment-header">
        <button
          className="payment-back"
          onClick={() => navigate("/wallet/weekly-settlement")}
        >
          ←
        </button>
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e

        <div>
          <span>SETTLEMENT</span>
          <h1>Select Payment Method</h1>
          <p>Choose how you want to settle your balance.</p>
        </div>
      </div>

<<<<<<< HEAD
      <div className="payment-amount-card">
        <small>Amount to Settle</small>
        {loading ? (
          <strong>Loading...</strong>
        ) : (
          <strong>{wallet?.pending_amount ? `₹${Number(wallet.pending_amount).toLocaleString()}` : "₹0"}</strong>
        )}
      </div>

      <div className="payment-methods-list">
        <label className={`payment-method ${method === "upi" ? "selected" : ""}`}>
          <div className="method-info">
            <span className="method-icon"><Icon name="check" size={16} /></span>
            <div>
              <strong>UPI</strong>
              <small>Google Pay, PhonePe, Paytm</small>
            </div>
          </div>
          <input type="radio" name="method" value="upi" checked={method === "upi"} onChange={(e) => setMethod(e.target.value)} className="sr-only" />
        </label>
        
        <label className={`payment-method ${method === "card" ? "selected" : ""}`}>
          <div className="method-info">
            <span className="method-icon"><Icon name="wallet" size={16} /></span>
            <div>
              <strong>Credit/Debit Card</strong>
              <small>Visa, Mastercard, RuPay</small>
            </div>
          </div>
          <input type="radio" name="method" value="card" checked={method === "card"} onChange={(e) => setMethod(e.target.value)} className="sr-only" />
        </label>

        <label className={`payment-method ${method === "netbanking" ? "selected" : ""}`}>
          <div className="method-info">
            <span className="method-icon"><Icon name="shield" size={16} /></span>
            <div>
              <strong>Net Banking</strong>
              <small>All Indian banks supported</small>
            </div>
          </div>
          <input type="radio" name="method" value="netbanking" checked={method === "netbanking"} onChange={(e) => setMethod(e.target.value)} className="sr-only" />
        </label>
      </div>

      <div className="payment-bottom-sheet">
        <Button variant="primary" size="lg" fullWidth onClick={handleContinue}>
          Continue to Payment
        </Button>
      </div>
=======
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

>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
    </div>
  );
}

export default WalletPayment;