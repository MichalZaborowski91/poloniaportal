import { useParams } from "react-router-dom";

export const DEFAULT_COUNTRY = "ie";
export const SUPPORTED_COUNTRIES = [
  "ie",
  "uk",
  "de",
  "es",
  "fr",
  "it",
  "nl",
  "no",
  "se",
];

export const useCountry = () => {
  const { country } = useParams();
  return SUPPORTED_COUNTRIES.includes(country) ? country : DEFAULT_COUNTRY;
};
