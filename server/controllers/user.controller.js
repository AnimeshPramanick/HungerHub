import UserModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
import sendEmail from "../config/sendEmail.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";
import generateAccessToken from "../utils/generateAccessToken.js";

export async function registerUserController(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
        error: true,
      });
    }

    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
        error: true,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const payload = {
      name,
      email,
      password: hashPassword,
    };
    const newUser = new UserModel(payload);
    const savedUser = await newUser.save();

    const verifyEmailUrl = `${process.env.CLIENT_URL}/verify-email?code=${savedUser._id}`;

    const verifyEmail = await sendEmail({
      sendTo: email,
      subject: "Welcome to UrbanNest",
      html: verifyEmailTemplate({
        name,
        url: verifyEmailUrl,
      }),
    });

    return res.status(200).json({
      message: "Verification successful",
      error: false,
      success: true,
      data: savedUser,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message, success: false, error: true }); // Internal Server Error
  }
}

export async function verifyEmailController(req, res) {
  try {
    const code = req.body.code;

    const user = await UserModel.findOne({ _id: code });
    if (!user) {
      return res.status(400).json({
        message: "Invalid verification code",
        success: false,
        error: true,
      });
    }

    const updatedUser = await UserModel.updateOne(
      { _id: code },
      { verify_email: true }
    );

    return res.status(200).json({
      message: "Email verified successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message, success: false, error: true }); // Internal Server Error
  }
}

//login controller
export async function loginUserController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
        error: true,
      });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User does not exist",
        success: false,
        error: true,
      });
    }

    if (user.status !== "active") {
      return res.status(403).json({
        message: "Your account is not active. Please contact support.",
        success: false,
        error: true,
      });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Wrong password",
        success: false,
        error: true,
      });
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = await generateRefreshToken(user._id);

    const cookiesOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    res.cookie("accessToken", accessToken, cookiesOptions);
    res.cookie("refreshToken", refreshToken, cookiesOptions);

    return res.status(200).json({
      message: "Login successful",
      success: true,
      error: false,
      data: { accessToken, refreshToken },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message, success: false, error: true }); // Internal Server Error
  }
}

//logout controller
export async function logoutUserController(req, res) {
  try {
    const userId = req.userId;
    const cookiesOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.clearCookie("accessToken", cookiesOptions);
    res.clearCookie("refreshToken", cookiesOptions);

    const updateRefreshToken = await UserModel.updateOne(
      { _id: userId },
      { refresh_token: "" }
    );

    console.log(`Logout: Updated user ${userId}, result:`, updateRefreshToken);

    if (updateRefreshToken.matchedCount === 0) {
      return res.status(404).json({
        message: "User not found",
        success: false,
        error: true,
      });
    }

    return res.status(200).json({
      message: "Logout successful",
      success: true,
      error: false,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message, success: false, error: true }); // Internal Server Error
  }
}
