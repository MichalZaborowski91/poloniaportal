const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const getMyCompanies = async () => {
  const res = await fetch(`${API_URL}/api/companies/my`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch companies");
  }

  return res.json();
};

export const createCompany = async (data) => {
  const res = await fetch(`${API_URL}/api/companies`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const json = await res.json();

  if (!res.ok) {
    const error = new Error(json.message || "Request failed");
    error.status = res.status;
    error.code = json.code;
    throw error;
  }

  return json;
};

export const deleteCompany = async (id) => {
  const res = await fetch(`${API_URL}/api/companies/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const json = await res.json();

  if (!res.ok) {
    const error = new Error(json.message || "Delete failed");
    error.status = res.status;
    throw error;
  }

  return json;
};

export const getCompanyBySlug = async (slug) => {
  const res = await fetch(`${API_URL}/api/companies/${slug}`, {
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Company not found");
  }

  return res.json();
};

export const updateCompany = async (id, data) => {
  const res = await fetch(`${API_URL}/api/companies/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const json = await res.json();

  if (!res.ok) {
    const error = new Error(json.message || "Update failed");
    error.status = res.status;
    throw error;
  }

  return json;
};

export const uploadCompanyLogo = async (id, file) => {
  const formData = new FormData();
  formData.append("logo", file);

  const res = await fetch(`${API_URL}/api/companies/${id}/logo`, {
    method: "PATCH",
    credentials: "include",
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Upload failed");
  }

  return data;
};

export const togglePublishCompany = async (id) => {
  const res = await fetch(`${API_URL}/api/companies/${id}/publish`, {
    method: "PATCH",
    credentials: "include",
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || "Publish failed");
  }

  return json;
};

export const getPublicCompanies = async (params = {}) => {
  const query = new URLSearchParams(params).toString();

  const res = await fetch(`${API_URL}/api/companies?${query}`);

  if (!res.ok) {
    throw new Error("Failed to fetch companies");
  }

  return res.json();
};

export const getHomePageCompanies = async (country) => {
  const res = await fetch(
    `${API_URL}/api/companies/homepage?country=${country}`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch homepage companies");
  }

  return res.json();
};
