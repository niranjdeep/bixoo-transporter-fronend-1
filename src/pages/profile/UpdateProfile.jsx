import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UpdateProfile.css";

function UpdateProfile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    businessName: "Ramesh Logistics",
    ownerName: "Ramesh Kumar",
    contact: "",
    operationalReach: "Tamil Nadu",
    panState: "Tamil Nadu",
    vehicleType: "20ft Open Truck",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedProfile = localStorage.getItem("transporter_profile");

    if (savedProfile) {
      try {
        const data = JSON.parse(savedProfile);

        setProfile((prev) => ({
          ...prev,
          businessName: data.businessName || prev.businessName,
          ownerName: data.ownerName || data.name || prev.ownerName,
          contact: data.contact || data.mobile || prev.contact,
          operationalReach:
            data.operationalReach || data.city || prev.operationalReach,
          panState: data.panState || data.state || prev.panState,
          vehicleType: data.vehicleType || prev.vehicleType,
        }));
      } catch (error) {
        console.error("Profile data error:", error);
      }
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

    const existingProfile = JSON.parse(
      localStorage.getItem("transporter_profile") || "{}"
    );

    const updatedProfile = {
      ...existingProfile,
      ...profile,
      name: profile.ownerName,
      mobile: profile.contact,
      city: profile.operationalReach,
      state: profile.panState,
      vehicleType: profile.vehicleType,
    };

    localStorage.setItem(
      "transporter_profile",
      JSON.stringify(updatedProfile)
    );

    setMessage("Profile updated successfully.");

    setTimeout(() => {
      navigate("/profile");
    }, 1200);
  };

  return (
    <div className="update-profile-page">

      <div className="update-profile-header">
        <button
          className="back-btn"
          onClick={() => navigate("/profile")}
        >
          ←
        </button>

        <div>
          <span className="update-label">ACCOUNT SETTINGS</span>
          <h1>Update Profile</h1>
          <p>
            Update your business and transporter information.
          </p>
        </div>
      </div>

      <form
        className="update-profile-card"
        onSubmit={handleSave}
      >

        <div className="update-section">
          <div className="update-section-heading">
            <span className="section-icon">◉</span>

            <div>
              <h2>Business Information</h2>
              <p>Basic transporter business details.</p>
            </div>
          </div>

          <div className="update-form-grid">

            <div className="update-form-group">
              <label>Business Name</label>

              <input
                type="text"
                name="businessName"
                value={profile.businessName}
                onChange={handleChange}
                placeholder="Enter business name"
              />
            </div>

            <div className="update-form-group">
              <label>Owner Name</label>

              <input
                type="text"
                name="ownerName"
                value={profile.ownerName}
                onChange={handleChange}
                placeholder="Enter owner name"
              />
            </div>

            <div className="update-form-group full-width">
              <label>Contact Information</label>

              <input
                type="text"
                name="contact"
                value={profile.contact}
                onChange={handleChange}
                placeholder="Enter mobile number"
                maxLength={10}
              />
            </div>

          </div>
        </div>

        <div className="update-divider"></div>

        <div className="update-section">

          <div className="update-section-heading">
            <span className="section-icon">⌖</span>

            <div>
              <h2>Operational Details</h2>
              <p>Set your operating area and vehicle information.</p>
            </div>
          </div>

          <div className="update-form-grid">

            <div className="update-form-group">
              <label>Operational Reach</label>

              <input
                type="text"
                name="operationalReach"
                value={profile.operationalReach}
                onChange={handleChange}
                placeholder="Example: Tamil Nadu"
              />
            </div>

            <div className="update-form-group">
              <label>PAN State</label>

              <input
                type="text"
                name="panState"
                value={profile.panState}
                onChange={handleChange}
                placeholder="Enter state"
              />
            </div>

            <div className="update-form-group full-width">
              <label>Primary Vehicle Type</label>

              <input
                type="text"
                name="vehicleType"
                value={profile.vehicleType}
                onChange={handleChange}
                placeholder="Example: 20ft Open Truck"
              />
            </div>

          </div>
        </div>

        {message && (
          <div className="update-success">
            ✓ {message}
          </div>
        )}

        <div className="update-actions">

          <button
            type="button"
            className="update-cancel-btn"
            onClick={() => navigate("/profile")}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="update-save-btn"
          >
            Save Changes
          </button>

        </div>

      </form>
    </div>
  );
}

export default UpdateProfile;