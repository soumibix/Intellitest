import React, { createContext, useContext, useState, useEffect } from "react";

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

  // Initialize authentication on mount
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
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
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
    }

    setUser(userData);
    setRole(userRole);
    setIsAuthenticated(true);
  };

  // Logout function
  const logout = () => {
    clearAllStorage();
    setUser(null);
    setRole(null);
    setIsAuthenticated(false);
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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};