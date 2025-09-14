import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

const generateRefreshToken = async (userId) => {
  try {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const updateRefreshToken = await UserModel.findByIdAndUpdate(
      userId,
      { refresh_token: token },
      { new: true }
    );

    if (!updateRefreshToken) {
      throw new Error("Failed to update refresh token");
    }

    return token;
  } catch (error) {
    console.error("Error generating refresh token:", error);
    throw error;
  }
};

export default generateRefreshToken;
