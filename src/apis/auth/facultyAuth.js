// src/apis/auth/facultyAuth.js
import { API_ENDPOINTS } from "../../Config/config";

export const facultyAuthAPI = {
  // Faculty Sign In
  signin: async (httpHook, credentials) => {
    try {
      const response = await httpHook.postReq(
        API_ENDPOINTS.FACULTY_SIGNIN,
        "",
        credentials
      );
      return response;
    } catch (error) {
      console.error("Faculty signin error:", error);
      return {
        success: false,
        message: error.message || "Sign in failed",
      };
    }
  },

  // Forgot Password - Request OTP
  forgotPassword: async (httpHook, email) => {
    try {
      const response = await httpHook.postReq(
        API_ENDPOINTS.FACULTY_FORGOT_PASSWORD,
        "",
        { email }
      );
      return response;
    } catch (error) {
      console.error("Faculty forgot password error:", error);
      return {
        success: false,
        message: error.message || "Failed to send OTP",
      };
    }
  },

  // Verify OTP
  verifyOTP: async (httpHook, email, otp) => {
    try {
      const response = await httpHook.postReq(
        API_ENDPOINTS.FACULTY_FORGOT_PASSWORD,
        "",
        { email, otp }
      );
      return response;
    } catch (error) {
      console.error("Faculty OTP verification error:", error);
      return {
        success: false,
        message: error.message || "OTP verification failed",
      };
    }
  },

  // Reset Password
  resetPassword: async (httpHook, email, newPassword) => {
    try {
      const response = await httpHook.postReq(
        API_ENDPOINTS.FACULTY_RESET_PASSWORD,
        "",
        { email, newPassword }
      );
      return response;
    } catch (error) {
      console.error("Faculty reset password error:", error);
      return {
        success: false,
        message: error.message || "Password reset failed",
      };
    }
  },
  
  // Change Password
  changePassword: async (httpHook, email, newPassword) => {
    try {
      const response = await httpHook.postReq(
        API_ENDPOINTS.FACULTY_CHANGE_PASSWORD,
        "",
        { email, newPassword }
      );
      return response;
    } catch (error) {
      console.error("Faculty reset password error:", error);
      return {
        success: false,
        message: error.message || "Password reset failed",
      };
    }
  },

  // Get Profile Data
  getProfile: async (httpHook, token, facultyId) => {
    try {
      const response = await httpHook.getReq(
        `${API_ENDPOINTS.FACULTY_GET_PROFILE}/${facultyId}`,
        token
      );
      return response;
    } catch (error) {
      console.error("Faculty get profile error:", error);
      return {
        success: false,
        message: error.message || "Failed to fetch profile data",
      };
    }
  },

  // Update Profile
  updateProfile: async (httpHook, token, facultyId, profileData) => {
    try {
      const response = await httpHook.patchReq(
        `${API_ENDPOINTS.FACULTY_UPDATE_PROFILE}/${facultyId}`,
        token,
        profileData
      );
      return response;
    } catch (error) {
      console.error("Faculty update profile error:", error);
      return {
        success: false,
        message: error.message || "Failed to update profile",
      };
    }
  },
};