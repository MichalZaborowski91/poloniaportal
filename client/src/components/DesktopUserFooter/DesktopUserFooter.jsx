import { LogOutButton } from "../LogOutButton/LogOutButton";
import styles from "./DesktopUserFooter.module.scss";

export const DesktopUserFooter = ({ onClose }) => {
  return (
    <div className={styles.footer}>
      <LogOutButton onLogout={onClose} />
    </div>
  );
};
