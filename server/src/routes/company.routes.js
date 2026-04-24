import express from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import {
  createCompany,
  getMyCompanies,
  deleteCompany,
  getCompanyBySlug,
  updateCompany,
  geocodeAddress,
  publishCompany,
  getPublicCompanies,
  getHomePageCompanies,
} from "../controllers/company.controller.js";
import { uploadCompanyLogo } from "../middleware/uploadCompanyLogo.js";
import { uploadCompanyLogo as uploadCompanyLogoController } from "../controllers/company.controller.js";
import { optionalAuth } from "../middleware/optionalAuth.middleware.js";

const router = express.Router();

router.post("/", requireAuth, createCompany);
router.get("/my", requireAuth, getMyCompanies);
router.delete("/:id", requireAuth, deleteCompany);
router.put("/:id", requireAuth, updateCompany);
router.get("/", getPublicCompanies);
router.get("/homepage", getHomePageCompanies);
router.get("/:slug", optionalAuth, getCompanyBySlug);
router.patch(
  "/:id/logo",
  requireAuth,
  uploadCompanyLogo.single("logo"),
  uploadCompanyLogoController,
);
router.post("/geocode", geocodeAddress);
router.patch("/:id/publish", requireAuth, publishCompany);
export default router;
