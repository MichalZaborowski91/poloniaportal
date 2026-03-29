import { useCountry } from "../../app/useCountry";
import styles from "./TopAdBanner.module.scss";

const ADS = {
  ie: null,
  de: null,
  es: null,
};

export const TopAdBanner = () => {
  const country = useCountry();

  const ad = ADS[country];

  return (
    <div className={styles.wrapper}>
      {ad ? (
        <a
          href={ad.link}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.banner}
        >
          <img src={ad.image} alt="Reklama" />
        </a>
      ) : (
        <div className={styles.placeholder}>
          <p>Miejsce na Twoją reklamę</p>
          <span>Zostań partnerem Polonia Portal</span>
        </div>
      )}
    </div>
  );
};
