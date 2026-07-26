import express from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { uploadEventImage } from "../middleware/uploadEventImage.js";
import {
  createEvent,
  getEvent,
  getEvents,
  getMyEvent,
  getMyEvents,
  updateEvent,
} from "../controllers/event.controller.js";
import { validateObjectId } from "../middleware/validateObjectId.js";

const router = express.Router();

// PUBLIC
router.get("/:country/events", getEvents);
router.get("/:country/events/:id", validateObjectId(), getEvent);

// PRIVATE
router.post("/:country/events", requireAuth, uploadEventImage, createEvent);
router.get("/:country/my-events", requireAuth, getMyEvents);
router.get(
  "/:country/my-events/:id",
  requireAuth,
  validateObjectId(),
  getMyEvent,
);
router.patch(
  "/:country/my-events/:id",
  requireAuth,
  validateObjectId(),
  uploadEventImage,
  updateEvent,
);

router.patch("/:country/my-events/:id/delete", requireAuth, (req, res) => {});

router.patch("/:country/my-events/:id/cancel", requireAuth, (req, res) => {});

router.patch("/:country/my-events/:id/finish", requireAuth, (req, res) => {});

router.delete(
  "/:country/my-events/delete-selected",
  requireAuth,
  (req, res) => {},
);

router.delete(
  "/:country/my-events/delete-all-deleted",
  requireAuth,
  (req, res) => {},
);

export default router;
