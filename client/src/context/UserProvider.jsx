import { useState, useEffect } from "react";
import { auth } from "../lib/auth";
import { onAuthStateChanged } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signOut as firebaseSignOut } from "firebase/auth";
import { UserContext } from "./UserContext";

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (newUser) => {
      if (newUser) {
        console.log("User logged in", newUser);
        newUser.getIdTokenResult().then((idTokenResult) => {
          console.log("idTokenResult", idTokenResult);
          setUser({
            ...newUser,
            signUpCompleted: !!idTokenResult.claims.signUpCompleted,
          });
        });
        setUser(newUser);
      } else {
        console.log("No user is signed in.");
        setUser(null);
        setIsLoading(false);
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
      await refreshUser();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function refreshUser() {
    if (auth.currentUser) {
      try {
        setIsLoading(true);
        const idTokenResult = await auth.currentUser.getIdTokenResult(true);
        setUser({
          ...auth.currentUser,
          signUpCompleted: idTokenResult.claims.signUpCompleted,
        });
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
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
