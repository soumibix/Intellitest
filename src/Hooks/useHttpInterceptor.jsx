import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useNotification } from "../Context/NotificationContext";

export const useHttpInterceptor = () => {
  const navigate = useNavigate();
  const { logout, role, isAuthenticated } = useAuth();
  const { showError } = useNotification();
  const hasShownError = useRef(false);

  useEffect(() => {
    if (!isAuthenticated) return;

    const originalFetch = window.fetch;

    window.fetch = async (...args) => {
      try {
        const response = await originalFetch(...args);

        // Check for unauthorized responses
        if (
          (response.status === 401 || response.status === 403) &&
          !hasShownError.current
        ) {
          hasShownError.current = true;

          showError("Session expired. Please login again.");

          // Logout user
          logout();

          // Navigate to appropriate signin page
          setTimeout(() => {
            const loginPath =
              role === "faculty"
                ? "/faculty/signin"
                : role === "superadmin"
                ? "/admin/signin"
                : "/signin";
            navigate(loginPath, { replace: true });
            hasShownError.current = false;
          }, 100);
        }

        return response;
      } catch (error) {
        throw error;
      }
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, [navigate, logout, role, showError, isAuthenticated]);
};
