import jwt from "jsonwebtoken";
import argon2 from "argon2";
import mongoose from "mongoose";

import UserModal from "../models/user.js";

export const signin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const oldUser = await UserModal.findOne({ username });
        if (!oldUser)
            return res
                .status(404)
                .json({ message: "Incorrect username and/or password" });

        const isPasswordCorrect = await argon2.verify(
            oldUser.password,
            password
        );

        if (!isPasswordCorrect)
            return res
                .status(400)
                .json({ message: "Incorrect username and/or password" });

        const token = jwt.sign(
            { username: oldUser.username, id: oldUser._id },
            process.env.ACCESS_TOKEN_SECRET
        );

        res.status(200).json({ result: oldUser, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
};

export const signup = async (req, res) => {
    const { username, email, password, name, address, phoneNumber, authority } =
        req.body;
    try {
        const oldUser = await UserModal.findOne({ username });

        if (oldUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        if (password.length < 6) {
            return res
                .status(400)
                .json({ message: "Password must be at least 6 characters" });
        }

        const hashedPassword = await argon2.hash(password);

        const result = new UserModal({
            username,
            email: email || "",
            password: hashedPassword,
            name,
            address: address || "",
            phoneNumber: phoneNumber || "",
            authority: authority || "NORMAL",
        });

        await result.save();

        const token = jwt.sign(
            { username: result.username, id: result._id },
            process.env.ACCESS_TOKEN_SECRET
        );
        res.status(201).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
};

export const checkLogin = async (req, res) => {
    const { username } = req.body;
    try {
        const oldUser = await UserModal.findOne({ username });
        if (oldUser) {
            const token = jwt.sign(
                { username: oldUser.username, id: oldUser._id },
                process.env.ACCESS_TOKEN_SECRET
            );

            res.status(200).json({ result: oldUser, token });
        }
        res.status(400).json({ message: "User not found" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await UserModal.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
    }
};

export const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await UserModal.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res
                .status(404)
                .json({ message: `No user exist with id: ${id}` });
        }
        await UserModal.findByIdAndRemove(id);
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, password, name, address, phoneNumber, authority } =
        req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res
                .status(404)
                .json({ message: `No user exist with id: ${id}` });
        }
        let hashedPassword = password;
        if (password.length < 40) {
            hashedPassword = await argon2.hash(password);
        }

        const updatedUser = {
            username,
            email,
            password: hashedPassword,
            name,
            address,
            phoneNumber,
            authority,
            _id: id,
        };
        await UserModal.findByIdAndUpdate(id, updatedUser, { new: true });
        res.json(updatedUser);
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
    }
};

export const changePassword = async (req, res) => {
    const { id } = req.params;
    const {
        username,
        email,
        password,
        name,
        address,
        phoneNumber,
        authority,
        oldPassword,
        newPassword,
        confirmPassword,
    } = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res
                .status(404)
                .json({ message: `No user exist with id: ${id}` });
        }
        const isPasswordCorrect = await argon2.verify(password, oldPassword);
        if (!isPasswordCorrect) {
            return res
                .status(404)
                .json({ message: "Mật khẩu hiện tại không đúng!" });
        }        
        if (newPassword.length < 6) {
            return res
                .status(400)
                .json({ message: "Mật khẩu phải ít nhất 6 ký tự" });
        }
        if (newPassword !== confirmPassword) {
            return res
                .status(404)
                .json({ message: "Mật khẩu và xác nhận không khớp!" });
        }
        const hashedPassword = await argon2.hash(newPassword);

        const updatedUser = {
            username,
            email,
            password: hashedPassword,
            name,
            address,
            phoneNumber,
            authority,
            _id: id,
        };
        await UserModal.findByIdAndUpdate(id, updatedUser, { new: true });
        res.json(updatedUser);
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
    }
};
