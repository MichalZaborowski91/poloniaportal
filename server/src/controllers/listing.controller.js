import Listing from "../models/Listing.js";
import { Company } from "../models/Company.js";
import cloudinary from "../config/cloudinary.js";
import mongoose from "mongoose";

const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const createListing = async (req, res, next) => {
  try {
    let listingCountry = req.user.country;

    const {
      type,
      title,
      description,
      durationDays,
      company,
      featuredDays,
      isUrgent,
    } = req.body;

    const parsedIsUrgent = isUrgent === "true";
    let data = {};

    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    if (req.body.data) {
      data = JSON.parse(req.body.data);
    }

    if (data.category === "") delete data.category;
    if (data.condition === "") delete data.condition;
    if (data.price === "") delete data.price;

    if (req.files?.image?.[0]) {
      const file = req.files.image[0];

      const uploadedImageUrl = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "poloniaportal/listings",
          },
          (error, result) => {
            if (error) {
              return reject(error);
            }

            resolve(result.secure_url);
          },
        );

        uploadStream.end(file.buffer);
      });

      data.image = uploadedImageUrl;
    }

    if (req.files?.images?.length) {
      const uploadedImages = await Promise.all(
        req.files.images.map((file) => {
          return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              {
                folder: "poloniaportal/listings",
              },
              (error, result) => {
                if (error) {
                  return reject(error);
                }

                resolve(result.secure_url);
              },
            );

            uploadStream.end(file.buffer);
          });
        }),
      );

      data.images = uploadedImages;
    }

    let companyId = null;

    //IF USER WANT TO ADD AS COMPANY
    if (company) {
      const existingCompany = await Company.findById(company);

      if (!existingCompany) {
        return res.status(404).json({ message: "Company not found" });
      }

      if (existingCompany.ownerId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Not your company" });
      }

      companyId = existingCompany._id;
      listingCountry = existingCompany.country;
    }

    const isService = type === "service_offer";

    const parsedDuration = Number(durationDays);
    const parsedFeatured = Number(featuredDays);

    if (!isService) {
      if (parsedFeatured > parsedDuration) {
        return res.status(400).json({
          message: "Featured days cannot be greater than listing duration",
        });
      }
    }

    const listing = await Listing.create({
      user: req.user._id,
      company: companyId,
      country: listingCountry,
      type,
      title,
      description,
      data,
      durationDays: isService ? null : parsedDuration,
      featuredDays: parsedFeatured || 0,
      isPermanent: isService,
      isUrgent: isService ? false : parsedIsUrgent,
    });

    res.status(201).json({ listing });
  } catch (error) {
    console.error("CREATE LISTING ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

const CATEGORY_MAP = {
  housing: ["housing_offer", "housing_wanted"],
  job: ["job_offer", "job_wanted"],
  market: ["market_offer", "market_wanted"],
  service: ["service_offer"],
};

export const getListings = async (req, res) => {
  try {
    const { country } = req.params;
    const { type, category, q, page = 1, limit = 16 } = req.query;

    const baseQuery = {
      country,
      status: "active",
      $and: [
        {
          $or: [
            { expiresAt: { $gt: new Date() }, isPermanent: false },
            { isPermanent: true },
          ],
        },
      ],
    };

    // FILTER CATEGORY
    if (category && CATEGORY_MAP[category]) {
      baseQuery.type = { $in: CATEGORY_MAP[category] };
    }

    // FILTER TYPE
    if (type) {
      baseQuery.type = type;
    }

    // SEARCH
    if (q && q.trim()) {
      const safe = escapeRegex(q.trim());
      const regex = new RegExp(`.*${safe}.*`, "i");

      baseQuery.$and.push({
        $or: [
          { title: regex },
          { "data.position": regex },
          { "data.city": regex },
        ],
      });
    }

    // ⭐ FEATURED (tak jak firmy)
    const featured = await Listing.find({
      ...baseQuery,
      featuredDays: { $gt: 0 },
    })
      .sort({ createdAt: -1 })
      .limit(4);

    // 📦 NORMALNE
    const normalQuery = {
      ...baseQuery,
      featuredDays: { $eq: 0 },
    };

    const pageNumber = Math.max(1, parseInt(page) || 1);
    const limitNumber = Math.max(1, parseInt(limit) || 16);
    const skip = (pageNumber - 1) * limitNumber;

    const total = await Listing.countDocuments(normalQuery);

    const [featuredCount, normalCount] = await Promise.all([
      Listing.countDocuments({ ...baseQuery, featuredDays: { $gt: 0 } }),
      Listing.countDocuments({ ...baseQuery, featuredDays: { $eq: 0 } }),
    ]);

    const totalAll = featuredCount + normalCount;

    const listings = await Listing.find(normalQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNumber);

    res.json({
      featured,
      listings,
      total,
      totalAll,
      page: pageNumber,
      totalPages: Math.ceil(total / limitNumber),
    });
  } catch (err) {
    console.error("GET LISTINGS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch listings" });
  }
};

export const getCompanyListings = async (req, res) => {
  try {
    const { companyId } = req.params;

    const now = new Date();

    const listings = await Listing.find({
      company: new mongoose.Types.ObjectId(companyId),
      status: "active",
      $or: [{ expiresAt: { $gt: now } }, { isPermanent: true }],
    }).sort({ createdAt: -1 });

    res.json({ listings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch company listings" });
  }
};
