import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();

  const profile = JSON.parse(
    localStorage.getItem("transporter_profile") || "{}"
  );

  return (
    <div className="profile-page">

      {/* Header */}
      <div className="profile-header">
        <div>
          <span className="profile-label">TRANSPORTER ACCOUNT</span>
          <h1>Profile</h1>
          <p>Manage your business, vehicle information and availability.</p>
        </div>

        <button
          className="profile-edit-button"
          onClick={() => navigate("/profile/update")}
        >
          ✎ Edit
        </button>
      </div>

      {/* Profile Identity */}
      <div className="profile-identity-card">
        <div className="profile-avatar">
          {(profile.businessName || "R").charAt(0).toUpperCase()}
        </div>

        <div className="profile-identity-info">
          <h2>
            {profile.businessName || "Ramesh Logistics"}
          </h2>

          <p>
            {profile.operationalReach || "Operational Reach"}
          </p>

          <div className="profile-verified">
            <span>✓</span>
            Verified Transporter UID
          </div>
        </div>
      </div>

      {/* Vehicle */}
      <section className="profile-section">
        <div className="profile-section-heading">
          <span>ACTIVE VEHICLE</span>
          <h2>Vehicle Information</h2>
        </div>

        <div className="profile-vehicle-card">
          <div className="vehicle-image">
            🚚
          </div>

          <div className="vehicle-details">
            <strong>
              {profile.vehicleType || "Taurus Open Truck"}
            </strong>

            <span>
              {profile.vehicleNumber || "TN 01 AB 1234"}
            </span>

            <small>
              {profile.capacity || "20 Tons"} Load Capacity
            </small>
          </div>

          <span className="vehicle-active">
            Active
          </span>
        </div>
      </section>

      {/* Statistics */}
      <section className="profile-section">
        <div className="profile-section-heading">
          <span>PERFORMANCE</span>
          <h2>Transporter Statistics</h2>
        </div>

        <div className="profile-stats">

          <div className="profile-stat-card">
            <strong>1,450+</strong>
            <span>Trips Completed</span>
          </div>

          <div className="profile-stat-card">
            <strong>4.8</strong>
            <span>Rating</span>
          </div>

          <div className="profile-stat-card">
            <strong>₹45,200</strong>
            <span>Active Balance</span>
          </div>

        </div>
      </section>

      {/* Documents */}
      <section className="profile-section">
        <div className="profile-section-heading">
          <span>VERIFICATION</span>
          <h2>Documents</h2>
        </div>

        <div className="profile-document-card">
          <div className="document-icon">✓</div>

          <div className="document-info">
            <strong>Driving License</strong>
            <span>Verified</span>
          </div>

          <div className="document-status">
            Verified
          </div>
        </div>

        <div className="profile-document-card">
          <div className="document-icon">✓</div>

          <div className="document-info">
            <strong>Aadhaar Card</strong>
            <span>Identity Proof</span>
          </div>

          <div className="document-status">
            Verified
          </div>
        </div>
      </section>

      {/* Support */}
      <section className="profile-section">
        <div className="profile-section-heading">
          <span>SUPPORT & HELP</span>
          <h2>Need Help?</h2>
        </div>

        <button className="profile-support-item">
          <div className="support-icon">?</div>

          <div>
            <strong>Help Center</strong>
            <span>Find answers to common questions</span>
          </div>

          <b>→</b>
        </button>

        <button className="profile-support-item">
          <div className="support-icon">☎</div>

          <div>
            <strong>Contact BIXOO Support</strong>
            <span>Get help from our support team</span>
          </div>

          <b>→</b>
        </button>

        <button className="profile-support-item">
          <div className="support-icon">i</div>

          <div>
            <strong>FAQs</strong>
            <span>Frequently asked questions</span>
          </div>

          <b>→</b>
        </button>
      </section>

      {/* Sign Out */}
      <button
        className="profile-signout"
        onClick={() => {
          localStorage.removeItem("transporter_status");
          navigate("/login");
        }}
      >
        Sign Out
      </button>

    </div>
  );
}

export default Profile;