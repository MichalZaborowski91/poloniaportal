import { deleteListingImages } from "../../utils/deleteListingImages.js";
import Listing from "../models/Listing.js";

export const deleteExpiredListings = async () => {
  const THIRTY_ONE_DAYS = 31 * 24 * 60 * 60 * 1000;

  const cutoffDate = new Date(Date.now() - THIRTY_ONE_DAYS);

  const listings = await Listing.find({
    status: "deleted",
    deletedAt: { $lte: cutoffDate },
  });

  for (const listing of listings) {
    await deleteListingImages(listing);

    await Listing.deleteOne({
      _id: listing._id,
    });
  }

  console.log(`Deleted ${listings.length} permanently deleted listings`);
};
