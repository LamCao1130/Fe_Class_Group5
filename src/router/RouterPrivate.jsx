import React from "react";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router";

export default function RouterPrivate({ children }) {
  if (localStorage.getItem("accessToken") === null) {
    return children;
  } else {
    const decoded = jwtDecode(localStorage.getItem("accessToken"));
    if (decoded.role === "TEACHER") return <Navigate to="/teacher" replace />;
    else if (decoded.role === "STUDENT")
      return <Navigate to="/student/classroom" replace />;
    else if (decoded.role === "ADMIN") return <Navigate to="/admin" replace />;
    else {
      return <Navigate to="/fail403" replace />;
    }
  }
}
