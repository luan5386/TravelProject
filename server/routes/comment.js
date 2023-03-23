import express from "express";
const router = express.Router();
import auth from "../middlewares/auth.js";
import { createComment, getCommentsByService, deleteComment, updateComment, getCommentsById } from "../controllers/comment.js";

router.post("/", auth, createComment);
router.get("/:id", auth, getCommentsByService);
router.get("/getComment/:id", auth, getCommentsById);
router.delete("/:id", auth, deleteComment);
router.patch("/:id", auth, updateComment);

export default router;