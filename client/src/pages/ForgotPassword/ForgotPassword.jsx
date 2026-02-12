import { useState, useRef } from "react";
import { requestPasswordReset } from "../../api/auth";
import styles from "../ForgotPassword/ForgotPassword.module.scss";
import { routes } from "../../app/routes";
import { useCountry } from "../../app/useCountry";
import { Link } from "react-router-dom";
import Email from "../../assets/icons/mail.svg?react";
import Send from "../../assets/icons/send.svg?react";
import { ResetPasswordSuccess } from "../../components/ResetPasswordSuccess/ResetPasswordSuccess";
import HCaptcha from "@hcaptcha/react-hcaptcha";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);

  const country = useCountry();
  const captchaRef = useRef(null);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const canSubmitForgotPassword = emailValid && !loading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setError(null);
    setLoading(true);

    try {
      if (!captchaToken) {
        setError("Potwierdź captcha.");
        setLoading(false);
        return;
      }

      await requestPasswordReset({ email, captchaToken, country });

      captchaRef.current?.resetCaptcha();
      setCaptchaToken(null);

      setSuccess(true);
    } catch (error) {
      setError("Nie udało się wysłać linku resetującego.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.forgotPassword}>
      <div className={styles.forgotPassword__container}>
        <div className={styles.authPage}>
          <div className={styles.authContent}>
            <div className={styles.forgotPassword__content}>
              {success ? (
                <ResetPasswordSuccess />
              ) : (
                <>
                  <h2 className={styles.forgotPassword__title}>
                    Zapomniałeś hasła ?
                  </h2>
                  <p className={styles.forgotPassword__description}>
                    Wpisz poniżej swój adres email, a my wyślemy Ci link
                    umożliwiający zresetowanie hasła.
                  </p>
                  {error && (
                    <p className={styles.forgotPassword__error}>{error}</p>
                  )}
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
                    <div className={styles.captchaWrapper}>
                      <HCaptcha
                        sitekey={import.meta.env.VITE_HCAPTCHA_SITE_KEY}
                        onVerify={(token) => setCaptchaToken(token)}
                        ref={captchaRef}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={!canSubmitForgotPassword}
                      className={styles.forgotPassword__submitButton}
                    >
                      <Send />
                      {loading ? "Wysyłanie..." : "Kontynuuj"}
                    </button>
                    <p className={styles.backToLogin}>
                      <Link to={routes.login(country)}>
                        Powrót do logowania
                      </Link>
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
