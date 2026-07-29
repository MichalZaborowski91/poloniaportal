import styles from "./MobileMenu.module.scss";
import { MobileMenuAccount } from "../MobileMenuAccount/MobileMenuAccount";
import { MobileMenuNavigation } from "../MobileMenuNavigation/MobileMenuNavigation";

export const MobileMenu = ({ isOpen, onClose }) => {
  return (
    <aside
      onClick={(e) => e.stopPropagation()}
      id="mobile-navigation"
      className={`${styles.mobileMenu} ${isOpen ? styles.open : ""}`}
    >
      <div className={styles.content}>
        <MobileMenuAccount />

        <MobileMenuNavigation onNavigate={onClose} isMenuOpen={isOpen} />
      </div>
    </aside>
  );
};
