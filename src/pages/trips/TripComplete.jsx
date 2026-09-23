import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function TripComplete() {
  const { tripId } = useParams();
  const navigate = useNavigate();

  const [trip, setTrip] = useState(null);

  useEffect(() => {
    const savedTrip = localStorage.getItem("active_trip");

    if (savedTrip) {
      setTrip(JSON.parse(savedTrip));
    }
  }, []);

  const handleWallet = () => {
    localStorage.removeItem("active_trip");
    navigate("/wallet");
  };

  if (!trip) {
    return (
      <div
        style={{
          padding: "40px",
          textAlign: "center",
        }}
      >
        <h2>Trip not found</h2>

        <button onClick={() => navigate("/trips")}>
          Back to My Trips
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background: "#f4f7fb",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          padding: "35px",
          background: "#ffffff",
          borderRadius: "16px",
          textAlign: "center",
          boxShadow: "0 4px 18px rgba(20,36,51,0.08)",
        }}
      >
        <div
          style={{
            width: "70px",
            height: "70px",
            margin: "0 auto 20px",
            borderRadius: "50%",
            background: "#e9f8ef",
            color: "#16834a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "32px",
          }}
        >
          ✓
        </div>

        <p
          style={{
            color: "#087db8",
            fontSize: "12px",
            fontWeight: "700",
            letterSpacing: "1px",
          }}
        >
          TRIP COMPLETED
        </p>

        <h1
          style={{
            marginTop: "8px",
            color: "#142433",
          }}
        >
          Trip Completed Successfully
        </h1>

        <p
          style={{
            marginTop: "10px",
            color: "#718096",
          }}
        >
          Your delivery has been completed successfully.
        </p>

        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            borderRadius: "10px",
            background: "#f7fafc",
            textAlign: "left",
          }}
        >
          <p>
            <strong>Trip ID:</strong> {trip.tripId || tripId}
          </p>

          <p style={{ marginTop: "10px" }}>
            <strong>Route:</strong>{" "}
            {trip.pickupLocation || "Mumbai, MH"} →{" "}
            {trip.deliveryLocation || "Pune, MH"}
          </p>

          <p style={{ marginTop: "10px" }}>
            <strong>Load:</strong>{" "}
            {trip.loadType || "Wheat"}
          </p>

          <p style={{ marginTop: "10px" }}>
            <strong>Earnings:</strong>{" "}
            ₹{trip.earnings || "18,500"}
          </p>
        </div>

        <div
          style={{
            marginTop: "25px",
            padding: "18px",
            borderRadius: "10px",
            background: "#fff9ed",
            textAlign: "left",
          }}
        >
          <strong>Settlement Status</strong>

          <p
            style={{
              marginTop: "7px",
              color: "#82745d",
              fontSize: "13px",
            }}
          >
            Your trip earnings have been added to the
            settlement process.
          </p>

          <p
            style={{
              marginTop: "8px",
              color: "#087db8",
              fontWeight: "700",
            }}
          >
            Pending Settlement
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            marginTop: "30px",
          }}
        >
          <button
            onClick={() => navigate("/trips")}
            style={{
              padding: "12px 20px",
              border: "1px solid #d7e0e7",
              borderRadius: "8px",
              background: "#ffffff",
              color: "#526372",
              cursor: "pointer",
            }}
          >
            My Trips
          </button>

          <button
            onClick={handleWallet}
            style={{
              padding: "12px 20px",
              border: "none",
              borderRadius: "8px",
              background: "#087db8",
              color: "#ffffff",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            View Wallet →
          </button>
        </div>
      </div>
    </div>
  );
}

export default TripComplete;