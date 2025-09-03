import { useForm } from "react-hook-form";
import { useState } from "react";
import { Upload, Package } from "lucide-react";
import axios from "axios";

const AddProduct = () => {
    const [previewImages, setPreviewImages] = useState([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const onSubmit = (data) => {
        console.log("Product Data:", data);
        alert("✅ Product Added Successfully!");
        reset();
        setPreviewImages([]);
    };

    const handleImagePreview = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);

        try {
            const upload = await axios.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imagebb_key}`,
                formData
            );

            setPreviewImages(upload.data.data.url);
        } catch (err) {
            console.error("Image upload error:", err);
        }
    };

    console.log(previewImages)
    return (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">
            {/* Title */}
            <div className="flex items-center gap-2 mb-6">
                <Package className="w-7 h-7 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-800">Add New Product</h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Name */}
                <div>
                    <label className="block mb-2 font-medium">Product Name</label>
                    <input
                        type="text"
                        placeholder="Enter product name"
                        {...register("name", { required: "Product name is required" })}
                        className="input input-bordered w-full"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
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
                        placeholder="0.00"
                        {...register("price", {
                            required: "Price is required",
                            min: { value: 1, message: "Price must be at least $1" }
                        })}
                        className="input input-bordered w-full"
                    />
                    {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
                </div>

                {/* Discount */}
                <div>
                    <label className="block mb-2 font-medium">Discount (%)</label>
                    <input
                        type="number"
                        placeholder="0"
                        {...register("discount", {
                            min: { value: 0, message: "Discount cannot be negative" },
                            max: { value: 90, message: "Discount cannot exceed 90%" }
                        })}
                        className="input input-bordered w-full"
                    />
                    {errors.discount && <p className="text-red-500 text-sm mt-1">{errors.discount.message}</p>}
                </div>

                {/* Stock Status */}
                <div>
                    <label className="block mb-2 font-medium">Stock Status</label>
                    <select {...register("stockStatus", { required: true })} className="select select-bordered w-full">
                        <option value="true">In Stock</option>
                        <option value="false">Out of Stock</option>
                    </select>
                    {errors.stockStatus && <p className="text-red-500 text-sm mt-1">Stock status is required</p>}
                </div>

                {/* Status */}
                <div>
                    <label className="block mb-2 font-medium">Product Status</label>
                    <select {...register("status", { required: true })} className="select select-bordered w-full">
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                    {errors.status && <p className="text-red-500 text-sm mt-1">Status is required</p>}
                </div>

                {/* Categories */}
                <div className="md:col-span-2">
                    <label className="block mb-2 font-medium">Categories</label>
                    <input
                        type="text"
                        placeholder="e.g. Electronics, Mobile"
                        {...register("categories", { required: "Category is required" })}
                        className="input input-bordered w-full"
                    />
                    {errors.categories && <p className="text-red-500 text-sm mt-1">{errors.categories.message}</p>}
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                    <label className="block mb-2 font-medium">Description</label>
                    <textarea
                        rows={4}
                        placeholder="Enter product description"
                        {...register("description", { required: "Description is required" })}
                        className="textarea textarea-bordered w-full"
                    />
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                </div>

                {/* Upload Multiple Images */}
                <div className="md:col-span-2">
                    <label className="block mb-2 font-medium">Upload Product Photos</label>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        {...register("photos", { required: "At least one photo is required" })}
                        onChange={handleImagePreview}
                        className="file-input file-input-bordered w-full"
                    />
                    {errors.photos && <p className="text-red-500 text-sm mt-1">{errors.photos.message}</p>}

                    {/* Image Preview */}
                    {previewImages && (
                        <div className="flex flex-wrap gap-3 mt-3">
                            <img
                                src={previewImages}
                                alt="Preview"
                                className="w-24 h-24 object-cover rounded-lg border"
                            />
                        </div>
                    )}

                </div>

                {/* Submit Button */}
                <div className="md:col-span-2 flex justify-end">
                    <button type="submit" className="btn btn-primary px-6">
                        <Upload className="w-5 h-5 mr-2" /> Add Product
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
