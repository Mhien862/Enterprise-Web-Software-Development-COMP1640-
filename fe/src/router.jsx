import { createBrowserRouter } from "react-router-dom";
import LayOut from "./components/LayOut";
import Login from "./formlogins/Login";
import ForgotPassword from "./formlogins/ForgotPassword";
import ResetPassword from "./formlogins/ResetPassword";
import LayoutLogin from "./formlogins/LayoutLogin";
import User from "./ListUser/User";
import CreateUser from "./ListUser/CreateUser";
import EditUser from "./ListUser/EditUser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayOut />,
    children: [
      {
        path: "/user",
        element: <User />,
      },
      {
        path: "/createuser",
        element: <CreateUser />,
      },
      {
        path: "/edituser:_id",
        element: <EditUser />,
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
      {
        path: "/user",
        element: <User />,
      },
    ],
  },
]);

export default router;
