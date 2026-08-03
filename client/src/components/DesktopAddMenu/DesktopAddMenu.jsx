import { useEffect, useRef, useState } from "react";

import styles from "./DesktopAddMenu.module.scss";
import { MdPostAdd } from "react-icons/md";
import { DesktopAddNavigation } from "../DesktopAddNavigation/DesktopAddNavigation";

export const DesktopAddMenu = () => {
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

      <div ref={menuRef} className={styles.addMenu}>
        <button
          type="button"
          className={styles.trigger}
          onClick={() => setOpen((prev) => !prev)}
        >
          <MdPostAdd className={styles.icon} />
          <span className={styles.label}>Dodaj</span>
        </button>

        {open && (
          <div className={styles.menu}>
            <DesktopAddNavigation
              onNavigate={() => {
                setOpen(false);
              }}
            />
          </div>
        )}
      </div>
    </>
  );
};
