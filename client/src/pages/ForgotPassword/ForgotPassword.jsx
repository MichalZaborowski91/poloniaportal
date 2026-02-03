import { useEffect, useState } from "react";
import { requestPasswordReset } from "../../api/auth";
import styles from "../ForgotPassword/ForgotPassword.module.scss";
import { routes } from "../../app/routes";
import { useCountry } from "../../app/useCountry";
import { Link } from "react-router-dom";
import Email from "../../assets/icons/mail.svg?react";
import Send from "../../assets/icons/send.svg?react";
import { useNavigate } from "react-router-dom";
import CloseIcon from "../../assets/icons/x.svg?react";
import CheckSquare from "../../assets/icons/check-square.svg?react";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [countdown, setCountdown] = useState(10);

  const navigate = useNavigate();
  const country = useCountry();
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) {
      return;
    }
    setError(null);
    setLoading(true);

    try {
      await requestPasswordReset({ email });
      setSuccess(true);
    } catch (error) {
      setError("Nie udało się wysłać linku resetującego.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!success) {
      return;
    }

    setCountdown(10);

    const interval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    const timeout = setTimeout(() => {
      navigate(routes.home(country), { replace: true });
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [success, navigate, country]);

  return (
    <div className={styles.forgotPassword}>
      <div className={styles.forgotPassword__content}>
        <div className={styles.forgotPassword__container}>
          {success ? (
            <div className={styles.success}>
              <div className={styles.success__head}>
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
                onClick={() =>
                  navigate(routes.home(country), { replace: true })
                }
              >
                <CloseIcon />
                Zamknij {countdown}
              </button>
            </div>
          ) : (
            <>
              <h2 className={styles.forgotPassword__title}>
                Zapomniałeś hasła ?
              </h2>
              <p className={styles.forgotPassword__description}>
                Wpisz poniżej swój adres email, a my wyślemy Ci link
                umożliwiający zresetowanie hasła.
              </p>
              {error && <p className={styles.forgotPassword__error}>{error}</p>}
              <form onSubmit={handleSubmit}>
                <div className={styles.inputWrapper}>
                  <Email className={styles.inputIcon} />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    className={`${styles.register__input} ${
                      emailError ? styles.inputError : ""
                    }`}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\s/g, "");
                      setEmail(value);

                      if (!emailTouched && value.length > 0) {
                        setEmailTouched(true);
                      }

                      if (emailError) setEmailError(false);
                    }}
                    onBlur={() => {
                      if (emailTouched && email && !emailValid) {
                        setEmailError(true);
                      }
                    }}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className={styles.forgotPassword__submitButton}
                >
                  <Send className={styles.buttonIcon} />
                  {loading ? "Wysyłanie..." : "Kontynuuj"}
                </button>
                <p className={styles.backToLogin}>
                  <Link to={routes.login(country)}>Powrót do logowania</Link>
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
