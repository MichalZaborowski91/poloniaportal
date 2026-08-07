import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { HeartIcon } from "../HeartIcon/HeartIcon";
import { LogoSecondary } from "../LogoSecondary/LogoSecondary";
import { RegisterButton } from "../RegisterButton/RegisterButton";
import { LoginButton } from "../LoginButton/LoginButton";
import { useCountry } from "../../app/useCountry";
import { CurrentCountry } from "../CurrentCountry/CurrentCountry";
import { routes } from "../../app/routes";
import styles from "../Footer/Footer.module.scss";
import Container from "../Layout/Container";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa6";
import { MdChevronRight } from "react-icons/md";
import { DesktopCountryMenu } from "../DesktopCountryMenu/DesktopCountryMenu";

export const Footer = ({ onCountryMenuToggle }) => {
  const location = useLocation();
  const country = useCountry();

  const isLoginPage = location.pathname.endsWith("/login");
  const isRegisterPage = location.pathname.endsWith("/register");
  const isForgotPassPage = location.pathname.endsWith("/forgot-password");

  const { user } = useAuth();

  return (
    <footer className={styles.footer}>
      <div className={styles.background}>
        <Container>
          <div className={styles.top}>
            <div className={styles.brand}>
              <LogoSecondary />
              <p className={styles.tagline}>Łączymy Polaków na całym świecie</p>
              <CurrentCountry />
              <div className={styles.authButtons}>
                {!user ? (
                  <>
                    {isLoginPage && <RegisterButton />}

                    {isRegisterPage && <LoginButton />}

                    {isForgotPassPage && <LoginButton />}

                    {!isLoginPage && !isRegisterPage && !isForgotPassPage && (
                      <RegisterButton />
                    )}
                  </>
                ) : (
                  <>
                    <div className={styles.changeCountryDesktop}>
                      <DesktopCountryMenu
                        trigger={
                          <button className={styles.changeCountry}>
                            <span>Zmień kraj</span>
                            <MdChevronRight size={20} />
                          </button>
                        }
                      />
                    </div>

                    <div className={styles.changeCountryMobile}>
                      <button
                        type="button"
                        className={styles.changeCountry}
                        onClick={onCountryMenuToggle}
                      >
                        <span>Zmień kraj</span>
                        <MdChevronRight size={20} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className={styles.column}>
              <h3>Portal</h3>
              <nav className={styles.links}>
                <Link to={routes.about(country)}>O portalu</Link>

                <Link to={routes.companies(country)}>Firmy</Link>

                <Link to={routes.listings(country)}>Ogłoszenia</Link>

                <Link to={routes.events(country)}>Wydarzenia</Link>

                <Link to={routes.pricing(country)}>Dla firm</Link>
              </nav>
            </div>
            <div className={styles.column}>
              <h3>Pomoc</h3>

              <nav className={styles.links}>
                <Link to={routes.contact(country)}>Kontakt</Link>

                <Link to={routes.reportProblem(country)}>Zgłoś problem</Link>

                <Link to={routes.faq(country)}>FAQ</Link>
              </nav>
            </div>
            <div className={styles.column}>
              <h3>Społeczność</h3>

              <nav className={styles.links}>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  <FaFacebook />
                  <span>Facebook</span>
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  <FaInstagram />
                  <span>Instagram</span>
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  <FaLinkedin />
                  <span>Linkedin</span>
                </a>
              </nav>
            </div>
          </div>
        </Container>
      </div>
      <Container>
        <div className={styles.bottom}>
          <div className={styles.slogan}>
            <p>Stworzone z</p> <HeartIcon />
            <p>dla Polonii</p>
          </div>
          <a
            href={routes.copyrights()}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.copyright}
          >
            {" "}
            &#xa9; 2026 All Rights Reserved
          </a>
          <nav className={styles.legalNav}>
            <ul className={styles.legalList}>
              <li className={styles.legalItem}>
                <Link to={routes.terms()} className={styles.legalLink}>
                  Regulamin
                </Link>
              </li>
              <li className={styles.legalItem}>
                <Link to={routes.privacy()} className={styles.legalLink}>
                  Polityka Prywatności
                </Link>
              </li>
              <li className={styles.legalItem}>
                <Link to={routes.cookie()} className={styles.legalLink}>
                  Cookie
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </footer>
  );
};
