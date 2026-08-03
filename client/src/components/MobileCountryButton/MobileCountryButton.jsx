import { BsChevronDown } from "react-icons/bs";
import { useCountry } from "@/app/useCountry";
import { COUNTRIES_PL } from "@/app/countriesPL";

import styles from "./MobileCountryButton.module.scss";

export const MobileCountryButton = ({ isOpen, onClick }) => {
  const currentCountry = useCountry();

  return (
    <button type="button" className={styles.trigger} onClick={onClick}>
      <img
        src={`/flags/${COUNTRIES_PL[currentCountry].subdomain}.png`}
        alt={COUNTRIES_PL[currentCountry].name}
      />

      <span className={styles.label}>{COUNTRIES_PL[currentCountry].name}</span>

      <BsChevronDown
        className={`${styles.chevron} ${isOpen ? styles.open : ""}`}
      />
    </button>
  );
};
