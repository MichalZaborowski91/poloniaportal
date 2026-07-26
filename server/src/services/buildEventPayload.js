import { Company } from "../models/Company.js";

export const buildEventPayload = async (body, user) => {
  const {
    title,
    description,
    category,
    city,
    venue,
    address,
    isOnline,
    onlineLink,
    startDate,
    endDate,
    price,
    priceLabel,
    capacity,
    unlimitedCapacity,
    company,
    isFree,
  } = body;

  const parsedIsOnline = isOnline === "true";
  const parsedIsFree = isFree === "true";
  const parsedUnlimitedCapacity = unlimitedCapacity === "true";

  let eventCountry = user.country;
  let companyId = null;

  if (company) {
    const existingCompany = await Company.findById(company);

    if (!existingCompany) {
      throw new Error("Company not found");
    }

    if (existingCompany.ownerId.toString() !== user._id.toString()) {
      throw new Error("Not your company");
    }

    companyId = existingCompany._id;
    eventCountry = existingCompany.country;
  }

  return {
    company: companyId,
    country: eventCountry,

    title,
    description,
    category,

    city,
    venue,
    address,

    isOnline: parsedIsOnline,
    onlineLink: parsedIsOnline ? onlineLink : null,

    startDate: new Date(startDate),
    endDate: new Date(endDate),

    price: parsedIsFree ? 0 : Number(price),
    priceLabel: priceLabel?.trim() || "",

    capacity: parsedUnlimitedCapacity ? 0 : Number(capacity),
    unlimitedCapacity: parsedUnlimitedCapacity,
  };
};
