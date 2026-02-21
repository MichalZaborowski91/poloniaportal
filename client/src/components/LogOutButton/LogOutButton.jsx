import { useNavigate } from "react-router-dom";
import { logout } from "../../api/auth";
import { routes } from "../../app/routes";
import { useCountry } from "../../app/useCountry";
import { useAuth } from "../../hooks/useAuth";
import toast from "react-hot-toast";
import styles from "../LogOutButton/LogOutButton.module.scss";

export const LogOutButton = () => {
  const navigate = useNavigate();
  const country = useCountry();
  const { refreshUser } = useAuth();

  const handleLogout = async () => {
    try {
      navigate(routes.home(country), { replace: true });
      await logout();
      await refreshUser();
    } catch {
      toast.error("Błąd wylogowania");
    }
  };
  return (
    <button onClick={handleLogout} className={styles.logoutButton}>
      Wyloguj
    </button>
  );
};
