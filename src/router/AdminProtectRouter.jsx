import React from "react";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router";

export default function AdminProtectRouter({ children }) {
  if (localStorage.getItem("accessToken") === null) {
    return <Navigate to="/" replace />;
  } else {
    const decoded = jwtDecode(localStorage.getItem("accessToken"));
    if (decoded.role === "ADMIN") return children;
    else {
      return <Navigate to="/fail403" replace />;
    }
  }
}
