import CommentModal from "../models/comment.js";
import mongoose from "mongoose";

export const createComment = async (req, res) => {
    const comment = req.body;
    const newComment = new CommentModal({
        ...comment,
        createdAt: new Date().toISOString(),
    });
    try {
        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
    }
};

export const getCommentsByService = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "Service doesn't exist" });
    }
    const comments = await CommentModal.find({ serviceId: id });
    res.status(200).json(comments);
};

export const deleteComment = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res
                .status(404)
                .json({ message: `No comment exist with id: ${id}` });
        }
        await CommentModal.findByIdAndRemove(id);
        res.json({ message: "Comment deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
    }
};

export const updateComment = async (req, res) => {
    const { id } = req.params;
    const {
        serviceId,
        userId,
        userName,
        content,
        replyComments,
        createdAt,
    } = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res
                .status(404)
                .json({ message: `No comment exist with id: ${id}` });
        }

        const updatedComment = {
            serviceId,
            userId,
            userName,
            content,
            replyComments,
            createdAt,
            _id: id,
        };
        await CommentModal.findByIdAndUpdate(id, updatedComment, { new: true });
        res.json(updatedComment);
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
    }
};

export const getCommentsById = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "Comment doesn't exist" });
    }
    const comment = await CommentModal.findById(id);
    res.status(200).json(comment);
};