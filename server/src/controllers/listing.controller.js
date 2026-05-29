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

    let featuredUntil = null;

    if (parsedFeatured > 0) {
      featuredUntil = new Date();
      featuredUntil.setDate(featuredUntil.getDate() + parsedFeatured);
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
      featuredUntil,
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
      featuredUntil: { $gt: new Date() },
    })
      .sort({
        renewedAt: -1,
        createdAt: -1,
      })
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
      Listing.countDocuments({
        ...baseQuery,
        featuredUntil: { $gt: new Date() },
      }),

      Listing.countDocuments({
        ...baseQuery,
        $or: [{ featuredUntil: null }, { featuredUntil: { $lte: new Date() } }],
      }),
    ]);
    const totalAll = featuredCount + normalCount;

    const listings = await Listing.find(normalQuery)
      .sort({
        renewedAt: -1,
        createdAt: -1,
      })
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

export const getListingById = async (req, res) => {
  try {
    const { id, country } = req.params;

    const listing = await Listing.findOne({
      _id: id,
      country,
      status: "active",
    })
      .populate({
        path: "user",
        select: "profile",
      })
      .populate({
        path: "company",
        populate: {
          path: "ownerId",
          select: "profile",
        },
      });

    if (!listing) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({ listing });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching listing" });
  }
};

export const getMyListings = async (req, res) => {
  try {
    const { status } = req.query;

    const query = {
      user: req.user._id,
    };

    // DEFAULT -> WITHOUT DELETED
    if (!status) {
      query.status = { $ne: "deleted" };
    }

    // ONLY DELETED
    if (status === "deleted") {
      query.status = "deleted";
    }

    // ALL
    if (status === "all") {
      delete query.status;
    }

    const listings = await Listing.find(query)
      .sort({ createdAt: -1 })
      .populate("company", "name logo slug");

    const now = new Date();

    const mapped = listings.map((listing) => {
      const isExpired =
        !listing.isPermanent && listing.expiresAt && listing.expiresAt < now;

      const isFeaturedActive =
        !isExpired &&
        listing.status === "active" &&
        listing.featuredUntil &&
        listing.featuredUntil > now;

      return {
        ...listing.toObject(),
        isExpired,
        isFeaturedActive,
      };
    });

    res.json({ listings: mapped });
  } catch (err) {
    console.error("GET MY LISTINGS ERROR:", err);

    res.status(500).json({
      message: "Failed to fetch listings",
    });
  }
};

//DELETE
export const deleteListing = async (req, res) => {
  try {
    const { id } = req.params;

    const listing = await Listing.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!listing) {
      return res.status(404).json({
        message: "Listing not found",
      });
    }

    listing.status = "deleted";
    listing.deletedAt = new Date();

    await listing.save();

    res.json({
      success: true,
    });
  } catch (err) {
    console.error("DELETE LISTING ERROR:", err);

    res.status(500).json({
      message: "Failed to delete listing",
    });
  }
};

//RESTORE DELETED LISTING
export const restoreListing = async (req, res) => {
  try {
    const { id } = req.params;

    const listing = await Listing.findOne({
      _id: id,
      user: req.user._id,
      status: "deleted",
    });

    if (!listing) {
      return res.status(404).json({
        message: "Listing not found",
      });
    }

    const now = new Date();

    const isExpired =
      !listing.isPermanent && listing.expiresAt && listing.expiresAt < now;

    listing.status = isExpired ? "expired" : "active";
    listing.deletedAt = null;

    await listing.save();

    res.json({
      success: true,
      status: listing.status,
    });
  } catch (err) {
    console.error("RESTORE LISTING ERROR:", err);

    res.status(500).json({
      message: "Failed to restore listing",
    });
  }
};

//RENEW LISTING
export const renewListing = async (req, res) => {
  try {
    const { id } = req.params;

    const { durationDays, featuredDays, isUrgent } = req.body;

    const listing = await Listing.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!listing) {
      return res.status(404).json({
        message: "Listing not found",
      });
    }

    if (listing.isPermanent) {
      return res.status(400).json({
        message: "Permanent listings cannot be renewed",
      });
    }

    const now = new Date();

    // EXPIRES
    const expiresAt = new Date(
      now.getTime() + Number(durationDays) * 24 * 60 * 60 * 1000,
    );

    listing.status = "active";
    listing.expiresAt = expiresAt;
    listing.renewedAt = now;
    listing.durationDays = Number(durationDays);

    // FEATURED
    let featuredUntil = null;

    if (Number(featuredDays) > 0) {
      featuredUntil = new Date(
        now.getTime() + Number(featuredDays) * 24 * 60 * 60 * 1000,
      );

      listing.featuredDays = Number(featuredDays);
      listing.featuredUntil = featuredUntil;
    }

    // URGENT
    if (isUrgent) {
      listing.isUrgent = true;
    }

    await listing.save();

    res.json({
      success: true,

      expiresAt: listing.expiresAt,

      featuredUntil: listing.featuredUntil,

      isFeaturedActive: listing.featuredUntil && listing.featuredUntil > now,

      isUrgent: listing.isUrgent,
    });
  } catch (err) {
    console.error("RENEW LISTING ERROR:", err);

    res.status(500).json({
      message: "Failed to renew listing",
    });
  }
};

//BUY FEATURED
export const featureListing = async (req, res) => {
  try {
    const { id } = req.params;

    const { featuredDays, isUrgent } = req.body;

    const listing = await Listing.findOne({
      _id: id,
      user: req.user._id,
      status: "active",
    });

    if (!listing) {
      return res.status(404).json({
        message: "Listing not found",
      });
    }

    const now = new Date();

    listing.featuredDays = featuredDays;

    listing.featuredUntil = new Date(
      now.getTime() + featuredDays * 24 * 60 * 60 * 1000,
    );

    // AUTO EXTEND IF NEEDED
    if (listing.expiresAt && listing.expiresAt < listing.featuredUntil) {
      listing.expiresAt = listing.featuredUntil;
    }

    // URGENT
    if (isUrgent) {
      listing.isUrgent = true;
    }

    await listing.save();

    res.json({
      success: true,
      featuredUntil: listing.featuredUntil,
      expiresAt: listing.expiresAt,
      isUrgent: listing.isUrgent,
    });
  } catch (err) {
    console.error("FEATURE LISTING ERROR:", err);

    res.status(500).json({
      message: "Failed to feature listing",
    });
  }
};

export const getMyListingById = async (req, res) => {
  try {
    const { id } = req.params;

    const listing = await Listing.findOne({
      _id: id,
      user: req.user._id,
    }).populate("company", "name");

    if (!listing) {
      return res.status(404).json({
        message: "Listing not found",
      });
    }

    res.json({
      listing,
    });
  } catch (err) {
    console.error("GET MY LISTING ERROR:", err);

    res.status(500).json({
      message: "Failed to fetch listing",
    });
  }
};
