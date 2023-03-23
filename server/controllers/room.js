import RoomModal from "../models/room.js";
import mongoose from "mongoose";

export const createRoom = async (req, res) => {
    const room = req.body;
    const newRoom = new RoomModal({
        ...room,
        creator: req.userId,
        createdAt: new Date().toISOString(),
    });

    try {
        await newRoom.save();
        res.status(201).json(newRoom);
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
    }
};

export const getRooms = async (req, res) => {
    const { page } = req.query;
    try {
        const limit = 6;
        const startIndex = (Number(page) - 1) * limit;
        const total = await RoomModal.countDocuments({ state: "on sale" });
        const rooms = await RoomModal.find({ state: "on sale" })
            .limit(limit)
            .skip(startIndex);
        res.json({
            data: rooms,
            currentPage: Number(page),
            totalTours: total,
            numberOfPages: Math.ceil(total / limit),
        });
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
    }
};

export const getAllRooms = async (req, res) => {
    try {
        const rooms = await RoomModal.find();
        res.status(200).json(rooms);
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
    }
};

export const getRoom = async (req, res) => {
    const { id } = req.params;
    try {
        const room = await RoomModal.findById(id);
        res.status(200).json(room);
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
    }
};

export const deleteRoom = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res
                .status(404)
                .json({ message: `No room exist with id: ${id}` });
        }
        await RoomModal.findByIdAndRemove(id);
        res.json({ message: "Room deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
    }
};

export const updateRoom = async (req, res) => {
    const { id } = req.params;
    const {
        roomNumber,
        numberOfBeds,
        description,
        creator,
        imageFile,
        tags,
        location,
        contact,
        price,
        discount,
        state,
    } = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res
                .status(404)
                .json({ message: `No room exist with id: ${id}` });
        }

        const updatedRoom = {
            creator,
            roomNumber,
            numberOfBeds,
            description,
            tags,
            imageFile,
            location,
            contact,
            price,
            discount,
            state,
            _id: id,
        };
        await RoomModal.findByIdAndUpdate(id, updatedRoom, { new: true });
        res.json(updatedRoom);
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
    }
};

export const getRoomsByTag = async (req, res) => {
    const { tag } = req.params;
    try {
        const rooms = await RoomModal.find({ tags: { $in: tag } });
        res.json(rooms);
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
    }
};

export const getRelatedRooms = async (req, res) => {
    const tags = req.body;
    try {
        const rooms = await RoomModal.find({ tags: { $in: tags } });
        res.json(rooms);
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
    }
};

export const likeRoom = async (req, res) => {
    const { id } = req.params;
    try {
        if (!req.userId) {
            return res.json({ message: "User is not authenticated" });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res
                .status(404)
                .json({ message: `No room exist with id: ${id}` });
        }

        const room = await RoomModal.findById(id);

        const index = room.likes.findIndex((id) => id === String(req.userId));

        if (index === -1) {
            room.likes.push(req.userId);
        } else {
            room.likes = room.likes.filter((id) => id !== String(req.userId));
        }

        const updatedRoom = await RoomModal.findByIdAndUpdate(id, room, {
            new: true,
        });

        res.status(200).json(updatedRoom);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
