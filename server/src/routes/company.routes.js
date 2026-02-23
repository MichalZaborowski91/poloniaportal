import express from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import {
  createCompany,
  getMyCompanies,
  deleteCompany,
} from "../controllers/company.controller.js";

const router = express.Router();

router.post("/", requireAuth, createCompany);
router.get("/my", requireAuth, getMyCompanies);
router.delete("/:id", requireAuth, deleteCompany);

export default router;
