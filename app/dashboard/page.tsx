"use client";

import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const DashboardPage = () => {
  const { user, userData, logout } = useAuth();

  // Get the best available name
  const getDisplayName = () => {
    if (userData?.displayName) return userData.displayName;
    if (user?.displayName) return user.displayName;
    if (user?.email) return user.email.split('@')[0]; // Use part before @
    return "User";
  };

  return (
    <ProtectedRoute>
      <div className="dashboard-container">
        <style jsx>{`
          @import url("https://fonts.googleapis.com/css2?family=Urbanist:wght@400;600;700;800&display=swap");

          .dashboard-container {
            min-height: 100vh;
            background: #000000;
            padding: 40px 20px;
            font-family: "Urbanist", sans-serif;
          }

          .dashboard-header {
            max-width: 1200px;
            margin: 0 auto 60px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 20px;
          }

          .welcome-section h1 {
            font-size: 42px;
            font-weight: 800;
            background: linear-gradient(135deg, #ffffff 0%, #a0a0a0 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 8px;
          }

          .welcome-section p {
            color: #888888;
            font-size: 18px;
          }

          .header-actions {
            display: flex;
            gap: 12px;
          }

          .btn {
            padding: 14px 28px;
            border-radius: 12px;
            font-size: 15px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            border: none;
            font-family: "Urbanist", sans-serif;
          }

          .btn-primary {
            background: linear-gradient(135deg, #ff5500 0%, #ff3300 100%);
            color: #ffffff;
            box-shadow: 0 8px 24px rgba(255, 85, 0, 0.4);
          }

          .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 32px rgba(255, 85, 0, 0.5);
          }

          .btn-secondary {
            background: #0a0a0a;
            color: #ffffff;
            border: 1.5px solid #1a1a1a;
          }

          .btn-secondary:hover {
            background: #151515;
            border-color: #ff5500;
            transform: translateY(-2px);
          }

          .dashboard-content {
            max-width: 1200px;
            margin: 0 auto;
          }

          .info-card {
            background: linear-gradient(
              135deg,
              rgba(10, 10, 10, 0.95) 0%,
              rgba(5, 5, 5, 0.98) 100%
            );
            border: 1px solid #1a1a1a;
            border-radius: 24px;
            padding: 48px;
            box-shadow: 0 24px 80px rgba(0, 0, 0, 0.8),
              0 0 0 1px rgba(255, 85, 0, 0.2);
            position: relative;
            overflow: hidden;
          }

          .info-card::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(
              90deg,
              transparent,
              #ff5500 30%,
              #ff3300 50%,
              #ff5500 70%,
              transparent
            );
          }

          .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 32px;
            margin-top: 32px;
          }

          .info-item {
            padding: 24px;
            background: #0a0a0a;
            border: 1px solid #1a1a1a;
            border-radius: 16px;
          }

          .info-label {
            font-size: 12px;
            font-weight: 700;
            color: #888888;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 8px;
          }

          .info-value {
            font-size: 20px;
            font-weight: 700;
            color: #ffffff;
          }

          .role-badge {
            display: inline-block;
            padding: 6px 16px;
            background: rgba(255, 85, 0, 0.2);
            border: 1px solid rgba(255, 85, 0, 0.4);
            border-radius: 8px;
            color: #ff5500;
            font-size: 14px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
          }

          .debug-info {
            margin-top: 24px;
            padding: 16px;
            background: #0a0a0a;
            border: 1px solid #ff5500;
            border-radius: 12px;
            color: #ff5500;
            font-size: 12px;
            font-family: monospace;
          }

          @media (max-width: 768px) {
            .dashboard-header {
              flex-direction: column;
              align-items: flex-start;
            }

            .welcome-section h1 {
              font-size: 32px;
            }

            .info-card {
              padding: 32px 24px;
            }

            .info-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>

        <div className="dashboard-header">
          <div className="welcome-section">
            <h1>Welcome, {getDisplayName()}!</h1>
            <p>Manage your deliveries and track packages</p>
          </div>
          <div className="header-actions">
            <button className="btn btn-secondary" onClick={logout}>
              Sign Out
            </button>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="info-card">
            <h2 style={{ color: "#ffffff", fontSize: "28px", fontWeight: "800", marginBottom: "8px" }}>
              Account Information
            </h2>
            <p style={{ color: "#888888", fontSize: "16px" }}>
              Your profile details and account status
            </p>

            <div className="info-grid">
              <div className="info-item">
                <div className="info-label">Email</div>
                <div className="info-value">{user?.email || "N/A"}</div>
              </div>

              <div className="info-item">
                <div className="info-label">Display Name</div>
                <div className="info-value">
                  {userData?.displayName || user?.displayName || "Not set"}
                </div>
              </div>

              <div className="info-item">
                <div className="info-label">Role</div>
                <div className="info-value">
                  <span className="role-badge">{userData?.role || "loading..."}</span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-label">Account Created</div>
                <div className="info-value">
                  {userData?.createdAt
                    ? new Date(userData.createdAt).toLocaleDateString()
                    : "N/A"}
                </div>
              </div>
            </div>

            {/* Debug info - Remove this after testing */}
            {/* <div className="debug-info">
              <strong>Debug Info:</strong><br/>
              User UID: {user?.uid || "null"}<br/>
              UserData: {userData ? "exists" : "null"}<br/>
              UserData DisplayName: {userData?.displayName || "null"}<br/>
              Firebase Auth DisplayName: {user?.displayName || "null"}
            </div> */}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;