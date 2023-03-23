import UserModel from "../models/user.js";

const verifyManager = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.userId);
        if (user.authority === "MANAGER") {
            next();
        } else {
            return res
                .status(401)
                .json({ success: false, message: "User is not Manager!" });
        }
    } catch (error) {
        console.log(error);
        return res
            .status(403)
            .json({ success: false, message: "Internal server error" });
    }
};

export default verifyManager;
