import { Link } from "react-router-dom";
import { routes } from "../../app/routes";
import { useCountry } from "../../app/useCountry";

export const AddOfferButton = () => {
  const country = useCountry();
  return <Link to={routes.addOffer(country)}>Dodaj ogłoszenie</Link>;
};
