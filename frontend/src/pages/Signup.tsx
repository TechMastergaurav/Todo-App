
import { useForm } from "react-hook-form";
import { api } from "../api/client";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const { register, handleSubmit } = useForm();
  const nav = useNavigate();

  const onSubmit = async (data: any) => {
    await api.post("/auth/signup", data);
    nav("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl shadow-xl rounded-2xl p-8 border border-white/40">
        
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Name */}
          <input
            {...register("name")}
            placeholder="Full Name"
            className="w-full p-3 border rounded-xl bg-white focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
          />

          {/* Email */}
          <input
            {...register("email")}
            placeholder="Email Address"
            type="email"
            className="w-full p-3 border rounded-xl bg-white focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
          />

          {/* Password */}
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-xl bg-white focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
          />

          {/* Button */}
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-xl shadow-md"
          >
            Sign Up
          </button>

          <p className="text-center text-sm text-gray-600 pt-2">
            Already have an account?{" "}
            <Link to="/" className="text-blue-600 hover:underline font-medium">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
