import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import UNlogo from "../assets/UNlogo.svg";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);

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

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <header className="bg-amber-50 shadow-md">
      <div className="w-full mx-auto px-2 sm:px-4 py-2 flex items-center flex-wrap relative">
        {/* Mobile Header */}
        <div className="md:hidden w-full flex items-center justify-between mb-2">
          {/* Hamburger menu */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md text-gray-700 hover:text-blue-500 focus:outline-none"
            aria-label="Menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Logo in center */}
          <Link to="/" className="flex items-center">
            <img src={UNlogo} width={120} alt="UrbanNest Logo" />
          </Link>

          {/* User menu */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="w-10 h-10 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors"
              aria-label="User menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-md shadow-xl z-40">
                <Link
                  to="/login"
                  className="block px-4 py-2 text-gray-800 hover:bg-blue-100 text-sm"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block px-4 py-2 text-gray-800 hover:bg-blue-100 text-sm"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  Sign Up
                </Link>
                <hr className="my-1 border-gray-200" />
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-800 hover:bg-blue-100 text-sm"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/orders"
                  className="block px-4 py-2 text-gray-800 hover:bg-blue-100 text-sm"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  My Orders
                </Link>
                <button
                  className="w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-100 text-sm"
                  onClick={() => {
                    console.log("Logging out");
                    setIsUserMenuOpen(false);
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Search */}
        <div className="w-full md:hidden mb-2">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full py-2 px-4 pr-10 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </form>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:flex w-full items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={UNlogo} width={180} alt="UrbanNest Logo" />
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-xl mx-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full py-2 px-4 pr-10 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </form>
          </div>

          {/* Desktop Nav */}
          <nav className="flex items-center space-x-5">
            <Link to="/" className="hover:text-blue-500">
              Home
            </Link>
            <Link to="/products" className="hover:text-blue-500">
              Products
            </Link>
            <Link to="/about" className="hover:text-blue-500">
              About
            </Link>
            <Link to="/contact" className="hover:text-blue-500">
              Contact
            </Link>
          </nav>

          {/* User menu */}
          <div className="relative ml-4" ref={userMenuRef}>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="w-10 h-10 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors"
              aria-label="User menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-md shadow-xl z-40">
                <Link to="/login" className="block px-4 py-2 hover:bg-blue-100">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block px-4 py-2 hover:bg-blue-100"
                >
                  Sign Up
                </Link>
                <hr className="my-1 border-gray-200" />
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-blue-100"
                >
                  Profile
                </Link>
                <Link
                  to="/orders"
                  className="block px-4 py-2 hover:bg-blue-100"
                >
                  My Orders
                </Link>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-blue-100"
                  onClick={() => {
                    console.log("Logging out");
                    setIsUserMenuOpen(false);
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="absolute top-full left-0 w-full bg-white shadow-lg z-30 md:hidden"
          >
            <nav className="px-4 py-2">
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/"
                    className="block py-2 hover:bg-blue-50 px-2 rounded"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products"
                    className="block py-2 hover:bg-blue-50 px-2 rounded"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="block py-2 hover:bg-blue-50 px-2 rounded"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="block py-2 hover:bg-blue-50 px-2 rounded"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
