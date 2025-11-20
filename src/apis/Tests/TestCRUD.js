// src/apis/Tests/TestCRUD.js
import { API_ENDPOINTS } from "../../Config/config";

export const TestAPI = {

  fetchTests: async (httpHook, token, queryParams = {}) => {
    try {
      // Build query string from params
      const params = new URLSearchParams();
      
      if (queryParams.page) params.append('page', queryParams.page);
      if (queryParams.limit) params.append('limit', queryParams.limit);
      if (queryParams.id) params.append('id', queryParams.id);
      if (queryParams.status) params.append('status', queryParams.status);
      if (queryParams.search) params.append('search', queryParams.search);
      
      const queryString = params.toString();
      const endpoint = queryString 
        ? `${API_ENDPOINTS.GET_TESTS}?${queryString}`
        : API_ENDPOINTS.GET_TESTS;
      
      const response = await httpHook.getReq(
        endpoint,
        'GET',
        null,
        { Authorization: `Bearer ${token}` }
      );
      
      // Handle both response structures
      // Response structure: { success: true, pagination: {...}, data: [...] }
      return {
        success: response.success !== false,
        data: response.data || [],
        pagination: response.pagination || {
          total: response.total || 0,
          page: response.page || 1,
          limit: response.limit || 10,
          totalPages: response.totalPages || 1,
        },
        // Keep backward compatibility
        total: response.pagination?.total || response.total || 0,
        page: response.pagination?.page || response.page || 1,
        limit: response.pagination?.limit || response.limit || 10,
      };
    } catch (error) {
      console.error('Error fetching tests:', error);
      return {
        success: false,
        message: error.message || 'Failed to fetch tests',
        data: [],
        pagination: {
          total: 0,
          page: 1,
          limit: 10,
          totalPages: 0,
        },
        total: 0,
        page: 1,
        limit: 10,
      };
    }
  },

  // Fetch single test by ID
  fetchTestById: async (httpHook, testId, token) => {
    try {
      const response = await httpHook.getReq(
        `${API_ENDPOINTS.GET_TESTS}?id=${testId}`,
        'GET',
        null,
        { Authorization: `Bearer ${token}` }
      );
      
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error('Error fetching test by ID:', error);
      return {
        success: false,
        message: error.message || 'Failed to fetch test',
        data: null,
      };
    }
  },

  // 1️⃣ Create Test Step #1 → Add Test Details
  addTest: async (httpHook, testData, token) => {
    try {
      const res = await httpHook.postReq(
        API_ENDPOINTS.TEST_ADD,
        token,
        testData
      );
      return res;
    } catch (err) {
      console.log("Add test error:", err);
      return { success: false, message: err.message };
    }
  },

  // 2️⃣ Schedule Test
  scheduleTest: async (httpHook, id, scheduleData, token) => {
    try {
      const res = await httpHook.postReq(
        API_ENDPOINTS.TEST_SCHEDULE(id),
        token,
        scheduleData
      );
      return res;
    } catch (err) {
      console.log("Schedule test error:", err);
      return { success: false, message: err.message };
    }
  },

  // 3️⃣ Upload File (Form Data)
  uploadFile: async (httpHook, formData, token) => {
    try {
      const res = await httpHook.postReq(
        API_ENDPOINTS.FILE_UPLOAD,
        token,
        formData,
        true // isFormData flag
      );
      return res;
    } catch (err) {
      console.log("File Upload error:", err);
      return { success: false, message: err.message };
    }
  },

  // 4️⃣ Generate Answer PDF
  generateAnswer: async (httpHook, id, body, token) => {
    try {
      const res = await httpHook.postReq(
        API_ENDPOINTS.GENERATE_ANSWER(id),
        token,
        body
      );
      return res;
    } catch (err) {
      console.log("Generate Answer error:", err);
      return { success: false, message: err.message };
    }
  },

  // 5️⃣ Save Question + Answer PDF URLs
  saveQA: async (httpHook, id, body, token) => {
    try {
      const res = await httpHook.postReq(
        API_ENDPOINTS.TEST_SAVE_QA(id),
        token,
        body
      );
      return res;
    } catch (err) {
      console.log("Save QA error:", err);
      return { success: false, message: err.message };
    }
  },

  // 6️⃣ Get Tests (Pagination + Filters)
  getTests: async (httpHook, token, queryParams = "") => {
    try {
      const url = queryParams
        ? `${API_ENDPOINTS.TEST_GET}?${queryParams}`
        : API_ENDPOINTS.TEST_GET;

      const res = await httpHook.getReq(url, token);
      return res;
    } catch (err) {
      console.log("Get tests error:", err);
      return { success: false, message: err.message };
    }
  },

  // 7️⃣ Get Test by ID
  getTestById: async (httpHook, id, token) => {
    try {
      const url = API_ENDPOINTS.TEST_GET_BY_ID(id);
      const res = await httpHook.getReq(url, token);
      return res;
    } catch (err) {
      console.log("Get test by ID error:", err);
      return { success: false, message: err.message };
    }
  },

  // 8️⃣ Update Test (Normal update - title, description, etc.)
  updateTest: async (httpHook, id, updateData, token) => {
    try {
      const res = await httpHook.patchReq(
        API_ENDPOINTS.TEST_UPDATE(id),
        token,
        updateData
      );
      return res;
    } catch (err) {
      console.log("Update test error:", err);
      return { success: false, message: err.message };
    }
  },

  // 9️⃣ Update Specific Question (answer, score, or both)
  updateQuestion: async (httpHook, testId, questionId, updateData, token) => {
    try {
      const res = await httpHook.patchReq(
        API_ENDPOINTS.TEST_UPDATE_QUESTION(testId, questionId),
        token,
        updateData
      );
      return res;
    } catch (err) {
      console.log("Update question error:", err);
      return { success: false, message: err.message };
    }
  },

  // 🔟 Delete Test
  deleteTest: async (httpHook, testId, token) => {
    try {
      const res = await httpHook.deleteReq(
        API_ENDPOINTS.TEST_DELETE(testId),
        token
      );
      return res;
    } catch (err) {
      console.log("Delete test error:", err);
      return { success: false, message: err.message };
    }
  },
};