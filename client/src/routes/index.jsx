import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import ProfileDashboard from "../pages/ProfileDashboard"; // 👈 import new page

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
        path: "profile", // 👈 new route
        element: <ProfileDashboard />,
      },
    ],
  },
]);

export default router;

