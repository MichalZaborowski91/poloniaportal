export const formatEventLocation = (event) => {
  if (event.isOnline) {
    return "Online";
  }

  return [event.venue, event.address, event.city].filter(Boolean).join(", ");
};
