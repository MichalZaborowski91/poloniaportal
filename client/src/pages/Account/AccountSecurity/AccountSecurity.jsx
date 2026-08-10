import { useLocation, useNavigate } from "react-router-dom";
import { useCountry } from "../../../app/useCountry";
import { routes } from "../../../app/routes";
import { useAuth } from "../../../hooks/useAuth";
import { VerifyEmailMessage } from "../../../components/VerifyEmailMessage/VerifyEmailMessage";
import { ResendVerifyEmailButton } from "../../../components/ResendVerifyEmailButton/ResendVerifyEmailButton";
import { ChangeEmailModal } from "../../../components/ChangeEmailModal/ChangeEmailModal";

import { useEffect, useState } from "react";
import { logoutAllDevices } from "../../../api/auth";
import { ChangePasswordModal } from "../../../components/ChangePasswordModal/ChangePasswordModal";
import styles from "../AccountSecurity/AccountSecurity.module.scss";
import toast from "react-hot-toast";

import { MdShield, MdLogout, MdAlternateEmail, MdKey } from "react-icons/md";

export const AccountSecurity = () => {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showChangeEmail, setShowChangeEmail] = useState(false);

  const navigate = useNavigate();
  const country = useCountry();
  const { user, refreshUser } = useAuth();
  const location = useLocation();

  const cameFromAddOffer =
    location.state?.from?.pathname?.includes("/add-offer");
  const cameFromAddCompany =
    location.state?.from?.pathname?.includes("/companies/add");

  const emailChangePending =
    user?.emailChangeExpires && new Date(user.emailChangeExpires) > new Date();

  useEffect(() => {
    if (!emailChangePending || !user?.emailChangeExpires) {
      return;
    }

    const expiresAt = new Date(user.emailChangeExpires).getTime();
    const now = Date.now();
    const delay = expiresAt - now;

    if (delay <= 0) {
      refreshUser();
      return;
    }

    const timeout = setTimeout(() => {
      refreshUser();
    }, delay);

    return () => clearTimeout(timeout);
  }, [emailChangePending, user?.emailChangeExpires, refreshUser]);

  const handleLogoutAll = async () => {
    try {
      await logoutAllDevices();

      toast.success("Wylogowano ze wszystkich urządzeń");

      navigate(routes.home(country), { replace: true });

      setTimeout(() => {
        refreshUser();
      }, 0);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {cameFromAddCompany && (
        <div className={styles.accountSecurity__message}>
          Aby dodać firmę, musisz zweryfikować swój adres email.
        </div>
      )}
      {cameFromAddOffer && (
        <div className={styles.accountSecurity__message}>
          Aby dodać ogłoszenie, musisz zweryfikować swój adres email.
        </div>
      )}
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.titleRow}>
            <MdShield />
            <h1>Bezpieczeństwo</h1>
          </div>

          <p>Zarządzaj bezpieczeństwem swojego konta i ustawieniami dostępu.</p>
        </div>
        <div className={styles.groups}>
          <section className={styles.group}>
            <h3 className={styles.groupTitle}>Weryfikacja email</h3>

            <div className={styles.groupContent}>
              <div className={styles.emailVerification}>
                <VerifyEmailMessage showWhenVerified={true} />

                <ResendVerifyEmailButton />
              </div>
            </div>
          </section>

          <section className={styles.group}>
            <h3 className={styles.groupTitle}>Zmiana hasła</h3>

            <div className={styles.groupContent}>
              <div className={styles.securityContent}>
                <button
                  type="button"
                  className={styles.securityButton}
                  onClick={() => setShowChangePassword(true)}
                >
                  <MdKey />
                  Zmień hasło
                </button>
              </div>
            </div>
          </section>
          <section className={styles.group}>
            <h3 className={styles.groupTitle}>Zmiana email</h3>

            <div className={styles.groupContent}>
              <div className={styles.securityContent}>
                {emailChangePending && (
                  <div className={styles.securityInfo}>
                    Wysłano prośbę o zmianę email na:
                    <strong>{user.emailChangeNewEmail}</strong>
                  </div>
                )}

                <button
                  type="button"
                  disabled={emailChangePending}
                  className={styles.securityButton}
                  onClick={() => setShowChangeEmail(true)}
                >
                  <MdAlternateEmail />
                  Zmień email
                </button>
              </div>
            </div>
          </section>
          <section className={styles.group}>
            <h3 className={styles.groupTitle}>
              Wyloguj ze wszystkich urządzeń
            </h3>

            <div className={styles.groupContent}>
              <div className={styles.securityContent}>
                <button
                  type="button"
                  className={styles.securityButton}
                  onClick={handleLogoutAll}
                >
                  <MdLogout />
                  Wyloguj
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>

      {showChangePassword && (
        <ChangePasswordModal onClose={() => setShowChangePassword(false)} />
      )}

      {showChangeEmail && (
        <ChangeEmailModal onClose={() => setShowChangeEmail(false)} />
      )}
    </div>
  );
};
