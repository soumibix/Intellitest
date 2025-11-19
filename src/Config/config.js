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
  GET_TESTS: 'test/testData',

  // With query parameters (these will be constructed dynamically)
  // GET /test/testData?page=1&limit=10
  // GET /test/testData?id=691c29b0588288e4044b78af
  // GET /test/testData?status=upcoming
  // GET /test/testData?search=CSE
  // GET /test/testData?status=upcoming&search=CSE&page=2&limit=5

  // STUDENT TEST APIs
  USER_GET_ALL_TESTS: "student/test/alltest",
  USER_GET_TEST_BY_ID: (id) => `student/test/alltest?id=${id}`,
  USER_START_TEST: (id) => `student/test/start/${id}`,
  USER_SUBMIT_TEST: (id) => `student/test/submit/${id}`,
  USER_GET_TEST_REPORT: (id) => `student/test/report/${id}`,

  // With query parameters (these will be constructed dynamically)
  // GET /test/testData?page=1&limit=10
  // GET /test/testData?id=691c29b0588288e4044b78af
  // GET /test/testData?status=upcoming
  // GET /test/testData?search=CSE
  // GET /test/testData?status=upcoming&search=CSE&page=2&limit=5

  // Student test queries:
  // GET /student/test/alltest?page=1&limit=5&department=IT&semester=2nd Semester&search=m
  // GET /student/test/alltest?status=ongoing
  // GET /student/test/alltest?status=upcoming&department=CSE
};

export default {
  BASE_URL,
  API_ENDPOINTS,
};