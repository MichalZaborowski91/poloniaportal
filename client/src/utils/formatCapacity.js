export const formatCapacity = (event) => {
  if (event.unlimitedCapacity) {
    return "Bez limitu uczestników";
  }

  return `${event.capacity} miejsc`;
};
