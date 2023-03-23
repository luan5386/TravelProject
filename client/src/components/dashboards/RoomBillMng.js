import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRoomBills } from "../../redux/features/roomBillSlice";
import Spinner from "../common/Spinner";
import SideNav from "./SideNav";

function RoomBillMng() {
    const { roomBills, loading } = useSelector((state) => ({
        ...state.roomBill,
    }));
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getRoomBills());
    }, []);

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="container mt-3 pt-5 mb-3">
            <div className="row g-5">
                <SideNav />

                <div className="col-xl-9 col-12 shadow pb-3">
                    <h1 className="text-center pt-5 pb-3">ROOM BILL MANAGEMENT</h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Phòng</th>
                                <th scope="col">Ngày nhận phòng</th>
                                <th scope="col">Ngày trả phòng</th>
                                <th scope="col">Giá</th>
                                <th scope="col">Giảm giá</th>
                                <th scope="col">Tổng tiền</th>
                                <th scope="col">Người đặt</th>
                                <th scope="col">Số điện thoại</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roomBills.map((item, index) => (
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.roomNumber}</td>
                                        <td>{new Date(item.checkInDate).toLocaleDateString()}</td>
                                        <td>{new Date(item.checkOutDate).toLocaleDateString()}</td>
                                    <td>{item.price} vnđ/vé</td>
                                    <td>{item.discount}%</td>
                                    <td>{item.totalPrice}</td>
                                    <td>{item.userName}</td>
                                    <td>{item.phoneNumber}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default RoomBillMng;
