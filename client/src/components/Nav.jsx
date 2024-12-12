import { NavLink } from "react-router-dom";
import { useUser } from "../context/UserContext";
import styles from "./Nav.module.css";

export function Nav({ homeOnly = false }) {
  const { user, signOut } = useUser();
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink
            className={({ isActive }) => isActive && styles["active-link"]}
            to="/"
          >
            {homeOnly ? "<< Home" : "Home"}
          </NavLink>
        </li>
        {!homeOnly && (
          <>
            <li>
              <NavLink
                className={({ isActive }) => isActive && styles["active-link"]}
                to="/profile"
              >
                Profile
              </NavLink>
            </li>

            {user ? (
              <button onClick={signOut}>Sign Out</button>
            ) : (
              <>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive && styles["active-link"]
                    }
                    to="/login"
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive && styles["active-link"]
                    }
                    to="/register"
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </>
        )}
      </ul>
    </nav>
  );
}
