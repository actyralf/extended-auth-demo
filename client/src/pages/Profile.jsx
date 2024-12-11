import { useUser } from "../context/UserContext";

export default function Profile() {
  const { user, profileData } = useUser();

  return (
    <>
      <h1>Profile</h1>
      <p>uid: {user.uid}</p>
      <p>email: {user.email}</p>
      <p>city: {profileData?.city}</p>
    </>
  );
}
