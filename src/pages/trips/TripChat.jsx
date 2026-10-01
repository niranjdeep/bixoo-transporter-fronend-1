<<<<<<< HEAD
import Icon from "../../components/Icon";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import Button from "../../components/ui/Button";
=======
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
import "./TripChat.css";

function TripChat() {
  const navigate = useNavigate();
  const { tripId } = useParams();

  const [message, setMessage] = useState("");
<<<<<<< HEAD
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await api.get(`/transporter/chats/${tripId}/messages`);
        if (res.data) {
          const formatted = res.data.map(m => ({
            id: m.id,
            type: m.sender_type === "TRANSPORTER" ? "sent" : "received",
            text: m.message,
            time: new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }));
          setMessages(formatted);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (tripId) fetchMessages();
  }, [tripId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    // Optimistically update
    const tempMsg = {
      id: Date.now(),
      type: "sent",
      text: trimmedMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, tempMsg]);
    setMessage("");

    try {
      await api.post(`/transporter/chats/${tripId}/messages`, { message: trimmedMessage });
    } catch (err) {
      console.error(err);
      // Ideally remove optimistic message on failure
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
=======

  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "received",
      text: "Please share your current location once you reach the highway.",
      time: "10:32 AM",
    },
    {
      id: 2,
      type: "sent",
      text: "Sure. I will share the live location.",
      time: "10:34 AM",
    },
    {
      id: 3,
      type: "received",
      text: "Please send the gate photo when you reach the unloading point.",
      time: "10:36 AM",
    },
  ]);

  const sendMessage = () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: "sent",
        text: trimmedMessage,
        time: "Now",
      },
    ]);

    setMessage("");
  };

  const sendLiveLocation = () => {
    if (!navigator.geolocation) {
      alert("Location is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            type: "location",
            latitude,
            longitude,
            time: "Now",
          },
        ]);
      },
      () => {
        alert("Location permission was not granted.");
      }
    );
  };

  const sendGatePhoto = () => {
    document.getElementById("gate-photo-input")?.click();
  };

  const handleGatePhoto = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: "photo",
        image: imageUrl,
        time: "Now",
      },
    ]);

    event.target.value = "";
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
  };

  return (
    <div className="trip-chat-page">
<<<<<<< HEAD
      <header className="chat-header">
        <Button 
          variant="ghost" 
          size="lg" 
          icon="arrowLeft" 
          onClick={() => navigate(-1)} 
          style={{ padding: "8px", width: "42px", height: "42px", borderRadius: "10px" }}
        />

        <div className="chat-contact-info">
          <div className="chat-avatar">MM</div>
          <div>
            <strong>Trip #{tripId || "Support"}</strong>
            <span>Online</span>
          </div>
        </div>

        <Button 
          variant="ghost" 
          icon="phone" 
          aria-label="Call"
          style={{ padding: "8px", width: "42px", height: "42px", borderRadius: "10px" }}
        />
      </header>

      <div className="chat-messages-area">
        {loading ? (
          <p style={{ textAlign: "center", padding: "20px", color: "var(--text-muted)" }}>Loading messages...</p>
        ) : messages.length === 0 ? (
          <div className="empty-chat-state">
            <Icon name="chat" size={48} />
            <p>No messages yet.</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className={`chat-message ${msg.type}`}>
              <div className="message-bubble">{msg.text}</div>
              <span className="message-time">{msg.time}</span>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-area" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Button 
          variant="ghost" 
          icon="plus" 
          aria-label="Attach file" 
          style={{ padding: "8px", width: "42px", height: "42px", borderRadius: "10px" }}
        />

        <input
          type="text"
          className="chat-text-input"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{ flex: 1 }}
        />

        <Button
          variant="primary"
          icon="arrow"
          onClick={sendMessage}
          disabled={!message.trim()}
          aria-label="Send message"
          style={{ padding: "8px", width: "42px", height: "42px", borderRadius: "10px" }}
        />
      </div>
=======

      {/* Header */}
      <div className="trip-chat-header">

        <button
          className="trip-chat-back"
          onClick={() => navigate(`/trips/${tripId}`)}
        >
          ←
        </button>

        <div className="chat-header-info">
          <span>TRIP CHAT</span>
          <h1>Logistics Chat</h1>
          <p>Trip #{tripId || "TR-LD001"}</p>
        </div>

        <button
          className="chat-call-button"
          onClick={() => alert("Calling buyer...")}
        >
          ☎
        </button>

      </div>

      {/* Contact */}
      <div className="chat-contact-card">

        <div className="contact-avatar">
          M
        </div>

        <div className="contact-details">
          <strong>Metro Mills</strong>
          <span>Buyer / Consignee</span>

          <div className="contact-online">
            <i></i>
            Online
          </div>
        </div>

        <button
          className="contact-call"
          onClick={() => alert("Calling Metro Mills...")}
        >
          ☎
        </button>

      </div>

      {/* Quick Actions */}
      <div className="chat-quick-actions">

        <button onClick={sendLiveLocation}>
          <span>⌖</span>
          <small>Live Location</small>
        </button>

        <button onClick={sendGatePhoto}>
          <span>▣</span>
          <small>Gate Photo</small>
        </button>

      </div>

      <input
        id="gate-photo-input"
        type="file"
        accept="image/*"
        capture="environment"
        hidden
        onChange={handleGatePhoto}
      />

      {/* Chat */}
      <div className="chat-messages">

        <div className="chat-date">
          TODAY
        </div>

        {messages.map((item) => {

          if (item.type === "location") {
            return (
              <div
                className="message-row sent-row"
                key={item.id}
              >
                <div className="location-message">

                  <div className="location-map">
                    <div className="map-road road-one"></div>
                    <div className="map-road road-two"></div>
                    <div className="map-pin">●</div>
                  </div>

                  <div className="location-content">
                    <strong>Live Location</strong>

                    <span>
                      {item.latitude.toFixed(4)},{" "}
                      {item.longitude.toFixed(4)}
                    </span>

                    <small>
                      Shared just now
                    </small>
                  </div>

                </div>
              </div>
            );
          }

          if (item.type === "photo") {
            return (
              <div
                className="message-row sent-row"
                key={item.id}
              >
                <div className="photo-message">
                  <img
                    src={item.image}
                    alt="Gate"
                  />

                  <div>
                    <strong>Gate Photo</strong>
                    <small>{item.time}</small>
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div
              className={`message-row ${
                item.type === "sent"
                  ? "sent-row"
                  : "received-row"
              }`}
              key={item.id}
            >
              <div
                className={`chat-bubble ${
                  item.type === "sent"
                    ? "sent-bubble"
                    : "received-bubble"
                }`}
              >
                <p>{item.text}</p>
                <small>{item.time}</small>
              </div>
            </div>
          );
        })}

      </div>

      {/* Unloading Coordination */}
      <div className="unloading-card">

        <div className="unloading-icon">
          ✓
        </div>

        <div>
          <strong>Unloading Coordination</strong>
          <span>
            Confirm when you reach the unloading gate.
          </span>
        </div>

        <button
          onClick={() =>
            navigate(`/trips/${tripId}/delivery`)
          }
        >
          Open
        </button>

      </div>

      {/* Message Input */}
      <div className="chat-input-area">

        <button
          className="chat-attach"
          onClick={sendGatePhoto}
        >
          +
        </button>

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          placeholder="Type a message..."
        />

        <button
          className="chat-send"
          onClick={sendMessage}
        >
          ↑
        </button>

      </div>

>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
    </div>
  );
}

<<<<<<< HEAD
export default TripChat;
=======
export default TripChat;
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
