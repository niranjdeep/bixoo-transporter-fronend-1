import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Onboarding.css";

function Onboarding() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    vehicleType: "",
    vehicleNumber: "",
    capacity: "",
    city: "",
    state: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    localStorage.setItem(
      "transporter_profile",
      JSON.stringify(formData)
    );

    navigate("/dashboard");
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

          <div className="form-section">

            <h3>Personal Details</h3>

            <div className="form-grid">

              <div className="form-field">
                <label>Full Name</label>

                <input
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label>Mobile Number</label>

                <input
                  name="mobile"
                  type="tel"
                  placeholder="Enter mobile number"
                  maxLength="10"
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
                <label>Email Address</label>

                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

          </div>


          <div className="form-section">

            <h3>Transport Details</h3>

            <div className="form-grid">

              <div className="form-field">
                <label>Vehicle Type</label>

                <select
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
                <label>Vehicle Number</label>

                <input
                  name="vehicleNumber"
                  type="text"
                  placeholder="TN 00 AB 0000"
                  value={formData.vehicleNumber}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label>Vehicle Capacity</label>

                <select
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
                <label>City</label>

                <input
                  name="city"
                  type="text"
                  placeholder="Enter city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label>State</label>

                <input
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

        </form>

      </div>

    </div>
  );
}

export default Onboarding;