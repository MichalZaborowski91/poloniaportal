import { COUNTRIES_PL } from "../app/countriesPL";

export const formatPrice = (event) => {
  if (event.priceLabel) {
    return event.priceLabel;
  }

  if (event.price === 0) {
    return "Darmowe";
  }

  const currency = COUNTRIES_PL[event.country]?.currency ?? "";

  return `${event.price} ${currency}`;
};
