import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useCountry } from "../../app/useCountry";
import { routes } from "../../app/routes";
import { LogOutButton } from "../LogOutButton/LogOutButton";
import styles from "./DesktopUserMenu.module.scss";
import { UserAvatar } from "../UserAvatar/UserAvatar";

export const DesktopUserMenu = ({ onMenuClose, scrolled }) => {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  const { user } = useAuth();
  const menuRef = useRef(null);
  const country = useCountry();
  const hoverTimeout = useRef(null);

  useEffect(() => {
    if (!open) return;

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

    const handleFocusOut = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
        setHovered(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    document.addEventListener("focusin", handleFocusOut);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("focusin", handleFocusOut);
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
      <UserAvatar
        scrolled={scrolled}
        onClick={() => {
          onMenuClose?.();
          setOpen((prev) => !prev);
        }}
        buttonClassName={styles.userMenu__triggerButton}
        className={styles.userMenu__avatar}
      />

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
          <Link
            to={`/${country}/my-listings`}
            onClick={() => {
              setOpen(false);
              setHovered(false);
            }}
          >
            Moje ogłoszenia
          </Link>
          <Link
            to={`/${country}/my-events`}
            onClick={() => {
              setOpen(false);
              setHovered(false);
            }}
          >
            Moje wydarzenia
          </Link>
          <Link
            to={routes.favorites(country)}
            onClick={() => {
              setOpen(false);
              setHovered(false);
            }}
          >
            Ulubione
          </Link>
          <LogOutButton />
        </div>
      )}
    </div>
  );
};
