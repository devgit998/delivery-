"use client";

import { History, Home, MessageSquare, Settings, Truck, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";

const Navigation = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/history", icon: History, label: "History", requiresAuth: true },
    { href: "/create", icon: Truck, label: "Create", isCenter: true, requiresAuth: true },
    { href: "/messages", icon: MessageSquare, label: "Messages", isContact: true },
    { href: "/dashboard", icon: Settings, label: "Dashboard", requiresAuth: true },
  ];

  const handleFabClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      router.push("/auth/sign-in");
    } else {
      router.push("/create");
    }
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowContactModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!trackingNumber.trim()) {
      setSearchError("Please enter a tracking number");
      return;
    }

    setSearchLoading(true);
    setSearchError("");

    try {
      const deliveriesRef = collection(db, "deliveries");
      const q = query(
        deliveriesRef,
        where("orderId", "==", trackingNumber.trim())
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setSearchError("Order not found. Please check the tracking number and try again.");
        setSearchLoading(false);
        return;
      }

      // Order found, redirect to tracking page
      setShowModal(false);
      setTrackingNumber("");
      router.push(`/tracking/${trackingNumber.trim()}`);
    } catch (error) {
      console.error("Error searching for order:", error);
      setSearchError("Failed to search. Please try again.");
      setSearchLoading(false);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setTrackingNumber("");
    setSearchError("");
    setSearchLoading(false);
  };

  const handleContactClose = () => {
    setShowContactModal(false);
  };

  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Urbanist:wght@400;600;700;800&display=swap");

        .bottom-navigation {
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
          font-family: "Urbanist", sans-serif;
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
          text-decoration: none;
          flex: 1;
          max-width: 80px;
        }

        .nav-item:hover {
          transform: translateY(-2px);
        }

        .nav-icon {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          opacity: 0.5;
          filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.3))
            drop-shadow(0 0 8px rgba(255, 255, 255, 0.2));
        }

        .nav-item-active .nav-icon {
          opacity: 1;
          transform: scale(1.1);
          color: #ff5500;
          filter: drop-shadow(0 0 6px rgba(255, 85, 0, 0.6))
            drop-shadow(0 0 12px rgba(255, 85, 0, 0.4))
            drop-shadow(0 0 2px rgba(255, 255, 255, 0.8));
        }

        .nav-item:not(.nav-item-active) .nav-icon {
          color: #ffffff;
          filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.4))
            drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))
            drop-shadow(0 0 12px rgba(255, 255, 255, 0.2));
        }

        .nav-item:hover .nav-icon {
          opacity: 0.8;
          filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.6))
            drop-shadow(0 0 12px rgba(255, 255, 255, 0.4));
        }

        .nav-label {
          font-size: 11px;
          font-weight: 600;
          color: #666666;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .nav-item-active .nav-label {
          color: #ff5500;
          font-weight: 700;
        }

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
          color: #ffffff;
          box-shadow: 0 12px 32px rgba(255, 85, 0, 0.5),
            0 0 40px rgba(255, 85, 0, 0.3), 0 0 0 6px #000000;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          animation: fabPulse 3s ease-in-out infinite;
          text-decoration: none;
        }

        .fab-button svg {
          filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.6))
            drop-shadow(0 0 8px rgba(255, 255, 255, 0.4));
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

        /* Add padding to body to prevent content being hidden */
        body {
          padding-bottom: 100px;
        }

        @media (max-width: 640px) {
          .nav-wrapper {
            justify-content: space-between;
          }

          .nav-item {
            padding: 8px 12px;
            max-width: 70px;
          }

          .nav-label {
            font-size: 10px;
          }

          .fab-button {
            width: 56px;
            height: 56px;
          }
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(8px);
          z-index: 200;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .modal-content {
          background: linear-gradient(
            135deg,
            rgba(10, 10, 10, 0.95) 0%,
            rgba(5, 5, 5, 0.98) 100%
          );
          border: 1.5px solid #1a1a1a;
          border-radius: 24px;
          padding: 32px;
          max-width: 480px;
          width: 100%;
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.8),
            0 0 0 1px rgba(255, 85, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.02),
            0 0 60px rgba(255, 85, 0, 0.15);
          position: relative;
          animation: slideInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .modal-content::before {
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
          animation: shimmer 3s ease-in-out infinite;
          box-shadow: 0 0 20px rgba(255, 85, 0, 0.6);
        }

        @keyframes shimmer {
          0%,
          100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        }

        .modal-title {
          font-size: 24px;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.3px;
        }

        .close-button {
          width: 40px;
          height: 40px;
          background: #0a0a0a;
          border: 1.5px solid #1a1a1a;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          color: #666666;
        }

        .close-button:hover {
          background: #151515;
          border-color: #ff5500;
          color: #ff5500;
          transform: scale(1.05);
        }

        .modal-description {
          color: #888888;
          font-size: 15px;
          margin-bottom: 24px;
          line-height: 1.6;
        }

        .form-group {
          margin-bottom: 24px;
        }

        .form-label {
          display: block;
          margin-bottom: 10px;
          font-size: 12px;
          font-weight: 700;
          color: #ffffff;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .form-input {
          width: 100%;
          padding: 18px 20px;
          background: #0a0a0a;
          border: 1.5px solid #1a1a1a;
          border-radius: 14px;
          color: #ffffff;
          font-size: 16px;
          font-family: "Urbanist", sans-serif;
          font-weight: 500;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          outline: none;
        }

        .form-input::placeholder {
          color: #666666;
        }

        .form-input:focus {
          background: #000000;
          border-color: #ff5500;
          box-shadow: 0 0 0 4px rgba(255, 85, 0, 0.2),
            0 8px 24px rgba(0, 0, 0, 0.6), 0 0 30px rgba(255, 85, 0, 0.15);
          transform: translateY(-2px);
        }

        .submit-button {
          width: 100%;
          padding: 18px 20px;
          background: linear-gradient(135deg, #ff5500 0%, #ff3300 100%);
          border: none;
          border-radius: 14px;
          color: #ffffff;
          font-size: 17px;
          font-weight: 700;
          font-family: "Urbanist", sans-serif;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
          box-shadow: 0 12px 32px rgba(255, 85, 0, 0.5),
            0 0 40px rgba(255, 85, 0, 0.3);
        }

        .submit-button::before {
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

        .submit-button:hover::before {
          left: 100%;
        }

        .submit-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 48px rgba(255, 85, 0, 0.6),
            0 0 60px rgba(255, 85, 0, 0.4);
        }

        .submit-button:active {
          transform: translateY(-1px);
        }

        .submit-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Error message */
        .error-message {
          background: rgba(255, 85, 0, 0.1);
          border: 1px solid rgba(255, 85, 0, 0.3);
          border-radius: 12px;
          padding: 12px 16px;
          margin-bottom: 16px;
          color: #ff5500;
          font-size: 13px;
          font-weight: 500;
          text-align: center;
          animation: shake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97);
        }

        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-8px);
          }
          75% {
            transform: translateX(8px);
          }
        }

        /* Contact Modal Styles */
        .contact-info {
          text-align: center;
          padding: 20px 0;
        }

        .contact-icon {
          font-size: 64px;
          margin-bottom: 20px;
          animation: phoneRing 2s ease-in-out infinite;
        }

        @keyframes phoneRing {
          0%,
          100% {
            transform: rotate(0deg);
          }
          10%,
          30% {
            transform: rotate(-15deg);
          }
          20%,
          40% {
            transform: rotate(15deg);
          }
        }

        .contact-title {
          font-size: 20px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 8px;
        }

        .contact-subtitle {
          font-size: 14px;
          color: #888888;
          margin-bottom: 24px;
        }

        .phone-number {
          font-size: 32px;
          font-weight: 800;
          background: linear-gradient(135deg, #ff5500 0%, #ff3300 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 24px;
          font-family: "Azeret Mono", monospace;
          letter-spacing: 2px;
        }

        .call-button {
          width: 100%;
          padding: 18px 20px;
          background: linear-gradient(135deg, #ff5500 0%, #ff3300 100%);
          border: none;
          border-radius: 14px;
          color: #ffffff;
          font-size: 17px;
          font-weight: 700;
          font-family: "Urbanist", sans-serif;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 12px 32px rgba(255, 85, 0, 0.5),
            0 0 40px rgba(255, 85, 0, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          text-decoration: none;
        }

        .call-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 48px rgba(255, 85, 0, 0.6),
            0 0 60px rgba(255, 85, 0, 0.4);
        }
      `}</style>

      <nav className="bottom-navigation">
        <div className="nav-wrapper">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            if (item.isCenter) {
              return (
                <button
                  key={item.href}
                  onClick={handleFabClick}
                  className="fab-button"
                  style={{ flex: 0 }}
                >
                  <Icon size={28} strokeWidth={2.5} />
                </button>
              );
            }

            if (item.isContact) {
              return (
                <button
                  key={item.href}
                  onClick={handleContactClick}
                  className={`nav-item ${isActive ? "nav-item-active" : ""}`}
                  style={{ background: "none", border: "none" }}
                >
                  <Icon
                    className="nav-icon"
                    size={24}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  <span className="nav-label">{item.label}</span>
                </button>
              );
            }

            // Check if route requires authentication
            if (item.requiresAuth) {
              const handleAuthClick = (e: React.MouseEvent) => {
                e.preventDefault();
                if (!user) {
                  router.push("/auth/sign-in");
                } else {
                  router.push(item.href);
                }
              };

              return (
                <button
                  key={item.href}
                  onClick={handleAuthClick}
                  className={`nav-item ${isActive ? "nav-item-active" : ""}`}
                  style={{ background: "none", border: "none" }}
                >
                  <Icon
                    className="nav-icon"
                    size={24}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  <span className="nav-label">{item.label}</span>
                </button>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-item ${isActive ? "nav-item-active" : ""}`}
              >
                <Icon
                  className="nav-icon"
                  size={24}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span className="nav-label">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Tracking Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={handleClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Track Your Order</h2>
              <button className="close-button" onClick={handleClose}>
                <X size={20} />
              </button>
            </div>

            <p className="modal-description">
              Enter your order ID to track your shipment in real-time and see its current location.
            </p>

            <form onSubmit={handleSubmit}>
              {searchError && <div className="error-message">{searchError}</div>}
              
              <div className="form-group">
                <label htmlFor="tracking-number" className="form-label">
                  Order ID
                </label>
                <input
                  type="text"
                  id="tracking-number"
                  className="form-input"
                  placeholder="e.g., ORD-123456789"
                  value={trackingNumber}
                  onChange={(e) => {
                    setTrackingNumber(e.target.value);
                    setSearchError("");
                  }}
                  autoFocus
                  required
                  disabled={searchLoading}
                />
              </div>

              <button
                type="submit"
                className="submit-button"
                disabled={!trackingNumber.trim() || searchLoading}
              >
                {searchLoading ? "Searching..." : "Track Order"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {showContactModal && (
        <div className="modal-overlay" onClick={handleContactClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Contact Support</h2>
              <button className="close-button" onClick={handleContactClose}>
                <X size={20} />
              </button>
            </div>

            <div className="contact-info">
              <div className="contact-icon">📞</div>
              <div className="contact-title">Customer Support</div>
              <div className="contact-subtitle">
                Available 24/7 to assist you
              </div>
              <div className="phone-number">1-800-SHIP-NOW</div>
              <a href="tel:1-800-744-7669" className="call-button">
                <span>📱</span>
                <span>Call Now</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;