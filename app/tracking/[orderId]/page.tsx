/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import dynamic from "next/dynamic";

// Dynamically import MapComponent to avoid SSR issues with Leaflet
const MapComponent = dynamic(() => import("@/components/Mapcomponent"), {
  ssr: false,
  loading: () => (
    <div style={{ 
      height: "280px", 
      background: "#0a0a0a", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      color: "#666666"
    }}>
      Loading map...
    </div>
  ),
});

interface TrackingData {
  orderId: string;
  status: string;
  from: {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    coordinates?: { lat: number; lng: number };
  };
  to: {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    coordinates?: { lat: number; lng: number };
  };
  placedDate: string;
  estimatedDate: string;
  deliveryPartner?: {
    name: string;
    avatar: string;
  };
}

const TrackingPage = () => {
  const params = useParams();
  const router = useRouter();
  const orderId = params.orderId as string;
  
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (orderId) {
      fetchTrackingData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  const fetchTrackingData = async () => {
    if (!orderId) return;

    try {
      setLoading(true);
      setError("");

      const deliveriesRef = collection(db, "deliveries");
      const q = query(
        deliveriesRef,
        where("orderId", "==", orderId)
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError("Delivery not found");
        return;
      }

      const doc = querySnapshot.docs[0];
      const data = doc.data();

      // Format dates
      const createdAt = data.createdAt?.toDate?.() || new Date();
      const estimatedDate = new Date(data.estimatedDeliveryDate);

      // Get coordinates
      const fromCoordinates = data.from.coordinates || await getCoordinates(data.from.city, data.from.state);
      const toCoordinates = data.to.coordinates || await getCoordinates(data.to.city, data.to.state);

      setTrackingData({
        orderId: data.orderId,
        status: data.status,
        from: {
          name: data.from.name,
          address: data.from.address,
          city: data.from.city,
          state: data.from.state,
          zip: data.from.zip,
          coordinates: fromCoordinates,
        },
        to: {
          name: data.to.name,
          address: data.to.address,
          city: data.to.city,
          state: data.to.state,
          zip: data.to.zip,
          coordinates: toCoordinates,
        },
        placedDate: createdAt.toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        estimatedDate: estimatedDate.toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        deliveryPartner: {
          name: "Michael Johnson",
          avatar: "👨‍✈️",
        },
      });
    } catch (error) {
      console.error("Error fetching tracking data:", error);
      setError("Failed to load tracking information");
    } finally {
      setLoading(false);
    }
  };

  const getCoordinates = async (city: string, state: any,): Promise<{ lat: number; lng: number }> => {
    const cityCoordinates: { [key: string]: { lat: number; lng: number } } = {
      "Los Angeles": { lat: 34.0522, lng: -118.2437 },
      "New York": { lat: 40.7128, lng: -74.0060 },
      "Chicago": { lat: 41.8781, lng: -87.6298 },
      "San Francisco": { lat: 37.7749, lng: -122.4194 },
      "Miami": { lat: 25.7617, lng: -80.1918 },
      "Seattle": { lat: 47.6062, lng: -122.3321 },
      "Boston": { lat: 42.3601, lng: -71.0589 },
      "Austin": { lat: 30.2672, lng: -97.7431 },
    };

    return cityCoordinates[city] || { lat: 34.0522, lng: -118.2437 };
  };

  if (loading) {
    return (
      <div className="tracking-container">
        <style jsx>{`
          .tracking-container {
            min-height: 100vh;
            background: #000000;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: "Urbanist", sans-serif;
          }
          .loading-container {
            text-align: center;
            color: #666666;
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
        `}</style>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading tracking information...</p>
        </div>
      </div>
    );
  }

  if (error || !trackingData) {
    return (
      <div className="tracking-container">
        <style jsx>{`
          .tracking-container {
            min-height: 100vh;
            background: #000000;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: "Urbanist", sans-serif;
          }
          .error-container {
            text-align: center;
            padding: 40px;
          }
          .error-icon {
            font-size: 64px;
            margin-bottom: 16px;
          }
          .error-title {
            font-size: 24px;
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 8px;
          }
          .error-description {
            font-size: 16px;
            color: #666666;
            margin-bottom: 24px;
          }
          .back-button {
            padding: 14px 28px;
            background: linear-gradient(135deg, #ff5500, #ff3300);
            border: none;
            border-radius: 12px;
            color: #ffffff;
            font-size: 16px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s;
          }
          .back-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(255, 85, 0, 0.5);
          }
        `}</style>
        <div className="error-container">
          <div className="error-icon">📦</div>
          <div className="error-title">Delivery Not Found</div>
          <div className="error-description">
            {error || "The tracking information you're looking for doesn't exist."}
          </div>
          <button className="back-button" onClick={() => router.push("/")}>
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="tracking-container">
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Urbanist:wght@400;600;700;800&family=Azeret+Mono:wght@400;600&display=swap");

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .tracking-container {
          min-height: 100vh;
          background: #000000;
          padding: 20px;
          font-family: "Urbanist", sans-serif;
          position: relative;
          overflow: hidden;
        }

        .tracking-container::before {
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
          opacity: 0.5;
          pointer-events: none;
        }

        @keyframes gridScroll {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(60px, 60px);
          }
        }

        .glow-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.2;
          pointer-events: none;
        }

        .glow-orb-1 {
          width: 400px;
          height: 400px;
          background: #ff5500;
          top: 10%;
          right: -10%;
          animation: float1 10s ease-in-out infinite;
        }

        .glow-orb-2 {
          width: 350px;
          height: 350px;
          background: #ff4400;
          bottom: 20%;
          left: -10%;
          animation: float2 12s ease-in-out infinite;
        }

        @keyframes float1 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(30px, 30px) scale(1.1);
          }
        }

        @keyframes float2 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-30px, -30px) scale(1.15);
          }
        }

        .content-wrapper {
          max-width: 480px;
          margin: 0 auto;
          position: relative;
          z-index: 10;
          animation: slideIn 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 32px;
          padding-top: 20px;
        }

        .back-button {
          width: 48px;
          height: 48px;
          background: #0a0a0a;
          border: 1.5px solid #1a1a1a;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          font-size: 20px;
        }

        .back-button:hover {
          background: #151515;
          border-color: #ff5500;
          transform: translateX(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6),
            0 0 20px rgba(255, 85, 0, 0.2);
        }

        .page-title {
          font-size: 24px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.3px;
        }

        .tracking-card {
          background: linear-gradient(
            135deg,
            rgba(10, 10, 10, 0.95) 0%,
            rgba(5, 5, 5, 0.98) 100%
          );
          border: 1px solid #1a1a1a;
          border-radius: 28px;
          padding: 0;
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.8),
            0 0 0 1px rgba(255, 85, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.02),
            0 0 60px rgba(255, 85, 0, 0.15);
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(20px);
          margin-bottom: 24px;
        }

        .map-section {
          position: relative;
          height: 280px;
          background: #0a0a0a;
          border-radius: 28px 28px 0 0;
          overflow: hidden;
          border-bottom: 1px solid #1a1a1a;
        }

        .status-badge {
          position: absolute;
          top: 20px;
          right: 20px;
          background: linear-gradient(135deg, #ff5500, #ff3300);
          padding: 10px 20px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 700;
          color: #ffffff;
          box-shadow: 0 8px 24px rgba(255, 85, 0, 0.5),
            0 0 30px rgba(255, 85, 0, 0.3);
          animation: fadeInDown 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.2s
            backwards;
          z-index: 1000;
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .card-content {
          padding: 32px;
        }

        .order-id-section {
          text-align: center;
          margin-bottom: 32px;
          padding-bottom: 32px;
          border-bottom: 1px solid #1a1a1a;
        }

        .order-id-label {
          font-size: 13px;
          color: #666666;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-family: "Azeret Mono", monospace;
        }

        .order-id {
          font-size: 24px;
          font-weight: 700;
          color: #ffffff;
          font-family: "Azeret Mono", monospace;
          letter-spacing: 1px;
        }

        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-bottom: 32px;
        }

        .info-item {
          animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) backwards;
        }

        .info-item:nth-child(1) {
          animation-delay: 0.1s;
        }
        .info-item:nth-child(2) {
          animation-delay: 0.2s;
        }
        .info-item:nth-child(3) {
          animation-delay: 0.3s;
        }
        .info-item:nth-child(4) {
          animation-delay: 0.4s;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .info-label {
          font-size: 12px;
          color: #666666;
          margin-bottom: 8px;
          text-transform: capitalize;
        }

        .info-value {
          font-size: 15px;
          font-weight: 600;
          color: #ffffff;
          line-height: 1.5;
        }

        .info-value-large {
          font-size: 16px;
          font-weight: 700;
        }

        .delivery-partner {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
          background: #0a0a0a;
          border: 1.5px solid #1a1a1a;
          border-radius: 16px;
          margin-bottom: 24px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.5s backwards;
        }

        .delivery-partner:hover {
          border-color: #ff5500;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6),
            0 0 20px rgba(255, 85, 0, 0.15);
        }

        .partner-avatar {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #ff5500, #ff3300);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          box-shadow: 0 8px 24px rgba(255, 85, 0, 0.4);
        }

        .partner-info {
          flex: 1;
        }

        .partner-label {
          font-size: 12px;
          color: #666666;
          margin-bottom: 4px;
        }

        .partner-name {
          font-size: 16px;
          font-weight: 700;
          color: #ffffff;
        }

        .partner-actions {
          display: flex;
          gap: 12px;
        }

        .action-button {
          width: 44px;
          height: 44px;
          background: #151515;
          border: 1.5px solid #1a1a1a;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          font-size: 18px;
        }

        .action-button:hover {
          background: #1a1a1a;
          border-color: #ff5500;
          transform: scale(1.1);
          box-shadow: 0 4px 16px rgba(255, 85, 0, 0.3);
        }

        .live-tracking-button {
          width: 100%;
          padding: 20px 24px;
          background: linear-gradient(135deg, #ff5500 0%, #ff3300 100%);
          border: none;
          border-radius: 16px;
          color: #ffffff;
          font-size: 17px;
          font-weight: 700;
          font-family: "Urbanist", sans-serif;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 12px 32px rgba(255, 85, 0, 0.5),
            0 0 40px rgba(255, 85, 0, 0.3);
          animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.6s backwards;
          position: relative;
          overflow: hidden;
        }

        .live-tracking-button::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          transition: left 0.6s;
        }

        .live-tracking-button:hover::before {
          left: 100%;
        }

        .live-tracking-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 48px rgba(255, 85, 0, 0.6),
            0 0 60px rgba(255, 85, 0, 0.4);
        }

        .button-content {
          display: flex;
          align-items: center;
          gap: 12px;
          position: relative;
          z-index: 1;
        }

        .button-icon {
          width: 28px;
          height: 28px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
        }

        .button-arrow {
          font-size: 24px;
          position: relative;
          z-index: 1;
        }

        @media (max-width: 640px) {
          .card-content {
            padding: 24px;
          }

          .info-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .map-section {
            height: 240px;
          }
        }
      `}</style>

      <div className="glow-orb glow-orb-1"></div>
      <div className="glow-orb glow-orb-2"></div>

      <div className="content-wrapper">
        <div className="header">
          <button className="back-button" onClick={() => router.push("/")}>
            ←
          </button>
          <h1 className="page-title">Tracking Shipment</h1>
        </div>

        <div className="tracking-card">
          <div className="map-section">
            {trackingData.from.coordinates && trackingData.to.coordinates && (
              <MapComponent
                from={trackingData.from.coordinates}
                to={trackingData.to.coordinates}
                fromLabel={trackingData.from.city}
                toLabel={trackingData.to.city}
              />
            )}
            <div className="status-badge">{trackingData.status}</div>
          </div>

          <div className="card-content">
            <div className="order-id-section">
              <div className="order-id-label">Order ID</div>
              <div className="order-id">{trackingData.orderId}</div>
            </div>

            <div className="info-grid">
              <div className="info-item">
                <div className="info-label">From</div>
                <div className="info-value info-value-large">
                  {trackingData.from.name}
                </div>
                <div className="info-value">{trackingData.from.address}</div>
                <div className="info-value">
                  {trackingData.from.city}, {trackingData.from.state} {trackingData.from.zip}
                </div>
              </div>

              <div className="info-item">
                <div className="info-label">To</div>
                <div className="info-value info-value-large">
                  {trackingData.to.name}
                </div>
                <div className="info-value">{trackingData.to.address}</div>
                <div className="info-value">
                  {trackingData.to.city}, {trackingData.to.state} {trackingData.to.zip}
                </div>
              </div>

              <div className="info-item">
                <div className="info-label">Placed by</div>
                <div className="info-value info-value-large">
                  {trackingData.placedDate}
                </div>
              </div>

              <div className="info-item">
                <div className="info-label">Estimated Date</div>
                <div className="info-value info-value-large">
                  {trackingData.estimatedDate}
                </div>
              </div>
            </div>

            {trackingData.deliveryPartner && (
              <div className="delivery-partner">
                <div className="partner-avatar">
                  {trackingData.deliveryPartner.avatar}
                </div>
                <div className="partner-info">
                  <div className="partner-label">Delivery Partner</div>
                  <div className="partner-name">
                    {trackingData.deliveryPartner.name}
                  </div>
                </div>
                <div className="partner-actions">
                  <button className="action-button">💬</button>
                  <button className="action-button">📞</button>
                </div>
              </div>
            )}
          </div>
        </div>

        <button className="live-tracking-button">
          <div className="button-content">
            <div className="button-icon">📍</div>
            <span>Live Tracking</span>
          </div>
          <div className="button-arrow">››</div>
        </button>
      </div>
    </div>
  );
};

export default TrackingPage;