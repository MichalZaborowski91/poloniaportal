import Listing from "../models/Listing.js";
import { Company } from "../models/Company.js";
import cloudinary from "../config/cloudinary.js";
import mongoose from "mongoose";

const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const createListing = async (req, res, next) => {
  try {
    let listingCountry = req.user.country;

    const { type, title, description, durationDays, company } = req.body;

    let data = {};

    if (req.body.data) {
      data = JSON.parse(req.body.data);
    }

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

    const listing = await Listing.create({
      user: req.user._id,
      company: companyId,
      country: listingCountry,
      type,
      title,
      description,
      data,
      durationDays: isService ? null : durationDays,
      isPermanent: isService,
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
  console.log("PARAMS:", req.params);
  console.log("QUERY:", req.query);
  try {
    const { country } = req.params;
    const { type, category, q, limit } = req.query;

    const now = new Date();

    const filter = {
      country,
      status: "active",
      $and: [
        {
          $or: [{ expiresAt: { $gt: now } }, { isPermanent: true }],
        },
      ],
    };

    // FILTER BY CATEGORY
    if (category && CATEGORY_MAP[category]) {
      filter.type = { $in: CATEGORY_MAP[category] };
    }

    //FILTER BY TYPE
    if (type) {
      filter.type = type;
    }

    //TEXT INPUT
    if (q) {
      const safe = escapeRegex(q.trim());
      const regex = new RegExp(`.*${safe}.*`, "i");

      filter.$and.push({
        $or: [
          { title: regex },
          { "data.position": regex },
          { "data.city": regex },
        ],
      });
    }

    const listings = await Listing.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit ? Number(limit) : 0);

    const total = await Listing.countDocuments({
      country,
      status: "active",
      $or: [{ expiresAt: { $gt: now } }, { isPermanent: true }],
    });

    res.json({ listings, total });
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
