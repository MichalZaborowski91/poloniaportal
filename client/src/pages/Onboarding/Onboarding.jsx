import { VerifyEmailMessage } from "../../components/VerifyEmailMessage/VerifyEmailMessage";
import { AccountInfoForm } from "../../components/AccountInfoForm/AccountInfoForm";
import styles from "../Onboarding/Onboarding.module.scss";

export const Onboarding = () => {
  return (
    <div className={styles.onboarding}>
      <h2>Complete your profile</h2>
      <AccountInfoForm mode="onboarding" />
    </div>
  );
};
