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
import { likeTour } from "../../redux/features/tourSlice";
import { toast } from "react-toastify";

const CardTour = ({
    imageFile,
    description,
    title,
    tags,
    businessHours,
    location,
    contact,
    price,
    discount,
    _id,
    name,
    likes,
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
        dispatch(likeTour({ _id }));
    };

    const handleBookTour = () => {
        if (user) {
            navigate(`/bookTour/${_id}`);
        } else {
            toast.warn("Vui lòng đăng nhập để đặt tour!");
            navigate("/login");
        }
    };

    return (
        <MDBCardGroup>
            <MDBCard
                className="h-100 mt-2 d-sm-flex"
                style={{ maxWidth: "20rem" }}
            >
                <Link to={`/tour/${_id}`}>
                    <MDBCardImage
                        src={imageFile}
                        alt={title}
                        position="top"
                        style={{ maxWidth: "100%", height: "180px" }}
                    />
                </Link>
                {/* <div className="top-left">{name}</div> */}
                <span className="text-start tag-card">
                    {tags.map((tag) => (
                        <Link to={`/tours/tag/${tag}`}> #{tag}</Link>
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
                    <MDBCardTitle
                        className="mb-4"
                        style={{ fontSize: "1.2rem" }}
                    >
                        <b>{title}</b>
                    </MDBCardTitle>
                    <MDBCardText className="text-start">
                        <i class="far fa-clock me-2"></i>
                        Giờ mở cửa: {businessHours}
                    </MDBCardText>
                    <MDBCardText className="text-start">
                        <i class="fas fa-map-marker-alt me-2"></i>
                        Địa điểm: {excerpt(location)}
                    </MDBCardText>
                    <MDBCardText className="text-start">
                        <i class="fas fa-dollar-sign me-2"></i>
                        Vé vào: {price} vnđ
                    </MDBCardText>
                    <MDBCardText className="text-start">
                        <i class="fas fa-pen-alt me-2"></i>
                        {excerpt(description)}
                        <Link to={`/tour/${_id}`}>Xem thêm</Link>
                    </MDBCardText>
                    <MDBBtn onClick={handleBookTour} className="btn--gradient">
                        {/* <Link to={`/bookTour/${_id}`} className="text-white">
                            Đặt Tour
                        </Link> */}
                        Đặt Tour
                    </MDBBtn>
                </MDBCardBody>
            </MDBCard>
        </MDBCardGroup>
    );
};

export default CardTour;
