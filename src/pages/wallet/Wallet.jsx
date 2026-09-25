import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Wallet.css";

function Wallet() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState("weekly");

  const handleContinue = () => {
    if (selectedPlan === "weekly") {
      navigate("/wallet/weekly-settlement");
    } else {
      navigate("/wallet/secure-payment");
    }
  };

  return (
    <div className="wallet-page">

      {/* Header */}
      <div className="wallet-header">

        <div>
          <span className="wallet-label">
            TRANSPORTER WALLET
          </span>

          <h1>Wallet</h1>

          <p>
            Manage your earnings and settlements.
          </p>
        </div>

        <div className="wallet-icon">
          ₹
        </div>

      </div>


      {/* Balance Card */}
      <section className="wallet-balance-card">

        <div className="wallet-balance-top">
          <div>
            <span>Current Pending Balance</span>

            <strong>₹24,500</strong>
          </div>

          <div className="balance-wallet-icon">
            ₹
          </div>
        </div>

        <div className="balance-divider"></div>

        <div className="balance-footer">

          <div>
            <span>Trips Completed Today</span>
            <strong>12</strong>
          </div>

          <div>
            <span>Total Accepted Trips</span>
            <strong>148</strong>
          </div>

        </div>

      </section>


      {/* Settlement Plan */}
      <section className="settlement-section">

        <div className="wallet-section-heading">

          <div>
            <span>SETTLEMENT</span>
            <h2>Choose Settlement Plan</h2>
          </div>

        </div>


        {/* Weekly */}
        <button
          type="button"
          className={
            selectedPlan === "weekly"
              ? "settlement-option selected"
              : "settlement-option"
          }
          onClick={() => setSelectedPlan("weekly")}
        >

          <div className="settlement-option-icon weekly-icon">
            ↗
          </div>

          <div className="settlement-option-content">

            <strong>Weekly Settlement</strong>

            <p>
              Settle your completed trips every week.
            </p>

          </div>

          <span className="settlement-radio">
            {selectedPlan === "weekly" && (
              <i></i>
            )}
          </span>

        </button>


        {/* Monthly */}
        <button
          type="button"
          className={
            selectedPlan === "monthly"
              ? "settlement-option selected"
              : "settlement-option"
          }
          onClick={() => setSelectedPlan("monthly")}
        >

          <div className="settlement-option-icon monthly-icon">
            ◷
          </div>

          <div className="settlement-option-content">

            <strong>Monthly Subscription</strong>

            <p>
              Manage settlements with a monthly plan.
            </p>

          </div>

          <span className="settlement-radio">
            {selectedPlan === "monthly" && (
              <i></i>
            )}
          </span>

        </button>

      </section>


      {/* Selected Plan Summary */}
      <section className="wallet-summary-card">

        <div className="summary-heading">
          <span>SELECTED PLAN</span>

          <strong>
            {selectedPlan === "weekly"
              ? "Weekly Settlement"
              : "Monthly Subscription"}
          </strong>
        </div>


        {selectedPlan === "weekly" ? (
          <div className="summary-row">

            <div>
              <span>Available Balance</span>
              <strong>₹24,500</strong>
            </div>

            <div>
              <span>Settlement Cycle</span>
              <strong>Weekly</strong>
            </div>

          </div>
        ) : (
          <div className="summary-row">

            <div>
              <span>Subscription</span>
              <strong>₹2,499</strong>
            </div>

            <div>
              <span>Billing</span>
              <strong>Monthly</strong>
            </div>

          </div>
        )}

      </section>


      {/* Continue */}
      <button
        type="button"
        className="wallet-continue-button"
        onClick={handleContinue}
      >
        Continue to Payment

        <span>→</span>
      </button>


      <div className="wallet-secure-note">
        <span>🔒</span>
        Secure settlement powered by BIXOO
      </div>

    </div>
  );
}

export default Wallet;