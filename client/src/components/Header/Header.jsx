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
import Container from "../Layout/Container/Container";

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
    <header className={styles.header}>
      <Container>
        <div className={styles.inner}>
          <div className={styles.brand}>
            <Link
              to={routes.home(country)}
              className={styles.logoLink}
              onClick={() => {
                if (isMenuOpen) {
                  onMenuClose();
                }
              }}
            >
              <img
                src={logo}
                alt="Polonia Portal Logo"
                className={styles.logo}
              />
            </Link>
          </div>
          <nav className={styles.nav} aria-label="Main navigation">
            <ul className={styles.navList}>
              <li className={styles.navItem}>
                <NavLink
                  to={`/${country}/companies`}
                  className={({ isActive }) => (isActive ? styles.active : "")}
                >
                  Firmy
                </NavLink>
              </li>
              <li className={styles.navItem}>
                <NavLink
                  to={`/${country}/events`}
                  className={({ isActive }) => (isActive ? styles.active : "")}
                >
                  Wydarzenia
                </NavLink>
              </li>
              <li className={styles.navItem}>
                <a
                  href={GAZETA_LINKS[country]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.navExternal}
                >
                  Gazeta
                </a>
              </li>
              <li className={styles.navItem}>
                <NavLink
                  to={`/${country}/forum`}
                  className={({ isActive }) => (isActive ? styles.active : "")}
                >
                  Forum
                </NavLink>
              </li>
              <li className={styles.navItem}>
                <ListingsDropdown />
              </li>
            </ul>
          </nav>

          <div className={styles.actions}>
            <CountryDropdown />
            <div className={styles.addButton}>
              <AddButton scrolled={scrolled} />
            </div>
            <div className={styles.account}>
              {user ? <UserMenu onMenuClose={onMenuClose} /> : <AccountMenu />}
            </div>

            <button
              type="button"
              className={styles.mobileMenu}
              onClick={onMenuToggle}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
            >
              <Menu
                aria-hidden="true"
                className={`${styles.mobileMenuIcon} ${
                  isMenuOpen ? styles.hidden : styles.visible
                }`}
              />
              <CloseIcon
                aria-hidden="true"
                className={`${styles.mobileMenuIcon} ${
                  isMenuOpen ? styles.visible : styles.hidden
                }`}
              />
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
};
