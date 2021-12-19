import { lazy } from "react";
import React from "react";
import CallVideo from "../pages/call";
// import Login from "../pages/login";
// import Register from "../pages/register";
const Home = lazy(() => import("../pages/home"));
// const ForgetPassword = lazy(() => import("../pages/forget-password"));

const chatRoutes = [
  {
    component: Home,
    path: "/",
    isPrivate: true,
  },
  {
    component: CallVideo,
    path: "/video-call/:idRoom",
    isPrivate: true,
  },
  // {
  //   component: ForgetPassword,
  //   path: "/forget-password",
  //   exact: true,
  // },
];
export default chatRoutes;
