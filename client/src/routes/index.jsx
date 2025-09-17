import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import LoginPage from "../pages/Login";
import Login from "../pages/Login";
//import ProfileDashboard from "../pages/ProfileDashboard"; // 👈 import new page

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
        path: "Signup",
        element: <Signup />
      },
      {
        path: "Login",
        element: <Login />
      },
      //{
        //path: "profile", // 👈 new route
        //element: <ProfileDashboard />,
      //},
    ],
  },
]);

export default router;

