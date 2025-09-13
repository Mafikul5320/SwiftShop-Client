import React, { useContext } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { Heart, ShoppingCart, Share2 } from "lucide-react";
import { useQuery } from '@tanstack/react-query';
import { Rating } from 'react-simple-star-rating';
import { Link, useParams } from 'react-router';
import { CartContext } from '../Context/CartProvider ';

const CategoryProduct = () => {
    const axiosSucure = useAxiosSecure();
    const { addToCart } = useContext(CartContext)
    const { name } = useParams();
    console.log(name)
    const { data: Products, isLoading } = useQuery({
        queryKey: ["OneCategory"],
        queryFn: async () => {
            const res = await axiosSucure.get(`/category-product?name=${name}`);
            return res.data;
        },
    });
    console.log(Products)
    if (isLoading || !Products) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <p className="text-gray-500 text-lg">Loading product...</p>
            </div>
        );
    }
    return (
        <div>
            <div className='my-4'>
                <h1 className='text-3xl font-bold text-center'>{name}</h1>
                <p className='text-center py-2'>Check & Get Your Desired {name}</p>
            </div>
            <div className='w-11/13 mx-auto my-4'>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 p-6">
                    {Products?.length > 0 ? (
                        Products?.map(oneProduct => {
                            // price calculation with discount
                            const originalPrice = parseFloat(oneProduct?.price);
                            const discount = parseFloat(oneProduct?.discount) || 0;
                            const finalPrice = (originalPrice - (originalPrice * discount / 100)).toFixed(2);
                            const inStock = oneProduct?.stockStatus === "true";
                            console.log(oneProduct);
                            return (
                                <div key={oneProduct?._id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-4 group cursor-pointer relative">
                                    <div className="relative overflow-hidden rounded-xl">
                                        <img
                                            src={oneProduct?.product_img}
                                            alt={oneProduct?.product_name}
                                            className="w-full h-64 object-contain transform group-hover:scale-105 transition duration-500"
                                        />
                                        {discount > 0 && (
                                            <span className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                                                -{discount}%
                                            </span>
                                        )}

                                        <div className="absolute inset-0 flex flex-col items-end justify-center gap-3 pr-3 opacity-0 group-hover:opacity-100 transition duration-300">
                                            <button onClick={() => addToCart(oneProduct, 1)} className="bg-cyan-500 text-white p-2 rounded-full shadow hover:bg-cyan-600 transition transform hover:scale-110">
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

                                    <div className="mt-4 space-y-2">
                                        <p className="text-gray-500 text-sm font-medium">{oneProduct?.categories}</p>
                                        <Link to={`/product-details/${oneProduct?._id}`}>
                                            <h3 className="text-base font-semibold text-[#0A2540] line-clamp-2 hover:text-cyan-500 transition hover:underline">
                                                {oneProduct?.product_name}
                                            </h3>
                                        </Link>

                                        {/* Ratings */}
                                        <div className="flex items-center">
                                            <Rating
                                                readonly
                                                initialValue={oneProduct?.rating}
                                                size={20}
                                                allowFraction
                                                fillColor="#FACC15"
                                                emptyColor="#E5E7EB"
                                                SVGstyle={{ display: "inline-block" }}
                                            />
                                            <span className="text-gray-400 text-xs ml-2">
                                                ({oneProduct?.rating})
                                            </span>
                                        </div>

                                        {/* Price */}
                                        <div className="flex items-center gap-2">
                                            <span className="text-[#0A2540] font-bold text-lg">{finalPrice} tk</span>
                                            {discount > 0 && (
                                                <span className="text-gray-400 line-through text-sm">{originalPrice} tk</span>
                                            )}
                                        </div>

                                        {/* Stock Status */}
                                        <p className={`text-sm font-medium ${inStock ? "text-green-600" : "text-red-600"}`}>
                                            {inStock ? "In Stock" : "Out of Stock"}
                                        </p>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="flex flex-col items-center justify-center col-span-full py-12">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/4076/4076508.png"
                                alt="No Products"
                                className="w-28 h-28 mb-4 opacity-80"
                            />
                            <h2 className="text-xl font-semibold text-gray-700">No Products Found</h2>
                            <p className="text-gray-500 text-sm mt-2 text-center">
                                We couldn’t find any products in this category.
                            </p>
                            <Link
                                to="/all-product"
                                className="mt-4 bg-cyan-500 text-white px-5 py-2 rounded-full shadow hover:bg-cyan-600 transition"
                            >
                                Browse All Products
                            </Link>
                        </div>

                    )}
                </div>

            </div>
        </div>
    );
};

export default CategoryProduct;