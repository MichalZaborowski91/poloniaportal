import { useEffect, useState } from "react";
import { register } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { useCountry } from "../../app/useCountry";
import { routes } from "../../app/routes";
import styles from "../Register/Register.module.scss";
import Email from "../../assets/icons/mail.svg?react";
import Lock from "../../assets/icons/lock.svg?react";
import Eye from "../../assets/icons/eye.svg?react";
import EyeOff from "../../assets/icons/eye-off.svg?react";
import LogIn from "../../assets/icons/log-in.svg?react";
import UserPlus from "../../assets/icons/user-plus.svg?react";
import HCaptcha from "@hcaptcha/react-hcaptcha";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successRegister, setSuccessRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [passwordMatchOk, setPasswordMatchOk] = useState(false);
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

  //VALIDATION
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const passwordChecks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
  };

  const passwordValid = Object.values(passwordChecks).every(Boolean);
  const passwordsMatch = password === confirmPassword;

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

      setSuccessRegister(true);
    } catch (error) {
      if (error.data?.requireCaptcha) {
        setRequireCaptcha(true);
        setCaptchaToken(null);
        setError("Wymagana dodatkowa weryfikacja.");
        return;
      }

      setRequireCaptcha(false);
      setCaptchaToken(null);

      if (error.status === 429) {
        setError("Zbyt wiele prób. Spróbuj ponownie później.");
      } else if (error.status === 400) {
        setError("Wymagane pola: email i hasło.");
      } else if (error.status === 409) {
        const code = error.data?.errorCode;

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
                <div className={styles.successBox}>
                  <p className={styles.successText}>
                    Gratulacje! Rejestracja powiodła się.
                    <br />
                    Sprawdź email w celu weryfikacji konta.
                  </p>

                  <button
                    className={styles.register__submitButton}
                    onClick={() => navigate(routes.login(country))}
                  >
                    <LogIn className={styles.buttonIcon} />
                    Przejdź do logowania
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.register__form}>
                  {error && <p className={styles.register__error}>{error}</p>}
                  <div className={styles.fieldCompany}>
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
                  <div className={styles.inputWrapper}>
                    <Email
                      className={`${styles.inputIcon} ${
                        emailValidOk ? styles.iconSuccess : ""
                      }`}
                    />
                    <input
                      className={`${styles.register__input} ${
                        emailError ? styles.inputError : ""
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
                  <div className={styles.inputWrapper}>
                    <Lock
                      className={`${styles.inputIcon} ${
                        passwordMismatch
                          ? ""
                          : passwordMatchOk
                            ? styles.iconSuccess
                            : ""
                      }`}
                    />

                    <input
                      className={`${styles.register__input} ${
                        passwordMismatch ? styles.inputError : ""
                      }`}
                      type={showPassword ? "text" : "password"}
                      placeholder="Hasło"
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
                      className={styles.inputAction}
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={showPassword ? "Ukryj hasło" : "Pokaż hasło"}
                    >
                      {showPassword ? <Eye /> : <EyeOff />}
                    </button>
                  </div>

                  <div className={styles.inputWrapper}>
                    <Lock
                      className={`${styles.inputIcon} ${
                        passwordMismatch
                          ? ""
                          : passwordMatchOk
                            ? styles.iconSuccess
                            : ""
                      }`}
                    />
                    <input
                      className={`${styles.register__input} ${
                        passwordMismatch ? styles.inputError : ""
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
                      className={styles.inputAction}
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
                      <div className={styles.strengthWrapper}>
                        <div
                          className={`${styles.strengthBar} ${
                            passwordStrength <= 2
                              ? styles.strengthWeak
                              : passwordStrength <= 4
                                ? styles.strengthMedium
                                : styles.strengthStrong
                          }`}
                          style={{ width: `${(passwordStrength / 5) * 100}%` }}
                        />
                      </div>
                      {passwordTouched && (
                        <p
                          className={
                            passwordMismatch
                              ? styles.errorText
                              : styles.passwordRulesHead
                          }
                        >
                          {passwordMismatch
                            ? "Hasła muszą być takie same."
                            : "Hasło musi zawierać przynajmniej:"}
                        </p>
                      )}

                      <ul className={styles.passwordRules}>
                        <li
                          className={
                            passwordChecks.length
                              ? styles.ruleOk
                              : styles.ruleBad
                          }
                        >
                          8 znaków
                        </li>
                        <li
                          className={
                            passwordChecks.uppercase
                              ? styles.ruleOk
                              : styles.ruleBad
                          }
                        >
                          Jedną dużą literę
                        </li>
                        <li
                          className={
                            passwordChecks.lowercase
                              ? styles.ruleOk
                              : styles.ruleBad
                          }
                        >
                          Jedną małą literę
                        </li>
                        <li
                          className={
                            passwordChecks.number
                              ? styles.ruleOk
                              : styles.ruleBad
                          }
                        >
                          Jedną cyfrę
                        </li>
                      </ul>
                    </div>
                  )}

                  <div className={styles.termsWrapper}>
                    <label className={styles.termsLabel}>
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
                    <div className={styles.captchaWrapper}>
                      <HCaptcha
                        sitekey={import.meta.env.VITE_HCAPTCHA_SITE_KEY}
                        onVerify={(token) => setCaptchaToken(token)}
                        onExpire={() => setCaptchaToken(null)}
                      />
                    </div>
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
          </div>
        </div>
      </div>
    </div>
  );
};
