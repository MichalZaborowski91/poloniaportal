import { COUNTRIES_PL } from "../../app/countriesPL";
import { useCountry } from "../../app/useCountry";
import styles from "../CurrentCountry/CurrentCountry.module.scss";

export const CurrentCountry = () => {
  const country = useCountry();

  const countryCode = COUNTRIES_PL[country];

  return (
    <div className={styles.currentCountry}>
      <p className={styles.currentCountry__name}>
        {countryCode.name}
        <img
          src={countryCode.flag}
          alt={countryCode.name}
          className={styles.currentCountry__flag}
        />
      </p>
    </div>
  );
};
