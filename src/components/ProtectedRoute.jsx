import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("token");
  console.log("isLoggedIn", isLoggedIn);
  if (!isLoggedIn) {
    return <Navigate to={"/login"} replace />;
  }
  return children;
};

export default ProtectedRoute;
