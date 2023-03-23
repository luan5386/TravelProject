import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, setUser, changePassword } from "../../redux/features/authSlice";
import { toast } from "react-toastify";
import {
    MDBCard,
    MDBCardBody,
    MDBValidation,
    MDBBtn,
    MDBInput,
    MDBCardText,
} from "mdb-react-ui-kit";

const initialState = {
    username: "",
    password: "",
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    authority: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
};
function ChangePassword() {
    const [userData, setUserData] = useState(initialState);
    const { error, user } = useSelector((state) => ({
        ...state.auth,
    }));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        username,
        password,
        name,
        email,
        phoneNumber,
        address,
        authority,
        oldPassword,
        newPassword,
        confirmPassword,
    } = userData;
    // const oldPassword = "";
    // const newPassword = "";
    // const confirmPassword = "";
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            setUserData({ ...user?.result });
        }
    }, [id]);
    useEffect(() => {
        error && toast.error(error);
    }, [error]);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (oldPassword && newPassword && confirmPassword) {
            const updatedUserData = { ...userData };
            console.log(updatedUserData);
            dispatch(
                changePassword({ id, updatedUserData, toast, navigate})
            );
            const currentUser = { ...user, result: { ...updatedUserData } };
            console.log(currentUser);
            // dispatch(setUser(currentUser));
            // handleClear();
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
                maxWidth: "600px",
                alignContent: "center",
                marginTop: "120px",
            }}
            className="container"
        >
            <MDBCard alignment="center">
                <h5>Đổi mật khẩu</h5>
                <MDBCardBody>
                    <MDBValidation
                        onSubmit={handleSubmit}
                        className="row g-3"
                        noValidate
                    >
                        <div className="col-4">
                            <MDBCardText>Mật khẩu hiện tại:</MDBCardText>
                        </div>
                        <div className="col-8">
                            <MDBInput
                                label="Old Password"
                                type="password"
                                value={oldPassword}
                                name="oldPassword"
                                onChange={onInputChange}
                                required
                                invalid
                                validation="Please provide old password"
                            />
                        </div>
                        <div className="col-4">
                            <MDBCardText>Mật khẩu mới:</MDBCardText>
                        </div>
                        <div className="col-8">
                            <MDBInput
                                label="New Password"
                                type="password"
                                value={newPassword}
                                name="newPassword"
                                onChange={onInputChange}
                                required
                                invalid
                                validation="Please provide new password"
                            />
                        </div>
                        <div className="col-4">
                            <MDBCardText>Xác nhận mật khẩu:</MDBCardText>
                        </div>
                        <div className="col-8">
                            <MDBInput
                                label="Confirm Password"
                                type="password"
                                value={confirmPassword}
                                name="confirmPassword"
                                onChange={onInputChange}
                                className="form-control"
                                required
                                invalid
                                validation="Please enter a confirm password"
                            />
                        </div>
                        <div className="col-12">
                            <MDBBtn
                                style={{ width: "160px" }}
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

export default ChangePassword;
