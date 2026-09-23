import "./Wallet.css";

function Wallet() {
  const transactions = [
    {
      id: "SET-1004",
      tripId: "TRIP-LD001",
      date: "22 Sep 2026",
      route: "Mumbai → Pune",
      amount: "₹18,500",
      status: "Pending",
    },
    {
      id: "SET-1003",
      tripId: "TRIP-1002",
      date: "20 Sep 2026",
      route: "Chennai → Bengaluru",
      amount: "₹28,500",
      status: "Settled",
    },
    {
      id: "SET-1002",
      tripId: "TRIP-1001",
      date: "18 Sep 2026",
      route: "Coimbatore → Madurai",
      amount: "₹16,500",
      status: "Settled",
    },
  ];

  return (
    <div className="wallet-page">

      {/* Header */}
      <div className="wallet-header">
        <div>
          <p className="wallet-label">TRANSPORTER WALLET</p>
          <h1>Earnings & Settlements</h1>
          <p>
            Track your completed-trip earnings, pending settlements and payment history.
          </p>
        </div>

        <div className="wallet-header-icon">₹</div>
      </div>

      {/* Summary Cards */}
      <div className="wallet-summary">

        <div className="wallet-stat">
          <div className="wallet-stat-top">
            <span className="wallet-stat-title">Total Earnings</span>
            <span className="wallet-stat-icon">₹</span>
          </div>
          <h2>₹63,500</h2>
          <small>All completed trips</small>
        </div>

        <div className="wallet-stat pending">
          <div className="wallet-stat-top">
            <span className="wallet-stat-title">Pending Settlement</span>
            <span className="wallet-stat-icon">◷</span>
          </div>
          <h2>₹18,500</h2>
          <small>Awaiting settlement</small>
        </div>

        <div className="wallet-stat settled">
          <div className="wallet-stat-top">
            <span className="wallet-stat-title">Settled Earnings</span>
            <span className="wallet-stat-icon">✓</span>
          </div>
          <h2>₹45,000</h2>
          <small>Successfully settled</small>
        </div>

      </div>

      {/* Balance */}
      <div className="balance-card">
        <div>
          <p className="balance-label">AVAILABLE BALANCE</p>
          <h2>₹45,000</h2>
          <span>Ready for settlement</span>
        </div>

        <button
          className="withdraw-btn"
          onClick={() => alert("Withdrawal feature will be connected later.")}
        >
          Withdraw →
        </button>
      </div>

      {/* Content */}
      <div className="wallet-content">

        {/* Transactions */}
        <div className="transaction-card">

          <div className="section-heading">
            <div>
              <h2>Settlement History</h2>
              <p>Your recent earnings and settlement transactions.</p>
            </div>

            <button className="view-all-btn">
              View All
            </button>
          </div>

          <div className="transaction-list">

            {transactions.map((transaction) => (
              <div className="transaction-row" key={transaction.id}>

                <div className="transaction-icon">
                  ₹
                </div>

                <div className="transaction-info">
                  <strong>{transaction.id}</strong>
                  <span>{transaction.tripId}</span>
                  <small>
                    {transaction.date} • {transaction.route}
                  </small>
                </div>

                <div className="transaction-amount">
                  <strong>{transaction.amount}</strong>

                  <span
                    className={
                      transaction.status === "Settled"
                        ? "status settled-status"
                        : "status pending-status"
                    }
                  >
                    {transaction.status}
                  </span>
                </div>

              </div>
            ))}

          </div>
        </div>

        {/* Recent Completed Trip */}
        <div className="recent-trip-card">

          <div className="section-heading">
            <div>
              <h2>Recent Completed Trip</h2>
              <p>Latest trip added to your earnings.</p>
            </div>
          </div>

          <div className="recent-trip-route">
            <div className="route-point">
              <span className="route-dot pickup-dot"></span>
              <div>
                <small>PICKUP</small>
                <strong>Mumbai, MH</strong>
              </div>
            </div>

            <div className="route-line"></div>

            <div className="route-point">
              <span className="route-dot delivery-dot"></span>
              <div>
                <small>DELIVERY</small>
                <strong>Pune, MH</strong>
              </div>
            </div>
          </div>

          <div className="trip-earnings">
            <span>Trip Earnings</span>
            <strong>₹18,500</strong>
          </div>

          <div className="trip-status">
            <span>✓</span>
            Trip Completed
          </div>

        </div>

      </div>

    </div>
  );
}

export default Wallet;