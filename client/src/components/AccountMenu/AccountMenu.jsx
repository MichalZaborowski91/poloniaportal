import UserIcon from "../../assets/icons/user.svg?react";
import { useState, useRef, useEffect } from "react";
import styles from "../AccountMenu/AccountMenu.module.scss";
import { useAuth } from "../../hooks/useAuth";
import { LoginButton } from "../LoginButton/LoginButton";
import { RegisterButton } from "../RegisterButton/RegisterButton";

export const AccountMenu = () => {
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const { user } = useAuth();
  const accountRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setIsAccountOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      {!user && (
        <div className={styles.accountMenu} ref={accountRef}>
          <button
            type="button"
            className={styles.accountMenu__trigger}
            onClick={() => setIsAccountOpen((prev) => !prev)}
          >
            <UserIcon className={styles.accountMenu__icon} />
            <span className={styles.accountMenu__text}>Konto</span>
          </button>

          {isAccountOpen && (
            <div className={styles.accountMenu__dropdown}>
              <LoginButton onClick={() => setIsAccountOpen(false)} />
              <RegisterButton onClick={() => setIsAccountOpen(false)} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
