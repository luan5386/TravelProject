import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getToursByUser } from "../../redux/features/tourBillSlice";
import Spinner from "../common/Spinner";
import UserSideNav from "./UserSideNav";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function TourBills() {
    const { user } = useSelector((state) => ({
        ...state.auth,
    }));
    const { userTourBills, loading } = useSelector((state) => ({
        ...state.tourBill,
    }));
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getToursByUser(user?.result?._id));
    }, []);

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="container mt-3 pt-5 mb-3">
            <div className="row g-5">
                <UserSideNav />

                <div className="col-xl-9 col-12 shadow pb-3">
                    <h1 className="text-center pt-5 pb-3">Tour đã đặt</h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Tour</th>
                                <th scope="col">Số lượng</th>
                                <th scope="col">Giá</th>
                                <th scope="col">Giảm giá</th>
                                <th scope="col">Tổng tiền</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {userTourBills.map((item, index) => (
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.tourTitle}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.price} vnđ/vé</td>
                                    <td>{item.discount}%</td>
                                    <td>{item.totalPrice}</td>
                                    <td>
                                        <Link to={`/tour/${item.tourId}`}>
                                            Xem tour
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default TourBills;
