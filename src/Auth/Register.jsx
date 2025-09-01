import axios from 'axios';
import React, { useState } from 'react';
import { FaGoogle, FaUser, FaLock, FaImage, FaEnvelope } from "react-icons/fa";
import { useForm } from 'react-hook-form';

const Register = () => {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [preview, setPreview] = useState(null);
    const [RegLoading, setregLoading] = useState(false)
    const handleImageChange = async (e) => {
        const image = e.target.files[0];
        if (!image) return;
        const formData = new FormData();
        formData.append("image", image);

        try {
            const upload = await axios.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imagebb_key}`,
                formData
            );
            setPreview(upload.data.data.url);
        } catch (err) {
            console.error(err);

        }
    };
    const onSubmit = (data) => {
        console.log(data)
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#ece9ff] to-[#f5f0ff] p-6">
            <div className="w-[30%] bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-10">
                <div className="flex justify-center py-2">
                    {/* <img className="h-17 w-17 rounded-lg" src={logo} alt="" /> */}
                    SWiftShop
                </div>
                {/* Title */}
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
                    Create Account
                </h2>
                <p className="text-sm text-center text-gray-500 mb-8">
                    Start your journey with us. It only takes a few moments.
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                    {/* Name */}
                    <div>
                        <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 shadow-sm">
                            <FaUser className="text-gray-400 mr-2" />
                            <input
                                type="text"
                                {...register("displayName", { required: "Name is required" })}
                                className="w-full py-2 outline-none bg-transparent"
                                placeholder="Full Name"
                            />
                        </div>
                        {errors.displayName && (
                            <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
                                <CircleX size={12} /> {errors.displayName.message}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 shadow-sm">
                            <FaEnvelope className="text-gray-400 mr-2" />
                            <input
                                type="email"
                                {...register("email", { required: "Email is required" })}
                                className="w-full py-2 outline-none bg-transparent"
                                placeholder="Email Address"
                            />
                        </div>
                        {errors.email && (
                            <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
                                <CircleX size={12} /> {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Profile Image */}
                    <div>
                        <div className="flex items-center gap-4">
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-12 h-12 rounded-full object-cover shadow"
                                />
                            ) : (
                                <div className="p-3 flex items-center justify-center rounded-full bg-gray-100 border border-gray-400 shadow">
                                    <FaImage className="text-gray-400" />
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                {...register("profile_img", { required: "Image is required" })}
                                onChange={handleImageChange}
                                className="block w-full text-sm text-gray-500"
                            />
                        </div>
                        {errors.profile_img && (
                            <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
                                <CircleX size={12} /> {errors.profile_img.message}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 shadow-sm">
                            <FaLock className="text-gray-400 mr-2" />
                            <input
                                type="password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Min length 6" },
                                })}
                                className="w-full py-2 outline-none bg-transparent"
                                placeholder="Password"
                            />
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
                                <CircleX size={12} /> {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Register Button */}
                    <button
                        type="submit"
                        disabled={RegLoading}
                        className="w-full bg-gradient-to-r from-blue-600 to-teal-500 text-white py-3 rounded-lg font-semibold shadow-lg hover:opacity-90 transition-all"
                    >
                        {RegLoading ? "Registering..." : "Register"}
                    </button>
                </form>

                {/* Social Login */}
                <div className="mt-8">
                    <p className="text-center text-gray-500 text-sm mb-4">Or login with</p>
                    <div className="flex flex-col gap-3">
                        <button onClick={"handelLogin"} className="flex items-center justify-center border border-gray-200 py-2 rounded-lg bg-white shadow-sm hover:shadow-md transition font-semibold">
                            <svg aria-label="Google logo" width="21" height="21" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg> <span className="pl-1">Login with Google</span>
                        </button>
                    </div>
                </div>

                {/* Login Link */}
                <p className="text-center text-sm mt-8 text-gray-600">
                    Already have an account?{" "}
                    <a href="/login" className="text-purple-600 font-medium hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Register;