// src/AppRouter.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Layouts
import AdminLayout from "./Layout/Admin/Layout";
import UserLayout from "./Layout/User/UserLayout";
import FacultyLayout from "./Layout/Faculty/FacultyLayout";

// Admin Pages
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import { AdminSignIn } from "./Pages/Admin/AdminSignIn";
import AdminTestDetails from "./Pages/Admin/TestDetails";
import AdminStudentPerformance from "./Pages/Admin/StudentPerformance";
import IndividualStudentPerformance from "./Pages/Admin/IndividualStudentPerformance";
import AddFaculty from "./Pages/Admin/AddFaculty";

// Faculty Pages
import FacultyDashboard from "./Pages/Faculty/FacultyDashboard";
import { FacultySignIn } from "./Pages/Faculty/FacultySignIn";
import FacultyIndividualStudentPerformance from "./Pages/Faculty/FacultyIndividualStudentPerformance";
import FacultyStudentPerformance from "./Pages/Faculty/FacultyStudentPerformance";
import FacultyTestDetails from "./Pages/Faculty/FacultyTestDetails";
import { ForgotPassword as FacultyForgotPassword } from "./Pages/Faculty/ForgotPassword";
import FacultyOTPVerification from "./Pages/Faculty/OTPVerification";
import FacultyResetNewPassword from "./Pages/Faculty/ResetNewPassword";

// User/Student Pages
import UserDashboard from "./Pages/User/UserDashboard";
import UserSignIn from "./Pages/User/UserSignIn";
import { UserSignUp } from "./Pages/User/UserSignUp";
import UserTests from "./Pages/User/UserTests";
import UserIndividualTest from "./Pages/User/UserIndividualTest";
import TestReports from "./Pages/User/TestReports";
import UserForgotPassword from "./Pages/User/UserForgotPassword";
import UserOTPVerification from "./Pages/User/UserOTPVerification";
import UserResetNewPassword from "./Pages/User/UserResetNewPassword";

// Context Providers
// import { AuthProvider, useAuth } from "./context/AuthContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";

// Profile Completion Guard
import ProfileCompletionGuard from "./Components/ProfileCompletionGuard";

// *** CONFIGURATION ***
const ENFORCE_ROUTE_PROTECTION = true; // Set to false for development, true for production

// *** LOADING SCREEN ***
const LoadingScreen = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto"></div>
      <p className="text-lg text-gray-600 mt-4 font-medium">Loading...</p>
    </div>
  </div>
);

// *** NOT FOUND PAGE ***
const NotFound = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="text-center px-4">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Page not found</p>
      <button
        onClick={() => window.location.href = "/"}
        className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
      >
        Go to Home
      </button>
    </div>
  </div>
);

// *** REDIRECT COMPONENTS FOR ROLE-BASED DASHBOARDS ***
const AdminDashboardRedirect = () => <Navigate to="/admin/dashboard" replace />;
const UserDashboardRedirect = () => <Navigate to="/user/dashboard" replace />;
const FacultyDashboardRedirect = () => <Navigate to="/faculty/dashboard" replace />;

// *** PROTECTED ROUTE COMPONENT ***
const ProtectedRoute = ({ allowedRoles, children }) => {
  const { isAuthenticated, role, isLoading } = useAuth();

  // Show loading screen while auth is initializing
  if (isLoading) {
    return <LoadingScreen />;
  }

  // If protection is disabled, allow access to all routes (development mode)
  if (!ENFORCE_ROUTE_PROTECTION) {
    return children;
  }

  // Check authentication
  if (!isAuthenticated) {
    // Redirect to appropriate login based on required role
    const loginPath = allowedRoles?.includes("superadmin") 
      ? "/admin/signin" 
      : allowedRoles?.includes("faculty")
      ? "/faculty/signin"
      : "/signin";
    return <Navigate to={loginPath} replace />;
  }

  // Check role authorization
  if (allowedRoles && !allowedRoles.includes(role)) {
    // Redirect to their appropriate dashboard
    const redirectPath = 
      role === "superadmin" 
        ? "/admin/dashboard" 
        : role === "faculty" 
        ? "/faculty/dashboard" 
        : "/user/dashboard";
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
    if (role === "superadmin") {
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
    if (role === "superadmin") {
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
    <NotificationProvider>
      <Router>
        <AuthProvider>
          <Routes>
            {/* ==================== USER/STUDENT ROUTES ==================== */}
            
            {/* Public Routes - Sign Up & Sign In */}
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
            
            {/* Password Reset Flow */}
            <Route
              path="/forgot-password"
              element={
                <GuestOnlyRoute>
                  <UserForgotPassword />
                </GuestOnlyRoute>
              }
            />
            <Route
              path="/otp-verification"
              element={
                <GuestOnlyRoute>
                  <UserOTPVerification />
                </GuestOnlyRoute>
              }
            />
            <Route
              path="/reset-new-password"
              element={
                <GuestOnlyRoute>
                  <UserResetNewPassword />
                </GuestOnlyRoute>
              }
            />

            {/* Protected User Routes - Dashboard accessible, other pages locked when profile incomplete */}
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
                  <ProfileCompletionGuard allowDashboard={false}>
                    <UserLayout>
                      <UserTests />
                    </UserLayout>
                  </ProfileCompletionGuard>
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/test/:id"
              element={
                <ProtectedRoute allowedRoles={["user"]}>
                  <ProfileCompletionGuard allowDashboard={false}>
                    <UserIndividualTest />
                  </ProfileCompletionGuard>
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/test-reports"
              element={
                <ProtectedRoute allowedRoles={["user"]}>
                  <ProfileCompletionGuard allowDashboard={false}>
                    <UserLayout>
                      <TestReports />
                    </UserLayout>
                  </ProfileCompletionGuard>
                </ProtectedRoute>
              }
            />

            {/* ==================== ADMIN ROUTES ==================== */}
            
            {/* Admin Sign In */}
            <Route
              path="/admin/signin"
              element={
                <GuestOnlyRoute>
                  <AdminSignIn />
                </GuestOnlyRoute>
              }
            />

            {/* Protected Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={["superadmin"]}>
                  <AdminLayout>
                    <AdminDashboardRedirect />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={["superadmin"]}>
                  <AdminLayout>
                    <AdminDashboard />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/add-faculties"
              element={
                <ProtectedRoute allowedRoles={["superadmin"]}>
                  <AdminLayout>
                    <AddFaculty />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/test-details"
              element={
                <ProtectedRoute allowedRoles={["superadmin"]}>
                  <AdminLayout>
                    <AdminTestDetails />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/student-performance"
              element={
                <ProtectedRoute allowedRoles={["superadmin"]}>
                  <AdminLayout>
                    <AdminStudentPerformance />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/student-performance/viewreport/:id"
              element={
                <ProtectedRoute allowedRoles={["superadmin"]}>
                  <AdminLayout>
                    <IndividualStudentPerformance />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />

            {/* ==================== FACULTY ROUTES ==================== */}
            
            {/* Faculty Sign In */}
            <Route
              path="/faculty/signin"
              element={
                <GuestOnlyRoute>
                  <FacultySignIn />
                </GuestOnlyRoute>
              }
            />
            
            {/* Faculty Password Reset Flow */}
            <Route
              path="/faculty/forgot-password"
              element={
                <GuestOnlyRoute>
                  <FacultyForgotPassword />
                </GuestOnlyRoute>
              }
            />
            <Route
              path="/faculty/otp-verification"
              element={
                <GuestOnlyRoute>
                  <FacultyOTPVerification />
                </GuestOnlyRoute>
              }
            />
            <Route
              path="/faculty/reset-new-password"
              element={
                <GuestOnlyRoute>
                  <FacultyResetNewPassword />
                </GuestOnlyRoute>
              }
            />

            {/* Protected Faculty Routes */}
            <Route
              path="/faculty"
              element={
                <ProtectedRoute allowedRoles={["faculty"]}>
                  <FacultyLayout>
                    <FacultyDashboardRedirect />
                  </FacultyLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/faculty/dashboard"
              element={
                <ProtectedRoute allowedRoles={["faculty"]}>
                  <FacultyLayout>
                    <FacultyDashboard />
                  </FacultyLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/faculty/test-details"
              element={
                <ProtectedRoute allowedRoles={["faculty"]}>
                  <FacultyLayout>
                    <FacultyTestDetails />
                  </FacultyLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/faculty/student-performance"
              element={
                <ProtectedRoute allowedRoles={["faculty"]}>
                  <FacultyLayout>
                    <FacultyStudentPerformance />
                  </FacultyLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/faculty/student-performance/viewreport/:id"
              element={
                <ProtectedRoute allowedRoles={["faculty"]}>
                  <FacultyLayout>
                    <FacultyIndividualStudentPerformance />
                  </FacultyLayout>
                </ProtectedRoute>
              }
            />

            {/* ==================== COMMON / FALLBACK ROUTES ==================== */}
            <Route path="/" element={<SmartRedirect />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </Router>
    </NotificationProvider>
  );
};

export default AppRouter;

// *** EXPORTS ***
export {
  useAuth,
  AuthProvider,
  ProtectedRoute,
  GuestOnlyRoute,
  LoadingScreen,
  NotFound,
};