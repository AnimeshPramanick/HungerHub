const verifyEmailTemplate = ({ name, url }) => {
  return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Verification</title>
        </head>
        <body style="font-family: 'Arial', sans-serif; margin: 0; padding: 0; background-color: #fafafa; color: #333333;">
            <div style="max-width: 500px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);">
                <!-- Header -->
                <div style="padding: 30px 0; text-align: center; background-color: #FF5722;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 500;">HungerHub</h1>
                </div>
                
                <!-- Content -->
                <div style="padding: 30px 40px;">
                    <p style="font-size: 16px; margin-bottom: 25px;">Hi ${name},</p>
                    
                    <p style="font-size: 16px; margin-bottom: 25px; line-height: 1.5;">Thanks for signing up! Please verify your email address to get started with HungerHub and explore delicious meals delivered to your doorstep.</p>
                    
                    <!-- Verify Button -->
                    <div style="text-align: center; margin: 35px 0;">
                        <a href="${url}" style="display: inline-block; background-color: #4CAF50; color: #ffffff; text-decoration: none; padding: 12px 25px; border-radius: 6px; font-weight: 500; letter-spacing: 0.5px;">Verify Email</a>
                    </div>
                    
                    <p style="font-size: 14px; color: #777777; margin-top: 30px; line-height: 1.5;">If you didn't create an account with HungerHub, please ignore this email.</p>
                </div>
                
                <!-- Footer -->
                <div style="padding: 20px; text-align: center; background-color: #f5f5f5; font-size: 12px; color: #999999;">
                    &copy; ${new Date().getFullYear()} HungerHub
                </div>
            </div>
        </body>
        </html>
    `;
};

export default verifyEmailTemplate;
