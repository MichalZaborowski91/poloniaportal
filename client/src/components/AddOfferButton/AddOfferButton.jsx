import { Link } from "react-router-dom";
import { routes } from "../../app/routes";
import { useCountry } from "../../app/useCountry";
import styles from "../AddOfferButton/AddOfferButton.module.scss";

export const AddOfferButton = ({ onClick }) => {
  const country = useCountry();

  return (
    <Link
      to={routes.addOffer(country)}
      className={styles.addOfferButton}
      onClick={onClick}
    >
      Dodaj Ogłoszenie
    </Link>
  );
};
