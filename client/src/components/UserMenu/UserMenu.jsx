import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useCountry } from "../../app/useCountry";
import { routes } from "../../app/routes";
import { LogOutButton } from "../LogOutButton/LogOutButton";
import styles from "./UserMenu.module.scss";
import defaultAvatar from "../../assets/avatar/avt.jpg";

export const UserMenu = ({ onMenuClose, scrolled }) => {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  const { user } = useAuth();
  const menuRef = useRef(null);
  const country = useCountry();
  const hoverTimeout = useRef(null);

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
        setHovered(false);
      }
    };
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        setHovered(false);
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
        setHovered(false);
      }
    };
    userMenuCloseEvents();
    return () => {
      userMenuCloseEvents();
    };
  }, [open]);

  useEffect(() => {
    return () => clearTimeout(hoverTimeout.current);
  }, []);

  if (!user) {
    return <div className={styles.skeleton} />;
  }

  return (
    <div
      ref={menuRef}
      className={styles.userMenu}
      onMouseEnter={() => {
        clearTimeout(hoverTimeout.current);
        setHovered(true);
      }}
      onMouseLeave={() => {
        hoverTimeout.current = setTimeout(() => {
          setHovered(false);
        }, 150);
      }}
    >
      <button
        onClick={() => {
          onMenuClose?.(); //MOBILE MENU CLOSE
          setOpen((prevState) => !prevState);
        }}
        className={styles.userMenu__triggerButton}
      >
        <img
          src={avatarSrc}
          alt="avatar"
          className={`${styles.userMenu__avatar} ${scrolled ? styles.smallAvatar : ""}`}
        />
      </button>

      {(open || hovered) && (
        <div className={styles.menu} role="menu">
          <Link
            to={routes.account(country)}
            onClick={() => {
              setOpen(false);
              setHovered(false);
            }}
          >
            Konto
          </Link>
          <Link
            to={routes.accountCompanies(country)}
            onClick={() => {
              setOpen(false);
              setHovered(false);
            }}
          >
            Moje firmy
          </Link>
          <LogOutButton />
        </div>
      )}
    </div>
  );
};
