import { createBrowserRouter, Navigate } from "react-router-dom";
import HomePageStudent from "../pages/student/pages/HomePageStudent";
import App from "../App";
import HomePageTeacher from "../pages/teacher/pages/HomePageTeacher";
import ManageClass from "../pages/teacher/pages/ManageClass";
import HeaderStudent from "../pages/student/components/HeaderStudent";
import Fail403 from "../components/Fail403";
import HomePage from "../pages/teacher/pages/HomePage";
import ClassDetail from "../pages/teacher/pages/ClassDetail";
import ListStudent from "../pages/teacher/pages/ListStudent";
import RouterPrivate from "./RouterPrivate";
import TeacherProtectedRouter from "./TeacherProtectedRouter";
import Fail403 from "../components/Fail403";
import HeaderCLassStudent from "../pages/student/components/HeaderCLassStudent";

let router = createBrowserRouter([
  { path: "/fail403", element: <Fail403 /> },
  { path: "/", element: <App /> },
  { path: "/student/homepage", element: <HomePageStudent /> },
  {
    path: "/teacher",
    element: (
      <TeacherProtectedRouter>
        <HomePageTeacher />
      </TeacherProtectedRouter>
    ),
    children: [
      {
        path: "", // ROUTE CON: Khi URL là /teacher
        element: <HomePage />,
      },
      {
        path: "addvocab",
        element: <AddVocab />,
      },
      {
        path: "manageClass/:id",
        element: (
          <TeacherProtectedRouter>
            <ManageClass />
          </TeacherProtectedRouter>
        ),
        children: [
          {
            path: "",
            element: <ClassDetail></ClassDetail>,
          },
          { path: "list", element: <ListStudent></ListStudent> },
        ],
      },
    ],
  },
  {
    path: "/student",
    element: (
      <StudentProtectRouter>
        <HeaderCLassStudent />
      </StudentProtectRouter>
    ),
    errorElement: <Fail403 />,
    children: [
      {
        path: "homepage",
        element: <HomePageStudent />,
      },
    ],
  },
    { path: "/student", element: <MainLayout />,
      children:[
        {
          path:"classroom",
          element:<ClassRoomList/>
        }
      ]
     },
         { path: "/student", element: <MainLayout />,
      children:[
        {
          path:"profileStudent",
          element:<ProfilePage/>
        }
      ]
     },
  {
    path: "/admin",
    element: (
      <AdminProtectedRouter>
        <AdminLayout />
      </AdminProtectedRouter>
    ),
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "teachers", element: <Teachers /> },
      { path: "teachers/:id", element: <TeacherDetail /> },
      { path: "users", element: <Users /> },
    ],
  },
]);
export default router;
