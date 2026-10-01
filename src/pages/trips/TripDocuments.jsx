<<<<<<< HEAD
import Icon from "../../components/Icon";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import Button from "../../components/ui/Button";
=======
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
import "./TripDocuments.css";

function TripDocuments() {
  const { tripId } = useParams();
  const navigate = useNavigate();

  const [trip, setTrip] = useState(null);
<<<<<<< HEAD
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef(null);
  const [activeDocType, setActiveDocType] = useState(null);

  useEffect(() => {
    const fetchTripAndDocs = async () => {
      setLoading(true);
      try {
        const tripRes = await api.get(`/transporter/trips/${tripId}`);
        if (tripRes.data) {
          setTrip(tripRes.data);
          // Trip details usually include documents list or we fetch them separately
          if (tripRes.data.documents) {
            setDocuments(tripRes.data.documents);
          } else {
            const docRes = await api.get(`/transporter/trips/${tripId}/documents`);
            if (docRes.data) setDocuments(docRes.data);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (tripId) fetchTripAndDocs();
  }, [tripId]);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file || !activeDocType) return;
    
    const formData = new FormData();
    formData.append("file", file);
    formData.append("document_type", activeDocType);

    try {
      const res = await api.post(`/transporter/trips/${tripId}/documents`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      if (res.data) {
        setDocuments(prev => [...prev, res.data]);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to upload document");
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const triggerUpload = (type) => {
    setActiveDocType(type);
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleDelete = async (docId) => {
    try {
      await api.delete(`/transporter/trips/${tripId}/documents/${docId}`);
      setDocuments(prev => prev.filter(d => d.id !== docId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) return <div className="trip-documents-page"><p style={{ padding: "20px" }}>Loading...</p></div>;
  if (!trip) return <div className="trip-documents-page"><p style={{ padding: "20px" }}>Trip not found.</p></div>;

  const hasDocType = (type) => documents.find(d => d.document_type === type);

  return (
    <div className="trip-documents-page ui-page">
      <input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileUpload} accept="image/*,.pdf" />
      
      <header className="documents-header">
        <Button variant="ghost" size="lg" icon="arrowLeft" onClick={handleBack} style={{ padding: "8px", width: "42px", height: "42px", borderRadius: "10px" }} />
        <div>
          <span>DOCUMENTS</span>
          <h1>Trip #{trip.trip_code}</h1>
        </div>
      </header>

      <div className="documents-info-card">
        <Icon name="info" size={20} />
        <p>Please upload clear, legible photos of all required documents to ensure prompt settlement.</p>
      </div>

      <div className="documents-list">
        {/* Gate Photo */}
        <div className={`document-upload-card ${hasDocType('GATE_PASS') ? 'uploaded' : ''}`}>
          <div className="document-card-header">
            <div className="document-title">
              <Icon name="camera" size={20} />
              <strong>Gate Photo</strong>
            </div>
            {hasDocType('GATE_PASS') && <span className="doc-status-badge"><Icon name="check" size={12} /> Uploaded</span>}
          </div>
          <p className="document-desc">Photo of the vehicle at the delivery gate.</p>
          {hasDocType('GATE_PASS') ? (
            <div className="uploaded-file-info">
              <span className="file-name">{hasDocType('GATE_PASS').file_name}</span>
              <Button variant="danger" size="sm" onClick={() => handleDelete(hasDocType('GATE_PASS').id)}>Remove</Button>
            </div>
          ) : (
            <Button variant="outline" fullWidth onClick={() => triggerUpload('GATE_PASS')}>Upload Photo</Button>
          )}
        </div>

        {/* E-Way Bill */}
        <div className={`document-upload-card ${hasDocType('EWAY_BILL') ? 'uploaded' : ''}`}>
          <div className="document-card-header">
            <div className="document-title">
              <Icon name="file" size={20} />
              <strong>E-Way Bill</strong>
            </div>
            {hasDocType('EWAY_BILL') && <span className="doc-status-badge"><Icon name="check" size={12} /> Uploaded</span>}
          </div>
          <p className="document-desc">Scan or photo of the E-Way bill with receiver signature.</p>
          {hasDocType('EWAY_BILL') ? (
            <div className="uploaded-file-info">
              <span className="file-name">{hasDocType('EWAY_BILL').file_name}</span>
              <Button variant="danger" size="sm" onClick={() => handleDelete(hasDocType('EWAY_BILL').id)}>Remove</Button>
            </div>
          ) : (
            <Button variant="outline" fullWidth onClick={() => triggerUpload('EWAY_BILL')}>Upload Document</Button>
          )}
        </div>

        {/* Proof of Delivery (POD) */}
        <div className={`document-upload-card ${hasDocType('POD') ? 'uploaded' : ''}`}>
          <div className="document-card-header">
            <div className="document-title">
              <Icon name="check" size={20} />
              <strong>Proof of Delivery (POD)</strong>
            </div>
            {hasDocType('POD') && <span className="doc-status-badge"><Icon name="check" size={12} /> Uploaded</span>}
          </div>
          <p className="document-desc">Signed delivery challan or receipt.</p>
          {hasDocType('POD') ? (
            <div className="uploaded-file-info">
              <span className="file-name">{hasDocType('POD').file_name}</span>
              <Button variant="danger" size="sm" onClick={() => handleDelete(hasDocType('POD').id)}>Remove</Button>
            </div>
          ) : (
            <Button variant="outline" fullWidth onClick={() => triggerUpload('POD')}>Upload POD</Button>
          )}
        </div>
      </div>
=======

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

>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
    </div>
  );
}

<<<<<<< HEAD
export default TripDocuments;
=======
export default TripDocuments;
>>>>>>> d82ff6af125ddd25a44cbd605d543ce98ff9543e
