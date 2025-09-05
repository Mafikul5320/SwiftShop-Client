import React from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AllProducts = () => {

    const axiosSucure = useAxiosSecure();

    const { data: Products } = useQuery({
        queryKey: ["Products"],
        queryFn: async () => {
            const res = await axiosSucure.get("/product");
            return res.data;
        },
    });
    console.log(Products)
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
                <h1 className="text-2xl font-bold text-gray-800">All Products</h1>
                <div className="flex items-center gap-3">
                    <span className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full">
                        Total: {Products?.length}
                    </span>
                    <button className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow">
                        + Add Product
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-100">
                <table className="w-full border-collapse">
                    <thead className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wide">
                        <tr>
                            <th className="text-left px-6 py-3">Product</th>
                            <th className="text-left px-6 py-3">Category</th>
                            <th className="text-left px-6 py-3">Price</th>
                            <th className="text-left px-6 py-3">Stock</th>
                            <th className="text-left px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm text-gray-700">
                        {Products?.map((product) => (
                            <tr
                                key={product._id}
                                className="border-t border-gray-200 hover:bg-gray-50 transition"
                            >
                                {/* Product Info */}
                                <td className="px-6 py-4 flex items-center gap-3">
                                    <img
                                        src={product.product_img}
                                        alt={product.product_name}
                                        className="w-12 h-12 rounded-lg object-cover border"
                                    />
                                    <div>
                                        <p className="font-medium text-gray-900">{product.product_name}</p>
                                    </div>
                                </td>

                                {/* Category */}
                                <td className="px-6 py-4">
                                    <span className="px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-700 rounded-full">
                                        {product.categories}
                                    </span>
                                </td>

                                {/* Price */}
                                <td className="px-6 py-4 font-semibold text-gray-800">
                                    ${product.price}
                                </td>

                                {/* Stock */}
                                <td className="px-6 py-4">
                                    {product?.stockStatus === "true" ? <span className="px-3 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                                        In Stock 
                                    </span> : <span className="px-3 py-1 text-xs font-medium text-red-700 bg-red-100 rounded-full">
                                        Out of Stock
                                    </span>}
                                </td>

                                {/* Actions */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        {/* View */}

                                        <Link to={`/product-details/${product?._id}`}><button className="p-2 rounded-full border border-gray-200 text-gray-600 
                 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 
                 transition shadow-sm"
                                            title="View"
                                        >
                                            <Eye size={16} />
                                        </button></Link>
                                        {/* Edit */}
                                        <button className="p-2 rounded-full border border-gray-200 text-gray-600 
                 hover:text-yellow-600 hover:border-yellow-300 hover:bg-yellow-50  transition shadow-sm" title="Edit">
                                            <Pencil size={16} />
                                        </button>

                                        {/* Delete */}
                                        <button className="p-2 rounded-full border border-gray-200 text-gray-600 hover:text-red-600 hover:border-red-300 hover:bg-red-50 transition shadow-sm"
                                            title="Delete"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default AllProducts;
