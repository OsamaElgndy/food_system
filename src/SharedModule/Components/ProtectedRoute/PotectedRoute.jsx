import React from "react";
import { Navigate } from "react-router-dom";

export default function PotectedRoute({adminData, children}) {
  if (adminData === null || localStorage.getItem("adminToken") == null) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
}
