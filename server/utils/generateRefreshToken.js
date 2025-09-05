const generateRefreshToken = async (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  const updateRefreshToken = await UserModel.updateOne(
    { _id: userId },
    { refresh_token: token }
  );

  return token;
};

export default generateRefreshToken;
