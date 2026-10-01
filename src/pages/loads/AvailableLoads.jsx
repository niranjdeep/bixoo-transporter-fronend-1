<<<<<<< HEAD
import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Icon from "../../components/Icon";
import LoadCard from "../../components/LoadCard";
import PageHeader from "../../components/ui/PageHeader";
import EmptyState from "../../components/ui/EmptyState";
import Button from "../../components/ui/Button";
import FilterPill from "../../components/ui/FilterPill";
import api from "../../services/api";
=======
import { useNavigate } from "react-router-dom";
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
import "./AvailableLoads.css";

function AvailableLoads() {
  const navigate = useNavigate();
<<<<<<< HEAD
  const [params, setParams] = useSearchParams();
  
  // URL params state
  const query = params.get("search") || "";
  const status = params.get("status") || "all";
  const page = parseInt(params.get("page") || "1", 10);
  const limit = 10;

  const [loads, setLoads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pagination, setPagination] = useState(null);
  
  const abortControllerRef = useRef(null);
  const debounceRef = useRef(null);

  const fetchLoads = async (searchParams) => {
    setLoading(true);
    setError(false);
    
    // Abort previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    try {
      const res = await api.get("/transporter/loads", {
        params: {
          search: searchParams.get("search") || undefined,
          status: searchParams.get("status") || undefined,
          page: searchParams.get("page") || 1,
          limit
        },
        signal: abortControllerRef.current.signal
      });
      
      if (res.data) {
        const mappedLoads = res.data.map(item => ({
          id: item.match_id,
          status: item.match_status === "PENDING" ? "NEW LOAD" : item.match_status,
          distance: `${item.distance_from_pickup || 0} km away`,
          pickup: item.request.pickup_city,
          delivery: item.request.delivery_city,
          weight: `${item.request.weight} ${item.request.weight_unit}`,
          type: item.request.goods_name,
          start: item.request.pickup_time || "Flexible",
          payout: item.request.offered_amount
        }));
        
        setLoads(mappedLoads);
        setPagination(res.pagination);
      }
    } catch (err) {
      if (err.name !== "CanceledError" && err.message !== "canceled") {
        console.error("Failed to fetch loads:", err);
        setError(true);
      }
    } finally {
      if (abortControllerRef.current && !abortControllerRef.current.signal.aborted) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    // We fetch whenever URL params change
    fetchLoads(params);
    return () => {
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, [params]);

  const handleSearch = (e) => {
    const val = e.target.value;
    
    if (debounceRef.current) clearTimeout(debounceRef.current);
    
    debounceRef.current = setTimeout(() => {
      const next = new URLSearchParams(params);
      if (val.trim()) next.set("search", val);
      else next.delete("search");
      
      // Reset to page 1 on search
      next.set("page", "1");
      setParams(next);
    }, 400); // 400ms debounce
  };
  
  const handleStatusChange = (newStatus) => {
    const next = new URLSearchParams(params);
    if (newStatus === "all") next.delete("status");
    else next.set("status", newStatus);
    next.set("page", "1");
    setParams(next);
  };
  
  const handlePageChange = (newPage) => {
    const next = new URLSearchParams(params);
    next.set("page", newPage.toString());
    setParams(next);
  };
  
  const handleReset = () => {
    setParams(new URLSearchParams());
  };

  return (
    <div className="available-loads-page ui-page">
      <PageHeader title="Available Loads" description="Find loads that match your vehicle and availability." />
      
      <div className="loads-toolbar">
        <label className="ui-search">
          <Icon name="search" />
          <input 
            type="search" 
            aria-label="Search available loads" 
            placeholder="Search by load, location or material..." 
            defaultValue={query} 
            onChange={handleSearch} 
          />
        </label>
        
        <div className="filter-group">
          <FilterPill active={status === "all"} label="All Loads" onClick={() => handleStatusChange("all")} />
          <FilterPill active={status === "PENDING"} label="Available" onClick={() => handleStatusChange("PENDING")} />
          <FilterPill active={status === "VIEWED"} label="Viewed" onClick={() => handleStatusChange("VIEWED")} />
        </div>
      </div>
      
      <div className="loads-results-header">
        <span className="loads-result-count">{pagination ? `Showing ${pagination.total} loads` : 'Loading...'}</span>
        { (query || status !== "all") && (
           <Button variant="outline" size="sm" icon="close" iconPosition="left" onClick={handleReset}>Clear Filters</Button>
        )}
      </div>

      <div className="available-load-list">
        {loading ? (
          <div style={{ padding: "40px", textAlign: "center", gridColumn: "1/-1" }}>
            <p>Loading loads...</p>
          </div>
        ) : error ? (
          <EmptyState 
            icon="close" 
            title="Unable to load results." 
            description="There was an error fetching the loads. Please try again."
            action={{ label: "Retry", onClick: () => fetchLoads(params) }}
            style={{ gridColumn: "1/-1" }}
          />
        ) : loads.length === 0 ? (
          <EmptyState 
            icon="loads" 
            title={query ? "No matching loads found." : "No loads available"} 
            description={query ? "Try adjusting your search or filters." : "You have no matching load opportunities at this time."} 
            action={query ? { label: "Clear Filters", onClick: handleReset } : null}
            style={{ gridColumn: "1/-1" }}
          />
        ) : (
          <>
            {loads.map((load) => (
              <LoadCard key={load.id} load={load} onClick={() => navigate(`/loads/${load.id}`)} />
            ))}
            
            {/* Pagination Controls */}
            {pagination && pagination.total_pages > 1 && (
              <div className="pagination-controls" style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px', gridColumn: "1/-1" }}>
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

  const loads = [
    {
      id: "LD001",
      status: "NEW LOAD",
      distance: "12 km away",
      pickup: "Riyadh",
      delivery: "Dammam",
      weight: "25 Tons",
      type: "Construction Materials",
      start: "10:00 AM",
    },
    {
      id: "LD002",
      status: "SCHEDULED",
      distance: "15 km away",
      pickup: "Jeddah",
      delivery: "Medina",
      weight: "18 Tons",
      type: "Food Items",
      start: "11:30 AM",
    },
  ];

  const handleLoadClick = (loadId) => {
    navigate(`/loads/${loadId}`);
  };

  return (
    <div className="available-loads-page">

      {/* =========================
          HEADER
      ========================== */}

      <div className="available-loads-header">

        <div>
          <span className="available-label">
            TRANSPORTER
          </span>

          <h1>
            Available Loads
          </h1>

          <p>
            Find loads that match your vehicle and availability.
          </p>
        </div>


        <div className="available-online">
          <span></span>
          Online
        </div>

      </div>


      {/* =========================
          SEARCH
      ========================== */}

      <div className="available-search">

        <span className="search-icon">
          ⌕
        </span>

        <input
          type="text"
          placeholder="Search for loads, locations..."
        />

        <button
          type="button"
          className="search-filter"
        >
          ☰
        </button>

      </div>


      {/* =========================
          SECTION TITLE
      ========================== */}

      <div className="available-section-title">

        <h2>
          Available Loads
        </h2>

        <button
          type="button"
          onClick={() => navigate("/loads")}
        >
          View All
        </button>

      </div>


      {/* =========================
          LOAD LIST
      ========================== */}

      <div className="available-load-list">

        {loads.map((load) => (

          <div
            className="available-load-card"
            key={load.id}
            onClick={() => handleLoadClick(load.id)}
          >

            {/* CARD HEADER */}

            <div className="available-card-header">

              <span
                className={`load-status ${
                  load.status === "NEW LOAD"
                    ? "new-load"
                    : "scheduled-load"
                }`}
              >
                {load.status}
              </span>


              <span className="load-distance">
                {load.distance}
              </span>

            </div>


            {/* ROUTE */}

            <div className="available-route">

              {/* PICKUP */}

              <div className="route-place">

                <span className="route-marker pickup-marker">
                  ●
                </span>

                <strong>
                  {load.pickup}
                </strong>

              </div>


              {/* DELIVERY */}

              <div className="route-place">

                <span className="route-marker delivery-marker">
                  ◆
                </span>

                <strong>
                  {load.delivery}
                </strong>

              </div>

            </div>


            {/* DIVIDER */}

            <div className="load-divider"></div>


            {/* LOAD INFO */}

            <div className="load-bottom">

              <div className="load-description">
                {load.weight}
                {" • "}
                {load.type}
              </div>


              <div className="load-start">
                Starts at {load.start}
              </div>

            </div>

          </div>

        ))}

      </div>

>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
    </div>
  );
}

<<<<<<< HEAD
export default AvailableLoads;
=======
export default AvailableLoads;
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
