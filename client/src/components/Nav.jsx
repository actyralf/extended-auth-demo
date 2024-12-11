import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import LogOut from "./Logout";

export function Nav() {
  const { user } = useUser();
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
          <LogOut />
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
