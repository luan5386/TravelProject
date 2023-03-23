import TourBillModal from "../models/tourBill.js";
import mongoose from "mongoose";

export const createTourBill = async (req, res) => {
    const tourBill = req.body;
    const newTourBill = new TourBillModal({
        ...tourBill,
        createdAt: new Date().toISOString(),
    });
    try {
        await newTourBill.save();
        res.status(201).json(newTourBill);
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
    }
};

export const getToursByUser = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "User doesn't exist" });
    }
    const userTourBills = await TourBillModal.find({ userId: id });
    res.status(200).json(userTourBills);
};

export const getTourBills = async (req, res) => {
    try {
        const tourBills = await TourBillModal.find()
        res.status(200).json(tourBills);
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
    }
};