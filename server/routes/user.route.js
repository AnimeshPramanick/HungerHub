import express from "express";
import {
  registerUserController,
  verifyEmailController,
  loginUserController,
  logoutUserController,
  uploadProfilePictureController,
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

export default userRouter;
