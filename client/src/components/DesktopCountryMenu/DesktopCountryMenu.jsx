import { BsChevronDown } from "react-icons/bs";
import { useCountry } from "@/app/useCountry";
import { COUNTRIES_PL } from "@/app/countriesPL";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BsGlobeEuropeAfrica } from "react-icons/bs";

import styles from "./DesktopCountryMenu.module.scss";
import { CountryList } from "../CountryList/CountryList";

export const DesktopCountryMenu = () => {
  const [open, setOpen] = useState(false);

  const currentCountry = useCountry();
  const menuRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  const pathWithoutCountry = location.pathname.replace(
    `/${currentCountry}`,
    "",
  );

  const handleChangeCountry = (code) => {
    setOpen(false);
    navigate(`/${code}${pathWithoutCountry}`);
  };

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <>
      {open && (
        <div className={styles.backdrop} onClick={() => setOpen(false)} />
      )}

      <div ref={menuRef} className={styles.countryMenu}>
        <button
          type="button"
          className={styles.trigger}
          onClick={() => setOpen((prev) => !prev)}
        >
          <img
            src={`/flags/${COUNTRIES_PL[currentCountry].subdomain}.png`}
            alt={COUNTRIES_PL[currentCountry].name}
          />

          <span className={styles.label}>
            {COUNTRIES_PL[currentCountry].name}
          </span>

          <BsChevronDown
            className={`${styles.chevron} ${open ? styles.open : ""}`}
          />
        </button>

        {open && (
          <div className={styles.menu}>
            <div className={styles.header}>
              <div className={styles.titleRow}>
                <BsGlobeEuropeAfrica className={styles.globe} />
                <h2 className={styles.title}>Wybierz kraj</h2>
              </div>

              <p className={styles.description}>
                Przeglądaj oferty, firmy i wydarzenia w wybranym kraju.
              </p>
            </div>

            <CountryList
              currentCountry={currentCountry}
              onSelect={handleChangeCountry}
            />
          </div>
        )}
      </div>
    </>
  );
};
