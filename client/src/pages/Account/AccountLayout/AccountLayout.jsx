import { NavLink, Outlet } from "react-router-dom";
import styles from "../AccountLayout/AccountLayout.module.scss";

export const AccountLayout = () => {
  return (
    <div className={styles.accountLayout}>
      <aside className={styles.accountLayout__aside}>
        <h3>Account</h3>
        <nav className={styles.accountLayout__navigation}>
          <NavLink to="">Profile</NavLink>
          <NavLink to="security">Security</NavLink>
        </nav>
      </aside>
      <main className={styles.accountLayout__main}>
        <Outlet />
      </main>
    </div>
  );
};
