import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Forgot from "./pages/Forgot";
import Todos from "./pages/Todos";
import PrivateRoute from "./components/PrivateRoute";
import Reset from "./pages/Reset";
import ResetSuccess from "./pages/ResetSuccess";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-4 py-10">
      {/* NAVBAR */}
      <header className="max-w-3xl mx-auto mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Todo App</h1>

        <nav className="flex gap-6 text-gray-700 font-medium">
          <Link
            to="/"
            className="hover:text-blue-600 transition"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="hover:text-blue-600 transition"
          >
            Signup
          </Link>

          <Link
            to="/todos"
            className="hover:text-blue-600 transition"
          >
            Todos
          </Link>
        </nav>
      </header>

      {/* MAIN CARD */}
      <main className="max-w-xl mx-auto bg-white/80 backdrop-blur-xl shadow-xl border border-white/40 rounded-2xl p-8">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/reset" element={<Reset />} />

         <Route
  path="/todos"
  element={
    <PrivateRoute>
      <Todos />
    </PrivateRoute>
  }
/>
<Route path="/reset-success" element={<ResetSuccess />} />
        </Routes>
      </main>
    </div>
  );
}
