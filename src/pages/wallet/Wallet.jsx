<<<<<<< HEAD
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../components/Icon";
import PageHeader from "../../components/ui/PageHeader";
import Button from "../../components/ui/Button";
import api from "../../services/api";
=======
import { useState } from "react";
import { useNavigate } from "react-router-dom";
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
import "./Wallet.css";

function Wallet() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState("weekly");
<<<<<<< HEAD
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const res = await api.get("/transporter/wallet");
        if (res.data) {
          setWallet(res.data);
        }
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
    if (selectedPlan === "weekly") {
      navigate("/wallet/weekly-settlement");
    } else {
      navigate("/wallet/secure-payment");
    }
  };

  return (
<<<<<<< HEAD
    <div className="wallet-page ui-page">
      <PageHeader eyebrow="TRANSPORTER WALLET" title="Wallet" description="Manage your earnings and settlements." />
      
      {loading ? (
        <section className="wallet-balance-card" aria-label="Wallet summary">
          <p style={{ color: "white", padding: "20px" }}>Loading wallet...</p>
        </section>
      ) : (
        <section className="wallet-balance-card" aria-label="Wallet summary">
          <div className="wallet-balance-top">
            <span className="balance-wallet-icon"><Icon name="wallet" size={28} /></span>
            <div>
              <span>Current Pending Balance</span>
              <strong>{wallet?.pending_amount ? `₹${Number(wallet.pending_amount).toLocaleString()}` : "₹0"}</strong>
            </div>
          </div>
          <div className="balance-footer">
            <div>
              <span>Available Balance</span>
              <strong>{wallet?.available_balance ? `₹${Number(wallet.available_balance).toLocaleString()}` : "₹0"}</strong>
            </div>
            <div>
              <span>Total Earnings</span>
              <strong>{wallet?.total_earnings ? `₹${Number(wallet.total_earnings).toLocaleString()}` : "₹0"}</strong>
            </div>
          </div>
        </section>
      )}

      <div className="wallet-plan-layout">
        <section className="settlement-section">
          <div className="wallet-section-heading">
            <span className="ui-eyebrow">SETTLEMENT</span>
            <h2>Choose Settlement Plan</h2>
            <p>Select the plan that works for your business.</p>
          </div>
          <fieldset className="settlement-options">
            <legend className="sr-only">Settlement plan</legend>
            {[
              {id:"weekly", title:"Weekly Settlement", description:"Settle your completed trips every week.", icon:"calendar"},
              {id:"monthly", title:"Monthly Subscription", description:"Manage settlements with a monthly plan.", icon:"clock"}
            ].map(plan => (
              <label key={plan.id} className={`settlement-option ${selectedPlan === plan.id ? "selected" : ""}`}>
                <span className="settlement-option-icon"><Icon name={plan.icon} size={24} /></span>
                <div className="settlement-option-info">
                  <strong>{plan.title}</strong>
                  <span>{plan.description}</span>
                </div>
                <input type="radio" name="plan" value={plan.id} checked={selectedPlan === plan.id} onChange={(e) => setSelectedPlan(e.target.value)} className="sr-only" />
                <span className="radio-circle"></span>
              </label>
            ))}
          </fieldset>
        </section>
        
        <section className="wallet-action-section">
          <div className="wallet-transactions">
            <h3>Recent Transactions</h3>
            {loading ? (
              <p style={{ padding: "20px" }}>Loading transactions...</p>
            ) : wallet?.transactions?.length > 0 ? (
              <ul style={{ listStyle: "none", padding: 0 }}>
                {wallet.transactions.map((t, idx) => (
                  <li key={idx} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid var(--border)" }}>
                    <div>
                      <strong style={{ display: "block" }}>{t.transaction_type}</strong>
                      <small style={{ color: "var(--text-muted)" }}>{t.reference_id || "No Reference"}</small>
                    </div>
                    <strong style={{ color: t.transaction_type === 'CREDIT' ? 'var(--success)' : 'inherit' }}>
                      {t.transaction_type === 'CREDIT' ? '+' : '-'}₹{Number(t.amount).toLocaleString()}
                    </strong>
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ color: "var(--text-muted)", padding: "20px 0" }}>No wallet transactions yet.</p>
            )}
          </div>
          
          <Button 
            variant="primary" 
            className="wallet-continue-btn" 
            onClick={handleContinue} 
            aria-label="Continue with selected plan"
            icon="arrow"
            iconPosition="right"
          >
            Continue
          </Button>
        </section>
      </div>
=======
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

>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
    </div>
  );
}

<<<<<<< HEAD
export default Wallet;
=======
export default Wallet;
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
