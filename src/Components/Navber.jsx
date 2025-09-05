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
  const { totalItems } = useContext(CartContext)
  return (
    <nav className="w-full bg-gray-100 shadow-md sticky top-0 z-50">
      <div className="flex justify-between items-center w-11/13 mx-auto py-4">
        <div className="text-2xl font-extrabold tracking-wide ">
          <img className="w-52" src={logo} alt="" />
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
          <div className="drawer drawer-end">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              {/* Page content here */}
              <label htmlFor="my-drawer-4" className="drawer-button ">          <div className="flex items-center gap-2 cursor-pointer hover:text-red-500 transition-colors">
                <div className="bg-[#08aec3] p-3 rounded-lg text-white hover:bg-[#077786] transition">
                  <MdAddShoppingCart size={24} />
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
                    { totalItems}
                  </span>
                </div>
              </div></label>
            </div>
            <ShopCart></ShopCart>
          </div>

          {/* User */}
          <Link to={"/login"}><div className="flex items-center gap-2 cursor-pointer hover:text-red-500 transition-colors">
            <FaUser className="text-xl" />
            {User ? <button className="btn btn-error" onClick={Logout}>Log Out</button> : <span className="hidden md:inline">Account</span>}
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
          <Link to={"/"}><span className="cursor-pointer hover:text-yellow-200 transition-colors">Home</span></Link>
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
