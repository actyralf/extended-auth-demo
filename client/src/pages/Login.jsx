import { useState } from "react";
import { useUser } from "../context/UserContext";
import { Navigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/auth";

export default function Login() {
  const { user } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error signing in:", error.message);
    }
  };

  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <h1>Login</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signIn(email, password);
        }}
      >
        <input
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button>Login</button>
      </form>
    </>
  );
}
