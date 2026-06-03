import express from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import {
  createListing,
  getCompanyListings,
  getListingById,
  getListings,
  getMyListings,
  deleteListing,
  restoreListing,
  renewListing,
  featureListing,
  getMyListingById,
  updateListing,
  permanentlyDeleteSelectedListings,
  permanentlyDeleteAllDeletedListings,
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
router.get("/:country/my-listings", requireAuth, getMyListings);
router.patch("/:country/my-listings/:id/delete", requireAuth, deleteListing);
router.patch("/:country/my-listings/:id/restore", requireAuth, restoreListing);
router.patch("/:country/my-listings/:id/renew", requireAuth, renewListing);
router.patch("/:country/my-listings/:id/feature", requireAuth, featureListing);
router.patch(
  "/:country/my-listings/:id/update",
  requireAuth,
  uploadListingImage,
  updateListing,
);
router.get("/:country/my-listings/:id", requireAuth, getMyListingById);
router.get("/:country/listings/:id", getListingById);
router.delete(
  "/:country/my-listings/delete-selected",
  requireAuth,
  permanentlyDeleteSelectedListings,
);
router.delete(
  "/:country/my-listings/delete-all-deleted",
  requireAuth,
  permanentlyDeleteAllDeletedListings,
);

export default router;
