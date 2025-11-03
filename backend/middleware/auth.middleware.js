// backend/middleware/auth.middleware.js

import jwt from "jsonwebtoken";
import User from "../models/user.modal.js"; // Make sure this path is correct for your project

const protect = async (req, res, next) => {
  let token;

  // 1. Check if the request has an authorization header with a Bearer token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // 2. Get the token from the header (format is "Bearer <token>")
      token = req.headers.authorization.split(" ")[1];

      // 3. Verify the token is valid and not expired
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. Find the user associated with the token and attach them to the request object
      // This makes the user's info available in all protected controllers
      req.user = await User.findById(decoded.id).select("-password");

      // 5. Proceed to the next step (the actual route controller)
      next();
    } catch (error) {
      console.error("Token verification failed:", error);
      res
        .status(401)
        .json({ success: false, message: "Not authorized, token failed" });
    }
  }

  // If there's no token at all
  if (!token) {
    res
      .status(401)
      .json({ success: false, message: "Not authorized, no token" });
  }
};

export { protect };
