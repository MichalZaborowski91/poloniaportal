import express from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import {
  deleteMyAvatar,
  getUserPublicProfile,
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
router.get("/:displayName", getUserPublicProfile);

export default router;
