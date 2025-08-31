import React from 'react';
import { Heart, ShoppingCart, Share2, Star } from "lucide-react";

const FeaturedProduct = () => {
    return (
        <div className='w-11/13 mx-auto my-4'>
            <h1 className='text-3xl font-bold'>Featured Product</h1>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 p-6">

{/* Hover Effect Card */}
<div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-4 group cursor-pointer relative">
  {/* Product Image */}
  <div className="relative overflow-hidden rounded-xl">
    <img
      src="https://p4-ofp.static.pub//fes/cms/2024/05/20/bck35fhess1td0jtxhbqx1a2s9ofzk318843.png"
      alt="Laptop"
      className="w-full h-64 object-contain transform group-hover:scale-105 transition duration-500"
    />
    {/* Discount Badge */}
    <span className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
      -50%
    </span>

    {/* Hover Icons */}
    <div className="absolute inset-0 flex flex-col items-end justify-center gap-3 pr-3 opacity-0 group-hover:opacity-100 transition duration-300">
      <button className="bg-cyan-500 text-white p-2 rounded-full shadow hover:bg-cyan-600 transition transform hover:scale-110">
        <ShoppingCart size={18} />
      </button>
      <button className="bg-white text-cyan-500 p-2 rounded-full shadow hover:bg-gray-100 transition transform hover:scale-110">
        <Heart size={18} />
      </button>
      <button className="bg-white text-cyan-500 p-2 rounded-full shadow hover:bg-gray-100 transition transform hover:scale-110">
        <Share2 size={18} />
      </button>
    </div>
  </div>

  {/* Product Info */}
  <div className="mt-4 space-y-2">
    <p className="text-gray-500 text-sm font-medium">LAPTOP</p>
    <h3 className="text-base font-semibold text-[#0A2540] line-clamp-2 hover:text-cyan-500 transition hover:underline">
      S21 Laptop Ultra HD LED Screen Feature 2023
    </h3>

    {/* Ratings */}
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          className="text-amber-500 fill-amber-500"
        />
      ))}
      <span className="text-gray-400 text-xs ml-2">(100)</span>
    </div>

    {/* Price */}
    <div className="flex items-center gap-2">
      <span className="text-[#0A2540] font-bold text-lg">$1,199.00</span>
      <span className="text-gray-400 line-through text-sm">$2,399.00</span>
    </div>
  </div>
</div>

    </div>
        </div>
    );
};

export default FeaturedProduct;