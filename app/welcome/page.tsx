"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

const Page = () => {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [orderIdSearch, setOrderIdSearch] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");

  const slides = [
    {
      image: "🚚",
      title: "Smart Shipping Made Simple",
      description:
        "Stay updated every step of the way with live shipment tracking.",
    },
    {
      image: "📦",
      title: "Track Your Packages",
      description:
        "Real-time updates on all your deliveries in one convenient place.",
    },
    {
      image: "🌍",
      title: "Global Delivery Network",
      description:
        "Ship anywhere in the world with our extensive logistics network.",
    },
  ];

  // Automatic slide transition
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(timer);
  }, [slides.length]);

  const handleGetStarted = () => {
    router.push("/create-delivery");
  };

  const handleSearchOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!orderIdSearch.trim()) {
      setSearchError("Please enter an Order ID");
      return;
    }

    setSearchLoading(true);
    setSearchError("");

    try {
      const deliveriesRef = collection(db, "deliveries");
      const q = query(
        deliveriesRef,
        where("orderId", "==", orderIdSearch.trim())
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setSearchError("Order not found. Please check the Order ID and try again.");
        setSearchLoading(false);
        return;
      }

      // Order found, redirect to tracking page
      router.push(`/tracking/${orderIdSearch.trim()}`);
    } catch (error) {
      console.error("Error searching for order:", error);
      setSearchError("Failed to search. Please try again.");
      setSearchLoading(false);
    }
  };

  return (
    <div className="welcome-container">
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Urbanist:wght@400;600;700;800&family=Azeret+Mono:wght@400;600&display=swap");

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .welcome-container {
          min-height: 100vh;
          background: #000000;
          display: flex;
          flex-direction: column;
          font-family: "Urbanist", sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* Hero section with image */
        .hero-section {
          flex: 1;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          min-height: 60vh;
        }

        /* Gradient overlay */
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.3) 0%,
            rgba(0, 0, 0, 0.7) 50%,
            #000000 100%
          );
          z-index: 1;
        }

        /* Background image simulation */
        .hero-background {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            #ff8c42 0%,
            #ff5500 30%,
            #d4380d 60%,
            #1a1a1a 100%
          );
          opacity: 0.6;
        }

        .hero-pattern {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(
              circle at 20% 50%,
              rgba(255, 85, 0, 0.3) 0%,
              transparent 50%
            ),
            radial-gradient(
              circle at 80% 80%,
              rgba(255, 140, 66, 0.2) 0%,
              transparent 50%
            ),
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 40px,
              rgba(255, 255, 255, 0.02) 40px,
              rgba(255, 255, 255, 0.02) 42px
            );
          animation: patternShift 20s ease-in-out infinite;
        }

        @keyframes patternShift {
          0%,
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.1) rotate(2deg);
            opacity: 0.7;
          }
        }

        /* Truck illustration */
        .truck-illustration {
          position: relative;
          z-index: 2;
          font-size: 180px;
          animation: truckFloat 3s ease-in-out infinite;
          filter: drop-shadow(0 20px 60px rgba(255, 85, 0, 0.4));
          transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
        }

        @keyframes truckFloat {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* Road effect */
        .road-effect {
          position: absolute;
          bottom: -50px;
          left: 0;
          right: 0;
          height: 200px;
          background: linear-gradient(
            180deg,
            transparent 0%,
            rgba(20, 20, 20, 0.8) 50%,
            #000000 100%
          );
          z-index: 1;
        }

        .road-lines {
          position: absolute;
          bottom: 40px;
          left: 0;
          right: 0;
          height: 4px;
          background: repeating-linear-gradient(
            90deg,
            #ff5500 0px,
            #ff5500 40px,
            transparent 40px,
            transparent 80px
          );
          opacity: 0.6;
          animation: roadMove 2s linear infinite;
          box-shadow: 0 0 20px rgba(255, 85, 0, 0.4);
        }

        @keyframes roadMove {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(80px);
          }
        }

        /* Content section */
        .content-section {
          position: relative;
          z-index: 10;
          padding: 40px 24px 32px;
          background: #000000;
          animation: slideInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s backwards;
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .content-wrapper {
          max-width: 480px;
          margin: 0 auto;
        }

        /* Pagination dots */
        .pagination {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-bottom: 28px;
        }

        .dot {
          width: 8px;
          height: 8px;
          background: #1a1a1a;
          border-radius: 4px;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .dot:hover {
          background: #333333;
        }

        .dot-active {
          width: 32px;
          background: linear-gradient(90deg, #ff5500, #ff3300);
          box-shadow: 0 0 20px rgba(255, 85, 0, 0.6);
        }

        /* Progress bar for active dot */
        .dot-active::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 0%;
          background: rgba(255, 255, 255, 0.3);
          animation: dotProgress 4s linear;
        }

        @keyframes dotProgress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }

        /* Text content with smooth transitions */
        .title {
          font-size: 36px;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 16px;
          line-height: 1.2;
          letter-spacing: -0.5px;
          animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .description {
          font-size: 16px;
          font-weight: 500;
          color: #888888;
          line-height: 1.6;
          margin-bottom: 40px;
          animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s backwards;
        }

        /* Get Started Button */
        .get-started-button {
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
          justify-content: center;
          gap: 16px;
          box-shadow: 0 12px 32px rgba(255, 85, 0, 0.5),
            0 0 40px rgba(255, 85, 0, 0.3);
          position: relative;
          overflow: hidden;
        }

        .get-started-button::before {
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

        .get-started-button:hover::before {
          left: 100%;
        }

        .get-started-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 48px rgba(255, 85, 0, 0.6),
            0 0 60px rgba(255, 85, 0, 0.4);
        }

        .get-started-button:active {
          transform: translateY(-1px);
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
          margin-left: auto;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .get-started-button:hover .button-arrow {
          transform: translateX(4px);
        }

        /* Divider */
        .divider {
          display: flex;
          align-items: center;
          gap: 16px;
          margin: 20px 0;
          animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.8s backwards;
        }

        .divider-line {
          flex: 1;
          height: 1px;
          background: #1a1a1a;
        }

        .divider-text {
          color: #666666;
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        /* Search form */
        .search-form {
          animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.9s backwards;
        }

        .search-label {
          font-size: 13px;
          font-weight: 600;
          color: #888888;
          margin-bottom: 12px;
          display: block;
          text-align: center;
        }

        .search-input-wrapper {
          position: relative;
          margin-bottom: 8px;
        }

        .search-input {
          width: 100%;
          padding: 18px 56px 18px 20px;
          background: #0a0a0a;
          border: 1.5px solid #1a1a1a;
          border-radius: 16px;
          color: #ffffff;
          font-size: 16px;
          font-family: "Azeret Mono", monospace;
          font-weight: 600;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          outline: none;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .search-input::placeholder {
          color: #666666;
          font-family: "Urbanist", sans-serif;
          font-weight: 500;
          text-transform: none;
          letter-spacing: 0;
        }

        .search-input:focus {
          background: #000000;
          border-color: #ff5500;
          box-shadow: 0 0 0 4px rgba(255, 85, 0, 0.2),
            0 8px 24px rgba(0, 0, 0, 0.6), 0 0 30px rgba(255, 85, 0, 0.15);
        }

        .search-button {
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translateY(-50%);
          width: 44px;
          height: 44px;
          background: linear-gradient(135deg, #ff5500, #ff3300);
          border: none;
          border-radius: 12px;
          color: #ffffff;
          font-size: 20px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 12px rgba(255, 85, 0, 0.4);
        }

        .search-button:hover {
          transform: translateY(-50%) scale(1.05);
          box-shadow: 0 6px 16px rgba(255, 85, 0, 0.6);
        }

        .search-button:active {
          transform: translateY(-50%) scale(0.98);
        }

        .search-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Error message */
        .error-message {
          background: rgba(255, 85, 0, 0.1);
          border: 1px solid rgba(255, 85, 0, 0.3);
          border-radius: 12px;
          padding: 12px 16px;
          margin-top: 12px;
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

        /* Glowing particles */
        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #ff5500;
          border-radius: 50%;
          pointer-events: none;
          opacity: 0;
          animation: particleFloat 4s ease-in-out infinite;
        }

        .particle-1 {
          top: 20%;
          left: 15%;
          animation-delay: 0s;
        }

        .particle-2 {
          top: 40%;
          right: 20%;
          animation-delay: 1s;
        }

        .particle-3 {
          top: 60%;
          left: 25%;
          animation-delay: 2s;
        }

        .particle-4 {
          top: 30%;
          right: 30%;
          animation-delay: 1.5s;
        }

        @keyframes particleFloat {
          0%,
          100% {
            opacity: 0;
            transform: translateY(0) scale(1);
          }
          50% {
            opacity: 0.8;
            transform: translateY(-40px) scale(1.5);
          }
        }

        /* Responsive */
        @media (max-width: 640px) {
          .title {
            font-size: 30px;
          }

          .description {
            font-size: 15px;
          }

          .truck-illustration {
            font-size: 140px;
          }

          .hero-section {
            min-height: 55vh;
          }
        }

        @media (min-height: 800px) {
          .hero-section {
            min-height: 65vh;
          }
        }
      `}</style>

      {/* Hero Section */}
      <div className="hero-section">
        {/* Background */}
        <div className="hero-background"></div>
        <div className="hero-pattern"></div>

        {/* Particles */}
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>

        {/* Hero overlay */}
        <div className="hero-overlay"></div>

        {/* Truck illustration */}
        <div className="truck-illustration" key={currentSlide}>
          {slides[currentSlide].image}
        </div>

        {/* Road effect */}
        <div className="road-effect">
          <div className="road-lines"></div>
        </div>
      </div>

      {/* Content Section */}
      <div className="content-section">
        <div className="content-wrapper">
          {/* Pagination */}
          <div className="pagination">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`dot ${index === currentSlide ? "dot-active" : ""}`}
                onClick={() => setCurrentSlide(index)}
              ></div>
            ))}
          </div>

          {/* Title and Description */}
          <h1 className="title" key={`title-${currentSlide}`}>
            {slides[currentSlide].title}
          </h1>
          <p className="description" key={`desc-${currentSlide}`}>
            {slides[currentSlide].description}
          </p>

          {/* Get Started Button */}
          <button className="get-started-button" onClick={handleGetStarted}>
            <div className="button-content">
              <div className="button-icon">📦</div>
              <span>Get Started</span>
            </div>
            <div className="button-arrow">››</div>
          </button>

          {/* Divider */}
          <div className="divider">
            <div className="divider-line"></div>
            <div className="divider-text">Or Track Existing Order</div>
            <div className="divider-line"></div>
          </div>

          {/* Search Order Form */}
          <form className="search-form" onSubmit={handleSearchOrder}>
            <label className="search-label">Enter Order ID to Track</label>
            <div className="search-input-wrapper">
              <input
                type="text"
                className="search-input"
                placeholder="e.g., ORD-1234567890"
                value={orderIdSearch}
                onChange={(e) => {
                  setOrderIdSearch(e.target.value);
                  setSearchError("");
                }}
                disabled={searchLoading}
              />
              <button
                type="submit"
                className="search-button"
                disabled={searchLoading}
              >
                {searchLoading ? "⏳" : "🔍"}
              </button>
            </div>
            {searchError && <div className="error-message">{searchError}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;