import logoPoloniaPortal from "../../assets/poloniaPortal.png";
import Smile from "../../assets/icons/smile.svg?react";
import styles from "../LogoSecondary/LogoSecondary.module.scss";
import { Link } from "react-router-dom";
import { useCountry } from "../../app/useCountry";
import { routes } from "../../app/routes";

export const LogoSecondary = () => {
  const country = useCountry();
  return (
    <Link to={routes.home(country)} className={styles.logoSecondary}>
      <img
        src={logoPoloniaPortal}
        alt="Polonia Portal Logo"
        className={styles.logoSecondary__logo}
      />
      <p className={styles.logoSecondary__logoDescription}>
        Łączymy Polaków na całym świecie{" "}
        <Smile className={styles.logoSecondary__logoIcon} />
      </p>
    </Link>
  );
};
