import { NavLink } from "react-router-dom";
import { BsChevronRight } from "react-icons/bs";
import { useCountry } from "@/app/useCountry";
import { ADD_MENU_ITEMS } from "@/app/addMenuItems";
import styles from "./DesktopAddNavigation.module.scss";

export const DesktopAddNavigation = ({ onNavigate }) => {
  const country = useCountry();

  return (
    <nav className={styles.navigation} aria-label="Add navigation">
      <ul className={styles.list}>
        {ADD_MENU_ITEMS.map((item) => (
          <li key={item.key}>
            <NavLink
              to={item.path(country)}
              onClick={onNavigate}
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              <span className={styles.left}>
                <item.icon className={styles.icon} />
                <span className={styles.label}>{item.label}</span>
              </span>

              <BsChevronRight className={styles.chevron} />
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
