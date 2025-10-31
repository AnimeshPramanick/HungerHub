import { useState } from "react";
import {
  Bell,
  Menu,
  LogOut,
  Users,
  ShoppingBag,
  DollarSign,
  Coffee,
} from "lucide-react";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const stats = [
    { title: "Total Orders", value: "1,245", icon: ShoppingBag },
    { title: "Revenue", value: "$12,480", icon: DollarSign },
    { title: "Active Users", value: "356", icon: Users },
    { title: "Menu Items", value: "87", icon: Coffee },
  ];

  const orders = [
    {
      id: 101,
      customer: "John Doe",
      item: "Margherita Pizza",
      amount: "$12.99",
      status: "Delivered",
    },
    {
      id: 102,
      customer: "Sarah Lee",
      item: "Veggie Burger",
      amount: "$9.49",
      status: "In Progress",
    },
    {
      id: 103,
      customer: "Raj Kumar",
      item: "Pasta Alfredo",
      amount: "$11.50",
      status: "Pending",
    },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="w-64 bg-white shadow-lg flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold text-center text-red-600 py-6">
            FoodieHub Admin
          </h1>
          <nav className="space-y-2 px-4">
            {["dashboard", "orders", "menu", "users", "revenue"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left px-4 py-2 rounded-lg font-medium ${
                  activeTab === tab
                    ? "bg-red-500 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-red-500 border-t">
          <LogOut size={18} /> Logout
        </button>
      </aside>

      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Menu className="text-gray-500" />
            <h2 className="text-2xl font-semibold text-gray-800 capitalize">
              {activeTab}
            </h2>
          </div>
          <div className="flex items-center gap-5">
            <input
              type="text"
              placeholder="Search..."
              className="border px-4 py-2 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
            />
            <Bell className="text-gray-500 cursor-pointer" />
            <img
              src="https://i.pravatar.cc/40"
              alt="admin"
              className="w-10 h-10 rounded-full border"
            />
          </div>
        </div>

        {activeTab === "dashboard" && (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map(({ title, value, icon: Icon }) => (
                <div
                  key={title}
                  className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500">{title}</p>
                      <h3 className="text-2xl font-bold text-gray-800">
                        {value}
                      </h3>
                    </div>
                    <Icon className="text-red-500" size={30} />
                  </div>
                </div>
              ))}
            </div>

            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Recent Orders
            </h3>
            <div className="bg-white rounded-xl shadow overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="px-6 py-3 text-left">Order ID</th>
                    <th className="px-6 py-3 text-left">Customer</th>
                    <th className="px-6 py-3 text-left">Item</th>
                    <th className="px-6 py-3 text-left">Amount</th>
                    <th className="px-6 py-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-3">{order.id}</td>
                      <td className="px-6 py-3">{order.customer}</td>
                      <td className="px-6 py-3">{order.item}</td>
                      <td className="px-6 py-3">{order.amount}</td>
                      <td
                        className={`px-6 py-3 font-medium ${
                          order.status === "Delivered"
                            ? "text-green-600"
                            : order.status === "In Progress"
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
          </div>
        )}

        {activeTab !== "dashboard" && (
          <div className="bg-white rounded-xl shadow p-8 text-center text-gray-600">
            <p className="text-lg">
              This is the{" "}
              <span className="font-semibold text-red-500">{activeTab}</span>{" "}
              management section.
            </p>
            <p className="mt-2">You can add, edit, or manage data here.</p>
          </div>
        )}
      </main>
    </div>
  );
}
