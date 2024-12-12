import { useState } from "react";
import { useUser } from "../context/UserContext";
import { Navigate } from "react-router-dom";

export default function Login() {
  const { user, isLoading, signIn } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log("Login", { email: user?.email, isLoading });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (user) {
    if (user.signUpCompleted) {
      return <Navigate to="/" />;
    } else {
      return <Navigate to="/register/user-details" />;
    }
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
