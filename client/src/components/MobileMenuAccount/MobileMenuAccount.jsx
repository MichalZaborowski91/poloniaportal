import { routes } from "@/app/routes";
import styles from "./MobileMenuAccount.module.scss";
import { useCountry } from "@/app/useCountry";
import { Link } from "react-router-dom";

export const MobileMenuAccount = () => {
  const country = useCountry();
  return (
    <section className={styles.account}>
      <h2 className={styles.title}>Konto</h2>

      <div className={styles.content}>
        <Link to={routes.login(country)} className={styles.loginLink}>
          Zaloguj się
        </Link>

        <p className={styles.text}>Nie masz jeszcze konta?</p>

        <Link to={routes.register(country)} className={styles.registerLink}>
          Rejestracja
        </Link>
      </div>
    </section>
  );
};
