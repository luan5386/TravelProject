import React, { useEffect } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { getTours, setCurrentPage } from "../../redux/features/tourSlice";
import CardTour from "./CardTour";
import Spinner from "../common/Spinner";
import Pagination from "../common/Pagination";
import { useLocation } from "react-router-dom";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Tours = () => {
    const { tours, loading, currentPage, numberOfPages } = useSelector(
        (state) => ({
            ...state.tour,
        })
    );
    const dispatch = useDispatch();
    const query = useQuery();
    const searchQuery = query.get("searchQuery");
    const location = useLocation();

    useEffect(() => {
        dispatch(getTours(currentPage));
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
            <h1 className="mt-5 pt-5">
                <b>DANH SÁCH CÁC TOUR</b>
            </h1>
            <MDBRow className="mt-5">
                {tours.length === 0 && location.pathname === "/" && (
                    <MDBTypography className="text-center mb-0" tag="h2">
                        Không tìm thấy tour
                    </MDBTypography>
                )}

                {tours.length === 0 && (
                    <MDBTypography className="text-center mb-0" tag="h2">
                        Chúng tôi không thể tìm thấy bất kỳ kết quả phù hợp nào
                        cho "{searchQuery}"
                    </MDBTypography>
                )}

                <MDBCol>
                    <MDBContainer>
                        <MDBRow className="row-cols-1 row-cols-md-3 g-2">
                            {tours &&
                                tours.map((item) => (
                                    <CardTour key={item._id} {...item} />
                                ))}
                        </MDBRow>
                    </MDBContainer>
                </MDBCol>
            </MDBRow>
            {tours.length > 0 && (
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

export default Tours;
