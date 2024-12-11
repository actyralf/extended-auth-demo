import { signOut } from "firebase/auth";
import { auth } from "../lib/auth";

function LogOut() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully.");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return <button onClick={handleLogout}>Log out</button>;
}

export default LogOut;
