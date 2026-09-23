import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Notifications.css";

function Notifications() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "load",
      title: "New Load Available",
      message:
        "A new load from Mumbai to Pune matches your vehicle requirements.",
      time: "10 minutes ago",
      unread: true,
      action: "/loads",
      actionText: "View Load",
    },
    {
      id: 2,
      type: "match",
      title: "Direct Match Found",
      message:
        "A 50 Tons Wheat load has been matched with your 20ft Truck.",
      time: "25 minutes ago",
      unread: true,
      action: "/loads",
      actionText: "View Match",
    },
    {
      id: 3,
      type: "trip",
      title: "Trip Status Updated",
      message:
        "Your trip TRIP-LD001 is currently In Transit.",
      time: "1 hour ago",
      unread: false,
      action: "/trips",
      actionText: "View Trip",
    },
    {
      id: 4,
      type: "delivery",
      title: "Delivery Reminder",
      message:
        "Your delivery at Hadapsar Depot is scheduled for today.",
      time: "2 hours ago",
      unread: false,
      action: "/trips",
      actionText: "View Details",
    },
    {
      id: 5,
      type: "wallet",
      title: "Settlement Update",
      message:
        "₹18,500 settlement is currently pending for TRIP-LD001.",
      time: "Yesterday",
      unread: false,
      action: "/wallet",
      actionText: "View Wallet",
    },
    {
      id: 6,
      type: "alert",
      title: "Pickup Reminder",
      message:
        "Pickup is scheduled today at 2:00 PM at APMC Market, Mumbai.",
      time: "Yesterday",
      unread: false,
      action: "/trips",
      actionText: "View Trip",
    },
  ]);

  const [filter, setFilter] = useState("all");

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, unread: false }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        unread: false,
      }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  const handleNotificationClick = (notification) => {
    markAsRead(notification.id);

    if (notification.action) {
      navigate(notification.action);
    }
  };

  const unreadCount = notifications.filter(
    (notification) => notification.unread
  ).length;

  const filteredNotifications =
    filter === "unread"
      ? notifications.filter((notification) => notification.unread)
      : notifications;

  const getIcon = (type) => {
    switch (type) {
      case "load":
        return "📦";
      case "match":
        return "🎯";
      case "trip":
        return "🚚";
      case "delivery":
        return "🏭";
      case "wallet":
        return "₹";
      case "alert":
        return "⚠";
      default:
        return "🔔";
    }
  };

  return (
    <div className="notifications-page">

      {/* Header */}

      <div className="notifications-header">

        <div>
          <p className="notification-label">
            TRANSPORTER UPDATES
          </p>

          <h1>Notifications</h1>

          <p className="notification-subtitle">
            Stay updated with loads, trips, deliveries and settlements.
          </p>
        </div>

        <div className="notification-summary">
          <strong>{unreadCount}</strong>
          <span>Unread</span>
        </div>

      </div>

      {/* Controls */}

      <div className="notification-controls">

        <div className="notification-tabs">

          <button
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            All
            <span>{notifications.length}</span>
          </button>

          <button
            className={filter === "unread" ? "active" : ""}
            onClick={() => setFilter("unread")}
          >
            Unread
            <span>{unreadCount}</span>
          </button>

        </div>

        {unreadCount > 0 && (
          <button
            className="mark-all-btn"
            onClick={markAllAsRead}
          >
            ✓ Mark all as read
          </button>
        )}

      </div>

      {/* Notification List */}

      <div className="notification-list">

        {filteredNotifications.length === 0 ? (
          <div className="empty-notifications">
            <div>🔔</div>
            <h2>No notifications</h2>
            <p>
              You are all caught up.
            </p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`notification-card ${
                notification.unread ? "unread" : ""
              }`}
            >

              <div
                className={`notification-icon ${notification.type}`}
              >
                {getIcon(notification.type)}
              </div>

              <div
                className="notification-content"
                onClick={() =>
                  handleNotificationClick(notification)
                }
              >

                <div className="notification-title-row">

                  <h3>{notification.title}</h3>

                  {notification.unread && (
                    <span className="new-badge">
                      NEW
                    </span>
                  )}

                </div>

                <p>{notification.message}</p>

                <div className="notification-bottom">

                  <span>
                    {notification.time}
                  </span>

                  {notification.actionText && (
                    <strong>
                      {notification.actionText} →
                    </strong>
                  )}

                </div>

              </div>

              <button
                className="notification-menu"
                onClick={() =>
                  deleteNotification(notification.id)
                }
                title="Remove notification"
              >
                ×
              </button>

            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default Notifications;