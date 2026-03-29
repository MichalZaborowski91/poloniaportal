import { useNavigate } from "react-router-dom";
import { useCountry } from "../../app/useCountry";
import styles from "../HomeShortcuts/HomeShortcuts.module.scss";
import Business from "../../assets/icons/business.svg?react";
import Promotion from "../../assets/icons/megaphone.svg?react";
import Forum from "../../assets/icons/forum.svg?react";
import Calendar from "../../assets/icons/calendar.svg?react";

export const HomeShortcuts = () => {
  const navigate = useNavigate();
  const country = useCountry();

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div
          className={styles.tile}
          onClick={() => navigate(`/${country}/add-offer`)}
        >
          <Promotion className={styles.icon} />
          Dodaj ogłoszenie
        </div>

        <div
          className={styles.tile}
          onClick={() => navigate(`/${country}/companies`)}
        >
          <Business className={styles.icon} />
          Katalog polskich firm i przedsiębiorców
        </div>

        <div className={styles.tile}>
          <Forum className={styles.icon} />
          Forum
        </div>

        <div className={styles.tile}>
          <Calendar className={styles.icon} />
          Wydarzenia
        </div>
      </div>
    </div>
  );
};
