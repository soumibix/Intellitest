// src/apis/auth/studentAuth.js
import { API_ENDPOINTS } from "../../Config/config";

export const studentAuthAPI = {
  
  // Student Signup
  signup: async (httpHook, userData) => {
    try {
      const response = await httpHook.postReq(
        API_ENDPOINTS.STUDENT_SIGNUP,
        "",
        userData
      );
      return response;
    } catch (error) {
      console.error("Student signup error:", error);
      return {
        success: false,
        message: error.message || "Signup failed",
      };
    }
  },

  // Student Sign In
  signin: async (httpHook, credentials) => {
    try {
      const response = await httpHook.postReq(
        API_ENDPOINTS.STUDENT_SIGNIN,
        "",
        credentials
      );
      return response;
    } catch (error) {
      console.error("Student signin error:", error);
      return {
        success: false,
        message: error.message || "Sign in failed",
      };
    }
  },

  // Send OTP to Email (for signup verification)
  // If only email is provided, OTP will be sent
  // If both email and OTP are provided, verification will happen
  verifyEmail: async (httpHook, email, otp = null) => {
    try {
      const payload = otp ? { email, otp } : { email };
      
      const response = await httpHook.postReq(
        API_ENDPOINTS.STUDENT_VERIFY_EMAIL,
        "",
        payload
      );
      return response;
    } catch (error) {
      console.error("Email verification error:", error);
      return {
        success: false,
        message: error.message || (otp ? "OTP verification failed" : "Failed to send OTP"),
      };
    }
  },

  // Forgot Password - Request OTP or Verify OTP
  // If only email is provided, OTP will be sent
  // If both email and OTP are provided, verification will happen
  forgotPassword: async (httpHook, email, otp = null) => {
    try {
      const payload = otp ? { email, otp } : { email };
      
      const response = await httpHook.postReq(
        API_ENDPOINTS.STUDENT_FORGOT_PASSWORD,
        "",
        payload
      );
      return response;
    } catch (error) {
      console.error("Forgot password error:", error);
      return {
        success: false,
        message: error.message || (otp ? "OTP verification failed" : "Failed to send OTP"),
      };
    }
  },

  // Reset Password
  resetPassword: async (httpHook, email, newPassword) => {
    try {
      const response = await httpHook.postReq(
        API_ENDPOINTS.STUDENT_RESET_PASSWORD,
        "",
        { email, newPassword }
      );
      return response;
    } catch (error) {
      console.error("Reset password error:", error);
      return {
        success: false,
        message: error.message || "Password reset failed",
      };
    }
  },

  // Update Profile
  updateProfile: async (httpHook, token, profileData) => {
    try {
      const response = await httpHook.patchReq(
        API_ENDPOINTS.STUDENT_UPDATE_PROFILE,
        token,
        profileData
      );
      
      // Update sessionStorage with new profile data if successful
      if (response.success && response.data) {
        const currentUser = JSON.parse(sessionStorage.getItem("user") || "{}");
        const updatedUser = {
          ...currentUser,
          ...response.data,
          allFieldsComplete: response.data.allFieldsComplete || false
        };
        sessionStorage.setItem("user", JSON.stringify(updatedUser));
      }
      
      return response;
    } catch (error) {
      console.error("Update profile error:", error);
      return {
        success: false,
        message: error.message || "Profile update failed",
      };
    }
  },

  // Get Profile
  getProfile: async (httpHook, token) => {
    try {
      const response = await httpHook.getReq(
        API_ENDPOINTS.STUDENT_GET_PROFILE,
        token
      );
      
      // Update sessionStorage with fetched profile data if successful
      if (response.success && response.data) {
        const currentUser = JSON.parse(sessionStorage.getItem("user") || "{}");
        const updatedUser = {
          ...currentUser,
          ...response.data,
          allFieldsComplete: response.data.allFieldsComplete || false
        };
        sessionStorage.setItem("user", JSON.stringify(updatedUser));
      }
      
      return response;
    } catch (error) {
      console.error("Get profile error:", error);
      return {
        success: false,
        message: error.message || "Failed to fetch profile",
      };
    }
  },
};