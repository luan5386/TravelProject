import React from "react";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";

const PrivateAdminRoute = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  return user?.result?.authority === "ADMIN" ? children : <LoadingToRedirect />;
};

export default PrivateAdminRoute;