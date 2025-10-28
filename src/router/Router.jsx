import React from "react";
import { createBrowserRouter } from "react-router-dom";
import HomePageStudent from "../pages/student/pages/HomePageStudent";
import App from "../App";
import HomePageTeacher from "../pages/teacher/pages/HomePageTeacher";
import ManageClass from "../pages/teacher/pages/ManageClass";
import HeaderStudent from "../pages/student/components/HeaderStudent";
import TeacherProtectedRouter from "./TeacherProtectedRouter";
import Fail403 from "../components/Fail403";
import MainLayout from "../pages/student/pages/MainLayout";
import ClassRoomList from "../pages/student/pages/ClassRoomList";

let router = createBrowserRouter([
  { path: "/fail403", element: <Fail403 /> },
  { path: "/", element: <App /> },
  { path: "/student/homepage", element: <HomePageStudent /> },
  { path: "/student", element: <MainLayout />,
    children:[
      {
        path:"classroom",
        element:<ClassRoomList/>
      }
    ]
   },
  {
    path: "/teacher",
    element: (
      <TeacherProtectedRouter>
        <HomePageTeacher />
      </TeacherProtectedRouter>
    ),
    children: [
      {
        path: "manageClass",
        element: (
          <TeacherProtectedRouter>
            <ManageClass />
          </TeacherProtectedRouter>
        ),
      },
    ],
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
