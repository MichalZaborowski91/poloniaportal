const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const getMe = async () => {
  const res = await fetch(`${API_URL}/api/auth/me`, {
    credentials: "include",
  });
  if (!res.ok) return null;
  return res.json();
};

export const login = async ({ email, password, rememberMe, captchaToken }) => {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password, rememberMe, captchaToken }),
  });

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message || "Login failed");
    error.status = res.status;
    error.data = data;
    throw error;
  }

  return data;
};

export const register = async ({
  email,
  password,
  company,
  captchaToken,
  timeStamp,
}) => {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      email,
      password,
      company,
      captchaToken,
      timeStamp,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    const error = new Error("Register failed");
    error.status = res.status;
    error.data = data;
    throw error;
  }

  return data;
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

export const deleteAccount = async ({ password, captchaToken }) => {
  const res = await fetch(`${API_URL}/api/auth/delete-account`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ password, captchaToken }),
  });

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message || "Delete account failed");
    error.code = data.code || "UNKNOWN_ERROR";
    throw error;
  }

  return data;
};

export const requestPasswordReset = async ({
  email,
  captchaToken,
  country,
}) => {
  const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, captchaToken, country }),
  });

  return res.json();
};

export const resetPassword = async ({ token, password }) => {
  const res = await fetch(`${API_URL}/api/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ token, password }),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Reset password failed");
  }

  return res.json();
};

export const validateResetToken = async (token) => {
  const res = await fetch(`${API_URL}/api/auth/reset-password/${token}`);

  if (!res.ok) {
    return false;
  }

  const data = await res.json();
  return data.valid === true;
};

export const changePassword = async ({
  currentPassword,
  newPassword,
  captchaToken,
}) => {
  const res = await fetch(`${API_URL}/api/auth/change-password`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ currentPassword, newPassword, captchaToken }),
  });

  let data = {};

  try {
    data = await res.json();
  } catch {
    //NO JSON – EXAMPLE SERVER ERROR
  }

  if (!res.ok) {
    const error = new Error(data.message || "Change password failed");
    error.code = data.code || "UNKNOWN_ERROR";
    throw error;
  }

  return data;
};

export const logoutAllDevices = async () => {
  const res = await fetch(`${API_URL}/api/auth/logout-all`, {
    method: "POST",
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const requestEmailChange = async ({
  currentPassword,
  newEmail,
  captchaToken,
  country,
}) => {
  const res = await fetch(`${API_URL}/api/auth/change-email`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ currentPassword, newEmail, country, captchaToken }),
  });

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    error.code = data.code;
    throw error;
  }

  return data;
};

export const confirmEmailChange = async (token) => {
  const res = await fetch(
    `${API_URL}/api/auth/confirm-email-change?token=${token}`,
    {
      method: "GET",
      credentials: "include",
    },
  );

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message || "Error");
    error.code = data.code;
    throw error;
  }

  return data;
};
