import { useEffect, useRef, useCallback, useState } from "react";
import { changePassword, logout } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { routes } from "../../app/routes";
import { useCountry } from "../../app/useCountry";
import { useAuth } from "../../hooks/useAuth";
import { Captcha } from "../Captcha/Captcha";
import { PasswordStrength } from "../PasswordStrength/PasswordStrength";
import { usePasswordUI } from "../../hooks/usePasswordUI";
import toast from "react-hot-toast";
import styles from "../ChangePasswordModal/ChangePasswordModal.module.scss";
import {
  MdLock,
  MdVisibility,
  MdVisibilityOff,
  MdCheckCircle,
  MdClose,
} from "react-icons/md";
import { Spinner } from "../Spinner/Spinner";

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
    setPasswordError("");
  };

  const {
    touched: passwordTouched,
    mismatch: passwordMismatch,
    checks: passwordChecks,
    strength: passwordStrength,
    valid: passwordValid,
    match: passwordsMatch,
  } = usePasswordUI(newPassword, confirmPassword);

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
    if (!passwordsMatch) {
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
      }, 5000);
    } catch (error) {
      const code = error?.code;

      if (code === "INVALID_CURRENT_PASSWORD") {
        const msg = "Nieprawidłowe aktualne hasło";
        setError(msg);
        setPasswordError(msg);
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

  const handleSuccessClose = async () => {
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
  };

  const handleClose = useCallback(() => {
    captchaRef.current?.resetCaptcha();
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setError("");
    setCaptchaToken(null);
    setSameAsOldError(false);
    setPasswordError("");
    setSuccess(false);
    onClose();
  }, [onClose]);

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

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {success ? (
          <div className={styles.successWrapper}>
            <div className={`${styles.iconWrapper} ${styles.success}`}>
              <MdCheckCircle />
            </div>

            <h1 className={styles.successTitle}>Hasło zostało zmienione</h1>

            <p className={styles.message}>
              Twoje hasło zostało pomyślnie zmienione.
            </p>

            <p className={styles.secondaryMessage}>
              Ze względów bezpieczeństwa wszystkie aktywne sesje zostały
              zakończone.
            </p>

            <button
              type="button"
              onClick={handleSuccessClose}
              className={styles.button}
            >
              <MdClose />
              Zamknij
            </button>

            <p className={styles.redirect}>
              Za chwilę zostaniesz przekierowany na stronę logowania...
            </p>
          </div>
        ) : (
          <>
            <h2 className={styles.title}>Zmiana hasła</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              {error && <div className={styles.error}>{error}</div>}
              <div className={styles.inputContainer}>
                <MdLock className={styles.icon} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Aktualne hasło"
                  value={currentPassword}
                  ref={passwordRef}
                  className={`${styles.input}  ${
                    passwordError ? styles.inputError : ""
                  }`}
                  onChange={(e) => {
                    setCurrentPassword(e.target.value);
                    clearServerErrors();
                  }}
                  required
                />
                <button
                  type="button"
                  className={styles.showPassword}
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Ukryj hasło" : "Pokaż hasło"}
                >
                  {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                </button>
              </div>
              <div className={styles.inputContainer}>
                <MdLock className={styles.icon} />

                <input
                  className={`${styles.input} ${
                    passwordMismatch || sameAsOldError ? styles.inputError : ""
                  }`}
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Nowe hasło"
                  value={newPassword}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\s/g, ""); //SPACE DELETE !
                    setNewPassword(value);
                    clearServerErrors();
                  }}
                  required
                />
                <button
                  type="button"
                  className={styles.showPassword}
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  aria-label={showNewPassword ? "Ukryj hasło" : "Pokaż hasło"}
                >
                  {showNewPassword ? <MdVisibility /> : <MdVisibilityOff />}
                </button>
              </div>

              <div className={styles.inputContainer}>
                <MdLock className={styles.icon} />
                <input
                  className={`${styles.input} ${
                    passwordMismatch || sameAsOldError ? styles.inputError : ""
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
                  className={styles.showPassword}
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  aria-label={
                    showConfirmPassword ? "Ukryj hasło" : "Pokaż hasło"
                  }
                >
                  {showConfirmPassword ? <MdVisibility /> : <MdVisibilityOff />}
                </button>
              </div>

              <PasswordStrength
                touched={passwordTouched}
                strength={passwordStrength}
                mismatch={passwordMismatch}
                checks={passwordChecks}
                variant="modal"
              />

              <Captcha
                onVerify={setCaptchaToken}
                onExpire={() => setCaptchaToken(null)}
                ref={captchaRef}
              />

              <div className={styles.actions}>
                <button
                  type="submit"
                  className={styles.button}
                  disabled={
                    !passwordValid ||
                    !currentPassword ||
                    !passwordsMatch ||
                    !captchaToken ||
                    loading
                  }
                >
                  {loading ? <Spinner /> : <MdCheckCircle />}
                  {loading ? "Zapisywanie..." : "Zmień hasło"}
                </button>

                <button
                  type="button"
                  onClick={handleClose}
                  className={styles.button}
                >
                  <MdClose />
                  Anuluj
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
