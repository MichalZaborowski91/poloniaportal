import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { routes } from "../../app/routes";
import { useCountry } from "../../app/useCountry";
import styles from "./Header.module.scss";
import logo from "../../assets/logo/PoloniaPortalLogo.png";
import Menu from "../../assets/icons/menu.svg?react";
import CloseIcon from "../../assets/icons/x.svg?react";
import { ListingsDropdown } from "../ListingsDropdown/ListingsDropdown";
import { GAZETA_LINKS } from "../../app/newspaperLinks";
import Container from "../Layout/Container/Container";
import { DesktopUserMenu } from "../DesktopUserMenu/DesktopUserMenu";
import { UserAvatar } from "../UserAvatar/UserAvatar";
import { DesktopAccountMenu } from "../DesktopAccountMenu/DesktopAccountMenu";
import { DesktopAddMenu } from "../DesktopAddMenu/DesktopAddMenu";
import { DesktopCountryMenu } from "../DesktopCountryMenu/DesktopCountryMenu";
import { MobileCountryButton } from "../MobileCountryButton/MobileCountryButton";
import { MdBusiness, MdEvent, MdForum, MdNewspaper } from "react-icons/md";

export const Header = ({
  onMenuToggle,
  isMenuOpen,
  onMenuClose,
  onNavigationClose,
  onUserMenuToggle,
  onCountryMenuToggle,
  isCountryMenuOpen,
}) => {
  const { user, loading } = useAuth();
  const country = useCountry();

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
                  <MdBusiness className={styles.icon} />
                  <span className={styles.label}>Firmy</span>
                </NavLink>
              </li>
              <li className={styles.navItem}>
                <NavLink
                  to={`/${country}/events`}
                  className={({ isActive }) => (isActive ? styles.active : "")}
                >
                  <MdEvent className={styles.icon} />
                  <span className={styles.label}>Wydarzenia</span>
                </NavLink>
              </li>
              <li className={styles.navItem}>
                <a
                  href={GAZETA_LINKS[country]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.navExternal}
                >
                  <MdNewspaper className={styles.icon} />
                  <span className={styles.label}>Gazeta</span>
                </a>
              </li>
              <li className={styles.navItem}>
                <NavLink
                  to={`/${country}/forum`}
                  className={({ isActive }) => (isActive ? styles.active : "")}
                >
                  <MdForum className={styles.icon} />
                  <span className={styles.label}>Forum</span>
                </NavLink>
              </li>
              <li className={styles.navItem}>
                <ListingsDropdown />
              </li>
            </ul>
          </nav>

          <div className={styles.actions}>
            <div className={styles.desktopCountry}>
              <DesktopCountryMenu />
            </div>
            <div className={styles.mobileCountry}>
              <MobileCountryButton
                isOpen={isCountryMenuOpen}
                onClick={onCountryMenuToggle}
              />
            </div>

            <div className={styles.addButton}>
              <DesktopAddMenu />
            </div>
            {!user && (
              <div className={styles.desktopAccount}>
                <DesktopAccountMenu />
              </div>
            )}

            {user && (
              <>
                <div className={styles.desktopAccount}>
                  <DesktopUserMenu onMenuClose={onMenuClose} />
                </div>

                <div className={styles.mobileAccount}>
                  <UserAvatar
                    onClick={() => {
                      onNavigationClose?.();
                      onUserMenuToggle?.();
                    }}
                  />
                </div>
              </>
            )}

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
