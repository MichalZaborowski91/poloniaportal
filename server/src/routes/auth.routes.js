import express from "express";
import {
  register,
  login,
  me,
  logout,
  verifyEmail,
  resendVerifyEmail,
  deleteAccount,
  forgotPassword,
  resetPassword,
  validateResetToken,
  changePassword,
  logoutAllDevices,
  confirmEmailChange,
  requestEmailChange,
} from "../controllers/auth.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import {
  forgotLimiter,
  loginLimiter,
  registerLimiter,
} from "../middleware/rateLimit.js";

const router = express.Router();

router.post("/register", registerLimiter, register);
router.delete("/delete-account", requireAuth, deleteAccount);
router.post("/login", loginLimiter, login);
router.get("/me", requireAuth, me);
router.post("/logout", logout);
router.get("/verify-email/:token", verifyEmail);
router.post("/resend-verify", requireAuth, resendVerifyEmail);
router.post("/forgot-password", forgotLimiter, forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/reset-password/:token", validateResetToken);
router.put("/change-password", requireAuth, changePassword);
router.post("/logout-all", requireAuth, logoutAllDevices);
router.put("/change-email", requireAuth, requestEmailChange);
router.get("/confirm-email-change", confirmEmailChange);

export default router;
