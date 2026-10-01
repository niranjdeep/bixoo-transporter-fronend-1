<<<<<<< HEAD
import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Icon from "../../components/Icon";
import PageHeader from "../../components/ui/PageHeader";
import StatusBadge from "../../components/ui/StatusBadge";
import EmptyState from "../../components/ui/EmptyState";
import Button from "../../components/ui/Button";
import FilterPill from "../../components/ui/FilterPill";
import api from "../../services/api";
=======
import { useState } from "react";
import { useNavigate } from "react-router-dom";
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
import "./MyTrips.css";

function MyTrips() {
  const navigate = useNavigate();
<<<<<<< HEAD
  const [params, setParams] = useSearchParams();

  const activeTab = params.get("tab") || "active";
  const query = params.get("search") || "";
  const page = parseInt(params.get("page") || "1", 10);
  const limit = 10;

  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pagination, setPagination] = useState(null);
  
  const abortControllerRef = useRef(null);
  const debounceRef = useRef(null);

  const fetchTrips = async (searchParams) => {
    setLoading(true);
    setError(false);
    
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    const currentTab = searchParams.get("tab") || "active";
    let statuses = "ACCEPTED,GOING_TO_PICKUP,PICKED_UP,IN_TRANSIT,AT_DELIVERY,DELIVERED";
    if (currentTab === "completed") statuses = "COMPLETED,CANCELLED";

    try {
      const res = await api.get("/transporter/trips", {
        params: {
          search: searchParams.get("search") || undefined,
          statuses,
          page: searchParams.get("page") || 1,
          limit
        },
        signal: abortControllerRef.current.signal
      });
      
      if (res.data) {
        const mappedTrips = res.data.map(t => {
          const isCompleted = t.status === "COMPLETED" || t.status === "CANCELLED";
          return {
            id: t.trip_code,
            internalId: t.id,
            loadId: t.request?.request_code || `LD-${t.request?.id}` || "Unknown",
            pickup: t.request?.pickup_city || "Unknown",
            pickupPoint: t.request?.pickup_address || t.request?.pickup_location || "Unknown location",
            delivery: t.request?.delivery_city || "Unknown",
            deliveryPoint: t.request?.delivery_address || t.request?.delivery_location || "Unknown location",
            weight: t.request ? `${t.request.weight} ${t.request.weight_unit}` : "",
            load: t.request?.goods_name || "",
            vehicle: "Your Vehicle",
            distance: t.request ? `${t.request.estimated_distance} km` : "",
            payout: t.request ? `₹${Number(t.request.offered_amount || t.request.estimated_price).toLocaleString()}` : "",
            status: t.status,
            type: isCompleted ? "completed" : "active",
          };
        });
        setTrips(mappedTrips);
        setPagination(res.pagination);
      }
    } catch (err) {
      if (err.name !== "CanceledError" && err.message !== "canceled") {
        console.error("Failed to fetch trips", err);
        setError(true);
      }
    } finally {
      if (abortControllerRef.current && !abortControllerRef.current.signal.aborted) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchTrips(params);
    return () => {
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, [params]);

  const handleTabChange = (tab) => {
    const next = new URLSearchParams(params);
    next.set("tab", tab);
    next.set("page", "1");
    setParams(next);
  };
  
  const handleSearch = (e) => {
    const val = e.target.value;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    
    debounceRef.current = setTimeout(() => {
      const next = new URLSearchParams(params);
      if (val.trim()) next.set("search", val);
      else next.delete("search");
      next.set("page", "1");
      setParams(next);
    }, 400);
  };
  
  const handlePageChange = (newPage) => {
    const next = new URLSearchParams(params);
    next.set("page", newPage.toString());
    setParams(next);
  };
  
  const handleReset = () => {
    const next = new URLSearchParams();
    next.set("tab", activeTab); // keep current tab
    setParams(next);
  };

  const openTrip = (trip) => navigate(`/trips/${trip.internalId}`);
  const navigateLive = (trip) => navigate(`/trips/${trip.internalId}/live`);

  return (
    <div className="my-trips-page ui-page">
      <PageHeader 
        title="My Accepted Loads" 
        description="Track your active and completed transporter trips."
        action={
          <div className="my-trips-count">
            {pagination ? pagination.total : "..."}
            <small>Total {activeTab} trips</small>
          </div>
        } 
      />

      <div className="loads-toolbar" style={{ marginTop: "20px", marginBottom: "20px", display: "flex", flexWrap: "wrap", gap: "16px" }}>
        <label className="ui-search" style={{ flex: "1 1 300px" }}>
          <Icon name="search" />
          <input 
            type="search" 
            placeholder="Search by Trip ID, Order ID, City, or Goods..." 
            defaultValue={query} 
            onChange={handleSearch} 
          />
        </label>
        
        <div className="filter-group">
          <FilterPill active={activeTab === "active"} label="In Progress" onClick={() => handleTabChange("active")} />
          <FilterPill active={activeTab === "completed"} label="Completed" onClick={() => handleTabChange("completed")} />
        </div>
      </div>

      <div className="loads-results-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '14px', color: 'var(--ui-muted)' }}>
        <span>{pagination ? `Showing ${pagination.total} trips` : 'Loading...'}</span>
        {query && (
           <Button variant="outline" size="sm" icon="close" iconPosition="left" onClick={handleReset}>Clear Search</Button>
        )}
      </div>

      <div className="my-trips-list">
        {loading ? (
          <div style={{ padding: "40px", textAlign: "center" }}>
            <p>Loading trips...</p>
          </div>
        ) : error ? (
          <EmptyState 
            icon="close" 
            title="Unable to load results." 
            description="There was an error fetching the trips. Please try again."
            action={{ label: "Retry", onClick: () => fetchTrips(params) }}
          />
        ) : trips.length === 0 ? (
          <EmptyState 
            icon="truck" 
            title={query ? "No matching trips found." : "No Trips Found"} 
            description={query ? "Try adjusting your search query." : "Your completed or active trips will appear here."} 
            action={query ? { label: "Clear Search", onClick: handleReset } : null}
          />
        ) : (
          <>
            {trips.map((trip) => (
              <div className="my-trip-card" key={trip.internalId}>
                {/* CARD HEADER */}
                <div className="my-trip-card-header">
                  <div>
                    <span className="trip-order-label">TRIP CODE</span>
                    <strong>#{trip.id}</strong>
                  </div>
                  <div className="trip-payout">
                    <small>Payout</small>
                    <strong>{trip.payout}</strong>
                  </div>
                </div>

                {/* STATUS */}
                <div className="my-trip-status-row">
                  <StatusBadge status={trip.status} dot />
                  <span className="trip-load-id">{trip.loadId}</span>
                </div>

                {/* ROUTE */}
                <div className="my-trip-route">
                  <div className="trip-route-point">
                    <span className="route-dot pickup"></span>
                    <div>
                      <small>Pickup</small>
                      <strong>{trip.pickup}</strong>
                      <p>{trip.pickupPoint}</p>
                    </div>
                  </div>

                  <div className="trip-route-connector">
                    <span></span>
                  </div>

                  <div className="trip-route-point">
                    <span className="route-dot delivery"></span>
                    <div>
                      <small>Delivery</small>
                      <strong>{trip.delivery}</strong>
                      <p>{trip.deliveryPoint}</p>
                    </div>
                  </div>
                </div>

                {/* TRIP INFO */}
                <div className="my-trip-info">
                  <div>
                    <span>Load</span>
                    <strong>{trip.load}</strong>
                  </div>
                  <div>
                    <span>Weight</span>
                    <strong>{trip.weight}</strong>
                  </div>
                  <div>
                    <span>Vehicle</span>
                    <strong>{trip.vehicle}</strong>
                  </div>
                  <div>
                    <span>Distance</span>
                    <strong>{trip.distance}</strong>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="my-trip-actions" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <Button variant="outline" icon="arrow" iconPosition="right" onClick={() => openTrip(trip)}>
                    Trip Details
                  </Button>

                  {trip.type === "active" ? (
                    <Button variant="primary" icon="pin" iconPosition="left" onClick={() => navigateLive(trip)}>
                      Navigate
                    </Button>
                  ) : (
                    <Button variant="secondary" onClick={() => openTrip(trip)}>
                      View Trip
                    </Button>
                  )}
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
                <span style={{ display: 'flex', alignItems: 'center', fontSize: '14px', fontWeight: 600, color: 'var(--ui-muted)' }}>
                  Page {page} of {pagination.total_pages}
                </span>
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
  const [activeTab, setActiveTab] = useState("active");

  const savedTrip = JSON.parse(
    localStorage.getItem("active_trip") || "null"
  );

  const trips = [
    {
      id: savedTrip?.tripId || "TR-LD001",
      loadId: savedTrip?.loadId || "LD001",
      pickup: savedTrip?.pickup || "Mumbai",
      pickupPoint: savedTrip?.pickupPoint || "APMC Market",
      delivery: savedTrip?.delivery || "Pune",
      deliveryPoint: savedTrip?.deliveryPoint || "Hadapsar Depot",
      weight: savedTrip?.weight || "50 Tons",
      load: savedTrip?.loadType || "Wheat",
      vehicle: savedTrip?.vehicle || "20ft Truck",
      distance: savedTrip?.distance || "160 KM",
      payout: savedTrip?.earnings || "₹18,500",
      status: savedTrip ? "In Transit" : "Accepted",
      type: "active",
    },
    {
      id: "TR-1002",
      loadId: "LD008",
      pickup: "Chennai",
      pickupPoint: "Guindy Industrial Area",
      delivery: "Bengaluru",
      deliveryPoint: "Peenya Depot",
      weight: "20 Tons",
      load: "Rice",
      vehicle: "Container",
      distance: "350 KM",
      payout: "₹28,500",
      status: "Delivered",
      type: "completed",
    },
    {
      id: "TR-1001",
      loadId: "LD005",
      pickup: "Coimbatore",
      pickupPoint: "Industrial Estate",
      delivery: "Madurai",
      deliveryPoint: "Warehouse",
      weight: "10 Tons",
      load: "Machinery",
      vehicle: "Truck",
      distance: "215 KM",
      payout: "₹16,500",
      status: "Delivered",
      type: "completed",
    },
  ];

  const filteredTrips = trips.filter(
    (trip) => trip.type === activeTab
  );

  const openTrip = (trip) => {
    navigate(`/trips/${trip.id}`);
  };

  const navigateLive = (trip) => {
    navigate(`/trips/${trip.id}/live`);
  };

  return (
    <div className="my-trips-page">

      {/* HEADER */}
      <div className="my-trips-header">

        <div>
          <span className="my-trips-label">
            TRANSPORTER
          </span>

          <h1>My Accepted Loads</h1>

          <p>
            Track your active and completed transporter trips.
          </p>
        </div>

        <div className="my-trips-count">
          {trips.length}
        </div>

      </div>


      {/* TABS */}
      <div className="my-trips-tabs">

        <button
          type="button"
          className={
            activeTab === "active"
              ? "trip-tab active"
              : "trip-tab"
          }
          onClick={() => setActiveTab("active")}
        >
          In Progress

          <span>
            {trips.filter((trip) => trip.type === "active").length}
          </span>
        </button>


        <button
          type="button"
          className={
            activeTab === "completed"
              ? "trip-tab active"
              : "trip-tab"
          }
          onClick={() => setActiveTab("completed")}
        >
          Completed

          <span>
            {
              trips.filter(
                (trip) => trip.type === "completed"
              ).length
            }
          </span>
        </button>

      </div>


      {/* TRIPS */}
      <div className="my-trips-list">

        {filteredTrips.length === 0 ? (
          <div className="empty-trips">

            <div className="empty-trips-icon">
              🚚
            </div>

            <h2>No Trips Found</h2>

            <p>
              Your completed or active trips will appear here.
            </p>

          </div>
        ) : (
          filteredTrips.map((trip) => (

            <div
              className="my-trip-card"
              key={trip.id}
            >

              {/* CARD HEADER */}
              <div className="my-trip-card-header">

                <div>
                  <span className="trip-order-label">
                    ORDER ID
                  </span>

                  <strong>
                    #{trip.id}
                  </strong>
                </div>

                <div className="trip-payout">
                  <small>Payout</small>

                  <strong>
                    {trip.payout}
                  </strong>
                </div>

              </div>


              {/* STATUS */}
              <div className="my-trip-status-row">

                <span
                  className={
                    trip.type === "completed"
                      ? "trip-status completed"
                      : "trip-status progress"
                  }
                >
                  <i></i>
                  {trip.status}
                </span>

                <span className="trip-load-id">
                  {trip.loadId}
                </span>

              </div>


              {/* ROUTE */}
              <div className="my-trip-route">

                <div className="trip-route-point">

                  <span className="route-dot pickup"></span>

                  <div>
                    <small>Pickup</small>

                    <strong>
                      {trip.pickup}
                    </strong>

                    <p>
                      {trip.pickupPoint}
                    </p>
                  </div>

                </div>


                <div className="trip-route-connector">
                  <span></span>
                </div>


                <div className="trip-route-point">

                  <span className="route-dot delivery"></span>

                  <div>
                    <small>Delivery</small>

                    <strong>
                      {trip.delivery}
                    </strong>

                    <p>
                      {trip.deliveryPoint}
                    </p>
                  </div>

                </div>

              </div>


              {/* TRIP INFO */}
              <div className="my-trip-info">

                <div>
                  <span>Load</span>
                  <strong>{trip.load}</strong>
                </div>

                <div>
                  <span>Weight</span>
                  <strong>{trip.weight}</strong>
                </div>

                <div>
                  <span>Vehicle</span>
                  <strong>{trip.vehicle}</strong>
                </div>

                <div>
                  <span>Distance</span>
                  <strong>{trip.distance}</strong>
                </div>

              </div>


              {/* ACTIONS */}
              <div className="my-trip-actions">

                <button
                  type="button"
                  className="trip-details-btn"
                  onClick={() => openTrip(trip)}
                >
                  Trip Details
                  <span>→</span>
                </button>


                {trip.type === "active" ? (
                  <button
                    type="button"
                    className="trip-navigate-btn"
                    onClick={() => navigateLive(trip)}
                  >
                    <span>⌖</span>
                    Navigate
                  </button>
                ) : (
                  <button
                    type="button"
                    className="trip-view-btn"
                    onClick={() => openTrip(trip)}
                  >
                    View Trip
                  </button>
                )}

              </div>

            </div>

          ))
        )}

      </div>

>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
    </div>
  );
}

<<<<<<< HEAD
export default MyTrips;
=======
export default MyTrips;
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
