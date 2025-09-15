import express from "express";
const router = express.Router();

import {
  registerUserController,
  verifyEmailController,
  loginUserController,
  logoutUserController,
} from "../controllers/user.controller.js";

import auth from "../middleware/auth.js";

// Auth routes
router.post("/register", registerUserController);
router.post("/verify-email", verifyEmailController);
router.post("/login", loginUserController);
router.post("/logout", auth, logoutUserController);

export default router;



