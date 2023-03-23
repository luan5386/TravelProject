import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: { type: String, require: true },
    username: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: false },
    address: { type: String, },
    phoneNumber: { type: String, },
    authority: {
        type: String,
        enum: ["ADMIN", "MANAGER", "EMPLOYEE", "NORMAL"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    // id: { type: String },
});

export default mongoose.model("User", userSchema);
