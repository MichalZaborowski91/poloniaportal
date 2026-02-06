import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "../../api/auth";
import { useAuth } from "../../hooks/useAuth";
import { useCountry } from "../../app/useCountry";
import { routes } from "../../app/routes";
import styles from "../Login/Login.module.scss";
import Email from "../../assets/icons/mail.svg?react";
import Lock from "../../assets/icons/lock.svg?react";
import Eye from "../../assets/icons/eye.svg?react";
import EyeOff from "../../assets/icons/eye-off.svg?react";
import LogIn from "../../assets/icons/log-in.svg?react";
import { Link } from "react-router-dom";
import HCaptcha from "@hcaptcha/react-hcaptcha";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [requireCaptcha, setRequireCaptcha] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);

  const country = useCountry();
  const location = useLocation();
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  const from = location.state?.from?.pathname || routes.home(country);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const formatRemainingTime = (ms) => {
    const totalSeconds = Math.ceil(ms / 1000);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours} godz ${minutes} min`;
    }

    if (minutes > 0) {
      return `${minutes} min ${seconds} s`;
    }

    return `${seconds} s`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setLoginError(false);
    setLoading(true);

    if (requireCaptcha && !captchaToken) {
      setError("Wymagana dodatkowa weryfikacja.");
      setLoading(false);
      return;
    }

    try {
      await login({
        email,
        password,
        rememberMe,
        captchaToken: requireCaptcha ? captchaToken : undefined,
      });
      await refreshUser();
      navigate(from, { replace: true });
    } catch (error) {
      if (error?.data?.requireCaptcha) {
        setRequireCaptcha(true);
        setCaptchaToken(null);
        setError("Wymagana dodatkowa weryfikacja.");
        return;
      }
      setRequireCaptcha(false);
      setCaptchaToken(null);
      setLoginError(true);
      if (error.status === 423) {
        const remaining = error?.data?.lockRemaining;

        if (remaining) {
          setError(
            `Konto zostało tymczasowo zablokowane. Spróbuj ponownie za ${formatRemainingTime(
              remaining,
            )}.`,
          );
        } else {
          setError(
            "Konto zostało tymczasowo zablokowane. Spróbuj ponownie później.",
          );
        }
      } else if (error.status === 429) {
        setError(
          "Zbyt wiele prób logowania. Odczekaj chwilę i spróbuj ponownie.",
        );
      } else {
        setError("Nieprawidłowy email lub hasło.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.login__content}>
        <div className={styles.login__container}>
          <h2 className={styles.login__title}>Login</h2>
          <form onSubmit={handleSubmit} className={styles.login__form}>
            {error && <p className={styles.login__error}>{error}</p>}
            <div className={styles.inputWrapper}>
              <Email className={styles.inputIcon} />
              <input
                type="email"
                placeholder="Email"
                value={email}
                className={`${styles.register__input} ${
                  emailError || loginError ? styles.inputError : ""
                }`}
                onChange={(e) => {
                  const value = e.target.value.replace(/\s/g, "");
                  setEmail(value);

                  if (!emailTouched && value.length > 0) {
                    setEmailTouched(true);
                  }

                  if (emailError) setEmailError(false);
                  if (loginError) setLoginError(false);
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
              <Lock className={styles.inputIcon} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Hasło"
                value={password}
                className={`${styles.register__input} ${
                  loginError ? styles.inputError : ""
                }`}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (loginError) setLoginError(false);
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
            <div className={styles.rememberMe}>
              <label className={styles.rememberMe__label}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />{" "}
                Zapamiętaj mnie
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
              disabled={loading || (requireCaptcha && !captchaToken)}
              className={styles.login__submitButton}
            >
              <LogIn className={styles.buttonIcon} />
              {loading ? "Loguję..." : "Login"}
            </button>
            <p className={styles.forgotPassword}>
              <Link to={routes.forgotPassword(country)}>
                Nie pamiętasz hasła?
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
