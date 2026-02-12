import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Header } from "../Header/Header";
import { MobileMenu } from "../MobileMenu/MobileMenu";
import { useAuth } from "../../hooks/useAuth";
import { Footer } from "../Footer/Footer";
import { LoginButton } from "../LoginButton/LoginButton";
import { RegisterButton } from "../RegisterButton/RegisterButton";
import { LogoSecondary } from "../LogoSecondary/LogoSecondary";
import styles from "../Layout/Layout.module.scss";
import { CurrentCountry } from "../CurrentCountry/CurrentCountry";

export const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  const { user } = useAuth();
  const location = useLocation();

  const isAuthRoute =
    location.pathname.endsWith("/login") ||
    location.pathname.endsWith("/register") ||
    location.pathname.endsWith("/forgot-password");

  const showDesktopAuthLayout = isAuthRoute && isDesktop;
  const isLoginPage = location.pathname.endsWith("/login");
  const isRegisterPage = location.pathname.endsWith("/register");

  const handleMenuToggle = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      queueMicrotask(() => {
        setIsMobileMenuOpen(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      {!showDesktopAuthLayout && (
        <>
          <Header
            onMenuToggle={handleMenuToggle}
            onMenuClose={handleMenuClose}
            isMenuOpen={isMobileMenuOpen}
          />
        </>
      )}
      {showDesktopAuthLayout && (
        <div className={styles.authTopbar}>
          <div>
            <LogoSecondary />
            <CurrentCountry />
          </div>
          <div className={styles.authActions}>
            {isLoginPage && <RegisterButton />}
            {isRegisterPage && <LoginButton />}
          </div>
        </div>
      )}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={handleMenuClose}
        user={user}
      />

      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
