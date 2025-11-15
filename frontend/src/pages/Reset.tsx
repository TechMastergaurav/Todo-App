import { useForm } from "react-hook-form";
import { api } from "../api/client";
import { useNavigate, useLocation } from "react-router-dom";

export default function Reset() {
  const { register, handleSubmit } = useForm();
  const nav = useNavigate();
  const location = useLocation();

 
  const email = location.state?.email;

  
  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="p-8 bg-white rounded-xl shadow text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-4">
            Email missing!
          </h2>
          <p className="text-gray-600 mb-4">
            Please go back to Forgot Password page.
          </p>
          <button
            onClick={() => nav("/forgot")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Go to Forgot Password
          </button>
        </div>
      </div>
    );
  }

  const onSubmit = async (data: any) => {
    try {
      await api.post("/auth/reset", {
        email,
        password: data.password,
      });

      nav("/reset-success");
    } catch (err: any) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-xl p-8 rounded-xl shadow-xl border border-white/40">
        
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Set New Password
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          <input
            {...register("password")}
            type="password"
            placeholder="Enter new password"
            className="w-full p-3 border rounded-xl bg-white shadow-sm"
            required
          />

          <button
            className="w-full bg-green-600 hover:bg-green-700 transition text-white font-semibold py-3 rounded-xl"
          >
            Save New Password
          </button>
        </form>
      </div>
    </div>
  );
}
