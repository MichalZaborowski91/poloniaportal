import { MobileMenuSection } from "../MobileMenuSection/MobileMenuSection";
import { LogOutButton } from "../LogOutButton/LogOutButton";
import styles from "../MobileUserFooter/MobileUserFooter.module.scss";

export const MobileUserFooter = ({ onClose }) => {
  return (
    <MobileMenuSection>
      <div className={styles.content}>
        <LogOutButton onLogout={onClose} />
      </div>
    </MobileMenuSection>
  );
};
