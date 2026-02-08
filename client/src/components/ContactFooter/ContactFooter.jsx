import { Link } from "react-router-dom";
import { routes } from "../../app/routes";
import { useCountry } from "../../app/useCountry";
import styles from "../ContactFooter/ContactFooter.module.scss";

export const ContactFooter = () => {
  const country = useCountry();

  return (
    <div className={styles.contact}>
      <h3 className={styles.contact__title}>Kontakt:</h3>
      <Link to={routes.about(country)} className={styles.contact__link}>
        Kontakt
      </Link>
      <Link to={routes.about(country)} className={styles.contact__link}>
        Zgłoś problem
      </Link>
      <h3 className={styles.contact__title}>Dla firm:</h3>
      <Link to={routes.about(country)} className={styles.contact__link}>
        Reklama w serwisie
      </Link>
      <Link to={routes.about(country)} className={styles.contact__link}>
        Dodaj swoją firmę
      </Link>
      <Link to={routes.about(country)} className={styles.contact__link}>
        Współpraca partnerska
      </Link>
    </div>
  );
};
