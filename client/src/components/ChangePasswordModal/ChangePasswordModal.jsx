import { useEffect, useRef, useCallback, useState } from "react";
import { changePassword, logout } from "../../api/auth";
import styles from "../ChangePasswordModal/ChangePasswordModal.module.scss";
import Lock from "../../assets/icons/lock.svg?react";
import Eye from "../../assets/icons/eye.svg?react";
import EyeOff from "../../assets/icons/eye-off.svg?react";
import CheckCircle from "../../assets/icons/check-circle.svg?react";
import Cancel from "../../assets/icons/x.svg?react";
import Key from "../../assets/icons/key.svg?react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../app/routes";
import { useCountry } from "../../app/useCountry";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";
import { Captcha } from "../Captcha/Captcha";

export const ChangePasswordModal = ({ onClose }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [passwordMatchOk, setPasswordMatchOk] = useState(false);
  const [shake, setShake] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [sameAsOldError, setSameAsOldError] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);

  const passwordRef = useRef(null);
  const captchaRef = useRef(null);
  const { refreshUser } = useAuth();
  const navigate = useNavigate();
  const country = useCountry();

  const clearServerErrors = () => {
    setError("");
    setSameAsOldError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setError("");
    setSameAsOldError(false);
    if (!currentPassword.trim()) {
      setPasswordError("Wymagane hasło");
      return;
    }

    if (!passwordValid) {
      return setError("Hasło nie spełnia wymagań bezpieczeństwa");
    }
    if (newPassword !== confirmPassword) {
      return setError("Nowe hasła nie są takie same");
    }

    if (!captchaToken) {
      setError("Potwierdź, że nie jesteś robotem");
      return;
    }

    try {
      setLoading(true);

      await changePassword({
        currentPassword: currentPassword.trim(),
        newPassword,
        captchaToken,
      });
      captchaRef.current?.resetCaptcha();
      setSuccess(true);
      setCaptchaToken(null);
      setTimeout(async () => {
        try {
          await logout();
          await refreshUser();
        } catch (err) {
          console.error("Logout after password change failed:", err);
        }

        toast.success("Zaloguj się ponownie.");
        onClose();
        sessionStorage.setItem("passwordChanged", "true");

        navigate(routes.login(country), {
          replace: true,
        });
      }, 1500);
    } catch (error) {
      const code = error?.code;

      if (code === "INVALID_CURRENT_PASSWORD") {
        const msg = "Nieprawidłowe aktualne hasło";
        setError(msg);
        setPasswordError(msg);
        triggerShake();
      } else if (code === "PASSWORD_WEAK") {
        setError("Hasło nie spełnia wymagań bezpieczeństwa");
      } else if (code === "PASSWORD_SAME_AS_OLD") {
        setError("Nowe hasło musi być inne niż poprzednie");
        setSameAsOldError(true);
      } else if (code === "MISSING_FIELDS") {
        setError("Wszystkie pola są wymagane");
      } else if (code === "USER_NOT_FOUND") {
        setError("Użytkownik nie istnieje");
      } else if (code === "CHANGE_PASSWORD_FAILED") {
        setError("Nie udało się zmienić hasła. Spróbuj ponownie.");
      } else if (code === "CAPTCHA_INVALID") {
        setError("Weryfikacja captcha nie powiodła się. Spróbuj ponownie.");
      } else {
        setError("Wystąpił błąd. Spróbuj ponownie.");
      }
      captchaRef.current?.resetCaptcha();
      setCaptchaToken(null);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = useCallback(() => {
    captchaRef.current?.resetCaptcha();
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setError("");
    setSuccess(false);
    setPasswordMismatch(false);
    setPasswordMatchOk(false);
    setPasswordTouched(false);
    onClose();
  }, [onClose]);

  const triggerShake = () => {
    setShake(true);
    passwordRef.current?.focus();
    setTimeout(() => setShake(false), 400);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleClose]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  useEffect(() => {
    if (!confirmPassword) {
      setPasswordMismatch(false);
      setPasswordMatchOk(false);
      return;
    }

    const timeout = setTimeout(() => {
      if (newPassword === confirmPassword) {
        setPasswordMismatch(false);
        setPasswordMatchOk(true);
      } else {
        setPasswordMismatch(true);
        setPasswordMatchOk(false);
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [newPassword, confirmPassword]);

  const passwordChecks = {
    length: newPassword.length >= 8,
    uppercase: /[A-Z]/.test(newPassword),
    lowercase: /[a-z]/.test(newPassword),
    number: /[0-9]/.test(newPassword),
  };

  const getPasswordStrength = (newPassword) => {
    let score = 0;

    if (newPassword.length >= 8) score += 1;
    if (newPassword.length >= 12) score += 1;
    if (/[A-Z]/.test(newPassword)) score += 1;
    if (/[a-z]/.test(newPassword)) score += 1;
    if (/[0-9]/.test(newPassword)) score += 1;

    return score; //0–5
  };
  const passwordValid = Object.values(passwordChecks).every(Boolean);
  const passwordStrength = getPasswordStrength(newPassword);

  return (
    <div className={styles.changePassword__overlay}>
      <div className={styles.changePassword__modal}>
        <h2 className={styles.changePassword__title}>
          Zmiana hasła
          <Key />
        </h2>

        {success ? (
          <div className={styles.changePassword__successText}>
            Hasło zostało zmienione
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.changePassword__form}>
            {error && (
              <div className={styles.changePassword__error}>{error}</div>
            )}
            <div
              className={`${styles.changePassword__inputContainer} ${shake ? styles.changePassword__shake : ""}`}
            >
              <Lock className={styles.changePassword__icon} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Aktualne hasło"
                value={currentPassword}
                ref={passwordRef}
                className={`${styles.changePassword__input}  ${
                  passwordError ? styles["changePassword__input--error"] : ""
                }`}
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                  clearServerErrors();
                  if (passwordError) setPasswordError("");
                }}
                required
              />
              <button
                type="button"
                className={styles.changePassword__showPassword}
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Ukryj hasło" : "Pokaż hasło"}
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </button>
            </div>
            <div className={styles.changePassword__inputContainer}>
              <Lock
                className={`${styles.changePassword__icon} ${
                  sameAsOldError
                    ? styles.iconError
                    : passwordMismatch
                      ? ""
                      : passwordMatchOk
                        ? styles.iconSuccess
                        : ""
                }`}
              />

              <input
                className={`${styles.changePassword__input} ${
                  passwordMismatch ? styles[`changePassword__input--error`] : ""
                }`}
                type={showNewPassword ? "text" : "password"}
                placeholder="Nowe hasło"
                value={newPassword}
                onChange={(e) => {
                  const value = e.target.value.replace(/\s/g, ""); //SPACE DELETE !
                  setNewPassword(value);
                  clearServerErrors();
                  if (!passwordTouched && value.length > 0) {
                    setPasswordTouched(true);
                  }
                }}
                required
              />
              <button
                type="button"
                className={styles.changePassword__showPassword}
                onClick={() => setShowNewPassword((prev) => !prev)}
                aria-label={showNewPassword ? "Ukryj hasło" : "Pokaż hasło"}
              >
                {showNewPassword ? <Eye /> : <EyeOff />}
              </button>
            </div>

            <div className={styles.changePassword__inputContainer}>
              <Lock
                className={`${styles.changePassword__icon} ${
                  sameAsOldError
                    ? styles.iconError
                    : passwordMismatch
                      ? ""
                      : passwordMatchOk
                        ? styles.iconSuccess
                        : ""
                }`}
              />
              <input
                className={`${styles.changePassword__input} ${
                  passwordMismatch ? styles[`changePassword__input--error`] : ""
                }`}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Potwierdź hasło"
                value={confirmPassword}
                onChange={(e) => {
                  const value = e.target.value.replace(/\s/g, ""); //SPACE DELETE !
                  setConfirmPassword(value);
                  clearServerErrors();
                }}
                required
              />

              <button
                type="button"
                className={styles.changePassword__showPassword}
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                aria-label={showConfirmPassword ? "Ukryj hasło" : "Pokaż hasło"}
              >
                {showConfirmPassword ? <Eye /> : <EyeOff />}
              </button>
            </div>

            {passwordTouched && (
              <div>
                <div className={styles.changePassword__strength}>
                  <div
                    className={`${styles.changePassword__strengthBar} ${
                      passwordStrength <= 2
                        ? styles["changePassword__strengthBar--weak"]
                        : passwordStrength <= 4
                          ? styles["changePassword__strengthBar--medium"]
                          : styles["changePassword__strengthBar--strong"]
                    }`}
                    style={{ width: `${(passwordStrength / 5) * 100}%` }}
                  />
                </div>

                <p
                  className={
                    passwordMismatch
                      ? styles.changePassword__passwordError
                      : styles.changePassword__passwordRulesHead
                  }
                >
                  {passwordMismatch
                    ? "Hasła muszą być takie same."
                    : "Hasło musi zawierać przynajmniej:"}
                </p>

                <ul className={styles.changePassword__passwordRulesList}>
                  <li
                    className={`${styles.changePassword__passwordRulesItem} ${
                      passwordChecks.length
                        ? styles["changePassword__passwordRulesItem--ok"]
                        : styles["changePassword__passwordRulesItem--bad"]
                    }`}
                  >
                    8 znaków
                  </li>
                  <li
                    className={`${styles.changePassword__passwordRulesItem} ${
                      passwordChecks.uppercase
                        ? styles["changePassword__passwordRulesItem--ok"]
                        : styles["changePassword__passwordRulesItem--bad"]
                    }`}
                  >
                    Jedną dużą literę
                  </li>
                  <li
                    className={`${styles.changePassword__passwordRulesItem} ${
                      passwordChecks.lowercase
                        ? styles["changePassword__passwordRulesItem--ok"]
                        : styles["changePassword__passwordRulesItem--bad"]
                    }`}
                  >
                    Jedną małą literę
                  </li>
                  <li
                    className={`${styles.changePassword__passwordRulesItem} ${
                      passwordChecks.number
                        ? styles["changePassword__passwordRulesItem--ok"]
                        : styles["changePassword__passwordRulesItem--bad"]
                    }`}
                  >
                    Jedną cyfrę
                  </li>
                </ul>
              </div>
            )}

            <Captcha
              onVerify={setCaptchaToken}
              onExpire={() => setCaptchaToken(null)}
              ref={captchaRef}
            />

            <div className={styles.changePassword__actions}>
              <button
                type="submit"
                className={styles.changePassword__button}
                disabled={
                  !passwordValid ||
                  !currentPassword ||
                  newPassword !== confirmPassword ||
                  !captchaToken ||
                  loading
                }
              >
                <CheckCircle />
                {loading ? "Zapisywanie..." : "Zmień hasło"}
              </button>

              <button
                type="button"
                onClick={handleClose}
                className={styles.changePassword__button}
              >
                <Cancel />
                Anuluj
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
