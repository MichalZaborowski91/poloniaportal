import { useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import styles from "../Footer/Footer.module.scss";
import { HeartIcon } from "../HeartIcon/HeartIcon";
import { LogoSecondary } from "../LogoSecondary/LogoSecondary";
import { RegisterButton } from "../RegisterButton/RegisterButton";
import { LoginButton } from "../LoginButton/LoginButton";
import { AboutUs } from "../AboutUs/AboutUs";
import { ServiceFooter } from "../ServiceFooter/ServiceFooter";
import { ContactFooter } from "../ContactFooter/ContactFooter";
import { MediaFooter } from "../MediaFooter/MediaFooter";
import { useCountry } from "../../app/useCountry";
import { COUNTRIES_PL } from "../../assets/countries/countriesPL";

export const Footer = () => {
  const location = useLocation();
  const country = useCountry();

  const countryCode = COUNTRIES_PL[country];

  const isLoginPage = location.pathname.endsWith("/login");
  const isRegisterPage = location.pathname.endsWith("/register");
  const isForgotPassPage = location.pathname.endsWith("/forgot-password");

  const { user } = useAuth();
  return (
    <div className={styles.footer}>
      <div className={styles.footer__container}>
        <div className="container">
          <div className={styles.footer__wrapper}>
            <div>
              <LogoSecondary />
              <div className={styles.footer__authButtons}>
                <p className={styles.footer__currentCountry}>
                  {countryCode.name}
                  <img
                    src={`/flags/${countryCode.subdomain}.png`}
                    alt={countryCode.name}
                    className={styles.footer__flag}
                  />
                </p>
                {!user && (
                  <>
                    {isLoginPage && <RegisterButton variant="footer" />}

                    {isRegisterPage && <LoginButton variant="footer" />}

                    {isForgotPassPage && <LoginButton variant="footer" />}

                    {!isLoginPage && !isRegisterPage && !isForgotPassPage && (
                      <RegisterButton variant="footer" />
                    )}
                  </>
                )}
              </div>
            </div>
            <AboutUs />
            <ServiceFooter />
            <ContactFooter />
            <MediaFooter />
          </div>
        </div>
      </div>
      <div className={styles.terms}>
        <div className={styles.heart}>
          <p>Stworzone z</p> <HeartIcon />
          <p>dla Polonii</p>
        </div>
        <a href="/terms" target="_blank" rel="noopener noreferrer">
          &#xa9; 2026 All Rights Reserved
        </a>
        <div className={styles.terms__box}>
          <a href="/terms" target="_blank" rel="noopener noreferrer">
            Regulamin
          </a>
          <a href="/privacy" target="_blank" rel="noopener noreferrer">
            Polityka Prywatności
          </a>
        </div>
      </div>
    </div>
  );
};
