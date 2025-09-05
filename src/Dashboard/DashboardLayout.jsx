import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Menu, Home, Package, Users, Settings } from "lucide-react";

const data = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 2780 },
];

const pieData = [
  { name: "Electronics", value: 400 },
  { name: "Fashion", value: 300 },
  { name: "Home", value: 300 },
  { name: "Other", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const DashboardLayout = () => {
  return (
    <div className="flex ">

      {/* Main Content */}
      <div className="flex-1 ">
        {/* Top Navbar */}
        <div className="flex justify-between items-center bg-white shadow rounded-lg px-6 py-3 mb-6">
          <h1 className="text-2xl font-bold text-gray-700">Welcome Back 👋</h1>
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search..."
              className="border rounded-lg px-3 py-2"
            />
            <img
              src="https://i.pravatar.cc/40"
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500">Total Sales</h3>
            <p className="text-2xl font-bold text-green-600">$24,500</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500">New Users</h3>
            <p className="text-2xl font-bold text-blue-600">1,240</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500">Orders</h3>
            <p className="text-2xl font-bold text-orange-600">320</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-bold mb-4">Monthly Sales</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-bold mb-4">Category Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={80} label>
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
