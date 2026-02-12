import { routes } from "../../app/routes";
import styles from "../ResetPasswordSuccess/ResetPasswordSuccess.module.scss";
import CloseIcon from "../../assets/icons/x.svg?react";
import CheckSquare from "../../assets/icons/check-square.svg?react";
import { useNavigate } from "react-router-dom";
import { useCountry } from "../../app/useCountry";
import { useEffect, useState } from "react";

export const ResetPasswordSuccess = () => {
  const [countdown, setCountdown] = useState(10);

  const country = useCountry();
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (countdown <= 0) {
      navigate(routes.home(country), { replace: true });
    }
  }, [countdown, navigate, country]);

  return (
    <div className={styles.success}>
      <div className={styles.success__headBox}>
        <h2 className={styles.success__title}>Link wysłany</h2>
        <CheckSquare className={styles.success__icon} />
      </div>

      <p className={styles.success__description} aria-live="polite">
        Jeśli konto istnieje, wysłaliśmy link do resetu hasła.
        <br />
        Sprawdź swoją skrzynkę email.
      </p>

      <button
        className={styles.success__button}
        disabled={countdown === 0}
        onClick={() => navigate(routes.home(country), { replace: true })}
      >
        <CloseIcon />
        Zamknij {countdown}
      </button>
    </div>
  );
};
