import { Link } from "react-router-dom";
import { useCountry } from "@/app/useCountry";
import { routes } from "@/app/routes";
import styles from "./DesktopAccountContent.module.scss";

export const DesktopAccountContent = ({ onNavigate }) => {
  const country = useCountry();

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Konto</h2>

      <div className={styles.content}>
        <Link
          to={routes.login(country)}
          className={styles.loginLink}
          onClick={onNavigate}
        >
          Zaloguj się
        </Link>

        <p className={styles.text}>Nie masz jeszcze konta?</p>

        <Link
          to={routes.register(country)}
          className={styles.registerLink}
          onClick={onNavigate}
        >
          Rejestracja
        </Link>
      </div>
    </div>
  );
};
