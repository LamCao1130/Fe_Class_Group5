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
import Students from "../pages/admin/pages/Students";
import StudentProtectRouter from "./StudentProtectRouter";
import AdminProtectedRouter from "./AdminProtectedRouter";
import StudentDetail from "../pages/admin/pages/StudentDetail";
import AddVocab from "../pages/teacher/pages/AddVocab";
import MainLayout from "../pages/student/pages/MainLayout";
import ClassRoomList from "../pages/student/pages/ClassRoomList";
import ProfilePage from "../pages/student/pages/ProfilePage";
import HeaderCLassStudent from "../pages/student/components/HeaderCLassStudent";
import LessonDetail from "../pages/teacher/pages/LessonDetail";
import AddQuestion from "../pages/teacher/pages/AddQuestion";
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
        path: "",
        element: <HomePage />,
      },
      {
        path: "lesson/:id/addvocab",
        element: <AddVocab />,
      },
      {
        path: "lesson/:id/addQuestion",
        element: <AddQuestion></AddQuestion>,
      },
      {
        path: "lesson/:id",
        element: <LessonDetail></LessonDetail>,
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
            element: <ClassDetail />,
          },
          { path: "list", element: <ListStudent></ListStudent> },
          ,
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
  {
    path: "/student",
    element: <MainLayout />,
    children: [
      {
        path: "classroom",
        element: <ClassRoomList />,
      },
    ],
  },
  {
    path: "/student",
    element: <MainLayout />,
    children: [
      {
        path: "profileStudent",
        element: <ProfilePage />,
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
      { path: "dashboard", element: <Dashboard /> },
      { path: "teachers", element: <Teachers /> },
      { path: "teachers/:id", element: <TeacherDetail /> },
      { path: "student", element: <Students /> },
      { path: "student/:id", element: <StudentDetail /> },
    ],
  },
]);

export default router;
