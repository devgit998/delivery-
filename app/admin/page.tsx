"use client";

import React, { useEffect, useState } from "react";
import { useAuth, UserData, UserRole } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Alert, AlertTitle, Snackbar } from "@mui/material";

const AdminPage = () => {
  const { userData, loading: authLoading, isAdmin, isSuperAdmin, getAllUsers, updateUserRole } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!authLoading) {
      if (!isAdmin()) {
        router.push("/welcome");
        return;
      }
      
      if (isSuperAdmin()) {
        loadUsers();
      } else {
        setLoading(false);
      }
    }
  }, [authLoading, userData]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const allUsers = await getAllUsers();
      setUsers(allUsers);
    } catch (error: any) {
      setError(error.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (uid: string, newRole: UserRole) => {
    try {
      setError("");
      setSuccess("");
      await updateUserRole(uid, newRole);
      setSuccess("Role updated successfully!");
      await loadUsers(); // Refresh the list
    } catch (error: any) {
      setError(error.message || "Failed to update role");
    }
  };

  const handleCloseError = () => {
    setError("");
  };

  const handleCloseSuccess = () => {
    setSuccess("");
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case "super_admin":
        return "#ff3300";
      case "admin":
        return "#ff5500";
      default:
        return "#666666";
    }
  };

  if (authLoading || loading) {
    return (
      <div className="admin-container">
        <style jsx>{`
          @import url("https://fonts.googleapis.com/css2?family=Urbanist:wght@400;600;700;800&family=Azeret+Mono:wght@400;600&display=swap");

          .admin-container {
            min-height: 100vh;
            background: #000000;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: "Urbanist", sans-serif;
            color: #ffffff;
          }

          .loading {
            font-size: 18px;
            color: #888888;
          }
        `}</style>
        <div className="loading">Loading...</div>
      </div>
    );
  }

  // For regular admins (not super admin), show deliveries management only
  if (!isSuperAdmin()) {
    return (
      <div className="admin-container">
        <style jsx>{`
          @import url("https://fonts.googleapis.com/css2?family=Urbanist:wght@400;600;700;800&family=Azeret+Mono:wght@400;600&display=swap");

          .admin-container {
            min-height: 100vh;
            background: #000000;
            padding: 40px 20px;
            font-family: "Urbanist", sans-serif;
            position: relative;
            overflow: hidden;
          }

          .admin-container::before {
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
            z-index: 0;
          }

          @keyframes gridScroll {
            0% {
              transform: translate(0, 0);
            }
            100% {
              transform: translate(60px, 60px);
            }
          }

          .admin-header {
            max-width: 1200px;
            margin: 0 auto 40px;
            text-align: center;
            position: relative;
            z-index: 1;
          }

          .title {
            font-size: 48px;
            font-weight: 800;
            background: linear-gradient(135deg, #ffffff 0%, #a0a0a0 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 16px;
          }

          .subtitle {
            color: #888888;
            font-size: 18px;
            margin-bottom: 40px;
          }

          .action-button {
            display: inline-flex;
            align-items: center;
            gap: 12px;
            padding: 20px 32px;
            background: linear-gradient(135deg, #ff5500, #ff3300);
            border: none;
            border-radius: 16px;
            color: #ffffff;
            font-size: 18px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s;
            box-shadow: 0 12px 32px rgba(255, 85, 0, 0.5);
          }

          .action-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 16px 48px rgba(255, 85, 0, 0.6);
          }
        `}</style>

        <div className="admin-header">
          <h1 className="title">Admin Dashboard</h1>
          <p className="subtitle">Welcome, Admin! Manage deliveries and orders.</p>
          <button 
            className="action-button"
            onClick={() => router.push("/admin/deliveries")}
          >
            <span>📦</span>
            <span>Manage Deliveries</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Urbanist:wght@400;600;700;800&family=Azeret+Mono:wght@400;600&display=swap");

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .admin-container {
          min-height: 100vh;
          background: #000000;
          padding: 40px 20px;
          font-family: "Urbanist", sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* Animated grid background */
        .admin-container::before {
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
          z-index: 0;
        }

        @keyframes gridScroll {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(60px, 60px);
          }
        }

        .admin-header {
          max-width: 1200px;
          margin: 0 auto 40px;
          position: relative;
          z-index: 1;
        }

        .title {
          font-size: 48px;
          font-weight: 800;
          background: linear-gradient(135deg, #ffffff 0%, #a0a0a0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 16px;
        }

        .subtitle {
          color: #888888;
          font-size: 18px;
          margin-bottom: 32px;
        }

        .quick-actions {
          display: flex;
          gap: 16px;
          margin-bottom: 40px;
        }

        .action-button {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 16px 24px;
          background: linear-gradient(135deg, #ff5500, #ff3300);
          border: none;
          border-radius: 14px;
          color: #ffffff;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 8px 24px rgba(255, 85, 0, 0.4);
        }

        .action-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(255, 85, 0, 0.6);
        }

        .content {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .users-table-container {
          background: linear-gradient(135deg, rgba(10, 10, 10, 0.95) 0%, rgba(5, 5, 5, 0.98) 100%);
          border: 1px solid #1a1a1a;
          border-radius: 20px;
          padding: 32px;
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 85, 0, 0.2);
          overflow-x: auto;
        }

        .table-header {
          margin-bottom: 24px;
        }

        .table-title {
          font-size: 24px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 8px;
        }

        .table-description {
          color: #888888;
          font-size: 14px;
        }

        .users-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0 12px;
        }

        .users-table thead th {
          text-align: left;
          padding: 12px 16px;
          font-size: 12px;
          font-weight: 700;
          color: #888888;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-family: "Azeret Mono", monospace;
        }

        .users-table tbody tr {
          background: #0a0a0a;
          border-radius: 12px;
          transition: all 0.2s;
        }

        .users-table tbody tr:hover {
          background: #0f0f0f;
          transform: translateX(4px);
        }

        .users-table tbody td {
          padding: 20px 16px;
          color: #ffffff;
          border-top: 1px solid #1a1a1a;
          border-bottom: 1px solid #1a1a1a;
        }

        .users-table tbody td:first-child {
          border-left: 1px solid #1a1a1a;
          border-top-left-radius: 12px;
          border-bottom-left-radius: 12px;
        }

        .users-table tbody td:last-child {
          border-right: 1px solid #1a1a1a;
          border-top-right-radius: 12px;
          border-bottom-right-radius: 12px;
        }

        .user-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .user-name {
          font-weight: 600;
          font-size: 16px;
        }

        .user-email {
          color: #888888;
          font-size: 14px;
        }

        .role-badge {
          display: inline-block;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .role-select {
          background: #000000;
          border: 1.5px solid #1a1a1a;
          border-radius: 10px;
          padding: 10px 14px;
          color: #ffffff;
          font-size: 14px;
          font-weight: 600;
          font-family: "Urbanist", sans-serif;
          cursor: pointer;
          transition: all 0.2s;
          outline: none;
        }

        .role-select:hover {
          border-color: #ff5500;
        }

        .role-select:focus {
          border-color: #ff5500;
          box-shadow: 0 0 0 3px rgba(255, 85, 0, 0.2);
        }

        .user-id {
          font-family: "Azeret Mono", monospace;
          font-size: 12px;
          color: #666666;
        }

        .date {
          color: #888888;
          font-size: 14px;
        }

        @media (max-width: 768px) {
          .title {
            font-size: 32px;
          }

          .quick-actions {
            flex-direction: column;
          }

          .users-table-container {
            padding: 20px;
          }

          .users-table {
            font-size: 14px;
          }
        }
      `}</style>

      <div className="admin-header">
        <h1 className="title">Super Admin Dashboard</h1>
        <p className="subtitle">Manage user roles, permissions, and deliveries</p>
        
        <div className="quick-actions">
          <button 
            className="action-button"
            onClick={() => router.push("/admin/deliveries")}
          >
            <span>📦</span>
            <span>Manage Deliveries</span>
          </button>
        </div>
      </div>

      <div className="content">
        {/* Error Snackbar */}
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={handleCloseError}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert 
            onClose={handleCloseError} 
            severity="error" 
            variant="filled"
            sx={{
              backgroundColor: '#ff5500',
              color: '#ffffff',
              fontFamily: 'Urbanist, sans-serif',
              fontWeight: 600,
              borderRadius: '12px',
              boxShadow: '0 8px 24px rgba(255, 85, 0, 0.4)',
            }}
          >
            <AlertTitle sx={{ fontWeight: 700 }}>Error</AlertTitle>
            {error}
          </Alert>
        </Snackbar>

        {/* Success Snackbar */}
        <Snackbar
          open={!!success}
          autoHideDuration={4000}
          onClose={handleCloseSuccess}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert 
            onClose={handleCloseSuccess} 
            severity="success" 
            variant="filled"
            sx={{
              backgroundColor: '#00ff88',
              color: '#000000',
              fontFamily: 'Urbanist, sans-serif',
              fontWeight: 600,
              borderRadius: '12px',
              boxShadow: '0 8px 24px rgba(0, 255, 136, 0.4)',
            }}
          >
            <AlertTitle sx={{ fontWeight: 700, color: '#000000' }}>Success</AlertTitle>
            {success}
          </Alert>
        </Snackbar>

        <div className="users-table-container">
          <div className="table-header">
            <h2 className="table-title">User Management</h2>
            <p className="table-description">Total Users: {users.length}</p>
          </div>

          <table className="users-table">
            <thead>
              <tr>
                <th>User</th>
                <th>User ID</th>
                <th>Current Role</th>
                <th>Change Role</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.uid}>
                  <td>
                    <div className="user-info">
                      <div className="user-name">{user.displayName || "No name"}</div>
                      <div className="user-email">{user.email}</div>
                    </div>
                  </td>
                  <td>
                    <div className="user-id">{user.uid.substring(0, 12)}...</div>
                  </td>
                  <td>
                    <span
                      className="role-badge"
                      style={{
                        backgroundColor: `${getRoleBadgeColor(user.role)}20`,
                        color: getRoleBadgeColor(user.role),
                        border: `1px solid ${getRoleBadgeColor(user.role)}40`,
                      }}
                    >
                      {user.role === "super_admin" ? "Super Admin" : user.role}
                    </span>
                  </td>
                  <td>
                    <select
                      className="role-select"
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.uid, e.target.value as UserRole)}
                      disabled={user.uid === userData?.uid} // Prevent changing own role
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                      <option value="super_admin">Super Admin</option>
                    </select>
                  </td>
                  <td>
                    <div className="date">
                      {new Date(user.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;