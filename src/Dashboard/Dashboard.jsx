import { Outlet, Link } from "react-router";
import { Home, User, Settings, LogOut } from "lucide-react";

const Dashboard = () => {
    return (
    <div className="drawer md:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="navbar bg-base-200 shadow md:hidden">
          <div className="flex-none md:hidden">
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
          <div className="flex-1 px-2 font-bold text-xl "> My Dashboard</div>
          <div className="flex-none hidden lg:flex gap-4">
            <Link to="/" className="btn btn-ghost">Home</Link>
            <Link to="/profile" className="btn btn-ghost">Profile</Link>
          </div>
        </div>

        <main className="p-6 bg-base-100 min-h-screen">
          <Outlet />
        </main>
      </div>

      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          <li className="mb-2 text-lg font-semibold">📂 Menu</li>
          <li>
            <Link to="/dashboard" className="flex items-center gap-2">
              <Home size={18} /> Dashboard Home
            </Link>
          </li>
          <li>
            <Link to="/dashboard/add-product" className="flex items-center gap-2">
              <User size={18} /> Add Product
            </Link>
          </li>
          <li>
            <Link to="/dashboard/settings" className="flex items-center gap-2">
              <Settings size={18} /> Settings
            </Link>
          </li>
          <li>
            <button className="flex items-center gap-2 text-red-500">
              <LogOut size={18} /> Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
    );
};

export default Dashboard;