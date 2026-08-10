import { useEffect, useRef, useState } from "react";
import { requestEmailChange } from "../../api/auth";
import { useCountry } from "../../app/useCountry";
import { Captcha } from "../Captcha/Captcha";
import { useAuth } from "../../hooks/useAuth";
import styles from "../ChangeEmailModal/ChangeEmailModal.module.scss";
import {
  MdLock,
  MdVisibility,
  MdVisibilityOff,
  MdAlternateEmail,
  MdCheckCircle,
  MdClose,
} from "react-icons/md";

export const ChangeEmailModal = ({ onClose }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [captchaToken, setCaptchaToken] = useState(null);
  const [emailMismatch, setEmailMismatch] = useState(false);
  const [sameAsCurrentError, setSameAsCurrentError] = useState(false);

  const captchaRef = useRef(null);
  const country = useCountry();
  const { refreshUser } = useAuth();

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail);

  const clearServerErrors = () => {
    setError("");
    setSameAsCurrentError(false);
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
      setCaptchaToken(null);
    } catch (error) {
      const code = error?.code;

      if (code === "INVALID_PASSWORD") {
        setError("Nieprawidłowe hasło");
        setPasswordError("Nieprawidłowe hasło");
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
      return;
    }

    const timeout = setTimeout(() => {
      setEmailMismatch(newEmail !== confirmEmail);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [newEmail, confirmEmail]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

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
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {success ? (
          <div className={styles.successWrapper}>
            <div className={`${styles.iconWrapper} ${styles.success}`}>
              <MdCheckCircle />
            </div>

            <h1 className={styles.successTitle}>
              Prośba o zmianę email została wysłana
            </h1>

            <p className={styles.message}>
              Link potwierdzający został wysłany na nowy adres email.
            </p>

            <p className={styles.secondaryMessage}>
              Sprawdź skrzynkę i kliknij link, aby zakończyć zmianę.
            </p>

            <button
              type="button"
              onClick={handleClose}
              className={styles.button}
            >
              <MdClose />
              Zamknij
            </button>
          </div>
        ) : (
          <>
            <h2 className={styles.title}>Zmiana email</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              {error && <div className={styles.error}>{error}</div>}

              <div className={styles.inputContainer}>
                <MdLock className={styles.icon} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Aktualne hasło"
                  value={currentPassword}
                  className={`${styles.input}  ${
                    passwordError ? styles.inputError : ""
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
                  className={styles.showPassword}
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Ukryj hasło" : "Pokaż hasło"}
                >
                  {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                </button>
              </div>

              <div className={styles.inputContainer}>
                <MdAlternateEmail className={styles.icon} />

                <input
                  type="email"
                  placeholder="Nowy email"
                  value={newEmail}
                  className={`${styles.input} ${
                    emailMismatch || sameAsCurrentError ? styles.inputError : ""
                  }`}
                  onChange={(e) => {
                    setNewEmail(e.target.value.replace(/\s/g, ""));
                    clearServerErrors();
                  }}
                  required
                />
              </div>

              <div className={styles.inputContainer}>
                <MdAlternateEmail className={styles.icon} />

                <input
                  type="email"
                  placeholder="Potwierdź email"
                  value={confirmEmail}
                  className={`${styles.input} ${
                    emailMismatch || sameAsCurrentError ? styles.inputError : ""
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
              <div className={styles.actions}>
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className={styles.button}
                >
                  <MdCheckCircle />
                  {loading ? "Wysyłanie..." : "Zmień email"}
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
