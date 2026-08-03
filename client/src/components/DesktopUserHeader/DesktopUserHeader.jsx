import { BsPersonCircle } from "react-icons/bs";
import { useAuth } from "../../hooks/useAuth";
import styles from "./DesktopUserHeader.module.scss";

export const DesktopUserHeader = () => {
  const { user } = useAuth();

  if (!user) return null;

  const displayName =
    user.profile?.displayName || user.profile?.firstName || user.email;

  return (
    <div className={styles.header}>
      <div className={styles.nameRow}>
        <BsPersonCircle className={styles.icon} />
        <h3 className={styles.name}>{displayName}</h3>
      </div>

      <p className={styles.email}>{user.email}</p>
    </div>
  );
};
