import React from "react";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";

const PrivateNotCustomerRoute = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  return user?.result?.authority !== "NORMAL" ? children : <LoadingToRedirect />;
};

export default PrivateNotCustomerRoute;