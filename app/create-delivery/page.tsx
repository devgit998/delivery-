"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Header from "@/components/Header";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";

interface DeliveryFormData {
  fromName: string;
  fromAddress: string;
  fromCity: string;
  fromState: string;
  fromZip: string;
  toName: string;
  toAddress: string;
  toCity: string;
  toState: string;
  toZip: string;
  packageType: string;
  weight: string;
  dimensions: string;
  specialInstructions: string;
}

const CreateDeliveryPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<DeliveryFormData>({
    fromName: "",
    fromAddress: "",
    fromCity: "",
    fromState: "",
    fromZip: "",
    toName: "",
    toAddress: "",
    toCity: "",
    toState: "",
    toZip: "",
    packageType: "Standard",
    weight: "",
    dimensions: "",
    specialInstructions: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const generateOrderId = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `ORD-${timestamp}${random}`;
  };

  const calculateEstimatedDate = () => {
    const today = new Date();
    const estimatedDays = 14; // 2 weeks default
    const estimatedDate = new Date(today.setDate(today.getDate() + estimatedDays));
    return estimatedDate.toISOString();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setError("You must be logged in to create a delivery");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const orderId = generateOrderId();
      const deliveryData = {
        orderId,
        userId: user.uid,
        userEmail: user.email,
        status: "Pending",
        from: {
          name: formData.fromName,
          address: formData.fromAddress,
          city: formData.fromCity,
          state: formData.fromState,
          zip: formData.fromZip,
        },
        to: {
          name: formData.toName,
          address: formData.toAddress,
          city: formData.toCity,
          state: formData.toState,
          zip: formData.toZip,
        },
        package: {
          type: formData.packageType,
          weight: formData.weight,
          dimensions: formData.dimensions,
        },
        specialInstructions: formData.specialInstructions,
        createdAt: serverTimestamp(),
        estimatedDeliveryDate: calculateEstimatedDate(),
        stages: [
          { name: "Pending", completed: false, current: true },
          { name: "Packed", completed: false },
          { name: "Shipped", completed: false },
          { name: "In Transit", completed: false },
          { name: "Delivered", completed: false },
        ],
        progress: 0,
      };

      await addDoc(collection(db, "deliveries"), deliveryData);
      
      // Redirect to history/dashboard after successful creation
      router.push("/history");
    } catch (error: any) {
      console.error("Error creating delivery:", error);
      setError(error.message || "Failed to create delivery. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="create-delivery-container">
        <Header />
        <style jsx>{`
          @import url("https://fonts.googleapis.com/css2?family=Urbanist:wght@400;600;700;800&family=Azeret+Mono:wght@400;600&display=swap");

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          .create-delivery-container {
            min-height: 100vh;
            background: #000000;
            padding: 20px;
            font-family: "Urbanist", sans-serif;
            position: relative;
            overflow: hidden;
          }

          /* Animated grid background */
          .create-delivery-container::before {
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
            max-width: 800px;
            margin: 0 auto;
            position: relative;
            z-index: 10;
            padding-top: 20px;
          }

          /* Header */
          .page-header {
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

          .page-title {
            font-size: 36px;
            font-weight: 800;
            background: linear-gradient(135deg, #ffffff 0%, #a0a0a0 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 8px;
          }

          .page-subtitle {
            color: #888888;
            font-size: 16px;
          }

          /* Form card */
          .form-card {
            background: linear-gradient(
              135deg,
              rgba(10, 10, 10, 0.95) 0%,
              rgba(5, 5, 5, 0.98) 100%
            );
            border: 1px solid #1a1a1a;
            border-radius: 24px;
            padding: 40px;
            box-shadow: 0 24px 80px rgba(0, 0, 0, 0.8),
              0 0 0 1px rgba(255, 85, 0, 0.2);
            position: relative;
            overflow: hidden;
            backdrop-filter: blur(20px);
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

          .form-card::before {
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
          }

          /* Form sections */
          .form-section {
            margin-bottom: 40px;
          }

          .section-title {
            font-size: 20px;
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .section-icon {
            width: 32px;
            height: 32px;
            background: linear-gradient(135deg, #ff5500, #ff3300);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
          }

          /* Form grid */
          .form-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
          }

          .form-grid-full {
            grid-column: 1 / -1;
          }

          /* Form group */
          .form-group {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          .form-label {
            font-size: 13px;
            font-weight: 700;
            color: #ffffff;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          .form-input,
          .form-select,
          .form-textarea {
            width: 100%;
            padding: 16px 18px;
            background: #0a0a0a;
            border: 1.5px solid #1a1a1a;
            border-radius: 12px;
            color: #ffffff;
            font-size: 15px;
            font-family: "Urbanist", sans-serif;
            font-weight: 500;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            outline: none;
          }

          .form-input::placeholder,
          .form-textarea::placeholder {
            color: #666666;
          }

          .form-input:focus,
          .form-select:focus,
          .form-textarea:focus {
            background: #000000;
            border-color: #ff5500;
            box-shadow: 0 0 0 4px rgba(255, 85, 0, 0.2),
              0 8px 24px rgba(0, 0, 0, 0.6);
            transform: translateY(-2px);
          }

          .form-textarea {
            min-height: 120px;
            resize: vertical;
          }

          .form-select {
            cursor: pointer;
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
            margin-top: 24px;
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

          /* Responsive */
          @media (max-width: 768px) {
            .form-card {
              padding: 28px 20px;
            }

            .form-grid {
              grid-template-columns: 1fr;
            }

            .page-title {
              font-size: 28px;
            }
          }
        `}</style>

        {/* Background elements */}
        <div className="glow-orb glow-orb-1"></div>
        <div className="glow-orb glow-orb-2"></div>

        <div className="content-wrapper">
          {/* Header */}
          <div className="page-header">
            <h1 className="page-title">Create Delivery</h1>
            <p className="page-subtitle">
              Schedule a new delivery and track it in real-time
            </p>
          </div>

          {/* Form */}
          <div className="form-card">
            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
              {/* From Section */}
              <div className="form-section">
                <div className="section-title">
                  <div className="section-icon">📍</div>
                  Pickup Location
                </div>
                <div className="form-grid">
                  <div className="form-group form-grid-full">
                    <label className="form-label">Name / Business</label>
                    <input
                      type="text"
                      name="fromName"
                      className="form-input"
                      placeholder="John Doe / ABC Company"
                      value={formData.fromName}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                  </div>
                  <div className="form-group form-grid-full">
                    <label className="form-label">Address</label>
                    <input
                      type="text"
                      name="fromAddress"
                      className="form-input"
                      placeholder="123 Main Street, Suite 100"
                      value={formData.fromAddress}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">City</label>
                    <input
                      type="text"
                      name="fromCity"
                      className="form-input"
                      placeholder="Los Angeles"
                      value={formData.fromCity}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">State</label>
                    <input
                      type="text"
                      name="fromState"
                      className="form-input"
                      placeholder="CA"
                      value={formData.fromState}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">ZIP Code</label>
                    <input
                      type="text"
                      name="fromZip"
                      className="form-input"
                      placeholder="90001"
                      value={formData.fromZip}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>

              {/* To Section */}
              <div className="form-section">
                <div className="section-title">
                  <div className="section-icon">🎯</div>
                  Delivery Location
                </div>
                <div className="form-grid">
                  <div className="form-group form-grid-full">
                    <label className="form-label">Name / Business</label>
                    <input
                      type="text"
                      name="toName"
                      className="form-input"
                      placeholder="Jane Smith / XYZ Corp"
                      value={formData.toName}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                  </div>
                  <div className="form-group form-grid-full">
                    <label className="form-label">Address</label>
                    <input
                      type="text"
                      name="toAddress"
                      className="form-input"
                      placeholder="456 Park Avenue"
                      value={formData.toAddress}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">City</label>
                    <input
                      type="text"
                      name="toCity"
                      className="form-input"
                      placeholder="New York"
                      value={formData.toCity}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">State</label>
                    <input
                      type="text"
                      name="toState"
                      className="form-input"
                      placeholder="NY"
                      value={formData.toState}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">ZIP Code</label>
                    <input
                      type="text"
                      name="toZip"
                      className="form-input"
                      placeholder="10001"
                      value={formData.toZip}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>

              {/* Package Details */}
              <div className="form-section">
                <div className="section-title">
                  <div className="section-icon">📦</div>
                  Package Details
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Package Type</label>
                    <select
                      name="packageType"
                      className="form-select"
                      value={formData.packageType}
                      onChange={handleChange}
                      disabled={loading}
                    >
                      <option value="Standard">Standard</option>
                      <option value="Express">Express</option>
                      <option value="Overnight">Overnight</option>
                      <option value="Fragile">Fragile</option>
                      <option value="Heavy">Heavy</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Weight (lbs)</label>
                    <input
                      type="text"
                      name="weight"
                      className="form-input"
                      placeholder="10"
                      value={formData.weight}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                  </div>
                  <div className="form-group form-grid-full">
                    <label className="form-label">Dimensions (L x W x H)</label>
                    <input
                      type="text"
                      name="dimensions"
                      className="form-input"
                      placeholder='12" x 8" x 6"'
                      value={formData.dimensions}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                  </div>
                  <div className="form-group form-grid-full">
                    <label className="form-label">
                      Special Instructions (Optional)
                    </label>
                    <textarea
                      name="specialInstructions"
                      className="form-textarea"
                      placeholder="Any special handling instructions or delivery notes..."
                      value={formData.specialInstructions}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>

              {/* Submit */}
              <button type="submit" className="submit-button" disabled={loading}>
                {loading ? "Creating Delivery..." : "Create Delivery"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default CreateDeliveryPage;