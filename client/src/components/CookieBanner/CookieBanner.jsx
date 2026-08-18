import { MdCookie } from "react-icons/md";
import styles from "./CookieBanner.module.scss";
import { useCookieSettings } from "@/context/CookieSettingsContext";

const defaultPreferences = {
  necessary: true,
  analytics: false,
  functional: false,
  marketing: false,
};

export const CookieBanner = () => {
  const { hasConsent, openCookieSettings, savePreferences } =
    useCookieSettings();

  const handleAcceptAll = () => {
    savePreferences({
      necessary: true,
      analytics: true,
      functional: true,
      marketing: true,
    });
  };

  const handleRejectOptional = () => {
    savePreferences(defaultPreferences);
  };

  const handleOpenSettings = () => {
    openCookieSettings();
  };

  if (hasConsent) {
    return null;
  }

  return (
    <>
      <div className={styles.banner}>
        <div className={styles.content}>
          <div className={styles.iconWrapper}>
            <MdCookie size={28} />
          </div>

          <div className={styles.text}>
            <h2>Twoja prywatność jest dla nas ważna</h2>

            <p>
              Korzystamy z plików cookies, aby zapewnić prawidłowe działanie
              Serwisu, analizować jego wykorzystanie oraz, za Twoją zgodą,
              dostosowywać wybrane funkcjonalności i treści.
            </p>
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={handleRejectOptional}
            >
              Odrzuć opcjonalne
            </button>

            <button
              type="button"
              className={styles.secondaryButton}
              onClick={handleOpenSettings}
            >
              Ustawienia cookies
            </button>

            <button
              type="button"
              className={styles.primaryButton}
              onClick={handleAcceptAll}
            >
              Akceptuję wszystkie
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
