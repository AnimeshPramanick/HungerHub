const generateOtp = () => {
  // Generate a 6-digit numeric OTP
  return String(Math.floor(Math.random() * 900000) + 100000);
};

export default generateOtp;
