import { useLocation } from "react-router-dom";
import { AccountInfoForm } from "../../../components/AccountInfoForm/AccountInfoForm";
import { VerifyEmailMessage } from "../../../components/VerifyEmailMessage/VerifyEmailMessage";
import styles from "../AccountProfile/AccountProfile.module.scss";

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
      <h2>Profile</h2>
      <VerifyEmailMessage />
      <AccountInfoForm />
    </div>
  );
};
