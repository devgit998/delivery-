"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Page = () => {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

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

  const handleGetStarted = () => {
    router.push("/dashboard");
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
          animation: truckFloat 3s ease-in-out infinite,
            fadeInScale 1s cubic-bezier(0.16, 1, 0.3, 1);
          filter: drop-shadow(0 20px 60px rgba(255, 85, 0, 0.4));
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
        }

        .dot:hover {
          background: #333333;
        }

        .dot-active {
          width: 32px;
          background: linear-gradient(90deg, #ff5500, #ff3300);
          box-shadow: 0 0 20px rgba(255, 85, 0, 0.6);
        }

        /* Text content */
        .title {
          font-size: 36px;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 16px;
          line-height: 1.2;
          letter-spacing: -0.5px;
          animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.5s backwards;
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
          animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.6s backwards;
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
          animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.7s backwards;
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

        /* Skip button */
        .skip-button {
          width: 100%;
          padding: 16px 24px;
          background: transparent;
          border: 1.5px solid #1a1a1a;
          border-radius: 16px;
          color: #888888;
          font-size: 16px;
          font-weight: 600;
          font-family: "Urbanist", sans-serif;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          margin-top: 12px;
          animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.8s backwards;
        }

        .skip-button:hover {
          background: #0a0a0a;
          border-color: #ff5500;
          color: #ff5500;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6),
            0 0 20px rgba(255, 85, 0, 0.1);
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
        <div className="truck-illustration">{slides[currentSlide].image}</div>

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
          <h1 className="title">{slides[currentSlide].title}</h1>
          <p className="description">{slides[currentSlide].description}</p>

          {/* Get Started Button */}
          <button className="get-started-button" onClick={handleGetStarted}>
            <div className="button-content">
              <div className="button-icon">📦</div>
              <span>Get Started</span>
            </div>
            <div className="button-arrow">››</div>
          </button>

          {/* Skip Button */}
          <button className="skip-button" onClick={handleGetStarted}>
            Skip
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
