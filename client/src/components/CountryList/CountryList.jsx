import { COUNTRIES_PL } from "@/app/countriesPL";
import styles from "../CountryList/CountryList.module.scss";

export const CountryList = ({ currentCountry, onSelect }) => {
  return (
    <div className={styles.grid}>
      {Object.entries(COUNTRIES_PL)
        .sort((a, b) => a[1].name.localeCompare(b[1].name, "pl"))
        .map(([code, country]) => {
          if (code === currentCountry) {
            return null;
          }

          return (
            <button
              key={code}
              type="button"
              className={styles.item}
              onClick={() => onSelect(code)}
            >
              <span className={styles.left}>
                <img
                  src={`/flags/${country.subdomain}.png`}
                  alt={country.name}
                  className={styles.flag}
                />

                <span className={styles.label}>{country.name}</span>
              </span>
            </button>
          );
        })}
    </div>
  );
};
