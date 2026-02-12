import { Link } from "react-router-dom";
import { routes } from "../../app/routes";
import { useCountry } from "../../app/useCountry";
import styles from "../ContactFooter/ContactFooter.module.scss";

export const ContactFooter = () => {
  const country = useCountry();

  return (
    <nav className={styles.contact}>
      <h3 className={styles.contact__title}>Kontakt:</h3>
      <ul className={styles.contact__list}>
        <li className={styles.contact__item}>
          <Link to={routes.about(country)} className={styles.contact__link}>
            Kontakt
          </Link>
        </li>
        <li className={styles.contact__item}>
          <Link to={routes.about(country)} className={styles.contact__link}>
            Zgłoś problem
          </Link>
        </li>
      </ul>

      <h3 className={styles.contact__title}>Dla firm:</h3>
      <ul className={styles.contact__list}>
        <li className={styles.contact__item}>
          <Link to={routes.about(country)} className={styles.contact__link}>
            Reklama w serwisie
          </Link>
        </li>
        <li className={styles.contact__item}>
          <Link to={routes.about(country)} className={styles.contact__link}>
            Dodaj swoją firmę
          </Link>
        </li>
        <li className={styles.contact__item}>
          <Link to={routes.about(country)} className={styles.contact__link}>
            Współpraca partnerska
          </Link>
        </li>
      </ul>
    </nav>
  );
};
