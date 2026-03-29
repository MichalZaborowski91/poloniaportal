import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCountry } from "../../app/useCountry";
import { COUNTRIES_PL } from "../../app/countriesPL";
import styles from "../CountryDropdown/CountryDropdown.module.scss";
import { BsChevronDown } from "react-icons/bs";

export const CountryDropdown = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const closeTimeout = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();
  const currentCountry = useCountry();

  const pathWithoutCountry = location.pathname.replace(
    `/${currentCountry}`,
    "",
  );

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        closeTimeout.current = setTimeout(() => {
          setOpen(false);
        }, 150);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    return () => clearTimeout(closeTimeout.current);
  }, []);

  const handleChangeCountry = (code) => {
    clearTimeout(closeTimeout.current);
    setOpen(false);
    navigate(`/${code}${pathWithoutCountry}`);
  };

  return (
    <div className={styles.wrapper} ref={ref}>
      <button
        className={styles.button}
        onClick={() => {
          if (!open) {
            clearTimeout(closeTimeout.current);
            setOpen(true);
          } else {
            closeTimeout.current = setTimeout(() => {
              setOpen(false);
            }, 150);
          }
        }}
      >
        <img
          src={`/flags/${COUNTRIES_PL[currentCountry].subdomain}.png`}
          alt={COUNTRIES_PL[currentCountry].name}
        />
        <span>{COUNTRIES_PL[currentCountry].name}</span>
        <BsChevronDown
          size={16}
          className={`${styles.chevron} ${open ? styles.open : ""}`}
        />
      </button>

      {open && (
        <div className={styles.dropdown}>
          {Object.entries(COUNTRIES_PL)
            .sort((a, b) => a[1].name.localeCompare(b[1].name, "pl"))
            .map(([code, country]) => {
              if (code === currentCountry) {
                return null;
              }
              return (
                <div
                  key={code}
                  className={styles.item}
                  onClick={() => handleChangeCountry(code)}
                >
                  <img
                    src={`/flags/${country.subdomain}.png`}
                    alt={country.name}
                  />
                  <span>{country.name}</span>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};
