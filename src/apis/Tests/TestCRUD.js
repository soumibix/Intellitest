// src/apis/test/TestCRUD.js
import { API_ENDPOINTS } from "../../Config/config";

export const TestAPI = {
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
        formData, true
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

  // 8️⃣ Update Test
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

  // 9️⃣ Update Score of One Question
  updateQuestionScore: async (httpHook, testId, questionId, body, token) => {
    try {
      const res = await httpHook.patchReq(
        API_ENDPOINTS.TEST_UPDATE_SCORE(testId, questionId),
        token,
        body
      );
      return res;
    } catch (err) {
      console.log("Update question score error:", err);
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
