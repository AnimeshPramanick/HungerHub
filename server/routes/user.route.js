import { router } from "express";
import { registerUserController } from "../controllers/user.controller.js";

const userRouter = router();

userRouter.post("/register", registerUserController);

export default userRouter;
