import { useNavigate } from "react-router-dom";
import { useCountry } from "../../../app/useCountry";
import { routes } from "../../../app/routes";
import { useAuth } from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import { deleteAccount } from "../../../api/auth";
import { VerifyEmailMessage } from "../../../components/VerifyEmailMessage/VerifyEmailMessage";
import { ResendVerifyEmailButton } from "../../../components/ResendVerifyEmailButton/ResendVerifyEmailButton";

export const AccountSecurity = () => {
  const navigate = useNavigate();
  const country = useCountry();
  const { refreshUser } = useAuth();

  //DELETE ACC
  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Czy na pewno chcesz usunąć konto? Tej operacji nie można cofnąć.",
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteAccount();
      navigate(routes.home(country));
      await refreshUser();
    } catch (error) {
      toast.error("Nie udalo sie usunac konta.");
      console.error(error);
    }
  };
  return (
    <div>
      <h2>Security</h2>
      <button
        onClick={handleDeleteAccount}
        style={{ color: "red" }}
        type="button"
      >
        Usuń konto
      </button>
      <button>Zmien haslo</button>
      <button>Wyloguj ze wszystkich</button>
      <VerifyEmailMessage />
      <ResendVerifyEmailButton />
    </div>
  );
};
