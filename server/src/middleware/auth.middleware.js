import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const requireAuth = async (req, res, next) => {
  const token = req.cookies.auth_token;

  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user || user.isDeleted) {
      return res.status(401).json({ message: "Account deleted or not found" });
    }

    //GLOBAL LOGOUT CHECK
    if (user.passwordChangedAt) {
      const tokenIssuedAt = decoded.iat * 1000; //IAT IS IN SECONDS

      if (tokenIssuedAt < user.passwordChangedAt.getTime()) {
        return res.status(401).json({
          message: "Session expired. Please login again.",
        });
      }
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
