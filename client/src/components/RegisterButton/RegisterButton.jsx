import { Link } from "react-router-dom";
import { routes } from "../../app/routes";
import { useCountry } from "../../app/useCountry";
import styles from "../RegisterButton/RegisterButton.module.scss";

export const RegisterButton = ({ variant }) => {
  const country = useCountry();
  return (
    <Link
      to={routes.register(country)}
      className={`${styles.registerButton} ${
        variant === "footer" ? styles.registerInFooter : ""
      }`}
    >
      Rejestracja
    </Link>
  );
};
