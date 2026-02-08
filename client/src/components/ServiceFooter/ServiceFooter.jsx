import { Link } from "react-router-dom";
import { routes } from "../../app/routes";
import { useCountry } from "../../app/useCountry";
import styles from "../ServiceFooter/ServiceFooter.module.scss";

export const ServiceFooter = () => {
  const country = useCountry();

  return (
    <div className={styles.service}>
      <h3 className={styles.service__title}>Serwis:</h3>
      <Link to={routes.about(country)} className={styles.service__link}>
        Ogłoszenia
      </Link>
      <Link to={routes.about(country)} className={styles.service__link}>
        Praca
      </Link>
      <Link to={routes.about(country)} className={styles.service__link}>
        Mieszkanie
      </Link>
      <Link to={routes.about(country)} className={styles.service__link}>
        Wydarzenia
      </Link>
      <Link to={routes.about(country)} className={styles.service__link}>
        Firmy polonijne
      </Link>
      <Link to={routes.about(country)} className={styles.service__link}>
        Forum
      </Link>
    </div>
  );
};
