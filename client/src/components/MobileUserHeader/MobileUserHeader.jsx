import { BsPersonCircle } from "react-icons/bs";
import { useAuth } from "../../hooks/useAuth";
import { MobileMenuSection } from "../MobileMenuSection/MobileMenuSection";
import styles from "./MobileUserHeader.module.scss";

export const MobileUserHeader = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  const displayName =
    user.profile?.displayName || user.profile?.firstName || user.email;

  return (
    <MobileMenuSection>
      <div className={styles.content}>
        <div className={styles.nameRow}>
          <BsPersonCircle className={styles.icon} />
          <h3 className={styles.name}>{displayName}</h3>
        </div>

        <p className={styles.email}>{user.email}</p>
      </div>
    </MobileMenuSection>
  );
};
