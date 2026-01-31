import { useLocation } from "react-router-dom";
import { AccountInfoForm } from "../../../components/AccountInfoForm/AccountInfoForm";
import { VerifyEmailMessage } from "../../../components/VerifyEmailMessage/VerifyEmailMessage";

export const AccountProfile = () => {
  const location = useLocation();

  const cameFromAddOffer =
    location.state?.from?.pathname?.includes("/add-offer");

  return (
    <div>
      {cameFromAddOffer && (
        <div
          style={{
            padding: "12px",
            marginBottom: "16px",
            borderRadius: "6px",
            background: "#fff3cd",
            color: "#664d03",
          }}
        >
          Dokończ swój profil, aby móc dodać ogłoszenie.
        </div>
      )}
      <h2>Profile</h2>
      <VerifyEmailMessage />
      <AccountInfoForm />
    </div>
  );
};
