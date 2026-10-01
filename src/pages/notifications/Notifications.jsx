<<<<<<< HEAD
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import Icon from "../../components/Icon";
import PageHeader from "../../components/ui/PageHeader";
import EmptyState from "../../components/ui/EmptyState";
import Button from "../../components/ui/Button";
import FilterPill from "../../components/ui/FilterPill";
import api from "../../services/api";
import "./Notifications.css";

function Notifications() {
  const [params, setParams] = useSearchParams();
  const unreadOnly = params.get("unread") === "true";
  const page = parseInt(params.get("page") || "1", 10);
  const limit = 20;

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pagination, setPagination] = useState(null);

  const abortControllerRef = useRef(null);

  const fetchNotifications = async (searchParams) => {
    setLoading(true);
    setError(false);
    
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    try {
      const res = await api.get("/notifications", {
        params: {
          unread_only: searchParams.get("unread") === "true",
          page: searchParams.get("page") || 1,
          limit
        },
        signal: abortControllerRef.current.signal
      });
      
      if (res.data) {
        setNotifications(res.data);
        setPagination(res.pagination);
      }
    } catch (err) {
      if (err.name !== "CanceledError" && err.message !== "canceled") {
        console.error("Failed to fetch notifications", err);
        setError(true);
      }
    } finally {
      if (abortControllerRef.current && !abortControllerRef.current.signal.aborted) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchNotifications(params);
    return () => {
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, [params]);

  const markAllAsRead = async () => {
    try {
      await api.patch("/notifications/read-all");
      // Refetch current page
      fetchNotifications(params);
    } catch (err) {
      console.error("Failed to mark all as read", err);
    }
  };
  
  const handleFilterChange = (isUnread) => {
    const next = new URLSearchParams(params);
    if (isUnread) next.set("unread", "true");
    else next.delete("unread");
    next.set("page", "1");
    setParams(next);
  };
  
  const handlePageChange = (newPage) => {
    const next = new URLSearchParams(params);
    next.set("page", newPage.toString());
    setParams(next);
  };

  return (
    <div className="notifications-page ui-page">
      <div className="notifications-header-layout">
        <PageHeader 
          eyebrow="ALERTS" 
          title="Notifications" 
          description="Stay updated with your latest operations."
        />
        <div className="notifications-header-actions">
          <div className="filter-group">
            <FilterPill active={!unreadOnly} label="All" onClick={() => handleFilterChange(false)} />
            <FilterPill active={unreadOnly} label="Unread" onClick={() => handleFilterChange(true)} />
          </div>
          <Button variant="outline" size="sm" icon="check" iconPosition="left" onClick={markAllAsRead}>
            Mark all as read
          </Button>
        </div>
      </div>

      <div className="notifications-list" style={{ marginTop: "24px" }}>
        {loading ? (
          <div style={{ padding: "40px", textAlign: "center" }}>
            <p>Loading notifications...</p>
          </div>
        ) : error ? (
           <EmptyState 
            icon="close" 
            title="Unable to load results." 
            description="There was an error fetching the notifications."
            action={{ label: "Retry", onClick: () => fetchNotifications(params) }}
          />
        ) : notifications.length === 0 ? (
          <EmptyState icon="bell" title={unreadOnly ? "No Unread Notifications" : "No Notifications Yet"} description="You'll receive alerts here when there are updates on your loads, trips, or wallet." />
        ) : (
          <>
            {notifications.map((notification) => (
              <div key={notification.id} className={`notification-card ${!notification.is_read ? "unread" : ""}`}>
                <div className="notification-icon">
                  <Icon name="bell" size={20} />
                </div>
                <div className="notification-content">
                  <strong>{notification.title}</strong>
                  <p>{notification.message}</p>
                  <div className="notification-meta">
                    <span className="notification-time">{new Date(notification.created_at).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Pagination Controls */}
            {pagination && pagination.total_pages > 1 && (
              <div className="pagination-controls" style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
                <Button 
                  variant="outline"
                  disabled={page <= 1} 
                  onClick={() => handlePageChange(page - 1)}
                >
                  Previous
                </Button>
                <span style={{ display: 'flex', alignItems: 'center', fontWeight: '600', color: 'var(--ui-muted)' }}>Page {page} of {pagination.total_pages}</span>
                <Button 
                  variant="outline"
                  disabled={page >= pagination.total_pages} 
                  onClick={() => handlePageChange(page + 1)}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
=======
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

>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
    </div>
  );
}

<<<<<<< HEAD
export default Notifications;
=======
export default Notifications;
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
