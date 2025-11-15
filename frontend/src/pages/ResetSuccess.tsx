import { Link } from "react-router-dom";

export default function ResetSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="max-w-md w-full bg-white/80 p-10 rounded-2xl shadow-xl backdrop-blur-xl border border-white/40 text-center">

        <h2 className="text-3xl font-bold text-green-700 mb-4">
          Password Updated! 🎉
        </h2>

        <p className="text-gray-700 mb-8">
          Your password has been changed successfully.
        </p>

        <div className="flex flex-col gap-4">
          <Link
            to="/"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
          >
            Go to Login
          </Link>

          <Link
            to="/todos"
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-xl font-semibold"
          >
            Go to Home
          </Link>
        </div>

      </div>
    </div>
  );
}
