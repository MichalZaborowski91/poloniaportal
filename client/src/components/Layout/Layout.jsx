import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Header } from "../Header/Header";
import { MobileMenu } from "../MobileMenu/MobileMenu";
import { useAuth } from "../../hooks/useAuth";
import { Footer } from "../Footer/Footer";
import { LoginButton } from "../LoginButton/LoginButton";
import { RegisterButton } from "../RegisterButton/RegisterButton";
import { LogoSecondary } from "../LogoSecondary/LogoSecondary";
import { CurrentCountry } from "../CurrentCountry/CurrentCountry";
import styles from "../Layout/Layout.module.scss";
import { MobileUserMenu } from "../MobileUserMenu/MobileUserMenu";

export const Layout = () => {
  const [activePanel, setActivePanel] = useState(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [scrolled, setScrolled] = useState(false);

  const { user } = useAuth();
  const location = useLocation();

  const isAuthRoute =
    location.pathname.endsWith("/login") ||
    location.pathname.endsWith("/register") ||
    location.pathname.endsWith("/forgot-password") ||
    location.pathname.includes("/reset-password");

  const showDesktopAuthLayout = isAuthRoute && isDesktop;
  const isLoginPage = location.pathname.endsWith("/login");
  const isRegisterPage = location.pathname.endsWith("/register");

  const isNavigationOpen = activePanel === "navigation";
  const isUserMenuOpen = activePanel === "user";

  const handleNavigationClose = () => {
    setActivePanel((prev) => (prev === "navigation" ? null : prev));
  };

  const handleNavigationToggle = () => {
    setActivePanel((prev) => (prev === "navigation" ? null : "navigation"));
  };

  const handleUserMenuToggle = () => {
    setActivePanel((prev) => (prev === "user" ? null : "user"));
  };

  const handlePanelClose = () => {
    setActivePanel(null);
  };

  useEffect(() => {
    if (activePanel) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [activePanel]);

  useEffect(() => {
    if (!activePanel) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActivePanel(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activePanel]);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;

      setScrolled(y > 5);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (activePanel) {
      queueMicrotask(() => {
        setActivePanel(null);
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
    <div className={styles.layout}>
      {!showDesktopAuthLayout && (
        <>
          <Header
            scrolled={scrolled}
            onMenuToggle={handleNavigationToggle}
            onUserMenuToggle={handleUserMenuToggle}
            onMenuClose={handlePanelClose}
            isMenuOpen={isNavigationOpen}
            isUserMenuOpen={isUserMenuOpen}
            onNavigationClose={handleNavigationClose}
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
      <div
        className={`${styles.backdrop} ${
          activePanel ? styles.backdropOpen : ""
        }`}
        onClick={handlePanelClose}
        aria-hidden="true"
      />

      <MobileMenu
        isOpen={isNavigationOpen}
        onClose={handlePanelClose}
        user={user}
      />
      <MobileUserMenu isOpen={isUserMenuOpen} onClose={handlePanelClose} />

      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
