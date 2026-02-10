"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

export const AdminProtectedRoute = ({ children }: AdminProtectedRouteProps) => {
  const { user, userData, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      // If not logged in, redirect to sign in
      if (!user) {
        router.push("/auth/sign-in");
        return;
      }

      // If logged in but not admin or super_admin, redirect to dashboard
      if (userData && userData.role !== "admin" && userData.role !== "super_admin") {
        router.push("/dashboard");
        return;
      }
    }
  }, [user, userData, loading, router]);

  // Show loading state
  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#000000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Urbanist, sans-serif"
      }}>
        <div style={{ textAlign: "center", color: "#666666" }}>
          <div style={{
            width: "48px",
            height: "48px",
            border: "4px solid #1a1a1a",
            borderTopColor: "#ff5500",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            margin: "0 auto 16px"
          }}></div>
          <p>Loading...</p>
        </div>
        <style jsx>{`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  // If not admin, show unauthorized message while redirecting
  if (!user || (userData && userData.role !== "admin" && userData.role !== "super_admin")) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#000000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Urbanist, sans-serif"
      }}>
        <div style={{ textAlign: "center", padding: "40px" }}>
          <div style={{ fontSize: "64px", marginBottom: "16px" }}>🔒</div>
          <div style={{ fontSize: "24px", fontWeight: 700, color: "#ffffff", marginBottom: "8px" }}>
            Access Denied
          </div>
          <div style={{ fontSize: "16px", color: "#666666" }}>
            You don&apos;t have permission to access this page.
          </div>
        </div>
      </div>
    );
  }

  // User is authenticated and is admin/super_admin
  return <>{children}</>;
};