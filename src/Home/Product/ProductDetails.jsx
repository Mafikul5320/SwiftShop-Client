import React, {  useContext, useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Heart, ShoppingCart, Share2 } from "lucide-react";
import { Rating } from "react-simple-star-rating";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { CartContext } from "../../Context/CartProvider ";

const ProductDetails = () => {
    const axiosSecure = useAxiosSecure();
    const params = useParams();
    const [activeImage, setActiveImage] = useState(null);
  const { addToCart } = useContext(CartContext)
    const { data: product, isLoading } = useQuery({
        queryKey: ["Singleproduct", params],
        queryFn: async () => {
            const res = await axiosSecure.get(`/product-details/${params?.id}`);
            return res.data;
        },
    });

    if (isLoading || !product) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <p className="text-gray-500 text-lg">Loading product details...</p>
            </div>
        );
    }

    const images = Array.isArray(product.product_img)
        ? product.product_img
        : [product.product_img];
    const originalPrice = parseFloat(product.price);
    const discount = parseFloat(product.discount) || 0;
    const finalPrice = (originalPrice - (originalPrice * discount) / 100).toFixed(2);
    const inStock = product.stockStatus === "true";

    return (
        <div className="w-11/12 mx-auto my-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
                <div className="bg-white rounded-2xl shadow-md p-6 flex justify-center">
                    <img
                        src={activeImage || images[0]}
                        alt={product.product_name}
                        className="w-full max-w-md h-[450px] object-contain rounded-lg"
                    />
                </div>

                <div className="flex gap-4 mt-4 justify-center">
                    {images.map((img, idx) => (
                        <img
                            key={idx}
                            src={img}
                            onClick={() => setActiveImage(img)}
                            className={`w-20 h-20 object-contain border rounded-lg cursor-pointer transition ${activeImage === img ? "border-cyan-500 ring-2 ring-cyan-500" : "border-gray-200"
                                }`}
                        />
                    ))}
                </div>
            </div>

            <div className="space-y-6">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    {product.categories}
                </p>
                <h1 className="text-3xl font-bold text-[#0A2540]">{product.product_name}</h1>

                <div className="flex items-center">
                    <Rating
                        readonly
                        initialValue={(product?.rating)}
                        size={20}
                        allowFraction
                        fillColor="#FACC15"
                        emptyColor="#E5E7EB"
                        SVGstyle={{ display: "inline-block" }}
                    />
                    <span className="text-gray-400 text-xs ml-2">
                        ({product?.rating})
                    </span>
                </div>

                <div className="flex items-center gap-4">
                    <span className="text-2xl font-bold text-[#0A2540]">{finalPrice} TK</span>
                </div>

                <p className={`text-sm font-medium ${inStock ? "text-green-600" : "text-red-600"}`}>
                    {inStock ? "In Stock" : "Out of Stock"}
                </p>

                <p className="text-gray-600 leading-relaxed">{product.description}</p>

                <div className="flex items-center gap-4 mt-6">
                    <button
                        disabled={!inStock}
                        onClick={() => addToCart(product, 1)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-white font-medium shadow-md transition ${inStock ? "bg-cyan-600 hover:bg-cyan-700" : "bg-gray-400 cursor-not-allowed"
                            }`}
                    >
                        <ShoppingCart size={20} />
                        {inStock ? "Add to Cart" : "Out of Stock"}
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gray-100 text-cyan-600 font-medium shadow hover:bg-gray-200 transition">
                        <Heart size={20} /> Wishlist
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gray-100 text-cyan-600 font-medium shadow hover:bg-gray-200 transition">
                        <Share2 size={20} /> Share
                    </button>
                </div>

                <div className="mt-8 border-t pt-6 space-y-2 text-sm text-gray-500">
                    <p><span className="font-semibold">SKU:</span> {product.slug}</p>
                    <p><span className="font-semibold">Added on:</span> {product.date}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
