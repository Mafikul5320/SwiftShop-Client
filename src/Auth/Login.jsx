import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaGoogle, FaEnvelope, FaLock } from "react-icons/fa";
import { data } from 'react-router';

const Login = () => {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const onSubmit = (data) => { }
    console.log(data)
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#ece9ff] to-[#f5f0ff] p-6">
            <div className="w-[30%] bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-10">

                {/* Logo */}
                <div className="flex justify-center py-2">
                    <img className="h-17 w-17 rounded-lg" src={"logo"} alt="Logo" />
                </div>

                {/* Title */}
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
                    Login
                </h2>
                <p className="text-sm text-center text-gray-500 mb-8">
                    Welcome back! Please enter your details.
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

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

                    {/* Password */}
                    <div>
                        <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 shadow-sm">
                            <FaLock className="text-gray-400 mr-2" />
                            <input
                                type="password"
                                {...register("password", { required: "Password is required" })}
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

                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-600 to-teal-500 text-white py-3 rounded-lg font-semibold shadow-lg hover:opacity-90 transition-all"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                {/* Social Login */}
                {/* <div className="mt-8">
          <p className="text-center text-gray-500 text-sm mb-4">Or login with</p>
          <div className="flex flex-col gap-3">
            <button onClick={handelLogin} className="flex items-center justify-center border border-gray-200 py-2 rounded-lg bg-white shadow-sm hover:shadow-md transition font-semibold">
              <svg
                aria-label="Google logo"
                width="21"
                height="21"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              <span className="pl-1">Login with Google</span>
            </button>
          </div>
        </div> */}

                {/* Register Link */}
                <p className="text-center text-sm mt-8 text-gray-600">
                    Don’t have an account?{" "}
                    <a
                        href="/register"
                        className="text-purple-600 font-medium hover:underline"
                    >
                        Create one
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;