"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  requireSuperAdmin?: boolean;
}

export const ProtectedRoute = ({
  children,
  requireAdmin = false,
  requireSuperAdmin = false,
}: ProtectedRouteProps) => {
  const { user, userData, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      // Not authenticated
      if (!user) {
        router.push("/auth/sign-in");
        return;
      }

      // Require super admin
      if (requireSuperAdmin && userData?.role !== "super_admin") {
        router.push("/dashboard");
        return;
      }

      // Require admin or super admin
      if (
        requireAdmin &&
        userData?.role !== "admin" &&
        userData?.role !== "super_admin"
      ) {
        router.push("/dashboard");
        return;
      }
    }
  }, [user, userData, loading, router, requireAdmin, requireSuperAdmin]);

  // Show loading state
  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#000000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#888888",
        fontFamily: "Urbanist, sans-serif",
        fontSize: "18px"
      }}>
        Loading...
      </div>
    );
  }

  // Don't render children until auth check is complete
  if (!user) return null;
  if (requireSuperAdmin && userData?.role !== "super_admin") return null;
  if (requireAdmin && userData?.role !== "admin" && userData?.role !== "super_admin") return null;

  return <>{children}</>;
};