const forgotPasswordTemplate = (name, otp) => {
  return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Password Reset - HungerHub</title>
        </head>
        <body style="font-family: 'Arial', sans-serif; margin: 0; padding: 0; background-color: #f8f9fa; color: #333333;">
            <div style="max-width: 550px; margin: 40px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);">
                <!-- Header -->
                <div style="padding: 30px 0; text-align: center; background-color: #2c3e50; background-image: linear-gradient(to right, #2c3e50, #4a6a8f);">
                    <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">HungerHub</h1>
                </div>
                
                <!-- Content -->
                <div style="padding: 35px 40px;">
                    <p style="font-size: 17px; margin-bottom: 25px;">Hello ${name},</p>
                    
                    <p style="font-size: 16px; margin-bottom: 25px; line-height: 1.6;">We received a request to reset your password for your HungerHub account. To complete the password reset process, please use the following one-time password (OTP):</p>
                    
                    <!-- OTP Box -->
                    <div style="text-align: center; margin: 35px 0;">
                        <div style="display: inline-block; background-color: #f2f4f8; padding: 15px 40px; border-radius: 6px; border: 1px dashed #c8d4e6;">
                            <span style="font-family: 'Courier New', monospace; font-size: 26px; font-weight: 700; letter-spacing: 5px; color: #2c3e50;">${otp}</span>
                        </div>
                        <p style="font-size: 14px; color: #777777; margin-top: 15px;">This OTP will expire in 10 minutes.</p>
                    </div>
                    
                    <p style="font-size: 16px; line-height: 1.5;">If you didn't request a password reset, please ignore this email or contact our support team if you have any concerns.</p>
                    
                    <p style="font-size: 16px; margin-top: 30px; margin-bottom: 10px;">Thank you,</p>
                    <p style="font-size: 16px; margin-top: 0; font-weight: 500;">The HungerHub Team</p>
                </div>
                
                <!-- Footer -->
                <div style="padding: 20px; text-align: center; background-color: #f5f7fa; font-size: 13px; color: #8a9db0;">
                    <p style="margin: 5px 0;">This is an automated email. Please do not reply.</p>
                    <p style="margin: 5px 0;">&copy; ${new Date().getFullYear()} HungerHub. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
    `;
};

export default forgotPasswordTemplate;
