import React from "react";
import {
  FaInstagram,
  FaFacebook,
  FaGoogle,
  FaTwitter,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import UNlogo from "../assets/UNlogo.svg";

const Footer = () => {
  return (
    <footer className="bg-amber-50 border-t mt-auto">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-8">
          {/* Brand Column */}
          <div className="flex flex-col">
            <div className="flex items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">UrbanNest</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Your one-stop destination for premium home decor and furnishings.
              We bring elegance and comfort to every home.
            </p>
            <div className="flex space-x-4 mt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-pink-600 text-xl"
              >
                <FaInstagram />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 text-xl"
              >
                <FaFacebook />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-400 text-xl"
              >
                <FaTwitter />
              </a>
              <a
                href="mailto:info@urbannest.com"
                className="text-gray-600 hover:text-red-600 text-xl"
              >
                <FaGoogle />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-blue-500 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-gray-600 hover:text-blue-500 transition-colors"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-600 hover:text-blue-500 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-600 hover:text-blue-500 transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-gray-600 hover:text-blue-500 transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Categories
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/category/furniture"
                  className="text-gray-600 hover:text-blue-500 transition-colors"
                >
                  Furniture
                </Link>
              </li>
              <li>
                <Link
                  to="/category/decor"
                  className="text-gray-600 hover:text-blue-500 transition-colors"
                >
                  Home Decor
                </Link>
              </li>
              <li>
                <Link
                  to="/category/lighting"
                  className="text-gray-600 hover:text-blue-500 transition-colors"
                >
                  Lighting
                </Link>
              </li>
              <li>
                <Link
                  to="/category/kitchen"
                  className="text-gray-600 hover:text-blue-500 transition-colors"
                >
                  Kitchen
                </Link>
              </li>
              <li>
                <Link
                  to="/category/outdoor"
                  className="text-gray-600 hover:text-blue-500 transition-colors"
                >
                  Outdoor
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-2 text-blue-500" />
                <span className="text-gray-600">
                  123 Decor Street, Design District, City, 12345
                </span>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-2 text-blue-500" />
                <span className="text-gray-600">+1 (123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-2 text-blue-500" />
                <span className="text-gray-600">info@urbannest.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-600">
            <p className="text-sm mb-2 md:mb-0">
              &copy; {new Date().getFullYear()} UrbanNest. All rights reserved.
            </p>
            <div className="flex space-x-4 text-sm">
              <Link to="/privacy" className="hover:text-blue-500">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-blue-500">
                Terms of Service
              </Link>
              <Link to="/shipping" className="hover:text-blue-500">
                Shipping Info
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
