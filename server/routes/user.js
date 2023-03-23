import express from "express";
const router = express.Router();

import {
    signup,
    signin,
    checkLogin,
    getUsers,
    getUser,
    deleteUser,
    updateUser,
    changePassword,
} from "../controllers/user.js";
import auth from "../middlewares/auth.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/check", checkLogin);
router.get("/users", getUsers);
router.get("/:id", getUser);
router.post("/", auth, verifyAdmin, signup);
router.delete("/:id", auth, verifyAdmin, deleteUser);
router.patch("/:id", auth, updateUser);
router.patch("/changePassword/:id", auth, changePassword);

export default router;
