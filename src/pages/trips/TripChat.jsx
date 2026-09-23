import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./TripChat.css";

function TripChat() {
  const { tripId } = useParams();
  const navigate = useNavigate();

  const [trip, setTrip] = useState(null);
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "consignee",
      text: "Please share your current location and ETA.",
      time: "10:42 AM",
    },
    {
      id: 2,
      sender: "transporter",
      text: "I am currently near Pune Highway.",
      time: "10:45 AM",
    },
  ]);

  useEffect(() => {
    const savedTrip = localStorage.getItem("active_trip");

    if (savedTrip) {
      setTrip(JSON.parse(savedTrip));
    }
  }, []);

  const sendMessage = () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) return;

    const newMessage = {
      id: Date.now(),
      sender: "transporter",
      text: trimmedMessage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage("");
  };

  const sendQuickMessage = (text) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "transporter",
        text,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  if (!trip) {
    return (
      <div className="trip-chat-page">
        <div className="chat-empty">
          <h2>Trip not found</h2>
          <button onClick={() => navigate("/trips")}>
            Back to My Trips
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="trip-chat-page">

      {/* Header */}
      <div className="chat-header">
        <div className="chat-header-left">
          <button
            className="back-btn"
            onClick={() => navigate(`/trips/${tripId}/live`)}
          >
            ←
          </button>

          <div>
            <p className="chat-label">TRIP COMMUNICATION</p>
            <h1>Direct Chat</h1>
            <p className="chat-trip-id">{trip.tripId}</p>
          </div>
        </div>

        <div className="chat-status">
          <span></span>
          Consignee Online
        </div>
      </div>

      <div className="chat-layout">

        {/* Chat Section */}
        <div className="chat-card">

          <div className="contact-header">
            <div className="contact-avatar">
              C
            </div>

            <div>
              <h2>Consignee</h2>
              <p>Online • Available for coordination</p>
            </div>

            <button
              className="call-btn"
              onClick={() => alert("Calling consignee...")}
            >
              ☎ Call
            </button>
          </div>

          <div className="messages-area">

            <div className="date-divider">
              <span>Today</span>
            </div>

            {messages.map((item) => (
              <div
                key={item.id}
                className={`message-row ${
                  item.sender === "transporter"
                    ? "sent"
                    : "received"
                }`}
              >
                <div className="message-bubble">
                  <p>{item.text}</p>
                  <small>{item.time}</small>
                </div>
              </div>
            ))}

          </div>

          {/* Quick Messages */}
          <div className="quick-section">
            <p>Quick Messages</p>

            <div className="quick-buttons">
              <button
                onClick={() =>
                  sendQuickMessage(
                    "I am on the way. Current ETA is 1 hour 45 minutes."
                  )
                }
              >
                🚚 On the way
              </button>

              <button
                onClick={() =>
                  sendQuickMessage(
                    "I will reach the delivery location shortly."
                  )
                }
              >
                📍 Reaching soon
              </button>

              <button
                onClick={() =>
                  sendQuickMessage(
                    "Please keep the unloading bay ready."
                  )
                }
              >
                🏭 Keep bay ready
              </button>

              <button
                onClick={() =>
                  sendQuickMessage(
                    "There is a delay due to traffic."
                  )
                }
              >
                ⚠ Traffic delay
              </button>
            </div>
          </div>

          {/* Message Input */}
          <div className="message-input-area">
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              rows="1"
            />

            <button
              className="send-btn"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>

        </div>

        {/* Coordination Panel */}
        <div className="coordination-panel">

          <div className="coord-card">
            <h3>Trip Information</h3>

            <div className="coord-row">
              <span>Pickup</span>
              <strong>
                {trip.pickupLocation || "Mumbai, MH"}
              </strong>
            </div>

            <div className="coord-row">
              <span>Delivery</span>
              <strong>
                {trip.deliveryLocation || "Pune, MH"}
              </strong>
            </div>

            <div className="coord-row">
              <span>Load</span>
              <strong>
                {trip.loadType || "Wheat"}
              </strong>
            </div>

            <div className="coord-row">
              <span>Vehicle</span>
              <strong>
                {trip.vehicle || "20ft Truck"}
              </strong>
            </div>
          </div>

          <div className="coord-card">
            <h3>Share Information</h3>

            <button
              className="share-action"
              onClick={() =>
                alert("Live location shared with consignee.")
              }
            >
              <span className="action-icon">📍</span>
              <div>
                <strong>Share Live Location</strong>
                <small>Send current GPS location</small>
              </div>
              <span>→</span>
            </button>

            <button
              className="share-action"
              onClick={() =>
                alert("ETA shared with consignee.")
              }
            >
              <span className="action-icon">⏱</span>
              <div>
                <strong>Share ETA</strong>
                <small>Estimated arrival time</small>
              </div>
              <span>→</span>
            </button>

            <button
              className="share-action"
              onClick={() =>
                alert("Gate photo upload will be connected later.")
              }
            >
              <span className="action-icon">📷</span>
              <div>
                <strong>Gate Photo</strong>
                <small>Share delivery gate photo</small>
              </div>
              <span>→</span>
            </button>

            <button
              className="share-action"
              onClick={() =>
                alert("E-Way Bill sharing will be connected later.")
              }
            >
              <span className="action-icon">📄</span>
              <div>
                <strong>E-Way Bill</strong>
                <small>Share logistics document</small>
              </div>
              <span>→</span>
            </button>
          </div>

          <div className="help-card">
            <span>!</span>

            <div>
              <strong>Need assistance?</strong>
              <p>
                Contact BIXOO support if you face any issue
                during your trip.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default TripChat;