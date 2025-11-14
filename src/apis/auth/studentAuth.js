// src/apis/auth/studentAuth.js
import { API_ENDPOINTS } from "../../Config/config"

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

  // Forgot Password - Request OTP
  forgotPassword: async (httpHook, email) => {
    try {
      const response = await httpHook.postReq(
        API_ENDPOINTS.STUDENT_FORGOT_PASSWORD,
        "",
        { email }
      );
      return response;
    } catch (error) {
      console.error("Student forgot password error:", error);
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
        API_ENDPOINTS.STUDENT_VERIFY_OTP,
        "",
        { email, otp }
      );
      return response;
    } catch (error) {
      console.error("Student OTP verification error:", error);
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
        API_ENDPOINTS.STUDENT_RESET_PASSWORD,
        "",
        { email, newPassword }
      );
      return response;
    } catch (error) {
      console.error("Student reset password error:", error);
      return {
        success: false,
        message: error.message || "Password reset failed",
      };
    }
  },
};