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
