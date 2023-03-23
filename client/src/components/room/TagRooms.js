import React, { useEffect } from "react";
import {
    MDBCard,
    MDBCardTitle,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBCardGroup,
} from "mdb-react-ui-kit";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../common/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { getRoomsByTag } from "../../redux/features/roomSlice";
import { excerpt } from "../../utility";

const TagRooms = () => {
    const { tagRooms, loading } = useSelector((state) => ({ ...state.room }));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { tag } = useParams();

    useEffect(() => {
        if (tag) {
            dispatch(getRoomsByTag(tag));
        }
    }, [tag]);

    if (loading) {
        return <Spinner />;
    }

    return (
        <div
            style={{
                margin: "auto",
                padding: "120px",
                maxWidth: "900px",
                alignContent: "center",
            }}
        >
            <h3 className="text-center">Các phòng liên quan đến thẻ: {tag}</h3>
            <hr style={{ maxWidth: "570px" }} />
            {tagRooms &&
                tagRooms.map((item) => (
                    <MDBCardGroup key={item._id} className="mb-3" style={{minHeight: "140px"}}>
                        <MDBCard style={{ maxWidth: "600px" }} className="mt-2">
                            <MDBRow className="g-0">
                                <MDBCol md="4">
                                    <MDBCardImage
                                        className="rounded"
                                        src={item.imageFile}
                                        alt={item.roomNumber}
                                        fluid
                                    />
                                </MDBCol>
                                <MDBCol md="8">
                                    <MDBCardBody>
                                        <MDBCardTitle className="text-start" style={{marginTop: "-20px"}}>
                                            Phòng: {item.roomNumber}
                                        </MDBCardTitle>
                                        <MDBCardText className="text-start mb-1">
                                            Số giường: {item.numberOfBeds}
                                        </MDBCardText>
                                        <MDBCardText className="text-start mb-1">
                                            {excerpt(item.description, 40)}
                                        </MDBCardText>
                                        <div
                                            style={{
                                                float: "left",
                                            }}
                                        >
                                            <MDBBtn
                                                className="mb-2"
                                                size="sm"
                                                rounded
                                                color="info"
                                                onClick={() =>
                                                    navigate(
                                                        `/room/${item._id}`
                                                    )
                                                }
                                            >
                                                Xem thêm
                                            </MDBBtn>
                                        </div>
                                    </MDBCardBody>
                                </MDBCol>
                            </MDBRow>
                        </MDBCard>
                    </MDBCardGroup>
                ))}
        </div>
    );
};

export default TagRooms;
