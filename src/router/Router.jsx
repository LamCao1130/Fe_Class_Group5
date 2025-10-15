import React from "react";
import { createBrowserRouter } from "react-router-dom";
import HomePageStudent from "../pages/student/pages/HomePageStudent";
import App from "../App";
import HomePageTeacher from "../pages/teacher/pages/HomePageTeacher";
import ManageClass from "../pages/teacher/pages/ManageClass";
import HeaderStudent from "../pages/student/components/HeaderStudent";

let router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/student/homepage", element: <HomePageStudent /> },
  {
    path: "/teacher",
    element: <HomePageTeacher />,
    children: [{ path: "manageClass", element: <ManageClass /> }],
  },
  {
    element: <HeaderStudent />,
    children: [
      {
        path: "/student/homepage",
        element: <HomePageStudent />,
      },
    ],
  },
]);
export default router;
