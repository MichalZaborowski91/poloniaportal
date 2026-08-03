import { NavLink } from "react-router-dom";
import { BsChevronRight } from "react-icons/bs";
import { useCountry } from "@/app/useCountry";
import { USER_MENU_ITEMS } from "@/app/userMenuItems";
import styles from "./DesktopUserNavigation.module.scss";

export const DesktopUserNavigation = ({ onNavigate }) => {
  const country = useCountry();

  return (
    <nav className={styles.navigation} aria-label="User navigation">
      <ul className={styles.list}>
        {USER_MENU_ITEMS.map((item) => (
          <li key={item.key}>
            <NavLink
              to={item.path(country)}
              end={item.end}
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
