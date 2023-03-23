import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { deleteTour, getAllTours } from "../../redux/features/tourSlice";
import {
    getAllRooms,
    deleteRoom,
    getRooms,
    setCurrentPage,
    updateRoom,
} from "../../redux/features/roomSlice";
import Spinner from "../common/Spinner";
import SideNav from "./SideNav";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "../common/Pagination";
import { toast } from "react-toastify";
import clsx from "clsx";
import styles from "./dashboard.module.scss";

const initialState = {
    roomNumber: "",
    numberOfBeds: "",
    description: "",
    location: "",
    contact: "",
    price: "",
    discount: "",
    state: "on sale",
    tags: [],
};
function RoomMng() {
    const { rooms, loading, currentPage, numberOfPages } = useSelector(
        (state) => ({
            ...state.room,
        })
    );
    const [roomData, setRoomData] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getRooms(currentPage));
    }, [currentPage]);

    const excerpt = (str) => {
        if (str?.length > 45) {
            str = str.substring(0, 45) + " ...";
        }
        return str;
    };

    if (loading) {
        return <Spinner />;
    }

    const onShowFormConfirm = (e, id) => {
        e.preventDefault();
        const singleRoom = rooms.find((room) => room._id === id);
        setRoomData({ ...singleRoom, state: "stop selling" });
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
        const updatedRoomData = { ...roomData, state: "stop selling" };
        const id = roomData._id;
        dispatch(updateRoom({ id, updatedRoomData, toast, navigate }));
        onCloseFormConfirm();
    };
    return (
        <div className={clsx(styles.wrapper)}>
            <div className="container mt-3 pt-5 mb-3">
                <div className="row g-5">
                    <SideNav />

                    <div className="col-xl-9 shadow pb-3">
                        <h1 className="text-center pt-5 pb-3">
                            ROOM MANAGEMENT
                        </h1>
                        {rooms.map((room, index) => (
                            <div
                                className="card mt-2 text-start shadow"
                                key={room._id}
                            >
                                <div className="card-header">{index + 1}</div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-3">
                                            <h5 className="card-title">
                                                Phòng: {room.roomNumber}
                                            </h5>
                                            <img
                                                src={room.imageFile}
                                                alt=""
                                                width={"100%"}
                                            />
                                        </div>

                                        <div className="col-8">
                                            <p className="card-text mb-2">
                                                Giờ mở cửa: {room.numberOfBeds}
                                            </p>
                                            <p className="card-text mb-2">
                                                Mô tả:{" "}
                                                {excerpt(room.description)}
                                            </p>
                                            <p className="card-text mb-2">
                                                Địa điểm:{" "}
                                                {excerpt(room.location)}
                                            </p>
                                            <p className="card-text mb-2">
                                                Liên hệ: {room.contact}
                                            </p>
                                            <p className="card-text mb-2">
                                                Giá: {room.price}
                                            </p>
                                            <p className="card-text mb-2">
                                                Khuyến mãi: {room.discount}%
                                            </p>
                                        </div>
                                        <div className="col-1">
                                            <Link to={`/editRoom/${room._id}`}>
                                                <i
                                                    className="fas fa-edit mb-4"
                                                    style={{
                                                        fontSize: "1.4rem",
                                                        cursor: "pointer",
                                                    }}
                                                ></i>
                                            </Link>
                                            <br />

                                            <a
                                                href="#"
                                                style={{ color: "red" }}
                                                data-toggle="modal"
                                                data-target="#exampleModal"
                                            >
                                                <i
                                                    className="fas fa-trash-alt"
                                                    style={{
                                                        fontSize: "1.4rem",
                                                        cursor: "pointer",
                                                    }}
                                                    onClick={(e) =>
                                                        onShowFormConfirm(
                                                            e,
                                                            room._id
                                                        )
                                                    }
                                                ></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {rooms.length > 0 && (
                            <Pagination
                                setCurrentPage={setCurrentPage}
                                numberOfPages={numberOfPages}
                                currentPage={currentPage}
                                dispatch={dispatch}
                            />
                        )}
                    </div>
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

export default RoomMng;
