import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { resetPassword, validateResetToken } from "../../api/auth";
import { routes } from "../../app/routes";
import { useCountry } from "../../app/useCountry";
import { PasswordStrength } from "../../components/PasswordStrength/PasswordStrength";
import { usePasswordUI } from "../../hooks/usePasswordUI";
import CheckSquare from "../../assets/icons/check-square.svg?react";
import Lock from "../../assets/icons/lock.svg?react";
import Close from "../../assets/icons/x.svg?react";
import Key from "../../assets/icons/key.svg?react";
import Eye from "../../assets/icons/eye.svg?react";
import EyeOff from "../../assets/icons/eye-off.svg?react";
import styles from "../ResetPassword/ResetPassword.module.scss";

export const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successResetPassword, setSuccessResetPassword] = useState(false);
  const [tokenValid, setTokenValid] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [dots, setDots] = useState("");

  const { token } = useParams();
  const navigate = useNavigate();
  const country = useCountry();

  const {
    touched: passwordTouched,
    mismatch: passwordMismatch,
    matchOk: passwordMatchOk,
    checks: passwordChecks,
    strength: passwordStrength,
    valid: passwordValid,
    match: passwordsMatch,
  } = usePasswordUI(password, confirmPassword);

  const canSubmitResetPassword =
    passwordValid && passwordsMatch && confirmPassword.length > 0 && !loading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmitResetPassword) {
      return;
    }

    setError(null);
    setLoading(true);

    try {
      await resetPassword({ token, password });
      setSuccessResetPassword(true);

      //LOGIN PAGE AFTER 3 SEC
      setTimeout(() => {
        navigate(routes.login(country), { replace: true });
      }, 4000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkToken = async () => {
      const valid = await validateResetToken(token);
      setTokenValid(valid); //Dev only true / valid
    };

    checkToken();
  }, [token]);

  useEffect(() => {
    if (!successResetPassword) {
      return;
    }

    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 1000);

    return () => clearInterval(interval);
  }, [successResetPassword]);

  if (tokenValid === null) {
    return (
      <div className={styles.resetPassword}>
        <div className={styles.resetPassword__content}>
          <div className={styles.authPage}>
            <div className={styles.authContent}>
              <div className={styles.resetPassword__container}>
                <p className={styles.resetPassword__description}>
                  Trwa sprawdzanie linku...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!tokenValid) {
    return (
      <div className={styles.resetPassword}>
        <div className={styles.resetPassword__content}>
          <div className={styles.authPage}>
            <div className={styles.authContent}>
              <div className={styles.resetPassword__container}>
                <h2 className={styles.resetPassword__title}>
                  Link wygasł lub jest nieprawidłowy
                </h2>
                <p className={styles.resetPassword__description}>
                  Poproś o nowy link do resetu hasła.
                </p>
                <button
                  type="button"
                  className={styles.resetPassword__submitButton}
                  onClick={() => {
                    navigate(routes.home(country), { replace: true });
                  }}
                >
                  <Close />
                  Zamknij
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.resetPassword}>
      <div className={styles.resetPassword__content}>
        <div className={styles.authPage}>
          <div className={styles.authContent}>
            <div className={styles.resetPassword__container}>
              {successResetPassword ? (
                <div className={styles.resetPassword__headBox}>
                  <h2 className={styles.resetPassword__title}>
                    Hasło zostało zmienione
                    <CheckSquare />
                  </h2>
                </div>
              ) : (
                <h2 className={styles.resetPassword__title}>
                  Ustaw nowe hasło
                </h2>
              )}

              {successResetPassword ? (
                <div className={styles.resetPassword__successContainer}>
                  <p className={styles.resetPassword__successText}>
                    Za chwilę zostaniesz przekierowany na stronę logowania{dots}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {error && (
                    <p className={styles.resetPassword__error}>{error}</p>
                  )}
                  <div className={styles.resetPassword__inputWrapper}>
                    <Lock
                      className={`${styles.resetPassword__lockIcon} ${
                        passwordMismatch
                          ? ""
                          : passwordMatchOk
                            ? styles["resetPassword__lockIcon--success"]
                            : ""
                      }`}
                    />

                    <input
                      className={`${styles.resetPassword__input} ${
                        passwordMismatch
                          ? styles["resetPassword__input--error"]
                          : ""
                      }`}
                      type={showPassword ? "text" : "password"}
                      placeholder="Nowe hasło"
                      value={password}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\s/g, ""); //SPACE DELETE !
                        setPassword(value);
                      }}
                      required
                    />
                    <button
                      type="button"
                      className={styles.resetPassword__showPassword}
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={showPassword ? "Ukryj hasło" : "Pokaż hasło"}
                    >
                      {showPassword ? <Eye /> : <EyeOff />}
                    </button>
                  </div>

                  <div className={styles.resetPassword__inputWrapper}>
                    <Lock
                      className={`${styles.resetPassword__lockIcon} ${
                        passwordMismatch
                          ? ""
                          : passwordMatchOk
                            ? styles["resetPassword__lockIcon--success"]
                            : ""
                      }`}
                    />
                    <input
                      className={`${styles.resetPassword__input} ${
                        passwordMismatch
                          ? styles["resetPassword__input--error"]
                          : ""
                      }`}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Potwierdź hasło"
                      value={confirmPassword}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\s/g, "");
                        setConfirmPassword(value);
                      }}
                      required
                    />

                    <button
                      type="button"
                      className={styles.resetPassword__showPassword}
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      aria-label={
                        showConfirmPassword ? "Ukryj hasło" : "Pokaż hasło"
                      }
                    >
                      {showConfirmPassword ? <Eye /> : <EyeOff />}
                    </button>
                  </div>

                  <PasswordStrength
                    touched={passwordTouched}
                    strength={passwordStrength}
                    mismatch={passwordMismatch}
                    checks={passwordChecks}
                  />

                  <button
                    type="submit"
                    disabled={!canSubmitResetPassword}
                    className={styles.resetPassword__submitButton}
                  >
                    <Key />
                    {loading ? "Zapisywanie..." : "Zmień hasło"}
                  </button>
                  <p className={styles.resetPassword__backToLogin}>
                    <Link
                      to={routes.login(country)}
                      replace={true}
                      className={styles.resetPassword__backToLoginLink}
                    >
                      Powrót do logowania
                    </Link>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
