import { useCountry } from "../../app/useCountry";
import { COUNTRIES_PL } from "../../app/countriesPL";
import { HERO_BY_COUNTRY } from "../../assets/countries/heroes.js";
import { SearchBar } from "../SearchBar/SearchBar.jsx";
import styles from "./Hero.module.scss";
import CountryInfo from "../CountryInfo/CountryInfo.jsx";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import Container from "../Layout/Container";

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
      <div className={styles.overlay}>
        <div className={styles.content}>
          <Container>
            {isDesktop && (
              <div className={styles.countryInfo}>
                <CountryInfo variant="hero" />
              </div>
            )}

            <div className={styles.heroRow}>
              <div className={styles.heroLeft}>
                <h1 className={styles.title}>
                  Polonia w {countryCode.locative}
                </h1>

                <p className={styles.description}>
                  Informacje, ogłoszenia i usługi w jednym miejscu.
                </p>
              </div>

              <div className={styles.heroRight}>
                <SearchBar />
              </div>
            </div>
            <div className={styles.stats}>
              {/* na razie placeholder */}
              <div className={styles.stat}>
                <strong>15 240</strong>
                <span>Ogłoszeń</span>
              </div>

              <div className={styles.stat}>
                <strong>2 130</strong>
                <span>Firm</span>
              </div>

              <div className={styles.stat}>
                <strong>145</strong>
                <span>Wydarzeń</span>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
};
