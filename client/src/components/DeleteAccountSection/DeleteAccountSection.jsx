import { useEffect, useState, useCallback, useRef } from "react";
import toast from "react-hot-toast";
import styles from "../DeleteAccountSection/DeleteAccountSection.module.scss";
import { deleteAccount } from "../../api/auth";
import Lock from "../../assets/icons/lock.svg?react";
import Eye from "../../assets/icons/eye.svg?react";
import EyeOff from "../../assets/icons/eye-off.svg?react";
import Cancel from "../../assets/icons/x.svg?react";
import ArrowRightCircle from "../../assets/icons/arrow-right-circle.svg?react";
import CheckCircle from "../../assets/icons/check-circle.svg?react";
import UserDelete from "../../assets/icons/user-x.svg?react";
import HCaptcha from "@hcaptcha/react-hcaptcha";

export const DeleteAccountSection = ({ onDeleted, onClose }) => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("info");
  const [confirmed, setConfirmed] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [shake, setShake] = useState(false);

  const passwordRef = useRef(null);

  const handleDelete = async () => {
    setPasswordError("");
    if (!password.trim()) {
      setPasswordError("Wymagane hasło");
      triggerShake();
      return;
    }

    try {
      setLoading(true);

      await deleteAccount({ password, captchaToken });

      toast.success("Konto zostało usunięte.");

      if (onDeleted) {
        await onDeleted();
      }

      onClose();
    } catch (error) {
      if (error.message?.toLowerCase().includes("password")) {
        setPasswordError("Niewłaściwe hasło");
        triggerShake();
      } else {
        toast.error(error.message || "Nie udało się usunąć konta");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = useCallback(() => {
    setPassword("");
    setStep("info");
    setCaptchaToken(null);
    setConfirmed(false);
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

  return (
    <div className={styles.deleteAccountSection__overlay}>
      <div
        className={styles.deleteAccountSection__modal}
        onClick={(e) => e.stopPropagation()}
      >
        {step === "info" && (
          <div className={styles.deleteAccountSection}>
            <h2 className={styles.deleteAccountSection__title}>
              Usunięcie konta
              <UserDelete />
            </h2>
            <p className={styles.deleteAccountSection__description}>
              Twoje konto zostanie dezaktywowane.
              <br />
              Możesz je odzyskać, logując się ponownie w ciągu{" "}
              <strong>14 dni</strong> od momentu usunięcia.
              <br />
              Po tym czasie konto i wszystkie dane zostaną{" "}
              <u>trwale usunięte</u>.
            </p>
            <p className={styles.deleteAccountSection__greetings}>
              Dziękujemy za korzystanie z naszego serwisu.
            </p>
            <label className={styles.deleteAccountSection__checkbox}>
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                required
              />
              Rozumiem konsekwencje usunięcia konta.
            </label>

            <div className={styles.deleteAccountSection__actions}>
              <button
                className={styles.deleteAccountSection__button}
                onClick={() => setStep("confirm")}
                disabled={!confirmed || loading}
              >
                <ArrowRightCircle />
                Kontynuuj
              </button>

              <button
                type="button"
                onClick={handleClose}
                className={styles.deleteAccountSection__button}
              >
                <Cancel />
                Anuluj
              </button>
            </div>
          </div>
        )}

        {step === "confirm" && (
          <div className={styles.deleteAccountSection}>
            <h2 className={styles.deleteAccountSection__title}>
              Potwierdź usunięcie
            </h2>
            <p className={styles.deleteAccountSection__description}>
              Podaj hasło, aby potwierdzić operację.
            </p>
            {passwordError && (
              <div className={styles.deleteAccountSection__error}>
                {passwordError}
              </div>
            )}
            <div
              className={`${styles.deleteAccountSection__inputContainer} ${shake ? styles.deleteAccountSection__shake : ""}`}
            >
              <Lock className={styles.deleteAccountSection__icon} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Aktualne hasło"
                value={password}
                ref={passwordRef}
                className={`${styles.deleteAccountSection__input}  ${
                  passwordError
                    ? styles["deleteAccountSection__input--error"]
                    : ""
                }`}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (passwordError) setPasswordError("");
                }}
                required
              />
              <button
                type="button"
                className={styles.deleteAccountSection__showPassword}
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Ukryj hasło" : "Pokaż hasło"}
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </button>
            </div>
            <div className={styles.deleteAccountSection__captcha}>
              <HCaptcha
                sitekey={import.meta.env.VITE_HCAPTCHA_SITE_KEY}
                onVerify={(token) => setCaptchaToken(token)}
                onExpire={() => setCaptchaToken(null)}
              />
            </div>
            <div className={styles.deleteAccountSection__actions}>
              <button
                className={styles.deleteAccountSection__button}
                onClick={handleDelete}
                disabled={!password || !captchaToken || loading}
              >
                <CheckCircle />
                {loading ? "Usuwanie..." : "Potwierdź"}
              </button>

              <button
                type="button"
                onClick={handleClose}
                className={styles.deleteAccountSection__button}
              >
                <Cancel />
                Anuluj
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
