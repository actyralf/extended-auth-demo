import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export function ProtectedRoute({ children }) {
  const { user } = useUser();
  if (user) {
    return <>{children}</>;
  }
  return <Navigate to="/login" />;
}
