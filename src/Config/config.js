// src/config/config.js

// Base API URL (automatically switches based on .env)
export const BASE_URL = import.meta.env.VITE_API_URL;

// API endpoints
export const API_ENDPOINTS = {
  // Student endpoints
  STUDENT_SIGNUP: "user/signup",
  STUDENT_SIGNIN: "user/signin",
  STUDENT_VERIFY_EMAIL: "user/verifyEmail", // For signup email verification & forgot password OTP
  STUDENT_FORGOT_PASSWORD: "user/forgotPassword",
  STUDENT_RESET_PASSWORD: "user/resetPassword",
  STUDENT_UPDATE_PROFILE: "user/updateProfile",
  STUDENT_GET_PROFILE: "user/getProfile",
  
  // Admin endpoints
  ADMIN_SIGNIN: "superAdmin/signin",
  ADD_FACULTY: "superAdmin/faculty",
  GET_ALL_FACULTIES: "superAdmin/faculty",
  UPDATE_FACULTY: (id) => `superAdmin/faculty/${id}`, // PATCH
  DELETE_FACULTY: (id) => `superAdmin/faculty/${id}`, // DELETE
  
  // Faculty endpoints
  FACULTY_SIGNIN: "faculty/signin",
  FACULTY_FORGOT_PASSWORD: "faculty/forgot-password",
  FACULTY_VERIFY_OTP: "faculty/verify-otp",
  FACULTY_RESET_PASSWORD: "faculty/changePassword",
};

export default {
  BASE_URL,
  API_ENDPOINTS,
};