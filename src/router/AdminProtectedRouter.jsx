import React from "react";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

export default function AdminProtectedRouter({ children }) {
  const token = localStorage.getItem("accessToken");
  if (!token) return <Navigate to="/" replace />;

  let decoded;
  try {
    decoded = jwtDecode(token);
  } catch (e) {
    return <Navigate to="/" replace />;
  }

  if (decoded && decoded.role === "ADMIN") return children;
  return <Navigate to="/fail403" replace />;
}
