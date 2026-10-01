import { useState } from "react";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import api from "../../services/api";
import { errorMessage } from "../../services/session";
import Button from "../../components/ui/Button";

import "./onboarding.css";
=======

import "./Onboarding.css";
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e

function Onboarding() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
<<<<<<< HEAD
    password: "",
=======
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
    vehicleType: "",
    vehicleNumber: "",
    capacity: "",
    city: "",
    state: "",
  });
<<<<<<< HEAD
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
=======
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

<<<<<<< HEAD
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loading) return;
    setError("");
    if (formData.password !== confirmPassword) { setError("Passwords do not match."); return; }
    setLoading(true);
    try {
      await api.post("/auth/register", formData, { skipAuth: true });
      navigate("/login", { replace: true, state: { notice: "Registration successful. Sign in with the email and password you just registered." } });
    } catch (err) { setError(errorMessage(err)); }
    finally { setLoading(false); }
=======
  const handleSubmit = (event) => {
    event.preventDefault();

    localStorage.setItem(
      "transporter_profile",
      JSON.stringify(formData)
    );

    navigate("/dashboard");
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
  };

  return (
    <div className="onboarding-page">

      <div className="onboarding-card">

        <div className="onboarding-header">
          <div className="onboarding-logo">
            BIXOO
          </div>

          <p>Transporter Registration</p>

          <h1>Let's get you started</h1>

          <span>
            Enter your details to create your transporter profile.
          </span>
        </div>

        <form onSubmit={handleSubmit}>
<<<<<<< HEAD
          {error && <p className="registration-error" role="alert">{error}</p>}
=======
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e

          <div className="form-section">

            <h3>Personal Details</h3>

            <div className="form-grid">

              <div className="form-field">
<<<<<<< HEAD
                <label htmlFor="onboarding-name">Full Name</label>

              <input id="onboarding-name"
=======
                <label>Full Name</label>

                <input
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
<<<<<<< HEAD
                <label htmlFor="onboarding-mobile">Mobile Number</label>

              <input id="onboarding-mobile"
=======
                <label>Mobile Number</label>

                <input
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
                  name="mobile"
                  type="tel"
                  placeholder="Enter mobile number"
                  maxLength="10"
<<<<<<< HEAD
                  pattern="[0-9]{10}"
                  autoComplete="tel-national"
=======
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
                  value={formData.mobile}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      mobile: event.target.value.replace(/\D/g, ""),
                    })
                  }
                  required
                />
              </div>

              <div className="form-field full-width">
<<<<<<< HEAD
                <label htmlFor="onboarding-email">Email Address</label>

              <input id="onboarding-email"
                  name="email"
                  type="email"
                  autoComplete="email"
=======
                <label>Email Address</label>

                <input
                  name="email"
                  type="email"
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

          </div>


          <div className="form-section">

<<<<<<< HEAD
            <h3>Account Security</h3>
            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="registration-password">Password</label>
                <input id="registration-password" name="password" type="password" autoComplete="new-password" minLength={8} maxLength={128} value={formData.password} onChange={handleChange} required />
                <small>Use at least 8 characters.</small>
              </div>
              <div className="form-field">
                <label htmlFor="registration-confirm-password">Confirm Password</label>
                <input id="registration-confirm-password" type="password" autoComplete="new-password" minLength={8} maxLength={128} value={confirmPassword} onChange={event => setConfirmPassword(event.target.value)} required />
              </div>
            </div>
          </div>
          <div className="form-section">
=======
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
            <h3>Transport Details</h3>

            <div className="form-grid">

              <div className="form-field">
<<<<<<< HEAD
                <label htmlFor="onboarding-vehicleType">Vehicle Type</label>

              <select id="onboarding-vehicleType"
=======
                <label>Vehicle Type</label>

                <select
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select vehicle type
                  </option>

                  <option value="Mini Truck">
                    Mini Truck
                  </option>

                  <option value="Truck">
                    Truck
                  </option>

                  <option value="Container">
                    Container
                  </option>

                  <option value="Lorry">
                    Lorry
                  </option>

                  <option value="Trailer">
                    Trailer
                  </option>
                </select>
              </div>

              <div className="form-field">
<<<<<<< HEAD
                <label htmlFor="onboarding-vehicleNumber">Vehicle Number</label>

              <input id="onboarding-vehicleNumber"
=======
                <label>Vehicle Number</label>

                <input
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
                  name="vehicleNumber"
                  type="text"
                  placeholder="TN 00 AB 0000"
                  value={formData.vehicleNumber}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
<<<<<<< HEAD
                <label htmlFor="onboarding-capacity">Vehicle Capacity</label>

              <select id="onboarding-capacity"
=======
                <label>Vehicle Capacity</label>

                <select
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select capacity
                  </option>

                  <option value="1-5 Tons">
                    1 - 5 Tons
                  </option>

                  <option value="5-10 Tons">
                    5 - 10 Tons
                  </option>

                  <option value="10-20 Tons">
                    10 - 20 Tons
                  </option>

                  <option value="20+ Tons">
                    20+ Tons
                  </option>
                </select>
              </div>

            </div>

          </div>


          <div className="form-section">

            <h3>Location</h3>

            <div className="form-grid">

              <div className="form-field">
<<<<<<< HEAD
                <label htmlFor="onboarding-city">City</label>

              <input id="onboarding-city"
=======
                <label>City</label>

                <input
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
                  name="city"
                  type="text"
                  placeholder="Enter city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
<<<<<<< HEAD
                <label htmlFor="onboarding-state">State</label>

              <input id="onboarding-state"
=======
                <label>State</label>

                <input
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
                  name="state"
                  type="text"
                  placeholder="Enter state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

          </div>


<<<<<<< HEAD
          <div style={{ marginTop: "32px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="lg"
              loading={loading}
              loadingText="Creating account..."
            >
              Create Account
            </Button>

            <p className="login-link" style={{ textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
              Already have an account?

              <Button
                variant="link"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            </p>
          </div>
=======
          <button
            type="submit"
            className="onboarding-submit"
          >
            Continue →
          </button>

          <p className="login-link">
            Already have an account?

            <button
              type="button"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </p>

>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
        </form>

      </div>

    </div>
  );
}

<<<<<<< HEAD
export default Onboarding;
=======
export default Onboarding;
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
