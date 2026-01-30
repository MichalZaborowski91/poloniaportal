const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const getMe = async () => {
  const res = await fetch(`${API_URL}/api/auth/me`, {
    credentials: "include",
  });
  if (!res.ok) return null;
  return res.json();
};

export const login = async ({ email, password, rememberMe }) => {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password, rememberMe }),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Login failed");
  }
  return res.json();
};

export const register = async ({ email, password }) => {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Register failed");
  }
  return res.json();
};

export const logout = async () => {
  const res = await fetch(`${API_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Logout failed");
  }
};

export const deleteAccount = async () => {
  const res = await fetch(`${API_URL}/api/auth/delete-account`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Delete account failed");
  }
  return res.json();
};
