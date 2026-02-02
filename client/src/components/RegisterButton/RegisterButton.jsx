import { Link } from "react-router-dom";
import { routes } from "../../app/routes";
import { useCountry } from "../../app/useCountry";
import styles from "../RegisterButton/RegisterButton.module.scss";

export const RegisterButton = () => {
  const country = useCountry();
  return (
    <Link to={routes.register(country)} className={styles.registerButton}>
      Rejestracja
    </Link>
  );
};
