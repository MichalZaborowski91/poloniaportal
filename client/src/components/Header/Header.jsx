import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { UserMenu } from "../UserMenu/UserMenu";
import { AccountMenu } from "../AccountMenu/AccountMenu";
import { routes } from "../../app/routes";
import { useCountry } from "../../app/useCountry";

import styles from "./Header.module.scss";
import logo from "../../assets/logo/PoloniaPortalLogo.png";
import Menu from "../../assets/icons/menu.svg?react";
import CloseIcon from "../../assets/icons/x.svg?react";
import { AddButton } from "../AddButton/AddButton";
import { CountryDropdown } from "../CountryDropdown/CountryDropdown";
import { ListingsDropdown } from "../ListingsDropdown/ListingsDropdown";
import { GAZETA_LINKS } from "../../app/newspaperLinks";

export const Header = ({ onMenuToggle, isMenuOpen, onMenuClose, scrolled }) => {
  const { user, loading } = useAuth();
  const country = useCountry();
  //const location = useLocation();

  //const hideAddOffer =
  //location.pathname.endsWith("/forgot-password") ||
  //location.pathname.endsWith("/reset-password") ||
  // location.pathname.endsWith("/login") ||
  //location.pathname.endsWith("/register");

  if (loading) {
    return null;
  }

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={`container ${styles.inner}`}>
        <Link
          to={routes.home(country)}
          className={styles.header__link}
          onClick={() => {
            if (isMenuOpen) {
              onMenuClose();
            }
          }}
        >
          <img
            src={logo}
            alt="Polonia Portal Logo"
            className={styles.header__logo}
          />
        </Link>
        <nav className={styles.nav}>
          <NavLink
            to={`/${country}/companies`}
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Firmy
          </NavLink>

          <NavLink
            to={`/${country}/events`}
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Wydarzenia
          </NavLink>
          <a
            href={GAZETA_LINKS[country]}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.navExternal}
          >
            Gazeta
          </a>
          <NavLink
            to={`/${country}/forum`}
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Forum
          </NavLink>
          <ListingsDropdown />
        </nav>

        <div className={styles.header__navigation}>
          <CountryDropdown />
          <div className={styles.header__addOffer}>
            <AddButton scrolled={scrolled} />
          </div>
          {user && <UserMenu onMenuClose={onMenuClose} scrolled={scrolled} />}
          <AccountMenu scrolled={scrolled} />

          <div
            className={styles.header__mobileMenuContainer}
            onClick={onMenuToggle}
            aria-label="Toggle menu"
            role="button"
          >
            <Menu
              className={`${styles.header__mobileMenuIcon} ${
                isMenuOpen
                  ? styles["header__mobileMenuIcon--hidden"]
                  : styles["header__mobileMenuIcon--visible"]
              }`}
            />
            <CloseIcon
              className={`${styles.header__mobileMenuIcon} ${
                isMenuOpen
                  ? styles["header__mobileMenuIcon--visible"]
                  : styles["header__mobileMenuIcon--hidden"]
              }`}
            />
          </div>
        </div>
      </div>
    </header>
  );
};
