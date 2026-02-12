import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./CountrySwitcher.module.scss";
import Globe from "../../assets/icons/globe.svg?react";
import Close from "../../assets/icons/x.svg?react";
import { COUNTRIES_PL } from "../../assets/countries/countriesPL";
import { WorldMap } from "../WorldMap/WorldMap";

export const CountrySwitcher = ({ currentCountry }) => {
  const [openModal, setOpenModal] = useState(false);

  const location = useLocation();

  const pathWithoutCountry = location.pathname.replace(
    `/${currentCountry}`,
    "",
  );

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    if (!openModal) return;

    document.body.style.overflow = "hidden";

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setOpenModal(false);
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [openModal]);

  return (
    <div className={styles.switcher}>
      <div>
        <h3 className={styles.switcher__title}>Przełącz się do:</h3>
        <Globe
          className={styles.switcher__globeIcon}
          onClick={handleOpenModal}
          aria-label="Zmień kraj"
        />
      </div>

      {openModal && (
        <div className={styles.switcher__overlay}>
          <div
            className={styles.switcher__modal}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.switcher__closeContainer}>
              <Close
                className={styles.switcher__closeIcon}
                onClick={handleCloseModal}
                aria-label="Zamknij"
              />
            </div>
            <div className={styles.switcher__mapContainer}>
              <WorldMap />
            </div>

            <ul className={styles.switcher__list}>
              {Object.entries(COUNTRIES_PL)
                .sort((a, b) => a[1].name.localeCompare(b[1].name, "pl"))
                .map(([code, country]) => {
                  if (code === currentCountry) {
                    return null;
                  }

                  return (
                    <li key={code} className={styles.switcher__item}>
                      <Link
                        to={`/${code}${pathWithoutCountry}`}
                        className={styles.switcher__link}
                        onClick={handleCloseModal}
                      >
                        <img
                          src={`/flags/${country.subdomain}.png`}
                          alt={country.name}
                          className={styles.switcher__flag}
                        />
                        {country.name}
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
