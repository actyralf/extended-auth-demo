import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

export function Nav() {
  const { user, logout } = useUser();
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        {user ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </ul>
    </nav>
  );
}
