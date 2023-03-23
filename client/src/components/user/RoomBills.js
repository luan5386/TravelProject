import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { deleteTour, getAllTours } from "../../redux/features/tourSlice";
import { getRoomsByUser } from "../../redux/features/roomBillSlice";
import Spinner from "../common/Spinner";
import UserSideNav from "./UserSideNav";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function RoomBills() {
    const { user } = useSelector((state) => ({
        ...state.auth,
    }));
    const { userRoomBills, loading } = useSelector((state) => ({
        ...state.roomBill,
    }));
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getRoomsByUser(user?.result?._id));
    }, []);

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="container mt-3 pt-5 mb-3">
            <div className="row g-5">
                <UserSideNav />

                <div className="col-xl-9 col-12 shadow pb-3">
                    <h1 className="text-center pt-5 pb-3">Phòng đã đặt</h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Phòng</th>
                                <th scope="col">Ngày nhận phòng</th>
                                <th scope="col">Ngày trả phòng</th>
                                <th scope="col">Giá phòng</th>
                                <th scope="col">Giảm giá</th>
                                <th scope="col">Tổng tiền</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {userRoomBills.map((item, index) => (
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.roomNumber}</td>
                                    <td>
                                        {new Date(
                                            item.checkInDate
                                        ).toLocaleDateString()}
                                    </td>
                                    <td>
                                        {new Date(
                                            item.checkOutDate
                                        ).toLocaleDateString()}
                                    </td>
                                    <td>{item.price} vnđ/ngày</td>
                                    <td>{item.discount}%</td>
                                    <td>{item.totalPrice}</td>
                                    <td>
                                        <Link to={`/room/${item.roomId}`}>
                                            Xem phòng
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

export default RoomBills;
