import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useCountry } from "../../app/useCountry";
import { routes } from "../../app/routes";
import { LogOutButton } from "../LogOutButton/LogOutButton";
import styles from "./UserMenu.module.scss";
import defaultAvatar from "../../assets/avatar/avt.jpg";

export const UserMenu = ({ onMenuClose }) => {
  const [open, setOpen] = useState(false);

  const { user } = useAuth();
  const menuRef = useRef(null);
  const country = useCountry();

  const avatarSrc = useMemo(() => {
    if (!user?.profile?.avatar) {
      return defaultAvatar;
    }
    return `${user.profile.avatar}?v=${user.profile.avatar}`;
  }, [user?.profile?.avatar]);

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
        onClick={() => {
          onMenuClose?.(); //MOBILE MENU CLOSE
          setOpen((prevState) => !prevState);
        }}
        className={styles.userMenu__triggerButton}
      >
        <span className={styles.userMenu__greeting}>
          Witaj, {user.profile?.displayName || user.email}
        </span>
        <img src={avatarSrc} alt="avatar" className={styles.userMenu__avatar} />
      </button>

      {open && (
        <div className={styles.menu} role="menu">
          <Link
            to={routes.account(country)}
            onClick={() => setOpen(false)}
            className={styles.menu__account}
          >
            Konto
          </Link>
          <Link to={routes.onboarding(country)} onClick={() => setOpen(false)}>
            Dashboard
          </Link>
          <LogOutButton />
        </div>
      )}
    </div>
  );
};
