import React from "react";
import { useSelector } from "react-redux";

import SideNav from "./SideNav";
import Spinner from "../common/Spinner";

function Dashboard() {
    const { loading } = useSelector((state) => ({
        ...state.tour,
    }));

    if (loading) {
        return <Spinner />;
    }
    return (
        <div className="container m-5">
            <div className="row g-5">
                <SideNav />

                <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12 shadow">
                    <h1 className="text-center py-5">DASHBOARD</h1>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
