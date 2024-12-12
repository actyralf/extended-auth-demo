import { useState } from "react";
import { useUser } from "../context/UserContext";
import { Navigate } from "react-router-dom";

export default function UserDetails() {
  const { user, isLoading, updateProfileData } = useUser();
  const [city, setCity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfileData({ city });
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) {
    console.log("user details loading");
    return <h2>Loading...</h2>;
  }

  if (user && user.signUpCompleted) {
    console.log("user details navigate home");
    return <Navigate to="/" />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  console.log("user details should render form");
  return (
    <>
      <h1>UserDetails</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="City"
          type="text"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
        <button>Submit</button>
      </form>
    </>
  );
}
