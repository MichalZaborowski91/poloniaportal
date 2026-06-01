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
  const res = await fetch(
    `${API_URL}/api/${country}/my-listings/${listingId}/update`,
    {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    },
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to update listing");
  }

  return data;
};
