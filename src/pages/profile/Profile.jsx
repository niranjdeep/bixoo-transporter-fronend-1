import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Profile.css";

function Profile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "",
    mobile: "",
    email: "",
    vehicleType: "",
    vehicleNumber: "",
    capacity: "",
    city: "",
    state: "",
  });

  const [isOnline, setIsOnline] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedProfile = localStorage.getItem("transporter_profile");
    const savedStatus = localStorage.getItem("transporter_status");

    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }

    if (savedStatus === "online") {
      setIsOnline(true);
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = (event) => {
    event.preventDefault();

    localStorage.setItem(
      "transporter_profile",
      JSON.stringify(profile)
    );

    setMessage("Profile updated successfully.");

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  const handleAvailability = () => {
    const newStatus = !isOnline;

    setIsOnline(newStatus);

    localStorage.setItem(
      "transporter_status",
      newStatus ? "online" : "offline"
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("transporter_mobile");
    localStorage.removeItem("transporter_status");

    navigate("/login");
  };

  return (
    <div className="profile-page">

      {/* Header */}
      <div className="profile-header">
        <div>
          <p className="page-label">TRANSPORTER ACCOUNT</p>
          <h1>Profile</h1>
          <p className="page-description">
            Manage your personal details, vehicle information and availability.
          </p>
        </div>

        <button
          className={`availability-btn ${
            isOnline ? "online" : "offline"
          }`}
          onClick={handleAvailability}
        >
          <span className="status-dot"></span>
          {isOnline ? "ONLINE" : "OFFLINE"}
        </button>
      </div>

      {/* Availability Card */}
      <div className="availability-card">
        <div className="availability-icon">
          {isOnline ? "✓" : "○"}
        </div>

        <div className="availability-content">
          <h2>
            You are currently{" "}
            <span className={isOnline ? "text-online" : "text-offline"}>
              {isOnline ? "Online" : "Offline"}
            </span>
          </h2>

          <p>
            {isOnline
              ? "You can receive available loads and direct match opportunities."
              : "Go online to receive available loads and direct match opportunities."}
          </p>
        </div>

        <button
          className={`toggle-btn ${isOnline ? "active" : ""}`}
          onClick={handleAvailability}
        >
          <span></span>
        </button>
      </div>

      <div className="profile-layout">

        {/* Profile Form */}
        <div className="profile-card">

          <div className="card-heading">
            <div>
              <h2>Personal Information</h2>
              <p>Keep your transporter account details updated.</p>
            </div>

            <div className="profile-avatar">
              {profile.name
                ? profile.name.charAt(0).toUpperCase()
                : "T"}
            </div>
          </div>

          <form onSubmit={handleSave}>

            <div className="form-grid">

              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Mobile Number</label>
                <input
                  type="text"
                  name="mobile"
                  value={profile.mobile}
                  onChange={handleChange}
                  placeholder="Enter mobile number"
                  maxLength={10}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                />
              </div>

              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={profile.city}
                  onChange={handleChange}
                  placeholder="Enter city"
                />
              </div>

              <div className="form-group">
                <label>State</label>
                <input
                  type="text"
                  name="state"
                  value={profile.state}
                  onChange={handleChange}
                  placeholder="Enter state"
                />
              </div>

            </div>

            <div className="section-divider"></div>

            <div className="vehicle-heading">
              <h2>Vehicle Information</h2>
              <p>Details used for matching suitable loads.</p>
            </div>

            <div className="form-grid">

              <div className="form-group">
                <label>Vehicle Type</label>
                <input
                  type="text"
                  name="vehicleType"
                  value={profile.vehicleType}
                  onChange={handleChange}
                  placeholder="Example: 20ft Open Truck"
                />
              </div>

              <div className="form-group">
                <label>Vehicle Number</label>
                <input
                  type="text"
                  name="vehicleNumber"
                  value={profile.vehicleNumber}
                  onChange={handleChange}
                  placeholder="Example: TN 01 AB 1234"
                />
              </div>

              <div className="form-group">
                <label>Load Capacity</label>
                <input
                  type="text"
                  name="capacity"
                  value={profile.capacity}
                  onChange={handleChange}
                  placeholder="Example: 20 Tons"
                />
              </div>

            </div>

            {message && (
              <div className="success-message">
                ✓ {message}
              </div>
            )}

            <div className="form-actions">
              <button
                type="button"
                className="secondary-btn"
                onClick={() => navigate("/dashboard")}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="save-btn"
              >
                Save Changes
              </button>
            </div>

          </form>
        </div>

        {/* Right Side */}
        <div className="profile-side">

          <div className="side-card">
            <div className="side-card-icon">🚚</div>

            <h3>Transporter Status</h3>

            <div className="status-row">
              <span>Availability</span>

              <strong className={isOnline ? "online-text" : "offline-text"}>
                {isOnline ? "Online" : "Offline"}
              </strong>
            </div>

            <div className="status-row">
              <span>Vehicle</span>
              <strong>
                {profile.vehicleNumber || "Not Added"}
              </strong>
            </div>

            <div className="status-row">
              <span>Capacity</span>
              <strong>
                {profile.capacity || "Not Added"}
              </strong>
            </div>
          </div>

          <div className="side-card quick-card">
            <h3>Quick Access</h3>

            <button onClick={() => navigate("/loads")}>
              <span>Available Loads</span>
              <span>→</span>
            </button>

            <button onClick={() => navigate("/trips")}>
              <span>My Trips</span>
              <span>→</span>
            </button>

            <button onClick={() => navigate("/wallet")}>
              <span>Wallet</span>
              <span>→</span>
            </button>
          </div>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            ↪ Logout
          </button>

        </div>

      </div>
    </div>
  );
}

export default Profile;