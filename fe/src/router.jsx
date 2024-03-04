import { createBrowserRouter } from "react-router-dom";
import LayOut from "./components/LayOut";
import Login from "./formlogins/Login";
import ForgotPassword from "./formlogins/ForgotPassword";
import ResetPassword from "./formlogins/ResetPassword";
import LayoutLogin from "./formlogins/LayoutLogin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayOut />,
    children: [],
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
