import { useEffect, useRef, useState } from "react";
import { requestEmailChange } from "../../api/auth";
import { useCountry } from "../../app/useCountry";
import { Captcha } from "../Captcha/Captcha";
import { useAuth } from "../../hooks/useAuth";
import styles from "../ChangeEmailModal/ChangeEmailModal.module.scss";
import Lock from "../../assets/icons/lock.svg?react";
import Eye from "../../assets/icons/eye.svg?react";
import EyeOff from "../../assets/icons/eye-off.svg?react";
import AtSign from "../../assets/icons/at-sign.svg?react";
import CheckCircle from "../../assets/icons/check-circle.svg?react";
import Cancel from "../../assets/icons/x.svg?react";
import toast from "react-hot-toast";

export const ChangeEmailModal = ({ onClose }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [shake, setShake] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [captchaToken, setCaptchaToken] = useState(null);
  const [emailMismatch, setEmailMismatch] = useState(false);
  const [emailMatchOk, setEmailMatchOk] = useState(false);
  const [sameAsCurrentError, setSameAsCurrentError] = useState(false);

  const { refreshUser } = useAuth();
  const passwordRef = useRef(null);
  const captchaRef = useRef(null);
  const country = useCountry();

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail);

  const clearServerErrors = () => {
    setError("");
    setSameAsCurrentError(false);
  };

  const triggerShake = () => {
    setShake(true);
    passwordRef.current?.focus();
    setTimeout(() => setShake(false), 400);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setError("");

    if (!currentPassword.trim()) {
      setError("Podaj aktualne hasło");
      return;
    }

    if (!emailValid) {
      setError("Nieprawidłowy adres email");
      return;
    }

    if (newEmail !== confirmEmail) {
      setError("Adresy email nie są takie same");
      return;
    }

    if (!captchaToken) {
      setError("Potwierdź, że nie jesteś robotem");
      return;
    }

    try {
      setLoading(true);

      await requestEmailChange({
        currentPassword: currentPassword.trim(),
        newEmail,
        country,
        captchaToken,
      });
      await refreshUser();
      captchaRef.current?.resetCaptcha();
      setSuccess(true);
      toast.success("Sprawdź skrzynkę email, aby potwierdzić zmianę");
      setCaptchaToken(null);
    } catch (error) {
      const code = error?.code;

      if (code === "INVALID_PASSWORD") {
        setError("Nieprawidłowe hasło");
        setPasswordError("Nieprawidłowe hasło");
        triggerShake();
      } else if (code === "EMAIL_IN_USE") {
        setError("Ten email jest już zajęty");
      } else if (code === "EMAIL_SAME_AS_CURRENT") {
        setError("Nowy email jest taki sam jak obecny");
        setSameAsCurrentError(true);
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

  const canSubmit =
    currentPassword &&
    captchaToken &&
    emailValid &&
    newEmail === confirmEmail &&
    !loading;

  const handleClose = () => {
    captchaRef.current?.resetCaptcha();
    setCurrentPassword("");
    setNewEmail("");
    setConfirmEmail("");
    setError("");
    setPasswordError("");
    setSuccess(false);
    onClose();
  };

  useEffect(() => {
    if (!confirmEmail) {
      setEmailMismatch(false);
      setEmailMatchOk(false);
      return;
    }

    const timeout = setTimeout(() => {
      if (newEmail === confirmEmail) {
        setEmailMismatch(false);
        setEmailMatchOk(true);
      } else {
        setEmailMismatch(true);
        setEmailMatchOk(false);
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [newEmail, confirmEmail]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.changeEmail__overlay}>
      <div className={styles.changeEmail__modal}>
        <h2 className={styles.changeEmail__title}>
          Zmiana email
          <AtSign />
        </h2>

        {success ? (
          <div className={styles.changeEmail__successWrapper}>
            <div className={styles.changeEmail__success}>
              Link potwierdzający został wysłany na nowy adres email.
              <br />
              Sprawdź skrzynkę i kliknij link, aby zakończyć zmianę.
            </div>

            <button
              type="button"
              onClick={handleClose}
              className={styles.changeEmail__button}
            >
              <Cancel />
              Zamknij
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && <div className={styles.changeEmail__error}>{error}</div>}

            <div
              className={`${styles.changeEmail__inputContainer} ${shake ? styles.changeEmail__shake : ""}`}
            >
              <Lock className={styles.changeEmail__icon} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Aktualne hasło"
                value={currentPassword}
                ref={passwordRef}
                className={`${styles.changeEmail__input}  ${
                  passwordError ? styles["changeEmail__input--error"] : ""
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
                className={styles.changeEmail__showPassword}
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Ukryj hasło" : "Pokaż hasło"}
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </button>
            </div>

            <div className={styles.changeEmail__inputContainer}>
              <AtSign
                className={`${styles.changeEmail__icon} ${
                  sameAsCurrentError
                    ? styles.iconError
                    : emailMismatch
                      ? ""
                      : emailMatchOk
                        ? styles.iconSuccess
                        : ""
                }`}
              />

              <input
                type="email"
                placeholder="Nowy email"
                value={newEmail}
                className={`${styles.changeEmail__input} ${
                  emailMismatch ? styles["changeEmail__input--error"] : ""
                }`}
                onChange={(e) => {
                  setNewEmail(e.target.value.replace(/\s/g, ""));
                  clearServerErrors();
                }}
                required
              />
            </div>

            <div className={styles.changeEmail__inputContainer}>
              <AtSign
                className={`${styles.changeEmail__icon} ${
                  sameAsCurrentError
                    ? styles.iconError
                    : emailMismatch
                      ? ""
                      : emailMatchOk
                        ? styles.iconSuccess
                        : ""
                }`}
              />

              <input
                type="email"
                placeholder="Potwierdź email"
                value={confirmEmail}
                className={`${styles.changeEmail__input} ${
                  emailMismatch ? styles["changeEmail__input--error"] : ""
                }`}
                onChange={(e) => {
                  setConfirmEmail(e.target.value.replace(/\s/g, ""));
                  clearServerErrors();
                }}
                required
              />
            </div>
            <Captcha
              onVerify={setCaptchaToken}
              onExpire={() => setCaptchaToken(null)}
              ref={captchaRef}
            />
            <div className={styles.changeEmail__actions}>
              <button
                type="submit"
                disabled={!canSubmit}
                className={styles.changeEmail__button}
              >
                <CheckCircle />
                {loading ? "Wysyłanie..." : "Zmień email"}
              </button>

              <button
                type="button"
                onClick={handleClose}
                className={styles.changeEmail__button}
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
