import React from "react";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";

const PrivateCustomerAndEmployeeRoute = ({ children }) => {
    const { user } = useSelector((state) => ({ ...state.auth }));
    return (user?.result?.authority === "NORMAL" || user?.result?.authority === "EMPLOYEE") ? (
        children
    ) : (
        <LoadingToRedirect />
    );
};

export default PrivateCustomerAndEmployeeRoute;
