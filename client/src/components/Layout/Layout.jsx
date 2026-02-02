import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Header } from "../Header/Header";
import { MobileMenu } from "../MobileMenu/MobileMenu";
import { useAuth } from "../../hooks/useAuth";

export const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const { user } = useAuth();

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

  return (
    <div>
      <Header
        onMenuToggle={handleMenuToggle}
        onMenuClose={handleMenuClose}
        isMenuOpen={isMobileMenuOpen}
      />

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={handleMenuClose}
        user={user}
      />

      <main>
        <Outlet />
      </main>
    </div>
  );
};
