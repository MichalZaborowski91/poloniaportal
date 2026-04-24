import express from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import {
  createListing,
  getCompanyListings,
  getListings,
} from "../controllers/listing.controller.js";
import { uploadListingImage } from "../middleware/uploadListingImage.js";

const router = express.Router();

router.post(
  "/:country/listings",
  requireAuth,
  uploadListingImage,
  createListing,
);
router.get("/:country/listings", getListings);
router.get("/:country/companies/:companyId/listings", getCompanyListings);

export default router;
