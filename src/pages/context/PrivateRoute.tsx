import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "./AuthContext";

const PrivateRoute: React.FC = () => {
  const { isLoggedIn } = useAuthContext();

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
