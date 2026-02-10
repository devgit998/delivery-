"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

const SignInPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const { signIn, signInWithGoogle, signInWithGithub } = useAuth();
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
    setIsLoading(true);
    setError("");

    try {
      await signIn(formData.email, formData.password);
      router.push("/welcome");
    } catch (error: any) {
      setError(error.message || "Failed to sign in. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError("");

    try {
      await signInWithGoogle();
      router.push("/welcome");
    } catch (error: any) {
      setError(error.message || "Failed to sign in with Google.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGithubSignIn = async () => {
    setIsLoading(true);
    setError("");

    try {
      await signInWithGithub();
      router.push("/welcome");
    } catch (error: any) {
      setError(error.message || "Failed to sign in with GitHub.");
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

        /* Remember me & Forgot password row */
        .form-options {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 32px;
          animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.3s backwards;
        }

        .checkbox-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .checkbox-input {
          width: 18px;
          height: 18px;
          cursor: pointer;
          accent-color: #ff5500;
        }

        .checkbox-label {
          color: #888888;
          font-size: 14px;
          cursor: pointer;
          user-select: none;
        }

        .forgot-link {
          color: #ff5500;
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          transition: color 0.2s;
        }

        .forgot-link:hover {
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
          animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.4s backwards;
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
          animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.5s backwards;
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
          animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.6s backwards;
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
          animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.7s backwards;
        }

        .footer a {
          color: #ff5500;
          text-decoration: none;
          font-weight: 700;
          transition: color 0.2s;
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

          .form-options {
            flex-direction: column;
            gap: 16px;
            align-items: flex-start;
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
            <h1 className="title">Welcome Back</h1>
            <p className="subtitle">Sign in to continue tracking</p>
          </div>

          {/* Error Message */}
          {error && <div className="error-message">{error}</div>}

          {/* Form */}
          <form className="auth-form" onSubmit={handleSubmit}>
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
                  placeholder="Enter your password"
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

            <div className="form-options">
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="remember"
                  className="checkbox-input"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={isLoading}
                />
                <label htmlFor="remember" className="checkbox-label">
                  Remember me
                </label>
              </div>
              <a href="#" className="forgot-link">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="submit-button"
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="divider">
            <div className="divider-line"></div>
            <span className="divider-text">or continue with</span>
            <div className="divider-line"></div>
          </div>

          {/* Social buttons */}
          <div className="social-buttons">
            <button 
              className="social-button" 
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
            >
              <svg
                className="social-icon"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </button>

            <button 
              className="social-button" 
              type="button"
              onClick={handleGithubSignIn}
              disabled={isLoading}
            >
              <svg
                className="social-icon"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              GitHub
            </button>
          </div>

          {/* Footer */}
          <div className="footer">
            Don&apos;t have an account? <Link href="/auth/sign-up">Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
