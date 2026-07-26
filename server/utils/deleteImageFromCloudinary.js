import cloudinary from "../src/config/cloudinary.js";

export const deleteImageFromCloudinary = async (publicId) => {
  if (!publicId) return;

  await cloudinary.uploader.destroy(publicId);
};
