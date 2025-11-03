import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaArrowRight,
  FaPhone,
} from "react-icons/fa";
import "../components/FloatingImages.css";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user types
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // Mobile validation (basic)
    if (formData.mobile.length < 10 || !/^\d+$/.test(formData.mobile)) {
      setError("Please enter a valid mobile number");
      return;
    }

    try {
      setLoading(true);
      // Create user data object (excluding confirmPassword)
      const userData = {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        password: formData.password,
      };

      // Send registration request to backend
      const response = await api.post("/auth/register", userData);

      console.log("Signup Response:", response.data);

      if (response.data?.success) {
        const { accessToken, user } = response.data.data;

        // Store tokens and user info in localStorage
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("userRole", user.role || "user");
        localStorage.setItem("userId", user._id);
        localStorage.setItem("userName", user.name);

        setLoading(false);
        // Redirect to home page after successful signup and auto-login
        navigate("/");
      } else {
        throw new Error(response.data?.message || "Registration failed");
      }
    } catch (error) {
      setLoading(false);
      setError(
        error?.response?.data?.message || error.message || "Registration failed. Please try again."
      );
      console.error("Signup Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {/* Background with overlay */}
      <div className="fixed inset-0 z-0 auth-background overflow-hidden">
        <div className="absolute inset-0">
          {/* Food emojis as decorative elements */}
          <span className="floating-element" style={{ top: '15%', left: '15%', fontSize: '7rem', animationDelay: '0s' }}>🍕</span>
          <span className="floating-element" style={{ top: '75%', left: '20%', fontSize: '6.5rem', animationDelay: '1.5s' }}>🍔</span>
          <span className="floating-element" style={{ top: '35%', right: '20%', fontSize: '7rem', animationDelay: '2.5s' }}>🍜</span>
          <span className="floating-element" style={{ top: '65%', right: '15%', fontSize: '6.5rem', animationDelay: '3.5s' }}>🍱</span>
          <span className="floating-element" style={{ top: '25%', left: '45%', fontSize: '7rem', animationDelay: '4s' }}>🥗</span>
          <span className="floating-element" style={{ bottom: '25%', right: '25%', fontSize: '7rem', animationDelay: '5s' }}>🍲</span>
          
          {/* Additional food emojis */}
          <span className="floating-element" style={{ top: '45%', left: '10%', fontSize: '6.5rem', animationDelay: '2s' }}>🌮</span>
          <span className="floating-element" style={{ top: '85%', right: '35%', fontSize: '7rem', animationDelay: '3s' }}>🥪</span>
          <span className="floating-element" style={{ top: '10%', right: '30%', fontSize: '6.5rem', animationDelay: '4.5s' }}>🍣</span>
          <span className="floating-element" style={{ top: '50%', right: '40%', fontSize: '7rem', animationDelay: '1s' }}>🥘</span>
          <span className="floating-element" style={{ top: '30%', left: '30%', fontSize: '6.5rem', animationDelay: '2.8s' }}>🍝</span>
          <span className="floating-element" style={{ bottom: '15%', left: '40%', fontSize: '7rem', animationDelay: '3.2s' }}>🥐</span>
          <span className="floating-element" style={{ top: '5%', left: '35%', fontSize: '6.5rem', animationDelay: '4.2s' }}>🍦</span>
          <span className="floating-element" style={{ bottom: '35%', right: '10%', fontSize: '6.5rem', animationDelay: '5.5s' }}>🍰</span>
        </div>
      </div>
      
      {/* Form Container */}
      <div className="bg-white shadow-xl rounded-2xl max-w-md w-full p-8 relative z-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Email */}
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

          {/* Mobile Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mobile Number
            </label>
            <div className="relative">
              <FaPhone className="absolute left-3 top-3 text-gray-400" />
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
                placeholder="1234567890"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                maxLength="10"
                pattern="[0-9]{10}"
              />
            </div>
          </div>

          {/* Password */}
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

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="********"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"
            } text-white font-bold py-3 rounded-lg transition duration-300 flex items-center justify-center`}
          >
            {loading ? (
              "Signing up..."
            ) : (
              <>
                Sign Up <FaArrowRight className="ml-2" />
              </>
            )}
          </button>
        </form>

        {/* Login Redirect */}
        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-red-600 hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
