import { useForm } from "react-hook-form";
import { api } from "../api/client";
import { useAuth } from "../store/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const setToken = useAuth((s) => s.setToken);
  const nav = useNavigate();

  const onSubmit = async (data: any) => {
    const res = await api.post("/auth/login", data);
    setToken(res.data.token);
    nav("/todos");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-8">

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Email */}
          <input
            {...register("email")}
            placeholder="Email Address"
            type="email"
            className="w-full p-3 border rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {/* Password */}
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {/* Login Button */}
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-xl shadow-md"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <Link to="/signup" className="text-blue-600 hover:underline font-medium">
            Create an account
          </Link>
          <span className="mx-2 text-gray-400">•</span>
          <Link to="/forgot" className="text-blue-600 hover:underline font-medium">
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
}
