import express from "express";
import { registerUserController } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/register", registerUserController);
userRouter.post("/verify-email", verifyEmailController);

export default userRouter;
