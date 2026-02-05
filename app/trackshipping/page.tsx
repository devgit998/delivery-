"use client";

import React, { useState } from "react";

const Page = () => {
  const [trackingData] = useState({
    orderId: "ORD-123456789",
    status: "In Transit",
    from: {
      name: "Warehouse A",
      address: "123 Industrial Park, Los Angeles, CA 90001",
    },
    to: {
      name: "Central Logistics Hub, 101",
      address: "Commerce Drive, Dallas, TX 75201",
    },
    placedDate: "12 Jan, 2025",
    estimatedDate: "26 Jan, 2025",
    deliveryPartner: {
      name: "Michael Johnson",
      avatar: "👨‍✈️",
    },
  });

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

        /* Animated grid background */
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

        /* Glowing orbs */
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

        /* Content wrapper */
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

        /* Header */
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

        /* Main tracking card */
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

        /* Map section */
        .map-section {
          position: relative;
          height: 280px;
          background: #0a0a0a;
          border-radius: 28px 28px 0 0;
          overflow: hidden;
          border-bottom: 1px solid #1a1a1a;
        }

        .map-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(0, 0, 0, 0.7) 0%,
            rgba(0, 0, 0, 0.5) 100%
          );
          backdrop-filter: blur(2px);
        }

        .map-pattern {
          position: absolute;
          inset: 0;
          opacity: 0.4;
          background-color: #0d1117;
          background-image: 
            /* Major roads */ linear-gradient(
              45deg,
              transparent 48%,
              rgba(60, 70, 80, 0.5) 48%,
              rgba(60, 70, 80, 0.5) 52%,
              transparent 52%
            ),
            linear-gradient(
              -45deg,
              transparent 48%,
              rgba(60, 70, 80, 0.5) 48%,
              rgba(60, 70, 80, 0.5) 52%,
              transparent 52%
            ),
            /* Grid streets */
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 40px,
                rgba(255, 255, 255, 0.08) 40px,
                rgba(255, 255, 255, 0.08) 42px
              ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 40px,
              rgba(255, 255, 255, 0.08) 40px,
              rgba(255, 255, 255, 0.08) 42px
            ),
            /* Blocks */
              repeating-linear-gradient(
                0deg,
                rgba(20, 25, 30, 0.8),
                rgba(20, 25, 30, 0.8) 80px,
                rgba(15, 20, 25, 0.9) 80px,
                rgba(15, 20, 25, 0.9) 160px
              ),
            repeating-linear-gradient(
              90deg,
              rgba(20, 25, 30, 0.8),
              rgba(20, 25, 30, 0.8) 80px,
              rgba(15, 20, 25, 0.9) 80px,
              rgba(15, 20, 25, 0.9) 160px
            );
          background-size: 200px 200px, 200px 200px, 100% 100%, 100% 100%,
            100% 100%, 100% 100%;
        }

        .map-buildings {
          position: absolute;
          inset: 0;
          opacity: 0.3;
        }

        .building {
          position: absolute;
          background: rgba(40, 50, 60, 0.6);
          border: 1px solid rgba(60, 70, 80, 0.4);
        }

        .building-1 {
          width: 35px;
          height: 25px;
          top: 15%;
          left: 12%;
        }

        .building-2 {
          width: 28px;
          height: 30px;
          top: 25%;
          left: 25%;
        }

        .building-3 {
          width: 40px;
          height: 20px;
          top: 45%;
          left: 15%;
        }

        .building-4 {
          width: 32px;
          height: 28px;
          top: 20%;
          right: 18%;
        }

        .building-5 {
          width: 38px;
          height: 22px;
          top: 50%;
          right: 12%;
        }

        .building-6 {
          width: 30px;
          height: 35px;
          bottom: 20%;
          left: 20%;
        }

        .building-7 {
          width: 45px;
          height: 18px;
          bottom: 15%;
          right: 25%;
        }

        .route-line {
          position: absolute;
          top: 50%;
          left: 15%;
          width: 70%;
          height: 80%;
          transform: translateY(-50%);
          pointer-events: none;
        }

        .route-path {
          position: absolute;
          top: 50%;
          left: 0;
          width: 100%;
          height: 100px;
          transform: translateY(-50%);
        }

        .route-svg {
          width: 100%;
          height: 100%;
        }

        .route-dot {
          position: absolute;
          width: 12px;
          height: 12px;
          background: #ff5500;
          border-radius: 50%;
          box-shadow: 0 0 20px rgba(255, 85, 0, 0.8);
        }

        .route-dot-start {
          top: 50%;
          left: 15%;
          transform: translate(-50%, -50%);
        }

        .route-dot-end {
          top: 50%;
          right: 15%;
          transform: translate(50%, -50%);
          animation: dotPulse 1.5s ease-in-out infinite;
        }

        @keyframes dotPulse {
          0%,
          100% {
            transform: translate(50%, -50%) scale(1);
          }
          50% {
            transform: translate(50%, -50%) scale(1.3);
          }
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

        /* Card content */
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

        /* Info grid */
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

        /* Delivery partner */
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

        /* Live tracking button */
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

        /* Responsive */
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

      {/* Background elements */}
      <div className="glow-orb glow-orb-1"></div>
      <div className="glow-orb glow-orb-2"></div>

      <div className="content-wrapper">
        {/* Header */}
        <div className="header">
          <button className="back-button" onClick={() => window.history.back()}>
            ←
          </button>
          <h1 className="page-title">Tracking Shipment</h1>
        </div>

        {/* Main tracking card */}
        <div className="tracking-card">
          {/* Map section */}
          <div className="map-section">
            <div className="map-overlay"></div>
            <div className="map-pattern"></div>

            {/* Mock buildings */}
            <div className="map-buildings">
              <div className="building building-1"></div>
              <div className="building building-2"></div>
              <div className="building building-3"></div>
              <div className="building building-4"></div>
              <div className="building building-5"></div>
              <div className="building building-6"></div>
              <div className="building building-7"></div>
            </div>

            {/* Route with curves */}
            <div className="route-line">
              <svg
                className="route-svg"
                viewBox="0 0 400 100"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id="routeGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#ff5500" />
                    <stop offset="100%" stopColor="#ff3300" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <path
                  d="M 0 50 Q 50 30, 100 45 T 200 50 Q 250 55, 300 40 T 400 50"
                  fill="none"
                  stroke="url(#routeGradient)"
                  strokeWidth="3"
                  filter="url(#glow)"
                  opacity="0.9"
                >
                  <animate
                    attributeName="stroke-dasharray"
                    from="0 1000"
                    to="1000 0"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </path>
              </svg>
            </div>

            <div className="route-dot route-dot-start"></div>
            <div className="route-dot route-dot-end"></div>
            <div className="status-badge">{trackingData.status}</div>
          </div>

          {/* Card content */}
          <div className="card-content">
            {/* Order ID */}
            <div className="order-id-section">
              <div className="order-id-label">Order ID</div>
              <div className="order-id">{trackingData.orderId}</div>
            </div>

            {/* Info grid */}
            <div className="info-grid">
              <div className="info-item">
                <div className="info-label">From</div>
                <div className="info-value info-value-large">
                  {trackingData.from.name}
                </div>
                <div className="info-value">{trackingData.from.address}</div>
              </div>

              <div className="info-item">
                <div className="info-label">To</div>
                <div className="info-value info-value-large">
                  {trackingData.to.name}
                </div>
                <div className="info-value">{trackingData.to.address}</div>
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

            {/* Delivery partner */}
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
          </div>
        </div>

        {/* Live tracking button */}
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

export default Page;
