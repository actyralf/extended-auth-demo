import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import RootLayout from "./pages/RootLayout.jsx";
import Profile from "./pages/Profile.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import UserDetails from "./pages/UserDetails.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "user-details",
        element: <UserDetails />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </UserProvider>
  </StrictMode>
);
