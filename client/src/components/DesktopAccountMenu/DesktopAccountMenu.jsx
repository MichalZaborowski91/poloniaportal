import styles from "./DesktopAccountMenu.module.scss";
import { BsPersonCircle } from "react-icons/bs";
import { DesktopAccountContent } from "../DesktopAccountContent/DesktopAccountContent";
import { useEffect, useRef, useState } from "react";

export const DesktopAccountMenu = () => {
  const [open, setOpen] = useState(false);
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

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <>
      {open && (
        <div className={styles.backdrop} onClick={() => setOpen(false)} />
      )}
      <div ref={menuRef} className={styles.accountMenu}>
        <button
          type="button"
          className={styles.trigger}
          onClick={() => setOpen((prev) => !prev)}
        >
          <BsPersonCircle className={styles.icon} />
        </button>

        {open && (
          <div className={styles.menu}>
            <DesktopAccountContent onNavigate={() => setOpen(false)} />
          </div>
        )}
      </div>
    </>
  );
};
