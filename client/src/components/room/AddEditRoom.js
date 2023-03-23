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
// import { createTour, updateTour } from "../../redux/features/tourSlice";
import { createRoom, updateRoom } from "../../redux/features/roomSlice";

const initialState = {
    roomNumber: "",
    numberOfBeds: "",
    description: "",
    location: "",
    contact: "",
    price: "",
    discount: "",
    state: "on sale",
    tags: [],
};

const AddEditRoom = () => {
    const [roomData, setRoomData] = useState(initialState);
    const [tagErrMsg, setTagErrMsg] = useState(null);
    const { error, rooms } = useSelector((state) => ({
        ...state.room,
    }));
    const { user } = useSelector((state) => ({ ...state.auth }));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        roomNumber,
        numberOfBeds,
        description,
        location,
        contact,
        price,
        discount,
        tags,
    } = roomData;
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const singleTour = rooms.find((room) => room._id === id);
            setRoomData({ ...singleTour });
        }
    }, [id]);

    useEffect(() => {
        error && toast.error(error);
    }, [error]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!tags.length) {
            setTagErrMsg("Vui lòng nhập một vài thẻ");
        }
        if (
            roomNumber &&
            numberOfBeds &&
            description &&
            location &&
            contact &&
            price &&
            discount &&
            tags
        ) {
            const updatedRoomData = { ...roomData, state: "on sale", name: user?.result?.name };
            if (!id) {
                dispatch(createRoom({ updatedRoomData, navigate, toast }));
            } else {
                dispatch(updateRoom({ id, updatedRoomData, toast, navigate }));
            }
            handleClear();
        }
    };
    const onInputChange = (e) => {
        const { name, value } = e.target;
        setRoomData({ ...roomData, [name]: value });
    };
    const handleAddTag = (tag) => {
        setTagErrMsg(null);
        setRoomData({ ...roomData, tags: [...roomData.tags, tag] });
    };
    const handleDeleteTag = (deleteTag) => {
        setRoomData({
            ...roomData,
            tags: roomData.tags.filter((tag) => tag !== deleteTag),
        });
    };
    const handleClear = () => {
        setRoomData({
            roomNumber: "",
            numberOfBeds: "",
            description: "",
            location: "",
            contact: "",
            price: "",
            discount: "",
            state: "on sale",
            tags: [],
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
                <h5>{id ? "Cập nhật phòng" : "Thêm phòng"}</h5>
                <MDBCardBody>
                    <MDBValidation
                        onSubmit={handleSubmit}
                        className="row g-3"
                        noValidate
                    >
                        <div className="col-md-12">
                            <MDBInput
                                label="Nhập số phòng"
                                // placeholder="Enter room number"
                                type="text"
                                value={roomNumber || ""}
                                name="roomNumber"
                                onChange={onInputChange}
                                className="form-control"
                                required
                                invalid
                                validation="Vui lòng nhập số phòng"
                            />
                        </div>
                        <div className="col-md-12">
                            <MDBInput
                                label="Nhập số lượng giường"
                                // placeholder="Enter number of beds"
                                type="text"
                                value={numberOfBeds || ""}
                                name="numberOfBeds"
                                onChange={onInputChange}
                                className="form-control"
                                required
                                invalid
                                validation="Vui lòng nhập số lượng giường"
                            />
                        </div>
                        <div className="col-md-12">
                            <MDBInput
                                label="Nhập mô tả"
                                type="text"
                                value={description}
                                name="description"
                                onChange={onInputChange}
                                className="form-control"
                                required
                                invalid
                                textarea
                                rows={4}
                                validation="Vui lòng nhập mô tả"
                            />
                        </div>
                        <div className="col-md-12">
                            <MDBInput
                                label="Nhập địa chỉ"
                                type="text"
                                value={location || ""}
                                name="location"
                                onChange={onInputChange}
                                className="form-control"
                                required
                                invalid
                                validation="Vui lòng nhập địa chỉ"
                            />
                        </div>
                        <div className="col-md-12">
                            <MDBInput
                                label="Nhập thông tin liên lạc"
                                type="text"
                                value={contact || ""}
                                name="contact"
                                onChange={onInputChange}
                                className="form-control"
                                required
                                invalid
                                validation="Vui lòng nhập thông tin liên lạc"
                            />
                        </div>
                        <div className="col-md-12">
                            <MDBInput
                                label="Nhập giá phòng"
                                type="text"
                                value={price || ""}
                                name="price"
                                onChange={onInputChange}
                                className="form-control"
                                required
                                invalid
                                validation="Vui lòng nhập giá phòng"
                            />
                        </div>
                        <div className="col-md-12">
                            <MDBInput
                                label="Nhập giảm giá"
                                type="text"
                                value={discount || ""}
                                name="discount"
                                onChange={onInputChange}
                                className="form-control"
                                required
                                invalid
                                validation="Vui lòng nhập giảm giá"
                            />
                        </div>
                        <div className="col-md-12">
                            <ChipInput
                                name="tags"
                                variant="outlined"
                                placeholder="nhập thẻ"
                                fullWidth
                                value={tags}
                                onAdd={(tag) => handleAddTag(tag)}
                                onDelete={(tag) => handleDeleteTag(tag)}
                            />
                            {tagErrMsg && (
                                <div className="tagErrMsg">{tagErrMsg}</div>
                            )}
                        </div>
                        <div className="d-flex justify-content-start">
                            <FileBase
                                type="file"
                                title="Upload Image"
                                multiple={false}
                                onDone={({ base64 }) =>
                                    setRoomData({
                                        ...roomData,
                                        imageFile: base64,
                                    })
                                }
                            />
                        </div>
                        <div className="col-12">
                            <MDBBtn style={{ width: "100%" }}>
                                {id ? "Cập nhật" : "Thêm"}
                            </MDBBtn>
                            <MDBBtn
                                style={{ width: "100%" }}
                                className="mt-2"
                                color="danger"
                                onClick={handleClear}
                            >
                                Xóa tất cả
                            </MDBBtn>
                        </div>
                    </MDBValidation>
                </MDBCardBody>
            </MDBCard>
        </div>
    );
};

export default AddEditRoom;
