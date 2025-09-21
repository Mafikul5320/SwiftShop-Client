import React from "react";
import { Link } from "react-router";
import { Trash2 } from "lucide-react";

const FavoriteItems = () => {
    const items = JSON.parse(localStorage.getItem("favorite")) || [];

    const removeFavorite = (id) => {
        const updated = items.filter((item) => item._id !== id);
        localStorage.setItem("favorite", JSON.stringify(updated));
        window.location.reload();
    };

    return (
        <div className="">
            <h1 className="text-3xl bg-[#08aec3] backdrop-blur-md py-6 text-white font-bold text-center  my-6 ">
                My Favorite Items
            </h1>

            <div className="w-11/12 mx-auto my-6">
                {items.length === 0 ? (
                    <p className="text-center text-gray-500">No favorite items found!</p>
                ) : (
                    <div className="space-y-6">
                        {items.map((oneProduct) => {
                            const originalPrice = parseFloat(oneProduct?.price);
                            const discount = parseFloat(oneProduct?.discount) || 0;
                            const finalPrice = (
                                originalPrice -
                                (originalPrice * discount) / 100
                            ).toFixed(2);

                            return (
                                <div
                                    key={oneProduct?._id}
                                    className="flex flex-col md:flex-row items-center gap-6 bg-white rounded-2xl shadow hover:shadow-lg transition-all duration-300 p-5"
                                >
                                    {/* Image */}
                                    <div className="w-full md:w-1/3 flex justify-center">
                                        <img
                                            src={oneProduct?.product_img}
                                            alt={oneProduct?.product_name}
                                            className="h-40 object-contain rounded-lg"
                                        />
                                    </div>

                                    {/* Details */}
                                    <div className="flex-1 space-y-2 text-center md:text-left">
                                        <p className="text-gray-400 text-sm">{oneProduct?.categories}</p>
                                        <Link
                                            to={`/product-details/${oneProduct?._id}`}
                                            className="text-lg font-semibold text-[#0A2540] hover:text-cyan-500 hover:underline line-clamp-1"
                                        >
                                            {oneProduct?.product_name}
                                        </Link>

                                        <div className="flex flex-col md:flex-row items-center gap-3">
                                            <span className="text-[#0A2540] font-bold text-lg">
                                                {finalPrice} tk
                                            </span>
                                            {discount > 0 && (
                                                <span className="text-gray-400 line-through text-sm">
                                                    {originalPrice} tk
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => removeFavorite(oneProduct?._id)}
                                            className="bg-red-100 cursor-pointer text-red-600 p-3 rounded-full shadow hover:bg-red-200 transition"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FavoriteItems;
