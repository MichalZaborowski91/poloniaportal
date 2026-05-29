import { NavLink, Outlet } from "react-router-dom";
import styles from "../MyListingsLayout/MyListingsLayout.module.scss";
import List from "../../assets/icons/list.svg?react";
import Add from "../../assets/icons/plus.svg?react";

export const MyListingsLayout = () => {
  return (
    <div className={styles.myListingsLayout}>
      <div className={styles.myListingsLayout__overlay}>
        <div className="container">
          <div className={styles.myListingsLayout__content}>
            <aside className={styles.myListingsLayout__aside}>
              <h3>Moje ogłoszenia</h3>

              <nav className={styles.myListingsLayout__navigation}>
                <ul className={styles.myListingsLayout__list}>
                  <li className={styles.myListingsLayout__item}>
                    <List />

                    <NavLink
                      to=""
                      end
                      className={styles.myListingsLayout__link}
                    >
                      Lista ogłoszeń
                    </NavLink>
                  </li>
                  <li className={styles.myListingsLayout__item}>
                    <List />

                    <NavLink
                      to="deleted"
                      className={styles.myListingsLayout__link}
                    >
                      Usunięte ogłoszenia
                    </NavLink>
                  </li>
                  <li className={styles.myListingsLayout__item}>
                    <Add />

                    <NavLink
                      to={`/${window.location.pathname.split("/")[1]}/add-offer`}
                      className={styles.myListingsLayout__link}
                    >
                      Dodaj ogłoszenie
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </aside>

            <main className={styles.myListingsLayout__main}>
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};
