import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTourBills } from "../../redux/features/tourBillSlice";
import Spinner from "../common/Spinner";
import SideNav from "./SideNav";

function TourBillMng() {
    const { tourBills, loading } = useSelector((state) => ({
        ...state.tourBill,
    }));
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTourBills());
    }, []);

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="container mt-3 pt-5 mb-3">
            <div className="row g-5">
                <SideNav />

                <div className="col-xl-9 shadow pb-3">
                    <h1 className="text-center pt-5 pb-3">TOUR BILL MANAGEMENT</h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Tour</th>
                                <th scope="col">Số lượng</th>
                                <th scope="col">Giá</th>
                                <th scope="col">Giảm giá</th>
                                <th scope="col">Tổng tiền</th>
                                <th scope="col">Người đặt</th>
                                <th scope="col">Số điện thoại</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tourBills.map((item, index) => (
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.tourTitle}</td>
                                    <td>{item.quantity}</td>
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

export default TourBillMng;
