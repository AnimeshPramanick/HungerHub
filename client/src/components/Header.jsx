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
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-8">
            <Link
              to={isAuthenticated ? "/home" : "/"}
              className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-amber-500 text-sm font-medium"
            >
              Home
            </Link>
            <Link
              to="/menu"
              className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium hover:border-b-2 hover:border-amber-500"
            >
              Menu
            </Link>
            <Link
              to="/about"
              className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium hover:border-b-2 hover:border-amber-500"
            >
              About
            </Link>
          </div>
          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full h-10 w-10 focus:outline-none transition duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm-4 7a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </button>

                {/* User dropdown menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      disabled={isLoading}
                    >
                      {isLoading ? "Logging out..." : "Sign out"}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/signup"
                className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-full text-sm font-medium transition duration-300"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden" ref={mobileMenuRef}>
            <div className="pt-2 pb-3 space-y-1">
              <Link
                to={isAuthenticated ? "/home" : "/"}
                className="bg-amber-50 border-amber-500 text-amber-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              >
                Home
              </Link>
              <Link
                to="/menu"
                className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-amber-300 hover:text-amber-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              >
                Menu
              </Link>
              <Link
                to="/about"
                className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-amber-300 hover:text-amber-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              >
                About
              </Link>

              {!isAuthenticated && (
                <Link
                  to="/signup"
                  className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-amber-300 hover:text-amber-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                >
                  Sign In
                </Link>
              )}

              {isAuthenticated && (
                <>
                  <Link
                    to="/profile"
                    className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-amber-300 hover:text-amber-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-amber-300 hover:text-amber-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                  >
                    Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-amber-300 hover:text-amber-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium w-full text-left"
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging out..." : "Sign out"}
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
