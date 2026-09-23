import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./TripDocuments.css";

function TripDocuments() {
  const { tripId } = useParams();
  const navigate = useNavigate();

  const [trip, setTrip] = useState(null);

  const [documents, setDocuments] = useState({
    gatePhoto: null,
    ewayBill: null,
    deliveryProof: null,
  });

  useEffect(() => {
    const savedTrip = localStorage.getItem("active_trip");

    if (savedTrip) {
      setTrip(JSON.parse(savedTrip));
    }

    const savedDocuments = localStorage.getItem(
      `trip_documents_${tripId}`
    );

    if (savedDocuments) {
      setDocuments(JSON.parse(savedDocuments));
    }
  }, [tripId]);

  const saveDocuments = (updatedDocuments) => {
    setDocuments(updatedDocuments);

    localStorage.setItem(
      `trip_documents_${tripId}`,
      JSON.stringify(updatedDocuments)
    );
  };

  const handleFileChange = (event, documentType) => {
    const file = event.target.files[0];

    if (!file) return;

    const documentInfo = {
      name: file.name,
      type: file.type,
      size: file.size,
      uploadedAt: new Date().toLocaleString(),
    };

    saveDocuments({
      ...documents,
      [documentType]: documentInfo,
    });
  };

  const removeDocument = (documentType) => {
    const updatedDocuments = {
      ...documents,
      [documentType]: null,
    };

    saveDocuments(updatedDocuments);
  };

  const renderDocumentCard = ({
    title,
    description,
    type,
    icon,
    required,
  }) => {
    const document = documents[type];

    return (
      <div className="document-card">

        <div className="document-top">

          <div className="document-icon">
            {icon}
          </div>

          <div className="document-title">
            <div className="title-row">
              <h3>{title}</h3>

              {required && (
                <span className="required-badge">
                  Required
                </span>
              )}
            </div>

            <p>{description}</p>
          </div>

          {document && (
            <span className="uploaded-badge">
              ✓ Uploaded
            </span>
          )}

        </div>

        {document ? (
          <div className="uploaded-file">

            <div className="file-icon">
              📄
            </div>

            <div className="file-info">
              <strong>{document.name}</strong>

              <small>
                Uploaded {document.uploadedAt}
              </small>
            </div>

            <button
              className="remove-btn"
              onClick={() => removeDocument(type)}
            >
              Remove
            </button>

          </div>
        ) : (
          <label className="upload-box">

            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(event) =>
                handleFileChange(event, type)
              }
            />

            <span className="upload-icon">
              ↑
            </span>

            <strong>
              Upload Document
            </strong>

            <small>
              JPG, PNG or PDF
            </small>

          </label>
        )}

      </div>
    );
  };

  if (!trip) {
    return (
      <div className="documents-page">
        <div className="documents-empty">
          <h2>Trip not found</h2>

          <button onClick={() => navigate("/trips")}>
            Back to My Trips
          </button>
        </div>
      </div>
    );
  }

  const uploadedCount = Object.values(documents).filter(
    Boolean
  ).length;

  return (
    <div className="documents-page">

      {/* Header */}

      <div className="documents-header">

        <div className="documents-header-left">

          <button
            className="back-btn"
            onClick={() =>
              navigate(`/trips/${tripId}/delivery`)
            }
          >
            ←
          </button>

          <div>
            <p className="documents-label">
              TRIP DOCUMENTS
            </p>

            <h1>Documents & Proof</h1>

            <p className="documents-subtitle">
              Upload and manage documents required for
              pickup and delivery.
            </p>
          </div>

        </div>

        <div className="upload-progress">
          <strong>{uploadedCount}/3</strong>
          <span>Documents Uploaded</span>
        </div>

      </div>

      {/* Trip Summary */}

      <div className="trip-summary">

        <div>
          <span>Trip ID</span>
          <strong>{trip.tripId}</strong>
        </div>

        <div>
          <span>Route</span>
          <strong>
            {trip.pickupLocation || "Mumbai, MH"}
            {" → "}
            {trip.deliveryLocation || "Pune, MH"}
          </strong>
        </div>

        <div>
          <span>Load</span>
          <strong>
            {trip.loadType || "Wheat"}
          </strong>
        </div>

        <div>
          <span>Vehicle</span>
          <strong>
            {trip.vehicle || "20ft Truck"}
          </strong>
        </div>

      </div>

      {/* Documents */}

      <div className="documents-grid">

        {renderDocumentCard({
          title: "Gate Photo",
          description:
            "Upload a photo when entering or reaching the delivery gate.",
          type: "gatePhoto",
          icon: "📷",
          required: true,
        })}

        {renderDocumentCard({
          title: "E-Way Bill",
          description:
            "Upload the E-Way Bill or relevant logistics document.",
          type: "ewayBill",
          icon: "📄",
          required: true,
        })}

        {renderDocumentCard({
          title: "Delivery Proof / POD",
          description:
            "Upload signed delivery proof after unloading is completed.",
          type: "deliveryProof",
          icon: "✓",
          required: true,
        })}

      </div>

      {/* Information */}

      <div className="document-info">

        <div className="info-icon">
          i
        </div>

        <div>
          <strong>Document Guidelines</strong>

          <p>
            Make sure uploaded documents are clear and readable.
            Delivery Proof / POD should be uploaded after the
            consignee confirms delivery.
          </p>
        </div>

      </div>

      {/* Actions */}

      <div className="documents-actions">

        <button
          className="secondary-btn"
          onClick={() =>
            navigate(`/trips/${tripId}/delivery`)
          }
        >
          Back to Delivery
        </button>

        <button
          className="primary-btn"
          onClick={() =>
            navigate(`/trips/${tripId}/complete`)
          }
          disabled={uploadedCount < 3}
        >
          Continue to Complete Trip →
        </button>

      </div>

    </div>
  );
}

export default TripDocuments;