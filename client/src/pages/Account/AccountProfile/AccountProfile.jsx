import { AccountInfoForm } from "../../../components/AccountInfoForm/AccountInfoForm";
import { VerifyEmailMessage } from "../../../components/VerifyEmailMessage/VerifyEmailMessage";

export const AccountProfile = () => {
  return (
    <div>
      <h2>Profile</h2>
      <VerifyEmailMessage />
      <AccountInfoForm />
    </div>
  );
};
