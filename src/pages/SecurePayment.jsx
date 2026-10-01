<<<<<<< HEAD
import Icon from "../components/Icon";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Button from "../components/ui/Button";
=======
import { useState } from "react";
import { useNavigate } from "react-router-dom";
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
import "./SecurePayment.css";

function SecurePayment() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("upi");
<<<<<<< HEAD
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);
  const [error, setError] = useState(null);

  const handlePayNow = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post("/transporter/wallet/pay-subscription", { method: paymentMethod });
      if (res.data) setPaid(true);
    } catch (err) {
      console.error(err);
      setError("Payment processing failed. Please try again or use a different method.");
    } finally {
      setLoading(false);
    }
=======
  const [paid, setPaid] = useState(false);

  const handlePayNow = () => {
    setPaid(true);
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
  };

  if (paid) {
    return (
<<<<<<< HEAD
      <div className="secure-payment-page workflow-page">
        <div className="payment-success-card">
          <div className="success-icon"><Icon name="check" size={20} /></div>
          <h2>Payment Successful</h2>
          <p>Your subscription is now active.</p>
          <div className="payment-details">
            <div><span>Amount Paid</span><strong>₹1,999.00</strong></div>
            <div><span>Transaction ID</span><strong>TXN-9023485</strong></div>
          </div>
          <Button variant="primary" fullWidth size="lg" onClick={() => navigate("/dashboard")}>Return to Dashboard</Button>
=======
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
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
        </div>
      </div>
    );
  }

  return (
<<<<<<< HEAD
    <div className="secure-payment-page workflow-page">
      <div className="payment-header">
        <Button variant="ghost" size="lg" icon="arrowLeft" onClick={() => navigate(-1)} style={{ padding: "8px", width: "42px", height: "42px", borderRadius: "10px" }} />
        <div>
          <span>SECURE CHECKOUT</span>
          <h1>Payment Details</h1>
        </div>
      </div>
      
      {error && <div style={{ background: "red", color: "white", padding: "10px", margin: "20px", borderRadius: "8px" }}>{error}</div>}

      <div className="payment-methods">
        <h3>Select Payment Method</h3>
        <label className={`payment-method ${paymentMethod === 'upi' ? 'selected' : ''}`}>
          <div className="method-info"><strong>UPI Payment</strong><span>Google Pay, PhonePe, Paytm</span></div>
          <input type="radio" name="method" value="upi" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} className="sr-only" />
        </label>
        <label className={`payment-method ${paymentMethod === 'card' ? 'selected' : ''}`}>
          <div className="method-info"><strong>Credit / Debit Card</strong><span>Visa, Mastercard, RuPay</span></div>
          <input type="radio" name="method" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="sr-only" />
        </label>
      </div>

      <div className="payment-bottom-sheet">
        <div className="payment-summary">
          <div><span>Subscription</span><strong>₹1,999.00</strong></div>
          <div className="total"><span>Total to Pay</span><strong>₹1,999.00</strong></div>
        </div>
        <Button 
          variant="primary" 
          fullWidth 
          size="lg"
          onClick={handlePayNow} 
          loading={loading}
          loadingText="Processing..."
          icon="lock"
          iconPosition="right"
        >
          Pay ₹1,999.00 securely
        </Button>
      </div>
=======
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

>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
    </div>
  );
}

<<<<<<< HEAD
export default SecurePayment;
=======
export default SecurePayment;
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
