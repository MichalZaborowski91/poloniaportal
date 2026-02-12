import styles from "./MobileMenu.module.scss";
import { AddOfferButton } from "../AddOfferButton/AddOfferButton";
import { LoginButton } from "../LoginButton/LoginButton";
import { RegisterButton } from "../RegisterButton/RegisterButton";

export const MobileMenu = ({ isOpen, onClose, user }) => {
  const handleNavClick = (e) => {
    //CLOSE ONLY IF CLICK => BUTTON OR LINK
    const actionElement = e.target.closest("button, a");

    if (actionElement) {
      onClose();
    }
  };

  return (
    <div
      className={`${styles.mobileMenu} ${isOpen ? styles["mobileMenu--open"] : ""}`}
    >
      <nav className={styles.mobileMenu__navigation} onClick={handleNavClick}>
        <ul className={styles.mobileMenu__list}>
          <li className={styles.mobileMenu__item}>
            <button type="button">Start</button>
          </li>
          <li className={styles.mobileMenu__item}>
            <button type="button">Placówki Dyplomatyczne</button>
          </li>
          <li className={styles.mobileMenu__item}>
            <button type="button">Gazeta</button>
          </li>
          <li className={styles.mobileMenu__item}>
            <button type="button">Katalog Polskich Firm</button>
          </li>
          <li className={styles.mobileMenu__item}>
            <button type="button">Kalendarz Wydarzeń</button>
          </li>
        </ul>

        {!user && (
          <div className={styles.mobileMenu__authButtons}>
            <LoginButton />
            <RegisterButton />
          </div>
        )}

        {user && (
          <div className={styles.mobileMenu__addOffer}>
            <AddOfferButton />
          </div>
        )}
      </nav>
    </div>
  );
};
