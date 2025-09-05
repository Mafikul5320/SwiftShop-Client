import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import logo from '../assets/Logo.png'

const Footer = () => {
  
  return (
    <footer className="bg-[#141b3b] text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-10">

        <div>
          <img className="w-52 mb-3" src={logo} alt="" />
          <p className="text-sm leading-6">
            SwiftShop is your one-stop destination for the latest products at
            the best prices. Shop smarter, faster, and better with us.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Shop</h2>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-[#08aec3] cursor-pointer">All Categories</li>
            <li className="hover:text-[#08aec3] cursor-pointer">Best Sellers</li>
            <li className="hover:text-[#08aec3] cursor-pointer">New Arrivals</li>
            <li className="hover:text-[#08aec3] cursor-pointer">Limited Sale 🔥</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Support</h2>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-[#08aec3] cursor-pointer">Contact Us</li>
            <li className="hover:text-[#08aec3] cursor-pointer">FAQ</li>
            <li className="hover:text-[#08aec3] cursor-pointer">Shipping & Returns</li>
            <li className="hover:text-[#08aec3] cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Stay Updated</h2>
          <p className="text-sm mb-3">Subscribe to get special offers and latest news.</p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 w-full bg-white rounded-l-lg focus:outline-none text-gray-800"
            />
            <button className="bg-[#08aec3] hover:bg-[#06a0b4] px-5 rounded-r-lg text-white font-medium">
              Subscribe
            </button>
          </div>

          <div className="flex gap-4 mt-6">
            <a href="#" className="hover:text-[#08aec3]"><FaFacebookF /></a>
            <a href="#" className="hover:text-[#08aec3]"><FaTwitter /></a>
            <a href="#" className="hover:text-[#08aec3]"><FaInstagram /></a>
            <a href="#" className="hover:text-[#08aec3]"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 py-4 text-center text-sm">
        © {new Date().getFullYear()} SwiftShop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
