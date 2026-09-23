import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [mobile, setMobile] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (mobile.length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    localStorage.setItem("transporter_mobile", mobile);
    localStorage.setItem("transporter_logged_in", "true");

    navigate("/dashboard");
  };

  return (
    <div className="bixoo-login">

      {/* LEFT SIDE */}

      <section className="login-left">
        <div className="left-content">

          <div className="bixoo-logo">
            BIX<span>O</span>O
          </div>

          <div className="portal-name">
            Transporter Portal
          </div>

          <div className="tagline-small">
            DRIVE • DELIVER • GROW TOGETHER
          </div>

          <div className="hero-content">
            <h1>
              Your Journey
              <br />
              Drives <span>Possibilities</span>
            </h1>

            <p>
              Find loads. Manage trips.
              <br />
              Grow your transportation business.
            </p>
          </div>

          <div className="transport-visual">
            <div className="road"></div>

            <div className="truck">
              🚚
            </div>
          </div>

          <div className="benefits">

            <div className="benefit">
              <div className="benefit-icon">
                ▣
              </div>

              <div>
                <strong>Verified</strong>
                <small>Loads</small>
              </div>
            </div>

            <div className="benefit">
              <div className="benefit-icon">
                ✓
              </div>

              <div>
                <strong>Safe & Secure</strong>
                <small>Transactions</small>
              </div>
            </div>

            <div className="benefit">
              <div className="benefit-icon">
                ⌖
              </div>

              <div>
                <strong>Easy</strong>
                <small>Trip Management</small>
              </div>
            </div>

            <div className="benefit">
              <div className="benefit-icon">
                ↗
              </div>

              <div>
                <strong>Better</strong>
                <small>Opportunities</small>
              </div>
            </div>

          </div>

          <div className="left-footer">
            Connecting roads. Empowering transporters.
          </div>

        </div>
      </section>

      {/* RIGHT SIDE */}

      <section className="login-right">

        <div className="language">
          ◉ English⌄
        </div>

        <div className="login-card">

          <div className="card-logo">
            BIX<span>O</span>O
          </div>

          <p className="card-portal">
            Transporter Portal
          </p>

          <div className="welcome">
            <h2>
              Welcome Back
            </h2>

            <p>
              Login to continue your journey with BIXOO.
            </p>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="field">

              <div className="field-header">

                <label htmlFor="mobile">
                  Mobile Number
                </label>

                <button
                  type="button"
                  className="email-link"
                  onClick={() =>
                    alert("Email login will be connected later.")
                  }
                >
                  Use Email Instead
                </button>

              </div>

              <div className="mobile-field">

                <div className="country">
                  <span>🇮🇳</span>

                  <strong>
                    +91
                  </strong>

                  <span className="arrow">
                    ⌄
                  </span>
                </div>

                <input
                  id="mobile"
                  type="tel"
                  placeholder="Enter your mobile number"
                  value={mobile}
                  maxLength={10}
                  onChange={(event) => {
                    const value =
                      event.target.value.replace(/\D/g, "");

                    setMobile(value);
                  }}
                  required
                />

              </div>

            </div>

            <button
              type="submit"
              className="continue-btn"
            >
              <span>
                Continue
              </span>

              <span className="button-arrow">
                →
              </span>
            </button>

          </form>

          <div className="or-divider">
            <span></span>
            <p>or</p>
            <span></span>
          </div>

          <button
            type="button"
            className="whatsapp-btn"
            onClick={() =>
              alert("WhatsApp login will be connected later.")
            }
          >
            <span className="whatsapp-icon">
              ◉
            </span>

            <strong>
              Continue with WhatsApp
            </strong>

            <span className="wa-arrow">
              →
            </span>
          </button>

          <div className="register">

            <span>
              Don't have an account?
            </span>

            <button
              type="button"
              onClick={() =>
                navigate("/onboarding")
              }
            >
              Register
            </button>

          </div>

          <div className="security">

            <div>
              <span>✓</span>

              <small>
                Your Data
                <br />
                is Protected
              </small>
            </div>

            <div>
              <span>♙</span>

              <small>
                Secure
                <br />
                Platform
              </small>
            </div>

            <div>
              <span>♧</span>

              <small>
                Built for
                <br />
                Transporters
              </small>
            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Login;