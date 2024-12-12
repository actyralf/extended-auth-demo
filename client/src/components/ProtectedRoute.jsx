import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export function ProtectedRoute({ children }) {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (user) {
    if (user.signUpCompleted) {
      return <>{children}</>;
    } else {
      return <Navigate to="/user-details" />;
    }
  }
  return <Navigate to="/login" />;
}
