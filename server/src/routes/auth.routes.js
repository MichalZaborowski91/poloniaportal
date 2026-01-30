import express from "express";
import {
  register,
  login,
  me,
  logout,
  verifyEmail,
  resendVerifyEmail,
  deleteAccount,
} from "../controllers/auth.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.delete("/delete-account", requireAuth, deleteAccount);
router.post("/login", login);
router.get("/me", requireAuth, me);
router.post("/logout", logout);
router.get("/verify-email/:token", verifyEmail);
router.post("/resend-verify", requireAuth, resendVerifyEmail);

export default router;
