import React from "react";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/student/HomePage";
import App from "../App";
import HeaderStudent from "../components/HeaderStudent";

let router = createBrowserRouter([
  { path: "/", element: <App /> },
  {
    element: <HeaderStudent />,
    children: [
      {
        path: "/student/homepage",
        element: <HomePage />,
      },
    ],
  },
]);
export default router;
