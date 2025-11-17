// src/apis/auth/adminAuth.js
import { API_ENDPOINTS } from "../../Config/config";

export const adminAuthAPI = {
  // Admin Sign In
  signin: async (httpHook, credentials) => {
    try {
      const response = await httpHook.postReq(
        API_ENDPOINTS.ADMIN_SIGNIN,
        "",
        credentials
      );
      return response;
    } catch (error) {
      console.log("Admin signin error:", error);
      return {
        success: false,
        message: error.message || "Sign in failed",
      };
    }
  },
};

export const adminFacultyAPI = {
  // Add Faculty
  addFaculty: async (httpHook, facultyData, token) => {
    try {
      const response = await httpHook.postReq(
        API_ENDPOINTS.ADD_FACULTY,
        token,
        facultyData
      );
      return response;
    } catch (error) {
      console.log("Add faculty error:", error);
      return {
        success: false,
        message: error.message || "Failed to add faculty",
      };
    }
  },

  // Get All Faculties
  getAllFaculties: async (httpHook, token) => {
    try {
      const response = await httpHook.getReq(
        API_ENDPOINTS.GET_ALL_FACULTIES,
        token
      );
      return response;
    } catch (error) {
      console.log("Get all faculties error:", error);
      return {
        success: false,
        message: error.message || "Failed to get faculties",
      };
    }
  },

  // Update Faculty
  updateFaculty: async (httpHook, id, updateData, token) => {
    try {
      const response = await httpHook.patchReq(
        API_ENDPOINTS.UPDATE_FACULTY(id),
        token,
        updateData
      );
      return response;
    } catch (error) {
      console.log("Update faculty error:", error);
      return {
        success: false,
        message: error.message || "Failed to update faculty",
      };
    }
  },

  // Delete Faculty
  deleteFaculty: async (httpHook, id, token) => {
    try {
      const response = await httpHook.deleteReq(
        API_ENDPOINTS.DELETE_FACULTY(id),
        token
      );
      return response;
    } catch (error) {
      console.log("Delete faculty error:", error);
      return {
        success: false,
        message: error.message || "Failed to delete faculty",
      };
    }
  },
};