import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
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
  FaEllipsisV,
  FaReply,
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

  // Analytics Data
  const [revenueData] = useState([
    { month: "Jan", revenue: 8000 },
    { month: "Feb", revenue: 9500 },
    { month: "Mar", revenue: 10000 },
    { month: "Apr", revenue: 12000 },
    { month: "May", revenue: 14500 },
    { month: "Jun", revenue: 16000 },
    { month: "Jul", revenue: 18500 },
    { month: "Aug", revenue: 21000 },
    { month: "Sep", revenue: 23500 },
    { month: "Oct", revenue: 25000 },
    { month: "Nov", revenue: 27500 },
    { month: "Dec", revenue: 30000 },
  ]);

  const [userGrowthData] = useState([
    { month: "Jan", users: 300 },
    { month: "Feb", users: 380 },
    { month: "Mar", users: 450 },
    { month: "Apr", users: 520 },
    { month: "May", users: 600 },
    { month: "Jun", users: 680 },
    { month: "Jul", users: 720 },
    { month: "Aug", users: 800 },
    { month: "Sep", users: 850 },
    { month: "Oct", users: 920 },
    { month: "Nov", users: 980 },
    { month: "Dec", users: 1050 },
  ]);

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
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Food Categories</h2>
                <p className="text-gray-600 mt-1">Manage your restaurant's menu categories</p>
              </div>
              <button className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-orange-600 transition-colors">
                <FaPlus size={16} />
                <span>New Category</span>
              </button>
            </div>

            {/* Search and Filter Bar */}
            <div className="bg-white p-4 rounded-lg shadow-sm flex flex-wrap gap-4 items-center justify-between">
              <div className="relative flex-1 min-w-[200px]">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search categories..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center gap-4">
                <select className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 text-gray-700">
                  <option value="">Sort by</option>
                  <option value="name">Name</option>
                  <option value="products">Products</option>
                  <option value="status">Status</option>
                </select>
                <button className="px-3 py-2 border rounded-lg hover:bg-gray-50 text-gray-700 flex items-center gap-2">
                  <FaFilter size={14} />
                  <span>Filters</span>
                </button>
              </div>
            </div>

            {/* Category Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <div key={category.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-3 rounded-lg ${
                          category.status === 'active' ? 'bg-orange-100' : 'bg-gray-100'
                        }`}>
                          <FaUtensils className={`${
                            category.status === 'active' ? 'text-orange-600' : 'text-gray-600'
                          }`} size={20} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">{category.name}</h3>
                          <p className="text-sm text-gray-500">{category.productCount} items</p>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm ${
                        category.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {category.status}
                      </div>
                    </div>
                    
                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-sm text-gray-600">Available</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {Math.floor(category.productCount * 0.8)}
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-sm text-gray-600">Out of Stock</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {Math.ceil(category.productCount * 0.2)}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center space-x-2">
                        <button className="text-gray-700 hover:text-orange-600 transition-colors p-2">
                          <FaEdit size={18} />
                        </button>
                        <button className="text-gray-700 hover:text-red-600 transition-colors p-2">
                          <FaTrash size={18} />
                        </button>
                      </div>
                      <button className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 transition-colors">
                        <span className="text-sm font-medium">View Products</span>
                        <FaArrowUp className="rotate-90" size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add Category Card */}
              <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 hover:border-orange-500 transition-colors cursor-pointer p-6 flex flex-col items-center justify-center min-h-[280px]">
                <div className="p-3 rounded-full bg-orange-100 mb-4">
                  <FaPlus className="text-orange-600" size={24} />
                </div>
                <h3 className="font-medium text-gray-900">Add New Category</h3>
                <p className="text-sm text-gray-500 text-center mt-2">
                  Create a new category to organize your menu items
                </p>
              </div>
            </div>
          </div>
        );
      case "reviews":
        return (
          <div className="space-y-6">
            {/* Header with Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-yellow-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Average Rating</p>
                    <div className="flex items-center mt-2">
                      <span className="text-3xl font-bold text-gray-900">4.8</span>
                      <div className="flex items-center ml-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar
                            key={star}
                            className="text-yellow-500"
                            size={16}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="p-3 rounded-full bg-yellow-100">
                    <FaStar className="text-yellow-600" size={24} />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Reviews</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">1,248</p>
                  </div>
                  <div className="p-3 rounded-full bg-blue-100">
                    <FaComments className="text-blue-600" size={24} />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Response Rate</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">92%</p>
                  </div>
                  <div className="p-3 rounded-full bg-green-100">
                    <FaCheckCircle className="text-green-600" size={24} />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-purple-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">New Reviews</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">24</p>
                  </div>
                  <div className="p-3 rounded-full bg-purple-100">
                    <FaBell className="text-purple-600" size={24} />
                  </div>
                </div>
              </div>
            </div>

            {/* Rating Distribution */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Rating Distribution</h3>
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center">
                    <div className="w-12 text-sm text-gray-600">{rating} stars</div>
                    <div className="flex-1 mx-4 h-4 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          rating >= 4 ? 'bg-green-500' : 
                          rating === 3 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ 
                          width: `${
                            rating === 5 ? '60%' : 
                            rating === 4 ? '25%' : 
                            rating === 3 ? '10%' : 
                            rating === 2 ? '3%' : '2%'
                          }`
                        }}
                      ></div>
                    </div>
                    <div className="w-12 text-sm text-gray-600 text-right">
                      {rating === 5 ? '60%' : 
                       rating === 4 ? '25%' : 
                       rating === 3 ? '10%' : 
                       rating === 2 ? '3%' : '2%'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews List */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Recent Reviews</h3>
                <div className="flex items-center space-x-4">
                  <select className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
                    <option>All Ratings</option>
                    <option>5 Stars</option>
                    <option>4 Stars</option>
                    <option>3 Stars</option>
                    <option>2 Stars</option>
                    <option>1 Star</option>
                  </select>
                  <select className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
                    <option>Most Recent</option>
                    <option>Highest Rated</option>
                    <option>Lowest Rated</option>
                    <option>Needs Response</option>
                  </select>
                </div>
              </div>

              <div className="space-y-6">
                {/* Sample Reviews */}
                {[
                  {
                    id: 1,
                    user: "John Doe",
                    rating: 5,
                    date: "2024-10-31",
                    content: "Amazing food and great service! The pizza was perfectly cooked and arrived hot.",
                    product: "Margherita Pizza",
                    response: "Thank you for your wonderful feedback! We're glad you enjoyed your meal.",
                    hasResponse: true
                  },
                  {
                    id: 2,
                    user: "Jane Smith",
                    rating: 4,
                    date: "2024-10-30",
                    content: "Good food but delivery took a bit longer than expected.",
                    product: "Chicken Burger",
                    hasResponse: false
                  },
                  {
                    id: 3,
                    user: "Mike Johnson",
                    rating: 3,
                    date: "2024-10-29",
                    content: "Average experience. The food was okay but nothing special.",
                    product: "Caesar Salad",
                    hasResponse: false
                  }
                ].map((review) => (
                  <div key={review.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-600 font-medium">
                              {review.user.charAt(0)}
                            </span>
                          </div>
                          <div className="ml-3">
                            <p className="font-medium text-gray-900">{review.user}</p>
                            <div className="flex items-center mt-1">
                              {[...Array(5)].map((_, index) => (
                                <FaStar
                                  key={index}
                                  className={index < review.rating ? "text-yellow-500" : "text-gray-300"}
                                  size={14}
                                />
                              ))}
                              <span className="ml-2 text-sm text-gray-500">
                                {review.date}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-3">
                          <p className="text-gray-600">{review.content}</p>
                          <p className="text-sm text-gray-500 mt-2">
                            Product: {review.product}
                          </p>
                        </div>
                        {review.response && (
                          <div className="mt-3 pl-4 border-l-2 border-gray-200">
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Response: </span>
                              {review.response}
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        {!review.hasResponse && (
                          <button className="text-blue-600 hover:text-blue-700">
                            <FaReply size={16} />
                          </button>
                        )}
                        <button className="text-gray-600 hover:text-gray-700">
                          <FaEllipsisV size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-6">
                <p className="text-sm text-gray-600">
                  Showing 1-3 of 1,248 reviews
                </p>
                <div className="flex items-center space-x-2">
                  <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      case "analytics":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
              <div className="flex items-center space-x-3">
                <select className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
                  <option>Last 12 Months</option>
                  <option>Last 6 Months</option>
                  <option>Last 3 Months</option>
                  <option>This Month</option>
                </select>
                <button className="flex items-center space-x-2 px-3 py-2 border rounded-lg hover:bg-gray-50">
                  <FaDownload size={14} />
                  <span>Export Data</span>
                </button>
              </div>
            </div>

            {/* Revenue Graph */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Revenue Growth</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Total Revenue:</span>
                  <span className="text-lg font-semibold text-green-600">
                    ${revenueData.reduce((sum, item) => sum + item.revenue, 0).toLocaleString()}
                  </span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" />
                  <YAxis 
                    tickFormatter={(value) => `$${value.toLocaleString()}`}
                  />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip 
                    formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3B82F6"
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* User Growth Graph */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">User Growth</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Total Users:</span>
                  <span className="text-lg font-semibold text-blue-600">
                    {userGrowthData[userGrowthData.length - 1].users.toLocaleString()}
                  </span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={userGrowthData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="users" 
                    stroke="#10B981" 
                    strokeWidth={2}
                    dot={{ fill: '#10B981' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <FaChartBar className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Revenue Growth</p>
                    <p className="text-2xl font-bold text-gray-900">+275%</p>
                    <p className="text-sm text-green-600">vs. Last Year</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-green-100 rounded-full">
                    <FaUsers className="text-green-600" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">User Growth</p>
                    <p className="text-2xl font-bold text-gray-900">+250%</p>
                    <p className="text-sm text-green-600">vs. Last Year</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-yellow-100 rounded-full">
                    <FaShoppingCart className="text-yellow-600" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Order Growth</p>
                    <p className="text-2xl font-bold text-gray-900">+180%</p>
                    <p className="text-sm text-green-600">vs. Last Year</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-purple-100 rounded-full">
                    <FaMoneyBillWave className="text-purple-600" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Avg. Order Value</p>
                    <p className="text-2xl font-bold text-gray-900">$42.50</p>
                    <p className="text-sm text-green-600">+15% vs. Last Year</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "settings":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Admin Settings</h2>
                <p className="text-gray-600 mt-1">Manage your account and system preferences</p>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Save Changes
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Settings */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Settings</h3>
                  <div className="space-y-4">
                    <div className="flex flex-col items-center">
                      <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                        <FaUserShield className="text-blue-600" size={40} />
                      </div>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        Change Avatar
                      </button>
                    </div>
                    <div className="space-y-4 mt-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          defaultValue={adminProfile?.name || ""}
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          defaultValue={adminProfile?.email || ""}
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Settings */}
              <div className="lg:col-span-2 space-y-6">
                {/* Security Settings */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter current password"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter new password"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Confirm new password"
                      />
                    </div>
                    <div className="pt-4">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                        Update Password
                      </button>
                    </div>
                  </div>
                </div>

                {/* Notification Settings */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">New Order Notifications</p>
                        <p className="text-sm text-gray-500">Receive alerts for new orders</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">Review Notifications</p>
                        <p className="text-sm text-gray-500">Get notified about new reviews</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">Low Stock Alerts</p>
                        <p className="text-sm text-gray-500">Alerts when products are running low</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* System Settings */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">System Preferences</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Time Zone
                      </label>
                      <select className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>UTC+5:30 (IST - Indian Standard Time)</option>
                        <option>UTC-5 (Eastern Time)</option>
                        <option>UTC-6 (Central Time)</option>
                        <option>UTC-7 (Mountain Time)</option>
                        <option>UTC-8 (Pacific Time)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Currency Display
                      </label>
                      <select className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>INR (₹)</option>
                        <option>USD ($)</option>
                        <option>EUR (€)</option>
                        <option>GBP (£)</option>
                        <option>JPY (¥)</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <p className="font-medium text-gray-800">Dark Mode</p>
                        <p className="text-sm text-gray-500">Enable dark mode theme</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-50 rounded-lg p-6 border border-red-200">
              <h3 className="text-lg font-semibold text-red-700 mb-4">Danger Zone</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-red-700">Deactivate Account</p>
                    <p className="text-sm text-red-600">Temporarily disable your admin account</p>
                  </div>
                  <button className="px-4 py-2 border border-red-500 text-red-600 rounded-lg hover:bg-red-50">
                    Deactivate
                  </button>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-red-200">
                  <div>
                    <p className="font-medium text-red-700">Delete Account</p>
                    <p className="text-sm text-red-600">Permanently delete your admin account and all data</p>
                  </div>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
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
