import React, { useContext, useEffect, useState } from 'react';
import { Heart, ShoppingCart, Share2, Copy } from "lucide-react";
import { useQuery } from '@tanstack/react-query';
import { Rating } from 'react-simple-star-rating';
import fb from '../assets/fb.png'
import twiter from '../assets/twiter.png'
import whatsapp from '../assets/whatsapp.png'
import { Link } from 'react-router';
import { IoMdHeart } from "react-icons/io";
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { FavoriteContext } from '../Context/FavoriteProvider';
import { CartContext } from '../Context/CartProvider ';

const AllProduct = () => {
    const axiosSecure = useAxiosSecure();
    const { addToCart } = useContext(CartContext);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const { favorite, addFavorite, removeFavorite } = useContext(FavoriteContext);
    const [shareProduct, setShareProduct] = useState(null);
    const [copied, setCopied] = useState(false);
    const [Allproducts, setAllProducts] = useState([]);
    console.log(selectedCategories)

    // const { data: Products } = useQuery({
    //     queryKey: ["Products"],
    //     queryFn: async () => {
    //         const res = await axiosSecure.get("/product");
    //         return res.data;
    //     },
    // });


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                if (selectedCategories.length === 0) {
                    const res = await axiosSecure.get("/product");
                    setAllProducts(res?.data)
                } else {
                    const res = await axiosSecure.get("/products");
                    setAllProducts(res?.data)
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchProducts();
    }, [selectedCategories, axiosSecure]);

    const { data: categories, isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const res = await axiosSecure.get("/categories");
            return res.data;
        },
    });

    // Copy function
    const handleCopy = (url) => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handelChange = (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category]
        );
    }

    return (
        <div className='w-11/12 mx-auto my-4'>
            <div className='my-3'>
                <h1 className='text-4xl font-bold text-center'>All Of Our Products</h1>
                <p className='text-center py-2'>Check & Get Your Desired Products!</p>
            </div>
            <div className='grid grid-cols-11 gap-4 py-9'>
                <div className='col-span-2 border-2'>
                    {categories?.map((cate) => (
                        <label
                            key={cate?._id}
                            className="flex flex-row-reverse items-center justify-end gap-2 mb-2 cursor-pointer"
                        >
                            <span className="text-sm">{cate?.name}</span>
                            <input value={cate?.name} checked={selectedCategories.includes(cate?.name)} onChange={(e) => handelChange(e.target.value)} type="checkbox" className="cursor-pointer checkbox checkbox-sm" />
                        </label>
                    ))}
                </div>
                <div className='col-span-9'>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 ">
                        {Allproducts?.map(oneProduct => {
                            // price calculation with discount
                            const isFavorite = favorite?.some(item => item._id === oneProduct._id);

                            const originalPrice = parseFloat(oneProduct?.price);
                            const discount = parseFloat(oneProduct?.discount) || 0;
                            const finalPrice = (originalPrice - (originalPrice * discount / 100)).toFixed(2);
                            const inStock = oneProduct?.stockStatus === "true";
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

                                        {/* Hover Action Buttons */}
                                        <div className="absolute inset-0 flex flex-col items-end justify-center gap-3 pr-3 opacity-0 group-hover:opacity-100 transition duration-300">
                                            {/* Cart */}
                                            <button
                                                onClick={() => addToCart(oneProduct, 1)}
                                                className="bg-cyan-500 text-white p-2 rounded-full shadow hover:bg-cyan-600 transition transform hover:scale-110"
                                            >
                                                <ShoppingCart size={18} />
                                            </button>

                                            {/* Favorite */}
                                            {isFavorite ? (
                                                <button
                                                    onClick={() => removeFavorite(oneProduct?._id)}
                                                    className="bg-white cursor-pointer text-red-600 p-2 rounded-full shadow hover:bg-gray-100 transition transform hover:scale-110"
                                                >
                                                    <IoMdHeart size={18} />
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => addFavorite(oneProduct, 1)}
                                                    className="bg-white text-cyan-500 p-2 rounded-full shadow hover:bg-gray-100 transition cursor-pointer transform hover:scale-110"
                                                >
                                                    <Heart size={18} />
                                                </button>
                                            )}

                                            {/* Share */}
                                            <button
                                                onClick={() => setShareProduct(oneProduct)}
                                                className="bg-white cursor-pointer text-cyan-500 p-2 rounded-full shadow hover:bg-gray-100 transition transform hover:scale-110"
                                            >
                                                <Share2 size={18} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Product Info */}
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
                                            {inStock ? "In Stock" : "Out of Stock"} ({oneProduct?.quantity})
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Share Modal */}
            {shareProduct && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-lg w-96 p-6 relative">
                        <h2 className="text-xl font-bold text-center mb-4">Share Product</h2>
                        <p className="text-sm text-gray-600 mb-3 text-center">
                            Copy the link or share with friends
                        </p>

                        {/* Link Box */}
                        <div className="flex items-center justify-between border rounded-lg px-3 py-2 bg-gray-50">
                            <span className="truncate text-sm">
                                {window.location.origin}/product-details/{shareProduct._id}
                            </span>
                            <button
                                onClick={() =>
                                    handleCopy(`${window.location.origin}/product-details/${shareProduct._id}`)
                                }
                                className="ml-2 bg-cyan-500 text-white px-3 py-1 rounded-md hover:bg-cyan-600"
                            >
                                {copied ? "Copied!" : <Copy size={16} />}
                            </button>
                        </div>

                        {/* Social share buttons */}
                        <div className="flex justify-center gap-3 mt-5">
                            <a
                                href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.origin}/product-details/${shareProduct._id}`}
                                target="_blank"
                                rel="noreferrer"
                                className="w-10"
                            >
                                <img src={fb} alt="" />
                            </a>
                            <a
                                href={`https://twitter.com/intent/tweet?url=${window.location.origin}/product-details/${shareProduct._id}`}
                                target="_blank"
                                rel="noreferrer"
                                className="w-10"
                            >
                                <img src={twiter} alt="" />
                            </a>
                            <a
                                href={`https://api.whatsapp.com/send?text=${window.location.origin}/product-details/${shareProduct._id}`}
                                target="_blank"
                                rel="noreferrer"
                                className="w-10"
                            >
                                <img src={whatsapp} alt="" />
                            </a>
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={() => setShareProduct(null)}
                            className="absolute cursor-pointer top-3 right-3 text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllProduct;
