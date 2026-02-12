import { Link } from "react-router-dom";
import styles from "../AboutSidebar/AboutSidebar.module.scss";

export const AboutSidebar = () => {
  return (
    <nav className={styles.aboutSidebar}>
      <h4 className={styles.aboutSidebar__title}>W tej sekcji:</h4>
      <ul className={styles.aboutSidebar__list}>
        <li className={styles.aboutSidebar__item}>
          <Link
            to="#whoAreWe"
            className={styles.aboutSidebar__link}
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              window.location.hash = "whoAreWe";
            }}
          >
            Kim jesteśmy
          </Link>
        </li>
        <li className={styles.aboutSidebar__item}>
          <Link to="#ourMission" className={styles.aboutSidebar__link}>
            Nasza misja
          </Link>
        </li>
        <li className={styles.aboutSidebar__item}>
          <Link to="#whatWeOffer" className={styles.aboutSidebar__link}>
            Co oferujemy
          </Link>
        </li>
        <li className={styles.aboutSidebar__item}>
          <Link to="#forWhoItIs" className={styles.aboutSidebar__link}>
            Dla kogo jest portal
          </Link>
        </li>
        <li className={styles.aboutSidebar__item}>
          <Link to="#whyCreated" className={styles.aboutSidebar__link}>
            Dlaczego powstał portal
          </Link>
        </li>
        <li className={styles.aboutSidebar__item}>
          <Link to="#ourValues" className={styles.aboutSidebar__link}>
            Nasze wartości
          </Link>
        </li>
        <li className={styles.aboutSidebar__item}>
          <Link to="#vision" className={styles.aboutSidebar__link}>
            Wizja
          </Link>
        </li>
      </ul>
    </nav>
  );
};
