import React from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBCardGroup,
    MDBBtn,
    MDBIcon,
    MDBTooltip,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { likeRoom } from "../../redux/features/roomSlice";
import { toast } from "react-toastify";

const CardRoom = ({
    imageFile,
    description,
    roomNumber,
    numberOfBeds,
    tags,
    location,
    contact,
    price,
    discount,
    _id,
    name,
    likes,
    state,
}) => {
    const { user } = useSelector((state) => ({ ...state.auth }));
    const userId = user?.result?._id;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const excerpt = (str) => {
        if (str.length > 45) {
            str = str.substring(0, 45) + " ...";
        }
        return str;
    };

    const Likes = () => {
        if (likes.length > 0) {
            return likes.find((like) => like === userId) ? (
                <>
                    <MDBIcon fas icon="thumbs-up" />
                    &nbsp;
                    {likes.length > 2 ? (
                        <MDBTooltip
                            tag="a"
                            title={`You and ${
                                likes.length - 1
                            } other people likes`}
                        >
                            {likes.length} Likes
                        </MDBTooltip>
                    ) : (
                        `${likes.length} Like${likes.length > 1 ? "s" : ""}`
                    )}
                </>
            ) : (
                <>
                    <MDBIcon far icon="thumbs-up" />
                    &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
                </>
            );
        }
        return (
            <>
                <MDBIcon far icon="thumbs-up" />
                &nbsp;Like
            </>
        );
    };

    const handleLike = () => {
        dispatch(likeRoom({ _id }));
    };

    const handleBookRoom = () => {
        if (user) {
            navigate(`/bookRoom/${_id}`);
        } else {
            toast.warn("Vui lòng đăng nhập để đặt phòng!");
            navigate("/login");
        }
    };

    return state === "stop selling" ? null : (
        <>
            <MDBCardGroup className="justify-content-center">
                <MDBCard
                    className="h-100 mt-2 d-sm-flex"
                    style={{ maxWidth: "20rem" }}
                >
                    <Link to={`/room/${_id}`}>
                        <MDBCardImage
                            src={imageFile}
                            alt={roomNumber}
                            position="top"
                            style={{ maxWidth: "100%", height: "180px" }}
                        />
                    </Link>
                    <span className="text-start tag-card">
                        {tags.map((tag) => (
                            <Link to={`/rooms/tag/${tag}`}> #{tag}</Link>
                        ))}
                        <MDBBtn
                            style={{ float: "right" }}
                            tag="a"
                            color="none"
                            onClick={!user?.result ? null : handleLike}
                        >
                            {!user?.result ? (
                                <MDBTooltip
                                    title="Please login to like tour"
                                    tag="a"
                                >
                                    <Likes />
                                </MDBTooltip>
                            ) : (
                                <Likes />
                            )}
                        </MDBBtn>
                    </span>
                    <MDBCardBody>
                        <MDBCardTitle className="mb-4">
                            <b>Phòng: {roomNumber}</b>
                        </MDBCardTitle>
                        <MDBCardText className="text-start">
                            <i class="fas fa-dice-d20 me-2"></i>
                            Số giường: {numberOfBeds}
                        </MDBCardText>
                        <MDBCardText className="text-start">
                            <i class="fas fa-dollar-sign me-2"></i>
                            Giá phòng: {price} vnđ/ngày
                        </MDBCardText>
                        <MDBCardText className="text-start">
                            <i class="fas fa-map-marker-alt me-2"></i>
                            Địa điểm: {excerpt(location)}
                        </MDBCardText>
                        <MDBCardText className="text-start">
                            <i class="fas fa-phone-square me-2"></i>
                            Liên lạc: {contact}
                        </MDBCardText>
                        <MDBCardText className="text-start">
                            <i class="fas fa-pen-alt me-2"></i>
                            {excerpt(description)}
                            <Link to={`/room/${_id}`}>Xem thêm</Link>
                        </MDBCardText>
                        <MDBBtn onClick={handleBookRoom} className="btn--gradient">Đặt phòng</MDBBtn>
                    </MDBCardBody>
                </MDBCard>
            </MDBCardGroup>
        </>
    );
};

export default CardRoom;
