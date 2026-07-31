import { MobilePanel } from "../MobilePanel/MobilePanel";
import { MobileUserFooter } from "../MobileUserFooter/MobileUserFooter";
import { MobileUserHeader } from "../MobileUserHeader/MobileUserHeader";
import { MobileUserNavigation } from "../MobileUserNavigation/MobileUserNavigation";

export const MobileUserMenu = ({ isOpen, onClose }) => {
  return (
    <MobilePanel id="mobile-user-menu" isOpen={isOpen}>
      <MobileUserHeader />
      <MobileUserNavigation onNavigate={onClose} />
      <MobileUserFooter onClose={onClose} />
    </MobilePanel>
  );
};
