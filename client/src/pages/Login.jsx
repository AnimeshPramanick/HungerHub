import React, { useState, useEffect } from "react";
import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import api from "../utils/api";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check for messages from protected routes and existing authentication
  useEffect(() => {
    // Check if user is already authenticated
    const checkExistingAuth = async () => {
      const token = localStorage.getItem("accessToken");

      if (token) {
        try {
          const response = await api.get("/user/profile");

          if (response.data?.success) {
            const userData = response.data.data;

            // User is already authenticated, redirect based on role
            if (userData.role === "admin") {
              navigate("/admin", { replace: true });
            } else {
              navigate("/profile", { replace: true });
            }
            return;
          }
        } catch (error) {
          // Token is invalid, clear it
          localStorage.removeItem("accessToken");
          localStorage.removeItem("userRole");
          localStorage.removeItem("userId");
          localStorage.removeItem("userName");
        }
      }

      // Set error message if coming from protected route
      if (location.state?.message) {
        setError(location.state.message);
      }
    };

    checkExistingAuth();
  }, [location.state, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user types
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);

      const response = await api.post("/auth/login", formData);

      console.log("Login Response:", response.data);

      if (response.data?.success) {
        const { accessToken, user } = response.data.data;

        // Store tokens and user info in localStorage
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("userRole", user.role);
        localStorage.setItem("userId", user._id);
        localStorage.setItem("userName", user.name);

        console.log("Login successful, user role:", user.role);

        // Determine redirect destination
        const from = location.state?.from?.pathname;
        let redirectTo = "/profile"; // Default redirect

        if (user.role === "admin") {
          // Admin user - redirect to admin dashboard or requested admin page
          redirectTo = from && from.startsWith("/admin") ? from : "/admin";
        } else if (from && !from.startsWith("/admin")) {
          // Regular user trying to access non-admin protected route
          redirectTo = from;
        }
        // If regular user tried to access admin route, redirect to profile

        setLoading(false);
        navigate(redirectTo, { replace: true });
      } else {
        throw new Error(response.data?.message || "Login failed");
      }
    } catch (err) {
      setLoading(false);
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
      console.error("Login Error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-yellow-300 flex items-center justify-center px-4">
      <div className="bg-white shadow-2xl rounded-2xl max-w-md w-full p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="example@email.com"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="********"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Error Message */}
          {error && (
            <div
              className={`border px-4 py-3 rounded relative ${
                location.state?.type === "error"
                  ? "bg-red-100 border-red-400 text-red-700"
                  : "bg-red-100 border-red-400 text-red-700"
              }`}
              role="alert"
            >
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"
            } text-white font-bold py-3 rounded-lg transition duration-300 flex items-center justify-center`}
          >
            {loading ? (
              "Logging in..."
            ) : (
              <>
                Login <FaSignInAlt className="ml-2" />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-red-600 hover:underline font-medium"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
