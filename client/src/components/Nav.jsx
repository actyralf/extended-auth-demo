import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

export function Nav() {
  const { user, signOut } = useUser();
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
          <button onClick={signOut}>Sign Out</button>
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
