import { Link } from "react-router-dom";
import { routes } from "../../app/routes";
import { useCountry } from "../../app/useCountry";
import styles from "../LoginButton/LoginButton.module.scss";

export const LoginButton = () => {
  const country = useCountry();
  return (
    <Link to={routes.login(country)} className={styles.loginButton}>
      Zaloguj
    </Link>
  );
};
