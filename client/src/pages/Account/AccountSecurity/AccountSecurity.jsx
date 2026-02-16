import { useLocation, useNavigate } from "react-router-dom";
import { useCountry } from "../../../app/useCountry";
import { routes } from "../../../app/routes";
import { useAuth } from "../../../hooks/useAuth";
import { VerifyEmailMessage } from "../../../components/VerifyEmailMessage/VerifyEmailMessage";
import { ResendVerifyEmailButton } from "../../../components/ResendVerifyEmailButton/ResendVerifyEmailButton";
import styles from "../AccountSecurity/AccountSecurity.module.scss";
import { DeleteAccountSection } from "../../../components/DeleteAccountSection/DeleteAccountSection";
import { useState } from "react";
import UserDelete from "../../../assets/icons/user-x.svg?react";
import Shield from "../../../assets/icons/shield.svg?react";
import Logout from "../../../assets/icons/log-out.svg?react";
import AtSign from "../../../assets/icons/at-sign.svg?react";
import { ChangePasswordModal } from "../../../components/ChangePasswordModal/ChangePasswordModal";
import Key from "../../../assets/icons/key.svg?react";
import { logoutAllDevices } from "../../../api/auth";
import toast from "react-hot-toast";

export const AccountSecurity = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const navigate = useNavigate();
  const country = useCountry();
  const { refreshUser } = useAuth();
  const location = useLocation();

  const cameFromAddOffer =
    location.state?.from?.pathname?.includes("/add-offer");

  //DELETE ACC
  const handleDeleted = async () => {
    navigate(routes.home(country));
    await refreshUser();
  };

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
      {cameFromAddOffer && (
        <div className={styles.accountSecurity__message}>
          Aby dodać ogłoszenie, musisz zweryfikować swój adres email.
        </div>
      )}
      <div className={styles.accountSecurity}>
        <h2 className={styles.accountSecurity__title}>
          <Shield />
          Bezpieczeństwo
        </h2>
        <ul className={styles.accountSecurity__grid}>
          <li className={styles.accountSecurity__tile}>
            <h4 className={styles.accountSecurity__header}>
              Weryfikacja email
            </h4>
            <div className={styles.accountSecurity__wrapper}>
              <div className={styles.accountSecurity__content}>
                <VerifyEmailMessage />
                <ResendVerifyEmailButton />
              </div>
            </div>
          </li>

          <li className={styles.accountSecurity__tile}>
            <h4 className={styles.accountSecurity__header}>Zmiana hasła</h4>
            <div className={styles.accountSecurity__wrapper}>
              <div className={styles.accountSecurity__content}>
                <button
                  className={styles.accountSecurity__button}
                  onClick={() => setShowChangePassword(true)}
                >
                  <Key />
                  Zmień hasło
                </button>
              </div>
            </div>
          </li>
          <li className={styles.accountSecurity__tile}>
            <h4 className={styles.accountSecurity__header}>Zmiana email</h4>
            <div className={styles.accountSecurity__wrapper}>
              <div className={styles.accountSecurity__content}>
                <button className={styles.accountSecurity__button}>
                  <AtSign />
                  Zmień email
                </button>
              </div>
            </div>
          </li>
          <li className={styles.accountSecurity__tile}>
            <h4 className={styles.accountSecurity__header}>
              Wyloguj ze wszystkich urządzeń
            </h4>
            <div className={styles.accountSecurity__wrapper}>
              <div className={styles.accountSecurity__content}>
                <button
                  className={styles.accountSecurity__button}
                  onClick={handleLogoutAll}
                >
                  <Logout />
                  Wyloguj
                </button>
              </div>
            </div>
          </li>
          <li className={styles.accountSecurity__tile}>
            <h4 className={styles.accountSecurity__header}>Usuń konto</h4>
            <div className={styles.accountSecurity__wrapper}>
              <div className={styles.accountSecurity__content}>
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(true)}
                  className={styles.accountSecurity__button}
                >
                  <UserDelete />
                  Usuń konto
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
      {showDeleteModal && (
        <DeleteAccountSection
          onDeleted={handleDeleted}
          onClose={() => setShowDeleteModal(false)}
        />
      )}

      {showChangePassword && (
        <ChangePasswordModal onClose={() => setShowChangePassword(false)} />
      )}
    </div>
  );
};
