import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import {
  FaUsers,
  FaShoppingCart,
  FaUtensils,
  FaChartBar,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaFilter,
  FaDownload,
  FaTags,
  FaClipboardList,
  FaCog,
  FaEye,
  FaMoneyBillWave,
  FaStar,
  FaComments,
  FaBox,
  FaTruck,
  FaUserShield,
  FaCalendarAlt,
  FaArrowUp,
  FaArrowDown,
  FaBell,
  FaCheckCircle,
} from "react-icons/fa";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    return window.innerWidth >= 768;
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [adminProfile, setAdminProfile] = useState(null);

  // Dashboard Statistics State
  const [dashboardStats, setDashboardStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    completedOrders: 0,
    activeUsers: 0,
    newUsersToday: 0,
  });

  // Data States for different sections
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const checkAdminAuth = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        if (!token) {
          navigate("/login", {
            state: { message: "Please log in to access admin dashboard." },
          });
          return;
        }

        // Verify token and get user profile to ensure user is still admin
        const response = await api.get("/user/profile");

        if (response.data?.success) {
          const userData = response.data.data;

          // Double-check admin role from server
          if (userData.role !== "admin") {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("userRole");
            navigate("/login", {
              state: {
                message: "Access denied. Admin privileges required.",
                type: "error",
              },
            });
            return;
          }

          // Set admin profile and fetch dashboard data
          setAdminProfile(userData);
          localStorage.setItem("userRole", userData.role);
          fetchAdminData();
        } else {
          throw new Error("Failed to verify admin access");
        }
      } catch (error) {
        console.error("Admin auth check failed:", error);

        // Clear tokens and redirect to login
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userRole");
        navigate("/login", {
          state: { message: "Authentication failed. Please log in again." },
        });
      }
    };

    checkAdminAuth();
  }, [navigate]);

  const fetchAdminData = async () => {
    try {
      setLoading(true);

      // Fetch admin profile
      const profileResponse = await api.get("/user/profile");
      if (profileResponse.data?.success) {
        setAdminProfile(profileResponse.data.data);
      }

      // Fetch dashboard statistics (mock data for now)
      setDashboardStats({
        totalUsers: 1250,
        totalOrders: 3420,
        totalProducts: 156,
        totalRevenue: 45670.5,
        pendingOrders: 23,
        completedOrders: 3397,
        activeUsers: 89,
        newUsersToday: 12,
      });

      // Mock data for different sections
      setUsers([
        {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          role: "customer",
          status: "active",
          joinDate: "2024-01-15",
        },
        {
          id: 2,
          name: "Jane Smith",
          email: "jane@example.com",
          role: "customer",
          status: "active",
          joinDate: "2024-02-20",
        },
        {
          id: 3,
          name: "Bob Johnson",
          email: "bob@example.com",
          role: "customer",
          status: "inactive",
          joinDate: "2024-01-10",
        },
      ]);

      setOrders([
        {
          id: 101,
          customer: "John Doe",
          total: 45.99,
          status: "delivered",
          date: "2024-09-20",
        },
        {
          id: 102,
          customer: "Jane Smith",
          total: 32.5,
          status: "pending",
          date: "2024-09-24",
        },
        {
          id: 103,
          customer: "Bob Johnson",
          total: 78.25,
          status: "processing",
          date: "2024-09-23",
        },
      ]);

      setProducts([
        {
          id: 1,
          name: "Margherita Pizza",
          category: "Pizza",
          price: 12.99,
          stock: 50,
          status: "active",
        },
        {
          id: 2,
          name: "Chicken Burger",
          category: "Burgers",
          price: 8.99,
          stock: 30,
          status: "active",
        },
        {
          id: 3,
          name: "Caesar Salad",
          category: "Salads",
          price: 6.99,
          stock: 0,
          status: "out_of_stock",
        },
      ]);

      setCategories([
        { id: 1, name: "Pizza", productCount: 12, status: "active" },
        { id: 2, name: "Burgers", productCount: 8, status: "active" },
        { id: 3, name: "Salads", productCount: 5, status: "active" },
      ]);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching admin data:", error);
      setError("Failed to load dashboard data");
      setLoading(false);
    }
  };

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: FaChartBar },
    { id: "users", label: "Users", icon: FaUsers },
    { id: "orders", label: "Orders", icon: FaShoppingCart },
    { id: "products", label: "Products", icon: FaUtensils },
    { id: "categories", label: "Categories", icon: FaTags },
    { id: "reviews", label: "Reviews", icon: FaComments },
    { id: "analytics", label: "Analytics", icon: FaChartBar },
    { id: "settings", label: "Settings", icon: FaCog },
  ];

  const handleLogout = () => {
    // Clear all stored authentication data
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");

    // Navigate to login page
    navigate("/login", {
      state: { message: "You have been logged out successfully." },
    });
  };

  const StatCard = ({ title, value, icon: Icon, trend, trendValue, color }) => (
    <div className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {trend && (
            <div className="flex items-center mt-2">
              {trend === "up" ? (
                <FaArrowUp className="text-green-500 mr-1" size={12} />
              ) : (
                <FaArrowDown className="text-red-500 mr-1" size={12} />
              )}
              <span
                className={`text-sm font-medium ${
                  trend === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {trendValue}
              </span>
            </div>
          )}
        </div>
        <div
          className={`p-3 rounded-full ${color
            .replace("border-l-", "bg-")
            .replace("-500", "-100")}`}
        >
          <Icon
            className={color
              .replace("border-l-", "text-")
              .replace("-500", "-600")}
            size={24}
          />
        </div>
      </div>
    </div>
  );

  const OverviewTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
        <div className="flex items-center space-x-3">
          <FaBell
            className="text-gray-600 cursor-pointer hover:text-blue-600"
            size={20}
          />
          <span className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={dashboardStats.totalUsers.toLocaleString()}
          icon={FaUsers}
          trend="up"
          trendValue="+12%"
          color="border-l-blue-500"
        />
        <StatCard
          title="Total Orders"
          value={dashboardStats.totalOrders.toLocaleString()}
          icon={FaShoppingCart}
          trend="up"
          trendValue="+8%"
          color="border-l-green-500"
        />
        <StatCard
          title="Total Products"
          value={dashboardStats.totalProducts}
          icon={FaUtensils}
          trend="up"
          trendValue="+5%"
          color="border-l-purple-500"
        />
        <StatCard
          title="Total Revenue"
          value={`$${dashboardStats.totalRevenue.toLocaleString()}`}
          icon={FaMoneyBillWave}
          trend="up"
          trendValue="+15%"
          color="border-l-yellow-500"
        />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Orders</p>
              <p className="text-2xl font-bold text-orange-600">
                {dashboardStats.pendingOrders}
              </p>
            </div>
            <FaClipboardList className="text-orange-500" size={20} />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-green-600">
                {dashboardStats.activeUsers}
              </p>
            </div>
            <FaUserShield className="text-green-500" size={20} />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">New Users Today</p>
              <p className="text-2xl font-bold text-blue-600">
                {dashboardStats.newUsersToday}
              </p>
            </div>
            <FaCalendarAlt className="text-blue-500" size={20} />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed Orders</p>
              <p className="text-2xl font-bold text-green-600">
                {dashboardStats.completedOrders}
              </p>
            </div>
            <FaCheckCircle className="text-green-500" size={20} />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Activity
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <FaShoppingCart className="text-green-500" />
              <div>
                <p className="text-sm font-medium">New order #102 received</p>
                <p className="text-xs text-gray-500">2 minutes ago</p>
              </div>
            </div>
            <span className="text-sm text-green-600 font-medium">$32.50</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <FaUsers className="text-blue-500" />
              <div>
                <p className="text-sm font-medium">New user registration</p>
                <p className="text-xs text-gray-500">15 minutes ago</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <FaUtensils className="text-purple-500" />
              <div>
                <p className="text-sm font-medium">
                  Product "Caesar Salad" out of stock
                </p>
                <p className="text-xs text-gray-500">1 hour ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const UsersTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700">
          <FaPlus size={16} />
          <span>Add User</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <FaSearch
                className="absolute left-3 top-3 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search users..."
                className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center space-x-2 px-3 py-2 border rounded-lg hover:bg-gray-50">
              <FaFilter size={14} />
              <span>Filter</span>
            </button>
          </div>
          <button className="flex items-center space-x-2 px-3 py-2 border rounded-lg hover:bg-gray-50">
            <FaDownload size={14} />
            <span>Export</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Join Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.joinDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <FaEye size={16} />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <FaEdit size={16} />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <FaTrash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const OrdersTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Order Management</h2>
        <div className="flex items-center space-x-3">
          <select className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
            <option>All Orders</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${order.total}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        order.status === "delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <FaEye size={16} />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <FaEdit size={16} />
                      </button>
                      <button className="text-orange-600 hover:text-orange-900">
                        <FaTruck size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const ProductsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Product Management</h2>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700">
          <FaPlus size={16} />
          <span>Add Product</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${product.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.stock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        product.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.status === "out_of_stock"
                        ? "Out of Stock"
                        : product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <FaEye size={16} />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <FaEdit size={16} />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <FaTrash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderActiveTab = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab />;
      case "users":
        return <UsersTab />;
      case "orders":
        return <OrdersTab />;
      case "products":
        return <ProductsTab />;
      case "categories":
        return (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">
              Categories Management - Coming Soon
            </h3>
          </div>
        );
      case "reviews":
        return (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">
              Reviews Management - Coming Soon
            </h3>
          </div>
        );
      case "analytics":
        return (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">
              Analytics Dashboard - Coming Soon
            </h3>
          </div>
        );
      case "settings":
        return (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">
              Admin Settings - Coming Soon
            </h3>
          </div>
        );
      default:
        return <OverviewTab />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-16"
        } bg-white shadow-lg transition-all duration-300 flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {isSidebarOpen && (
              <div className="flex items-center space-x-2">
                <FaUserShield className="text-blue-600" size={24} />
                <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
              </div>
            )}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isSidebarOpen ? <FaTimes size={16} /> : <FaBars size={16} />}
            </button>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center ${
                      isSidebarOpen ? "px-4 py-3" : "px-2 py-3 justify-center"
                    } text-left rounded-lg transition-colors ${
                      activeTab === item.id
                        ? "bg-blue-100 text-blue-600 border-r-2 border-blue-600"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                    }`}
                    title={!isSidebarOpen ? item.label : ""}
                  >
                    <Icon size={20} />
                    {isSidebarOpen && (
                      <span className="ml-3 font-medium">{item.label}</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Admin Profile & Logout */}
        <div className="p-4 border-t border-gray-200">
          {isSidebarOpen && adminProfile && (
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <FaUserShield className="text-white" size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {adminProfile.name || "Admin"}
                  </p>
                  <p className="text-xs text-gray-500">{adminProfile.email}</p>
                </div>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className={`w-full flex items-center ${
              isSidebarOpen ? "px-4 py-3" : "px-2 py-3 justify-center"
            } text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors`}
            title={!isSidebarOpen ? "Logout" : ""}
          >
            <FaSignOutAlt size={20} />
            {isSidebarOpen && <span className="ml-3 font-medium">Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">
                {sidebarItems.find((item) => item.id === activeTab)?.label ||
                  "Dashboard"}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                Welcome back, {adminProfile?.name || "Admin"}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-auto">{renderActiveTab()}</main>
      </div>
    </div>
  );
};

export default AdminDashboard;
