import mongoose from "mongoose";
const Schema = mongoose.Schema

const roomBillSchema = mongoose.Schema({
  roomId: String,
  roomNumber: String,
  price: String,
  discount: String,
  checkInDate: String,
  checkOutDate: String,
  email: String,
  phoneNumber: String,
  totalPrice: String,
  userId: String,
  userName: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const RoomBillModal = mongoose.model("RoomBill", roomBillSchema);

export default RoomBillModal;