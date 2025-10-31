import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import ProfileDashboard from "../pages/ProfileDashboard";
import AdminDashboard from "../pages/AdminDashboard";
import Menu from "../pages/Menu";
import About from "../pages/About";
import ProtectedRoute from "../components/ProtectedRoute";
import AdminPage from "../pages/AdminPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "menu",
        element: <Menu />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <ProfileDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin",
        element: (
          <ProtectedRoute adminOnly={true}>
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin1",
        element: (
          <ProtectedRoute adminOnly={true}>
            <AdminPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
]);

export default router;
