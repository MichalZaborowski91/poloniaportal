import { useCountry } from "../../app/useCountry";
import { HERO_BY_COUNTRY } from "../../assets/countries/heroes.js";
import styles from "./Hero.module.scss";

export const Hero = () => {
  const country = useCountry();
  const image = HERO_BY_COUNTRY[country];

  return (
    <section
      className={styles.hero}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className={styles.content}>
        <h1>Polonia w {country.toUpperCase()}</h1>
        <p>Ogłoszenia, praca i społeczność</p>
      </div>
    </section>
  );
};
