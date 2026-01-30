import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { UserMenu } from "../UserMenu/UserMenu";
import styles from "./Header.module.scss";
import logo from "../../assets/logo/PoloniaPortalLogo.png";
import { routes } from "../../app/routes";
import { useCountry } from "../../app/useCountry";

export const Header = () => {
  const { user, loading } = useAuth();
  const country = useCountry();

  if (loading) {
    return null;
  }

  return (
    <div className="container">
      <header className={styles.header}>
        <Link to={routes.home(country)} className={styles.logo}>
          <img src={logo} className={styles.logo} />
        </Link>
        <nav>
          {!user ? (
            <div className={styles.authLinks}>
              <Link to={routes.login(country)}>Zaloguj</Link>
              <Link to={routes.register(country)}>Rejestracja</Link>
            </div>
          ) : (
            <UserMenu />
          )}
        </nav>
      </header>
    </div>
  );
};
