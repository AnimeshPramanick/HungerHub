import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    // 1️⃣ Get token from cookies or headers
    const token =
      req.cookies?.accessToken || req.headers.authorization?.split(" ")[1];

    console.log("Received Token:", token);

    // 2️⃣ If no token
    if (!token) {
      return res
        .status(401)
        .json({ message: "No token provided", success: false, error: true });
    }

    // 3️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4️⃣ If verification fails
    if (!decoded) {
      return res
        .status(401)
        .json({ message: "Invalid token", success: false, error: true });
    }

    // 5️⃣ Attach userId to request
    req.userId = decoded.id;
    console.log("Decoded JWT:", decoded);

    return next();
  } catch (error) {
    // Handle specific JWT errors
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Token expired", success: false, error: true });
    }
    if (error.name === "JsonWebTokenError") {
      return res
        .status(401)
        .json({ message: "Invalid token", success: false, error: true });
    }

    // Other errors
    return res
      .status(500)
      .json({ message: error.message, success: false, error: true });
  }
};

export default auth;

