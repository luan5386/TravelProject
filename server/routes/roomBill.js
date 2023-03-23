import express from "express";
const router = express.Router();
import auth from "../middlewares/auth.js";
import { createRoomBill, getRoomBills, getRoomsByUser } from "../controllers/roomBill.js";

router.post("/", auth, createRoomBill);
router.get("/allRoomBills", auth, getRoomBills);
router.get("/userRoomBills/:id", auth, getRoomsByUser);

export default router;
