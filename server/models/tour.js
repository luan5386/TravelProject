import mongoose from "mongoose";

const tourSchema = mongoose.Schema({
  title: String,
  description: String,
  businessHours: String,
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

const TourModal = mongoose.model("Tour", tourSchema);

export default TourModal;