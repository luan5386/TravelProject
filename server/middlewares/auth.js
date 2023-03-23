import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";

const auth = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];
  try {
    let decodedData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.userId = decodedData?.id;
    next();
  } catch (error) {
    console.log(error);
  } 
};

export default auth;