import express from "express";
import {
  registerUserController,
  verifyEmailController,
  loginUserController,
  logoutUserController,
} from "../controllers/user.controller.js";

import auth from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUserController);
userRouter.post("/verify-email", verifyEmailController);
userRouter.post("/login", loginUserController);
userRouter.get("/logout", auth, logoutUserController);

export default userRouter;
