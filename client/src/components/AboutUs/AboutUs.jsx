import { Link, useLocation } from "react-router-dom";
import { routes } from "../../app/routes";
import { useCountry } from "../../app/useCountry";
import { useEffect } from "react";
import styles from "../AboutUs/AboutUs.module.scss";

export const AboutUs = () => {
  const country = useCountry();
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      if (location.hash === "#whoAreWe") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      if (location.hash) {
        const element = document.getElementById(location.hash.replace("#", ""));

        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        window.scrollTo({ top: 0 });
      }
    }, 0);
  }, [location]);

  return (
    <nav className={styles.aboutUs}>
      <h3 className={styles.aboutUs__title}>O nas:</h3>
      <ul className={styles.aboutUs__list}>
        <li className={styles.aboutUs__item}>
          <Link
            to={`${routes.about(country)}#whoAreWe`}
            className={styles.aboutUs__link}
          >
            Kim jesteśmy
          </Link>
        </li>
        <li className={styles.aboutUs__item}>
          <Link
            to={`${routes.about(country)}#ourMission`}
            className={styles.aboutUs__link}
          >
            Nasza misja
          </Link>
        </li>
        <li className={styles.aboutUs__item}>
          <Link
            to={`${routes.about(country)}#whatWeOffer`}
            className={styles.aboutUs__link}
          >
            Co oferujemy
          </Link>
        </li>
        <li className={styles.aboutUs__item}>
          <Link
            to={`${routes.about(country)}#forWhoItIs`}
            className={styles.aboutUs__link}
          >
            Dla kogo jest portal
          </Link>
        </li>
        <li className={styles.aboutUs__item}>
          <Link
            to={`${routes.about(country)}#whyCreated`}
            className={styles.aboutUs__link}
          >
            Dlaczego powstał portal
          </Link>
        </li>
        <li className={styles.aboutUs__item}>
          <Link
            to={`${routes.about(country)}#ourValues`}
            className={styles.aboutUs__link}
          >
            Nasze wartości
          </Link>
        </li>
        <li className={styles.aboutUs__item}>
          <Link
            to={`${routes.about(country)}#vision`}
            className={styles.aboutUs__link}
          >
            Wizja
          </Link>
        </li>
      </ul>
    </nav>
  );
};
