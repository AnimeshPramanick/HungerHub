import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    console.log("Auth middleware - Headers:", req.headers.authorization);
    console.log("Auth middleware - Cookies:", req.cookies);

    const token =
      req.cookies.accessToken || req?.headers?.authorization?.split(" ")[1];

    console.log("Token extracted:", token ? "Found token" : "No token");

    if (!token) {
      return res.status(401).json({
        message: "Provide token",
      });
    }

    console.log("Verifying token with JWT_SECRET");
    const decode = await jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token verification successful. User ID:", decode.id);

    if (!decode) {
      return res.status(401).json({
        message: "unauthorized access",
        error: true,
        success: false,
      });
    }

    req.userId = decode.id;

    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        message: "Invalid token",
        error: true,
        success: false,
      });
    } else if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token expired",
        error: true,
        success: false,
      });
    } else {
      return res.status(500).json({
        message: "Authentication error",
        error: true,
        success: false,
      });
    }
  }
};

export default auth;
