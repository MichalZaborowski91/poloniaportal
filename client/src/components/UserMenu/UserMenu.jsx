import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { logout } from "../../api/auth";
import toast from "react-hot-toast";
import defaultAvatar from "../../assets/avatar/avt.jpg";
import styles from "./UserMenu.module.scss";
import { useCountry } from "../../app/useCountry";
import { routes } from "../../app/routes";

export const UserMenu = () => {
  const [open, setOpen] = useState(false);
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const country = useCountry();

  const avatarSrc = useMemo(() => {
    if (!user?.profile?.avatar) {
      return defaultAvatar;
    }
    return `${user.profile.avatar}?v=${user.profile.avatar}`;
  }, [user?.profile?.avatar]);

  const handleLogout = async () => {
    try {
      navigate(routes.home(country), { replace: true });
      await logout();
      await refreshUser();
      toast.success("Wylogowano");
    } catch {
      toast.error("Błąd wylogowania");
    }
  };

  useEffect(() => {
    if (!open) {
      return;
    }
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    const userMenuCloseEvents = () => {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("focusin", handleFocusOut);
    };
    const handleFocusOut = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    userMenuCloseEvents();
    return () => {
      userMenuCloseEvents();
    };
  }, [open]);

  if (!user) {
    return <div className={styles.skeleton} />;
  }

  return (
    <div ref={menuRef} className={styles.userMenu}>
      <button
        onClick={() => setOpen((prevState) => !prevState)}
        className={styles.trigger}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span>Witaj, {user.profile?.displayName || user.email}</span>
        <img src={avatarSrc} alt="avatar" className={styles.avatar} />
      </button>

      {open && (
        <div className={styles.menu} role="menu">
          <Link to={routes.account(country)} onClick={() => setOpen(false)}>
            Account
          </Link>
          <Link to={routes.onboarding(country)} onClick={() => setOpen(false)}>
            Edytuj profil
          </Link>
          <button onClick={handleLogout} className={styles.logout}>
            Wyloguj
          </button>
        </div>
      )}
    </div>
  );
};
