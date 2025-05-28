export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();

  // Define cookie options with the necessary secure and sameSite attributes
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true, // Prevents client-side JS from accessing the cookie (good for security)
    
    // ----------- THESE ARE THE TWO CRITICAL LINES TO ADD/MODIFY -----------
    // 'secure' must be true if your frontend/backend are deployed with HTTPS.
    // It should be false for local HTTP development.
    secure: process.env.NODE_ENV === "production", 

    // 'SameSite' policy for cross-origin requests.
    // If your frontend and backend are on different domains/ports:
    //   - In production: "None" is required (but ONLY with secure: true)
    //   - In development (localhost): "Lax" is generally sufficient and safer
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", 
  };

  res.status(statusCode).cookie("token", token, cookieOptions).json({
    success: true,
    message,
    token,
    user,
  });
};