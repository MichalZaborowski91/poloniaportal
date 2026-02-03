import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { UserMenu } from "../UserMenu/UserMenu";
import styles from "./Header.module.scss";
import logo from "../../assets/logo/PoloniaPortalLogo.png";
import { routes } from "../../app/routes";
import { useCountry } from "../../app/useCountry";
import { AddOfferButton } from "../AddOfferButton/AddOfferButton";
import Menu from "../../assets/icons/menu.svg?react";
import CloseIcon from "../../assets/icons/x.svg?react";
import { LoginButton } from "../LoginButton/LoginButton";
import { RegisterButton } from "../RegisterButton/RegisterButton";

export const Header = ({ onMenuToggle, isMenuOpen, onMenuClose }) => {
  const { user, loading } = useAuth();
  const country = useCountry();
  const location = useLocation();

  const hideAddOffer =
    location.pathname.endsWith("/forgot-password") ||
    location.pathname.endsWith("/reset-password") ||
    location.pathname.endsWith("/login") ||
    location.pathname.endsWith("/register");

  if (loading) {
    return null;
  }

  return (
    <div className="container">
      <header className={styles.header}>
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
        <nav className={styles.header__navigation}>
          <div
            className={`${styles.header__addOffer} ${
              user ? styles.header__addOfferUser : styles.header__addOfferGuest
            }`}
          >
            {!hideAddOffer && (
              <AddOfferButton
                onClick={() => {
                  if (isMenuOpen) {
                    onMenuClose();
                  }
                }}
              />
            )}
          </div>
          {user && <UserMenu onMenuClose={onMenuClose} />}
          {!user && (
            <div className={styles.header__authLinks}>
              <LoginButton />
              <RegisterButton />
            </div>
          )}

          <div
            className={styles.mobileMenuIconContainer}
            onClick={onMenuToggle}
            aria-label="Toggle menu"
            role="button"
          >
            <Menu
              className={`${styles.mobileMenuIconContainer__menuIcon} ${
                isMenuOpen
                  ? styles["mobileMenuIconContainer__menuIcon--hidden"]
                  : styles["mobileMenuIconContainer__menuIcon--visible"]
              }`}
            />
            <CloseIcon
              className={`${styles.mobileMenuIconContainer__menuIcon} ${
                isMenuOpen
                  ? styles["mobileMenuIconContainer__menuIcon--visible"]
                  : styles["mobileMenuIconContainer__menuIcon--hidden"]
              }`}
            />
          </div>
        </nav>
      </header>
    </div>
  );
};
