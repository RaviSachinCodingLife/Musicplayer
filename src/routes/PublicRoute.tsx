import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";
import { JSX } from "react";

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  return isAuthenticated() ? <Navigate to="/home" /> : children;
};

export default PublicRoute;
