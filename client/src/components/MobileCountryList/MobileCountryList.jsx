import { COUNTRIES_PL } from "@/app/countriesPL";

import styles from "./MobileCountryList.module.scss";
import { BsChevronRight } from "react-icons/bs";

export const MobileCountryList = ({ currentCountry, onSelect }) => {
  return (
    <ul className={styles.list}>
      {Object.entries(COUNTRIES_PL)
        .sort((a, b) => a[1].name.localeCompare(b[1].name, "pl"))
        .map(([code, country]) => {
          if (code === currentCountry) {
            return null;
          }

          return (
            <li key={code} className={styles.item}>
              <button
                type="button"
                className={styles.button}
                onClick={() => onSelect(code)}
              >
                <span className={styles.left}>
                  <img
                    src={`/flags/${country.subdomain}.png`}
                    alt={country.name}
                    className={styles.flag}
                  />

                  <span>{country.name}</span>
                </span>

                <BsChevronRight className={styles.chevron} />
              </button>
            </li>
          );
        })}
    </ul>
  );
};
