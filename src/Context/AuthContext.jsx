import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if token is valid
  const isTokenValid = () => {
    let token = sessionStorage.getItem("token");
    if (!token) {
      token = localStorage.getItem("token");
    }
    return !!token;
  };

  // Listen for storage changes across tabs (cross-tab sync)
  useEffect(() => {
    const handleStorageChange = (e) => {
      // If token is removed in another tab, logout current tab
      if (e.key === 'token' && !e.newValue) {
        handleLogout(false); // false = don't clear localStorage (already cleared)
      }
      // If token is added in another tab, prevent cross-portal login
      if (e.key === 'token' && e.newValue && isAuthenticated) {
        const newRole = localStorage.getItem('role');
        if (newRole && newRole !== role) {
          // Different role logged in - force logout
          handleLogout(false);
          window.location.reload();
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [isAuthenticated, role]);

  // Initialize authentication on mount
  useEffect(() => {
    const initializeAuth = () => {
      if (isTokenValid()) {
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

            if (!sessionStorage.getItem("token") && storedToken) {
              sessionStorage.setItem("token", storedToken);
              sessionStorage.setItem("role", storedRole);
              sessionStorage.setItem("user", storedUser);
            }
          } catch (error) {
            console.error("Error parsing stored user data:", error);
            clearAllStorage();
          }
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  // Clear all storage
  const clearAllStorage = () => {
    // Clear session storage
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("userData");
    sessionStorage.removeItem("activeStep");
    sessionStorage.removeItem("testId");
    
    // Clear local storage (auth only, preserve remember me emails)
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    localStorage.removeItem("userData");
  };

  // Internal logout handler
  const handleLogout = (clearStorage = true) => {
    if (clearStorage) {
      clearAllStorage();
    }
    setUser(null);
    setRole(null);
    setIsAuthenticated(false);
  };

  // Login function
  const login = (userData, userRole, token, rememberMe = false) => {
    // Always store in sessionStorage
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("role", userRole);
    sessionStorage.setItem("user", JSON.stringify(userData));

    // If remember me is checked, also store in localStorage
    if (rememberMe) {
      localStorage.setItem("token", token);
      localStorage.setItem("role", userRole);
      localStorage.setItem("user", JSON.stringify(userData));
    } else {
      // If not remembering, clear any existing localStorage auth data
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("user");
    }

    setUser(userData);
    setRole(userRole);
    setIsAuthenticated(true);
  };

  // Public logout function
  const logout = () => {
    handleLogout(true);
  };

  // Get token
  const getToken = () => {
    return sessionStorage.getItem("token") || localStorage.getItem("token");
  };

  const value = {
    user,
    role,
    isAuthenticated,
    isLoading,
    login,
    logout,
    getToken,
    token: getToken(),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};