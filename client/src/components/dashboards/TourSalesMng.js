import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTourBills } from "../../redux/features/tourBillSlice";
import Spinner from "../common/Spinner";
import SideNav from "./SideNav";

function TourSaleMng() {
    const [month, setMonth] = useState(0);
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

    let tourBillsLength = tourBills.length;
    let maySales = 0;
    let juneSales = 0;
    for (let i = 0; i < tourBillsLength; i++) {
        if (new Date(tourBills[i].createdAt).getMonth() === 4) {
            maySales += Number(tourBills[i].price);
        } else if (new Date(tourBills[i].createdAt).getMonth() === 5) {
            juneSales += Number(tourBills[i].price);
        }
    }

    const onShowDetail = (e) => {
        e.preventDefault();
        const m = e.target.getAttribute("value");
        setMonth(Number(m));
        const tb = document.getElementById("table-detail");
        tb.classList.add("d-block");
        tb.classList.remove("d-none");
    };

    const onCloseDetail = (e) => {
        e.preventDefault();
        const tb = document.getElementById("table-detail");
        tb.classList.remove("d-block");
        tb.classList.add("d-none");
    };

    return (
        <div className="container mt-3 pt-5 mb-3">
            <div className="row g-5">
                <SideNav />

                <div className="col-xl-9 col-12 shadow pb-3">
                    <h1 className="text-center pt-5 pb-3">
                        <b>TOUR SALES MANAGEMENT</b>
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
                                    <a
                                        href="#"
                                        onClick={onShowDetail}
                                        value={4}
                                    >
                                        Chi tiết
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>6</td>
                                <td>{juneSales} vnđ</td>
                                <td>
                                    <a
                                        href="#"
                                        onClick={onShowDetail}
                                        value={5}
                                    >
                                        Chi tiết
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table className="table d-none my-4" id="table-detail">
                        <h1>Chi tiết doanh thu tháng {month + 1}</h1>
                        <button className="btn btn-primary my-2" onClick={onCloseDetail}>Đóng</button>
                        <thead>
                            <tr>
                                <th scope="col">Tour</th>
                                <th scope="col">Số lượng</th>
                                <th scope="col">Giá</th>
                                <th scope="col">Giảm giá</th>
                                <th scope="col">Tổng tiền</th>
                                <th scope="col">Người đặt</th>
                                <th scope="col">Số điện thoại</th>
                                <th scope="col">Ngày lập hóa đơn</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tourBills.map((item, index) =>
                                new Date(item.createdAt).getMonth() ===
                                month ? (
                                    <tr>
                                        <td>{item.tourTitle}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.price} vnđ/vé</td>
                                        <td>{item.discount}%</td>
                                        <td>{item.totalPrice}</td>
                                        <td>{item.userName}</td>
                                        <td>{item.phoneNumber}</td>
                                        <td>
                                            {new Date(
                                                item.createdAt
                                            ).toLocaleDateString()}
                                        </td>
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

export default TourSaleMng;
