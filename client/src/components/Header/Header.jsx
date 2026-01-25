import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { UserMenu } from "../UserMenu/UserMenu";
import styles from "./Header.module.scss";

export const Header = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        PoloniaPortal
      </Link>
      <nav>
        {!user ? (
          <div className={styles.authLinks}>
            <Link to="/login">Zaloguj</Link>
            <Link to="/register">Zarejestruj</Link>
          </div>
        ) : (
          <UserMenu />
        )}
      </nav>
    </header>
  );
};
