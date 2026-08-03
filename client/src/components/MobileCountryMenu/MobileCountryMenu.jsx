import { MobilePanel } from "../MobilePanel/MobilePanel";
import { BsGlobeEuropeAfrica } from "react-icons/bs";
import styles from "../MobileCountryMenu/MobileCountryMenu.module.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { useCountry } from "@/app/useCountry";
import { MobileCountryList } from "../MobileCountryList/MobileCountryList";
import { MobileMenuSection } from "../MobileMenuSection/MobileMenuSection";

export const MobileCountryMenu = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentCountry = useCountry();

  const pathWithoutCountry = location.pathname.replace(
    `/${currentCountry}`,
    "",
  );

  const handleChangeCountry = (code) => {
    onClose();
    navigate(`/${code}${pathWithoutCountry}`);
  };
  return (
    <MobilePanel id="mobile-country-menu" isOpen={isOpen}>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <BsGlobeEuropeAfrica className={styles.globe} />
          <h2 className={styles.title}>Wybierz kraj</h2>
        </div>

        <p className={styles.description}>
          Przeglądaj oferty, firmy i wydarzenia w wybranym kraju.
        </p>
      </div>
      <MobileMenuSection>
        <MobileCountryList
          currentCountry={currentCountry}
          onSelect={handleChangeCountry}
        />
      </MobileMenuSection>
    </MobilePanel>
  );
};
