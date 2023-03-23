import React, { useState, useEffect } from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBValidation,
    MDBBtn,
    MDBInput,
} from "mdb-react-ui-kit";
import ChipInput from "material-ui-chip-input";
import FileBase from "react-file-base64";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { createRoom, updateRoom } from "../../redux/features/roomSlice";
import { createUser, updateUser } from "../../redux/features/authSlice";

const initialState = {
    username: "",
    password: "",
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    authority: "",
};

const AddEditUser = () => {
    const [userData, setUserData] = useState(initialState);
    const { error, users, user } = useSelector((state) => ({
        ...state.auth,
    }));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { username, password, name, email, phoneNumber, address, authority } =
        userData;
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const singleUser = users.find((user) => user._id === id);
            setUserData({ ...singleUser });
        }
    }, [id]);

    useEffect(() => {
        error && toast.error(error);
    }, [error]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            username &&
            password &&
            name &&
            email &&
            phoneNumber &&
            address &&
            authority
        ) {
            const updatedUserData = { ...userData };
            if (!id) {
                dispatch(createUser({ updatedUserData, navigate, toast }));
            } else {
                const userId = user.result._id
                dispatch(updateUser({ id, updatedUserData, toast, navigate, userId }));
            }
            handleClear();
        }
    };
    const onInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };
    const handleClear = () => {
        setUserData({
            username: "",
            password: "",
            name: "",
            email: "",
            phoneNumber: "",
            address: "",
            authority: "",
        });
    };
    return (
        <div
            style={{
                margin: "auto",
                padding: "15px",
                maxWidth: "450px",
                alignContent: "center",
                marginTop: "120px",
            }}
            className="container"
        >
            <MDBCard alignment="center">
                <h5>{id ? "Cập nhật user" : "Thêm user"}</h5>
                <MDBCardBody>
                    <MDBValidation
                        onSubmit={handleSubmit}
                        className="row g-3"
                        noValidate
                    >
                        <div className="col-md-12">
                            <MDBInput
                                label="Username"
                                type="text"
                                value={username || ""}
                                name="username"
                                onChange={onInputChange}
                                className="form-control"
                                required
                                invalid
                                validation="Please enter a username"
                            />
                        </div>
                        <div className="col-md-12">
                            <MDBInput
                                label="Password"
                                // placeholder="Enter number of beds"
                                type="text"
                                value={password || ""}
                                name="password"
                                onChange={onInputChange}
                                className="form-control"
                                required
                                invalid
                                validation="Please enter a password"
                            />
                        </div>
                        <div className="col-md-12">
                            <MDBInput
                                label="Name"
                                type="text"
                                value={name}
                                name="name"
                                onChange={onInputChange}
                                required
                                invalid
                                validation="Please provide name"
                            />
                        </div>
                        <div className="col-md-12">
                            <MDBInput
                                label="Email"
                                type="email"
                                value={email}
                                name="email"
                                onChange={onInputChange}
                                className="form-control"
                                required
                                invalid
                                validation="Please enter a email"
                            />
                        </div>
                        <div className="col-md-12">
                            <MDBInput
                                label="Address"
                                type="text"
                                value={address}
                                name="address"
                                onChange={onInputChange}
                                className="form-control"
                                required
                                invalid
                                validation="Please enter a address"
                            />
                        </div>
                        <div className="col-md-12">
                            <MDBInput
                                label="Phone number"
                                type="text"
                                value={phoneNumber}
                                name="phoneNumber"
                                onChange={onInputChange}
                                className="form-control"
                                required
                                invalid
                                validation="Please enter a phone number"
                            />
                        </div>

                        <div className="col-md-12 d-flex align-items-center">
                            <p className="mb-0">Authority: </p>
                            <select
                                className="browser-default custom-select"
                                name="authority"
                                onChange={onInputChange}
                                style={{width: "100%", height: "36px", marginLeft: "16px"}}
                            >
                                <option value="ADMIN">ADMIN</option>
                                <option value="MANAGER">MANAGER</option>
                                <option value="EMPLOYEE">EMPLOYEE</option>
                                <option value="NORMAL">NORMAL</option>
                            </select>
                        </div>
                        <div className="col-12">
                            <MDBBtn
                                style={{ width: "100%" }}
                                onClick={handleSubmit}
                            >
                                {/* {id ? "Cập nhật" : "Thêm"} */}
                                Submit
                            </MDBBtn>
                            <MDBBtn
                                style={{ width: "100%" }}
                                className="mt-2"
                                color="danger"
                                onClick={handleClear}
                            >
                                Clear
                            </MDBBtn>
                        </div>
                    </MDBValidation>
                </MDBCardBody>
            </MDBCard>
        </div>
    );
};

export default AddEditUser;
