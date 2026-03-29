import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const optionalAuth = async (req, res, next) => {
  try {
    const token = req.cookies.auth_token;

    if (!token) {
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (user) {
      req.user = user;
    }

    next();
  } catch (err) {
    next();
  }
};
