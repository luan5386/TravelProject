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
import { createTourBill } from "../../redux/features/tourBillSlice";
import styles from "./tour.module.scss";

const initialState = {
    tourId: "",
    tourTitle: "",
    price: "",
    discount: "",
    email: "",
    quantity: 1,
    totalPrice: "",
    userId: "",
    userName: "",
};

const BookTour = () => {
    const form = useRef();
    const [billData, setBillData] = useState(initialState);
    const { error, tours } = useSelector((state) => ({
        ...state.tour,
    }));
    const { user } = useSelector((state) => ({ ...state.auth }));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const ToastError = () => {
        toast.error("Số lượng vé không hợp lệ!");
    };

    const {
        tourId,
        tourTitle,
        price,
        discount,
        email,
        phoneNumber,
        quantity,
        totalPrice,
        userId,
        userName,
    } = billData;
    const { id } = useParams();

    useEffect(() => {
        const tourData = tours.find((tour) => tour._id === id);
        const { _id, title, price, discount } = tourData;
        const { email, phoneNumber } = user?.result;
        setBillData({
            ...billData,
            tourId: _id,
            tourTitle: title,
            price,
            discount,
            email: user?.result?.email,
            phoneNumber,
            totalPrice: price,
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
                "template_90euhcp",
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
            tourId &&
            tourTitle &&
            price &&
            discount &&
            email &&
            quantity > 0 &&
            totalPrice &&
            userId &&
            userName
        ) {
            const updatedTourBillData = { ...billData };
            console.log(updatedTourBillData)
            sendEmail(e);
            dispatch(createTourBill({ updatedTourBillData, navigate, toast }));
        } else {
            ToastError();
        }
    };
    const onInputChange = (e) => {
        const { name, value } = e.target;
        setBillData({ ...billData, [name]: value });
    };
    const onCalculatePrice = (e) => {
        const quantity = e.target.value;
        const totalPrice =
            price * quantity - (price * quantity * discount) / 100;
        setBillData({ ...billData, quantity, totalPrice });
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
                <h5>Đặt tour</h5>
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
                                value={tourTitle}
                                name="tour_title"
                            />
                            <MDBInput type="text" value={price} name="price" />
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
                                Tour:
                            </MDBCardText>
                        </div>
                        <div className="col-md-8">
                            <MDBCardText className={styles.textLeft}>
                                {tourTitle}
                            </MDBCardText>
                        </div>
                        <div className="col-md-4">
                            <MDBCardText className={styles.textLeft}>
                                Số lượng:
                            </MDBCardText>
                        </div>
                        <div className="col-md-8">
                            <MDBCardText className={styles.textLeft}>
                                <MDBInput
                                    type="text"
                                    value={quantity}
                                    name="quantity"
                                    onChange={onCalculatePrice}
                                    className="form-control"
                                    required
                                    invalid
                                    validation="Vui lòng nhập số lượng"
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
                                Giá vé:
                            </MDBCardText>
                        </div>
                        <div className="col-md-8">
                            <MDBCardText className={styles.textLeft}>
                                {price} vnđ/vé
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
                            <MDBBtn style={{ width: "100%", padding:"0" }}>
                                <input
                                    style={{
                                        backgroundColor: "#1266f1",
                                        color: "white",
                                        height: "40px",
                                        width: "100%",
                                        fontSize: "1rem",
                                        border:"none"
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

export default BookTour;
