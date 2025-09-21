import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaShoppingCart,
  FaHeart,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaClipboardList,
  FaMapMarkerAlt,
  FaCog,
  FaQuestionCircle,
  FaAngleLeft,
} from "react-icons/fa";
import api from "../utils/api";

const ProfileDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Check if token exists
        const token = localStorage.getItem("accessToken");
        console.log("Token in ProfileDashboard:", token ? "exists" : "missing");

        const response = await api.get("/user/profile");
        console.log("Profile response:", response.data);

        if (response.data && response.data.success) {
          setUserProfile(response.data.data);
          console.log("User profile set:", response.data.data);
        } else {
          throw new Error("Failed to fetch user profile");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user profile:", error);

        // Set a more descriptive error message based on the error type
        if (error.response) {
          // The request was made and the server responded with a status code outside of 2xx
          console.error("Server response error:", error.response.data);
          setError(
            `Server error: ${
              error.response.data?.message ||
              error.response.statusText ||
              "Unknown error"
            }`
          );
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No server response:", error.request);
          setError("No response from server. Please check your connection.");
        } else {
          // Something happened in setting up the request
          console.error("Request setup error:", error.message);
          setError(error.message || "Failed to fetch user profile");
        }

        setLoading(false);

        // Redirect to login if unauthorized
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          console.log("Unauthorized, redirecting to login");
          localStorage.removeItem("accessToken");
          navigate("/login");
        }
      }
    };

    fetchUserProfile();
  }, [navigate]);

  // Generate initials from user's name
  const getInitials = (name) => {
    if (!name) return "U";

    const nameParts = name.split(" ");
    if (nameParts.length === 1) return nameParts[0][0].toUpperCase();

    return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      const response = await api.get("/user/logout");

      if (response.data && response.data.success) {
        // Clear any local storage or state
        localStorage.removeItem("accessToken");
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Sidebar menu items
  const sidebarItems = [
    { id: "profile", label: "My Profile", icon: <FaUser /> },
    { id: "orders", label: "My Orders", icon: <FaClipboardList /> },
    { id: "wishlist", label: "Wishlist", icon: <FaHeart /> },
    { id: "cart", label: "Shopping Cart", icon: <FaShoppingCart /> },
    { id: "addresses", label: "My Addresses", icon: <FaMapMarkerAlt /> },
    { id: "settings", label: "Account Settings", icon: <FaCog /> },
    { id: "help", label: "Help & Support", icon: <FaQuestionCircle /> },
  ];

  // Profile content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileContent userProfile={userProfile} />;
      case "orders":
        return <OrdersContent />;
      case "wishlist":
        return <WishlistContent />;
      case "cart":
        return <CartContent />;
      case "addresses":
        return <AddressesContent />;
      case "settings":
        return <SettingsContent />;
      case "help":
        return <HelpContent />;
      default:
        return <ProfileContent userProfile={userProfile} />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-red-500 text-lg font-semibold mb-4">
          {error === "Failed to fetch user profile"
            ? "Unable to load your profile. Please log in again."
            : error}
        </div>
        <button
          onClick={() => navigate("/login")}
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        >
          Back to Login
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile Sidebar Toggle */}
      <div className="fixed top-4 left-4 z-30 md:hidden">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-full bg-orange-500 text-white shadow-lg"
        >
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed md:static h-full z-20 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "left-0" : "-left-72"
        } md:left-0 w-72 bg-white shadow-xl flex flex-col`}
      >
        {/* Collapse button for large screens */}
        <div className="hidden md:block absolute -right-4 top-10">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-full bg-white text-orange-500 shadow-md"
          >
            <FaAngleLeft
              className={`transform transition-transform ${
                !isSidebarOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* User Profile Summary */}
        <div className="p-5 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="relative">
              {userProfile?.avatar ? (
                <img
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  className="h-14 w-14 rounded-full object-cover border-2 border-orange-500"
                />
              ) : (
                <div className="h-14 w-14 rounded-full bg-orange-500 text-white flex items-center justify-center text-lg font-bold">
                  {getInitials(userProfile?.name)}
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-gray-800">
                {userProfile?.name || "User"}
              </span>
              <span className="text-sm text-gray-500">
                {userProfile?.email || ""}
              </span>
            </div>
          </div>
        </div>

        {/* Sidebar Menu */}
        <div className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-1">
            {sidebarItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center w-full px-4 py-3 rounded-lg hover:bg-orange-50 transition-colors ${
                    activeTab === item.id
                      ? "bg-orange-100 text-orange-600 font-medium"
                      : "text-gray-700"
                  }`}
                >
                  <span className="text-lg mr-3">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
          >
            <FaSignOutAlt className="mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 p-4 md:p-8 transition-all duration-300 ${
          isSidebarOpen ? "md:ml-0" : "md:ml-0"
        }`}
      >
        <div className="bg-white rounded-lg shadow-md p-5 min-h-full">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

// Profile Content Component
const ProfileContent = ({ userProfile }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">My Profile</h2>
      {userProfile ? (
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="flex flex-col items-center md:items-start mb-6">
              {userProfile.avatar ? (
                <img
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  className="h-32 w-32 rounded-full object-cover border-4 border-orange-200"
                />
              ) : (
                <div className="h-32 w-32 rounded-full bg-orange-500 text-white flex items-center justify-center text-3xl font-bold">
                  {userProfile.name
                    ? userProfile.name.charAt(0).toUpperCase()
                    : "U"}
                </div>
              )}
              <div className="mt-4 text-center md:text-left">
                <h3 className="text-xl font-semibold text-gray-800">
                  {userProfile.name}
                </h3>
                <p className="text-gray-500">{userProfile.email}</p>
                {userProfile.mobile && (
                  <p className="text-gray-500">{userProfile.mobile}</p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-700">Account Status</h4>
              <div className="flex items-center mt-2">
                <span
                  className={`h-3 w-3 rounded-full mr-2 ${
                    userProfile.status === "active"
                      ? "bg-green-500"
                      : userProfile.status === "inactive"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                ></span>
                <span className="capitalize">{userProfile.status}</span>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-700">Email Verification</h4>
              <div className="flex items-center mt-2">
                <span
                  className={`h-3 w-3 rounded-full mr-2 ${
                    userProfile.verify_email ? "bg-green-500" : "bg-yellow-500"
                  }`}
                ></span>
                <span>
                  {userProfile.verify_email ? "Verified" : "Not Verified"}
                </span>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-700">Account Type</h4>
              <div className="mt-2">
                <span className="capitalize">{userProfile.role || "User"}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>No profile information available.</p>
      )}
    </div>
  );
};

// Orders Content Component
const OrdersContent = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">My Orders</h2>
      <p className="text-gray-500">You have no orders yet.</p>
    </div>
  );
};

// Wishlist Content Component
const WishlistContent = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">My Wishlist</h2>
      <p className="text-gray-500">Your wishlist is empty.</p>
    </div>
  );
};

// Cart Content Component
const CartContent = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Shopping Cart
      </h2>
      <p className="text-gray-500">Your cart is empty.</p>
    </div>
  );
};

// Addresses Content Component
const AddressesContent = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        My Addresses
      </h2>
      <p className="text-gray-500">You have no saved addresses.</p>
    </div>
  );
};

// Settings Content Component
const SettingsContent = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Account Settings
      </h2>
      <div className="space-y-6">
        <div className="bg-gray-50 p-5 rounded-lg">
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Profile Information
          </h3>
          <form>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 focus:outline-none"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>

        <div className="bg-gray-50 p-5 rounded-lg">
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Change Password
          </h3>
          <form>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  placeholder="Enter current password"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 focus:outline-none"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Help Content Component
const HelpContent = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Help & Support
      </h2>
      <div className="space-y-4">
        <div className="bg-gray-50 p-5 rounded-lg">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Contact Us</h3>
          <p className="text-gray-600">
            If you have any questions or need assistance, please contact our
            customer support team.
          </p>
          <div className="mt-3">
            <div className="flex items-center">
              <span className="font-medium mr-2">Email:</span>
              <a
                href="mailto:support@hungerhub.com"
                className="text-orange-500"
              >
                support@hungerhub.com
              </a>
            </div>
            <div className="flex items-center mt-1">
              <span className="font-medium mr-2">Phone:</span>
              <a href="tel:+1234567890" className="text-orange-500">
                +123 456 7890
              </a>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-5 rounded-lg">
          <h3 className="text-lg font-medium text-gray-700 mb-2">FAQs</h3>
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-gray-700">
                How do I track my order?
              </h4>
              <p className="text-gray-600 text-sm">
                You can track your order from the My Orders section in your
                dashboard.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700">
                How can I change my delivery address?
              </h4>
              <p className="text-gray-600 text-sm">
                You can update your delivery address from the My Addresses
                section.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700">
                What payment methods are accepted?
              </h4>
              <p className="text-gray-600 text-sm">
                We accept credit/debit cards, digital wallets, and cash on
                delivery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
