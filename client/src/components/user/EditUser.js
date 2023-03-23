import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, setUser } from "../../redux/features/authSlice";
import { toast } from "react-toastify";
import {
    MDBCard,
    MDBCardBody,
    MDBValidation,
    MDBBtn,
    MDBInput,
} from "mdb-react-ui-kit";

const initialState = {
    username: "",
    password: "",
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    authority: "",
};
function EditUser() {
    const [userData, setUserData] = useState(initialState);
    const { error, user } = useSelector((state) => ({
        ...state.auth,
    }));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { username, password, name, email, phoneNumber, address, authority } =
        userData;
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            setUserData({ ...user.result });
        }
    }, [id]);
    useEffect(() => {
        error && toast.error(error);
    }, [error]);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && email && phoneNumber && address) {
            const updatedUserData = { ...userData };
            const userId = id
            dispatch(updateUser({ id, updatedUserData, toast, navigate, userId }));
            const currentUser = {...user, result: {...updatedUserData}}
            dispatch(setUser(currentUser))
            handleClear();
        }
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
    const onInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
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
                        <div className="col-12">
                            <MDBBtn
                                style={{ width: "100%" }}
                                onClick={handleSubmit}
                            >
                                Submit
                            </MDBBtn>
                        </div>
                    </MDBValidation>
                </MDBCardBody>
            </MDBCard>
        </div>
    );
}

export default EditUser;
