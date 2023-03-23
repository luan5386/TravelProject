import mongoose from "mongoose";

const roomSchema = mongoose.Schema({
  roomNumber: String,
  numberOfBeds: String,
  description: String,
  location: String,
  contact: String,
  price: String,
  discount: String,
  name: String,
  creator: String,
  tags: [String],
  imageFile: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  likes: {
    type: [String],
    default: [],
  },
  state: String,
});

const RoomModal = mongoose.model("Room", roomSchema);

export default RoomModal;