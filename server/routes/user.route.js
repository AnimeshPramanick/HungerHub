import express from "express";
<<<<<<< HEAD
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
=======
import {
  registerUserController,
  verifyEmailController,
  loginUserController,
  logoutUserController,
  uploadProfilePictureController,
  updateUserDetailsController,
  forgotPasswordController,
  verifyOtpController,
  resetPasswordController,
  refreshTokenController,
} from "../controllers/user.controller.js";

import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const userRouter = express.Router();

userRouter.post("/register", registerUserController);
userRouter.post("/verify-email", verifyEmailController);
userRouter.post("/login", loginUserController);
userRouter.get("/logout", auth, logoutUserController);
userRouter.put(
  "/upload-profile-picture",
  auth,
  upload.single("profilePicture"),
  uploadProfilePictureController
);
userRouter.put("/update-details", auth, updateUserDetailsController);
userRouter.post("/forgot-password", forgotPasswordController);
userRouter.put("/verify-otp", verifyOtpController);
userRouter.put("/reset-password", auth, resetPasswordController);
userRouter.post("/refresh-token", refreshTokenController);
>>>>>>> 97ea8976569ee3814bec4a0987eff13664265061

export default userRouter;

