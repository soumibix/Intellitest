// src/Config/config.js

export const BASE_URL = import.meta.env.VITE_API_URL;

export const API_ENDPOINTS = {
  // STUDENT ENDPOINTS
  STUDENT_SIGNUP: "user/signup",
  STUDENT_SIGNIN: "user/signin",
  STUDENT_VERIFY_EMAIL: "user/verifyEmail",
  STUDENT_FORGOT_PASSWORD: "user/forgotPassword",
  STUDENT_RESET_PASSWORD: "user/resetPassword",
  STUDENT_UPDATE_PROFILE: "user/updateProfile",
  STUDENT_GET_PROFILE: "user/getProfile",

  // ADMIN ENDPOINTS
  ADMIN_SIGNIN: "superAdmin/signin",
  ADD_FACULTY: "superAdmin/faculty",
  GET_ALL_FACULTIES: "superAdmin/faculty",
  UPDATE_FACULTY: (id) => `superAdmin/faculty/${id}`,
  DELETE_FACULTY: (id) => `superAdmin/faculty/${id}`,

  // FACULTY ENDPOINTS
  FACULTY_SIGNIN: "faculty/signin",
  FACULTY_FORGOT_PASSWORD: "faculty/forgotPassword",
  FACULTY_RESET_PASSWORD: "faculty/resetPassword",
  FACULTY_GET_PROFILE: "faculty/getProfileData",
  FACULTY_UPDATE_PROFILE: "faculty/updateProfile",

  // TEST APIs
  TEST_ADD: "test/testDetail",
  TEST_SCHEDULE: (id) => `test/scheduleTest/${id}`,
  FILE_UPLOAD: "upload/uploadFile",
  GENERATE_ANSWER: (id) => `test/generateAnswer/${id}`,
  TEST_SAVE_QA: (id) => `test/saveQA/${id}`,
  TEST_GET: "test/testData",
  TEST_GET_BY_ID: (id) => `test/testData?id=${id}`,
  TEST_UPDATE: (id) => `test/updateTestData/${id}`,
  TEST_UPDATE_QUESTION: (testId, questionId) => 
    `test/updateTestData/${testId}?action=update&questionId=${questionId}`,
  TEST_DELETE: (id) => `test/deleteTest/${id}`,
};

export default {
  BASE_URL,
  API_ENDPOINTS,
};