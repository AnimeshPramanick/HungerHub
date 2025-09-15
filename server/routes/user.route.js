import express from "express";
import auth from "../middleware/auth.js";
import UserModel from "../models/user.model.js";

const userRouter = express.Router();

// ✅ Profile route (for dashboard)
userRouter.get("/profile", auth, async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default userRouter;

