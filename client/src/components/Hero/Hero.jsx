import { useCountry } from "../../app/useCountry";
import { COUNTRIES_PL } from "../../app/countriesPL";
import { HERO_BY_COUNTRY } from "../../assets/countries/heroes.js";
import { SearchBar } from "../SearchBar/SearchBar.jsx";
import styles from "./Hero.module.scss";
import CountryInfo from "../CountryInfo/CountryInfo.jsx";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export const Hero = () => {
  const country = useCountry();
  const image = HERO_BY_COUNTRY[country];
  const countryCode = COUNTRIES_PL[country];
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <section
      className={styles.hero}
      style={{ backgroundImage: `url(${image})` }}
    >
      {isDesktop && <CountryInfo />}
      <div className={styles.hero__content}>
        <div className={styles.hero__title}>
          <h1 className={styles.hero__head}>
            Polonia w {countryCode.locative}
          </h1>
          <p className={styles.hero__description}>
            Informacje, ogłoszenia i usługi w jednym miejscu.
          </p>
        </div>
        <SearchBar />
      </div>
    </section>
  );
};
