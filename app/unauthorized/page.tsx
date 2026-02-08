"use client";

import React from "react";
import Link from "next/link";

const UnauthorizedPage = () => {
  return (
    <div className="unauthorized-container">
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Urbanist:wght@400;600;700;800&display=swap");

        .unauthorized-container {
          min-height: 100vh;
          background: #000000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          font-family: "Urbanist", sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* Animated grid background */
        .unauthorized-container::before {
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
        }

        @keyframes gridScroll {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(60px, 60px);
          }
        }

        .content-wrapper {
          position: relative;
          z-index: 10;
          text-align: center;
          max-width: 600px;
        }

        .error-icon {
          font-size: 120px;
          margin-bottom: 32px;
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .error-code {
          font-size: 72px;
          font-weight: 800;
          background: linear-gradient(135deg, #ff5500 0%, #ff3300 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 16px;
          line-height: 1;
        }

        .error-title {
          font-size: 36px;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 16px;
        }

        .error-message {
          font-size: 18px;
          color: #888888;
          line-height: 1.6;
          margin-bottom: 48px;
        }

        .button-group {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn {
          padding: 16px 32px;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          border: none;
          text-decoration: none;
          display: inline-block;
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

        @media (max-width: 640px) {
          .error-code {
            font-size: 56px;
          }

          .error-title {
            font-size: 28px;
          }

          .error-message {
            font-size: 16px;
          }

          .button-group {
            flex-direction: column;
          }
        }
      `}</style>

      <div className="content-wrapper">
        <div className="error-icon">🚫</div>
        <div className="error-code">403</div>
        <h1 className="error-title">Access Denied</h1>
        <p className="error-message">
          You don&apos;t have permission to access this page. This area is
          restricted to users with specific roles or privileges.
        </p>
        <div className="button-group">
          <Link href="/dashboard" className="btn btn-primary">
            Go to Dashboard
          </Link>
          <Link href="/auth/sign-in" className="btn btn-secondary">
            Sign Out
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
