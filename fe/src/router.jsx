import { createBrowserRouter } from "react-router-dom";
import CreateUser from "./ListUser/CreateUser";
import Edituser from "./ListUser/EditUser";
import User from "./ListUser/User";
import LayOut from "./components/LayOut";
import Event from "./event/event";
import ForgotPassword from "./formlogins/ForgotPassword";
import LayoutLogin from "./formlogins/LayoutLogin";
import Login from "./formlogins/Login";
import ResetPassword from "./formlogins/ResetPassword";
import Profile from "./profile/Profile";
import CreateEvent from "./event/CreateEvent";
import EditEvent from "./event/EditEvent";
import Contribute from "./contribute/contribute";
import ListConTribute from "./contribute/listcontribute";
import DetailEvent from "./event/detailEvent";
import PostEvent from "./event/postEvent";

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
        path: "/contribute/:id",
        element: <Contribute />,
      },
      {
        path: "/contribute",
        element: <Contribute />,
      },
      {
        path: "/listcontribute",
        element: <Listcontribute />,
      },
      {
        path: "/listcontribute",
        element: <ListConTribute />,
      },
      {
        path: "/event/detail/:id",
        element: <DetailEvent />,
      },
      {
        path: "/event/post/:id",
        element: <PostEvent />,
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
