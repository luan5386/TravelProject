import React, { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import {
    MDBCard,
    MDBCardBody,
    MDBValidation,
    MDBBtn,
    MDBInput,
    MDBCardText,
} from "mdb-react-ui-kit";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createRoomBill } from "../../redux/features/roomBillSlice";
import styles from "./room.module.scss";

const initialState = {
    roomId: "",
    roomNumber: "",
    price: "",
    discount: "",
    checkInDate: "",
    checkOutDate: "",
    email: "",
    phoneNumber: "",
    totalPrice: "",
    userId: "",
    userName: "",
};

const BookRoom = () => {
    const form = useRef();
    const [billData, setBillData] = useState(initialState);
    const { error, rooms } = useSelector((state) => ({
        ...state.room,
    }));
    const { user } = useSelector((state) => ({ ...state.auth }));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const ToastError = () => {
        toast.error("Ngày nhận và trả phòng không hợp lệ!");
    };

    const {
        roomId,
        roomNumber,
        price,
        discount,
        checkInDate,
        checkOutDate,
        email,
        phoneNumber,
        totalPrice,
        userId,
        userName,
    } = billData;
    const { id } = useParams();

    useEffect(() => {
        const tourData = rooms.find((room) => room._id === id);
        const { _id, roomNumber, price, discount } = tourData;
        const { email, phoneNumber } = user?.result;
        setBillData({
            ...billData,
            roomId: _id,
            roomNumber,
            price,
            discount,
            email,
            phoneNumber,
            userId: user?.result?._id,
            userName: user?.result?.name,
        });
    }, [id]);

    useEffect(() => {
        error && toast.error(error);
    }, [error]);

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(
                "service_c0rt6nz",
                "template_awm5pu4",
                form.current,
                "dy5aL4V7UAqe1ymcS"
            )
            .then(
                (result) => {
                    console.log(result.text);
                },
                (error) => {
                    console.log(error.text);
                }
            );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            roomId &&
            roomNumber &&
            price &&
            discount &&
            checkInDate &&
            checkOutDate &&
            email &&
            totalPrice > 0 &&
            userId &&
            userName
        ) {
            const updatedRoomBillData = { ...billData };
            sendEmail(e);
            dispatch(createRoomBill({ updatedRoomBillData, navigate, toast }));
        } else {
            ToastError();
        }
    };
    const onInputChange = (e) => {
        const { name, value } = e.target;
        setBillData({ ...billData, [name]: value });
    };
    const onCalculatePrice = (e) => {
        const checkInDate = document.querySelector("#checkInDate").value;
        const checkOutDate = document.querySelector("#checkOutDate").value;

        const numberOfDays =
            (Date.parse(checkOutDate) - Date.parse(checkInDate)) /
            (24 * 60 * 60 * 1000);
        const totalPrice =
            price * numberOfDays - (price * numberOfDays * discount) / 100;
        setBillData({ ...billData, checkInDate, checkOutDate, totalPrice });
    };
    return (
        <div
            style={{
                margin: "auto",
                padding: "15px",
                maxWidth: "600px",
                alignContent: "center",
                marginTop: "120px",
            }}
            className="container"
        >
            <MDBCard alignment="center">
                <h5>Đặt phòng</h5>
                <MDBCardBody>
                    <form
                        ref={form}
                        onSubmit={handleSubmit}
                        className="row g-3"
                    >
                        <div className="col-md-12 d-none">
                            <MDBInput
                                type="text"
                                value={userName}
                                name="user_name"
                            />
                            <MDBInput
                                type="text"
                                value={roomNumber}
                                name="room_number"
                            />
                            <MDBInput type="text" value={price} name="price" />
                            {/* <MDBInput
                                type="text"
                                value={checkInDate}
                                name="check_in_date"
                            />
                            <MDBInput
                                type="text"
                                value={checkOutDate}
                                name="check_out_date"
                            /> */}
                            <MDBInput
                                type="text"
                                value={discount}
                                name="discount"
                            />
                            <MDBInput
                                type="text"
                                value={totalPrice}
                                name="total_price"
                            />
                        </div>
                        <div className="col-md-4">
                            <MDBCardText className={styles.textLeft}>
                                Phòng:
                            </MDBCardText>
                        </div>
                        <div className="col-md-8">
                            <MDBCardText className={styles.textLeft}>
                                {roomNumber}
                            </MDBCardText>
                        </div>
                        <div className="col-md-4">
                            <MDBCardText className={styles.textLeft}>
                                Ngày nhận phòng:
                            </MDBCardText>
                        </div>
                        <div className="col-md-8">
                            <MDBCardText className={styles.textLeft}>
                                <MDBInput
                                    type="date"
                                    id="checkInDate"
                                    name="checkInDate"
                                    value={checkInDate || "dd/mm/yyyy"}
                                    onChange={onCalculatePrice}
                                    min="2022-05-10"
                                    max="2023-05-10"
                                />
                            </MDBCardText>
                        </div>
                        <div className="col-md-4">
                            <MDBCardText className={styles.textLeft}>
                                Ngày trả phòng:
                            </MDBCardText>
                        </div>
                        <div className="col-md-8">
                            <MDBCardText className={styles.textLeft}>
                                <MDBInput
                                    type="date"
                                    id="checkOutDate"
                                    name="checkOutDate"
                                    value={checkOutDate || "dd/mm/yyyy"}
                                    onChange={onCalculatePrice}
                                    min="2022-05-10"
                                    max="2023-05-10"
                                />
                            </MDBCardText>
                        </div>
                        <div className="col-md-4">
                            <MDBCardText className={styles.textLeft}>
                                Email xác nhận:
                            </MDBCardText>
                        </div>
                        <div className="col-md-8">
                            <MDBCardText className={styles.textLeft}>
                                <MDBInput
                                    type="text"
                                    value={email || ""}
                                    name="email"
                                    onChange={onInputChange}
                                    className="form-control"
                                    required
                                    invalid
                                    validation="Vui lòng nhập email"
                                />
                            </MDBCardText>
                        </div>
                        <div className="col-md-4">
                            <MDBCardText className={styles.textLeft}>
                                Giá phòng:
                            </MDBCardText>
                        </div>
                        <div className="col-md-8">
                            <MDBCardText className={styles.textLeft}>
                                {price} vnđ/ngày
                            </MDBCardText>
                        </div>
                        <div className="col-md-4">
                            <MDBCardText className={styles.textLeft}>
                                Giảm giá:
                            </MDBCardText>
                        </div>
                        <div className="col-md-8">
                            <MDBCardText className={styles.textLeft}>
                                {discount}%
                            </MDBCardText>
                        </div>
                        <div className="col-md-4">
                            <MDBCardText className={styles.textLeft}>
                                Tổng tiền:
                            </MDBCardText>
                        </div>
                        <div className="col-md-8">
                            <MDBCardText className={styles.textLeft}>
                                {totalPrice} vnđ
                            </MDBCardText>
                        </div>
                        <div className="col-12">
                            <MDBBtn style={{ width: "100%", padding: "0" }}>
                                <input
                                    style={{
                                        backgroundColor: "#1266f1",
                                        color: "white",
                                        height: "40px",
                                        width: "100%",
                                        fontSize: "1rem",
                                        border: "none",
                                    }}
                                    type="submit"
                                    value="Xác nhận"
                                />
                            </MDBBtn>
                        </div>
                    </form>
                </MDBCardBody>
            </MDBCard>
        </div>
    );
};

export default BookRoom;
