import { use, useContext, useState } from "react";
import { FaSearch, FaShoppingCart, FaUser, FaBars } from "react-icons/fa";
import { MdAddShoppingCart } from "react-icons/md";
import { Link } from "react-router";
import logo from '../assets/Logo.png'
import { AuthContext } from "../Context/AuthContext";
import ShopCart from "./ShopCart";
import { CartContext } from "../Context/CartProvider ";

const Navber = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { User, Logout } = use(AuthContext);
  const { totalItems } = useContext(CartContext);

  return (
    <nav className="w-full bg-gray-100 shadow-md sticky top-0 z-50">
      <div className="flex flex-wrap justify-between items-center w-11/13 mx-auto py-3 px-2">
        {/* Logo */}
        <div className="text-2xl font-extrabold tracking-wide flex-shrink-0">
          <Link to={"/"}><img className="md:w-32 w-12 sm:w-40 md:w-52" src={logo} alt="Logo" /></Link>
        </div>

        {/* Search (Hidden on mobile) */}
        <div className="hidden md:flex flex-1 mx-4 md:mx-6 max-w-xl w-full">
          <input
            type="text"
            placeholder="Search Products..."
            className="w-full border border-gray-300 rounded-l-full px-4 py-2 focus:outline-none focus:border-red-400"
          />
          <button className="bg-[#08aec3] hover:bg-red-600 transition-colors text-white px-5 rounded-r-full">
            <FaSearch />
          </button>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 sm:gap-4 md:gap-6 mt-3 md:mt-0">
          {/* Cart */}
          <div className="drawer drawer-end">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              <label htmlFor="my-drawer-4" className="drawer-button">
                <div className="flex items-center gap-2 cursor-pointer hover:text-red-500 transition-colors">
                  <div className="bg-[#08aec3] relative p-3 rounded-lg text-white hover:bg-[#077786] transition">
                    <MdAddShoppingCart size={22} />
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
                      {totalItems}
                    </span>
                  </div>
                </div>
              </label>
            </div>
            <ShopCart />
          </div>

          {/* User Avatar */}
          {User && (
            <img
              className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full object-cover border-2"
              src={User?.profile_img}
              alt="User"
            />
          )}

          {/* User Account */}
          <Link to={"/login"}>
            <div className="flex items-center gap-2 cursor-pointer hover:text-red-500 transition-colors">
              <FaUser className="text-lg md:text-xl" />
              {User ? (
                <button
                  className="btn btn-error text-white text-xs sm:text-sm md:text-base px-2 sm:px-3"
                  onClick={Logout}
                >
                  Log Out
                </button>
              ) : (
                <span className="hidden md:inline">Account</span>
              )}
            </div>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FaBars />
          </button>
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="bg-[#141b3b] text-white">
        <div className="hidden md:flex items-center justify-center gap-6 lg:gap-8 py-3 text-sm font-semibold flex-wrap">
          <Link to={"/"}>
            <span className="cursor-pointer hover:text-yellow-200 transition-colors">
              Home
            </span>
          </Link>
          <Link to={"/all-product"}>
            <span className="cursor-pointer hover:text-yellow-200 transition-colors">
              Products
            </span>
          </Link>
          <Link to={"/contact"}>
            <span className="cursor-pointer hover:text-yellow-200 transition-colors">
              Contact
            </span>
          </Link>
          <Link to={"/ComingSoon"}>
            <span className="text-yellow-200 font-bold">LIMITED SALE 🔥</span>
          </Link>
          {User?.role === "admin" && (
            <Link to={"/dashboard"}>
              <span className="cursor-pointer hover:text-yellow-200 transition-colors">
                Dashboard
              </span>
            </Link>
          )}
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden flex flex-col px-6 py-4 space-y-3 bg-red-500 text-white text-base font-medium">
            <Link to={"/all-categories"}>
              <span className="cursor-pointer hover:text-yellow-200">
                All Categories
              </span>
            </Link>
            <Link to={"/all-product"}>
              <span className="cursor-pointer hover:text-yellow-200">
                Products
              </span>
            </Link>
            <Link to={"/contact"}>
              <span className="cursor-pointer hover:text-yellow-200">
                Contact
              </span>
            </Link>
            {User?.role === "admin" && (
              <Link to={"/dashboard"}>
                <span className="cursor-pointer hover:text-yellow-200 transition-colors">
                  Dashboard
                </span>
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navber;
