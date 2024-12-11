import { useState, useEffect } from "react";
import { auth } from "../lib/auth";
import { onAuthStateChanged } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signOut as firebaseSignOut } from "firebase/auth";
import { UserContext } from "./UserContext";

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (newUser) => {
      if (newUser) {
        console.log("User logged in", newUser);
        setIsLoading(true);
        setUser(newUser);
        loadProfileData(newUser).then(() => {
          console.log("profile data loaded");
          setIsLoading(false);
        });
      } else {
        console.log("No user is signed in.");
        setUser(null);
        setIsLoading(false);
        setProfileData(null);
      }
    });

    return unsubscribe;
  }, []);

  const signUp = async (email, password) => {
    try {
      setIsLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error signing in:", error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email, password) => {
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error signing in:", error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    console.log("logout called");
    try {
      setIsLoading(true);
      await firebaseSignOut(auth);
      console.log("User logged out successfully.");
    } catch (error) {
      console.error("Error logging out:", error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  async function loadProfileData(tempUser) {
    try {
      setIsLoading(true);
      if (!tempUser) {
        throw new Error("not authorized");
      }
      const response = await fetch("http://localhost:3000/profile", {
        headers: {
          Authorization: `Bearer ${tempUser.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("fetch profile failed");
      }
      const data = await response.json();
      console.log(data);
      setProfileData(data.profile);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function updateProfileData(newData) {
    try {
      if (!user) {
        throw new Error("user not logged in");
      }
      setIsLoading(true);
      const response = await fetch("http://localhost:3000/profile", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });
      if (!response.ok) {
        throw new Error("fetch failed");
      }
      const data = await response.json();
      setProfileData(data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        profileData,
        signIn,
        signOut,
        signUp,
        updateProfileData,
        isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
