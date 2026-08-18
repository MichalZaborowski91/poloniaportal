import { createContext, useContext, useState } from "react";

const CookieSettingsContext = createContext(null);

const COOKIE_CONSENT_KEY = "cookieConsent";
const COOKIE_PREFERENCES_KEY = "cookiePreferences";

const defaultPreferences = {
  necessary: true,
  analytics: false,
  functional: false,
  marketing: false,
};

export const CookieSettingsProvider = ({ children }) => {
  const [isCookieModalOpen, setIsCookieModalOpen] = useState(false);

  const [hasConsent, setHasConsent] = useState(() => {
    return localStorage.getItem(COOKIE_CONSENT_KEY) === "true";
  });

  const [preferences, setPreferences] = useState(() => {
    const savedPreferences = localStorage.getItem(COOKIE_PREFERENCES_KEY);

    if (!savedPreferences) {
      return defaultPreferences;
    }

    try {
      return JSON.parse(savedPreferences);
    } catch {
      return defaultPreferences;
    }
  });

  const openCookieSettings = () => {
    setIsCookieModalOpen(true);
  };

  const closeCookieSettings = () => {
    setIsCookieModalOpen(false);
  };

  const savePreferences = (newPreferences) => {
    localStorage.setItem(
      COOKIE_PREFERENCES_KEY,
      JSON.stringify(newPreferences),
    );

    localStorage.setItem(COOKIE_CONSENT_KEY, "true");

    setPreferences(newPreferences);
    setHasConsent(true);
    setIsCookieModalOpen(false);
  };

  const saveConsent = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "true");
    setHasConsent(true);
    setIsCookieModalOpen(false);
  };

  return (
    <CookieSettingsContext.Provider
      value={{
        isCookieModalOpen,
        hasConsent,
        preferences,
        openCookieSettings,
        closeCookieSettings,
        saveConsent,
        savePreferences,
      }}
    >
      {children}
    </CookieSettingsContext.Provider>
  );
};

export const useCookieSettings = () => {
  const context = useContext(CookieSettingsContext);

  if (!context) {
    throw new Error(
      "useCookieSettings must be used inside CookieSettingsProvider",
    );
  }

  return context;
};
