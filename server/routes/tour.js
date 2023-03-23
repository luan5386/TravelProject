import express from "express";
const router = express.Router();
import auth from "../middlewares/auth.js";

import {
  createTour,
  deleteTour,
  getRelatedTours,
  getTour,
  getTours,
  getAllTours,
  getToursBySearch,
  getToursByTag,
  likeTour,
  updateTour,
} from "../controllers/tour.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";
import verifyEmployee from "../middlewares/verifyEmployee.js";

router.get("/search", getToursBySearch);
router.get("/tag/:tag", getToursByTag);
router.post("/relatedTours", getRelatedTours);
router.get("/", getTours);
router.get("/allTours", getAllTours);
router.get("/:id", getTour);

router.post("/", auth, verifyEmployee, createTour);
router.delete("/:id", auth, verifyEmployee, deleteTour);
router.patch("/:id", auth, updateTour);
router.patch("/like/:id", auth, likeTour);

export default router;