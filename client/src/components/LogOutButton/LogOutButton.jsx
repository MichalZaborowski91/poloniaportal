import { useNavigate } from "react-router-dom";
import { logout } from "../../api/auth";
import { routes } from "../../app/routes";
import { useCountry } from "../../app/useCountry";
import { useAuth } from "../../hooks/useAuth";
import toast from "react-hot-toast";
import styles from "../LogOutButton/LogOutButton.module.scss";
import { MdLogout } from "react-icons/md";

export const LogOutButton = ({ onLogout }) => {
  const navigate = useNavigate();
  const country = useCountry();
  const { refreshUser } = useAuth();

  const handleLogout = async () => {
    onLogout?.();

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
      <span className={styles.left}>
        <MdLogout className={styles.icon} />
        <span>Wyloguj</span>
      </span>
    </button>
  );
};
