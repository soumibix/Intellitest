import React, { createContext, useContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import UserDashboard from "./Pages/User/UserDashboard";
import UserSignIn from "./Pages/User/UserSignIn";
import AdminLayout from "./Layout/Admin/Layout";
import UserLayout from "./Layout/User/UserLayout";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import UserTests from "./Pages/User/UserTests";
import { AdminSignIn } from "./Pages/Admin/AdminSignIn";
import { UserSignUp } from "./Pages/User/UserSignUp";
import { FacultySignIn } from "./Pages/Faculty/FacultySignIn";

// *** CONFIGURATION ***
const ENFORCE_ROUTE_PROTECTION = false; // When true = routes are protected, when false = open access

// *** EXISTING COMPONENTS (from your original code) ***
// const AdminDashboard = () => <h2>Admin Dashboard</h2>;
// const AdminLogin = () => <h2>Admin Login</h2>;
// const UserDashboard = () => <h2>User Dshboard</h2>;
const NotFound = () => <h2>404 - Page Not Found</h2>;

// *** REDIRECT COMPONENTS FOR ROLE-BASED DASHBOARDS ***
const AdminDashboardRedirect = () => <Navigate to="/admin/dashboard" replace />;
const UserDashboardRedirect = () => <Navigate to="/user/dashboard" replace />;

// *** UTILITY FUNCTIONS ***
const isTokenValid = () => {
  // Check both sessionStorage and localStorage
  let token = sessionStorage.getItem("token");

  if (!token) {
    token = localStorage.getItem("token");
  }

  return !!token;
};

// *** AUTH CONTEXT ***
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = () => {
      if (isTokenValid()) {
        // Try sessionStorage first, then localStorage
        let storedRole =
          sessionStorage.getItem("role") || localStorage.getItem("role");
        let storedUser =
          sessionStorage.getItem("user") || localStorage.getItem("user");
        let storedToken =
          sessionStorage.getItem("token") || localStorage.getItem("token");

        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser);
            setRole(storedRole);
            setUser(parsedUser);
            setIsAuthenticated(true);

            // If data was in localStorage, copy to sessionStorage for current session
            if (!sessionStorage.getItem("token") && storedToken) {
              sessionStorage.setItem("token", storedToken);
              sessionStorage.setItem("role", storedRole);
              sessionStorage.setItem("user", storedUser);
            }
          } catch (error) {
            console.error("Error parsing stored user data:", error);
            // Clear invalid data
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("role");
            sessionStorage.removeItem("user");
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            localStorage.removeItem("user");
          }
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = (userData, userRole, token) => {
    // Always store in sessionStorage
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("role", userRole);
    sessionStorage.setItem("user", JSON.stringify(userData));

    setUser(userData);
    setRole(userRole);
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Clear both sessionStorage and localStorage
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    setUser(null);
    setRole(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    role,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// *** LOADING SCREEN ***
const LoadingScreen = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
      <p className="text-lg text-gray-600 mt-4">Loading...</p>
    </div>
  </div>
);

// *** PROTECTED ROUTE COMPONENT ***
const ProtectedRoute = ({ allowedRoles, children }) => {
  const { isAuthenticated, role, isLoading } = useAuth();

  // Show loading screen while auth is initializing
  if (isLoading) {
    return <LoadingScreen />;
  }

  // If protection is disabled, allow access to all routes
  if (!ENFORCE_ROUTE_PROTECTION) {
    return children;
  }

  if (!isAuthenticated) {
    // Redirect to appropriate login based on required role
    const loginPath = allowedRoles?.includes("admin") ? "/admin/signin" : "/signin";
    return <Navigate to={loginPath} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    // Redirect to their appropriate dashboard
    const redirectPath = role === "admin" ? "/admin/dashboard" : role === "faculty" ? "/faculty/dashboard" : "/user/dashboard";
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

// *** GUEST ONLY ROUTE (prevents authenticated users from accessing login pages) ***
const GuestOnlyRoute = ({ children }) => {
  const { isAuthenticated, role, isLoading } = useAuth();

  // Show loading screen while auth is initializing
  if (isLoading) {
    return <LoadingScreen />;
  }

  // If route protection is disabled, always show login pages (no redirect)
  if (!ENFORCE_ROUTE_PROTECTION) {
    return children;
  }

  // If user is authenticated, redirect them based on role
  if (isAuthenticated && role) {
    if (role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (role === "faculty") {
      return <Navigate to="/faculty/dashboard" replace />;
    } else if (role === "user") {
      return <Navigate to="/user/dashboard" replace />;
    }
  }

  // Not authenticated - allow access to login pages
  return children;
};

// *** SMART REDIRECT COMPONENT ***
const SmartRedirect = () => {
  const { isAuthenticated, role, isLoading } = useAuth();

  // Show loading screen while auth is initializing
  if (isLoading) {
    return <LoadingScreen />;
  }

  // If protection is disabled, redirect to login pages (user login by default)
  if (!ENFORCE_ROUTE_PROTECTION) {
    return <Navigate to="/signin" replace />;
  }

  // If user is authenticated, redirect based on role
  if (isAuthenticated && role) {
    if (role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (role === "faculty") {
      return <Navigate to="/faculty/dashboard" replace />;
    } else if (role === "user") {
      return <Navigate to="/user/dashboard" replace />;
    }
  }

  // Not authenticated - redirect to user login
  return <Navigate to="/signin" replace />;
};

// *** MAIN APP ROUTER ***
const AppRouter = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* ---------- USER ROUTES ---------- */}
          <Route
            path="/signup"
            element={
              <GuestOnlyRoute>
                <UserSignUp />
              </GuestOnlyRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <GuestOnlyRoute>
                <UserSignIn />
              </GuestOnlyRoute>
            }
          />
          <Route
            path="/user"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <UserLayout>
                  <UserDashboardRedirect />
                </UserLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/dashboard"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <UserLayout>
                  <UserDashboard />
                </UserLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/tests"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <UserLayout>
                  <UserTests />
                </UserLayout>
              </ProtectedRoute>
            }
          />

          {/* ---------- ADMIN ROUTES ---------- */}
          <Route
            path="/admin/signin"
            element={
              <GuestOnlyRoute>
                <AdminSignIn />
              </GuestOnlyRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminLayout>
                  <AdminDashboardRedirect />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          
          {/* ---------- FACULTY ROUTES ---------- */}
          <Route
            path="/faculty/signin"
            element={
              <GuestOnlyRoute>
                <FacultySignIn />
              </GuestOnlyRoute>
            }
          />
          <Route
            path="/faculty"
            element={
              <ProtectedRoute allowedRoles={["faculty"]}>
                <AdminDashboardRedirect />
              </ProtectedRoute>
            }
          />
          
          {/* FIXED: AdminLayout wraps the content inside the element prop */}
          <Route
            path="/faculty/dashboard"
            element={
              <ProtectedRoute allowedRoles={["faculty"]}>
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          {/* ---------- COMMON / FALLBACK ---------- */}
          <Route path="/" element={<SmartRedirect />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRouter;

// *** EXPORTS ***
export {
  useAuth,
  AuthProvider,
  ProtectedRoute,
  GuestOnlyRoute,
  isTokenValid,
};