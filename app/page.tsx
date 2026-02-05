"use client";

import React, { useState } from "react";

const Page = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");

  const [shipments] = useState([
    {
      orderId: "ORD-123456789",
      status: "In Transit",
      statusColor: "orange",
      from: "Los Angeles",
      to: "New York",
      placedDate: "12 Jan, 2025",
      estimatedDate: "26 Jan, 2025",
      progress: 50,
      stages: [
        { name: "Packed", completed: true },
        { name: "Shipped", completed: true },
        { name: "In Transit", completed: false, current: true },
        { name: "Delivered", completed: false },
      ],
    },
    {
      orderId: "ORD-987654321",
      status: "Delivered",
      statusColor: "orange-full",
      from: "Los Angeles",
      to: "San Francisco",
      placedDate: "8 Jan, 2025",
      estimatedDate: "12 Jan, 2025",
      progress: 100,
      stages: [
        { name: "Packed", completed: true },
        { name: "Shipped", completed: true },
        { name: "In Transit", completed: true },
        { name: "Delivered", completed: true, current: true },
      ],
    },
    {
      orderId: "ORD-567890123",
      status: "Delivered",
      statusColor: "dark",
      from: "San Diego",
      to: "Portland",
      placedDate: "5 Jan, 2025",
      estimatedDate: "10 Jan, 2025",
      progress: 100,
      stages: [
        { name: "Packed", completed: true },
        { name: "Shipped", completed: true },
        { name: "In Transit", completed: true },
        { name: "Delivered", completed: true, current: true },
      ],
    },
  ]);

  const filteredShipments = shipments.filter(
    (shipment) =>
      shipment.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.to.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home-container">
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Urbanist:wght@400;600;700;800&family=Azeret+Mono:wght@400;600&display=swap");

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .home-container {
          min-height: 100vh;
          background: #000000;
          padding: 20px 20px 100px 20px;
          font-family: "Urbanist", sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* Animated grid background */
        .home-container::before {
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
          top: 0%;
          right: -10%;
          animation: float1 10s ease-in-out infinite;
        }

        .glow-orb-2 {
          width: 350px;
          height: 350px;
          background: #ff4400;
          bottom: 10%;
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
          max-width: 600px;
          margin: 0 auto;
          position: relative;
          z-index: 10;
        }

        /* Search bar */
        .search-container {
          margin-bottom: 32px;
          animation: fadeInDown 0.5s cubic-bezier(0.16, 1, 0.3, 1);
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

        .search-wrapper {
          position: relative;
        }

        .search-input {
          width: 100%;
          padding: 18px 56px 18px 20px;
          background: rgba(15, 15, 15, 0.8);
          border: 1.5px solid #1a1a1a;
          border-radius: 16px;
          color: #ffffff;
          font-size: 16px;
          font-family: "Urbanist", sans-serif;
          font-weight: 500;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          outline: none;
          backdrop-filter: blur(20px);
        }

        .search-input::placeholder {
          color: #666666;
        }

        .search-input:focus {
          background: rgba(0, 0, 0, 0.95);
          border-color: #ff5500;
          box-shadow: 0 0 0 4px rgba(255, 85, 0, 0.2),
            0 8px 24px rgba(0, 0, 0, 0.6), 0 0 30px rgba(255, 85, 0, 0.15);
        }

        .search-icon {
          position: absolute;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
          color: #666666;
          font-size: 22px;
          pointer-events: none;
        }

        /* Shipments list */
        .shipments-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        /* Shipment card */
        .shipment-card {
          background: linear-gradient(
            135deg,
            rgba(10, 10, 10, 0.95) 0%,
            rgba(5, 5, 5, 0.98) 100%
          );
          border: 1.5px solid #1a1a1a;
          border-radius: 24px;
          padding: 24px;
          box-shadow: 0 12px 48px rgba(0, 0, 0, 0.6),
            0 0 0 1px rgba(255, 85, 0, 0.1), 0 0 40px rgba(255, 85, 0, 0.08);
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(20px);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) backwards;
        }

        .shipment-card:nth-child(1) {
          animation-delay: 0.1s;
        }
        .shipment-card:nth-child(2) {
          animation-delay: 0.2s;
        }
        .shipment-card:nth-child(3) {
          animation-delay: 0.3s;
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

        .shipment-card:hover {
          border-color: #ff5500;
          box-shadow: 0 16px 64px rgba(0, 0, 0, 0.8),
            0 0 0 1px rgba(255, 85, 0, 0.3), 0 0 60px rgba(255, 85, 0, 0.2);
          transform: translateY(-4px);
        }

        .shipment-card-full {
          background: linear-gradient(135deg, #ff5500 0%, #ff3300 100%);
          border-color: #ff5500;
          box-shadow: 0 12px 48px rgba(255, 85, 0, 0.4),
            0 0 60px rgba(255, 85, 0, 0.3);
        }

        .shipment-card-full:hover {
          box-shadow: 0 16px 64px rgba(255, 85, 0, 0.6),
            0 0 80px rgba(255, 85, 0, 0.4);
        }

        .shipment-card-full .order-id,
        .shipment-card-full .info-label,
        .shipment-card-full .info-value,
        .shipment-card-full .stage-name {
          color: #ffffff !important;
        }

        .shipment-card-full .status-badge {
          background: rgba(255, 255, 255, 0.2);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        /* Compact card for third item */
        .shipment-card-compact {
          padding: 20px 24px;
        }

        .shipment-card-compact .card-info,
        .shipment-card-compact .progress-tracker {
          display: none;
        }

        /* Card header */
        .card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .shipment-card-compact .card-header {
          margin-bottom: 0;
        }

        .order-id {
          font-size: 20px;
          font-weight: 700;
          color: #ffffff;
          font-family: "Azeret Mono", monospace;
          letter-spacing: 0.5px;
        }

        .status-badge {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          padding: 8px 16px;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 700;
          color: #ffffff;
        }

        /* Card info */
        .card-info {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 24px;
        }

        .info-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .info-label {
          font-size: 13px;
          color: #666666;
          font-weight: 500;
        }

        .info-value {
          font-size: 15px;
          font-weight: 700;
          color: #ffffff;
        }

        /* Progress tracker */
        .progress-tracker {
          position: relative;
          padding-top: 8px;
        }

        .progress-line {
          position: absolute;
          top: 20px;
          left: 0;
          right: 0;
          height: 3px;
          background: #1a1a1a;
          border-radius: 2px;
        }

        .progress-fill {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          background: linear-gradient(90deg, #ff5500, #ff3300);
          border-radius: 2px;
          transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 0 10px rgba(255, 85, 0, 0.6);
        }

        .stages {
          display: flex;
          justify-content: space-between;
          position: relative;
        }

        .stage {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          flex: 1;
          position: relative;
          z-index: 2;
        }

        .stage-dot {
          width: 16px;
          height: 16px;
          background: #0a0a0a;
          border: 3px solid #1a1a1a;
          border-radius: 50%;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .stage-dot-completed {
          background: #ff5500;
          border-color: #ff5500;
          box-shadow: 0 0 20px rgba(255, 85, 0, 0.6);
        }

        .stage-dot-current {
          background: #ff5500;
          border-color: #ff5500;
          box-shadow: 0 0 20px rgba(255, 85, 0, 0.8);
          animation: currentDotPulse 2s ease-in-out infinite;
        }

        @keyframes currentDotPulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.3);
          }
        }

        .stage-name {
          font-size: 12px;
          font-weight: 600;
          color: #666666;
          text-align: center;
          white-space: nowrap;
        }

        .stage-name-completed,
        .stage-name-current {
          color: #ffffff;
        }

        /* Bottom Navigation */
        .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(
            135deg,
            rgba(10, 10, 10, 0.98) 0%,
            rgba(5, 5, 5, 0.98) 100%
          );
          border-top: 1.5px solid #1a1a1a;
          padding: 16px 20px 24px;
          backdrop-filter: blur(40px);
          z-index: 100;
          box-shadow: 0 -12px 48px rgba(0, 0, 0, 0.8),
            0 0 60px rgba(255, 85, 0, 0.08);
          animation: slideInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .nav-wrapper {
          max-width: 600px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-around;
          position: relative;
        }

        .nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          padding: 8px 16px;
          border-radius: 12px;
          position: relative;
        }

        .nav-item:hover {
          transform: translateY(-2px);
        }

        .nav-icon {
          font-size: 24px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          filter: grayscale(100%);
          opacity: 0.5;
        }

        .nav-item-active .nav-icon {
          filter: grayscale(0%);
          opacity: 1;
          transform: scale(1.1);
        }

        .nav-label {
          font-size: 11px;
          font-weight: 600;
          color: #666666;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .nav-item-active .nav-label {
          color: #ff5500;
        }

        /* FAB button */
        .fab-button {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, #ff5500 0%, #ff3300 100%);
          border: none;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 28px;
          color: #ffffff;
          box-shadow: 0 12px 32px rgba(255, 85, 0, 0.5),
            0 0 40px rgba(255, 85, 0, 0.3), 0 0 0 6px #000000;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          animation: fabPulse 3s ease-in-out infinite;
        }

        @keyframes fabPulse {
          0%,
          100% {
            box-shadow: 0 12px 32px rgba(255, 85, 0, 0.5),
              0 0 40px rgba(255, 85, 0, 0.3), 0 0 0 6px #000000;
          }
          50% {
            box-shadow: 0 16px 48px rgba(255, 85, 0, 0.6),
              0 0 60px rgba(255, 85, 0, 0.4), 0 0 0 6px #000000;
          }
        }

        .fab-button:hover {
          transform: translate(-50%, -50%) scale(1.1) rotate(90deg);
          box-shadow: 0 16px 48px rgba(255, 85, 0, 0.7),
            0 0 80px rgba(255, 85, 0, 0.5), 0 0 0 6px #000000;
        }

        .fab-button:active {
          transform: translate(-50%, -50%) scale(0.95) rotate(90deg);
        }

        /* Empty state */
        .empty-state {
          text-align: center;
          padding: 80px 20px;
          animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.2s backwards;
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

        .empty-description {
          font-size: 15px;
          color: #666666;
        }

        /* Responsive */
        @media (max-width: 640px) {
          .nav-wrapper {
            justify-content: space-between;
          }

          .nav-item {
            padding: 8px 12px;
          }

          .card-info {
            grid-template-columns: 1fr;
          }

          .stage-name {
            font-size: 11px;
          }

          .order-id {
            font-size: 16px;
          }
        }
      `}</style>

      {/* Background elements */}
      <div className="glow-orb glow-orb-1"></div>
      <div className="glow-orb glow-orb-2"></div>

      <div className="content-wrapper">
        {/* Search */}
        <div className="search-container">
          <div className="search-wrapper">
            <input
              type="text"
              className="search-input"
              placeholder="Search Shipping"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="search-icon">🔍</span>
          </div>
        </div>

        {/* Shipments list */}
        <div className="shipments-list">
          {filteredShipments.length > 0 ? (
            filteredShipments.map((shipment, index) => (
              <div
                key={shipment.orderId}
                className={`shipment-card ${
                  shipment.statusColor === "orange-full"
                    ? "shipment-card-full"
                    : ""
                } ${index === 2 ? "shipment-card-compact" : ""}`}
              >
                {/* Card header */}
                <div className="card-header">
                  <div className="order-id">{shipment.orderId}</div>
                  <div className="status-badge">{shipment.status}</div>
                </div>

                {/* Card info - hidden for compact */}
                {index !== 2 && (
                  <>
                    <div className="card-info">
                      <div className="info-group">
                        <div className="info-label">From</div>
                        <div className="info-value">{shipment.from}</div>
                      </div>
                      <div className="info-group">
                        <div className="info-label">To</div>
                        <div className="info-value">{shipment.to}</div>
                      </div>
                      <div className="info-group">
                        <div className="info-label">Placed by</div>
                        <div className="info-value">{shipment.placedDate}</div>
                      </div>
                      <div className="info-group">
                        <div className="info-label">Estimated Date</div>
                        <div className="info-value">
                          {shipment.estimatedDate}
                        </div>
                      </div>
                    </div>

                    {/* Progress tracker */}
                    <div className="progress-tracker">
                      <div className="progress-line">
                        <div
                          className="progress-fill"
                          style={{ width: `${shipment.progress}%` }}
                        ></div>
                      </div>
                      <div className="stages">
                        {shipment.stages.map((stage, idx) => (
                          <div key={idx} className="stage">
                            <div
                              className={`stage-dot ${
                                stage.completed
                                  ? "stage-dot-completed"
                                  : stage.current
                                  ? "stage-dot-current"
                                  : ""
                              }`}
                            ></div>
                            <div
                              className={`stage-name ${
                                stage.completed || stage.current
                                  ? stage.completed
                                    ? "stage-name-completed"
                                    : "stage-name-current"
                                  : ""
                              }`}
                            >
                              {stage.name}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))
          ) : (
            <div className="empty-state">
              <div className="empty-icon">📦</div>
              <div className="empty-title">No shipments found</div>
              <div className="empty-description">
                Try adjusting your search query
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <div className="nav-wrapper">
          <div
            className={`nav-item ${
              activeTab === "home" ? "nav-item-active" : ""
            }`}
            onClick={() => setActiveTab("home")}
          >
            <div className="nav-icon">🏠</div>
          </div>

          <div
            className={`nav-item ${
              activeTab === "truck" ? "nav-item-active" : ""
            }`}
            onClick={() => setActiveTab("truck")}
          >
            <div className="nav-icon">🚚</div>
          </div>

          {/* FAB Button */}
          <button className="fab-button" onClick={() => console.log("Add new")}>
            +
          </button>

          <div
            className={`nav-item ${
              activeTab === "chat" ? "nav-item-active" : ""
            }`}
            onClick={() => setActiveTab("chat")}
          >
            <div className="nav-icon">💬</div>
          </div>

          {/* <div
            className={`nav-item ${
              activeTab === "settings" ? "nav-item-active" : ""
            }`}
            onClick={() => setActiveTab("settings")}
          >
            <div className="nav-icon">⚙️</div>
          </div> */}
        </div>
      </nav>
    </div>
  );
};

export default Page;
