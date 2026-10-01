<<<<<<< HEAD
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../components/Icon";
import Button from "../../components/ui/Button";
import api from "../../services/api";
=======
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
import "./UpdateProfile.css";

function UpdateProfile() {
  const navigate = useNavigate();
<<<<<<< HEAD
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    company_name: "",
    city: "",
    state: "",
  });

  useEffect(() => {
    let active = true;
    api.get("/transporter/profile")
      .then(res => {
        if (active) {
          setFormData({
            company_name: res.data.company_name || "",
            city: res.data.city || "",
            state: res.data.state || "",
          });
          setLoading(false);
        }
      })
      .catch(err => {
        if (active) {
          setError("Failed to load profile. Please try again.");
          setLoading(false);
        }
      });
    return () => { active = false; };
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await api.patch("/transporter/profile", formData);
      navigate("/profile");
    } catch (err) {
      setError("Failed to update profile. Check your connection.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="update-profile-page ui-page">
        <p style={{ padding: "40px", textAlign: "center" }}>Loading...</p>
      </div>
    );
  }

  return (
    <div className="update-profile-page ui-page">
      <div className="update-page-content">
        <div className="update-header-section">
          <Button
            variant="ghost"
            icon="arrowLeft"
            size="lg"
            aria-label="Go back"
            onClick={() => navigate(-1)}
            style={{ padding: "8px", width: "42px", height: "42px", borderRadius: "10px" }}
          />
          <div>
            <h1>Edit Profile</h1>
            <p>Update your business information and reach.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="update-form">
          <div className="form-section">
            <h2>Business Details</h2>
            <div className="form-group">
              <label htmlFor="company_name">Company Name</label>
              <input
                id="company_name"
                name="company_name"
                type="text"
                placeholder="E.g. XYZ Transports"
                value={formData.company_name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-section">
            <h2>Location</h2>
            <div className="form-grid-2">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  placeholder="E.g. Coimbatore"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="state">State</label>
                <input
                  id="state"
                  name="state"
                  type="text"
                  placeholder="E.g. Tamil Nadu"
                  value={formData.state}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="form-error-message">
              {error}
            </div>
          )}

          <div className="form-actions-grid" style={{ marginTop: "32px" }}>
            <Button type="submit" variant="primary" size="lg" loading={saving} loadingText="Saving...">
              Save Changes
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
=======

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
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
    </div>
  );
}

<<<<<<< HEAD
export default UpdateProfile;
=======
export default UpdateProfile;
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
