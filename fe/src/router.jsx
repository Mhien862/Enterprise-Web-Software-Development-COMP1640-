import { createBrowserRouter } from "react-router-dom";
import LayOut from "./components/LayOut";
import Login from "./formlogins/Login";
import ForgotPassword from "./formlogins/ForgotPassword";
import ResetPassword from "./formlogins/ResetPassword";
import LayoutLogin from "./formlogins/LayoutLogin";
import Profile from "./profile/Profile";
import ChangePassword from "./profile/ChangePassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayOut />,
    children: [
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/changepassword",
        element: <ChangePassword />,
      },
    ],
  },
  {
    element: <LayoutLogin />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/forgot",
        element: <ForgotPassword />,
      },
      {
        path: "/reset",
        element: <ResetPassword />,
      },
    ],
  },
]);

export default router;
