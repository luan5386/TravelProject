import express from "express";
const router = express.Router();
import auth from "../middlewares/auth.js";

import {
  createRoom,
  deleteRoom,
  getRelatedRooms,
  getRoom,
  getRooms,
  getAllRooms,
  getRoomsByTag,
  likeRoom,
  updateRoom,
} from "../controllers/room.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";
import verifyEmployee from "../middlewares/verifyEmployee.js";

router.get("/tag/:tag", getRoomsByTag);
router.post("/relatedRooms", getRelatedRooms);
router.get("/", getRooms);
router.get("/allRooms", getAllRooms);
router.get("/:id", getRoom);

router.post("/", auth, verifyEmployee, createRoom);
router.delete("/:id", auth, verifyEmployee, deleteRoom);
router.patch("/:id", auth, updateRoom);
router.patch("/like/:id", auth, likeRoom);

export default router;