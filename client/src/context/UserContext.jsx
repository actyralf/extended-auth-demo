import { createContext, useState, useContext } from "react";
import { auth } from "../lib/auth";
import { onAuthStateChanged } from "firebase/auth";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User logged in", user);
      setUser(user);
    } else {
      console.log("No user is signed in.");
      setUser(null);
    }
  });

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
