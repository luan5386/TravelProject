import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardGroup,
    MDBBtn,
    MDBIcon,
} from "mdb-react-ui-kit";
import UserSideNav from "./UserSideNav";

function User() {
    const { user } = useSelector((state) => ({ ...state.auth }));
    return (
        <div className="container m-5">
            <div className="row g-5">
                <UserSideNav />

                <div className="col-xl-9 col-12 shadow d-flex flex-column align-items-center">
                    <h1 className="text-center py-5">Hồ sơ của tôi</h1>

                    <MDBCardGroup className="pb-5">
                        <MDBCard
                            className="h-100 mt-2 d-sm-flex"
                            style={{ maxWidth: "40rem", minWidth: "20rem" }}
                        >
                            <MDBIcon
                                    fas
                                    icon="user-alt"
                                    style={{fontSize: "2rem"}}
                                />
                            <MDBCardBody>
                                <MDBCardTitle className="text-start mb-3">
                                    Tên: {user?.result?.name}
                                </MDBCardTitle>
                                <MDBCardTitle className="text-start mb-3">
                                    Địa chỉ: {user?.result?.address}
                                </MDBCardTitle>
                                <MDBCardTitle className="text-start mb-3">
                                    Email: {user?.result?.email}
                                </MDBCardTitle>
                                <MDBCardTitle className="text-start mb-4">
                                    Số điện thoại: {user?.result?.phoneNumber}
                                </MDBCardTitle>
                                
                                <Link to={`/editInfoUser/${user?.result?._id}`}>
                                <MDBBtn >
                                    Chỉnh sửa
                                </MDBBtn>
                                </Link>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCardGroup>
                </div>
            </div>
        </div>
    );
}

export default User;
