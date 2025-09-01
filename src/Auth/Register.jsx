import axios from 'axios';
import React, { useState } from 'react';
import { FaGoogle, FaUser, FaLock, FaImage, FaEnvelope } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import logo from '../assets/Logo.png'
import { CircleX } from 'lucide-react';
import useAxios from '../Hooks/useAxios';

const Register = () => {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [preview, setPreview] = useState(null);
    const Axios = useAxios()
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
    const onSubmit = async (data) => {
        const { displayName, email, password } = data;
        const Register = { displayName, email, password, profile_img: preview, role: "user", Reg_date: new Date().toLocaleDateString() };
        const res = await Axios.post('/user', Register)
        console.log(res.data)
    }
    return (
        <div className="flex items-center justify-center bg-gradient-to-r from-[#08aec3]/10 via-white to-[#08aec3]/10 py-8 p-6">
            <div className="w-[30%] bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-10">
                <div className="flex justify-center py-2 mb-8">
                    <img className="w-42" src={logo} alt="" />
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