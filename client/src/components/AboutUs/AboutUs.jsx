import { Link, useLocation } from "react-router-dom";
import { routes } from "../../app/routes";
import { useCountry } from "../../app/useCountry";
import styles from "../AboutUs/AboutUs.module.scss";
import { useEffect } from "react";

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
    <div className={styles.aboutUs}>
      <h3 className={styles.aboutUs__title}>O nas:</h3>
      <Link
        to={`${routes.about(country)}#whoAreWe`}
        className={styles.aboutUs__link}
      >
        Kim jesteśmy
      </Link>
      <Link
        to={`${routes.about(country)}#ourMission`}
        className={styles.aboutUs__link}
      >
        Nasza misja
      </Link>
      <Link
        to={`${routes.about(country)}#whatWeOffer`}
        className={styles.aboutUs__link}
      >
        Co oferujemy
      </Link>
      <Link
        to={`${routes.about(country)}#forWhoItIs`}
        className={styles.aboutUs__link}
      >
        Dla kogo jest portal
      </Link>
      <Link
        to={`${routes.about(country)}#whyCreated`}
        className={styles.aboutUs__link}
      >
        Dlaczego powstał portal
      </Link>
      <Link
        to={`${routes.about(country)}#ourValues`}
        className={styles.aboutUs__link}
      >
        Nasze wartości
      </Link>
      <Link
        to={`${routes.about(country)}#vision`}
        className={styles.aboutUs__link}
      >
        Wizja
      </Link>
    </div>
  );
};
