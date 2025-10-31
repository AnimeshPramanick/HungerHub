import { useState } from "react";
import {
  FiBarChart2 as BarChart3,
  FiUsers as Users,
  FiShoppingBag as ShoppingBag,
  FiDollarSign as DollarSign,
  FiSettings as Settings,
} from "react-icons/fi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Bar,
  BarChart,
} from "recharts";

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("overview");

  const revenueData = [
    { month: "Jan", revenue: 8000 },
    { month: "Feb", revenue: 9500 },
    { month: "Mar", revenue: 10000 },
    { month: "Apr", revenue: 12000 },
    { month: "May", revenue: 14500 },
    { month: "Jun", revenue: 16000 },
  ];

  const userData = [
    { month: "Jan", users: 300 },
    { month: "Feb", users: 380 },
    { month: "Mar", users: 450 },
    { month: "Apr", users: 520 },
    { month: "May", users: 600 },
    { month: "Jun", users: 680 },
  ];

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-red-100 via-white to-red-200">
      {/* Sidebar */}
      <aside className="w-64 bg-white/40 backdrop-blur-xl shadow-lg border-r border-white/30 p-6 flex flex-col">
        <h1 className="text-2xl font-bold text-red-600 mb-8 text-center">
          FoodieHub 🍔
        </h1>

        <nav className="space-y-4">
          {[
            { id: "overview", label: "Overview", icon: BarChart3 },
            { id: "orders", label: "Orders", icon: ShoppingBag },
            { id: "users", label: "Users", icon: Users },
            { id: "settings", label: "Settings", icon: Settings },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              className={`flex items-center w-full px-4 py-2 rounded-lg transition ${
                activeSection === id
                  ? "bg-red-500 text-white"
                  : "text-gray-700 hover:bg-red-100"
              }`}
            >
              <Icon className="w-5 h-5 mr-3" /> {label}
            </button>
          ))}
        </nav>

        <div className="mt-auto text-center text-sm text-gray-600">
          © 2025 FoodieHub Admin
        </div>
      </aside>

      {/* Main Dashboard */}
      <main className="flex-1 p-10 bg-white/60 backdrop-blur-xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Admin Dashboard
        </h2>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white/50 backdrop-blur-lg p-6 rounded-2xl shadow-md hover:shadow-xl transition">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Total Orders
              </h3>
              <ShoppingBag className="w-6 h-6 text-red-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">1,245</p>
            <p className="text-sm text-gray-500 mt-2">↑ 12% from last week</p>
          </div>

          <div className="bg-white/50 backdrop-blur-lg p-6 rounded-2xl shadow-md hover:shadow-xl transition">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Revenue</h3>
              <DollarSign className="w-6 h-6 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">$18,460</p>
            <p className="text-sm text-gray-500 mt-2">↑ 8% from last week</p>
          </div>

          <div className="bg-white/50 backdrop-blur-lg p-6 rounded-2xl shadow-md hover:shadow-xl transition">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Active Users
              </h3>
              <Users className="w-6 h-6 text-blue-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">530</p>
            <p className="text-sm text-gray-500 mt-2">↑ 5% from last month</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="bg-white/50 backdrop-blur-lg p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Revenue Growth
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Bar dataKey="revenue" fill="#ef4444" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white/50 backdrop-blur-lg p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              User Growth
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#ef4444"
                  strokeWidth={3}
                  dot={{ r: 5, stroke: "#ef4444", fill: "#fff" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white/50 backdrop-blur-lg p-6 rounded-2xl shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Orders
          </h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-600 border-b border-gray-200">
                <th className="p-3">Order ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  id: "#1001",
                  customer: "John Doe",
                  amount: "$45.00",
                  status: "Delivered",
                },
                {
                  id: "#1002",
                  customer: "Sarah Lee",
                  amount: "$78.50",
                  status: "Pending",
                },
                {
                  id: "#1003",
                  customer: "Michael Smith",
                  amount: "$23.99",
                  status: "Cancelled",
                },
              ].map((order, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-red-50/30"
                >
                  <td className="p-3 font-medium text-gray-700">{order.id}</td>
                  <td className="p-3 text-gray-600">{order.customer}</td>
                  <td className="p-3 text-gray-700">{order.amount}</td>
                  <td
                    className={`p-3 font-semibold ${
                      order.status === "Delivered"
                        ? "text-green-600"
                        : order.status === "Pending"
                        ? "text-yellow-500"
                        : "text-red-500"
                    }`}
                  >
                    {order.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
