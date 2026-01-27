import { useParams } from "react-router-dom";

export const DEFAULT_COUNTRY = "ie";
export const SUPPORTED_COUNTRIES = ["ie", "uk", "pl", "de"];

export const useCountry = () => {
  const { country } = useParams();
  return SUPPORTED_COUNTRIES.includes(country) ? country : DEFAULT_COUNTRY;
};
