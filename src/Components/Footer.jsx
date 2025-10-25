import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import logo from "../assets/Logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#0f162b] text-gray-300 relative overflow-hidden">
      {/* Soft gradient glow background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#08aec3]/10 via-transparent to-[#08aec3]/5 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 py-14 grid sm:grid-cols-2 md:grid-cols-4 gap-12 relative z-10">
        {/* Logo + About */}
        <div>
          <img className="w-48 mb-4" src={logo} alt="SwiftShop Logo" />
          <p className="text-sm leading-6 text-gray-400">
            SwiftShop is your one-stop destination for the latest products at
            the best prices. Shop smarter, faster, and better with us.
          </p>
        </div>

        {/* Shop Links */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-5 relative after:content-[''] after:block after:w-10 after:h-[2px] after:bg-[#08aec3] after:mt-2">
            Shop
          </h2>
          <ul className="space-y-3 text-sm">
            <li className="hover:text-[#08aec3] cursor-pointer transition">All Categories</li>
            <li className="hover:text-[#08aec3] cursor-pointer transition">Best Sellers</li>
            <li className="hover:text-[#08aec3] cursor-pointer transition">New Arrivals</li>
            <li className="hover:text-[#08aec3] cursor-pointer transition">Limited Sale 🔥</li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-5 relative after:content-[''] after:block after:w-10 after:h-[2px] after:bg-[#08aec3] after:mt-2">
            Support
          </h2>
          <ul className="space-y-3 text-sm">
            <li className="hover:text-[#08aec3] cursor-pointer transition">Contact Us</li>
            <li className="hover:text-[#08aec3] cursor-pointer transition">FAQ</li>
            <li className="hover:text-[#08aec3] cursor-pointer transition">Shipping & Returns</li>
            <li className="hover:text-[#08aec3] cursor-pointer transition">Privacy Policy</li>
          </ul>
        </div>

        {/* Subscribe Section */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-5 relative after:content-[''] after:block after:w-10 after:h-[2px] after:bg-[#08aec3] after:mt-2">
            Stay Updated
          </h2>
          <p className="text-sm mb-4 text-gray-400">
            Subscribe to get special offers and the latest news.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 w-full bg-gray-100 text-gray-800 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#08aec3]"
            />
            <button className="bg-[#08aec3] hover:bg-[#0698a8] px-5 rounded-r-lg text-white font-medium transition">
              Subscribe
            </button>
          </div>

          <div className="flex gap-5 mt-6">
            <a href="#" className="hover:text-[#08aec3] transition">
              <FaFacebookF size={18} />
            </a>
            <a href="#" className="hover:text-[#08aec3] transition">
              <FaTwitter size={18} />
            </a>
            <a href="#" className="hover:text-[#08aec3] transition">
              <FaInstagram size={18} />
            </a>
            <a href="#" className="hover:text-[#08aec3] transition">
              <FaLinkedinIn size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 py-5 text-center text-sm text-gray-400 relative z-10">
        © {new Date().getFullYear()} <span className="text-[#08aec3] font-medium">SwiftShop</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;