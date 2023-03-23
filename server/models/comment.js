import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  serviceId: String,
  userId: String,
  userName: String,
  content: String,
  replyComments: [Object],
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const CommentModal = mongoose.model("Comment", commentSchema);

export default CommentModal;