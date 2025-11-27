// src/Hooks/useHttp.jsx
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useNotification } from "../Context/NotificationContext";
import { useAuth } from "../Context/AuthContext";
import { BASE_URL } from "../Config/config";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { showNotification } = useNotification();
  const { logout, role } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Clear all caches silently without affecting requests
  const clearAllCaches = () => {
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => {
          if (name.includes('intellitest')) {
            caches.delete(name);
          }
        });
      }).catch(() => {}); // Silent fail
    }
  };

  // Handle response
  const handleResponse = async (response) => {
    const isSuccessStatus = (response.status >= 200 && response.status < 300) || response.status === 304;
    
    if (isSuccessStatus) {
      if (response.status === 204) {
        return { success: true, message: "Operation successful" };
      }
      
      if (response.status === 304) {
        return { success: true, message: "Resource not modified" };
      }
      
      try {
        const data = await response.json();
        if (data.success === undefined) {
          data.success = true;
        }
        return data;
      } catch (parseError) {
        return { success: true, message: "Operation successful" };
      }
    }

    let message = `Request failed with status ${response.status}`;
    
    try {
      const errorData = await response.json();
      message = errorData?.message || errorData?.error || message;
    } catch (parseError) {
      switch (true) {
        case response.status >= 500:
          message = `Server error (${response.status}). Please try again later.`;
          break;
        case response.status >= 400:
          message = `Client error (${response.status}). Please check your request.`;
          break;
        default:
          message = `Unexpected error (${response.status}). Please try again.`;
      }
    }
    
    showNotification(message, "error");

    // Handle unauthorized access - Use AuthContext logout
    // if ([401, 403].includes(response.status)) {
    //   showNotification("Session expired. Please login again.", "error");
      
    //   logout();
      
    //   const path = location.pathname;
    //   let redirectPath = "/signin"; 
      
    //   if (path.includes("admin") || role === "superadmin") {
    //     redirectPath = "/admin/signin";
    //   } else if (path.includes("faculty") || role === "faculty") {
    //     redirectPath = "/faculty/signin";
    //   }
      
    //   setTimeout(() => {
    //     navigate(redirectPath, { replace: true });
    //   }, 100);
    // }

    return { success: false, message };
  };

  // Handle errors
  const handleError = (err) => {
    console.error('HTTP Request Error:', err);
    
    let errorMessage = "An unexpected error occurred.";
    
    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      errorMessage = "Network error. Please check your connection and try again.";
    } else if (err.message) {
      errorMessage = err.message;
    }

    showNotification(errorMessage, "error");
    return { success: false, message: errorMessage };
  };

  // GET request
  const getReq = async (url, token = "") => {
    setLoading(true);
    setError(null);
    
    setTimeout(clearAllCaches, 100);
    
    try {
      const fullUrl = `${BASE_URL}/${url}`;
      
      const headers = { 'Accept': 'application/json' };
      if (token) headers.Authorization = `Bearer ${token}`;

      console.log('usehttp token', token)
      
      const response = await fetch(fullUrl, {
        method: 'GET',
        credentials: 'include',
        headers: headers,
        cache: 'no-store'
      });
      
      return await handleResponse(response);
    } catch (err) {
      return handleError(err);
    } finally {
      setLoading(false);
    }
  };

  // POST request
  const postReq = async (url, token = "", data, isFormData = false) => {
    setLoading(true);
    setError(null);
    
    try {
      const fullUrl = `${BASE_URL}/${url}`;
      
      const headers = { 'Accept': 'application/json' };
      if (token) headers.Authorization = `Bearer ${token}`;

      let body;
      if (data) {
        if (isFormData) {
          body = data;
        } else {
          headers['Content-Type'] = 'application/json';
          body = JSON.stringify(data);
        }
      }
      
      const response = await fetch(fullUrl, {
        method: 'POST',
        credentials: 'include',
        headers: headers,
        body: body
      });
      
      const result = await handleResponse(response);
      
      if (result.success) {
        setTimeout(clearAllCaches, 200);
      }
      
      return result;
    } catch (err) {
      return handleError(err);
    } finally {
      setLoading(false);
    }
  };

  // PUT request
  const putReq = async (url, token = "", data, isFormData = false) => {
    setLoading(true);
    setError(null);
    
    try {
      const fullUrl = `${BASE_URL}/${url}`;
      
      const headers = { 'Accept': 'application/json' };
      if (token) headers.Authorization = `Bearer ${token}`;

      let body;
      if (data) {
        if (isFormData) {
          body = data;
        } else {
          headers['Content-Type'] = 'application/json';
          body = JSON.stringify(data);
        }
      }
      
      const response = await fetch(fullUrl, {
        method: 'PUT',
        credentials: 'include',
        headers: headers,
        body: body
      });
      
      const result = await handleResponse(response);
      
      if (result.success) {
        setTimeout(clearAllCaches, 200);
      }
      
      return result;
    } catch (err) {
      return handleError(err);
    } finally {
      setLoading(false);
    }
  };

  // PATCH request
  const patchReq = async (url, token = "", data, isFormData = false) => {
    setLoading(true);
    setError(null);
    
    try {
      const fullUrl = `${BASE_URL}/${url}`;
      
      const headers = { 'Accept': 'application/json' };
      if (token) headers.Authorization = `Bearer ${token}`;

      let body;
      if (data) {
        if (isFormData) {
          body = data;
        } else {
          headers['Content-Type'] = 'application/json';
          body = JSON.stringify(data);
        }
      }
      
      const response = await fetch(fullUrl, {
        method: 'PATCH',
        credentials: 'include',
        headers: headers,
        body: body
      });
      
      const result = await handleResponse(response);
      
      if (result.success) {
        setTimeout(clearAllCaches, 200);
      }
      
      return result;
    } catch (err) {
      return handleError(err);
    } finally {
      setLoading(false);
    }
  };

  // DELETE request
  const deleteReq = async (url, token = "", data = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const fullUrl = `${BASE_URL}/${url}`;
      
      const headers = { 'Accept': 'application/json' };
      if (token) headers.Authorization = `Bearer ${token}`;

      let body;
      if (data && Object.keys(data).length > 0) {
        headers['Content-Type'] = 'application/json';
        body = JSON.stringify(data);
      }
      
      const response = await fetch(fullUrl, {
        method: 'DELETE',
        credentials: 'include',
        headers: headers,
        body: body
      });
      
      const result = await handleResponse(response);
      
      if (result.success) {
        setTimeout(clearAllCaches, 200);
      }
      
      return result;
    } catch (err) {
      return handleError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    getReq,
    postReq,
    putReq,
    patchReq,
    deleteReq,
    loading,
    error,
    setError,
    baseURL: BASE_URL,
  };
};