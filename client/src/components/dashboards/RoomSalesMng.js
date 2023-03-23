import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRoomBills } from "../../redux/features/roomBillSlice";
import Spinner from "../common/Spinner";
import SideNav from "./SideNav";

function RoomSalesMng() {
    const [month, setMonth] = useState(0)
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

    let roomBillsLength = roomBills.length;
    let maySales = 0;
    let juneSales = 0;
    for (let i = 0; i < roomBillsLength; i++) {
        if (new Date(roomBills[i].createdAt).getMonth() === 4) {
            maySales += Number(roomBills[i].price);
        } else if (new Date(roomBills[i].createdAt).getMonth() === 5) {
            juneSales += Number(roomBills[i].price);
        }
    }

    const onShowDetail = (e) => {
        e.preventDefault()
        const m = e.target.getAttribute("value")
        setMonth(Number(m))
        const tb = document.getElementById("table-detail")
        tb.classList.add("d-block")
        tb.classList.remove("d-none")
    }
    
    const onCloseDetail = (e) => {
        e.preventDefault()
        const tb = document.getElementById("table-detail")
        tb.classList.remove("d-block")
        tb.classList.add("d-none")
    }

    return (
        <div className="container mt-3 pt-5 mb-3">
            <div className="row g-5">
                <SideNav />

                <div className="col-xl-9 col-12 shadow pb-3">
                    <h1 className="text-center pt-5 pb-3">
                        <b>ROOM SALES MANAGEMENT</b>
                    </h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Tháng</th>
                                <th scope="col">Doanh thu</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>5</td>
                                <td>{maySales} vnđ</td>
                                <td>
                                    <a href="#" onClick={onShowDetail} value={4}>Chi tiết</a>
                                </td>
                            </tr>
                            <tr>
                                <td>6</td>
                                <td>{juneSales} vnđ</td>
                                <td>
                                    <a href="#" onClick={onShowDetail} value={5}>Chi tiết</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table className="table d-none my-4" id="table-detail">
                        <h1>Chi tiết doanh thu tháng {month + 1}</h1>
                        <button className="btn btn-primary my-2" onClick={onCloseDetail}>Đóng</button>
                        <thead>
                            <tr>
                                <th scope="col">Phòng</th>
                                <th scope="col">Ngày nhận phòng</th>
                                <th scope="col">Ngày trả phòng</th>
                                <th scope="col">Giá</th>
                                <th scope="col">Giảm giá</th>
                                <th scope="col">Tổng tiền</th>
                                <th scope="col">Người đặt</th>
                                <th scope="col">Số điện thoại</th>
                                <th scope="col">Ngày lập hóa đơn</th>

                            </tr>
                        </thead>
                        <tbody>
                            {roomBills.map((item, index) =>
                                new Date(item.createdAt).getMonth() === month ? (
                                    <tr>
                                        <td>{item.roomNumber}</td>
                                        <td>{new Date(item.checkInDate).toLocaleDateString()}</td>
                                        <td>{new Date(item.checkOutDate).toLocaleDateString()}</td>
                                        <td>{item.price} vnđ/vé</td>
                                        <td>{item.discount}%</td>
                                        <td>{item.totalPrice}</td>
                                        <td>{item.userName}</td>
                                        <td>{item.phoneNumber}</td>
                                        <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ) : null
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default RoomSalesMng;
