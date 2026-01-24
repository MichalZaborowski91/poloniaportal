import express from "express";
import { updateMyProfile } from "../controllers/user.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.put("/me/profile", requireAuth, updateMyProfile);

export default router;
