import express from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import {
  createCompany,
  getMyCompanies,
  deleteCompany,
  getCompanyBySlug,
  updateCompany,
} from "../controllers/company.controller.js";

const router = express.Router();

router.post("/", requireAuth, createCompany);
router.get("/my", requireAuth, getMyCompanies);
router.delete("/:id", requireAuth, deleteCompany);
router.put("/:id", requireAuth, updateCompany);
router.get("/:slug", getCompanyBySlug);

export default router;
