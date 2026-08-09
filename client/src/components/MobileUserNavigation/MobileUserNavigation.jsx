import { NavLink, useLocation } from "react-router-dom";
import { useCountry } from "../../app/useCountry";
import styles from "./MobileUserNavigation.module.scss";
import { USER_MENU_ITEMS } from "@/app/userMenuItems";
import { BsChevronRight } from "react-icons/bs";
import { MobileMenuSection } from "../MobileMenuSection/MobileMenuSection";

export const MobileUserNavigation = ({ onNavigate }) => {
  const country = useCountry();
  const location = useLocation();

  return (
    <MobileMenuSection title="Nawigacja">
      <nav aria-label="User navigation">
        <ul className={styles.list}>
          {USER_MENU_ITEMS.map((item) => (
            <li key={item.key} className={styles.item}>
              <NavLink
                to={item.path(country)}
                end={item.end}
                onClick={onNavigate}
                className={({ isActive }) => {
                  const isAccountSection =
                    item.key === "profile" &&
                    location.pathname.startsWith(`/${country}/account`) &&
                    !location.pathname.startsWith(
                      `/${country}/account/companies`,
                    );

                  const active = isActive || isAccountSection;

                  return active
                    ? `${styles.link} ${styles.active}`
                    : styles.link;
                }}
              >
                <span className={styles.left}>
                  <item.icon className={styles.icon} />
                  <span>{item.label}</span>
                </span>

                <BsChevronRight className={styles.chevron} />
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </MobileMenuSection>
  );
};
