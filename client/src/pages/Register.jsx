import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useUser } from "../context/UserContext";
import { Navigate } from "react-router-dom";
import { auth } from "../lib/auth";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useUser();

  function signUp() {
    createUserWithEmailAndPassword(auth, email, password).catch((error) => {
      console.log(error.message);
    });
  }

  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <h1>Register</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signUp();
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
        <button>Register</button>
      </form>
    </>
  );
}
