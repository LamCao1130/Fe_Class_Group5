import React from "react";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/student/HomePage";
import App from "../App";

let router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/student/homepage", element: <HomePage /> },
]);
export default router;
