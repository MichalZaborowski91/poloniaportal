import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { resetPassword, validateResetToken } from "../../api/auth";
import { routes } from "../../app/routes";
import { useCountry } from "../../app/useCountry";
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
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [passwordMatchOk, setPasswordMatchOk] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [dots, setDots] = useState("");

  const { token } = useParams();
  const navigate = useNavigate();
  const country = useCountry();

  const passwordChecks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
  };

  const passwordValid = Object.values(passwordChecks).every(Boolean);
  const passwordsMatch = password === confirmPassword;

  const canSubmitResetPassword = passwordValid && passwordsMatch && !loading;

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
    if (!confirmPassword) {
      setPasswordMismatch(false);
      setPasswordMatchOk(false);
      return;
    }

    const timeout = setTimeout(() => {
      if (password === confirmPassword) {
        setPasswordMismatch(false);
        setPasswordMatchOk(true);
      } else {
        setPasswordMismatch(true);
        setPasswordMatchOk(false);
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [password, confirmPassword]);

  useEffect(() => {
    if (!successResetPassword) {
      return;
    }

    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 1000);

    return () => clearInterval(interval);
  }, [successResetPassword]);

  const getPasswordStrength = (password) => {
    let score = 0;

    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;

    return score; //0–5
  };

  const passwordStrength = getPasswordStrength(password);

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

                        if (!passwordTouched && value.length > 0) {
                          setPasswordTouched(true);
                        }
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
                  {passwordTouched && (
                    <div>
                      <div className={styles.resetPassword__strength}>
                        <div
                          className={`${styles.resetPassword__strengthBar} ${
                            passwordStrength <= 2
                              ? styles["resetPassword__strengthBar--weak"]
                              : passwordStrength <= 4
                                ? styles["resetPassword__strengthBar--medium"]
                                : styles["resetPassword__strengthBar--strong"]
                          }`}
                          style={{ width: `${(passwordStrength / 5) * 100}%` }}
                        />
                      </div>
                      {passwordTouched && (
                        <p
                          className={
                            passwordMismatch
                              ? styles.resetPassword__passwordError
                              : styles.resetPassword__passwordRulesHead
                          }
                        >
                          {passwordMismatch
                            ? "Hasła muszą być takie same."
                            : "Hasło musi zawierać przynajmniej:"}
                        </p>
                      )}

                      <ul className={styles.resetPassword__passwordRulesList}>
                        <li
                          className={`${styles.resetPassword__passwordRulesItem} ${
                            passwordChecks.length
                              ? styles["resetPassword__passwordRulesItem--ok"]
                              : styles["resetPassword__passwordRulesItem--bad"]
                          }`}
                        >
                          8 znaków
                        </li>
                        <li
                          className={`${styles.resetPassword__passwordRulesItem} ${
                            passwordChecks.uppercase
                              ? styles["resetPassword__passwordRulesItem--ok"]
                              : styles["resetPassword__passwordRulesItem--bad"]
                          }`}
                        >
                          Jedną dużą literę
                        </li>
                        <li
                          className={`${styles.resetPassword__passwordRulesItem} ${
                            passwordChecks.lowercase
                              ? styles["resetPassword__passwordRulesItem--ok"]
                              : styles["resetPassword__passwordRulesItem--bad"]
                          }`}
                        >
                          Jedną małą literę
                        </li>
                        <li
                          className={`${styles.resetPassword__passwordRulesItem} ${
                            passwordChecks.number
                              ? styles["resetPassword__passwordRulesItem--ok"]
                              : styles["resetPassword__passwordRulesItem--bad"]
                          }`}
                        >
                          Jedną cyfrę
                        </li>
                      </ul>
                    </div>
                  )}

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
