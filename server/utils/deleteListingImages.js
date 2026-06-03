import { getPublicIdFromUrl } from "./getPublicIdFromUrl.js";
import cloudinary from "../src/config/cloudinary.js";

export const deleteListingImages = async (listing) => {
  const urls = [];

  if (listing.data?.image) {
    urls.push(listing.data.image);
  }

  if (listing.data?.images?.length) {
    urls.push(...listing.data.images);
  }

  await Promise.all(
    urls.map(async (url) => {
      const publicId = getPublicIdFromUrl(url);

      if (!publicId) {
        return;
      }

      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (err) {
        console.error("CLOUDINARY DELETE ERROR:", err);
      }
    }),
  );
};
