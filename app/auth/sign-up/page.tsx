/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState("");

  const { signUp, signInWithGoogle, signInWithGithub } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(""); // Clear error on input change
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!agreedToTerms) {
      setError("Please agree to the Terms of Service and Privacy Policy");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await signUp(formData.email, formData.password, formData.name);
      router.push("/");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message || "Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  

  return (
    <div className="auth-container">
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Urbanist:wght@400;600;700;800&family=Azeret+Mono:wght@400;600&display=swap");

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .auth-container {
          min-height: 100vh;
          background: #000000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          position: relative;
          overflow: hidden;
          font-family: "Urbanist", sans-serif;
        }

        /* Animated grid background */
        .auth-container::before {
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
        }

        @keyframes gridScroll {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          100% {
            transform: translate(60px, 60px) rotate(0deg);
          }
        }

        /* Glowing orbs */
        .glow-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.25;
          pointer-events: none;
        }

        .glow-orb-1 {
          width: 500px;
          height: 500px;
          background: #ff5500;
          top: -15%;
          right: -10%;
          animation: float1 10s ease-in-out infinite;
        }

        .glow-orb-2 {
          width: 400px;
          height: 400px;
          background: #ff4400;
          bottom: -15%;
          left: -10%;
          animation: float2 12s ease-in-out infinite;
        }

        @keyframes float1 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(40px, 40px) scale(1.1);
          }
        }

        @keyframes float2 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-40px, -40px) scale(1.15);
          }
        }

        /* Card wrapper */
        .card-wrapper {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 480px;
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

        /* Main auth card */
        .auth-card {
          background: linear-gradient(
            135deg,
            rgba(10, 10, 10, 0.95) 0%,
            rgba(5, 5, 5, 0.98) 100%
          );
          border: 1px solid #1a1a1a;
          border-radius: 28px;
          padding: 56px 48px;
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.8),
            0 0 0 1px rgba(255, 85, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.02),
            0 0 60px rgba(255, 85, 0, 0.15);
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(20px);
        }

        /* Top accent line */
        .auth-card::before {
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

        /* Corner accent */
        .auth-card::after {
          content: "";
          position: absolute;
          top: -100px;
          right: -100px;
          width: 200px;
          height: 200px;
          background: radial-gradient(
            circle,
            rgba(255, 85, 0, 0.2),
            transparent 70%
          );
          pointer-events: none;
        }

        /* Header section */
        .header {
          text-align: center;
          margin-bottom: 48px;
          position: relative;
          z-index: 1;
        }

        .logo-container {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 72px;
          height: 72px;
          background: linear-gradient(135deg, #ff5500, #ff3300);
          border-radius: 20px;
          margin-bottom: 24px;
          position: relative;
          box-shadow: 0 12px 32px rgba(255, 85, 0, 0.5),
            0 0 0 4px rgba(255, 85, 0, 0.2), 0 0 40px rgba(255, 85, 0, 0.3);
          animation: logoFloat 3s ease-in-out infinite;
        }

        @keyframes logoFloat {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-6px);
          }
        }

        .logo-icon {
          font-size: 36px;
        }

        .title {
          font-size: 36px;
          font-weight: 800;
          margin-bottom: 12px;
          background: linear-gradient(135deg, #ffffff 0%, #a0a0a0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.5px;
        }

        .subtitle {
          color: #888888;
          font-size: 16px;
          font-weight: 500;
          letter-spacing: 0.3px;
        }

        /* Error message */
        .error-message {
          background: rgba(255, 85, 0, 0.1);
          border: 1px solid rgba(255, 85, 0, 0.3);
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 24px;
          color: #ff5500;
          font-size: 14px;
          font-weight: 500;
          animation: fadeInUp 0.3s ease-out;
        }

        /* Form styles */
        .auth-form {
          position: relative;
          z-index: 1;
        }

        .form-group {
          margin-bottom: 24px;
          animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) backwards;
        }

        .form-group:nth-child(1) {
          animation-delay: 0.1s;
        }
        .form-group:nth-child(2) {
          animation-delay: 0.2s;
        }
        .form-group:nth-child(3) {
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

        .form-label {
          display: block;
          margin-bottom: 10px;
          font-size: 12px;
          font-weight: 700;
          color: #ffffff;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-family: "Azeret Mono", monospace;
        }

        .input-wrapper {
          position: relative;
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

        .password-toggle {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #888888;
          cursor: pointer;
          padding: 8px;
          font-size: 20px;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .password-toggle:hover {
          color: #ff5500;
          transform: translateY(-50%) scale(1.1);
        }

        /* Checkbox */
        .checkbox-group {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 32px;
          animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.4s backwards;
        }

        .checkbox-input {
          width: 20px;
          height: 20px;
          margin-top: 2px;
          cursor: pointer;
          accent-color: #ff5500;
        }

        .checkbox-label {
          color: #888888;
          font-size: 14px;
          line-height: 1.6;
          flex: 1;
        }

        .checkbox-label a {
          color: #ff5500;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.2s;
        }

        .checkbox-label a:hover {
          color: #ff3300;
          text-decoration: underline;
        }

        /* Submit button */
        .submit-button {
          width: 100%;
          padding: 20px;
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
          animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.5s backwards;
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
          opacity: 0.7;
          cursor: not-allowed;
        }

        /* Divider */
        .divider {
          display: flex;
          align-items: center;
          margin: 40px 0;
          animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.6s backwards;
        }

        .divider-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            #1a1a1a 50%,
            transparent
          );
        }

        .divider-text {
          padding: 0 20px;
          color: #666666;
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        /* Social buttons */
        .social-buttons {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 40px;
          animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.7s backwards;
        }

        .social-button {
          padding: 16px;
          background: #0a0a0a;
          border: 1.5px solid #1a1a1a;
          border-radius: 14px;
          color: #ffffff;
          font-size: 15px;
          font-weight: 600;
          font-family: "Urbanist", sans-serif;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .social-button:hover {
          background: #151515;
          border-color: #ff5500;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6),
            0 0 20px rgba(255, 85, 0, 0.2);
        }

        .social-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .social-icon {
          width: 20px;
          height: 20px;
        }

        /* Footer */
        .footer {
          text-align: center;
          color: #888888;
          font-size: 15px;
          animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.8s backwards;
        }

        .footer a {
          color: #ff5500;
          text-decoration: none;
          font-weight: 700;
          transition: all 0.2s;
        }

        .footer a:hover {
          color: #ff3300;
          text-decoration: underline;
        }

        /* Responsive */
        @media (max-width: 640px) {
          .auth-card {
            padding: 40px 28px;
          }

          .title {
            font-size: 30px;
          }

          .social-buttons {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Background elements */}
      <div className="glow-orb glow-orb-1"></div>
      <div className="glow-orb glow-orb-2"></div>

      <div className="card-wrapper">
        <div className="auth-card">
          {/* Header */}
          <div className="header">
            <div className="logo-container">
              <span className="logo-icon">📦</span>
            </div>
            <h1 className="title">Create Account</h1>
            <p className="subtitle">Start tracking your deliveries today</p>
          </div>

          {/* Error Message */}
          {error && <div className="error-message">{error}</div>}

          {/* Form */}
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-input"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="form-input"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                  disabled={isLoading}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <div className="checkbox-group">
              <input
                type="checkbox"
                id="terms"
                className="checkbox-input"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                required
                disabled={isLoading}
              />
              <label htmlFor="terms" className="checkbox-label">
                I agree to the <a href="#">Terms of Service</a> and{" "}
                <a href="#">Privacy Policy</a>
              </label>
            </div>

            <button
              type="submit"
              className="submit-button"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

         

          {/* Footer */}
          <div className="footer">
            Already have an account? <Link href="/auth/sign-in">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
