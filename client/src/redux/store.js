import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/authSlice";
import TourReducer from "./features/tourSlice";
import RoomReducer from "./features/roomSlice";
import RoomBillReducer from "./features/roomBillSlice";
import TourBillReducer from "./features/tourBillSlice";
import CommentReducer from "./features/commentSlice";

export default configureStore({
  reducer: {
    auth: AuthReducer,
    tour: TourReducer,
    room: RoomReducer,
    roomBill: RoomBillReducer,
    tourBill: TourBillReducer,
    comment: CommentReducer,
  },
});
