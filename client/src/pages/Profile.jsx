import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";

export default function Profile() {
  const { user } = useUser();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const response = await fetch("http://localhost:3000/profile", {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        });
        if (!response.ok) {
          console.log("fetch profile failed with status", response.status);
          throw new Error("fetch profile failed");
        }
        const data = await response.json();
        setProfileData(data);
      } catch (err) {
        console.log(err);
      }
    };
    if (user) {
      loadProfileData();
    } else {
      setProfileData(null);
    }
  }, [user]);

  return (
    <>
      <h1>Profile</h1>
      <p>uid: {user.uid}</p>
      <p>email: {user.email}</p>
      <p>city: {profileData?.city}</p>
    </>
  );
}
