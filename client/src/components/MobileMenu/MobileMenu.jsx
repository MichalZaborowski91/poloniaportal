import { MobilePanel } from "../MobilePanel/MobilePanel";
import { MobileMenuAccount } from "../MobileMenuAccount/MobileMenuAccount";
import { MobileMenuNavigation } from "../MobileMenuNavigation/MobileMenuNavigation";
import { useAuth } from "../../hooks/useAuth";
import CountryInfo from "../CountryInfo/CountryInfo";
import { MobileMenuSection } from "../MobileMenuSection/MobileMenuSection";

export const MobileMenu = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  return (
    <MobilePanel id="mobile-navigation" isOpen={isOpen}>
      <MobileMenuSection>
        <CountryInfo />
      </MobileMenuSection>

      {!user && <MobileMenuAccount />}

      <MobileMenuNavigation onNavigate={onClose} isMenuOpen={isOpen} />
    </MobilePanel>
  );
};
