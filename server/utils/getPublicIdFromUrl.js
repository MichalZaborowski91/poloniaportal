export const getPublicIdFromUrl = (url) => {
  const parts = url.split("/upload/");

  if (parts.length < 2) {
    return null;
  }

  return parts[1].replace(/^v\d+\//, "").replace(/\.[^/.]+$/, "");
};
