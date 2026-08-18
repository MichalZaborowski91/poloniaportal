import { useLocation } from "react-router-dom";
import { AccountInfoForm } from "../../../components/AccountInfoForm/AccountInfoForm";
import styles from "../AccountProfile/AccountProfile.module.scss";
import { MdPerson } from "react-icons/md";

export const AccountProfile = () => {
  const location = useLocation();

  const cameFromAddOffer =
    location.state?.from?.pathname?.includes("/add-offer");
  const cameFromAddCompany =
    location.state?.from?.pathname?.includes("/companies/add");

  return (
    <div>
      {cameFromAddOffer && (
        <div className={styles.message}>
          Dokończ swój profil, aby móc dodać ogłoszenie.
        </div>
      )}
      {cameFromAddCompany && (
        <div className={styles.message}>
          Aby dodać firmę, profil musi zostać dokończony.
        </div>
      )}
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.titleRow}>
            <MdPerson />
            <h1>Profil</h1>
          </div>

          <p>Zarządzaj informacjami widocznymi dla innych użytkowników.</p>
        </div>

        <AccountInfoForm />
      </div>
    </div>
  );
};
