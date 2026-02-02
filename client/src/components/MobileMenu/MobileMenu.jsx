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
        <div className={styles.mobileMenu__naviBox}>
          <button type="button">Start</button>
          <button type="button">Placówki Dyplomatyczne</button>
          <button type="button">Gazeta</button>
          <button type="button">Katalog Polskich Firm</button>
          <button type="button">Kalendarz Wydarzeń</button>
        </div>

        {!user && (
          <div className={styles.mobileMenu__wrapper}>
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
