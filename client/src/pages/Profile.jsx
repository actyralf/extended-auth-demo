import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";

export default function Profile() {
  const { user } = useUser();
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const result = await fetch("http://localhost:3000/profile", {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        });
        const data = await result.json();
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    loadProfile();
  }, []);
  return <h1>Profile</h1>;
}
