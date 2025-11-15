import { Navigate } from "react-router-dom";
import { useAuth } from "../store/auth";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const token = useAuth((s) => s.token);

  
  if (!token) return <Navigate to="/" replace />;

  return children;
}

