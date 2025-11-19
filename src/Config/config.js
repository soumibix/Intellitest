// src/Config/config.js

// Base API URL (automatically switches based on .env)
export const BASE_URL = import.meta.env.VITE_API_URL;

// API endpoints
export const API_ENDPOINTS = {
  // ===========================
  // STUDENT ENDPOINTS
  // ===========================
  STUDENT_SIGNUP: "user/signup",
  STUDENT_SIGNIN: "user/signin",
  STUDENT_VERIFY_EMAIL: "user/verifyEmail", // For signup email verification & forgot password OTP
  STUDENT_FORGOT_PASSWORD: "user/forgotPassword",
  STUDENT_RESET_PASSWORD: "user/resetPassword",
  STUDENT_UPDATE_PROFILE: "user/updateProfile",
  STUDENT_GET_PROFILE: "user/getProfile",

  // ===========================
  // ADMIN ENDPOINTS
  // ===========================
  ADMIN_SIGNIN: "superAdmin/signin",
  ADD_FACULTY: "superAdmin/faculty",
  GET_ALL_FACULTIES: "superAdmin/faculty",
  UPDATE_FACULTY: (id) => `superAdmin/faculty/${id}`, // PATCH
  DELETE_FACULTY: (id) => `superAdmin/faculty/${id}`, // DELETE

  // ===========================
  // FACULTY ENDPOINTS
  // ===========================
  FACULTY_SIGNIN: "faculty/signin",
  FACULTY_FORGOT_PASSWORD: "faculty/forgotPassword",
  FACULTY_RESET_PASSWORD: "faculty/resetPassword",
  FACULTY_GET_PROFILE: "faculty/getProfileData",
  FACULTY_UPDATE_PROFILE: "faculty/updateProfile",

  // ===========================
  // TEST APIs
  // ===========================
  TEST_ADD: "test/testDetail", // POST - Create new test
  TEST_SCHEDULE: (id) => `test/scheduleTest/${id}`, // POST - Schedule test with date/time
  FILE_UPLOAD: "upload/uploadFile", // POST - Upload file (form-data)
  GENERATE_ANSWER: (id) => `test/generateAnswer/${id}`, // POST - AI generate answers
  TEST_SAVE_QA: (id) => `test/saveQA/${id}`, // POST - Save question & answer PDFs
  TEST_GET: "test/testData", // GET - Get list of tests with filters
  TEST_GET_BY_ID: (id) => `test/testData?id=${id}`, // GET - Get single test by ID
  TEST_UPDATE: (id) => `test/updateTest/${id}`, // PATCH - Update test details
  TEST_UPDATE_SCORE: (tid, qid) =>
    `test/update/${tid}/question/${qid}/score`, // PATCH - Update question score
  TEST_DELETE: (id) => `test/deleteTest/${id}`, // DELETE - Delete test
};

export default {
  BASE_URL,
  API_ENDPOINTS,
};