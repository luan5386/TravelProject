import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteTour,
    getTours,
    setCurrentPage,
    updateTour,
} from "../../redux/features/tourSlice";
import Spinner from "../common/Spinner";
import SideNav from "./SideNav";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "../common/Pagination";
import clsx from "clsx";
import styles from "./dashboard.module.scss";

const initialState = {
    title: "",
    description: "",
    businessHours: "",
    location: "",
    contact: "",
    price: "",
    discount: "",
    tags: [],
    comments: [],
    state: "on sale",
};
function TourMng() {
    const { tours, loading, currentPage, numberOfPages } = useSelector(
        (state) => ({
            ...state.tour,
        })
    );
    const [tourData, setTourData] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getTours(currentPage));
    }, [currentPage]);

    const excerpt = (str) => {
        if (str.length > 45) {
            str = str.substring(0, 45) + " ...";
        }
        return str;
    };

    if (loading) {
        return <Spinner />;
    }

    const onShowFormConfirm = (e, id) => {
        e.preventDefault();
        const singleTour = tours.find((tour) => tour._id === id);
        setTourData({ ...singleTour, state: "stop selling" });
        const formElement = document.getElementById("formConfirm");
        formElement.classList.remove("d-none");
        formElement.classList.add("d-flex");
    };

    const onCloseFormConfirm = () => {
        const formElement = document.getElementById("formConfirm");
        formElement.classList.add("d-none");
        formElement.classList.remove("d-flex");
    };

    const handleDelete = () => {
        const updatedTourData = { ...tourData, state: "stop selling" };
        const id = tourData._id;
        dispatch(updateTour({ id, updatedTourData, toast, navigate }));
        onCloseFormConfirm();
    };

    return (
        <div className="container mt-3 pt-5 mb-3">
            <div className="row g-5">
                <SideNav />

                <div className="col-xl-9 shadow pb-3">
                    <h1 className="text-center pt-5 pb-3">TOUR MANAGEMENT</h1>
                    {tours.map((tour, index) => (
                        <div
                            className="card mt-2 text-start shadow"
                            key={tour._id}
                        >
                            <div className="card-header">{index + 1}</div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-3">
                                        <h5 className="card-title">
                                            {tour.title}
                                        </h5>
                                        <img
                                            src={tour.imageFile}
                                            alt=""
                                            width={"100%"}
                                        />
                                    </div>

                                    <div className="col-8">
                                        <p className="card-text mb-2">
                                            Mô tả: {excerpt(tour.description)}
                                        </p>
                                        <p className="card-text mb-2">
                                            Giờ mở cửa: {tour.businessHours}
                                        </p>
                                        <p className="card-text mb-2">
                                            Địa điểm: {excerpt(tour.location)}
                                        </p>
                                        <p className="card-text mb-2">
                                            Liên hệ: {tour.contact}
                                        </p>
                                        <p className="card-text mb-2">
                                            Giá: {tour.price}
                                        </p>
                                        <p className="card-text mb-2">
                                            Khuyến mãi: {tour.discount}%
                                        </p>
                                    </div>
                                    <div className="col-1">
                                        <Link to={`/editTour/${tour._id}`}>
                                            <i
                                                className="fas fa-edit mb-4"
                                                style={{
                                                    fontSize: "1.4rem",
                                                    cursor: "pointer",
                                                }}
                                            ></i>
                                        </Link>
                                        <br />
                                        <a href="" style={{ color: "red" }}>
                                            <i
                                                className="fas fa-trash-alt"
                                                style={{
                                                    fontSize: "1.4rem",
                                                    cursor: "pointer",
                                                }}
                                                onClick={(e) =>
                                                    onShowFormConfirm(e, tour._id)
                                                }
                                            ></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {tours.length > 0 && (
                        <Pagination
                            setCurrentPage={setCurrentPage}
                            numberOfPages={numberOfPages}
                            currentPage={currentPage}
                            dispatch={dispatch}
                        />
                    )}
                </div>
            </div>
            
            <div
                className={clsx(styles.formConfirm, "shadow bg-white d-none")}
                id="formConfirm"
            >
                <h4>Bạn có chắc chắn muốn xóa không?</h4>
                <div>
                    <button
                        className="btn bg-danger text-white"
                        onClick={handleDelete}
                    >
                        Có
                    </button>
                    <button className="btn mx-4" onClick={onCloseFormConfirm}>
                        Không
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TourMng;
