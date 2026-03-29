import { Company } from "../models/Company.js";
import slugify from "slugify";
import cloudinary from "../config/cloudinary.js";
import fetch from "node-fetch";

//TRIM ALL STRINGS
const cleanString = (value) =>
  typeof value === "string" ? value.trim() : value;

//URL VALIDATION
const normalizeUrl = (url) => {
  if (!url) return undefined;
  const trimmed = url.trim();
  if (!trimmed) return undefined;
  return trimmed.startsWith("http") ? trimmed : `https://${trimmed}`;
};

//CREATE COMPANY
export const createCompany = async (req, res) => {
  console.log("API KEY:", process.env.GOOGLE_MAPS_API_KEY);
  try {
    const user = req.user;
    console.log("PLAN:", user.plan);
    //EMAIL VERIFIED CHECK
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

    //LIMITS
    const planLimits = {
      free: 1,
      plus: 3,
      business: Infinity,
    };

    const limit = planLimits[user.plan] || 1;

    if (companyCount >= limit) {
      return res.status(403).json({
        code: "PLAN_LIMIT",
        message: `Plan ${user.plan} allows only ${limit} companies`,
      });
    }

    const {
      name,
      category,
      description,
      phone,
      email,
      website,
      country,
      city,
      facebook,
      instagram,
      linkedin,
      youtube,
      tiktok,
      google,
      x,
      whatsapp,
      features,
      openingHours,
      location,
    } = req.body;

    const maxDescriptionLength = user.plan === "free" ? 300 : 1000;

    const cleanDescription = cleanString(description);

    if (cleanDescription && cleanDescription.length > maxDescriptionLength) {
      return res.status(400).json({
        message: `Description limit is ${maxDescriptionLength} characters for your plan`,
      });
    }

    if (!name || !name.trim()) {
      return res.status(400).json({
        message: "Company name is required",
      });
    }

    if (!category || !category.trim()) {
      return res.status(400).json({
        message: "Category is required",
      });
    }

    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email.trim())) {
        return res.status(400).json({
          message: "Invalid email format",
        });
      }
    }

    const cleanName = cleanString(name);

    const slug =
      slugify(cleanName, { lower: true, strict: true }) + "-" + Date.now();

    const companyData = {
      ownerId: user._id,
      name: cleanName,
      slug,
      category: cleanString(category),
      description: cleanDescription,
      phone: cleanString(phone) || undefined,
      email: cleanString(email) || undefined,
      country: cleanString(country) || undefined,
      city: cleanString(city) || undefined,
    };

    if (user.plan !== "free") {
      companyData.website = normalizeUrl(website);

      const socialLinks = {
        facebook: normalizeUrl(facebook),
        instagram: normalizeUrl(instagram),
        linkedin: normalizeUrl(linkedin),
        youtube: normalizeUrl(youtube),
        tiktok: normalizeUrl(tiktok),
        google: normalizeUrl(google),
        x: normalizeUrl(x),
      };

      const cleanSocialLinks = Object.fromEntries(
        Object.entries(socialLinks).filter(([_, value]) => value),
      );

      if (Object.keys(cleanSocialLinks).length) {
        companyData.socialLinks = cleanSocialLinks;
      }
    }

    if (features && !Array.isArray(features)) {
      return res.status(400).json({
        message: "Features must be an array",
      });
    }

    if (openingHours && typeof openingHours !== "object") {
      return res.status(400).json({ message: "Invalid opening hours format" });
    }

    const cleanFeatures =
      user.plan === "business" && Array.isArray(features)
        ? features.filter((f) => f && f.trim())
        : [];

    const cleanOpeningHours =
      user.plan === "business" && openingHours ? openingHours : undefined;

    const cleanWhatsapp =
      user.plan === "business" ? cleanString(whatsapp) : undefined;

    if (user.plan === "business") {
      companyData.whatsapp = cleanWhatsapp;
      companyData.features = cleanFeatures;
      companyData.openingHours = cleanOpeningHours;

      if (
        location &&
        typeof location.lat === "number" &&
        typeof location.lng === "number"
      ) {
        companyData.location = {
          lat: location.lat,
          lng: location.lng,
        };
      }
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

    const isOwner =
      req.user && company.ownerId._id.toString() === req.user._id.toString();
    console.log("REQ USER:", req.user?._id);
    console.log("OWNER ID:", company.ownerId._id);
    console.log("STATUS:", company.status);
    if (company.status !== "published" && !isOwner) {
      return res.status(403).json({
        message: "This company is not published",
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

//UPDATE MY COMPANY
export const updateCompany = async (req, res) => {
  try {
    const userId = req.user.id;
    const companyId = req.params.id;

    const company = await Company.findOne({
      _id: companyId,
      ownerId: userId,
    });

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
      });
    }

    const {
      name,
      category,
      description,
      phone,
      email,
      website,
      country,
      city,
      facebook,
      instagram,
      linkedin,
      youtube,
      tiktok,
      google,
      x,
      whatsapp,
      features,
      openingHours,
      location,
      removeLogo,
    } = req.body;

    const maxDescriptionLength = req.user.plan === "free" ? 300 : 1000;

    if (description !== undefined) {
      const cleanDesc = cleanString(description);

      if (cleanDesc && cleanDesc.length > maxDescriptionLength) {
        return res.status(400).json({
          message: `Description limit is ${maxDescriptionLength} characters`,
        });
      }

      company.description = cleanDesc;
    }

    if (name !== undefined) {
      const cleanName = cleanString(name);
      if (!cleanName) {
        return res
          .status(400)
          .json({ message: "Company name cannot be empty" });
      }
      company.name = cleanName;
    }

    if (category !== undefined) {
      const cleanCategory = cleanString(category);

      if (!cleanCategory) {
        return res.status(400).json({
          message: "Category cannot be empty",
        });
      }

      company.category = cleanCategory;
    }

    if (phone !== undefined) {
      company.phone = cleanString(phone) || undefined;
    }

    if (email !== undefined) {
      const cleanEmail = cleanString(email);

      if (cleanEmail) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(cleanEmail)) {
          return res.status(400).json({ message: "Invalid email format" });
        }
      }

      company.email = cleanEmail || undefined;
    }
    if (country !== undefined) {
      company.country = cleanString(country) || undefined;
    }
    if (city !== undefined) {
      company.city = cleanString(city) || undefined;
    }

    //PLUS
    if (req.user.plan !== "free") {
      if (website !== undefined) {
        const normalizedWebsite = normalizeUrl(website);
        company.website = normalizedWebsite || undefined;
      }
      const socialUpdates = {
        facebook,
        instagram,
        linkedin,
        youtube,
        tiktok,
        google,
        x,
      };

      const updatedSocials = { ...(company.socialLinks || {}) };

      Object.entries(socialUpdates).forEach(([key, value]) => {
        if (value === undefined) return;

        const normalized = normalizeUrl(value);

        if (!normalized) {
          delete updatedSocials[key];
        } else {
          updatedSocials[key] = normalized;
        }
      });

      if (Object.keys(updatedSocials).length) {
        company.socialLinks = updatedSocials;
      } else {
        company.socialLinks = undefined;
      }
    }

    //BUSINESS
    if (req.user.plan === "business") {
      if (whatsapp !== undefined) {
        company.whatsapp = cleanString(whatsapp) || undefined;
      }

      if (features !== undefined) {
        if (!Array.isArray(features)) {
          return res.status(400).json({ message: "Features must be an array" });
        }

        company.features = features.filter((f) => f && f.trim());
      }

      if (openingHours !== undefined) {
        if (typeof openingHours !== "object") {
          return res.status(400).json({
            message: "Invalid opening hours format",
          });
        }

        company.openingHours = openingHours;
      }

      if (location !== undefined) {
        if (
          location &&
          typeof location.lat === "number" &&
          typeof location.lng === "number"
        ) {
          company.location = {
            lat: location.lat,
            lng: location.lng,
          };
        } else {
          company.location = undefined;
        }
      }
    }

    if (removeLogo) {
      try {
        await cloudinary.uploader.destroy(
          `poloniaportal/company-logos/${companyId}`,
        );
      } catch (err) {
        console.error("Cloudinary delete error", err);
      }

      company.logo = null;
    }
    await company.save();

    res.json(company);
  } catch (err) {
    console.error("UPDATE COMPANY ERROR", err);
    res.status(500).json({
      message: "Update company failed",
    });
  }
};

export const uploadCompanyLogo = async (req, res) => {
  try {
    const userId = req.user.id;
    const companyId = req.params.id;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const company = await Company.findOne({
      _id: companyId,
      ownerId: userId,
    });

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
      });
    }

    //ONLY PLUS AND BUSINESS
    if (req.user.plan === "free") {
      return res.status(403).json({
        message: "Logo upload available in Plus plan",
      });
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "poloniaportal/company-logos",
        public_id: companyId, //EACH COMPANY - ONE LOGO
        overwrite: true,
        transformation: [{ width: 400, height: 400, crop: "limit" }],
        // transformation: [
        //{
        //  width: 400,
        // height: 400,
        // crop: "fill",
        // gravity: "auto",
        //  },
        //],
      },
      async (error, result) => {
        if (error) {
          return res.status(500).json({ message: "Cloudinary upload failed" });
        }

        company.logo = result.secure_url;
        await company.save();

        res.json({ logo: company.logo });
      },
    );

    uploadStream.end(req.file.buffer);
  } catch (err) {
    console.error("UPLOAD COMPANY LOGO ERROR", err);
    res.status(500).json({ message: err.message });
  }
};

export const geocodeAddress = async (req, res) => {
  try {
    const { address } = req.body;

    if (!address) {
      return res.status(400).json({ message: "Address required" });
    }

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address,
      )}&key=${process.env.GOOGLE_MAPS_API_KEY}`,
    );

    const data = await response.json();

    if (data.status !== "OK") {
      return res.status(400).json({ message: "Geocoding failed" });
    }

    const location = data.results[0].geometry.location;

    res.json(location);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Geocode error" });
  }
};

export const publishCompany = async (req, res) => {
  try {
    const company = await Company.findOne({
      _id: req.params.id,
      ownerId: req.user.id,
    });

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
      });
    }

    const { featured, showOnHomepage } = req.body;

    company.status = "published";

    if (featured) {
      company.isFeatured = true;
      company.featuredUntil = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    }

    if (showOnHomepage) {
      company.showOnHomepage = true;
    }

    await company.save();

    res.json({ success: true });
  } catch (err) {
    console.error("PUBLISH ERROR", err);
    res.status(500).json({ message: "Publish failed" });
  }
};

export const getPublicCompanies = async (req, res) => {
  try {
    const { search, city, category, country } = req.query;

    const query = {
      status: "published",
    };

    if (country) {
      query.country = country;
    }

    if (city) {
      query.city = city;
    }

    if (category) {
      query.category = category;
    }

    if (search) {
      query.name = {
        $regex: search,
        $options: "i",
      };
    }

    const companies = await Company.find(query).sort({ createdAt: -1 });

    res.json(companies);
  } catch (err) {
    console.error("GET PUBLIC COMPANIES ERROR", err);
    res.status(500).json({ message: "Failed to fetch companies" });
  }
};
