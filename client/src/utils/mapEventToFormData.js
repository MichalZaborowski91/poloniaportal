export const mapEventToFormData = (event) => ({
  company: event.company?._id || "",
  title: event.title || "",
  description: event.description || "",
  category: event.category || "",
  coverImage: event.coverImage?.url || null,

  startDate: event.startDate ? new Date(event.startDate) : null,
  startTime: event.startDate ? new Date(event.startDate) : null,

  endDate: event.endDate ? new Date(event.endDate) : null,
  endTime: event.endDate ? new Date(event.endDate) : null,

  isOnline: event.isOnline,
  isFree: event.price === 0,

  city: event.city || "",
  venue: event.venue || "",
  address: event.address || "",
  onlineLink: event.onlineLink || "",

  price: event.price || "",
  priceLabel: event.priceLabel || "",

  capacity: event.capacity || "",
  unlimitedCapacity: event.unlimitedCapacity,

  website: event.website || "",
});
