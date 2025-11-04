import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

const AdminDashboard = () => <h2>Admin Dashboard</h2>;
const AdminLogin = () => <h2>Admin Login</h2>;
const UserDashboard = () => <h2>User Dashboard</h2>;
const UserLogin = () => <h2>User Login</h2>;
const NotFound = () => <h2>404 - Page Not Found</h2>;

// 🔹 Fake Auth Utils (replace with real logic)
const getUserRole = () => localStorage.getItem("role"); // 'admin' or 'user' or null

const ProtectedRoute = ({ children, role }) => {
  const currentRole = getUserRole();

  if (!currentRole) {
    return <Navigate to={role === "admin" ? "/admin/login" : "/login"} />;
  }

  if (currentRole !== role) {
    return <Navigate to={currentRole === "admin" ? "/admin" : "/user"} />;
  }

  return children;
};

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* ---------- USER ROUTES ---------- */}
        <Route path="/login" element={<UserLogin />} />
        <Route
          path="/user"
          element={
            <ProtectedRoute role="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        {/* ---------- ADMIN ROUTES ---------- */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* ---------- COMMON / FALLBACK ---------- */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
