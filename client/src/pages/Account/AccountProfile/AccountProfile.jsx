import { useLocation } from "react-router-dom";
import { AccountInfoForm } from "../../../components/AccountInfoForm/AccountInfoForm";
import styles from "../AccountProfile/AccountProfile.module.scss";
import User from "../../../assets/icons/user.svg?react";

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
      <h2 className={styles.accountProfile__title}>
        <User />
        Profil
      </h2>
      <AccountInfoForm />
    </div>
  );
};
