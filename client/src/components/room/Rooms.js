import React, { useEffect } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
// import { getTours, setCurrentPage } from "../../redux/features/tourSlice";
import { getRooms, setCurrentPage } from "../../redux/features/roomSlice";
import CardRoom from "./CardRoom";
import Spinner from "../common/Spinner";
import Pagination from "../common/Pagination";

const Rooms = () => {
    const { rooms, loading, currentPage, numberOfPages } = useSelector(
        (state) => ({
            ...state.room,
        })
    );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRooms(currentPage));
    }, [currentPage]);

    if (loading) {
        return <Spinner />;
    }
    return (
        <div
            style={{
                margin: "auto",
                padding: "15px",
                maxWidth: "1000px",
                alignContent: "center",
            }}
        >
            <h1 className="mt-5 pt-5"><b>DANH SÁCH CÁC PHÒNG</b></h1>
            <MDBRow className="mt-5">
                <MDBCol>
                    <MDBContainer>
                        <MDBRow className="row-cols-1 row-cols-md-3 g-2">
                            {rooms &&
                                rooms.map((item) => (
                                    <CardRoom key={item._id} {...item} />
                                ))}
                        </MDBRow>
                    </MDBContainer>
                </MDBCol>
            </MDBRow>
            {rooms.length > 0 && (
                <Pagination
                    setCurrentPage={setCurrentPage}
                    numberOfPages={numberOfPages}
                    currentPage={currentPage}
                    dispatch={dispatch}
                />
            )}
        </div>
    );
};

export default Rooms;