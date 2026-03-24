import express from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import {
  createCompany,
  getMyCompanies,
  deleteCompany,
  getCompanyBySlug,
  updateCompany,
  geocodeAddress,
} from "../controllers/company.controller.js";
import { uploadCompanyLogo } from "../middleware/uploadCompanyLogo.js";
import { uploadCompanyLogo as uploadCompanyLogoController } from "../controllers/company.controller.js";

const router = express.Router();

router.post("/", requireAuth, createCompany);
router.get("/my", requireAuth, getMyCompanies);
router.delete("/:id", requireAuth, deleteCompany);
router.put("/:id", requireAuth, updateCompany);
router.get("/:slug", getCompanyBySlug);
router.patch(
  "/:id/logo",
  requireAuth,
  uploadCompanyLogo.single("logo"),
  uploadCompanyLogoController,
);
router.post("/geocode", geocodeAddress);
export default router;
