import { useNavigate } from "react-router-dom";
import "./Notifications.css";

function Notifications() {
  const navigate = useNavigate();

  const notifications = [
    {
      id: 1,
      type: "order",
      title: "New Order Available",
      message: "A new load from Mumbai to Pune is available.",
      time: "5 min ago",
      action: "View Load",
      path: "/loads/LD001",
      unread: true,
    },
    {
      id: 2,
      type: "trip",
      title: "Trip Started",
      message: "Your trip TR-LD001 is now in transit.",
      time: "25 min ago",
      action: "View Trip",
      path: "/trips/TR-LD001",
      unread: true,
    },
    {
      id: 3,
      type: "payment",
      title: "Settlement Update",
      message: "Your pending settlement balance is ₹24,500.",
      time: "1 hour ago",
      action: "View Wallet",
      path: "/wallet",
      unread: true,
    },
    {
      id: 4,
      type: "delivery",
      title: "Delivery Reminder",
      message: "Please confirm delivery after reaching the destination.",
      time: "2 hours ago",
      action: "View Trip",
      path: "/trips/TR-LD001",
      unread: false,
    },
    {
      id: 5,
      type: "system",
      title: "Profile Verified",
      message: "Your transporter documents have been verified.",
      time: "Yesterday",
      action: "View Profile",
      path: "/profile",
      unread: false,
    },
    {
      id: 6,
      type: "system",
      title: "Welcome to BIXOO",
      message: "Your transporter account is ready to receive loads.",
      time: "Yesterday",
      action: "Go to Dashboard",
      path: "/dashboard",
      unread: false,
    },
  ];

  const getIcon = (type) => {
    switch (type) {
      case "order":
        return "↗";
      case "trip":
        return "🚚";
      case "payment":
        return "₹";
      case "delivery":
        return "✓";
      case "system":
        return "i";
      default:
        return "•";
    }
  };

  return (
    <div className="notifications-page">

      {/* Header */}
      <div className="notifications-header">

        <div>
          <span className="notifications-label">
            TRANSPORTER
          </span>

          <h1>Notifications</h1>

          <p>
            Stay updated with your trips, loads and settlements.
          </p>
        </div>

        <div className="notification-bell">
          🔔
          <span>3</span>
        </div>

      </div>

      {/* Summary */}
      <div className="notification-summary">
        <div>
          <strong>3</strong>
          <span>Unread Notifications</span>
        </div>

        <button
          onClick={() => alert("All notifications marked as read")}
        >
          Mark all as read
        </button>
      </div>

      {/* Notification List */}
      <div className="notification-section">

        <div className="notification-section-title">
          <span>UPDATES</span>
          <h2>Recent Notifications</h2>
        </div>

        <div className="notification-list">

          {notifications.map((notification) => (
            <div
              className={`notification-card ${
                notification.unread ? "unread" : ""
              }`}
              key={notification.id}
            >

              <div className={`notification-icon ${notification.type}`}>
                {getIcon(notification.type)}
              </div>

              <div className="notification-content">

                <div className="notification-title-row">
                  <strong>{notification.title}</strong>

                  {notification.unread && (
                    <span className="unread-dot"></span>
                  )}
                </div>

                <p>
                  {notification.message}
                </p>

                <div className="notification-bottom">

                  <small>
                    {notification.time}
                  </small>

                  <button
                    onClick={() =>
                      navigate(notification.path)
                    }
                  >
                    {notification.action}
                    <span>→</span>
                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default Notifications;