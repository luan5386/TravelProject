import React from "react";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";

const PrivateEmployeeRoute = ({ children }) => {
    const { user } = useSelector((state) => ({ ...state.auth }));
    return user?.result?.authority === "EMPLOYEE" ? (
        children
    ) : (
        <LoadingToRedirect />
    );
};

export default PrivateEmployeeRoute;
