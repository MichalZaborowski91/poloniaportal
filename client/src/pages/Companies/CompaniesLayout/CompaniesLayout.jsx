import { NavLink, Outlet } from "react-router-dom";
import styles from "./CompaniesLayout.module.scss";
//import Building from "../../../assets/icons/building.svg?react";
import List from "../../../assets/icons/list.svg?react";
import Add from "../../../assets/icons/plus.svg?react";

export const CompaniesLayout = () => {
  return (
    <div className={styles.companiesLayout}>
      <div className={styles.companiesLayout__overlay}>
        <div className="container">
          <div className={styles.companiesLayout__content}>
            <aside className={styles.companiesLayout__aside}>
              <h3>Moje firmy</h3>

              <nav className={styles.companiesLayout__navigation}>
                <ul className={styles.companiesLayout__list}>
                  <li className={styles.companiesLayout__item}>
                    <List />
                    <NavLink to="" end className={styles.companiesLayout__link}>
                      Lista firm
                    </NavLink>
                  </li>

                  <li className={styles.companiesLayout__item}>
                    <Add />
                    <NavLink to="add" className={styles.companiesLayout__link}>
                      Dodaj firmę
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </aside>

            <main className={styles.companiesLayout__main}>
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};
