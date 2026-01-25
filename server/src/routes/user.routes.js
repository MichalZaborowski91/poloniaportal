import express from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import {
  deleteMyAvatar,
  updateMyProfile,
  uploadMyAvatar,
} from "../controllers/user.controller.js";
import { uploadAvatar } from "../middleware/uploadAvatar.js";

const router = express.Router();

router.put("/me/profile", requireAuth, updateMyProfile);

router.patch(
  "/avatar",
  requireAuth,
  uploadAvatar.single("avatar"),
  uploadMyAvatar,
);
router.delete("/avatar", requireAuth, deleteMyAvatar);

export default router;
