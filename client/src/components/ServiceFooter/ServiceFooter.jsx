import { Link } from "react-router-dom";
import { routes } from "../../app/routes";
import { useCountry } from "../../app/useCountry";
import styles from "../ServiceFooter/ServiceFooter.module.scss";

export const ServiceFooter = () => {
  const country = useCountry();

  return (
    <nav className={styles.service}>
      <h3 className={styles.service__title}>Serwis:</h3>
      <ul className={styles.service__list}>
        <li className={styles.service__item}>
          <Link to={routes.about(country)} className={styles.service__link}>
            Ogłoszenia
          </Link>
        </li>
        <li className={styles.service__item}>
          <Link to={routes.about(country)} className={styles.service__link}>
            Praca
          </Link>
        </li>
        <li className={styles.service__item}>
          <Link to={routes.about(country)} className={styles.service__link}>
            Mieszkanie
          </Link>
        </li>
        <li className={styles.service__item}>
          <Link to={routes.about(country)} className={styles.service__link}>
            Wydarzenia
          </Link>
        </li>
        <li className={styles.service__item}>
          <Link to={routes.about(country)} className={styles.service__link}>
            Firmy polonijne
          </Link>
        </li>
        <li className={styles.service__item}>
          <Link to={routes.about(country)} className={styles.service__link}>
            Forum
          </Link>
        </li>
      </ul>
    </nav>
  );
};
