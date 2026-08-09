import { useAuth } from "../../hooks/useAuth";
import { MdCheckCircle, MdError } from "react-icons/md";
import styles from "./VerifyEmailMessage.module.scss";

export const VerifyEmailMessage = ({ showWhenVerified = false }) => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  if (user.emailVerified && !showWhenVerified) {
    return null;
  }

  return (
    <div>
      {user.emailVerified ? (
        <p className={`${styles.message} ${styles.verified}`}>
          <MdCheckCircle />
          Email zweryfikowany
        </p>
      ) : (
        <p className={`${styles.message} ${styles.notVerified}`}>
          <MdError />
          Email niezweryfikowany
        </p>
      )}
    </div>
  );
};
