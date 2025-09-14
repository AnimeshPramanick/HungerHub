import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token =
      req.cookies.accessToken || req.headers.authorization?.split(" ")[1]; ///['Bearer', 'token']
    console.log(token);
    if (!token) {
      return res
        .status(401)
        .json({ message: "No token provided", success: false, error: true });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res
        .status(401)
        .json({ message: "Invalid token", success: false, error: true });
    }
    req.userId = decoded.id;
    console.log(decoded);

    return next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message, success: false, error: true }); // Internal Server Error
  }
};

export default auth;
