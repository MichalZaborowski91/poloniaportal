import { useEffect, useState, useCallback, useRef } from "react";
import { deleteAccount } from "../../api/auth";
import { Captcha } from "../Captcha/Captcha";
import toast from "react-hot-toast";
import styles from "../DeleteAccountSection/DeleteAccountSection.module.scss";

import {
  MdLock,
  MdVisibility,
  MdVisibilityOff,
  MdClose,
  MdArrowForward,
  MdDeleteForever,
} from "react-icons/md";

export const DeleteAccountSection = ({ onDeleted, onClose }) => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("info");
  const [confirmed, setConfirmed] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const captchaRef = useRef(null);

  const handleDelete = async () => {
    setPasswordError("");

    if (!password.trim()) {
      setPasswordError("Wymagane hasło");
      return;
    }

    if (!captchaToken) {
      toast.error("Potwierdź captcha");
      return;
    }

    try {
      setLoading(true);

      await deleteAccount({
        password,
        captchaToken,
      });

      captchaRef.current?.resetCaptcha();
      setCaptchaToken(null);

      toast.success("Konto zostało usunięte.");

      if (onDeleted) {
        await onDeleted();
      }

      onClose();
    } catch (error) {
      const code = error?.code;

      if (code === "INVALID_PASSWORD") {
        setPasswordError("Niewłaściwe hasło");

        captchaRef.current?.resetCaptcha();
        setCaptchaToken(null);

        return;
      }

      if (code === "CAPTCHA_INVALID") {
        captchaRef.current?.resetCaptcha();
        setCaptchaToken(null);

        toast.error("Weryfikacja captcha nie powiodła się");

        return;
      }

      toast.error(error.message || "Nie udało się usunąć konta");

      captchaRef.current?.resetCaptcha();
      setCaptchaToken(null);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = useCallback(() => {
    captchaRef.current?.resetCaptcha();

    setPassword("");
    setStep("info");
    setCaptchaToken(null);
    setConfirmed(false);
    setPasswordError("");
    setShowPassword(false);

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
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {step === "info" && (
          <div className={styles.deleteAccount}>
            <h2 className={styles.title}>Usuń konto</h2>

            <p className={styles.description}>
              Twoje konto zostanie dezaktywowane.
              <br />
              Możesz je odzyskać, logując się ponownie w ciągu{" "}
              <strong>14 dni</strong> od momentu usunięcia.
              <br />
              Po tym czasie konto i wszystkie dane zostaną{" "}
              <u>trwale usunięte</u>.
            </p>

            <p className={styles.greetings}>
              Dziękujemy za korzystanie z naszego serwisu.
            </p>

            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
              />
              Rozumiem konsekwencje usunięcia konta.
            </label>

            <div className={styles.actions}>
              <button
                type="button"
                className={styles.button}
                onClick={() => setStep("confirm")}
                disabled={!confirmed || loading}
              >
                <MdArrowForward />
                Kontynuuj
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
          </div>
        )}

        {step === "confirm" && (
          <div className={styles.deleteAccount}>
            <h2 className={styles.title}>Potwierdź usunięcie</h2>

            <p className={styles.description}>
              Podaj hasło, aby potwierdzić operację.
            </p>

            {passwordError && (
              <div className={styles.error}>{passwordError}</div>
            )}

            <div className={styles.inputContainer}>
              <MdLock className={styles.icon} />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Aktualne hasło"
                value={password}
                className={`${styles.input} ${
                  passwordError ? styles.inputError : ""
                }`}
                onChange={(e) => {
                  setPassword(e.target.value);

                  if (passwordError) {
                    setPasswordError("");
                  }
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

            <Captcha
              onVerify={setCaptchaToken}
              onExpire={() => setCaptchaToken(null)}
              ref={captchaRef}
            />

            <div className={styles.actions}>
              <button
                type="button"
                className={`${styles.button} ${styles.deleteButton}`}
                onClick={handleDelete}
                disabled={!password || !captchaToken || loading}
              >
                <MdDeleteForever />

                {loading ? "Usuwanie..." : "Potwierdź usunięcie"}
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
          </div>
        )}
      </div>
    </div>
  );
};
