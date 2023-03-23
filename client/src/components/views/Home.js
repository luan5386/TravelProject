import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTours, setCurrentPage } from "../../redux/features/tourSlice";
import CardTour from "./CardTour";
import CardRoom from "../room/CardRoom";
import Spinner from "../common/Spinner";
import { Link } from "react-router-dom";
import { getRooms } from "../../redux/features/roomSlice";

function Home() {
    const { tours, loading, currentPage, numberOfPages } = useSelector(
        (state) => ({
            ...state.tour,
        })
    );
    const { rooms } = useSelector((state) => ({
        ...state.room,
    }));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTours(currentPage));
        dispatch(getRooms(currentPage));
    }, [currentPage]);

    if (loading) {
        return <Spinner />;
    }
    return (
        <>
            <div className="background d-flex">
                <div className="background-heading">
                    WELCOME TO TRAVEL SERVICE HUTECH
                </div>
                <div className="background-subheading">
                    💜 HAVE A NICE DAY 💜
                </div>
            </div>
            <div className="mt-5 container">
                <div className="row g-3 content__destination-wrapper">
                    <h1 style={{color:" #631919"}}><b>Địa điểm nổi bật</b></h1>
                    {tours &&
                        tours.map((item) => (
                            <CardTour key={item._id} {...item} />
                        ))}
                </div>
            </div>
            <div className="content__discover">
                <span className="content__discover-nature">
                    <div className="content__discover-heading">Danh sách tour</div>
                    <Link
                        to="/tours"
                        className="content__discover-nature-btn btn--custom"
                    >
                        Chi tiết
                    </Link>
                </span>
                <span className="content__discover-cities">
                    <div className="content__discover-heading">Danh sách phòng</div>
                    <Link
                        to="/room"
                        className="content__discover-cities-btn btn--custom"
                    >
                        Chi tiết
                    </Link>
                </span>
            </div>

            <div className="mt-5 pt-5 container">
                <div className="row g-3 content__destination-wrapper  d-flex align-items-center">
                    <h1 style={{color:" #631919"}}><b>Gợi ý phòng</b></h1>
                    {rooms &&
                        rooms.map((item) => (
                            <div className="col-12 col-lg-4">
                                <CardRoom key={item._id} {...item} />
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
}

export default Home;
