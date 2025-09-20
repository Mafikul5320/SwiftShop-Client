import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Upload, Package } from "lucide-react";
import axios from "axios";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import Swal from "sweetalert2";

const UpdateProduct = () => {
    const [previewImages, setPreviewImages] = useState([]);
    const axiosSecure = useAxiosSecure();
    const { id } = useParams();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();


    const { data: OneProduct, isLoading } = useQuery({
        queryKey: ["OneProduct", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/oneproduct?id=${id}`);
            return res.data;
        },
    });

    const { data: categories, } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const res = await axiosSecure.get("/categories");
            return res.data;
        },
    });
    console.log(categories)
    useEffect(() => {
        if (OneProduct) {
            reset(OneProduct);

            if (Array.isArray(OneProduct?.product_img)) {
                setPreviewImages(OneProduct.product_img);
            } else if (OneProduct?.product_img) {
                setPreviewImages([OneProduct.product_img]);
            } else {
                setPreviewImages([]);
            }
        }
    }, [OneProduct, reset]);

    const handleImagePreview = async (e) => {
        const files = Array.from(e.target.files);
        if (!files.length) return;

        const uploadedImages = [];
        for (let file of files) {
            const formData = new FormData();
            formData.append("image", file);

            try {
                const upload = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imagebb_key}`,
                    formData
                );
                uploadedImages.push(upload.data.data.url);
            } catch (err) {
                console.error("Image upload error:", err);
            }
        }

        setPreviewImages((prev) => [...prev, ...uploadedImages]);
    };

    const onSubmit = async (data) => {
        const { product_name, slug, price, discount, stockStatus, categories, description, status, rating, quantity } = data;

        const updatedProduct = {
            product_name,
            slug,
            price,
            rating,
            discount,
            stockStatus,
            quantity: Number(quantity),
            categories,
            description,
            status,
            product_img: previewImages,
            updatedAt: new Date().toLocaleDateString(),
        };
        console.log(updatedProduct)
        try {
            const res = await axiosSecure.put(`/updateproduct/${id}`, updatedProduct);
            console.log("Updated Product:", res.data.result.modifiedCount);
            if (res.data.result.modifiedCount) {
                Swal.fire({
                    title: "Product update sucessfull",
                    icon: "success",
                    draggable: true
                });
            }
        } catch (err) {
            console.error("Update failed:", err);
        }
    };

    if (isLoading) {
        return <p className="text-center text-gray-500">Loading product...</p>;
    }

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">
            {/* Title */}
            <div className="flex items-center gap-2 mb-6">
                <Package className="w-7 h-7 text-green-600" />
                <h2 className="text-2xl font-bold text-gray-800">Update Product</h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Name */}
                <div>
                    <label className="block mb-2 font-medium">Product Name</label>
                    <input
                        type="text"
                        placeholder="Enter product name"
                        {...register("product_name", { required: "Product name is required" })}
                        className="input input-bordered w-full"
                    />
                    {errors.product_name && <p className="text-red-500 text-sm mt-1">{errors.product_name.message}</p>}
                </div>

                {/* Slug */}
                <div>
                    <label className="block mb-2 font-medium">Slug</label>
                    <input
                        type="text"
                        placeholder="product-slug"
                        {...register("slug", { required: "Slug is required" })}
                        className="input input-bordered w-full"
                    />
                    {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>}
                </div>

                {/* Price */}
                <div>
                    <label className="block mb-2 font-medium">Price ($)</label>
                    <input
                        type="number"
                        {...register("price", { required: "Price is required" })}
                        className="input input-bordered w-full"
                    />
                    {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
                </div>

                {/* Discount */}
                <div>
                    <label className="block mb-2 font-medium">Discount (%)</label>
                    <input type="number" {...register("discount")} className="input input-bordered w-full" />
                </div>

                {/* Stock Status */}
                <div>
                    <label className="block mb-2 font-medium">Stock Status</label>
                    <select {...register("stockStatus", { required: true })} className="select select-bordered w-full">
                        <option value="true">In Stock</option>
                        <option value="false">Out of Stock</option>
                    </select>
                </div>
                {/* Quantity */}
                <div>
                    <label className="block mb-2 font-medium">Quantity</label>
                    <input
                        type="number"
                        placeholder="0"
                        {...register("quantity", {
                            min: { value: 0, message: "Quantity cannot be negative" }
                        })}
                        className="input input-bordered w-full"
                    />
                    {errors.discount && <p className="text-red-500 text-sm mt-1">{errors.discount.message}</p>}
                </div>
                {/* Status */}
                <div>
                    <label className="block mb-2 font-medium">Product Status</label>
                    <select {...register("status", { required: true })} className="select select-bordered w-full">
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>

                {/* Categories */}
                <div>
                    <label className="block mb-2 font-medium">Categories</label>
                    <select {...register("categories", { required: "Category is required" })} className="select select-bordered w-full">
                        {
                            categories?.map(cate => (<option key={cate?._id} value={cate?.name}>{cate?.name}</option>))
                        }
                    </select>
                </div>
                {/* Rating */}
                <div>
                    <label className="block mb-2 font-medium">Rating</label>
                    <input
                        type="number"
                        step="0.1"
                        {...register("rating", {
                            valueAsNumber: true,
                            min: { value: 0, message: "Rating must be at least 0" },
                            max: { value: 5, message: "Rating must be a maximum of 5" },
                        })}
                        className="input input-bordered w-full"
                    />
                    {errors.rating && (
                        <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>
                    )}
                </div>


                {/* Description */}
                <div className="md:col-span-2">
                    <label className="block mb-2 font-medium">Description</label>
                    <textarea
                        rows={4}
                        {...register("description", { required: "Description is required" })}
                        className="textarea textarea-bordered w-full"
                    />
                </div>

                {/* Upload Multiple Images */}
                <div className="md:col-span-2">
                    <label className="block mb-2 font-medium">Upload Product Photos</label>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImagePreview}
                        className="file-input file-input-bordered w-full"
                    />

                    {/* Preview Images */}
                    {previewImages?.length > 0 && (
                        <div className="flex flex-wrap gap-3 mt-3">
                            {previewImages.map((img, i) => (
                                <img key={i} src={img} alt={`Preview ${i}`} className="w-24 h-24 object-cover rounded-lg border" />
                            ))}
                        </div>
                    )}
                </div>

                {/* Submit */}
                <div className="md:col-span-2 flex justify-end ">
                    <button type="submit" className="btn btn-success px-6 text-white font-bold">
                        <Upload className="w-5 h-5 mr-2" /> Update Product
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateProduct;
