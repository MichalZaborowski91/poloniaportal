import { MdClose, MdCookie } from "react-icons/md";
import styles from "./CookieSettingsModal.module.scss";
import { useEffect, useState } from "react";
import { useCookieSettings } from "@/context/CookieSettingsContext";

export const CookieSettingsModal = () => {
  const {
    isCookieModalOpen,
    closeCookieSettings,
    preferences,
    savePreferences,
  } = useCookieSettings();

  const [draftPreferences, setDraftPreferences] = useState(preferences);

  useEffect(() => {
    if (isCookieModalOpen) {
      setDraftPreferences(preferences);
    }
  }, [isCookieModalOpen, preferences]);

  const handleToggle = (category) => {
    setDraftPreferences((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleSave = () => {
    savePreferences(draftPreferences);
  };

  const handleCancel = () => {
    setDraftPreferences(preferences);
    closeCookieSettings();
  };

  if (!isCookieModalOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleCancel}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <header className={styles.header}>
          <div className={styles.titleWrapper}>
            <MdCookie className={styles.icon} size={28} />

            <h2>Ustawienia cookies</h2>
          </div>

          <button
            type="button"
            className={styles.closeButton}
            onClick={handleCancel}
            aria-label="Zamknij"
          >
            <MdClose size={24} />
          </button>
        </header>

        <div className={styles.content}>
          <p className={styles.description}>
            Możesz zdecydować, które kategorie plików cookies chcesz
            zaakceptować. Cookies niezbędne są zawsze aktywne, ponieważ są
            wymagane do prawidłowego działania Serwisu.
          </p>

          <div className={styles.options}>
            <div className={styles.option}>
              <div className={styles.optionText}>
                <h3>Niezbędne cookies</h3>
                <p>Wymagane do prawidłowego działania Serwisu.</p>
              </div>

              <span className={styles.required}>Zawsze aktywne</span>
            </div>

            <div className={styles.option}>
              <div className={styles.optionText}>
                <h3>Analityczne cookies</h3>
                <p>
                  Pomagają nam analizować korzystanie z Serwisu i poprawiać jego
                  działanie.
                </p>
              </div>

              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={draftPreferences.analytics}
                  onChange={() => handleToggle("analytics")}
                />
                <span className={styles.slider}></span>
              </label>
            </div>

            <div className={styles.option}>
              <div className={styles.optionText}>
                <h3>Funkcjonalne cookies</h3>
                <p>
                  Umożliwiają zapamiętywanie wybranych ustawień i preferencji.
                </p>
              </div>

              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={draftPreferences.functional}
                  onChange={() => handleToggle("functional")}
                />
                <span className={styles.slider}></span>
              </label>
            </div>

            <div className={styles.option}>
              <div className={styles.optionText}>
                <h3>Marketingowe cookies</h3>
                <p>
                  Mogą być wykorzystywane do dopasowywania treści
                  marketingowych.
                </p>
              </div>

              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={draftPreferences.marketing}
                  onChange={() => handleToggle("marketing")}
                />
                <span className={styles.slider}></span>
              </label>
            </div>
          </div>
        </div>

        <footer className={styles.footer}>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={handleCancel}
          >
            Anuluj
          </button>

          <button
            type="button"
            className={styles.primaryButton}
            onClick={handleSave}
          >
            Zapisz ustawienia
          </button>
        </footer>
      </div>
    </div>
  );
};
