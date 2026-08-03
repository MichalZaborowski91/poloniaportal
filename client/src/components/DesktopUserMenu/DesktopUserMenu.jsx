import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import styles from "./DesktopUserMenu.module.scss";
import { UserAvatar } from "../UserAvatar/UserAvatar";
import { DesktopUserHeader } from "../DesktopUserHeader/DesktopUserHeader";
import { DesktopUserNavigation } from "../DesktopUserNavigation/DesktopUserNavigation";
import { DesktopUserFooter } from "../DesktopUserFooter/DesktopUserFooter";

export const DesktopUserMenu = ({ onMenuClose, scrolled }) => {
  const [open, setOpen] = useState(false);

  const { user } = useAuth();
  const menuRef = useRef(null);

  useEffect(() => {
    if (!open) return;

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

    const handleFocusOut = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
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

  if (!user) {
    return <div className={styles.skeleton} />;
  }

  return (
    <>
      {open && (
        <div className={styles.backdrop} onClick={() => setOpen(false)} />
      )}
      <div ref={menuRef} className={styles.userMenu}>
        <UserAvatar
          scrolled={scrolled}
          onClick={() => {
            onMenuClose?.();
            setOpen((prev) => !prev);
          }}
          buttonClassName={styles.userMenu__triggerButton}
          className={styles.userMenu__avatar}
        />

        {open && (
          <div className={styles.menu} role="menu">
            <DesktopUserHeader />

            <DesktopUserNavigation
              onNavigate={() => {
                setOpen(false);
              }}
            />

            <DesktopUserFooter
              onClose={() => {
                setOpen(false);
              }}
            />
          </div>
        )}
      </div>
    </>
  );
};
