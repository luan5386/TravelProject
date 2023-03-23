import React from "react";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";

const PrivateManagerRoute = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  return user?.result?.authority === "MANAGER" ? children : <LoadingToRedirect />;
};

export default PrivateManagerRoute;