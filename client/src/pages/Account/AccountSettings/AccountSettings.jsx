import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCountry } from "../../../app/useCountry";
import { routes } from "../../../app/routes";
import { useAuth } from "../../../hooks/useAuth";
import { DeleteAccountSection } from "../../../components/DeleteAccountSection/DeleteAccountSection";
import styles from "./AccountSettings.module.scss";
import { MdSettings, MdDelete, MdCookie } from "react-icons/md";
import { useCookieSettings } from "@/context/CookieSettingsContext";

export const AccountSettings = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { openCookieSettings } = useCookieSettings();

  const navigate = useNavigate();
  const country = useCountry();
  const { refreshUser } = useAuth();

  const handleDeleted = async () => {
    navigate(routes.home(country), { replace: true });
    await refreshUser();
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <MdSettings />
          <h1>Ustawienia</h1>
        </div>

        <p>Zarządzaj ustawieniami swojego konta.</p>
      </div>

      <div className={styles.groups}>
        <section className={styles.group}>
          <h3 className={styles.groupTitle}>Usuń konto</h3>

          <div className={styles.groupContent}>
            <div className={styles.settingsContent}>
              <p className={styles.warning}>
                Usunięcie konta spowoduje jego dezaktywację. Konto będzie można
                odzyskać przez 14 dni. Po tym czasie wszystkie dane zostaną
                trwale usunięte.
              </p>

              <button
                type="button"
                className={styles.deleteButton}
                onClick={() => setShowDeleteModal(true)}
              >
                <MdDelete />
                Usuń konto
              </button>
            </div>
          </div>
        </section>
        <section className={styles.group}>
          <h3 className={styles.groupTitle}>Prywatność i cookies</h3>

          <div className={styles.groupContent}>
            <div className={styles.settingsContent}>
              <p className={styles.description}>
                Zarządzaj swoimi preferencjami dotyczącymi plików cookies.
                Możesz w każdej chwili zmienić zakres udzielonych zgód.
              </p>

              <button
                type="button"
                className={styles.cookieButton}
                onClick={openCookieSettings}
              >
                <MdCookie />
                Ustawienia cookies
              </button>
            </div>
          </div>
        </section>
      </div>

      {showDeleteModal && (
        <DeleteAccountSection
          onDeleted={handleDeleted}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
};
