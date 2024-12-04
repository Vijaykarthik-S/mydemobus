import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import AuthContext from "./AuthContext";

// PrivateRoute component to protect certain routes
const PrivateRoute = ({ allowedRoles }) => {
  const { auth } = useContext(AuthContext);

  if (!auth) {
    // If the user is not authenticated, redirect to login page
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(auth.role)) {
    // If the user is authenticated but does not have the required role, redirect to home page
    return <Navigate to="/" />;
  }

  // If the user is authenticated and has the required role, allow access to the route
  return <Outlet />;
};

export default PrivateRoute;
