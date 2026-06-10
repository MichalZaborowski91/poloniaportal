const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const getMyListings = async (country, status = "") => {
  const query = status ? `?status=${status}` : "";

  const res = await fetch(`${API_URL}/api/${country}/my-listings${query}`, {
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch listings");
  }

  return data.listings || [];
};

export const deleteListing = async (country, listingId) => {
  const res = await fetch(
    `${API_URL}/api/${country}/my-listings/${listingId}/delete`,
    {
      method: "PATCH",
      credentials: "include",
    },
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to delete listing");
  }

  return data;
};

export const restoreListing = async (country, listingId) => {
  const res = await fetch(
    `${API_URL}/api/${country}/my-listings/${listingId}/restore`,
    {
      method: "PATCH",
      credentials: "include",
    },
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to restore listing");
  }

  return data;
};

export const renewListing = async (country, listingId, renewData) => {
  const res = await fetch(
    `${API_URL}/api/${country}/my-listings/${listingId}/renew`,
    {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(renewData),
    },
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to renew listing");
  }

  return data;
};

export const featureListing = async (country, listingId, featureData) => {
  const res = await fetch(
    `${API_URL}/api/${country}/my-listings/${listingId}/feature`,
    {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(featureData),
    },
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to feature listing");
  }

  return data;
};

export const getMyListingById = async (country, listingId) => {
  const res = await fetch(
    `${API_URL}/api/${country}/my-listings/${listingId}`,
    {
      credentials: "include",
    },
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch listing");
  }

  return data.listing;
};

export const updateListing = async (country, listingId, formData) => {
  const body = new FormData();

  body.append("company", formData.company || "");
  body.append("title", formData.title || "");
  body.append("description", formData.description || "");

  body.append("city", formData.city || "");

  body.append("contactName", formData.contactName || "");
  body.append("contactPhone", formData.contactPhone || "");
  body.append("contactEmail", formData.contactEmail || "");

  body.append("position", formData.position || "");

  body.append("portfolioLink", formData.portfolioLink || "");
  body.append("linkedinLink", formData.linkedinLink || "");

  body.append("category", formData.category || "");
  body.append("condition", formData.condition || "");
  body.append("price", formData.price || "");

  // SINGLE IMAGE
  if (formData.image instanceof File) {
    body.append("image", formData.image);
  }

  body.append(
    "existingImage",
    typeof formData.image === "string" ? formData.image : "",
  );

  // MULTI IMAGES
  const existingImages = (formData.images || []).filter(
    (img) => typeof img === "string",
  );

  body.append("existingImages", JSON.stringify(existingImages));

  (formData.images || [])
    .filter((img) => img instanceof File)
    .forEach((file) => {
      body.append("images", file);
    });

  const res = await fetch(
    `${API_URL}/api/${country}/my-listings/${listingId}/update`,
    {
      method: "PATCH",
      credentials: "include",
      body,
    },
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to update listing");
  }

  return data;
};

export const permanentlyDeleteSelectedListings = async (
  country,
  listingIds,
) => {
  const res = await fetch(
    `${API_URL}/api/${country}/my-listings/delete-selected`,
    {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        listingIds,
      }),
    },
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed");
  }

  return data;
};

export const permanentlyDeleteAllDeletedListings = async (country) => {
  const res = await fetch(
    `${API_URL}/api/${country}/my-listings/delete-all-deleted`,
    {
      method: "DELETE",
      credentials: "include",
    },
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed");
  }

  return data;
};

export const toggleFavoriteListing = async (country, listingId) => {
  const res = await fetch(
    `${API_URL}/api/${country}/listings/${listingId}/favorite`,
    {
      method: "POST",
      credentials: "include",
    },
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed");
  }

  return data;
};

export const getFavoriteStatus = async (country, listingId) => {
  const res = await fetch(
    `${API_URL}/api/${country}/listings/${listingId}/favorite-status`,
    {
      credentials: "include",
    },
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed");
  }

  return data.isFavorite;
};

export const getFavoriteListings = async (country) => {
  const res = await fetch(`${API_URL}/api/${country}/favorites`, {
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed");
  }

  return data.listings || [];
};

export const removeFavoriteListing = async (country, listingId) => {
  const res = await fetch(
    `${API_URL}/api/${country}/listings/${listingId}/favorite`,
    {
      method: "POST",
      credentials: "include",
    },
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed");
  }

  return data;
};
