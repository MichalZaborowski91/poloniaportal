import { NavLink, Outlet } from "react-router-dom";
import styles from "../AccountLayout/AccountLayout.module.scss";
import User from "../../../assets/icons/user.svg?react";
import Shield from "../../../assets/icons/shield.svg?react";

export const AccountLayout = () => {
  return (
    <div className={styles.accountLayout}>
      <div className={styles.accountLayout__overlay}>
        <div className="container">
          <div className={styles.accountLayout__content}>
            <aside className={styles.accountLayout__aside}>
              <h3>Konto:</h3>
              <nav className={styles.accountLayout__navigation}>
                <ul className={styles.accountLayout__list}>
                  <li className={styles.accountLayout__item}>
                    <User />
                    <NavLink to="" className={styles.accountLayout__link}>
                      Profil
                    </NavLink>
                  </li>
                  <li className={styles.accountLayout__item}>
                    <Shield />
                    <NavLink
                      to="security"
                      className={styles.accountLayout__link}
                    >
                      Bezpieczeństwo
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </aside>
            <main className={styles.accountLayout__main}>
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};
