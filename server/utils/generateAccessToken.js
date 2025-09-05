import jwt from "jsonwebtoken";

const generateAccessToken = (userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "8h",
  });
  return token;
};

export default generateAccessToken;
