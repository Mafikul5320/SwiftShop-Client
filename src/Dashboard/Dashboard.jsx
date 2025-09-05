import { Outlet, Link, useLocation } from "react-router";
import { IoAddCircleOutline } from "react-icons/io5";
import { BsBox } from "react-icons/bs";
import logo from '../assets/Logo.png'
import { Home,  Settings, LogOut, Users } from "lucide-react";

const Dashboard = () => {
  const location = useLocation();

  return (
    <div className="drawer md:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar (Mobile Only) */}
        <div className="navbar bg-white border-b shadow-sm md:hidden">
          <div className="flex-none">
            <label
              htmlFor="dashboard-drawer"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="inline-block w-6 h-6 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2 font-bold text-xl text-gray-700">My Dashboard</div>
        </div>

        {/* Main Content */}
        <main className="p-6 bg-gray-50 min-h-screen">
          <Outlet />
        </main>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="w-72 min-h-full bg-white shadow-lg flex flex-col">
          {/* Logo / Branding */}
          <Link to={"/"}>
            <div className="p-6 flex items-center gap-2 border-gray-300 border-b">
              <img className="w-42" src={logo} />
            </div>
          </Link>

          {/* Menu */}
          <ul className="menu p-4 flex-1 text-gray-700 font-medium space-y-2">
            <li>
              <Link
                to="/dashboard"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all 
                  ${location.pathname === "/dashboard"
                    ? "bg-indigo-100 text-indigo-600 font-semibold"
                    : "hover:bg-gray-100"
                  }`}
              >
                <Home size={18} /> Dashboard Home
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/add-product"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all 
                  ${location.pathname === "/dashboard/add-product"
                    ? "bg-indigo-100 text-indigo-600 font-semibold"
                    : "hover:bg-gray-100"
                  }`}
              >
                <IoAddCircleOutline size={18} /> Add Product
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/all-user"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all 
                  ${location.pathname === "/dashboard/settings"
                    ? "bg-indigo-100 text-indigo-600 font-semibold"
                    : "hover:bg-gray-100"
                  }`}
              >
                <Users size={18} /> Users
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/all-product"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all 
                  ${location.pathname === "/dashboard/settings"
                    ? "bg-indigo-100 text-indigo-600 font-semibold"
                    : "hover:bg-gray-100"
                  }`}
              >
                <BsBox size={18} /> AllProducts
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/settings"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all 
                  ${location.pathname === "/dashboard/settings"
                    ? "bg-indigo-100 text-indigo-600 font-semibold"
                    : "hover:bg-gray-100"
                  }`}
              >
                <Settings size={18} /> Settings
              </Link>
            </li>
          </ul>

          {/* Logout */}
          <div className="p-4 border-gray-300 border-t">
            <button className="w-full flex items-center gap-3 text-red-500 px-3 py-2 rounded-lg hover:bg-red-50 transition-all">
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
