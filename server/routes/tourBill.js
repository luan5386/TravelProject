import express from "express";
const router = express.Router();
import auth from "../middlewares/auth.js";
import { createTourBill, getToursByUser, getTourBills } from "../controllers/tourBill.js";

router.post("/", auth, createTourBill);
router.get("/allTourBills", auth, getTourBills);
router.get("/userTourBills/:id", auth, getToursByUser);

export default router;
