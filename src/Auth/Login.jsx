import React, { use, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEnvelope, FaLock } from "react-icons/fa";
import logo from '../assets/Logo.png'
import { CircleX } from 'lucide-react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const Login = () => {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const { Login } = use(AuthContext);
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const onSubmit = async (data) => {
        const { email, password } = data;

        // আগে check করা ঠিক না, কারণ login এর পরেই user state সেট হবে
        // if (user) { navigate("/") } এখানে কাজ করবে না

        const success = await Login(email, password);
        console.log(success)

        if (success) {
            navigate("/");
            Swal.fire({
                icon: "success",
                title: "Login Sucessfull",
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            alert("Invalid email or password");
        }
    };

    return (
<div className="flex items-center justify-center bg-gradient-to-r from-[#08aec3]/10 via-white to-[#08aec3]/10 p-6 my-8">
  <div className="w-full max-w-md sm:max-w-lg md:w-[60%] lg:w-[40%] xl:w-[30%] bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10">
    
    {/* Logo */}
    <div className="flex justify-center py-2 mb-6 sm:mb-8">
      <img className="w-28 sm:w-36 md:w-42" src={logo} alt="Logo" />
    </div>

    {/* Title */}
    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-2">
      Login
    </h2>
    <p className="text-sm text-center text-gray-500 mb-6 sm:mb-8">
      Welcome back! Please enter your details.
    </p>

    {/* Form */}
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">

      {/* Email */}
      <div>
        <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 shadow-sm">
          <FaEnvelope className="text-gray-400 mr-2" />
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full py-2 outline-none bg-transparent text-sm sm:text-base"
            placeholder="Email Address"
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-xs sm:text-sm flex items-center gap-1 mt-1">
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
            className="w-full py-2 outline-none bg-transparent text-sm sm:text-base"
            placeholder="Password"
          />
        </div>
        {errors.password && (
          <p className="text-red-500 text-xs sm:text-sm flex items-center gap-1 mt-1">
            <CircleX size={12} /> {errors.password.message}
          </p>
        )}
      </div>

      {/* Login Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full cursor-pointer bg-gradient-to-r from-blue-600 to-teal-500 text-white py-2 sm:py-3 rounded-lg font-semibold shadow-lg hover:opacity-90 transition-all text-sm sm:text-base"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>

    {/* Register Link */}
    <p className="text-center text-xs sm:text-sm mt-6 sm:mt-8 text-gray-600">
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