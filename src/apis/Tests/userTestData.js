// src/apis/Tests/UserTestAPI.js
import { API_ENDPOINTS } from "../../Config/config";

export const UserTestAPI = {
  /**
   * Fetch all tests for a student with filters and pagination
   * @param {Object} httpHook - HTTP hook instance
   * @param {string} token - Authentication token
   * @param {Object} queryParams - Query parameters
   * @returns {Promise<Object>} Response with tests data
   */
  fetchUserTests: async (httpHook, token, queryParams = {}) => {
    try {
      // Build query string from params
      const params = new URLSearchParams();
      
      if (queryParams.page) params.append('page', queryParams.page);
      if (queryParams.limit) params.append('limit', queryParams.limit);
      if (queryParams.department) params.append('department', queryParams.department);
      if (queryParams.semester) params.append('semester', queryParams.semester);
      if (queryParams.search) params.append('search', queryParams.search);
      if (queryParams.status) params.append('status', queryParams.status);
      if (queryParams.testCategory) params.append('testCategory', queryParams.testCategory);
      
      const queryString = params.toString();
      const endpoint = queryString 
        ? `${API_ENDPOINTS.USER_GET_ALL_TESTS}?${queryString}`
        : API_ENDPOINTS.USER_GET_ALL_TESTS;
      
      const response = await httpHook.getReq(
        endpoint,
        token
      );
      
      return {
        success: true,
        data: response.tests || [],
        total: response.total || 0,
        page: response.page || 1,
        limit: response.limit || 10,
        message: response.message || 'Tests fetched successfully',
      };
    } catch (error) {
      console.error('Error fetching user tests:', error);
      return {
        success: false,
        message: error.message || 'Failed to fetch tests',
        data: [],
        total: 0,
        page: 1,
        limit: 10,
      };
    }
  },

  /**
   * Fetch single test details by ID
   * @param {Object} httpHook - HTTP hook instance
   * @param {string} testId - Test ID
   * @param {string} token - Authentication token
   * @returns {Promise<Object>} Response with test data
   */
  fetchUserTestById: async (httpHook, testId, token) => {
    try {
      const response = await httpHook.getReq(
        `${API_ENDPOINTS.USER_GET_TEST_BY_ID(testId)}`,
        'GET',
        null,
        { Authorization: `Bearer ${token}` }
      );
      
      return {
        success: true,
        data: response.test || response.data || null,
        message: response.message || 'Test fetched successfully',
      };
    } catch (error) {
      console.error('Error fetching user test by ID:', error);
      return {
        success: false,
        message: error.message || 'Failed to fetch test details',
        data: null,
      };
    }
  },

  /**
   * Start a test (student begins the test)
   * @param {Object} httpHook - HTTP hook instance
   * @param {string} testId - Test ID
   * @param {string} token - Authentication token
   * @returns {Promise<Object>} Response
   */
  startTest: async (httpHook, testId, token) => {
    try {
      const response = await httpHook.postReq(
        API_ENDPOINTS.USER_START_TEST(testId),
        token,
        {}
      );
      
      return {
        success: true,
        data: response.data || response,
        message: response.message || 'Test started successfully',
      };
    } catch (error) {
      console.error('Error starting test:', error);
      return {
        success: false,
        message: error.message || 'Failed to start test',
        data: null,
      };
    }
  },

  /**
   * Submit test answers
   * @param {Object} httpHook - HTTP hook instance
   * @param {string} testId - Test ID
   * @param {Object} answerData - Answers data
   * @param {string} token - Authentication token
   * @returns {Promise<Object>} Response
   */
  submitTest: async (httpHook, testId, answerData, token) => {
    try {
      const response = await httpHook.postReq(
        API_ENDPOINTS.USER_SUBMIT_TEST(testId),
        token,
        answerData
      );
      
      return {
        success: true,
        data: response.data || response,
        message: response.message || 'Test submitted successfully',
      };
    } catch (error) {
      console.error('Error submitting test:', error);
      return {
        success: false,
        message: error.message || 'Failed to submit test',
        data: null,
      };
    }
  },

  /**
   * Get test results/report
   * @param {Object} httpHook - HTTP hook instance
   * @param {string} testId - Test ID
   * @param {string} token - Authentication token
   * @returns {Promise<Object>} Response with test results
   */
  getTestReport: async (httpHook, testId, token) => {
    try {
      const response = await httpHook.getReq(
        API_ENDPOINTS.USER_GET_TEST_REPORT(testId),
        'GET',
        null,
        { Authorization: `Bearer ${token}` }
      );
      
      return {
        success: true,
        data: response.report || response.data || null,
        message: response.message || 'Test report fetched successfully',
      };
    } catch (error) {
      console.error('Error fetching test report:', error);
      return {
        success: false,
        message: error.message || 'Failed to fetch test report',
        data: null,
      };
    }
  },

  /**
   * Get upcoming tests count
   * @param {Object} httpHook - HTTP hook instance
   * @param {string} token - Authentication token
   * @returns {Promise<Object>} Response with count
   */
  getUpcomingTestsCount: async (httpHook, token) => {
    try {
      const response = await UserTestAPI.fetchUserTests(httpHook, token, {
        status: 'upcoming',
        page: 1,
        limit: 1
      });
      
      return {
        success: true,
        count: response.total || 0,
      };
    } catch (error) {
      console.error('Error fetching upcoming tests count:', error);
      return {
        success: false,
        count: 0,
      };
    }
  },

  /**
   * Get ongoing tests count
   * @param {Object} httpHook - HTTP hook instance
   * @param {string} token - Authentication token
   * @returns {Promise<Object>} Response with count
   */
  getOngoingTestsCount: async (httpHook, token) => {
    try {
      const response = await UserTestAPI.fetchUserTests(httpHook, token, {
        status: 'ongoing',
        page: 1,
        limit: 1
      });
      
      return {
        success: true,
        count: response.total || 0,
      };
    } catch (error) {
      console.error('Error fetching ongoing tests count:', error);
      return {
        success: false,
        count: 0,
      };
    }
  },
};