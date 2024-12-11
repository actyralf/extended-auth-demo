import { useState } from "react";
import { useUser } from "../context/UserContext";
import { Navigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, isLoading, profileData, signUp } = useUser();

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (user) {
    if (profileData) {
      return <Navigate to="/" />;
    } else {
      return <Navigate to="/user-details" />;
    }
  }
  return (
    <>
      <h1>Register</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signUp(email, password);
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
