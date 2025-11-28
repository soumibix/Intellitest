// src/apis/admin/adminDashboard.js
import { API_ENDPOINTS } from "../../Config/config";

export const adminDashboardAPI = {
  // Get Test Counts (Stats Cards Data)
  getTestCounts: async (httpHook, token) => {
    try {
      const response = await httpHook.getReq(
        API_ENDPOINTS.ADMIN_TEST_COUNTS,
        token
      );
      return response;
    } catch (error) {
      console.log("Get test counts error:", error);
      return {
        success: false,
        message: error.message || "Failed to get test counts",
      };
    }
  },

  // Get Student Score Chart Data (Performance Chart)
  getStudentScoreChartData: async (httpHook, token, year = "2025") => {
    try {
      const response = await httpHook.getReq(
        `${API_ENDPOINTS.ADMIN_STUDENT_SCORE_CHART}?year=${year}`,
        token
      );
      return response;
    } catch (error) {
      console.log("Get student score chart data error:", error);
      return {
        success: false,
        message: error.message || "Failed to get chart data",
      };
    }
  },

  // Get Exam Date Wise Data (Calendar Exams) - REQUIRES year, month, and date
  getExamDateWise: async (httpHook, token, params = {}) => {
    try {
      // year, month, and date are REQUIRED
      if (!params.year || !params.month || !params.date) {
        console.error("year, month, and date are required parameters");
        return {
          success: false,
          message: "year, month, and date are required",
        };
      }

      // Build query string from params object
      const queryParams = new URLSearchParams();
      
      // Add required parameters
      queryParams.append('year', params.year);
      queryParams.append('month', params.month);
      queryParams.append('date', params.date);
      
      // Add optional parameters
      if (params.testCategory) queryParams.append('testCategory', params.testCategory);
      if (params.department) queryParams.append('department', params.department);
      if (params.semester) queryParams.append('semester', params.semester);

      const url = `${API_ENDPOINTS.ADMIN_EXAM_DATEWISE}?${queryParams.toString()}`;
      
      const response = await httpHook.getReq(url, token);
      return response;
    } catch (error) {
      console.log("Get exam date wise data error:", error);
      return {
        success: false,
        message: error.message || "Failed to get exam data",
      };
    }
  },

  // Get Exam Data for Specific Date - REQUIRES all three params
  getExamsByDate: async (httpHook, token, year, month, date) => {
    try {
      if (!year || !month || !date) {
        return {
          success: false,
          message: "year, month, and date are required",
        };
      }

      const params = { 
        year: year.toString(), 
        month: month.toString(), 
        date: date.toString() 
      };
      return await adminDashboardAPI.getExamDateWise(httpHook, token, params);
    } catch (error) {
      console.log("Get exams by date error:", error);
      return {
        success: false,
        message: error.message || "Failed to get exams",
      };
    }
  },

  // Get Exam Data for Month - Uses current date or first day of month
  getExamsForMonth: async (httpHook, token, year, month, date = null) => {
    try {
      if (!year || !month) {
        return {
          success: false,
          message: "year and month are required",
        };
      }

      // If no date provided, use current date or 1st of the month
      const finalDate = date || new Date().getDate();
      
      const params = { 
        year: year.toString(), 
        month: month.toString(), 
        date: finalDate.toString() 
      };
      
      return await adminDashboardAPI.getExamDateWise(httpHook, token, params);
    } catch (error) {
      console.log("Get exams for month error:", error);
      return {
        success: false,
        message: error.message || "Failed to get monthly exams",
      };
    }
  },

  // Get Filtered Exam Data - REQUIRES year, month, date
  getFilteredExams: async (httpHook, token, filters) => {
    try {
      if (!filters.year || !filters.month || !filters.date) {
        return {
          success: false,
          message: "year, month, and date are required",
        };
      }

      return await adminDashboardAPI.getExamDateWise(httpHook, token, filters);
    } catch (error) {
      console.log("Get filtered exams error:", error);
      return {
        success: false,
        message: error.message || "Failed to get filtered exams",
      };
    }
  },
};