const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const getMyEvents = async (country) => {
  const res = await fetch(`${API_URL}/api/${country}/my-events`, {
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch events");
  }

  return data.events || [];
};

export const getEvents = async (country) => {
  const res = await fetch(`${API_URL}/api/${country}/events`);

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch events");
  }

  return data.events || [];
};

export const getEvent = async (country, id) => {
  const res = await fetch(`${API_URL}/api/${country}/events/${id}`);

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch event");
  }

  return data.event;
};
