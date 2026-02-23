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
