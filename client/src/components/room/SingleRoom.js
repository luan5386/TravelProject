import React, { useEffect, useState } from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBCardText,
    MDBCardImage,
    MDBContainer,
    MDBIcon,
    MDBBtn,
    MDBInput,
    MDBCardTitle,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import Spinner from "../common/Spinner";
import { getRoom, getRelatedRooms } from "../../redux/features/roomSlice";
import { getRoomsByUser } from "../../redux/features/roomBillSlice";
import RelatedTours from "./RelatedRooms";
import { toast } from "react-toastify";
import styles from "./room.module.scss";

import {
    createComment,
    getCommentsByService,
    deleteComment,
    updateComment,
    getCommentsById,
} from "../../redux/features/commentSlice";

const initialState = {
    serviceId: "",
    userId: "",
    userName: "",
    content: "",
    replyComments: [],
};

const initialStateReplyComment = {
    userId: "",
    userName: "",
    content: "",
    createdAt: new Date(),
};

const SingleRoom = () => {
    const dispatch = useDispatch();
    const { room, loading, relatedRooms } = useSelector((state) => ({
        ...state.room,
    }));
    const { userRoomBills } = useSelector((state) => ({
        ...state.roomBill,
    }));
    const { user } = useSelector((state) => ({ ...state.auth }));
    const { id } = useParams();
    const navigate = useNavigate();
    const tags = room?.tags;

    const { comments, comment } = useSelector((state) => ({
        ...state.comment,
    }));
    const [commentData, setCommentData] = useState(initialState);
    const { serviceId, userId, userName, content } = commentData;
    let { replyComments } = comment;
    const [cmtId, setCmtId] = useState("");

    const [repCmt, setRepCmt] = useState(initialStateReplyComment);
    const [editRepCmt, setEditRepCmt] = useState("");

    useEffect(() => {
        tags && dispatch(getRelatedRooms(tags));
    }, [tags]);

    useEffect(() => {
        dispatch(getRoomsByUser(user?.result?._id));
    }, []);

    useEffect(() => {
        if (id) {
            dispatch(getRoom(id));
            dispatch(getCommentsByService(id));
        }
    }, [id]);

    if (loading) {
        return <Spinner />;
    }

    const handleBookRoom = () => {
        if (user) {
            navigate(`/bookRoom/${id}`);
        } else {
            toast.warn("Vui lòng đăng nhập để đặt phòng!");
            navigate("/login");
        }
    };

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setCommentData({ ...commentData, [name]: value });
    };

    const onShowCommentForm = () => {
        const userRoomBillsLength = userRoomBills.length;
        let isBooked = false;
        for (let i = 0; i < userRoomBillsLength; i++) {
            if (id === userRoomBills[i].roomId) {
                isBooked = true;
                break;
            }
        }
        if (isBooked) {
            const cmtElement = document.getElementById("comment");
            cmtElement.classList.remove("d-none");
            cmtElement.classList.add("d-block");
        } else {
            toast.warn("Vui lòng đặt phòng này trước khi đánh giá!");
        }
    };

    const handleCancelComment = () => {
        const cmtElement = document.getElementById("comment");
        cmtElement.classList.remove("d-block");
        cmtElement.classList.add("d-none");
    };

    const handleAddEditComment = (e) => {
        e.preventDefault();
        if (content) {
            let updatedCommentData = {
                ...commentData,
                serviceId: id,
                userId: user?.result?._id,
                userName: user?.result?.name,
                createdAt: new Date(),
            };
            if (cmtId) {
                updatedCommentData = {
                    ...updatedCommentData,
                    replyComments: comment.replyComments,
                };
                dispatch(updateComment({ cmtId, updatedCommentData, toast }));
                setCmtId("");
                handleCancelEditComment(e);
            } else {
                dispatch(createComment({ id, updatedCommentData, toast }));
                handleCancelComment();
            }
            setCommentData(initialState);
        }
    };

    const handleDeleteComment = (e) => {
        const cmtId = e.target.getAttribute("value");
        if (window.confirm("Are you sure you want to delete this comment?")) {
            dispatch(deleteComment({ cmtId, toast }));
        }
    };

    const onEditComment = (e) => {
        e.preventDefault();
        const cmtId = e.target.getAttribute("cmtid");
        const itemIndex = e.target.getAttribute("index");
        const cmtElement = document.getElementById(`editComment_${itemIndex}`);
        cmtElement.classList.remove("d-none");
        cmtElement.classList.add("d-block");
        setCmtId(cmtId);
        setCommentData({
            ...commentData,
            content: e.target.getAttribute("value"),
        });
        dispatch(getCommentsById(cmtId));
    };
    const handleCancelEditComment = (e) => {
        const itemIndex = e.target.getAttribute("index");
        const cmtElement = document.getElementById(`editComment_${itemIndex}`);
        cmtElement.classList.remove("d-block");
        cmtElement.classList.add("d-none");
    };
    const onInputChangeComment = (e) => {
        const { name, value } = e.target;
    };

    // Reply comment
    const onShowReplyCommentForm = (e) => {
        e.preventDefault();
        if (user?.result?.authority === "ADMIN") {
            const cmtId = e.target.getAttribute("cmtid");
            dispatch(getCommentsById(cmtId));
            setCmtId(cmtId);
            const itemIndex = e.target.getAttribute("index");
            const cmtElement = document.getElementById(
                `replyComment_${itemIndex}`
            );
            cmtElement.classList.remove("d-none");
            cmtElement.classList.add("d-block");
        } else {
            const userRoomBillsLength = userRoomBills.length;
            let isBooked = false;
            for (let i = 0; i < userRoomBillsLength; i++) {
                if (id === userRoomBills[i].roomId) {
                    isBooked = true;
                    break;
                }
            }
            if (isBooked) {
                const cmtId = e.target.getAttribute("cmtid");
                dispatch(getCommentsById(cmtId));
                setCmtId(cmtId);
                const itemIndex = e.target.getAttribute("index");
                const cmtElement = document.getElementById(
                    `replyComment_${itemIndex}`
                );
                cmtElement.classList.remove("d-none");
                cmtElement.classList.add("d-block");
            } else {
                toast.warn("Vui lòng đặt phòng này trước khi đánh giá!");
            }
        }
    };

    const handleCancelReplyComment = (e) => {
        setRepCmt(initialStateReplyComment);
        const itemIndex = e.target.getAttribute("index");
        const cmtElement = document.getElementById(`replyComment_${itemIndex}`);
        cmtElement.classList.remove("d-block");
        cmtElement.classList.add("d-none");
    };

    const onInputChangeRepCmt = (e) => {
        const { value } = e.target;
        setRepCmt({
            userId: user?.result?._id,
            userName: user?.result?.name,
            content: value,
            createdAt: new Date(),
        });
    };

    const handleAddReplyComment = (e) => {
        replyComments = [...replyComments, repCmt];
        const updatedCommentData = {
            ...comment,
            replyComments,
        };
        dispatch(updateComment({ cmtId, updatedCommentData, toast }));
        setCmtId("");
        handleCancelReplyComment(e);
    };

    const onOpenDeleteReplyCommentForm = (e) => {
        e.preventDefault();
        const cmtId = e.target.getAttribute("cmtid");
        const itemIndex = e.target.getAttribute("index");
        const cmtElement = document.getElementById(
            `deleteCommentForm_${cmtId}_${itemIndex}`
        );
        cmtElement.classList.remove("d-none");
        cmtElement.classList.add("d-block");
        dispatch(getCommentsById(cmtId));
    };

    const onCloseDeleteReplyCommentForm = (e) => {
        const cmtId = e.target.getAttribute("cmtid");
        const itemIndex = e.target.getAttribute("index");
        const cmtElement = document.getElementById(
            `deleteCommentForm_${cmtId}_${itemIndex}`
        );
        cmtElement.classList.add("d-none");
        cmtElement.classList.remove("d-block");
    };

    const handleDeleteReplyComment = (e) => {
        const itemIndex = e.target.getAttribute("index");
        let temp = [...replyComments];
        temp.splice(itemIndex, 1);
        replyComments = [...temp];
        const updatedCommentData = {
            ...comment,
            replyComments,
        };
        const cmtId = comment._id;
        dispatch(updateComment({ cmtId, updatedCommentData, toast }));
        onCloseDeleteReplyCommentForm(e);
    };

    const onShowEditReplyCommentForm = (e) => {
        e.preventDefault();
        const cmtId = e.target.getAttribute("cmtid");
        const itemIndex = e.target.getAttribute("index");
        const cmtElement = document.getElementById(
            `editReplyComment_${cmtId}_${itemIndex}`
        );
        cmtElement.classList.remove("d-none");
        cmtElement.classList.add("d-block");
        setEditRepCmt(e.target.getAttribute("value"));
        dispatch(getCommentsById(cmtId));
    };
    const handleEditReplyComment = (e) => {
        const cmtId = e.target.getAttribute("cmtid");
        const itemIndex = e.target.getAttribute("index");
        const temp = [...replyComments];
        temp.splice(itemIndex, 1, repCmt);
        replyComments = [...temp];
        const updatedCommentData = {
            ...comment,
            replyComments,
        };
        if (replyComments[itemIndex].content !== "") {
            dispatch(updateComment({ cmtId, updatedCommentData, toast }));
            onCloseEditReplyComment(e);
        } else {
            toast.warn("You haven't changed your comment yet");
        }
    };
    const onInputChangeEditRepCmt = (e) => {
        const { name, value } = e.target;
        setEditRepCmt(value);
        setRepCmt({
            userId: user?.result?._id,
            userName: user?.result?.name,
            content: value,
            createdAt: new Date(),
        });
    };
    const onCloseEditReplyComment = (e) => {
        e.preventDefault();
        setEditRepCmt("");
        setRepCmt(initialStateReplyComment);
        const cmtId = e.target.getAttribute("cmtid");
        const itemIndex = e.target.getAttribute("index");
        const cmtElement = document.getElementById(
            `editReplyComment_${cmtId}_${itemIndex}`
        );
        cmtElement.classList.add("d-none");
        cmtElement.classList.remove("d-block");
    };

    return (
        <>
            <MDBContainer className="mt-5 pt-3">
                <MDBCard className="mb-3 mt-2 container">
                    <div className="row">
                        <img
                            position="top"
                            style={{ maxHeight: "600px" }}
                            src={room.imageFile}
                            alt={room.roomNumber}
                            className="col-lg-6 image-item-detail"
                        />
                        <MDBCardBody className="col-lg-6">
                            <MDBBtn
                                tag="a"
                                color="none"
                                style={{ float: "left", color: "#000" }}
                                onClick={() => navigate("/room")}
                            >
                                <MDBIcon
                                    fas
                                    size="lg"
                                    icon="long-arrow-alt-left"
                                    style={{ float: "left" }}
                                />
                            </MDBBtn>
                            <h3
                                style={{
                                    fontSize: "2rem",
                                    marginBottom: "32px",
                                }}
                            >
                                <b>Phòng: {room.roomNumber}</b>
                            </h3>

                            <div style={{ width: "100%" }}>
                                <span
                                    className="text-start"
                                    style={{ float: "left" }}
                                >
                                    {room &&
                                        room.tags &&
                                        room.tags.map((item) => `#${item} `)}
                                </span>
                                {room?.state === "stop selling" ? (
                                    <button
                                        className="btn btn-danger disabled text-end"
                                        style={{ float: "right" }}
                                    >
                                        Ngừng hoạt động
                                    </button>
                                ) : (
                                    <button
                                        className="btn btn--gradient text-end"
                                        style={{
                                            float: "right",
                                            color: "#fff",
                                            fontSize: "1rem",
                                        }}
                                        onClick={handleBookRoom}
                                    >
                                        <b>Đặt phòng</b>
                                    </button>
                                )}
                            </div>
                            <br />
                            <MDBCardText className="lead mb-0 text-start mt-5">
                                <i class="fas fa-dice-d20 me-4"></i>
                                Số giường: {room.numberOfBeds}
                            </MDBCardText>
                            <MDBCardText className="lead mb-0 text-start mt-3">
                                <i class="fas fa-map-marker-alt me-4"></i>
                                Địa điểm: {room.location}
                            </MDBCardText>
                            <MDBCardText className="lead mb-0 text-start mt-3">
                                <i class="fas fa-phone-square me-4"></i>
                                Liên lạc: {room.contact}
                            </MDBCardText>
                            <MDBCardText className="lead mb-0 text-start mt-3">
                                <i class="fas fa-dollar-sign me-4"></i>
                                Giá phòng: {room.price}
                            </MDBCardText>
                            {room.discount === "0" ? null : (
                                <MDBCardText className="lead mb-0 text-start mt-3">
                                    <i class="fas fa-cannabis me-4"></i>
                                    Giảm giá: {room.discount}%
                                </MDBCardText>
                            )}
                        </MDBCardBody>
                    </div>
                    <MDBCardBody className="item-description">
                        <MDBCardText className="lead mb-0 text-start">
                            Mô tả: {room.description}
                        </MDBCardText>
                    </MDBCardBody>
                    <RelatedTours relatedRooms={relatedRooms} tourId={id} />
                    {room?.state === "stop selling" ? null : (
                        <>
                            <MDBBtn
                                className="btn btn--primary my-4"
                                style={{ width: "160px" }}
                                onClick={onShowCommentForm}
                            >
                                Thêm đánh giá
                            </MDBBtn>
                        </>
                    )}
                    <div className="d-none" id="comment">
                        <MDBInput
                            type="text"
                            textarea
                            rows={4}
                            value={content}
                            name="content"
                            onChange={onInputChange}
                        />
                        <div className="my-2">
                            <MDBBtn
                                className="me-3"
                                onClick={handleAddEditComment}
                            >
                                OK
                            </MDBBtn>
                            <MDBBtn onClick={handleCancelComment}>
                                Cancel
                            </MDBBtn>
                        </div>
                    </div>
                    <div className="container">
                        {comments && (
                            <>
                                {comments.length === 0 ? null : (
                                    <h2 className="my-3 text-start">
                                        {comments && "Các đánh giá:"}
                                    </h2>
                                )}
                                {comments.map((item, index) => (
                                    <div
                                        className="row shadow-sm mt-3"
                                        key={index}
                                    >
                                        <div className="col-1">
                                            <MDBIcon
                                                fas
                                                icon="user-alt"
                                                className="align-self-center ms-3"
                                            />
                                        </div>
                                        <div className="col-11">
                                            <MDBCardTitle
                                                className={styles.textLeft}
                                            >
                                                <b>{item.userName}</b>
                                            </MDBCardTitle>
                                            <MDBCardText
                                                className={styles.textLeft}
                                            >
                                                {item.content}
                                            </MDBCardText>
                                            <MDBCardText
                                                className={styles.textLeft}
                                            >
                                                {new Date(
                                                    item.createdAt
                                                ).toLocaleTimeString()}
                                                ,{" "}
                                                {new Date(
                                                    item.createdAt
                                                ).toLocaleDateString()}
                                            </MDBCardText>
                                            <div className={styles.textLeft}>
                                                <a
                                                    href="#"
                                                    className="mr-4"
                                                    onClick={
                                                        onShowReplyCommentForm
                                                    }
                                                    value={item.content}
                                                    index={index}
                                                    cmtid={item._id}
                                                >
                                                    Trả lời
                                                </a>
                                                {item.userId ===
                                                user.result._id ? (
                                                    <>
                                                        <a
                                                            href="/edit"
                                                            className="mr-4"
                                                            style={{
                                                                marginLeft:
                                                                    "16px",
                                                            }}
                                                            onClick={
                                                                onEditComment
                                                            }
                                                            value={item.content}
                                                            index={index}
                                                            cmtid={item._id}
                                                        >
                                                            Sửa
                                                        </a>
                                                        <a
                                                            href="#"
                                                            className="me-2"
                                                            style={{
                                                                marginLeft:
                                                                    "16px",
                                                            }}
                                                            value={item._id}
                                                            onClick={
                                                                handleDeleteComment
                                                            }
                                                        >
                                                            Xóa
                                                        </a>
                                                    </>
                                                ) : user.result.authority ===
                                                  "ADMIN" ? (
                                                    <a
                                                        href="#"
                                                        className="me-2"
                                                        style={{
                                                            marginLeft: "16px",
                                                        }}
                                                        value={item._id}
                                                        onClick={
                                                            handleDeleteComment
                                                        }
                                                    >
                                                        Xóa
                                                    </a>
                                                ) : null}
                                            </div>
                                            <div
                                                className="d-none"
                                                id={`editComment_${index}`}
                                            >
                                                <MDBInput
                                                    type="text"
                                                    textarea
                                                    rows={2}
                                                    value={content}
                                                    name="content"
                                                    onChange={onInputChange}
                                                />
                                                <div className="my-2">
                                                    <MDBBtn
                                                        className="me-3"
                                                        index={index}
                                                        onClick={
                                                            handleAddEditComment
                                                        }
                                                    >
                                                        OK
                                                    </MDBBtn>
                                                    <MDBBtn
                                                        index={index}
                                                        onClick={
                                                            handleCancelEditComment
                                                        }
                                                    >
                                                        Cancel
                                                    </MDBBtn>
                                                </div>
                                            </div>
                                            <div
                                                className="d-none"
                                                id={`replyComment_${index}`}
                                            >
                                                <MDBInput
                                                    type="text"
                                                    textarea
                                                    rows={2}
                                                    value={repCmt.content}
                                                    cmtid={item._id}
                                                    name="content"
                                                    onChange={
                                                        onInputChangeRepCmt
                                                    }
                                                />
                                                <div className="my-2">
                                                    <MDBBtn
                                                        className="me-3"
                                                        index={index}
                                                        onClick={
                                                            handleAddReplyComment
                                                        }
                                                    >
                                                        OK
                                                    </MDBBtn>
                                                    <MDBBtn
                                                        index={index}
                                                        onClick={
                                                            handleCancelReplyComment
                                                        }
                                                    >
                                                        Cancel
                                                    </MDBBtn>
                                                </div>
                                            </div>
                                            {item.replyComments &&
                                                item.replyComments.map(
                                                    (repItem, index) => (
                                                        <div
                                                            className="row shadow-sm mt-3"
                                                            key={index}
                                                        >
                                                            <div className="col-1">
                                                                <MDBIcon
                                                                    fas
                                                                    icon="user-alt"
                                                                    className="align-self-center ms-3"
                                                                />
                                                            </div>
                                                            <div className="col-11">
                                                                <MDBCardTitle
                                                                    className={
                                                                        styles.textLeft
                                                                    }
                                                                >
                                                                    {
                                                                        repItem.userName
                                                                    }
                                                                </MDBCardTitle>
                                                                <MDBCardText
                                                                    className={
                                                                        styles.textLeft
                                                                    }
                                                                >
                                                                    {
                                                                        repItem.content
                                                                    }
                                                                </MDBCardText>
                                                                <MDBCardText
                                                                    className={
                                                                        styles.textLeft
                                                                    }
                                                                >
                                                                    {new Date(
                                                                        repItem.createdAt
                                                                    ).toLocaleTimeString()}
                                                                    ,{" "}
                                                                    {new Date(
                                                                        repItem.createdAt
                                                                    ).toLocaleDateString()}
                                                                </MDBCardText>
                                                                <div
                                                                    className={
                                                                        styles.textLeft
                                                                    }
                                                                >
                                                                    {repItem.userId ===
                                                                    user.result
                                                                        ._id ? (
                                                                        <>
                                                                            <a
                                                                                href="/edit"
                                                                                className="mr-4"
                                                                                style={{
                                                                                    marginLeft:
                                                                                        "16px",
                                                                                }}
                                                                                onClick={
                                                                                    onShowEditReplyCommentForm
                                                                                }
                                                                                value={
                                                                                    repItem.content
                                                                                }
                                                                                index={
                                                                                    index
                                                                                }
                                                                                cmtid={
                                                                                    item._id
                                                                                }
                                                                            >
                                                                                Sửa
                                                                            </a>
                                                                            <a
                                                                                href="#"
                                                                                className="me-2"
                                                                                style={{
                                                                                    marginLeft:
                                                                                        "16px",
                                                                                }}
                                                                                value={
                                                                                    index
                                                                                }
                                                                                cmtid={
                                                                                    item._id
                                                                                }
                                                                                index={
                                                                                    index
                                                                                }
                                                                                onClick={
                                                                                    onOpenDeleteReplyCommentForm
                                                                                }
                                                                            >
                                                                                Xóa
                                                                            </a>
                                                                            <div
                                                                                className="d-none"
                                                                                id={`deleteCommentForm_${item._id}_${index}`}
                                                                            >
                                                                                <MDBCardText>
                                                                                    Bạn
                                                                                    có
                                                                                    muốn
                                                                                    xóa
                                                                                    không?
                                                                                </MDBCardText>
                                                                                <div className="my-2">
                                                                                    <MDBBtn
                                                                                        className="me-3"
                                                                                        index={
                                                                                            index
                                                                                        }
                                                                                        cmtid={
                                                                                            item._id
                                                                                        }
                                                                                        onClick={
                                                                                            handleDeleteReplyComment
                                                                                        }
                                                                                    >
                                                                                        Có
                                                                                    </MDBBtn>
                                                                                    <MDBBtn
                                                                                        index={
                                                                                            index
                                                                                        }
                                                                                        cmtid={
                                                                                            item._id
                                                                                        }
                                                                                        onClick={
                                                                                            onCloseDeleteReplyCommentForm
                                                                                        }
                                                                                    >
                                                                                        Không
                                                                                    </MDBBtn>
                                                                                </div>
                                                                            </div>

                                                                            <div
                                                                                className="d-none"
                                                                                id={`editReplyComment_${item._id}_${index}`}
                                                                            >
                                                                                <MDBInput
                                                                                    type="text"
                                                                                    textarea
                                                                                    rows={
                                                                                        2
                                                                                    }
                                                                                    value={
                                                                                        editRepCmt
                                                                                    }
                                                                                    cmtid={
                                                                                        item._id
                                                                                    }
                                                                                    name="content"
                                                                                    onChange={
                                                                                        onInputChangeEditRepCmt
                                                                                    }
                                                                                />
                                                                                <div className="my-2">
                                                                                    <MDBBtn
                                                                                        className="me-3"
                                                                                        index={
                                                                                            index
                                                                                        }
                                                                                        cmtid={
                                                                                            item._id
                                                                                        }
                                                                                        onClick={
                                                                                            handleEditReplyComment
                                                                                        }
                                                                                    >
                                                                                        OK
                                                                                    </MDBBtn>
                                                                                    <MDBBtn
                                                                                        index={
                                                                                            index
                                                                                        }
                                                                                        cmtid={
                                                                                            item._id
                                                                                        }
                                                                                        onClick={
                                                                                            onCloseEditReplyComment
                                                                                        }
                                                                                    >
                                                                                        Cancel
                                                                                    </MDBBtn>
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                    ) : user
                                                                          .result
                                                                          .authority ===
                                                                      "ADMIN" ? (
                                                                        <>
                                                                            <a
                                                                                href="#"
                                                                                className="me-2"
                                                                                style={{
                                                                                    marginLeft:
                                                                                        "16px",
                                                                                }}
                                                                                value={
                                                                                    index
                                                                                }
                                                                                cmtid={
                                                                                    item._id
                                                                                }
                                                                                index={
                                                                                    index
                                                                                }
                                                                                onClick={
                                                                                    onOpenDeleteReplyCommentForm
                                                                                }
                                                                            >
                                                                                Xóa
                                                                            </a>
                                                                            <div
                                                                                className="d-none"
                                                                                id={`deleteCommentForm_${item._id}_${index}`}
                                                                            >
                                                                                <MDBCardText>
                                                                                    Bạn
                                                                                    có
                                                                                    muốn
                                                                                    xóa
                                                                                    không?
                                                                                </MDBCardText>
                                                                                <div className="my-2">
                                                                                    <MDBBtn
                                                                                        className="me-3"
                                                                                        index={
                                                                                            index
                                                                                        }
                                                                                        cmtid={
                                                                                            item._id
                                                                                        }
                                                                                        onClick={
                                                                                            handleDeleteReplyComment
                                                                                        }
                                                                                    >
                                                                                        Có
                                                                                    </MDBBtn>
                                                                                    <MDBBtn
                                                                                        index={
                                                                                            index
                                                                                        }
                                                                                        cmtid={
                                                                                            item._id
                                                                                        }
                                                                                        onClick={
                                                                                            onCloseDeleteReplyCommentForm
                                                                                        }
                                                                                    >
                                                                                        Không
                                                                                    </MDBBtn>
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                    ) : null}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                )}
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </MDBCard>
            </MDBContainer>
        </>
    );
};

export default SingleRoom;
