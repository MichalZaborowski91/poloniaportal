import { useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { HeartIcon } from "../HeartIcon/HeartIcon";
import { LogoSecondary } from "../LogoSecondary/LogoSecondary";
import { RegisterButton } from "../RegisterButton/RegisterButton";
import { LoginButton } from "../LoginButton/LoginButton";
import { AboutUs } from "../AboutUs/AboutUs";
import { ServiceFooter } from "../ServiceFooter/ServiceFooter";
import { ContactFooter } from "../ContactFooter/ContactFooter";
import { MediaFooter } from "../MediaFooter/MediaFooter";
import { useCountry } from "../../app/useCountry";
import { CountrySwitcher } from "../CountrySwitcher/CountrySwitcher";
import { CurrentCountry } from "../CurrentCountry/CurrentCountry";
import { routes } from "../../app/routes";
import styles from "../Footer/Footer.module.scss";

export const Footer = () => {
  const location = useLocation();
  const country = useCountry();

  const isLoginPage = location.pathname.endsWith("/login");
  const isRegisterPage = location.pathname.endsWith("/register");
  const isForgotPassPage = location.pathname.endsWith("/forgot-password");

  const { user } = useAuth();

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__backgroundContainer}>
        <div className="container">
          <div className={styles.footer__content}>
            <div className={styles.footer__brand}>
              <LogoSecondary />
              <CurrentCountry />
              <div className={styles.footer__authButtons}>
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
            <div>
              <MediaFooter />
              <CountrySwitcher currentCountry={country} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footer__legal}>
        <div className={styles.footer__slogan}>
          <p>Stworzone z</p> <HeartIcon />
          <p>dla Polonii</p>
        </div>
        <a
          href={routes.copyrights()}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.footer__copyright}
        >
          {" "}
          &#xa9; 2026 All Rights Reserved
        </a>
        <nav className={styles.footer__legalNav}>
          <ul className={styles.footer__legalList}>
            <li className={styles.footer__legalItem}>
              <a
                href={routes.terms()}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footer__legalLink}
              >
                Regulamin
              </a>
            </li>
            <li className={styles.footer__legalItem}>
              <a
                href={routes.privacy()}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footer__legalLink}
              >
                Polityka Prywatności
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};
