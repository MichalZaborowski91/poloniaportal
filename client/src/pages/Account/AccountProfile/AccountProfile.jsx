import { useLocation } from "react-router-dom";
import { AccountInfoForm } from "../../../components/AccountInfoForm/AccountInfoForm";
import { VerifyEmailMessage } from "../../../components/VerifyEmailMessage/VerifyEmailMessage";
import styles from "../AccountProfile/AccountProfile.module.scss";

export const AccountProfile = () => {
  const location = useLocation();

  const cameFromAddOffer =
    location.state?.from?.pathname?.includes("/add-offer");

  return (
    <div>
      {cameFromAddOffer && (
        <div className={styles.message}>
          Dokończ swój profil, aby móc dodać ogłoszenie.
        </div>
      )}
      <h2>Profile</h2>
      <VerifyEmailMessage />
      <AccountInfoForm />
    </div>
  );
};
