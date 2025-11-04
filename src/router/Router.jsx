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
import AdminLayout from "../pages/admin/pages/AdminLayout";
import Dashboard from "../pages/admin/pages/Dashboard";
import Teachers from "../pages/admin/pages/Teachers";
import TeacherDetail from "../pages/admin/pages/TeacherDetail";
import StudentProtectRouter from "./StudentProtectRouter";
import AdminProtectedRouter from "./AdminProtectedRouter";
import AddVocab from "../pages/teacher/pages/AddVocab";
import ClassRooms from "../pages/admin/pages/ClassRooms";
let router = createBrowserRouter([
  {
    path: "/fail403",
    element: <Fail403 />,
    errorElement: <Fail403 />,
  },
  {
    path: "/",
    element: (
      <RouterPrivate>
        <App />
      </RouterPrivate>
    ),
    errorElement: <Fail403 />,
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
        <HeaderStudent />
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
      { path: "classroom", element: <ClassRooms /> },
    ],
  },
]);
export default router;
