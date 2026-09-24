import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SecurePayment.css";

function SecurePayment() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [paid, setPaid] = useState(false);

  const handlePayNow = () => {
    setPaid(true);
  };

  if (paid) {
    return (
      <div className="secure-payment-page">
        <div className="payment-success-card">
          <div className="success-icon">✓</div>

          <span className="success-label">PAYMENT SUCCESSFUL</span>

          <h1>Settlement Completed</h1>

          <p>
            Your payment has been processed successfully.
          </p>

          <div className="success-amount">
            ₹2,499
          </div>

          <div className="success-reference">
            <span>Transaction ID</span>
            <strong>BIXOO-SET-2026-2499</strong>
          </div>

          <button
            className="success-wallet-button"
            onClick={() => navigate("/wallet")}
          >
            Back to Wallet →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="secure-payment-page">

      {/* Header */}
      <div className="secure-header">
        <button
          className="secure-back"
          onClick={() => navigate("/wallet/payment")}
        >
          ←
        </button>

        <div>
          <span>PAYMENT</span>
          <h1>Secure Payment</h1>
          <p>Review your order before payment.</p>
        </div>
      </div>

      {/* Subscription */}
      <div className="subscription-card">

        <div className="subscription-top">
          <div className="subscription-icon">
            B
          </div>

          <div>
            <span>SETTLEMENT PLAN</span>
            <strong>Monthly Subscription</strong>
          </div>
        </div>

        <div className="subscription-price">
          <small>Total Amount</small>
          <strong>₹2,499</strong>
        </div>

      </div>

      {/* Order Summary */}
      <div className="secure-section">

        <span className="secure-section-label">
          ORDER SUMMARY
        </span>

        <h2>Payment Details</h2>

        <div className="summary-card">

          <div className="summary-row">
            <span>Monthly Subscription</span>
            <strong>₹2,499</strong>
          </div>

          <div className="summary-row">
            <span>Settlement Service</span>
            <strong>Included</strong>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-row">
            <span>Subtotal</span>
            <strong>₹2,117.80</strong>
          </div>

          <div className="summary-row">
            <span>GST (18%)</span>
            <strong>₹381.20</strong>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-total">
            <span>Total Payable</span>
            <strong>₹2,499</strong>
          </div>

        </div>
      </div>

      {/* Payment Method */}
      <div className="secure-section">

        <span className="secure-section-label">
          PAYMENT METHOD
        </span>

        <h2>Choose Payment Method</h2>

        <div className="secure-methods">

          <button
            className={`secure-method ${
              paymentMethod === "upi" ? "active" : ""
            }`}
            onClick={() => setPaymentMethod("upi")}
          >
            <span className="method-icon">UPI</span>

            <span className="method-text">
              <strong>UPI</strong>
              <small>Google Pay / PhonePe / Paytm</small>
            </span>

            <span className="method-radio">
              {paymentMethod === "upi" && "✓"}
            </span>
          </button>

          <button
            className={`secure-method ${
              paymentMethod === "card" ? "active" : ""
            }`}
            onClick={() => setPaymentMethod("card")}
          >
            <span className="method-icon card">▭</span>

            <span className="method-text">
              <strong>Credit / Debit Card</strong>
              <small>Visa / Mastercard / RuPay</small>
            </span>

            <span className="method-radio">
              {paymentMethod === "card" && "✓"}
            </span>
          </button>

          <button
            className={`secure-method ${
              paymentMethod === "netbanking" ? "active" : ""
            }`}
            onClick={() => setPaymentMethod("netbanking")}
          >
            <span className="method-icon">▤</span>

            <span className="method-text">
              <strong>Net Banking</strong>
              <small>All major banks</small>
            </span>

            <span className="method-radio">
              {paymentMethod === "netbanking" && "✓"}
            </span>
          </button>

        </div>
      </div>

      {/* Pay */}
      <button
        className="pay-now-button"
        onClick={handlePayNow}
      >
        <span>Pay ₹2,499</span>
        <span>→</span>
      </button>

      <div className="secure-payment-note">
        🔒 100% Secure & Encrypted Payment
      </div>

      <button
        className="secure-cancel"
        onClick={() => navigate("/wallet")}
      >
        Cancel Payment
      </button>

    </div>
  );
}

export default SecurePayment;