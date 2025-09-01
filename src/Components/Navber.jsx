import { useState } from "react";
import { FaSearch, FaShoppingCart, FaUser, FaBars } from "react-icons/fa";
import { Link } from "react-router";

const Navber = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-gray-100 shadow-md sticky top-0 z-50">
      <div className="flex justify-between items-center w-11/13 mx-auto py-4">
        <div className="text-2xl font-extrabold tracking-wide">
          <span className="text-gray-800">Swift</span>
          <span className="text-red-500">Shop</span>
        </div>

        <div className="hidden md:flex flex-1 mx-8 max-w-xl">
          <input
            type="text"
            placeholder="Search Products..."
            className="w-full border border-gray-300 rounded-l-full px-4 py-2 focus:outline-none focus:border-red-400"
          />
          <button className="bg-[#08aec3] hover:bg-red-600 transition-colors text-white px-5 rounded-r-full">
            <FaSearch />
          </button>
        </div>

        <div className="flex items-center gap-6">
          {/* Cart */}
          <div className="flex items-center gap-2 cursor-pointer hover:text-red-500 transition-colors">
            <FaShoppingCart className="text-xl" />
            <span className="hidden md:inline">Cart</span>
            <span className="font-semibold text-red-500">$150.00</span>
          </div>

          {/* User */}
          <Link to={"/login"}><div className="flex items-center gap-2 cursor-pointer hover:text-red-500 transition-colors">
            <FaUser className="text-xl" />
            <span className="hidden md:inline">Account</span>
          </div></Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FaBars />
          </button>
        </div>
      </div>

      <div className="bg-[#141b3b] text-white ">
        <div className="hidden md:flex items-center justify-center gap-8 py-3 text-sm font-semibold">
          <span className="cursor-pointer hover:text-yellow-200 transition-colors">All Categories</span>
          <span className="cursor-pointer hover:text-yellow-200 transition-colors">Products</span>
          <span className="cursor-pointer hover:text-yellow-200 transition-colors">Blog</span>
          <span className="cursor-pointer hover:text-yellow-200 transition-colors">Contact</span>
          <span className=" text-yellow-200 font-bold">LIMITED SALE 🔥</span>
          <span className="cursor-pointer hover:text-yellow-200 transition-colors">Best Seller</span>
          <span className="cursor-pointer hover:text-yellow-200 transition-colors">New Arrival</span>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden flex flex-col px-6 py-4 space-y-3 bg-red-500 text-white text-base font-medium">
            <span className="cursor-pointer hover:text-yellow-200">All Categories</span>
            <span className="cursor-pointer hover:text-yellow-200">Products</span>
            <span className="cursor-pointer hover:text-yellow-200">Blog</span>
            <span className="cursor-pointer hover:text-yellow-200">Contact</span>
            <hr className="border-white/20" />
            <span className="cursor-pointer text-yellow-200 font-bold">LIMITED SALE 🔥</span>
            <span className="cursor-pointer hover:text-yellow-200">Best Seller</span>
            <span className="cursor-pointer hover:text-yellow-200">New Arrival</span>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navber;
