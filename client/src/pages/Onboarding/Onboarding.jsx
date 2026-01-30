import { VerifyEmailMessage } from "../../components/VerifyEmailMessage/VerifyEmailMessage";
import { AccountInfoForm } from "../../components/AccountInfoForm/AccountInfoForm";

export const Onboarding = () => {
  return (
    <div>
      <h2>Complete your profile</h2>
      <div style={{ marginBottom: "16px" }}>
        <VerifyEmailMessage />
      </div>
      <AccountInfoForm />
    </div>
  );
};
