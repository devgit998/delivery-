"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SpeedexLoader from "@/components/SpeedexLoader";
import { useAuth } from "../contexts/AuthContext";

export default function HomePage() {
  const [showLoader, setShowLoader] = useState(true);
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Show loader for at least 3 seconds
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Redirect to dashboard if user is logged in and loader is done
    if (!loading && !showLoader && user) {
      router.push("/dashboard");
    }
  }, [user, loading, showLoader, router]);

  // If still loading auth or showing loader, show the loader component
  if (loading || showLoader) {
    return <SpeedexLoader />;
  }

  // If not logged in, show landing page
  return (
    <div className="landing-container">
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Urbanist:wght@400;600;700;800&family=Orbitron:wght:700;900&display=swap");

        .landing-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          position: relative;
          overflow: hidden;
          font-family: "Urbanist", sans-serif;
        }

        /* Animated grid background */
        .landing-container::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: linear-gradient(rgba(255, 107, 53, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 107, 53, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: gridScroll 20s linear infinite;
          opacity: 0.5;
        }

        @keyframes gridScroll {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }

        .content {
          position: relative;
          z-index: 10;
          text-align: center;
          max-width: 800px;
        }

        .logo {
          font-family: "Orbitron", monospace;
          font-size: 72px;
          font-weight: 900;
          letter-spacing: 4px;
          background: linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #ff385c 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 24px;
          filter: drop-shadow(0 0 30px rgba(255, 107, 53, 0.5));
        }

        .tagline {
          font-size: 24px;
          color: #ff6b35;
          font-weight: 600;
          letter-spacing: 4px;
          text-transform: uppercase;
          margin-bottom: 48px;
          opacity: 0.9;
        }

        .description {
          font-size: 18px;
          color: #a0a0a0;
          line-height: 1.8;
          margin-bottom: 64px;
        }

        .button-group {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn {
          padding: 18px 48px;
          border-radius: 14px;
          font-size: 17px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          border: none;
          text-decoration: none;
          display: inline-block;
          font-family: "Urbanist", sans-serif;
          position: relative;
          overflow: hidden;
        }

        .btn-primary {
          background: linear-gradient(135deg, #ff6b35 0%, #ff3300 100%);
          color: #ffffff;
          box-shadow: 0 12px 32px rgba(255, 107, 53, 0.5),
            0 0 40px rgba(255, 107, 53, 0.3);
        }

        .btn-primary::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.6s;
        }

        .btn-primary:hover::before {
          left: 100%;
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 48px rgba(255, 107, 53, 0.6),
            0 0 60px rgba(255, 107, 53, 0.4);
        }

        .btn-secondary {
          background: rgba(10, 10, 10, 0.8);
          color: #ffffff;
          border: 1.5px solid #ff6b35;
        }

        .btn-secondary:hover {
          background: rgba(255, 107, 53, 0.1);
          border-color: #ff3300;
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.8);
        }

        @media (max-width: 640px) {
          .logo {
            font-size: 48px;
          }

          .tagline {
            font-size: 18px;
          }

          .description {
            font-size: 16px;
          }

          .button-group {
            flex-direction: column;
          }

          .btn {
            width: 100%;
          }
        }
      `}</style>

      <div className="content">
        <h1 className="logo">SPEEDEX</h1>
        <p className="tagline">Lightning Fast Delivery</p>
        <p className="description">
          Track your packages in real-time with the most advanced delivery
          tracking system. Experience speed, reliability, and transparency like
          never before.
        </p>
        <div className="button-group">
          <a href="/auth/sign-in" className="btn btn-primary">
            Sign In
          </a>
          <a href="/auth/sign-up" className="btn btn-secondary">
            Create Account
          </a>
        </div>
      </div>
    </div>
  );
}
