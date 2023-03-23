import { useEffect } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/views/Home";
import Header from "./components/layouts/Header";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/features/authSlice";
import Tours from "./components/tour/Tours";
import AddEditTour from "./components/tour/AddEditTour";
import SingleTour from "./components/tour/SingleTour";
import TagTours from "./components/tour/TagTours";
import Dashboard from "./components/dashboards/Dashboard";
import UserMng from "./components/dashboards/UserMng";
import TourMng from "./components/dashboards/TourMng";
import PrivateRoute from "./components/common/PrivateRoute";
import PrivateNotCustomerRoute from "./components/common/PrivateNotCustomerRoute";
import PrivateAdminRoute from "./components/common/PrivateAdminRoute";
import PrivateEmployeeRoute from "./components/common/PrivateEmployeeRoute";
import NotFound from "./components/views/NotFound";
import Login from "./components/auths/Login";
import Register from "./components/auths/Register";
import Rooms from "./components/room/Rooms";
import SingleRoom from "./components/room/SingleRoom";
import AddEditRoom from "./components/room/AddEditRoom";
import TagRooms from "./components/room/TagRooms";
import BookRoom from "./components/room/BookRoom";
import RoomMng from "./components/dashboards/RoomMng";
import AddEditUser from "./components/dashboards/AddEditUser";
import User from "./components/user/User";
import RoomBills from "./components/user/RoomBills";
import BookTour from "./components/tour/BookTour";
import TourBills from "./components/user/TourBills";
import TourBillMng from "./components/dashboards/TourBillMng";
import RoomBillMng from "./components/dashboards/RoomBillMng";
import EditUser from "./components/user/EditUser";
import ChangePassword from "./components/user/ChangePassword";
import TourSalesMng from "./components/dashboards/TourSalesMng";
import RoomSalesMng from "./components/dashboards/RoomSalesMng";
import Footer from "./components/layouts/Footer";
import PrivateManagerRoute from "./components/common/PrivateManagerRoute";
import PrivateCustomerAndEmployeeRoute from "./components/common/PrivateCustomerAndEmployeeRoute";

function App() {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem("profile"));
    useEffect(() => {
        dispatch(setUser(user));
    }, []);
    return (
        <BrowserRouter>
            <div className="App">
                <Header />
                <ToastContainer />
                <Routes>
                    <Route path="/" element={<Home />} />
                    {/* Auth */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/addUser"
                        element={
                            <PrivateAdminRoute>
                                <AddEditUser />
                            </PrivateAdminRoute>
                        }
                    />
                    <Route
                        path="/editUser/:id"
                        element={
                            <PrivateAdminRoute>
                                <AddEditUser />
                            </PrivateAdminRoute>
                        }
                    />

                    {/* Tour */}
                    <Route path="/tours" element={<Tours />} />
                    <Route path="/tours/search" element={<Tours />} />
                    <Route
                        path="/addTour"
                        element={
                            <PrivateEmployeeRoute>
                                <AddEditTour />
                            </PrivateEmployeeRoute>
                        }
                    />
                    <Route
                        path="/editTour/:id"
                        element={
                            <PrivateEmployeeRoute>
                                <AddEditTour />
                            </PrivateEmployeeRoute>
                        }
                    />
                    <Route path="/tour/:id" element={<SingleTour />} />
                    <Route path="/tours/tag/:tag" element={<TagTours />} />
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateNotCustomerRoute>
                                <Dashboard />
                            </PrivateNotCustomerRoute>
                        }
                    />
                    <Route
                        path="/dashboard/usermng"
                        element={
                            <PrivateAdminRoute>
                                <UserMng />
                            </PrivateAdminRoute>
                        }
                    />
                    <Route
                        path="/dashboard/tourmng"
                        element={
                            <PrivateEmployeeRoute>
                                <TourMng />
                            </PrivateEmployeeRoute>
                        }
                    />
                    <Route
                        path="/bookTour/:id"
                        element={
                            <PrivateCustomerAndEmployeeRoute>
                                <BookTour />
                            </PrivateCustomerAndEmployeeRoute>
                        }
                    />

                    <Route
                        path="/dashboard/tourbillmng"
                        element={
                            <PrivateEmployeeRoute>
                                <TourBillMng />
                            </PrivateEmployeeRoute>
                        }
                    />

                    <Route
                        path="/dashboard/tourSalesMng"
                        element={
                            <PrivateManagerRoute>
                                <TourSalesMng />
                            </PrivateManagerRoute>
                        }
                    />

                    {/* Room */}
                    <Route path="/room" element={<Rooms />} />
                    <Route path="/addRoom" element={<AddEditRoom />} />
                    <Route
                        path="/dashboard/roommng"
                        element={
                            <PrivateEmployeeRoute>
                                <RoomMng />
                            </PrivateEmployeeRoute>
                        }
                    />
                    <Route
                        path="/editRoom/:id"
                        element={
                            <PrivateEmployeeRoute>
                                <AddEditRoom />
                            </PrivateEmployeeRoute>
                        }
                    />
                    <Route path="/room/:id" element={<SingleRoom />} />
                    <Route path="/rooms/tag/:tag" element={<TagRooms />} />
                    <Route
                        path="/bookRoom/:id"
                        element={
                            <PrivateCustomerAndEmployeeRoute>
                                <BookRoom />
                            </PrivateCustomerAndEmployeeRoute>
                        }
                    />

                    <Route
                        path="/dashboard/roombillmng"
                        element={
                            <PrivateEmployeeRoute>
                                <RoomBillMng />
                            </PrivateEmployeeRoute>
                        }
                    />

                    <Route
                        path="/dashboard/roomSalesMng"
                        element={
                            <PrivateManagerRoute>
                                <RoomSalesMng />
                            </PrivateManagerRoute>
                        }
                    />

                    {/* User */}

                    <Route path="/user/information" element={<User />} />
                    <Route path="/user/roomBills" element={<RoomBills />} />
                    <Route path="/user/tourBills" element={<TourBills />} />
                    <Route path="/editInfoUser/:id" element={<EditUser />} />
                    <Route
                        path="/changePassword/:id"
                        element={<ChangePassword />}
                    />

                    {/* Error */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
