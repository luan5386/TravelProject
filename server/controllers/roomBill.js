import RoomBillModal from "../models/roomBill.js";
import mongoose from "mongoose";

export const createRoomBill = async (req, res) => {
    const roomBill = req.body;
    const newRoomBill = new RoomBillModal({
        ...roomBill,
        createdAt: new Date().toISOString(),
    });
    try {
        await newRoomBill.save();
        res.status(201).json(newRoomBill);
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
    }
};

export const getRoomsByUser = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "User doesn't exist" });
    }
    const userRoomBills = await RoomBillModal.find({ userId: id });
    res.status(200).json(userRoomBills);
};

export const getRoomBills = async (req, res) => {
    try {
        const roomBills = await RoomBillModal.find()
        res.status(200).json(roomBills);
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
    }
};
