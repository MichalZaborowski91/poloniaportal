import { useCountry } from "@/app/useCountry";
import styles from "./MobileMenuNavigation.module.scss";
import { GAZETA_LINKS } from "@/app/newspaperLinks";
import { ListingsAccordion } from "../ListingsAccordion/ListingsAccordion";
import { NavLink } from "react-router-dom";
import {
  MdBusiness,
  MdEvent,
  MdForum,
  MdNewspaper,
  MdHome,
} from "react-icons/md";
import { routes } from "@/app/routes";
import { BsBoxArrowUpRight, BsChevronRight } from "react-icons/bs";
import { MobileMenuSection } from "../MobileMenuSection/MobileMenuSection";

export const MobileMenuNavigation = ({ onNavigate, isMenuOpen }) => {
  const country = useCountry();

  return (
    <MobileMenuSection title="Nawigacja">
      <nav aria-label="Mobile navigation">
        <ul className={styles.navigationList}>
          <li className={styles.item}>
            <NavLink
              to={routes.home(country)}
              onClick={onNavigate}
              end
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              <span className={styles.left}>
                <MdHome className={styles.icon} />
                <span>Start</span>
              </span>

              <BsChevronRight className={styles.chevron} />
            </NavLink>
          </li>
          <li className={styles.navigationItem}>
            <ListingsAccordion
              onNavigate={onNavigate}
              isMenuOpen={isMenuOpen}
            />
          </li>
          <li className={styles.item}>
            <NavLink
              onClick={onNavigate}
              to={routes.companies(country)}
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              <span className={styles.left}>
                <MdBusiness className={styles.icon} />
                <span>Firmy</span>
              </span>

              <BsChevronRight className={styles.chevron} />
            </NavLink>
          </li>
          <li className={styles.item}>
            <NavLink
              onClick={onNavigate}
              to={routes.events(country)}
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              <span className={styles.left}>
                <MdEvent className={styles.icon} />
                <span>Wydarzenia</span>
              </span>

              <BsChevronRight className={styles.chevron} />
            </NavLink>
          </li>
          <li className={styles.item}>
            <NavLink
              onClick={onNavigate}
              to={`/${country}/forum`}
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              <span className={styles.left}>
                <MdForum className={styles.icon} />
                <span>Forum</span>
              </span>

              <BsChevronRight className={styles.chevron} />
            </NavLink>
          </li>
          <li className={styles.item}>
            <a
              onClick={onNavigate}
              href={GAZETA_LINKS[country]}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              <span className={styles.left}>
                <MdNewspaper className={styles.icon} />
                <span>Gazeta</span>
              </span>

              <BsBoxArrowUpRight className={styles.chevron} />
            </a>
          </li>
        </ul>
      </nav>
    </MobileMenuSection>
  );
};
