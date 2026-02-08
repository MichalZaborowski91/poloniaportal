import { Link } from "react-router-dom";
import styles from "../AboutSidebar/AboutSidebar.module.scss";

export const AboutSidebar = () => {
  return (
    <div className={styles.aboutSidebar}>
      <h4 className={styles.aboutSidebar__title}>W tej sekcji:</h4>

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

      <Link to="#ourMission" className={styles.aboutSidebar__link}>
        Nasza misja
      </Link>

      <Link to="#whatWeOffer" className={styles.aboutSidebar__link}>
        Co oferujemy
      </Link>

      <Link to="#forWhoItIs" className={styles.aboutSidebar__link}>
        Dla kogo jest portal
      </Link>

      <Link to="#whyCreated" className={styles.aboutSidebar__link}>
        Dlaczego powstał portal
      </Link>

      <Link to="#ourValues" className={styles.aboutSidebar__link}>
        Nasze wartości
      </Link>

      <Link to="#vision" className={styles.aboutSidebar__link}>
        Wizja
      </Link>
    </div>
  );
};
