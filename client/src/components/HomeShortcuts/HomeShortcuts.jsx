import { useNavigate } from "react-router-dom";
import { useCountry } from "../../app/useCountry";
import styles from "../HomeShortcuts/HomeShortcuts.module.scss";
import Business from "../../assets/icons/business.svg?react";
import Building from "../../assets/icons/home.svg?react";
import Hospital from "../../assets/icons/hospital.svg?react";
import Promotion from "../../assets/icons/megaphone.svg?react";
import Forum from "../../assets/icons/forum.svg?react";
import Calendar from "../../assets/icons/calendar.svg?react";
import Container from "../Layout/Container";

export const HomeShortcuts = () => {
  const navigate = useNavigate();
  const country = useCountry();

  return (
    <div className={styles.wrapper}>
      <Container>
        <div className={styles.container}>
          <div
            className={styles.tile}
            onClick={() => navigate(`/${country}/add-offer`)}
          >
            <Promotion className={styles.icon} />

            <h3 className={styles.title}>Dodaj ogłoszenie</h3>

            <p className={styles.description}>
              Sprzedaj, znajdź pracę lub zaoferuj usługi.
            </p>
          </div>

          <div
            className={styles.tile}
            onClick={() => navigate(`/${country}/companies`)}
          >
            <Business className={styles.icon} />
            <h3 className={styles.title}>Katalog polskich firm</h3>

            <p className={styles.description}>
              Odkrywaj polskich przedsiębiorców w swoim kraju.
            </p>
          </div>

          <div
            className={styles.tile}
            onClick={() => navigate(`/${country}/forum`)}
          >
            <Forum className={styles.icon} />
            <h3 className={styles.title}>Forum</h3>

            <p className={styles.description}>
              Zadawaj pytania i rozmawiaj z Polonią.
            </p>
          </div>

          <div
            className={styles.tile}
            onClick={() => navigate(`/${country}/events`)}
          >
            <Calendar className={styles.icon} />
            <h3 className={styles.title}>Wydarzenia</h3>

            <p className={styles.description}>
              Koncerty, spotkania i imprezy Polonii.
            </p>
          </div>
          <div className={styles.tile}>
            <Building className={styles.icon} />
            <h3 className={styles.title}>Placówki dyplomatyczne</h3>

            <p className={styles.description}>
              Ambasady, konsulaty i pomoc urzędowa.
            </p>
          </div>
          <div className={styles.tile}>
            <Hospital className={styles.icon} />
            <h3 className={styles.title}>Polski lekarz</h3>

            <p className={styles.description}>
              Znajdź lekarzy mówiących po polsku.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};
