import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTruck } from "react-icons/fa";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem("accessToken");
    return !!token;
  });
  const [isLoading, setIsLoading] = useState(false);
  const userMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Check authentication state
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("accessToken");
      setIsAuthenticated(!!token);
    };

    checkAuth();
    const authCheckInterval = setInterval(checkAuth, 2000);
    return () => clearInterval(authCheckInterval);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Logout
  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("accessToken");

      if (token) {
        try {
          await axios.post(
            "http://localhost:5000/api/auth/logout",
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              withCredentials: true,
            }
          );
        } catch (apiError) {
          console.error("API logout error:", apiError);
        }
      }

      localStorage.removeItem("accessToken");
      setIsAuthenticated(false);
      setIsUserMenuOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      navigate("/");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <FaTruck className="text-amber-600 text-2xl" />
              <span className="ml-2 text-2xl font-black text-gray-900">
                HungerHub
              </span>
            </div>
          </div>
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-8">
            <a
              href="#"
              className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-amber-500 text-sm font-medium"
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium"
            >
              Menu
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium"
            >
              How It Works
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium"
            >
              Cities
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium"
            >
              About
            </a>
          </div>
          <div className="flex items-center">
            <button className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-full text-sm font-medium transition duration-300">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
