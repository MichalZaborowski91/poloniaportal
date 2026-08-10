import { useEffect, useRef, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { confirmEmailChange } from "../../api/auth";
import { useCountry } from "../../app/useCountry";
import { routes } from "../../app/routes";

import {
  MdCheckCircle,
  MdError,
  MdHourglassEmpty,
  MdLogin,
} from "react-icons/md";

import styles from "./ConfirmEmailChange.module.scss";

export const ConfirmEmailChange = () => {
  const [status, setStatus] = useState("loading");
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();
  const country = useCountry();

  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) {
      return;
    }

    hasRun.current = true;

    const token = searchParams.get("token");

    const verify = async () => {
      if (!token) {
        setStatus("error");
        return;
      }

      try {
        await confirmEmailChange(token);
        setStatus("success");

        setTimeout(() => {
          navigate(routes.login(country), { replace: true });
        }, 5000);
      } catch (err) {
        setStatus("error");
        console.error(err);
      }
    };

    verify();
  }, [searchParams, navigate, country]);

  const handleLogin = () => {
    navigate(routes.login(country), { replace: true });
  };

  if (status === "loading") {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.iconWrapper}>
            <MdHourglassEmpty className={styles.loadingIcon} />
          </div>

          <h1 className={styles.title}>Potwierdzanie zmiany email</h1>

          <p className={styles.message}>
            Trwa potwierdzanie zmiany Twojego adresu email...
          </p>
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={`${styles.iconWrapper} ${styles.success}`}>
            <MdCheckCircle />
          </div>

          <h1 className={styles.title}>Email został zmieniony</h1>

          <p className={styles.message}>
            Twój adres email został pomyślnie zmieniony.
          </p>

          <p className={styles.secondaryMessage}>
            Ze względów bezpieczeństwa wszystkie aktywne sesje zostały
            zakończone.
          </p>

          <button type="button" className={styles.button} onClick={handleLogin}>
            <MdLogin />
            Przejdź do logowania
          </button>

          <p className={styles.redirect}>
            Za chwilę zostaniesz przekierowany na stronę logowania...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={`${styles.iconWrapper} ${styles.error}`}>
          <MdError />
        </div>

        <h1 className={styles.title}>Nie udało się zmienić email</h1>

        <p className={styles.message}>Link jest nieprawidłowy lub wygasł.</p>

        <p className={styles.secondaryMessage}>
          Prośba o zmianę adresu email mogła już wygasnąć albo została wcześniej
          wykorzystana.
        </p>

        <button type="button" className={styles.button} onClick={handleLogin}>
          <MdLogin />
          Przejdź do logowania
        </button>
      </div>
    </div>
  );
};
