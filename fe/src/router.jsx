import { createBrowserRouter } from "react-router-dom";
import CreateUser from "./ListUser/CreateUser";
import Edituser from "./ListUser/EditUser";
import User from "./ListUser/User";
import LayOut from "./components/LayOut";
import Contribute from "./event/contribute";
import Event from "./event/Event";
import ForgotPassword from "./formlogins/ForgotPassword";
import LayoutLogin from "./formlogins/LayoutLogin";
import Login from "./formlogins/Login";
import ResetPassword from "./formlogins/ResetPassword";
import Profile from "./profile/Profile";
import CreateEvent from "./event/CreateEvent";
import EditEvent from "./event/EditEvent";

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
        path: "/user",
        element: <User />,
      },
      {
        path: "user/edit/:id",
        element: <Edituser />,
      },
      {
        path: "/createuser",
        element: <CreateUser />,
      },
      {
        path: "/edituser:_id",
        element: <Edituser />,
      },
      {
        path: "/event",
        element: <Event />,
      },
      {
        path: "/createevent",
        element: <CreateEvent/>
      },
      {
        path: "/event/edit/:id",
        element: <EditEvent/>
      },
      {
        path: "/contribute:_id",
        element: <Contribute />,
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
