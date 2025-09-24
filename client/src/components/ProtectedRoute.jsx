import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import api from "../utils/api";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        if (!token) {
          setLoading(false);
          setIsAuthenticated(false);
          return;
        }

        // Verify token and get user profile
        const response = await api.get("/user/profile");

        if (response.data?.success) {
          const userData = response.data.data;
          setIsAuthenticated(true);
          setUserRole(userData.role);

          // Store role in localStorage for quick access
          localStorage.setItem("userRole", userData.role);
          localStorage.setItem("userId", userData._id);
          localStorage.setItem("userName", userData.name);
        } else {
          throw new Error("Failed to fetch user profile");
        }
      } catch (error) {
        console.error("Auth check failed:", error);

        // Token is invalid or expired, clear storage
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userRole");
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");

        setIsAuthenticated(false);
        setError("Authentication failed");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{
          from: location,
          message: "Please log in to access this page.",
        }}
        replace
      />
    );
  }

  // If admin-only route but user is not admin, redirect to login with error
  if (adminOnly && userRole !== "admin") {
    // Clear storage since non-admin tried to access admin route
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");

    return (
      <Navigate
        to="/login"
        state={{
          message:
            "Access denied. Admin privileges required. Please log in with admin credentials.",
          type: "error",
          from: location,
        }}
        replace
      />
    );
  }

  // User is authenticated and has proper permissions
  return children;
};

export default ProtectedRoute;
