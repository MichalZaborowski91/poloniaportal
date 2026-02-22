import { useEffect, useRef, useState } from "react";
import { register } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { useCountry } from "../../app/useCountry";
import { routes } from "../../app/routes";
import { Captcha } from "../../components/Captcha/Captcha";
import { PasswordStrength } from "../../components/PasswordStrength/PasswordStrength";
import { usePasswordUI } from "../../hooks/usePasswordUI";
import styles from "../Register/Register.module.scss";
import Email from "../../assets/icons/mail.svg?react";
import Lock from "../../assets/icons/lock.svg?react";
import Eye from "../../assets/icons/eye.svg?react";
import EyeOff from "../../assets/icons/eye-off.svg?react";
import LogIn from "../../assets/icons/log-in.svg?react";
import UserPlus from "../../assets/icons/user-plus.svg?react";
import { HcaptchaBadge } from "../../components/HcaptchaBadge/HcaptchaBadge";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successRegister, setSuccessRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [emailValidOk, setEmailValidOk] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [company, setCompany] = useState("");
  const [requireCaptcha, setRequireCaptcha] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  //TIMESTAMP - ONLY ONCE
  const [timeStamp] = useState(() => Date.now());

  const navigate = useNavigate();
  const country = useCountry();
  const captchaRef = useRef(null);

  //VALIDATION
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const {
    touched: passwordTouched,
    mismatch: passwordMismatch,
    matchOk: passwordMatchOk,
    checks: passwordChecks,
    strength: passwordStrength,
    valid: passwordValid,
    match: passwordsMatch,
  } = usePasswordUI(password, confirmPassword);

  const canSubmitRegister =
    emailValid &&
    passwordValid &&
    passwordsMatch &&
    termsAccepted &&
    !loading &&
    (!requireCaptcha || !!captchaToken);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    if (requireCaptcha && !captchaToken) {
      setError("Wymagana dodatkowa weryfikacja.");
      setLoading(false);
      return;
    }
    try {
      await register({
        email,
        password,
        company,
        timeStamp,
        captchaToken,
      });

      setRequireCaptcha(false);
      setCaptchaToken(null);
      captchaRef.current?.resetCaptcha();
      setSuccessRegister(true);
    } catch (error) {
      const status = error?.status;
      if (error?.data?.requireCaptcha) {
        setRequireCaptcha(true);
        setCaptchaToken(null);
        captchaRef.current?.resetCaptcha();
        setError("Wymagana dodatkowa weryfikacja.");
        return;
      }

      setRequireCaptcha(false);
      setCaptchaToken(null);
      captchaRef.current?.resetCaptcha();

      if (status === 429) {
        setError("Zbyt wiele prób. Spróbuj ponownie później.");
      } else if (status === 400) {
        setError("Wymagane pola: email i hasło.");
      } else if (status === 409) {
        const code = error?.data?.errorCode;

        if (code === "ACCOUNT_SCHEDULED_FOR_DELETION") {
          setError(
            "To konto zostało niedawno usunięte. Zaloguj się, aby je przywrócić.",
          );
          return;
        }

        if (code === "USER_ALREADY_EXISTS") {
          setError("Użytkownik o tym adresie email już istnieje.");
          return;
        }

        setError("Rejestracja nie powiodła się.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!emailTouched || !email) {
      setEmailValidOk(false);
      return;
    }

    const timeout = setTimeout(() => {
      setEmailValidOk(emailValid);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [email, emailTouched, emailValid]);

  //REGISTER FORM
  return (
    <div className={styles.register}>
      <div className={styles.register__content}>
        <div className={styles.authPage}>
          <div className={styles.authContent}>
            <div className={styles.register__container}>
              <h2 className={styles.register__title}>
                {successRegister ? "Sukces" : "Rejestracja"}
              </h2>
              {successRegister ? (
                <div className={styles.register__successContainer}>
                  <p className={styles.register__successText}>
                    Gratulacje! Rejestracja powiodła się.
                    <br />
                    Sprawdź email w celu weryfikacji konta.
                  </p>

                  <button
                    className={styles.register__submitButton}
                    onClick={() => navigate(routes.login(country))}
                  >
                    <LogIn className={styles.register__submitButtonIcon} />
                    Przejdź do logowania
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.register__form}>
                  {error && <p className={styles.register__error}>{error}</p>}
                  <div className={styles.register__fieldCompany}>
                    <label htmlFor="company">Company</label>
                    <input
                      type="text"
                      name="company"
                      id="company"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      autoComplete="off"
                      tabIndex="-1"
                    />
                  </div>
                  <div className={styles.register__wrapper}>
                    <Email
                      className={`${styles.register__inputIcon} ${
                        emailValidOk
                          ? styles[`register__inputIcon-success`]
                          : ""
                      }`}
                    />
                    <input
                      className={`${styles.register__input} ${
                        emailError ? styles[`register__input--error`] : ""
                      }`}
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\s/g, "");
                        setEmail(value);

                        if (!emailTouched && value.length > 0) {
                          setEmailTouched(true);
                        }

                        if (emailError) {
                          setEmailError(false);
                        }
                      }}
                      onBlur={() => {
                        if (emailTouched && email && !emailValid) {
                          setEmailError(true);
                        }
                      }}
                      required
                    />
                  </div>
                  <div className={styles.register__wrapper}>
                    <Lock
                      className={`${styles.register__inputIcon} ${
                        passwordMismatch
                          ? ""
                          : passwordMatchOk
                            ? styles[`register__inputIcon-success`]
                            : ""
                      }`}
                    />

                    <input
                      className={`${styles.register__input} ${
                        passwordMismatch ? styles[`register__input--error`] : ""
                      }`}
                      type={showPassword ? "text" : "password"}
                      placeholder="Hasło"
                      value={password}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\s/g, ""); //SPACE DELETE !
                        setPassword(value);
                      }}
                      required
                    />
                    <button
                      type="button"
                      className={styles.register__inputAction}
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={showPassword ? "Ukryj hasło" : "Pokaż hasło"}
                    >
                      {showPassword ? <Eye /> : <EyeOff />}
                    </button>
                  </div>

                  <div className={styles.register__wrapper}>
                    <Lock
                      className={`${styles.register__inputIcon} ${
                        passwordMismatch
                          ? ""
                          : passwordMatchOk
                            ? styles[`register__inputIcon-success`]
                            : ""
                      }`}
                    />
                    <input
                      className={`${styles.register__input} ${
                        passwordMismatch ? styles[`register__input--error`] : ""
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
                      className={styles.register__inputAction}
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

                  <div className={styles.register__termsWrapper}>
                    <label className={styles.register__termsLabel}>
                      <input
                        type="checkbox"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                        required
                      />
                      <span>
                        Klikając „Rejestruj”, akceptuję{" "}
                        <a
                          href="/terms"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Regulamin Polonia Portal
                        </a>{" "}
                        i{" "}
                        <a
                          href="/privacy"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Politykę Prywatności
                        </a>
                      </span>
                    </label>
                  </div>
                  {requireCaptcha && (
                    <Captcha
                      onVerify={setCaptchaToken}
                      onExpire={() => setCaptchaToken(null)}
                      ref={captchaRef}
                    />
                  )}
                  <button
                    type="submit"
                    className={styles.register__submitButton}
                    disabled={!canSubmitRegister}
                  >
                    <UserPlus />
                    {loading ? "Tworzenie konta..." : "Rejestruj"}
                  </button>
                </form>
              )}
            </div>
            <HcaptchaBadge />
          </div>
        </div>
      </div>
    </div>
  );
};
