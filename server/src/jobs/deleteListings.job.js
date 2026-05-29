import Listing from "../models/Listing.js";

export const deleteExpiredListings = async () => {
  const THIRTY_ONE_DAYS = 31 * 24 * 60 * 60 * 1000;

  const cutoffDate = new Date(Date.now() - THIRTY_ONE_DAYS);

  const result = await Listing.deleteMany({
    status: "deleted",
    deletedAt: { $lte: cutoffDate },
  });

  console.log(`Deleted ${result.deletedCount} permanently deleted listings`);
};
