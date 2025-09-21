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
  FaEnvelope,
  FaPhone,
  FaCheckCircle,
  FaUserShield,
  FaSave,
  FaEye,
  FaLock,
  FaKey,
  FaSearch,
  FaDownload,
} from "react-icons/fa";
import api from "../utils/api";

// Main Dashboard Component
const ProfileDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    return window.innerWidth >= 768;
  });
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
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
        if (error.response) {
          console.error("Server response error:", error.response.data);
          setError(
            `Server error: ${
              error.response.data?.message ||
              error.response.statusText ||
              "Unknown error"
            }`
          );
        } else if (error.request) {
          console.error("No server response:", error.request);
          setError("No response from server. Please check your connection.");
        } else {
          console.error("Request setup error:", error.message);
          setError(error.message || "Failed to fetch user profile");
        }
        setLoading(false);
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

  const getInitials = (name) => {
    if (!name) return "U";
    const nameParts = name.split(" ");
    if (nameParts.length === 1) return nameParts[0][0].toUpperCase();
    return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
  };

  const handleLogout = async () => {
    try {
      const response = await api.get("/user/logout");
      if (response.data && response.data.success) {
        localStorage.removeItem("accessToken");
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const sidebarItems = [
    { id: "profile", label: "My Profile", icon: <FaUser /> },
    { id: "orders", label: "My Orders", icon: <FaClipboardList /> },
    { id: "wishlist", label: "Wishlist", icon: <FaHeart /> },
    { id: "cart", label: "Shopping Cart", icon: <FaShoppingCart /> },
    { id: "addresses", label: "My Addresses", icon: <FaMapMarkerAlt /> },
    { id: "settings", label: "Account Settings", icon: <FaCog /> },
    { id: "help", label: "Help & Support", icon: <FaQuestionCircle /> },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full">
          <div className="text-center mb-6">
            <div className="bg-red-100 inline-block p-3 rounded-full mb-4">
              <FaTimes className="text-red-500 text-3xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Profile Error
            </h2>
            <p className="text-red-500 text-lg mb-4">
              {error === "Failed to fetch user profile"
                ? "Unable to load your profile. Please log in again."
                : error}
            </p>
          </div>
          <button
            onClick={() => navigate("/login")}
            className="w-full py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium flex items-center justify-center"
          >
            <FaSignOutAlt className="mr-2" /> Back to Login
          </button>
        </div>
      </div>
    );
  }

  // --- BEGIN NEW LAYOUT CODE ---
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* HEADER: Moved to be a direct child of the main container */}
      <header className="fixed top-0 left-0 w-full bg-white shadow-md z-30 flex items-center justify-between p-4 md:px-8">
        <div className="flex items-center">
          {/* Mobile toggle button */}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-full text-orange-500 bg-gray-100 md:hidden mr-2"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
          <div className="flex items-center">
            <div className="text-2xl font-bold text-orange-500">HungerHub</div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {/* Desktop user profile summary in header */}
          <div className="hidden md:flex items-center space-x-2">
            <span className="font-medium text-gray-800">
              {userProfile?.name || "User"}
            </span>
            <div className="h-8 w-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm font-bold">
              {getInitials(userProfile?.name)}
            </div>
          </div>
          {/* ... Other header content like notifications, cart icon, etc. */}
        </div>
      </header>

      {/* Main content area that contains the sticky sidebar and scrollable content */}
      <div className="flex flex-1 relative mt-[64px] md:mt-0">
        {" "}
        {/* Adjust mt-[64px] to match your header height */}
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && window.innerWidth < 768 && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
            onClick={toggleSidebar}
          ></div>
        )}
        {/* Sidebar Component */}
        <aside
          className={`flex flex-col flex-shrink-0 transition-all duration-300 ease-in-out ${
            isSidebarOpen ? "w-80" : "w-20" // Changed from w-24 to w-20 for better icon-only view
          } bg-white shadow-md z-20 md:sticky md:top-[64px] md:h-screen relative`} // Changed from gradient to solid white for cleaner look
          style={{ top: "64px" }} // Position just below the fixed header
        >
          {/* Desktop Sidebar Toggle Button - only visible on desktop */}
          <button
            onClick={toggleSidebar}
            className="hidden md:flex absolute -right-3 top-20 p-1.5 rounded-full bg-white text-orange-500 shadow-md hover:shadow-lg border border-gray-100 transition-all duration-200"
            title={isSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
          >
            <div className="bg-orange-50 rounded-full p-0.5">
              <FaAngleLeft
                className={`transform transition-transform ${
                  !isSidebarOpen ? "rotate-180" : ""
                }`}
                size={14}
              />
            </div>
          </button>
          {/* User Profile Summary - Desktop */}
          <div
            className={`py-6 px-3 border-b border-gray-200 bg-white ${
              window.innerWidth < 768 ? "block" : "hidden md:block"
            }`}
          >
            <div
              className={`flex ${
                isSidebarOpen ? "items-center space-x-4" : "justify-center"
              }`}
            >
              <div className="relative group">
                {userProfile?.avatar ? (
                  <div className="relative">
                    <img
                      src={userProfile.avatar}
                      alt={userProfile.name}
                      className={`rounded-full object-cover border-2 border-orange-500 transition-transform duration-300 group-hover:scale-105 ${
                        isSidebarOpen ? "h-16 w-16" : "h-11 w-11"
                      }`}
                    />
                    {isSidebarOpen && (
                      <div className="absolute bottom-0 right-0 bg-orange-500 p-1.5 rounded-full shadow-sm">
                        <FaUser className="text-white" size={8} />
                      </div>
                    )}
                  </div>
                ) : (
                  <div
                    className={`rounded-full bg-orange-500 text-white flex items-center justify-center font-bold transition-transform duration-300 group-hover:scale-105 ${
                      isSidebarOpen
                        ? "h-16 w-16 text-xl"
                        : "h-11 w-11 text-base"
                    }`}
                  >
                    {getInitials(userProfile?.name)}
                  </div>
                )}
                {/* Status indicator for collapsed state */}
                {!isSidebarOpen && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div
                className={`flex flex-col transition-all duration-300 ${
                  isSidebarOpen
                    ? "opacity-100 max-w-xs"
                    : "opacity-0 max-w-0 overflow-hidden"
                }`}
              >
                <span className="font-bold text-gray-800 text-lg">
                  {userProfile?.name || "User"}
                </span>
                <span className="text-sm text-gray-500">
                  {userProfile?.email || ""}
                </span>
                <span className="mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-1.5"></span>
                  Online
                </span>
              </div>
            </div>
          </div>

          {/* Sidebar Menu */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 py-4 px-3 overflow-y-auto custom-scrollbar">
              <div className={isSidebarOpen ? "px-2 mb-4" : "px-0 mb-4"}>
                {isSidebarOpen && (
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2 pl-2">
                    Main Menu
                  </p>
                )}
                <ul className="space-y-3">
                  {sidebarItems.map((item) => (
                    <li key={item.id} className="relative">
                      <button
                        onClick={() => setActiveTab(item.id)}
                        className={`flex relative ${
                          isSidebarOpen
                            ? "items-center justify-start"
                            : "items-center justify-center"
                        } w-full h-12 transition-all duration-200 ${
                          activeTab === item.id
                            ? isSidebarOpen
                              ? "bg-orange-100 text-orange-600 font-medium rounded-lg shadow-sm"
                              : "text-orange-600 font-medium"
                            : "text-gray-600 hover:text-gray-800"
                        } group`}
                        title={!isSidebarOpen ? item.label : ""}
                      >
                        {/* Tooltip for collapsed sidebar - only shows on hover when sidebar is collapsed */}
                        {!isSidebarOpen && (
                          <div className="absolute left-full ml-2 rounded bg-gray-800 text-white text-xs py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                            {item.label}
                          </div>
                        )}
                        {/* Active indicator - vertical bar for expanded, left border for collapsed */}
                        {activeTab === item.id && (
                          <>
                            {isSidebarOpen ? (
                              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-orange-500 rounded-r-md"></div>
                            ) : (
                              <div className="absolute left-0 top-0 w-1 h-full bg-orange-500 rounded-r-md"></div>
                            )}
                          </>
                        )}
                        <div
                          className={`flex items-center justify-center ${
                            !isSidebarOpen ? "w-full" : ""
                          }`}
                        >
                          <span
                            className={`text-xl transition-all duration-300 ${
                              isSidebarOpen ? "mr-3 ml-3" : ""
                            }`}
                          >
                            {item.icon}
                          </span>
                          <span
                            className={`transition-all duration-300 ${
                              isSidebarOpen
                                ? "opacity-100 max-w-xs"
                                : "opacity-0 max-w-0 overflow-hidden"
                            }`}
                          >
                            {item.label}
                          </span>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <div className="py-3 mt-auto border-t border-gray-200 bg-white">
            <button
              onClick={handleLogout}
              className={`flex ${
                isSidebarOpen ? "items-center px-7 py-3" : "justify-center py-3"
              } w-full text-gray-600 hover:text-red-600 transition-colors group`}
              title={!isSidebarOpen ? "Logout" : ""}
            >
              <div className="relative">
                <FaSignOutAlt
                  className="transition-transform group-hover:scale-110"
                  size={20}
                />
                {/* Tooltip for collapsed logout */}
                {!isSidebarOpen && (
                  <div className="absolute left-full ml-2 rounded bg-gray-800 text-white text-xs py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                    Logout
                  </div>
                )}
              </div>
              <span
                className={`transition-all duration-300 ml-3 ${
                  isSidebarOpen
                    ? "opacity-100 max-w-xs"
                    : "opacity-0 max-w-0 overflow-hidden"
                }`}
              >
                Logout
              </span>
            </button>
          </div>
        </aside>
        {/* Main Content Area */}
        <main
          className={`flex-1 p-4 md:p-8 overflow-y-auto ${
            isSidebarOpen ? "md:ml-80" : "md:ml-20"
          } transition-all duration-300 ease-in-out`}
        >
          <div className="bg-white rounded-lg shadow-md p-5 md:p-8 min-h-[calc(100vh-160px)]">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
  // --- END NEW LAYOUT CODE ---
};

// --- CONTENT COMPONENTS (NO CHANGES NEEDED HERE) ---
const ProfileContent = ({ userProfile }) => {
  // Your existing ProfileContent component
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">My Profile</h2>
      {userProfile ? (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-xl shadow-sm">
            <div className="flex flex-col items-center md:items-start">
              {userProfile.avatar ? (
                <div className="relative mb-5">
                  <img
                    src={userProfile.avatar}
                    alt={userProfile.name}
                    className="h-36 w-36 rounded-full object-cover border-4 border-white shadow-md"
                  />
                  <div className="absolute bottom-0 right-0 bg-orange-500 text-white p-2 rounded-full shadow-md">
                    <FaUser size={14} />
                  </div>
                </div>
              ) : (
                <div className="h-36 w-36 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white flex items-center justify-center text-4xl font-bold shadow-md mb-5">
                  {userProfile.name
                    ? userProfile.name.charAt(0).toUpperCase()
                    : "U"}
                </div>
              )}
              <div className="mt-2 text-center md:text-left">
                <h3 className="text-2xl font-bold text-gray-800 mb-1">
                  {userProfile.name}
                </h3>
                <p className="text-gray-500 flex items-center mb-1">
                  <FaEnvelope className="inline mr-2" size={14} />
                  {userProfile.email}
                </p>
                {userProfile.mobile && (
                  <p className="text-gray-500 flex items-center">
                    <FaPhone className="inline mr-2" size={14} />
                    {userProfile.mobile}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
              <h4 className="font-medium text-gray-700 flex items-center mb-3">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <FaCheckCircle className="text-green-600" />
                </div>
                Account Status
              </h4>
              <div className="flex items-center ml-12">
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
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
              <h4 className="font-medium text-gray-700 flex items-center mb-3">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <FaEnvelope className="text-blue-600" />
                </div>
                Email Verification
              </h4>
              <div className="flex items-center ml-12">
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
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
              <h4 className="font-medium text-gray-700 flex items-center mb-3">
                <div className="bg-purple-100 p-2 rounded-full mr-3">
                  <FaUserShield className="text-purple-600" />
                </div>
                Account Type
              </h4>
              <div className="flex items-center ml-12">
                <span className="capitalize font-medium">
                  {userProfile.role || "User"}
                </span>
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

const OrdersContent = () => {
  // Your existing OrdersContent component
  const orders = [
    {
      id: "ORD-12345",
      date: "Oct 15, 2023",
      total: 24.99,
      status: "Delivered",
      items: [
        { name: "Chicken Burger", quantity: 1, price: 12.99 },
        { name: "French Fries", quantity: 1, price: 4.99 },
        { name: "Soft Drink", quantity: 1, price: 2.49 },
      ],
      deliveryAddress: "123 Main St, Apt 4B, New York, NY 10001",
    },
    {
      id: "ORD-12346",
      date: "Oct 10, 2023",
      total: 31.98,
      status: "Delivered",
      items: [
        { name: "Veggie Pizza", quantity: 1, price: 14.99 },
        { name: "Chicken Wings", quantity: 1, price: 9.99 },
        { name: "Garlic Bread", quantity: 1, price: 3.99 },
        { name: "Cola", quantity: 1, price: 1.99 },
      ],
      deliveryAddress: "123 Main St, Apt 4B, New York, NY 10001",
    },
  ];

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "Processing":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
        <FaClipboardList className="mr-3 text-orange-500" /> My Orders
      </h2>
      {orders.length > 0 ? (
        <div className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search orders..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            <div className="flex space-x-2">
              <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500">
                <option value="">Filter by Status</option>
                <option value="delivered">Delivered</option>
                <option value="processing">Processing</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500">
                <option value="">Sort by</option>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="highest">Highest Amount</option>
                <option value="lowest">Lowest Amount</option>
              </select>
            </div>
          </div>
          {orders.map((order, index) => (
            <div
              key={order.id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md"
            >
              <div className="p-4 bg-gray-50 border-b border-gray-200 flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <h3 className="font-medium text-gray-800">{order.id}</h3>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Order Date</p>
                  <p className="font-medium">{order.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="font-medium">${order.total.toFixed(2)}</p>
                </div>
                <div>
                  <span
                    className={`px-3 py-1 rounded-full border ${getStatusBadgeClass(
                      order.status
                    )} text-sm font-medium`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
              <div className="p-4 border-b border-gray-200">
                <h4 className="font-medium text-gray-700 mb-2">Order Items</h4>
                <ul className="divide-y divide-gray-100">
                  {order.items.map((item, i) => (
                    <li key={i} className="py-2 flex justify-between">
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <span className="font-medium">
                        ${item.price.toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 bg-gray-50">
                <h4 className="font-medium text-gray-700 mb-2">
                  Delivery Address
                </h4>
                <p className="text-gray-600">{order.deliveryAddress}</p>
              </div>
              <div className="p-4 flex flex-col sm:flex-row justify-between items-center border-t border-gray-200 gap-3">
                <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
                    <FaDownload className="mr-2" /> Invoice
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
                    <FaQuestionCircle className="mr-2" /> Help
                  </button>
                </div>
                <button className="w-full sm:w-auto px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                  Reorder
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-8 text-center">
          <div className="bg-blue-50 p-4 inline-block rounded-full mb-4">
            <FaClipboardList className="text-blue-500 text-4xl" />
          </div>
          <h3 className="text-xl font-medium text-gray-700 mb-2">
            No Orders Yet
          </h3>
          <p className="text-gray-500 mb-4">
            You haven't placed any orders yet.
          </p>
          <a
            href="/menu"
            className="inline-block px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Browse Menu
          </a>
        </div>
      )}
    </div>
  );
};

const WishlistContent = () => {
  // Your existing WishlistContent component
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">My Wishlist</h2>
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-8 text-center">
        <div className="bg-pink-50 p-4 inline-block rounded-full mb-4">
          <FaHeart className="text-pink-500 text-4xl" />
        </div>
        <h3 className="text-xl font-medium text-gray-700 mb-2">
          Wishlist Empty
        </h3>
        <p className="text-gray-500 mb-4">
          Your wishlist is currently empty. Add items you like to your wishlist.
        </p>
        <a
          href="/menu"
          className="inline-block px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          Explore Menu
        </a>
      </div>
    </div>
  );
};

const CartContent = () => {
  // Your existing CartContent component
  const cartItems = [
    {
      id: 1,
      name: "Double Cheese Burger",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=200&q=80",
      price: 14.99,
      quantity: 1,
      description:
        "Two beef patties with melted cheese, lettuce, tomato, and special sauce",
    },
    {
      id: 2,
      name: "Chicken Tikka Pizza",
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=200&q=80",
      price: 18.99,
      quantity: 1,
      description:
        "Traditional pizza topped with spicy chicken tikka pieces and vegetables",
    },
    {
      id: 3,
      name: "Chocolate Brownie Sundae",
      image:
        "https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=200&q=80",
      price: 8.99,
      quantity: 1,
      description:
        "Warm chocolate brownie topped with vanilla ice cream and chocolate sauce",
    },
  ];

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.08;
  const deliveryFee = 2.99;
  const total = subtotal + tax + deliveryFee;

  const increaseQuantity = (id) => {
    console.log(`Increase quantity for item ${id}`);
  };

  const decreaseQuantity = (id) => {
    console.log(`Decrease quantity for item ${id}`);
  };

  const removeItem = (id) => {
    console.log(`Remove item ${id}`);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
        <FaShoppingCart className="mr-3 text-orange-500" /> My Cart
      </h2>
      {cartItems.length > 0 ? (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <h3 className="font-medium text-gray-800">
                  Cart Items ({cartItems.length})
                </h3>
              </div>
              <ul className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <li key={item.id} className="p-4 hover:bg-gray-50">
                    <div className="flex space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium text-gray-800">
                            {item.name}
                          </h4>
                          <span className="font-bold text-gray-800">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          {item.description}
                        </p>
                        <div className="flex justify-between items-center mt-3">
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() => decreaseQuantity(item.id)}
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                            >
                              -
                            </button>
                            <span className="px-3 py-1 border-x border-gray-300">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => increaseQuantity(item.id)}
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 text-sm flex items-center"
                          >
                            <FaTimes className="mr-1" /> Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-between">
                <button className="text-orange-500 hover:text-orange-700 flex items-center">
                  <FaAngleLeft className="mr-1" /> Continue Shopping
                </button>
                <button className="text-red-500 hover:text-red-700 flex items-center">
                  <FaTimes className="mr-1" /> Clear Cart
                </button>
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 sticky top-4">
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <h3 className="font-medium text-gray-800">Order Summary</h3>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="h-px bg-gray-200 my-2"></div>
                <div className="flex justify-between font-bold text-gray-800">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  className="w-full p-2 border border-gray-300 rounded-lg mt-4"
                />
                <button className="w-full py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors mt-4">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-8 text-center">
          <div className="bg-green-50 p-4 inline-block rounded-full mb-4">
            <FaShoppingCart className="text-green-500 text-4xl" />
          </div>
          <h3 className="text-xl font-medium text-gray-700 mb-2">
            Your Cart is Empty
          </h3>
          <p className="text-gray-500 mb-4">
            Add some delicious items to your cart and order now!
          </p>
          <a
            href="/menu"
            className="inline-block px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            View Menu
          </a>
        </div>
      )}
    </div>
  );
};

const AddressesContent = () => {
  // Your existing AddressesContent component
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        My Addresses
      </h2>
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="bg-purple-50 p-3 rounded-full mr-4">
              <FaMapMarkerAlt className="text-purple-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-700">
              Saved Addresses
            </h3>
          </div>
          <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center">
            <span className="mr-1">+</span> Add New
          </button>
        </div>
        <div className="bg-gray-50 border border-gray-100 rounded-lg p-6 text-center">
          <p className="text-gray-500 mb-2">You have no saved addresses.</p>
          <p className="text-gray-400 text-sm">
            Add a new address to save time during checkout
          </p>
        </div>
      </div>
    </div>
  );
};

const SettingsContent = () => {
  // Your existing SettingsContent component
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Account Settings
      </h2>
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
            <div className="bg-blue-50 p-2 rounded-full mr-3">
              <FaUser className="text-blue-600" />
            </div>
            Profile Information
          </h3>
          <form>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:outline-none transition-colors flex items-center"
              >
                <FaSave className="mr-2" /> Update Profile
              </button>
            </div>
          </form>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 transition-all duration-200 hover:shadow-md">
          <h3 className="text-xl font-medium text-gray-800 mb-5 flex items-center">
            <FaLock className="mr-2 text-orange-500" /> Change Password
          </h3>
          <form>
            <div className="space-y-5">
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Enter your current password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  />
                  <FaEye className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-orange-500 transition-colors" />
                </div>
              </div>
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Enter your new password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  />
                  <FaEye className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-orange-500 transition-colors" />
                </div>
              </div>
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Confirm your new password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  />
                  <FaEye className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-orange-500 transition-colors" />
                </div>
              </div>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:outline-none transition-colors flex items-center"
              >
                <FaKey className="mr-2" /> Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const HelpContent = () => {
  // Your existing HelpContent component
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
        <FaQuestionCircle className="mr-3 text-orange-500" /> Help & Support
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 transition-all duration-200 hover:shadow-md">
          <h3 className="text-xl font-medium text-gray-800 mb-4 flex items-center">
            <FaEnvelope className="mr-2 text-orange-500" /> Contact Us
          </h3>
          <p className="text-gray-600 mb-5">
            If you have any questions or need assistance, our customer support
            team is here to help you.
          </p>
          <div className="space-y-4">
            <div className="flex items-center p-3 bg-orange-50 rounded-lg border border-orange-100">
              <FaEnvelope className="text-orange-500 mr-3 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <a
                  href="mailto:support@hungerhub.com"
                  className="text-orange-500 font-medium hover:text-orange-600 transition-colors"
                >
                  support@hungerhub.com
                </a>
              </div>
            </div>
            <div className="flex items-center p-3 bg-orange-50 rounded-lg border border-orange-100">
              <FaPhone className="text-orange-500 mr-3 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <a
                  href="tel:+1234567890"
                  className="text-orange-500 font-medium hover:text-orange-600 transition-colors"
                >
                  +123 456 7890
                </a>
              </div>
            </div>
            <button className="w-full mt-2 py-3 bg-white border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-50 focus:outline-none transition-colors flex items-center justify-center">
              <FaQuestionCircle className="mr-2" /> Live Chat Support
            </button>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 transition-all duration-200 hover:shadow-md">
          <h3 className="text-xl font-medium text-gray-800 mb-4 flex items-center">
            <FaClipboardList className="mr-2 text-orange-500" /> Frequently
            Asked Questions
          </h3>
          <div className="space-y-4">
            <div className="border-b border-gray-100 pb-3">
              <h4 className="font-medium text-gray-800 flex items-center">
                <FaCheckCircle className="text-orange-500 mr-2 text-sm" />
                How do I track my order?
              </h4>
              <p className="text-gray-600 mt-1 pl-6">
                You can track your order from the My Orders section in your
                dashboard. Real-time updates will be provided as your order is
                prepared and delivered.
              </p>
            </div>
            <div className="border-b border-gray-100 pb-3">
              <h4 className="font-medium text-gray-800 flex items-center">
                <FaCheckCircle className="text-orange-500 mr-2 text-sm" />
                How can I change my delivery address?
              </h4>
              <p className="text-gray-600 mt-1 pl-6">
                You can update your delivery address from the My Addresses
                section. You can save multiple addresses and select your
                preferred one during checkout.
              </p>
            </div>
            <div className="border-b border-gray-100 pb-3">
              <h4 className="font-medium text-gray-800 flex items-center">
                <FaCheckCircle className="text-orange-500 mr-2 text-sm" />
                What payment methods are accepted?
              </h4>
              <p className="text-gray-600 mt-1 pl-6">
                We accept credit/debit cards, digital wallets (Apple Pay, Google
                Pay), and cash on delivery for your convenience.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 flex items-center">
                <FaCheckCircle className="text-orange-500 mr-2 text-sm" />
                How do I report an issue with my order?
              </h4>
              <p className="text-gray-600 mt-1 pl-6">
                You can report issues through the Order Details page by
                selecting the "Report Issue" option, or by contacting our
                customer support team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
