import { Company } from "../models/Company.js";
import slugify from "slugify";

//CREATE COMPANY
export const createCompany = async (req, res) => {
  try {
    const user = req.user;

    // EMAIL VERIFIED CHECK
    if (!user.emailVerified) {
      return res.status(403).json({
        code: "EMAIL_NOT_VERIFIED",
        message: "Verify your email before creating a company",
      });
    }

    if (!user.profileCompleted) {
      return res.status(403).json({
        code: "PROFILE_NOT_COMPLETED",
        message: "Complete your profile before creating a company",
      });
    }

    const companyCount = await Company.countDocuments({
      ownerId: user._id,
    });

    if (user.plan === "free" && companyCount >= 1) {
      return res.status(403).json({
        code: "PLAN_LIMIT",
        message: "Free plan allows only 1 company",
      });
    }

    const { name, description, phone, email, website, country, city } =
      req.body;

    const maxDescriptionLength = user.plan === "free" ? 300 : 1000;

    if (description && description.length > maxDescriptionLength) {
      return res.status(400).json({
        message: `Description limit is ${maxDescriptionLength} characters for your plan`,
      });
    }

    if (!name) {
      return res.status(400).json({
        message: "Company name is required",
      });
    }

    const slug =
      slugify(name, { lower: true, strict: true }) + "-" + Date.now();

    const companyData = {
      ownerId: user._id,
      name: name.trim(),
      slug,
      description,
      phone,
      email,
      country,
      city,
      plan: user.plan,
    };

    if (user.plan !== "free") {
      companyData.website = website;
    }

    const company = await Company.create(companyData);

    res.status(201).json(company);
  } catch (err) {
    console.error("CREATE COMPANY ERROR", err);
    res.status(500).json({
      message: "Create company failed",
    });
  }
};
//GET MY COMPANIES
export const getMyCompanies = async (req, res) => {
  try {
    const companies = await Company.find({ ownerId: req.user.id }).sort({
      createdAt: -1,
    });

    res.json(companies);
  } catch (err) {
    console.error("GET MY COMPANIES ERROR", err);
    res.status(500).json({ message: "Failed to fetch companies" });
  }
};

//DELETE MY COMPANY
export const deleteCompany = async (req, res) => {
  try {
    const userId = req.user.id;
    const companyId = req.params.id;

    const company = await Company.findOneAndDelete({
      _id: companyId,
      ownerId: userId,
    });

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
      });
    }

    // W przyszłości:
    // TODO: usunąć ogłoszenia powiązane z firmą

    return res.json({
      success: true,
      message: "Company deleted",
    });
  } catch (err) {
    console.error("DELETE COMPANY ERROR", err);
    res.status(500).json({
      message: "Delete company failed",
    });
  }
};

// PUBLIC COMPANY PROFILE
export const getCompanyBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const company = await Company.findOne({ slug }).populate(
      "ownerId",
      "profile.displayName profile.displayNameNormalized profile.avatar",
    );

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
      });
    }

    res.json(company);
  } catch (err) {
    console.error("GET COMPANY BY SLUG ERROR", err);
    res.status(500).json({
      message: "Failed to fetch company",
    });
  }
};
