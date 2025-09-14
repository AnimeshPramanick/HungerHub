import UserModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
import sendEmail from "../config/sendEmail.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";
import generateAccessToken from "../utils/generateAccessToken.js";
import uploadImage from "../utils/uploadImage.js";
import forgotPasswordTemplate from "../utils/forgotPasswordTemplate.js";
import generateOtp from "../utils/generateOtp.js";
import jwt from "jsonwebtoken";

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
      subject: "Welcome to HungerHub!",
      html: verifyEmailTemplate({
        name,
        url: verifyEmailUrl,
      }),
    });

    return res.status(200).json({
      message:
        "Registration successful! Please check your email to verify your account.",
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

//upload profile picture
export async function uploadProfilePictureController(req, res) {
  try {
    const userId = req.userId; //auth middleware
    const image = req.file; //multer middleware
    if (!image) {
      return res.status(400).json({
        message: "No image file provided",
        success: false,
        error: true,
      });
    }

    console.log("Received image file:", image);

    const uploadResult = await uploadImage(image);

    const updatedUser = await UserModel.findByIdAndUpdate(userId, {
      avatar: uploadResult.url,
    });

    console.log("Upload result:", uploadResult);

    if (!uploadResult) {
      return res.status(500).json({
        message: "Failed to upload image to cloud storage",
        success: false,
        error: true,
      });
    }

    return res.status(200).json({
      message: "Profile picture uploaded successfully",
      data: {
        _id: userId,
        avatar: uploadResult.url,
      },
      success: true,
      error: false,
    });
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    return res
      .status(500)
      .json({ message: error.message, success: false, error: true }); // Internal Server Error
  }
}

//update user details
export async function updateUserDetailsController(req, res) {
  try {
    const userId = req.userId;

    const { name, mobile, password, address } = req.body;

    let hashPassword = "";

    if (password) {
      const salt = await bcryptjs.genSalt(10);
      hashPassword = await bcryptjs.hash(password, salt);
    }

    const updateUser = await UserModel.updateOne(
      { _id: userId },
      {
        ...(name && { name: name }),
        ...(mobile && { mobile: mobile }),
        ...(password && { password: hashPassword }),
        ...(address && { address: address }),
      },
      { new: true }
    );
    return res.status(200).json({
      message: "User details updated successfully",
      success: true,
      data: updateUser,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || error, success: false, error: true }); // Internal Server Error
  }
}

//forgot password not login user
export async function forgotPasswordController(req, res) {
  try {
    const { email } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User does not exist",
        success: false,
        error: true,
      });
    }

    const otp = generateOtp();
    const otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes from now

    const update = await UserModel.findByIdAndUpdate(user._id, {
      forgot_password_otp: otp,
      forgot_password_expiry: new Date(otpExpiry).toISOString(),
    });

    await sendEmail({
      sendTo: email,
      subject: "Your Password Reset OTP",
      html: forgotPasswordTemplate(user.name, otp),
    });

    return res.status(200).json({
      message: "OTP sent to your email",
      success: true,
      error: false,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message, success: false, error: true }); // Internal Server Error
  }
}

//verify otp
export async function verifyOtpController(req, res) {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        message: "Email and OTP are required",
        success: false,
        error: true,
      });
    }

    const user = await UserModel.findOne({ email }); // ✅ First fetch the user
    if (!user) {
      return res.status(400).json({
        message: "User does not exist",
        success: false,
        error: true,
      });
    }

    const currentTime = new Date().toISOString();

    if (user.forgot_password_expiry < currentTime) {
      // ✅ Now it's safe to use 'user'
      return res.status(400).json({
        message: "OTP has expired",
        success: false,
        error: true,
      });
    }

    if (otp !== user.forgot_password_otp) {
      return res.status(400).json({
        message: "Invalid OTP",
        success: false,
        error: true,
      });
    }

    return res.status(200).json({
      message: "OTP verified successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message, success: false, error: true });
  }
}

//reset password
export async function resetPasswordController(req, res) {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    if (!email || !newPassword || !confirmPassword) {
      return res.status(400).json({
        message: "Email, new password and confirm password are required",
        success: false,
        error: true,
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "New password and confirm password do not match",
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

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(newPassword, salt);

    await UserModel.findByIdAndUpdate(user._id, {
      password: hashedPassword,
      forgot_password_otp: null,
      forgot_password_expiry: null,
    });

    return res.status(200).json({
      message: "Password reset successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message, success: false, error: true }); // Internal Server Error
  }
}

//refresh token controller
export async function refreshTokenController(req, res) {
  try {
    const refreshToken =
      req.cookies.refreshToken || req?.header?.authorization?.split(" ")[1];

    if (!refreshToken) {
      return res.status(401).json({
        message: "No refresh token provided",
        success: false,
        error: true,
      });
    }
    const verifyToken = await jwt.verify(refreshToken, process.env.JWT_SECRET);

    if (!verifyToken) {
      return res.status(403).json({
        message: "Invalid refresh token",
        success: false,
        error: true,
      });
    }

    const userId = verifyToken?._id;
    console.log("verifyToken:", verifyToken);

    const newAccessToken = await generateAccessToken(userId);

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    return res.status(200).json({
      message: "Access token refreshed successfully",
      success: true,
      error: false,
      data: { accessToken: newAccessToken },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message, success: false, error: true }); // Internal Server Error
  }
}
