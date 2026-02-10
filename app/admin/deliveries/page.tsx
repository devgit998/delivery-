"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  collection, 
  getDocs, 
  doc, 
  updateDoc,
  query,
  orderBy as firestoreOrderBy
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { Alert, AlertTitle, Snackbar } from "@mui/material";

interface Delivery {
  id: string;
  orderId: string;
  status: string;
  userId: string;
  userEmail: string;
  from: {
    name: string;
    city: string;
    state: string;
  };
  to: {
    name: string;
    city: string;
    state: string;
  };
  createdAt: any;
  estimatedDeliveryDate: string;
  package: {
    type: string;
    weight: string;
  };
}

const STATUSES = ["Pending", "Packed", "Shipped", "In Transit", "Delivered"];

const STAGE_CONFIGS: { [key: string]: any } = {
  "Pending": {
    progress: 0,
    stages: [
      { name: "Pending", completed: false, current: true },
      { name: "Packed", completed: false },
      { name: "Shipped", completed: false },
      { name: "In Transit", completed: false },
      { name: "Delivered", completed: false },
    ],
  },
  "Packed": {
    progress: 20,
    stages: [
      { name: "Pending", completed: true },
      { name: "Packed", completed: false, current: true },
      { name: "Shipped", completed: false },
      { name: "In Transit", completed: false },
      { name: "Delivered", completed: false },
    ],
  },
  "Shipped": {
    progress: 40,
    stages: [
      { name: "Pending", completed: true },
      { name: "Packed", completed: true },
      { name: "Shipped", completed: false, current: true },
      { name: "In Transit", completed: false },
      { name: "Delivered", completed: false },
    ],
  },
  "In Transit": {
    progress: 70,
    stages: [
      { name: "Pending", completed: true },
      { name: "Packed", completed: true },
      { name: "Shipped", completed: true },
      { name: "In Transit", completed: false, current: true },
      { name: "Delivered", completed: false },
    ],
  },
  "Delivered": {
    progress: 100,
    stages: [
      { name: "Pending", completed: true },
      { name: "Packed", completed: true },
      { name: "Shipped", completed: true },
      { name: "In Transit", completed: true },
      { name: "Delivered", completed: true, current: true },
    ],
  },
};

const AdminDeliveriesPage = () => {
  const { userData, loading: authLoading, isAdmin } = useAuth();
  const router = useRouter();
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    if (!authLoading) {
      if (!isAdmin()) {
        router.push("/welcome");
        return;
      }
      loadDeliveries();
    }
  }, [authLoading, userData]);

  const loadDeliveries = async () => {
    try {
      setLoading(true);
      const deliveriesRef = collection(db, "deliveries");
      
      // Get all deliveries (no orderBy to avoid index requirement)
      const querySnapshot = await getDocs(deliveriesRef);
      const deliveriesData: Delivery[] = [];

      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        deliveriesData.push({
          id: docSnap.id,
          orderId: data.orderId,
          status: data.status,
          userId: data.userId,
          userEmail: data.userEmail || "N/A",
          from: data.from,
          to: data.to,
          createdAt: data.createdAt,
          estimatedDeliveryDate: data.estimatedDeliveryDate,
          package: data.package || { type: "N/A", weight: "N/A" },
        });
      });

      // Sort client-side by createdAt descending
      deliveriesData.sort((a, b) => {
        const dateA = a.createdAt?.toDate?.() || new Date(0);
        const dateB = b.createdAt?.toDate?.() || new Date(0);
        return dateB.getTime() - dateA.getTime();
      });

      setDeliveries(deliveriesData);
    } catch (error: any) {
      console.error("Error loading deliveries:", error);
      setError(error.message || "Failed to load deliveries");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (deliveryId: string, orderId: string, newStatus: string) => {
    try {
      setError("");
      setSuccess("");

      const deliveryRef = doc(db, "deliveries", deliveryId);
      const stageConfig = STAGE_CONFIGS[newStatus];

      await updateDoc(deliveryRef, {
        status: newStatus,
        stages: stageConfig.stages,
        progress: stageConfig.progress,
      });

      setSuccess(`Delivery ${orderId} updated to ${newStatus}!`);
      await loadDeliveries(); // Refresh the list
    } catch (error: any) {
      console.error("Error updating delivery:", error);
      setError(error.message || "Failed to update delivery status");
    }
  };

  const handleCloseError = () => {
    setError("");
  };

  const handleCloseSuccess = () => {
    setSuccess("");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "#00ff88";
      case "In Transit":
        return "#3b82f6";
      case "Shipped":
        return "#8b5cf6";
      case "Packed":
        return "#f59e0b";
      default:
        return "#888888";
    }
  };

  const filteredDeliveries = filter === "All" 
    ? deliveries 
    : deliveries.filter(d => d.status === filter);

  if (authLoading || loading) {
    return (
      <div className="admin-container">
        <style jsx>{`
          @import url("https://fonts.googleapis.com/css2?family=Urbanist:wght@400;600;700;800&family=Azeret+Mono:wght@400;600&display=swap");

          .admin-container {
            min-height: 100vh;
            background: #000000;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: "Urbanist", sans-serif;
            color: #ffffff;
          }

          .loading-container {
            text-align: center;
          }

          .loading-spinner {
            width: 48px;
            height: 48px;
            border: 4px solid #1a1a1a;
            border-top-color: #ff5500;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 16px;
          }

          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }

          .loading-text {
            font-size: 18px;
            color: #888888;
          }
        `}</style>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <div className="loading-text">Loading deliveries...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Urbanist:wght@400;600;700;800&family=Azeret+Mono:wght@400;600&display=swap");

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .admin-container {
          min-height: 100vh;
          background: #000000;
          padding: 40px 20px;
          font-family: "Urbanist", sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* Animated grid background */
        .admin-container::before {
          content: "";
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background-image: linear-gradient(#0a0a0a 1px, transparent 1px),
            linear-gradient(90deg, #0a0a0a 1px, transparent 1px);
          background-size: 60px 60px;
          animation: gridScroll 25s linear infinite;
          opacity: 0.3;
          z-index: 0;
        }

        @keyframes gridScroll {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(60px, 60px);
          }
        }

        .admin-header {
          max-width: 1400px;
          margin: 0 auto 40px;
          position: relative;
          z-index: 1;
        }

        .title {
          font-size: 48px;
          font-weight: 800;
          background: linear-gradient(135deg, #ffffff 0%, #a0a0a0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 8px;
        }

        .subtitle {
          color: #888888;
          font-size: 18px;
        }

        .back-button {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          background: #0a0a0a;
          border: 1.5px solid #1a1a1a;
          border-radius: 12px;
          color: #ffffff;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          margin-bottom: 24px;
        }

        .back-button:hover {
          background: #151515;
          border-color: #ff5500;
          transform: translateX(-4px);
        }

        .content {
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 32px;
        }

        .stat-card {
          background: linear-gradient(135deg, rgba(10, 10, 10, 0.95) 0%, rgba(5, 5, 5, 0.98) 100%);
          border: 1px solid #1a1a1a;
          border-radius: 16px;
          padding: 24px;
          transition: all 0.3s;
          cursor: pointer;
        }

        .stat-card:hover {
          border-color: #ff5500;
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(255, 85, 0, 0.2);
        }

        .stat-card.active {
          border-color: #ff5500;
          background: linear-gradient(135deg, rgba(255, 85, 0, 0.1) 0%, rgba(255, 51, 0, 0.05) 100%);
        }

        .stat-label {
          font-size: 13px;
          color: #888888;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 8px;
        }

        .stat-value {
          font-size: 32px;
          font-weight: 800;
          color: #ffffff;
        }

        .deliveries-table-container {
          background: linear-gradient(135deg, rgba(10, 10, 10, 0.95) 0%, rgba(5, 5, 5, 0.98) 100%);
          border: 1px solid #1a1a1a;
          border-radius: 20px;
          padding: 32px;
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 85, 0, 0.2);
          overflow-x: auto;
        }

        .table-header {
          margin-bottom: 24px;
        }

        .table-title {
          font-size: 24px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 8px;
        }

        .table-description {
          color: #888888;
          font-size: 14px;
        }

        .deliveries-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0 12px;
        }

        .deliveries-table thead th {
          text-align: left;
          padding: 12px 16px;
          font-size: 12px;
          font-weight: 700;
          color: #888888;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-family: "Azeret Mono", monospace;
        }

        .deliveries-table tbody tr {
          background: #0a0a0a;
          border-radius: 12px;
          transition: all 0.2s;
        }

        .deliveries-table tbody tr:hover {
          background: #0f0f0f;
          transform: translateX(4px);
        }

        .deliveries-table tbody td {
          padding: 20px 16px;
          color: #ffffff;
          border-top: 1px solid #1a1a1a;
          border-bottom: 1px solid #1a1a1a;
        }

        .deliveries-table tbody td:first-child {
          border-left: 1px solid #1a1a1a;
          border-top-left-radius: 12px;
          border-bottom-left-radius: 12px;
        }

        .deliveries-table tbody td:last-child {
          border-right: 1px solid #1a1a1a;
          border-top-right-radius: 12px;
          border-bottom-right-radius: 12px;
        }

        .order-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .order-id {
          font-weight: 700;
          font-size: 16px;
          font-family: "Azeret Mono", monospace;
          color: #ffffff;
        }

        .user-email {
          color: #888888;
          font-size: 13px;
        }

        .route-info {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .route-location {
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .route-icon {
          font-size: 16px;
        }

        .status-badge {
          display: inline-block;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .status-select {
          background: #000000;
          border: 1.5px solid #1a1a1a;
          border-radius: 10px;
          padding: 10px 14px;
          color: #ffffff;
          font-size: 14px;
          font-weight: 600;
          font-family: "Urbanist", sans-serif;
          cursor: pointer;
          transition: all 0.2s;
          outline: none;
          min-width: 140px;
        }

        .status-select:hover {
          border-color: #ff5500;
        }

        .status-select:focus {
          border-color: #ff5500;
          box-shadow: 0 0 0 3px rgba(255, 85, 0, 0.2);
        }

        .date {
          color: #888888;
          font-size: 14px;
        }

        .package-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-size: 13px;
        }

        .package-type {
          color: #ffffff;
          font-weight: 600;
        }

        .package-weight {
          color: #888888;
        }

        .empty-state {
          text-align: center;
          padding: 80px 20px;
          color: #888888;
        }

        .empty-icon {
          font-size: 64px;
          margin-bottom: 16px;
          opacity: 0.5;
        }

        .empty-title {
          font-size: 20px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 8px;
        }

        @media (max-width: 768px) {
          .title {
            font-size: 32px;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .deliveries-table-container {
            padding: 20px;
          }

          .deliveries-table {
            font-size: 14px;
          }
        }
      `}</style>

      <div className="admin-header">
        <button className="back-button" onClick={() => router.push("/admin")}>
          ← Back to Admin Panel
        </button>
        <h1 className="title">Delivery Management</h1>
        <p className="subtitle">View and manage all delivery orders</p>
      </div>

      <div className="content">
        {/* Error Snackbar */}
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={handleCloseError}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert 
            onClose={handleCloseError} 
            severity="error" 
            variant="filled"
            sx={{
              backgroundColor: '#ff5500',
              color: '#ffffff',
              fontFamily: 'Urbanist, sans-serif',
              fontWeight: 600,
              borderRadius: '12px',
              boxShadow: '0 8px 24px rgba(255, 85, 0, 0.4)',
            }}
          >
            <AlertTitle sx={{ fontWeight: 700 }}>Error</AlertTitle>
            {error}
          </Alert>
        </Snackbar>

        {/* Success Snackbar */}
        <Snackbar
          open={!!success}
          autoHideDuration={4000}
          onClose={handleCloseSuccess}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert 
            onClose={handleCloseSuccess} 
            severity="success" 
            variant="filled"
            sx={{
              backgroundColor: '#00ff88',
              color: '#000000',
              fontFamily: 'Urbanist, sans-serif',
              fontWeight: 600,
              borderRadius: '12px',
              boxShadow: '0 8px 24px rgba(0, 255, 136, 0.4)',
            }}
          >
            <AlertTitle sx={{ fontWeight: 700, color: '#000000' }}>Success</AlertTitle>
            {success}
          </Alert>
        </Snackbar>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div 
            className={`stat-card ${filter === "All" ? "active" : ""}`}
            onClick={() => setFilter("All")}
          >
            <div className="stat-label">Total Deliveries</div>
            <div className="stat-value">{deliveries.length}</div>
          </div>
          {STATUSES.map((status) => (
            <div 
              key={status}
              className={`stat-card ${filter === status ? "active" : ""}`}
              onClick={() => setFilter(status)}
            >
              <div className="stat-label">{status}</div>
              <div className="stat-value">
                {deliveries.filter(d => d.status === status).length}
              </div>
            </div>
          ))}
        </div>

        {/* Deliveries Table */}
        <div className="deliveries-table-container">
          <div className="table-header">
            <h2 className="table-title">
              {filter === "All" ? "All Deliveries" : `${filter} Deliveries`}
            </h2>
            <p className="table-description">
              Showing {filteredDeliveries.length} of {deliveries.length} deliveries
            </p>
          </div>

          {filteredDeliveries.length > 0 ? (
            <table className="deliveries-table">
              <thead>
                <tr>
                  <th>Order Details</th>
                  <th>Route</th>
                  <th>Package</th>
                  <th>Current Status</th>
                  <th>Update Status</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {filteredDeliveries.map((delivery) => (
                  <tr key={delivery.id}>
                    <td>
                      <div className="order-info">
                        <div className="order-id">{delivery.orderId}</div>
                        <div className="user-email">{delivery.userEmail}</div>
                      </div>
                    </td>
                    <td>
                      <div className="route-info">
                        <div className="route-location">
                          <span className="route-icon">📍</span>
                          {delivery.from.city}, {delivery.from.state}
                        </div>
                        <div className="route-location">
                          <span className="route-icon">🎯</span>
                          {delivery.to.city}, {delivery.to.state}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="package-info">
                        <div className="package-type">{delivery.package.type}</div>
                        <div className="package-weight">{delivery.package.weight} lbs</div>
                      </div>
                    </td>
                    <td>
                      <span
                        className="status-badge"
                        style={{
                          backgroundColor: `${getStatusColor(delivery.status)}20`,
                          color: getStatusColor(delivery.status),
                          border: `1px solid ${getStatusColor(delivery.status)}40`,
                        }}
                      >
                        {delivery.status}
                      </span>
                    </td>
                    <td>
                      <select
                        className="status-select"
                        value={delivery.status}
                        onChange={(e) => handleStatusChange(delivery.id, delivery.orderId, e.target.value)}
                      >
                        {STATUSES.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <div className="date">
                        {delivery.createdAt?.toDate?.().toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }) || "N/A"}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">📦</div>
              <div className="empty-title">No {filter !== "All" ? filter : ""} Deliveries</div>
              <div className="empty-description">
                {filter === "All" 
                  ? "No deliveries have been created yet" 
                  : `No deliveries with status "${filter}"`
                }
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDeliveriesPage;