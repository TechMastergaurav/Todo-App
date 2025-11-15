import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Forgot() {
  const { register, handleSubmit } = useForm();
  const nav = useNavigate();

  const onSubmit = (data: any) => {
    // Pass email safely to Reset page
    nav("/reset", { state: { email: data.email } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-xl rounded-xl p-8 shadow-xl border border-white/40">
        
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <input
            {...register("email")}
            placeholder="Enter your email"
            className="w-full p-3 border rounded-xl bg-white shadow-sm"
            required
          />

          {/* ✅ Button should NOT have onClick */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold shadow"
          >
            Reset Password
          </button>

        </form>
      </div>
    </div>
  );
}




