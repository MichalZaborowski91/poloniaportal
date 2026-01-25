const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const updateMyProfile = async (profileData) => {
  const res = await fetch(`${API_URL}/api/users/me/profile`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profileData),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Profile update failed");
  }

  return data;
};

export const uploadAvatar = async (file) => {
  const formData = new FormData();
  formData.append("avatar", file);

  const res = await fetch(`${API_URL}/api/users/avatar`, {
    method: "PATCH",
    body: formData,
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Avatar upload failed");
  }
  return res.json();
};

export const deleteAvatar = async () => {
  const res = await fetch(`${API_URL}/api/users/avatar`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Delete avatar failed");
  }
  return res.json();
};
