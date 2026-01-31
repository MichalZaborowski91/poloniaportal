import express from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import {
  createListing,
  getListings,
} from "../controllers/listing.controller.js";

const router = express.Router();

router.post("/:country/listings", requireAuth, createListing);
router.get("/:country/listings", getListings);

export default router;
