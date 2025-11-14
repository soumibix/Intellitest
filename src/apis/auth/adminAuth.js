// src/apis/auth/adminAuth.js
import { API_ENDPOINTS } from "../../Config/config";

export const adminAuthAPI = {
  // Admin Sign In
  signin: async (httpHook, credentials) => {
    try {
      const response = await httpHook.postReq(
        API_ENDPOINTS.ADMIN_SIGNIN,
        "",
        credentials
      );
      return response;
    } catch (error) {
      console.log("Admin signin error:", error);
      return {
        success: false,
        message: error.message || "Sign in failed",
      };
    }
  },
};