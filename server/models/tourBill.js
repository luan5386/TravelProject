import mongoose from "mongoose";
const Schema = mongoose.Schema

const tourBillSchema = mongoose.Schema({
  tourId: String,
  tourTitle: String,
  price: String,
  discount: String,
  email: String,
  phoneNumber: String,
  quantity: String,
  totalPrice: String,
  userId: String,
  userName: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const TourBillModal = mongoose.model("TourBill", tourBillSchema);

export default TourBillModal;