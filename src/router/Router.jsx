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
import LessonList from "../pages/student/pages/LessonList";
import ExamList from "../pages/student/pages/ExamList";
import ViewVocab from "../pages/student/pages/ViewVocab";
import Vocabulary from "../pages/student/components/Vocabulary";
import Reading from "../pages/student/components/Reading";
import Listening from "../pages/student/components/Listening";
import Writting from "../pages/student/components/Writting";
import SubmissionHistory from "../pages/student/pages/SubmitionHistory";
import QuestionDetail from "../pages/teacher/components/QuestionDetail";
import ClassRooms from "../pages/admin/pages/ClassRooms";
import ClassRoomDetail from "../pages/admin/pages/ClassRoomDetail";
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
        path: "exam/:id",
        element: <QuestionDetail></QuestionDetail>,
      },
      {
        path: "exam/:id/addQuestion",
        element: <AddQuestion></AddQuestion>,
      },
      {
        path: "lesson/:id",
        element: <LessonDetail></LessonDetail>,
      },
      {
        path: "lesson/:id/historySubmit",
        element: <SubmissionHistory></SubmissionHistory>,
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
        <MainLayout />
      </StudentProtectRouter>
    ),
    children: [
      // { path: "homepage", element: <HomePageStudent /> },

      { path: "classroom", element: <ClassRoomList /> },
      { path: "profileStudent", element: <ProfilePage /> },
      { path: "classroom/:classRoomId", element: <LessonList /> },
      { path: "classroom/:classRoomId/exam", element: <ExamList /> },
      { path: "vocab/:lessionId", element: <ViewVocab /> },
      {
        path: "history/:lessionId",
        element: <SubmissionHistory></SubmissionHistory>,
      },
    ],
  },
  {
    path: "/student/doExercise/:lessonId/mcAndFill",
    element: (
      <StudentProtectRouter>
        <Vocabulary />
      </StudentProtectRouter>
    ),
  },
  {
    path: "/student/doExercise/:lessonId/reading",
    element: (
      <StudentProtectRouter>
        <Reading />
      </StudentProtectRouter>
    ),
  },
  {
    path: "/student/doExercise/:lessonId/listening",
    element: (
      <StudentProtectRouter>
        <Listening />
      </StudentProtectRouter>
    ),
  },
  {
    path: "/student/doExercise/:lessonId/writting",
    element: (
      <StudentProtectRouter>
        <Writting />
      </StudentProtectRouter>
    ),
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
      { path: "classrooms", element: <ClassRooms /> },
      { path: "classrooms/:id", element: <ClassRoomDetail/>},
    ],
  },
]);

export default router;
